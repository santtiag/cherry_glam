"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-cherry-100">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={
              post.cover_image ||
              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
            }
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-cherry/10 px-2.5 py-0.5 text-xs font-medium text-cherry">
              {post.category}
            </span>
            {post.published_at && (
              <span className="text-xs text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-cherry transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto pt-4 flex items-center text-sm font-medium text-cherry">
            Leer más
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
