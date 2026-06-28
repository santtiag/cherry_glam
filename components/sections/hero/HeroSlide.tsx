"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { EASE_BRAND } from "@/lib/motion";

interface HeroSlideProps {
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  link?: string | null;
}

export function HeroSlide({ title, subtitle, imageUrl, link }: HeroSlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: la imagen se mueve más lento que el scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div
      ref={ref}
      className="relative h-[600px] md:h-[700px] lg:h-[800px] w-full overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Gradiente cherry + viñeta dorada para profundidad */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-r from-cherry-dark via-cherry/90 to-cherry/25"
      />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_85%_15%,rgba(212,165,116,0.28),transparent_55%)]" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7, ease: EASE_BRAND }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2"
            >
              <span className="h-px w-10 bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">
                Maquillaje Premium
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: EASE_BRAND }}
                className="mt-4 block h-[3px] w-28 origin-left rounded-full [background:var(--gradient-gold)]"
              />
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 text-lg text-white/90 md:text-xl max-w-lg"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="shimmer-on-hover bg-white text-cherry hover:bg-white/90 [a]:hover:bg-white/90 font-semibold shadow-lg active:scale-95 transition-all duration-300"
              >
                <Link href={link || "/catalogo"}>
                  Ver Productos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white active:scale-95 transition-all duration-300"
              >
                <Link href="/sobre-nosotros">Conoce Más</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
