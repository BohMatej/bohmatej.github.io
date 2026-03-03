export interface SiteProfile {
  name: string;
  headline?: string;
  email: string;
  location?: string;
  socials: Array<{ label: string; url: string }>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  repoUrl?: string;
  tags?: string[];
  embed?: {
    enabled: boolean;
    url?: string;
    height?: number;
  };
}

export interface SiteConfig {
  profile: SiteProfile;
  projects: Project[];
  spotlightProjectId: string;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
}

export interface BlogPostMeta extends Omit<BlogFrontmatter, 'draft'> {
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
  readingTime: number;
}
