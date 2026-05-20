"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-[350px] shrink-0 mx-3">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-cherry-100 h-full">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 border-2 border-cherry/10">
            <AvatarImage src={testimonial.avatar_url || undefined} />
            <AvatarFallback className="bg-cherry text-white font-medium">
              {testimonial.initial}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground text-sm">
              {testimonial.name}
            </p>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < testimonial.rating
                      ? "fill-gold text-gold"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "{testimonial.message}"
        </p>
        <p className="mt-4 text-xs text-muted-foreground/60">
          {new Date(testimonial.testimonial_date).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
