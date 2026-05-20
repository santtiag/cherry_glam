"use client";

import { Marquee } from "@/components/motion/Marquee";
import { TestimonialCard } from "./TestimonialCard";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
}

export function TestimonialsMarquee({
  testimonials,
}: TestimonialsMarqueeProps) {
  if (testimonials.length === 0) return null;

  return (
    <Marquee className="py-4">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
        />
      ))}
    </Marquee>
  );
}
