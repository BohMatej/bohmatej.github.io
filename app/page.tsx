import React from 'react';
import { ContactCard } from '@/components/ContactCard';
import { SpotlightProject } from '@/components/SpotlightProject';
import { getSpotlightProject, siteConfig } from '@/lib/config';

export default function HomePage() {
  const spotlight = getSpotlightProject(siteConfig.projects, siteConfig.spotlightProjectId);

  if (!spotlight) {
    // eslint-disable-next-line no-console
    console.warn(`Missing spotlight project for id: ${siteConfig.spotlightProjectId}`);
  }

  return (
    <section className="page section-fade">
      <div className="hero stagger-group">
        <p className="eyebrow">Personal Website</p>
        <h1>{siteConfig.profile.name}</h1>
        <p>{siteConfig.profile.headline}</p>
      </div>
      <div className="grid-two stagger-group">
        <ContactCard profile={siteConfig.profile} />
        <SpotlightProject project={spotlight} />
      </div>
    </section>
  );
}
