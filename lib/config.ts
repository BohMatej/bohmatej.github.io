import type { Project, SiteConfig } from '@/types/content';

export const siteConfig: SiteConfig = {
  profile: {
    name: 'Matej Macula',
    headline: 'Engineer building useful things',
    email: 'macula.m@northeastern.edu',
    location: 'Boston, MA',
    socials: [
      { label: 'GitHub', url: 'https://github.com/BohMatej' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/matejmacula' },
      { label: 'Instagram', url: 'https://www.instagram.com/matejmacula/' },
    ],
  },
  projects: [
    {
      id: 'portfolio-template',
      name: 'Portfolio Template',
      description: 'A polished personal website starter kit built with Next.js.',
      url: 'https://matejmacula.com',
      repoUrl: 'https://github.com/your-handle/portfolio-template',
      tags: ['Next.js', 'TypeScript', 'Design'],
      embed: { enabled: true, url: 'https://matejmacula.com', height: 360 },
    },
    {
      id: 'api-tooling',
      name: 'API Tooling',
      description: 'Command-line utilities for schema validation and API workflows.',
      url: 'https://example.org',
      repoUrl: 'https://github.com/your-handle/api-tooling',
      tags: ['Node.js', 'CLI'],
      embed: { enabled: false },
    },
  ],
  spotlightProjectId: 'portfolio-template',
};

export function getSpotlightProject(projects: Project[], spotlightProjectId: string): Project | null {
  return projects.find((project) => project.id === spotlightProjectId) ?? null;
}
