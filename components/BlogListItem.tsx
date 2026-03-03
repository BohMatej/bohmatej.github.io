import React from 'react';
import Link from 'next/link';

import type { BlogPostMeta } from '@/types/content';

interface BlogListItemProps {
  post: BlogPostMeta;
}

export function BlogListItem({ post }: BlogListItemProps) {
  return (
    <article className="card stagger-item" aria-labelledby={`post-${post.slug}`}>
      <p className="muted">{new Date(post.date).toLocaleDateString('en-GB')}</p>
      <h2 id={`post-${post.slug}`}>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p>{post.summary}</p>
      {post.tags?.length ? (
        <ul className="inline-list" aria-label="Post tags">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
