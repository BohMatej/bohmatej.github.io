import React from 'react';
import type { SiteProfile } from '@/types/content';

interface ContactCardProps {
  profile: SiteProfile;
}

export function ContactCard({ profile }: ContactCardProps) {
  return (
    <section className="card stagger-item" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
      {profile.location ? <p>{profile.location}</p> : null}
      <ul className="inline-list">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a href={social.url} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
