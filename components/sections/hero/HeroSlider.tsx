"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSlide } from "./HeroSlide";
import { HeroControls } from "./HeroControls";
import type { Banner } from "@/types/banner";

interface HeroSliderProps {
  banners: Banner[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, banners.length]);

  if (banners.length === 0) {
    return (
      <div className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full bg-cherry flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="font-serif text-4xl font-bold mb-4">Cherry Glam</h1>
          <p className="text-lg text-white/80">Tu tienda de maquillaje premium</p>
        </div>
      </div>
    );
  }

  const banner = banners[current];

  return (
    <section className="relative">
      <AnimatePresence mode="wait">
        <HeroSlide
          key={banner.id}
          title={banner.title}
          subtitle={banner.subtitle}
          imageUrl={banner.image_url}
          link={banner.link}
        />
      </AnimatePresence>

      {banners.length > 1 && (
        <HeroControls
          total={banners.length}
          current={current}
          onSelect={setCurrent}
        />
      )}
    </section>
  );
}
