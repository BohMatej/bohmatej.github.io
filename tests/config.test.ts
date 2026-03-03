import { describe, expect, it } from 'vitest';

import { getSpotlightProject, siteConfig } from '@/lib/config';

describe('getSpotlightProject', () => {
  it('returns the matching spotlight project when id exists', () => {
    const project = getSpotlightProject(siteConfig.projects, 'portfolio-template');
    expect(project?.id).toBe('portfolio-template');
  });

  it('returns null when spotlight id is missing', () => {
    const project = getSpotlightProject(siteConfig.projects, 'missing-id');
    expect(project).toBeNull();
  });
});
