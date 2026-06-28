"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* ponytail: 4 copias para que el contenido siempre cubra el viewport y el bucle (-50%) no muestre hueco/salto con pocos testimonios */}
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
