"use client";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-cherry hover:prose-a:text-cherry-dark prose-strong:text-foreground prose-li:text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
