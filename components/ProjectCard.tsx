import React from 'react';

import { ProjectEmbed } from '@/components/ProjectEmbed';
import type { Project } from '@/types/content';

interface ProjectCardProps {
  project: Project;
  isSpotlight: boolean;
}

export function ProjectCard({ project, isSpotlight }: ProjectCardProps) {
  return (
    <article className="card project-card stagger-item" aria-label={`Project ${project.name}`}>
      <div className="row">
        <h2>{project.name}</h2>
        {isSpotlight ? <span className="badge">Spotlight</span> : null}
      </div>
      <p>{project.description}</p>
      {project.tags?.length ? (
        <ul className="inline-list" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
      <div className="row">
        <a href={project.url} target="_blank" rel="noreferrer">
          Open project
        </a>
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Repository
          </a>
        ) : null}
      </div>
      <ProjectEmbed project={project} />
    </article>
  );
}
