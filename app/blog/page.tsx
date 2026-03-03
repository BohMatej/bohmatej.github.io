import React from 'react';

import { BlogListItem } from '@/components/BlogListItem';
import { getBlogPostsMeta } from '@/lib/blog';

export default function BlogIndexPage() {
  const posts = getBlogPostsMeta();

  return (
    <section className="page section-fade">
      <div className="hero">
        {/* <p className="eyebrow">Writing</p> */}
        <h1>Blog</h1>
      </div>
      {posts.length === 0 ? (
        <div className="card stagger-item">
          <p>No posts yet.</p>
        </div>
      ) : (
        <div className="stack stagger-group">
          {posts.map((post) => (
            <BlogListItem key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
