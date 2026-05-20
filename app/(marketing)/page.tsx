import { getActiveBanners } from "@/lib/actions/banners";
import { getActiveTestimonials } from "@/lib/actions/testimonials";
import { getPublishedPosts } from "@/lib/actions/blog";
import { HeroSlider } from "@/components/sections/hero/HeroSlider";
import { TestimonialsMarquee } from "@/components/sections/testimonios/TestimonialsMarquee";
import { BlogList } from "@/components/sections/blog/BlogList";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Truck, HeartHandshake } from "lucide-react";

// Mock fallback banners when Supabase is not configured
const mockBanners = [
  {
    id: "1",
    title: "Brilla con Cherry Glam",
    subtitle:
      "Descubre nuestra colección de maquillaje premium y transforma tu look hoy mismo.",
    image_url:
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=1920&q=80",
    link: "/catalogo",
  },
  {
    id: "2",
    title: "Día de la Madre",
    subtitle: "Encuentra el regalo perfecto con un 20% de descuento en sets especiales.",
    image_url:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=80",
    link: "/catalogo",
  },
  {
    id: "3",
    title: "Nuevos Labiales",
    subtitle: "Colores vibrantes y fórmulas de larga duración para cada ocasión.",
    image_url:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1920&q=80",
    link: "/catalogo",
  },
];

const features = [
  {
    icon: ShoppingBag,
    title: "Productos Premium",
    description:
      "Seleccionamos las mejores marcas y fórmulas para cuidar tu piel.",
  },
  {
    icon: Truck,
    title: "Entregas a Domicilio",
    description:
      "Recibe tus productos favoritos en la puerta de tu casa.",
  },
  {
    icon: HeartHandshake,
    title: "Asesoría Personalizada",
    description:
      "Te ayudamos a encontrar los productos perfectos para tu tipo de piel.",
  },
];

export default async function HomePage() {
  let banners;
  let testimonials;
  let posts;

  try {
    banners = await getActiveBanners();
  } catch {
    banners = mockBanners;
  }

  try {
    testimonials = await getActiveTestimonials();
  } catch {
    testimonials = [];
  }

  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  return (
    <>
      <HeroSlider banners={banners.length > 0 ? banners : mockBanners} />

      {/* Features */}
      <section className="py-20 bg-cherry-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cherry/10 mb-4">
                    <feature.icon className="h-7 w-7 text-cherry" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Testimonials preview */}
      {testimonials.length > 0 && (
        <section className="py-20 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 mb-10">
            <RevealOnScroll>
              <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Lo que dicen nuestras clientas
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Miles de mujeres confían en Cherry Glam para realzar su
                  belleza natural.
                </p>
              </div>
            </RevealOnScroll>
          </div>
          <TestimonialsMarquee testimonials={testimonials} />
        </section>
      )}

      {/* Blog preview */}
      {posts.length > 0 && (
        <section className="py-20 bg-cherry-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <RevealOnScroll>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                    Últimas Novedades
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Tips, lanzamientos y noticias del mundo del maquillaje.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="hidden md:flex border-cherry text-cherry hover:bg-cherry hover:text-white"
                >
                  <Link href="/blog">
                    Ver Todo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </RevealOnScroll>
            <BlogList posts={posts.slice(0, 3)} />
            <div className="mt-8 flex justify-center md:hidden">
              <Button
                asChild
                variant="outline"
                className="border-cherry text-cherry hover:bg-cherry hover:text-white"
              >
                <Link href="/blog">
                  Ver Todo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-cherry px-6 py-16 text-center md:px-16">
              <div className="relative z-10">
                <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
                  ¿Lista para brillar?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                  Explora nuestro catálogo y encuentra los productos perfectos
                  para ti.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-cherry hover:bg-white/90 font-semibold"
                  >
                    <Link href="/catalogo">
                      Ver Catálogo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Link href="/contacto">Contáctanos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
