import { db } from "@/db/drizzle";
import { testCases } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, or } from "drizzle-orm";

export const GET = async () => {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const tests = await db
      .select()
      .from(testCases)
      .where(or(eq(testCases.userId, user.id), eq(testCases.custom, false)));
    return Response.json(tests, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Error fetching test cases", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  try {
    const test = await db
      .insert(testCases)
      .values({
        custom: true,
        prompt: body.prompt,
        expectedOutput: body.expectedOutput,
        userId: user.id,
      })
      .returning();

    return Response.json(test, { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response("Could not create a test case", { status: 500 });
  }
};
