import { describe, expect, it } from "vitest";
import {
  FALLBACK_SKILLS,
  groupSkillsByCategory,
  parseSkillsFromReadme,
} from "@/lib/agentSkills";

describe("agentSkills utility", () => {
  it("contains all 22 expected fallback skills", () => {
    expect(FALLBACK_SKILLS.length).toBe(22);
    const names = FALLBACK_SKILLS.map((s) => s.name);
    expect(names).toContain("docker-first-architecture");
    expect(names).toContain("git-branch-management");
    expect(names).toContain("jules-ai-engineering-workflow");
    expect(names).toContain("professional-communication-standard");
    expect(names).toContain("modern-toolchain-standard");
    expect(names).toContain("polyglot-microservice-architecture");
    expect(names).toContain("ui-rules");
    expect(names).toContain("meridian-design-system");
  });

  it("groups skills into categories correctly", () => {
    const grouped = groupSkillsByCategory(FALLBACK_SKILLS);
    expect(grouped.length).toBe(7);

    const categoryNames = grouped.map((g) => g.name);
    expect(categoryNames).toContain("Communication Standards & Core Protocols");
    expect(categoryNames).toContain("Autonomous Git & Version Control");
    expect(categoryNames).toContain("AI Engineering & Autonomous Review");
    expect(categoryNames).toContain("DevOps, Tooling & CI/CD Pipelines");
    expect(categoryNames).toContain("Code Quality, Testing & Simplification");
    expect(categoryNames).toContain("System Architecture & SaaS Systems");
    expect(categoryNames).toContain("UI Design & Engineering Standards");

    for (const cat of grouped) {
      expect(cat.skills.length).toBeGreaterThan(0);
    }
  });

  it("parses skills table from sample README markdown", () => {
    const sampleReadme = `
# Autonomous AI Agent Skills Catalog

## Master Skills Catalog

### 1. Communication Standards & Core Protocols

| Skill | Description | Direct Link |
| :--- | :--- | :--- |
| \`professional-communication-standard\` | Enforces strictly emoji-free, concise, objective responses. | [\`.agents/skills/professional-communication-standard\`](.agents/skills/professional-communication-standard/SKILL.md) |

### 2. Autonomous Git & Version Control

| Skill | Description | Direct Link |
| :--- | :--- | :--- |
| \`git-branch-management\` | Rules and procedures for creating branches. | [\`.agents/skills/git-branch-management\`](.agents/skills/git-branch-management/SKILL.md) |
| \`git-commit-workflow\` | Commit design taxonomy. | [\`.agents/skills/git-commit-workflow\`](.agents/skills/git-commit-workflow/SKILL.md) |

## Using skills-sync CLI
`;

    const parsed = parseSkillsFromReadme(sampleReadme);
    expect(parsed.length).toBe(3);
    expect(parsed[0].name).toBe("professional-communication-standard");
    expect(parsed[0].category).toBe("Communication Standards & Core Protocols");
    expect(parsed[1].name).toBe("git-branch-management");
    expect(parsed[2].name).toBe("git-commit-workflow");
  });

  it("falls back to FALLBACK_SKILLS if markdown does not contain a catalog", () => {
    const emptyReadme = "# Just a title\nNo catalog here.";
    const parsed = parseSkillsFromReadme(emptyReadme);
    expect(parsed.length).toBe(FALLBACK_SKILLS.length);
  });
});
