import {
  Award,
  Bot,
  Briefcase,
  Clock,
  FileText,
  FolderGit2,
  GraduationCap,
  Heart,
  Home,
  Link as LinkIcon,
  Mail,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Education", href: "/#education", icon: GraduationCap },
  { name: "Timeline", href: "/#timeline", icon: Clock },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Experience", href: "/experiences", icon: Briefcase },
  { name: "Volunteer", href: "/volunteer", icon: Heart },
  { name: "Certifications", href: "/certificates", icon: Award },
  { name: "Agent Skills", href: "/skills", icon: Bot },
  { name: "My Socials", href: "/links", icon: LinkIcon },
  { name: "Contact", href: "/#contact", icon: Mail },
  {
    name: "Blog",
    href: "https://blogs.mishrashardendu22.is-a.dev/read",
    icon: FileText,
  },
];
