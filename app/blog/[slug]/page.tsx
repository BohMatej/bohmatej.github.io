import React from 'react';
import { notFound } from 'next/navigation';

import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { getBlogPostBySlug, getBlogPostsMeta } from '@/lib/blog';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getBlogPostsMeta().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="page section-fade">
      <header className="hero">
        <p className="eyebrow">Blog Post</p>
        <h1>{post.title}</h1>
        <p>
          {new Date(post.date).toLocaleDateString('en-GB')} · {post.readingTime} min read
        </p>
      </header>
      <section className="card stagger-item">
        <MarkdownRenderer contentHtml={post.contentHtml} />
      </section>
    </article>
  );
}
