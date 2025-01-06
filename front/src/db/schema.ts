import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  decimal,
  primaryKey,
  boolean,
  check,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations, sql } from "drizzle-orm";

// Define schema

// Experiments table
export const experiments = pgTable("experiments", {
  userId: text("user_id").notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  systemPrompt: text("system_prompt").notNull(),
  model: varchar("model", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const experimentsInsertSchema = createInsertSchema(experiments);

// Test cases table
export const testCases = pgTable(
  "test_cases",
  {
    userId: text("user_id"),
    custom: boolean("custom").default(false).notNull(),
    id: uuid("id").primaryKey().defaultRandom(),
    prompt: text("prompt").notNull(),
    expectedOutput: text("expected_output").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    // Custom test cases must have a user ID
    // This is a check constraint that ensures that the user ID is not null if the test case is custom
    // This is to ensure that there can be "base" test cases that are not associated with a user. This is important in the context of the application because there are reference-less test-cases that are provided by the system and are not created by a user.

    {
      checkConstraint: check(
        "user_id_or_custom",
        sql`${table.custom} = false or ${table.userId} is not null`
      ),
    },
  ]
);
export const testCasesInsertSchema = createInsertSchema(testCases);

// Join table for experiments and test cases
export const experimentTestCases = pgTable(
  "experiment_test_cases",
  {
    experimentId: uuid("experiment_id").references(() => experiments.id),
    testCaseId: uuid("test_case_id").references(() => testCases.id),
  },
  (table) => [primaryKey({ columns: [table.experimentId, table.testCaseId] })]
);

// Experiment runs table
export const experimentRuns = pgTable("experiment_runs", {
  userId: text("user_id").notNull(),
  id: uuid("id").primaryKey().defaultRandom(),
  experimentId: uuid("experiment_id").references(() => experiments.id),
  runName: varchar("run_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  aggregateScore: decimal("aggregate_score"),
});

// Experiment results table
export const experimentResults = pgTable("experiment_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  runId: uuid("run_id").references(() => experimentRuns.id),
  latency: decimal("latency").notNull(),
  testCaseId: uuid("test_case_id").references(() => testCases.id),
  actualOutput: text("actual_output").notNull(),
  score: decimal("score").notNull(),
});

// Define relationships
export const experimentsRelations = relations(experiments, ({ many }) => ({
  experimentTestCases: many(experimentTestCases),
  experimentRuns: many(experimentRuns),
}));

export const testCasesRelations = relations(testCases, ({ many }) => ({
  experimentTestCases: many(experimentTestCases),
  experimentResults: many(experimentResults),
}));

export const experimentRunsRelations = relations(
  experimentRuns,
  ({ one, many }) => ({
    experiment: one(experiments, {
      fields: [experimentRuns.experimentId],
      references: [experiments.id],
    }),
    results: many(experimentResults),
  })
);

export const experimentResultsRelations = relations(
  experimentResults,
  ({ one }) => ({
    run: one(experimentRuns, {
      fields: [experimentResults.runId],
      references: [experimentRuns.id],
    }),
    testCase: one(testCases, {
      fields: [experimentResults.testCaseId],
      references: [testCases.id],
    }),
  })
);

export const experimentTestCasesRelations = relations(
  experimentTestCases,
  ({ one }) => ({
    experiment: one(experiments, {
      fields: [experimentTestCases.experimentId],
      references: [experiments.id],
    }),
    testCase: one(testCases, {
      fields: [experimentTestCases.testCaseId],
      references: [testCases.id],
    }),
  })
);

// Defining schema types
