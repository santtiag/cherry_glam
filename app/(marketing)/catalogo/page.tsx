import { ProductGrid } from "@/components/sections/catalogo/ProductGrid";
import { CatalogCtas } from "@/components/sections/catalogo/CatalogCtas";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora nuestro catálogo de maquillaje premium. Labiales, bases, sombras y más.",
};

export default function CatalogoPage() {
  return (
    <>
      <section className="relative bg-cherry py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <RevealOnScroll>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Nuestro Catálogo
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Productos seleccionados con amor para realzar tu belleza natural.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll>
            <CatalogCtas />
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                Productos Destacados
              </h2>
              <p className="mt-2 text-muted-foreground">
                Estos son algunos de nuestros favoritos.
              </p>
            </div>
          </RevealOnScroll>
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
