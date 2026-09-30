import { CDN_PROFESSIONAL_AVIF } from "./cdn";

export const SITE_NAME = "Shardendu Mishra";
export const SITE_DESCRIPTION =
  "Professional personal website showcasing projects, experiences, skills, and certifications";

export const SEO_KEYWORDS = [
  "Shardendu Mishra",
  "Software Engineer",
  "Software Developer",
  "Go Developer",
  "React Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "Portfolio",
  "Web Development",
  "IIIT Dharwad",
  "Full Stack Developer",
  "Cloud Native Development",
  "Docker",
  "Kubernetes",
];

export const SAME_AS_URLS = [
  "https://github.com/MishraShardendu22",
  "https://github.com/ShardenduMishra22",
  "https://www.linkedin.com/in/shardendumishra22/",
  "https://x.com/Shardendu_M",
  "https://twitter.com/Shardendu_M",
  "https://www.instagram.com/mishrashardendu22/",
  "https://leetcode.com/u/ShardenduMishra22/",
  "https://www.reddit.com/user/SouLVaGeTa/",
  "https://t.me/MishraShardendu22",
  "https://www.youtube.com/@Shardendu_Mishra",
  "https://blogs.mishrashardendu22.is-a.dev",
  "https://treasure-hunt.mishrashardendu22.is-a.dev",
  "https://pixel-art-8-bit.mishrashardendu22.is-a.dev",
];

const KNOWS_ABOUT = [
  "Software Development",
  "Go Programming",
  "React",
  "Next.js",
  "TypeScript",
  "Web Development",
  "Cloud Computing",
];

export function getRootJsonLd(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: baseUrl,
    image: CDN_PROFESSIONAL_AVIF,
    jobTitle: "Software Developer and Engineer",
    worksFor: {
      "@type": "Organization",
      name: "IIIT Dharwad",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Indian Institute of Information Technology Dharwad",
    },
    sameAs: SAME_AS_URLS,
    knowsAbout: KNOWS_ABOUT,
  };
}
