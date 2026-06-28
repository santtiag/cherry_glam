"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/lib/useWishlist";
import { whatsappLink, orderMessage } from "@/lib/whatsapp";

type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Labial Mate Premium",
    price: "$36.000",
    oldPrice: "$45.000",
    discount: "-20%",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    category: "Labiales",
  },
  {
    id: 2,
    name: "Base de Maquillaje HD",
    price: "$89.000",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80",
    category: "Rostro",
  },
  {
    id: 3,
    name: "Paleta de Sombras",
    price: "$120.000",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    category: "Ojos",
  },
  {
    id: 4,
    name: "Máscara de Pestañas",
    price: "$55.000",
    image:
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80",
    category: "Ojos",
  },
  {
    id: 5,
    name: "Iluminador Líquido",
    price: "$52.000",
    oldPrice: "$65.000",
    discount: "-20%",
    image:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80",
    category: "Rostro",
  },
  {
    id: 6,
    name: "Kit de Brochas Profesional",
    price: "$150.000",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&q=80",
    category: "Accesorios",
  },
];

export function ProductGrid() {
  const { has, toggle } = useWishlist();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const wa = whatsappLink(orderMessage(product.name, product.price));
        const fav = has(String(product.id));
        return (
          <div
            key={product.id}
            className="group rounded-2xl bg-white overflow-hidden shadow-[var(--shadow-soft)] border border-cherry-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
          >
            <div className="relative aspect-square overflow-hidden bg-cherry-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-cherry shadow-sm">
                  {product.category}
                </span>
                {product.discount && (
                  <span className="inline-flex w-fit items-center rounded-full bg-cherry px-2.5 py-0.5 text-xs font-bold text-white shadow-sm ring-1 ring-gold/60">
                    {product.discount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => toggle(String(product.id))}
                aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
                aria-pressed={fav}
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-transform hover:scale-110 active:scale-90"
              >
                <Heart
                  className={`h-4.5 w-4.5 transition-colors ${
                    fav ? "fill-cherry text-cherry" : "text-cherry/70"
                  }`}
                />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {product.name}
              </h3>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-cherry">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
                <Button
                  asChild={!!wa}
                  size="sm"
                  className="shimmer-on-hover bg-cherry hover:bg-cherry-dark [a]:hover:bg-cherry-dark text-white active:scale-95 transition-all duration-300"
                >
                  {wa ? (
                    <Link href={wa} target="_blank" rel="noopener noreferrer">
                      <ShoppingCart className="mr-1.5 h-4 w-4" />
                      Pedir
                    </Link>
                  ) : (
                    <span>
                      <ShoppingCart className="mr-1.5 h-4 w-4" />
                      Pedir
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
