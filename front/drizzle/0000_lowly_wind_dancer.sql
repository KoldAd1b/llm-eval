CREATE TABLE IF NOT EXISTS "experiment_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"run_id" uuid,
	"latency" numeric NOT NULL,
	"test_case_id" uuid,
	"actual_output" text NOT NULL,
	"score" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiment_runs" (
	"user_id" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experiment_id" uuid,
	"run_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"aggregate_score" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiment_test_cases" (
	"experiment_id" uuid,
	"test_case_id" uuid,
	CONSTRAINT "experiment_test_cases_experiment_id_test_case_id_pk" PRIMARY KEY("experiment_id","test_case_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experiments" (
	"user_id" text NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"system_prompt" text NOT NULL,
	"model" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test_cases" (
	"user_id" text,
	"custom" boolean DEFAULT false NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prompt" text NOT NULL,
	"expected_output" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "experiment_results" ADD CONSTRAINT "experiment_results_run_id_experiment_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."experiment_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_results" ADD CONSTRAINT "experiment_results_test_case_id_test_cases_id_fk" FOREIGN KEY ("test_case_id") REFERENCES "public"."test_cases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_runs" ADD CONSTRAINT "experiment_runs_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_test_cases" ADD CONSTRAINT "experiment_test_cases_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_test_cases" ADD CONSTRAINT "experiment_test_cases_test_case_id_test_cases_id_fk" FOREIGN KEY ("test_case_id") REFERENCES "public"."test_cases"("id") ON DELETE no action ON UPDATE no action;