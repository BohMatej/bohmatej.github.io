import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('blog parser', () => {
  const originalCwd = process.cwd();
  let tempDir = '';

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-parser-test-'));
    fs.mkdirSync(path.join(tempDir, 'content/blog'), { recursive: true });
    process.chdir(tempDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    vi.resetModules();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('parses valid posts, filters draft/invalid, and sorts descending by date', async () => {
    fs.writeFileSync(
      path.join(tempDir, 'content/blog/newer.md'),
      `---\ntitle: "Newer"\ndate: "2026-03-01"\nsummary: "New post"\ntags: ["a"]\n---\n\nHello world`
    );

    fs.writeFileSync(
      path.join(tempDir, 'content/blog/older.md'),
      `---\ntitle: "Older"\ndate: "2026-01-01"\nsummary: "Old post"\n---\n\nHello again`
    );

    fs.writeFileSync(
      path.join(tempDir, 'content/blog/draft.md'),
      `---\ntitle: "Draft"\ndate: "2026-02-01"\nsummary: "Draft post"\ndraft: true\n---\n\nNot published`
    );

    fs.writeFileSync(
      path.join(tempDir, 'content/blog/invalid.md'),
      `---\ntitle: "Invalid"\nsummary: "Missing date"\n---\n\nBad meta`
    );

    const blog = await import('@/lib/blog');
    const meta = blog.getBlogPostsMeta();

    expect(meta.map((post) => post.slug)).toEqual(['newer', 'older']);

    const post = await blog.getBlogPostBySlug('newer');
    expect(post).not.toBeNull();
    expect(post?.contentHtml).toContain('<p>Hello world</p>');
    expect(post?.readingTime).toBe(1);

    const missing = await blog.getBlogPostBySlug('missing');
    expect(missing).toBeNull();
  });
});
