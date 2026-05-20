"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Labial Mate Premium",
    price: "$45.000",
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
    price: "$65.000",
    image:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80",
    category: "Rostro",
  },
  {
    id: 6,
    name: "Kit de Brochas Profesional",
    price: "$150.000",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=400&q=80",
    category: "Accesorios",
  },
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="group rounded-2xl bg-white overflow-hidden shadow-sm border border-cherry-100 hover:shadow-lg transition-all duration-300"
        >
          <div className="relative aspect-square overflow-hidden bg-cherry-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-cherry">
                {product.category}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {product.name}
            </h3>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-cherry">{product.price}</span>
              <Button
                size="sm"
                className="bg-cherry hover:bg-cherry-dark text-white"
              >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                Pedir
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
