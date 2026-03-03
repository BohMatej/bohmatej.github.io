import React from 'react';
import Link from 'next/link';

import type { Project } from '@/types/content';

interface SpotlightProjectProps {
  project: Project | null;
}

export function SpotlightProject({ project }: SpotlightProjectProps) {
  if (!project) {
    return (
      <section className="card stagger-item" aria-live="polite">
        <h2>Spotlight Project</h2>
        <p>No spotlight project is configured yet.</p>
      </section>
    );
  }

  return (
    <section className="card spotlight stagger-item" aria-labelledby="spotlight-heading">
      <p className="badge">Spotlight</p>
      <h2 id="spotlight-heading">{project.name}</h2>
      <p>{project.description}</p>
      <div className="row">
        <a href={project.url} target="_blank" rel="noreferrer">
          Visit Project
        </a>
        <Link href="/projects">View all projects</Link>
      </div>
    </section>
  );
}
