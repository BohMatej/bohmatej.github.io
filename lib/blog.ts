import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import type { BlogFrontmatter, BlogPost, BlogPostMeta } from '@/types/content';

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog');

function isValidFrontmatter(data: Partial<BlogFrontmatter>): data is BlogFrontmatter {
  return Boolean(
    data.title &&
      typeof data.title === 'string' &&
      data.date &&
      typeof data.date === 'string' &&
      data.summary &&
      typeof data.summary === 'string' &&
      (data.tags === undefined || Array.isArray(data.tags)) &&
      (data.draft === undefined || typeof data.draft === 'boolean')
  );
}

function calculateReadingTime(markdown: string): number {
  const wordCount = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function parseMarkdownFile(filePath: string): { frontmatter: BlogFrontmatter; content: string } | null {
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);

  if (!isValidFrontmatter(data)) {
    // eslint-disable-next-line no-console
    console.warn(`Skipping invalid blog frontmatter in ${path.basename(filePath)}`);
    return null;
  }

  return { frontmatter: data, content };
}

function getBlogFiles(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs.readdirSync(BLOG_DIRECTORY).filter((fileName) => fileName.endsWith('.md'));
}

export function getBlogPostsMeta(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];

  for (const fileName of getBlogFiles()) {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(BLOG_DIRECTORY, fileName);
    const parsed = parseMarkdownFile(fullPath);
    if (!parsed || parsed.frontmatter.draft) {
      continue;
    }

    posts.push({
      slug,
      title: parsed.frontmatter.title,
      date: parsed.frontmatter.date,
      summary: parsed.frontmatter.summary,
      tags: parsed.frontmatter.tags ?? [],
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(BLOG_DIRECTORY, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const parsed = parseMarkdownFile(fullPath);
  if (!parsed || parsed.frontmatter.draft) {
    return null;
  }

  const processed = await remark().use(html).process(parsed.content);

  return {
    slug,
    title: parsed.frontmatter.title,
    date: parsed.frontmatter.date,
    summary: parsed.frontmatter.summary,
    tags: parsed.frontmatter.tags ?? [],
    contentHtml: processed.toString(),
    readingTime: calculateReadingTime(parsed.content),
  };
}
