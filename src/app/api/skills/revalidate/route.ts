import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Revalidation endpoint for Agent Skills.
 * Can be called by GitHub Actions webhook on commit or by the frontend sync button.
 *
 * Example GitHub Action curl:
 * curl -X POST https://mishrashardendu22.is-a.dev/api/skills/revalidate -H "Authorization: Bearer <SECRET>"
 */
export async function POST(req: NextRequest) {
  try {
    const secret =
      process.env.REVALIDATION_SECRET || process.env.SKILLS_SYNC_SECRET;
    const authHeader = req.headers.get("authorization");

    // If a secret is configured in environment, enforce it for external calls
    if (secret) {
      const token = authHeader?.replace(/^Bearer\s+/i, "");
      if (token !== secret) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }

    // Revalidate paths and tags
    revalidatePath("/skills");
    revalidateTag("agent-skills", "max");
    revalidateTag("agent-skills-commit", "max");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: "Agent skills cache revalidated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error revalidating agent skills",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  // Allow GET with secret parameter or from same-origin
  const searchParams = req.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const expectedSecret =
    process.env.REVALIDATION_SECRET || process.env.SKILLS_SYNC_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    // Only allow unauthenticated GET if it comes from the same host (client sync button)
    const host = req.headers.get("host");
    const referer = req.headers.get("referer");
    const isSameOrigin = referer && host && referer.includes(host);

    if (!isSameOrigin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  revalidatePath("/skills");
  revalidateTag("agent-skills", "max");
  revalidateTag("agent-skills-commit", "max");

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
    message: "Agent skills cache revalidated successfully",
  });
}
