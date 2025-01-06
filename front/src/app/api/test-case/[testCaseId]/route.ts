import { db } from "@/db/drizzle";
import { testCases } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { testCaseId: string } }
) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await db
      .delete(testCases)
      .where(
        and(eq(testCases.id, params.testCaseId), eq(testCases.userId, user.id))
      );
    return new Response(null, { status: 204 });
  } catch (e) {
    console.error(e);
    return new Response("Could not delete test case", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { testCaseId: string } }
) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  try {
    const updated = await db
      .update(testCases)
      .set({
        prompt: body.prompt,
        expectedOutput: body.expectedOutput,
      })
      .where(
        and(eq(testCases.id, params.testCaseId), eq(testCases.userId, user.id))
      )
      .returning();

    if (!updated.length) {
      return new Response("Test case not found", { status: 404 });
    }

    return Response.json(updated[0], { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Could not update test case", { status: 500 });
  }
}
