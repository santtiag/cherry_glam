import { getPostBySlug, getPublishedPosts } from "@/lib/actions/blog";
import { BlogContent } from "@/components/sections/blog/BlogContent";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "No encontrado",
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || "",
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || "",
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h1 className="font-serif text-3xl font-bold">Publicación no encontrada</h1>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/blog">Volver al Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="py-12 md:py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <RevealOnScroll>
          <Button
            asChild
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-foreground"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Blog
            </Link>
          </Button>

          {post.cover_image && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-10">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full bg-cherry/10 px-3 py-1 text-xs font-medium text-cherry">
              {post.category}
            </span>
            {post.published_at && (
              <time className="text-sm text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>

          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <hr className="my-10 border-cherry-100" />

          <BlogContent content={post.content} />
        </RevealOnScroll>
      </div>
    </article>
  );
}
