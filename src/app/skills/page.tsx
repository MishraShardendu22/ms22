import { SkillsPageClient } from "@/component/Skills";
import { getAgentSkillsData } from "@/lib/agentSkills";

// Automatically revalidate every 60 seconds (Incremental Static Regeneration)
// Any commit pushed to MishraShardendu22/agent-skills will be reflected within 60s
export const revalidate = 60;

export default async function SkillsPage() {
  const initialData = await getAgentSkillsData();

  return <SkillsPageClient initialData={initialData} />;
}
