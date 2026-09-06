import { type NextRequest, NextResponse } from "next/server";
import { fetchSkillRunbook } from "@/lib/agentSkills";

export const revalidate = 120;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Missing skill slug" }, { status: 400 });
  }

  const runbook = await fetchSkillRunbook(slug);

  if (!runbook) {
    return NextResponse.json(
      { error: `Skill runbook not found for ${slug}` },
      { status: 404 },
    );
  }

  return NextResponse.json(runbook, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
    },
  });
}
