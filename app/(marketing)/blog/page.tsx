import { getPublishedPosts } from "@/lib/actions/blog";
import { BlogList } from "@/components/sections/blog/BlogList";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips de maquillaje, lanzamientos, noticias y todo lo que necesitas saber sobre el mundo de la belleza.",
};

export const revalidate = 3600;

export default async function BlogPage() {
  let posts;
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  return (
    <>
      <section className="relative bg-cherry py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <RevealOnScroll>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Blog & Novedades
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Tips, lanzamientos y todo sobre el mundo del maquillaje.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}
