import React from 'react';

import { ProjectCard } from '@/components/ProjectCard';
import { getSpotlightProject, siteConfig } from '@/lib/config';

export default function ProjectsPage() {
  const spotlight = getSpotlightProject(siteConfig.projects, siteConfig.spotlightProjectId);

  return (
    <section className="page section-fade">
      <div className="hero">
        {/* <p className="eyebrow">Work</p> */}
        <h1>Projects</h1>
      </div>
      <div className="stack stagger-group">
        {siteConfig.projects.map((project) => (
          <ProjectCard key={project.id} project={project} isSpotlight={spotlight?.id === project.id} />
        ))}
      </div>
    </section>
  );
}
