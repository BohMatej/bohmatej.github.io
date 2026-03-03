import React from 'react';
import type { Project } from '@/types/content';

interface ProjectEmbedProps {
  project: Project;
}

export function ProjectEmbed({ project }: ProjectEmbedProps) {
  if (!project.embed?.enabled) {
    return null;
  }

  const embedUrl = project.embed.url ?? project.url;

  return (
    <div className="project-embed">
      <h3>{project.name} Preview</h3>
      <iframe
        title={`${project.name} embedded preview`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer"
        style={{ width: '100%', minHeight: project.embed.height ?? 360 }}
      />
    </div>
  );
}
