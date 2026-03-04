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
      id: 'mhdle',
      name: 'MHDle: a public transit guessing game',
      description: 'Based on subwaydle.com, MHDle is a guessing game based on Bratislava\'s public transit network.',
      url: 'https://mhdle.matejmacula.com',
      repoUrl: 'https://github.com/bohmatej/csia',
      tags: ['python', 'flask', 'sqlite3', 'javascript'],
      embed: { enabled: true, url: 'https://mhdle.matejmacula.com', height: 360 },
    }
    //,
    // {
    //   id: 'api-tooling',
    //   name: 'API Tooling',
    //   description: 'Command-line utilities for schema validation and API workflows.',
    //   url: 'https://example.org',
    //   repoUrl: 'https://github.com/your-handle/api-tooling',
    //   tags: ['Node.js', 'CLI'],
    //   embed: { enabled: false },
    // },
  ],
  spotlightProjectId: 'mhdle',
};

export function getSpotlightProject(projects: Project[], spotlightProjectId: string): Project | null {
  return projects.find((project) => project.id === spotlightProjectId) ?? null;
}
