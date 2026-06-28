"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

interface PromoBarProps {
  message: string;
  code?: string | null;
  link?: string | null;
  // id estable para recordar si la persona la cerró
  promoId: string;
}

export function PromoBar({ message, code, link, promoId }: PromoBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("cg_promo_dismissed") !== promoId);
  }, [promoId]);

  if (!visible) return null;

  const content = (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-10 py-2 text-center text-sm">
      <Sparkles className="h-4 w-4 shrink-0 text-gold-light" />
      <span className="font-medium text-white">{message}</span>
      {code && (
        <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-xs font-semibold text-gold-light">
          {code}
        </span>
      )}
    </div>
  );

  return (
    <div className="relative z-[60] [background:var(--gradient-cherry)]">
      {link ? (
        <Link href={link} className="block transition-opacity hover:opacity-90">
          {content}
        </Link>
      ) : (
        content
      )}
      <button
        type="button"
        onClick={() => {
          localStorage.setItem("cg_promo_dismissed", promoId);
          setVisible(false);
        }}
        aria-label="Cerrar promoción"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
