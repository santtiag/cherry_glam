import { getActiveBanners } from "@/lib/actions/banners";
import { getActiveTestimonials } from "@/lib/actions/testimonials";
import { getPublishedPosts } from "@/lib/actions/blog";
import { HeroSlider } from "@/components/sections/hero/HeroSlider";
import { TestimonialsMarquee } from "@/components/sections/testimonios/TestimonialsMarquee";
import { BlogList } from "@/components/sections/blog/BlogList";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Truck, HeartHandshake, Star, Users, Package } from "lucide-react";

const trustStats = [
  { icon: Users, value: "+1.000", label: "Clientas felices" },
  { icon: Star, value: "4.9/5", label: "Calificación promedio" },
  { icon: Package, value: "+5.000", label: "Pedidos entregados" },
];

// Mock fallback banners when Supabase is not configured
const mockBanners = [
  {
    id: "1",
    title: "Brilla con Cherry Glam",
    subtitle:
      "Descubre nuestra colección de maquillaje premium y transforma tu look hoy mismo.",
    image_url:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=1920&q=80",
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
              {features.map((feature, i) => (
                <RevealOnScroll
                  key={feature.title}
                  delay={i * 0.12}
                  className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-cherry-100/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cherry/10 transition-colors group-hover:bg-cherry">
                    <feature.icon className="h-7 w-7 text-cherry transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                    <span className="absolute inset-0 rounded-full ring-1 ring-gold/40 transition-all duration-300 group-hover:ring-gold group-hover:ring-2" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-y border-cherry-100 bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {trustStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <stat.icon className="mb-3 h-7 w-7 text-gold-dark" />
                  <span className="font-serif text-4xl font-bold text-cherry">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </span>
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
            <div className="grain-overlay relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-16 [background:var(--gradient-cherry)] shadow-[var(--shadow-lift)]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full [background:radial-gradient(circle,rgba(212,165,116,0.25),transparent_70%)]" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full [background:radial-gradient(circle,rgba(212,165,116,0.18),transparent_70%)]" />
              <div className="relative z-10">
                <div className="mx-auto mb-4 h-px w-16 [background:var(--gradient-gold)]" />
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
                    className="shimmer-on-hover bg-white text-cherry hover:bg-white [a]:hover:bg-white font-semibold active:scale-95 transition-all duration-300"
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
                    className="bg-white text-cherry border-transparent hover:bg-cherry hover:text-white [a]:hover:bg-cherry transition-all duration-300"
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
