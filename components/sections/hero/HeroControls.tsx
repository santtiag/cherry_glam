"use client";

import { cn } from "@/lib/utils";

interface HeroControlsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function HeroControls({ total, current, onSelect }: HeroControlsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={cn(
            "h-2.5 rounded-full transition-all duration-500",
            index === current
              ? "w-8 bg-white"
              : "w-2.5 bg-white/40 hover:bg-white/60"
          )}
          aria-label={`Ir al slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
