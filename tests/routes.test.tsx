import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>,
}));

const notFound = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

vi.mock('next/navigation', () => ({
  notFound,
}));

describe('route components', () => {
  beforeEach(() => {
    notFound.mockClear();
  });

  it('renders resume page with embedded object and fallback link', async () => {
    const module = await import('@/app/resume/page');
    render(module.default());

    expect(screen.getByRole('heading', { name: 'Resume' })).toBeTruthy();
    expect(screen.getByRole('link', { name: /open or download resume pdf/i })).toBeTruthy();
  });

  it('renders projects page with project cards', async () => {
    const module = await import('@/app/projects/page');
    render(module.default());

    expect(screen.getByText('Projects')).toBeTruthy();
    expect(screen.getByText('Portfolio Template')).toBeTruthy();
    expect(screen.getAllByText('Spotlight').length).toBeGreaterThan(0);
  });

  it('renders blog index using markdown-derived posts', async () => {
    const module = await import('@/app/blog/page');
    render(module.default());

    expect(screen.getByText('Blog')).toBeTruthy();
    expect(screen.getByText('Welcome to my blog')).toBeTruthy();
  });

  it('calls notFound for missing blog slug', async () => {
    const module = await import('@/app/blog/[slug]/page');

    await expect(module.default({ params: Promise.resolve({ slug: 'does-not-exist' }) })).rejects.toThrow(
      'NEXT_NOT_FOUND'
    );
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
