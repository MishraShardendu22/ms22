/**
 * Normalized data structure for detail views
 * Used to represent Projects, Certificates, Experiences, and Volunteer work
 * in a consistent VS Code-style tree format
 */

// =============================================================================
// Link Types
// =============================================================================

export type LinkType =
  | "github"
  | "youtube"
  | "linkedin"
  | "live-demo"
  | "certificate"
  | "external";

export interface DetailLink {
  url: string;
  type: LinkType;
  label: string;
}

// =============================================================================
// Tree Node Types - VS Code-style hierarchy
// =============================================================================

/** Types of tree nodes that determine rendering behavior */
type TreeNodeType =
  | "folder" // Collapsible container node (like a folder in VS Code)
  | "file" // Leaf node (like a file in VS Code)
  | "property" // Key-value property display
  | "text" // Text content
  | "list" // Bulleted list items
  | "timeline" // Timeline entries
  | "tags" // Tag/skill badges
  | "link" // External link
  | "image" // Image display
  | "project"; // Related project reference

/** Base tree node structure */
export interface TreeNode {
  /** Unique identifier for the node */
  id: string;
  /** Display label for the node */
  label: string;
  /** Node type determines rendering */
  type: TreeNodeType;
  /** Child nodes (for folder types) */
  children?: TreeNode[];
  /** Whether this node is expanded by default */
  defaultExpanded?: boolean;
  /** Optional icon identifier */
  icon?: TreeNodeIcon;
  /** Payload data for rendering content */
  payload?: TreeNodePayload;
}

/** Icon types for tree nodes */
export type TreeNodeIcon =
  | "folder"
  | "folder-open"
  | "file"
  | "file-code"
  | "file-text"
  | "clock"
  | "link"
  | "image"
  | "tag"
  | "list"
  | "info"
  | "briefcase"
  | "award"
  | "users"
  | "globe"
  | "github"
  | "youtube"
  | "linkedin"
  | "code"
  | "terminal"
  | "package";

/** Payload data for different node types */
export type TreeNodePayload =
  | { type: "text"; value: string }
  | { type: "property"; key: string; value: string }
  | { type: "list"; items: string[] }
  | { type: "timeline"; items: TimelineItem[] }
  | { type: "tags"; items: string[] }
  | { type: "link"; url: string; linkType: LinkType }
  | { type: "image"; url: string; alt: string }
  | { type: "images"; urls: string[]; alt: string }
  | {
      type: "project";
      id: string;
      name: string;
      description?: string;
      technologies?: string[];
    };

// =============================================================================
// Legacy Types (kept for backward compatibility)
// =============================================================================

export interface TreeSection {
  id: string;
  title: string;
  content: TreeSectionContent;
  defaultExpanded?: boolean;
}

type TreeSectionContent =
  | { type: "text"; value: string }
  | { type: "list"; items: string[] }
  | { type: "timeline"; items: TimelineItem[] }
  | { type: "tags"; items: string[] }
  | { type: "metadata"; fields: MetadataField[] }
  | { type: "relatedProjects"; projects: RelatedProject[] }
  | { type: "images"; urls: string[]; alt: string };

export interface TimelineItem {
  title: string;
  subtitle?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
}

export interface MetadataField {
  label: string;
  value: string;
  icon?: string;
}

interface RelatedProject {
  id: string;
  name: string;
  description?: string;
  technologies?: string[];
}

// =============================================================================
// Main Data Structure
// =============================================================================

export interface DetailTreeData {
  /** Main title (entity name) */
  title: string;
  /** Secondary title line */
  subtitle?: string;
  /** Status badge */
  badge?: {
    label: string;
    variant: "default" | "success" | "info" | "warning";
  };
  /** Entity logo/icon URL */
  logo?: string;
  /** Quick metadata summary */
  quickMeta?: MetadataField[];
  /** Tree hierarchy root nodes */
  tree: TreeNode[];
  /** External links */
  links: DetailLink[];
  /** Technologies/skills for sidebar display */
  technologies?: string[];
  /** Back navigation link */
  backLink: {
    href: string;
    label: string;
  };
  /** Color theme */
  theme: "violet" | "blue" | "purple" | "pink";
  /** Entity type for context */
  entityType: "project" | "certificate" | "experience" | "volunteer";

  // Legacy field - deprecated, use `tree` instead
  sections?: TreeSection[];
}
