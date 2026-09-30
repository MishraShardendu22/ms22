import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  ResumeIcon,
  TwitterXIcon,
} from "@/component/Icons";
import type { Introduction } from "./types";

export const SocialLinks = {
  GitHub: {
    url: "https://github.com/MishraShardendu22",
    icon: GitHubIcon,
  },
  LinkedIn: {
    url: "https://www.linkedin.com/in/shardendumishra22",
    icon: LinkedInIcon,
  },
  Instagram: {
    url: "https://www.instagram.com/mishrashardendu22/",
    icon: InstagramIcon,
  },
  Twitter: {
    url: "https://x.com/Shardendu_M",
    icon: TwitterXIcon,
  },
  resume: {
    url: "https://drive.google.com/drive/folders/1s48wtD34inP2tK5FxQjaj2OtBpFAi7l8?usp=sharing",
    icon: ResumeIcon,
  },
};

export const myIntro: Introduction = {
  name: "Shardendu Mishra",
  role: "Engineer and Science Enthusiast",
  about:
    "I am a Software Engineer, I work with Linux, Git, Web Technologies, Cloud Platforms and AI/ML. I absolutely love Engineering solutions for problems.",
};

export const Language = ["English", "Hindi", "French"];
