import React from 'react';
interface MarkdownRendererProps {
  contentHtml: string;
}

export function MarkdownRenderer({ contentHtml }: MarkdownRendererProps) {
  return <div className="markdown" dangerouslySetInnerHTML={{ __html: contentHtml }} />;
}
