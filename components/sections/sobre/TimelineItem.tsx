"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { TimelineEvent } from "@/types/timeline";
import type { LucideIcon } from "lucide-react";

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLast: boolean;
}

export function TimelineItem({ event, index, isLast }: TimelineItemProps) {
  const IconComponent =
    (Icons[event.icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;

  const isEven = index % 2 === 0;

  return (
    <div className="relative">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-1/2 top-16 h-full w-px -translate-x-1/2 bg-cherry/20 hidden md:block" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
          isEven ? "" : "md:[direction:rtl]"
        }`}
      >
        <div className={`${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12 md:[direction:ltr]"}`}>
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cherry text-white">
              <IconComponent className="h-5 w-5" />
            </div>
            <span className="font-serif text-3xl font-bold text-cherry">
              {event.year}
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground">
            {event.title}
          </h3>
          <p className="mt-2 text-muted-foreground">{event.description}</p>
        </div>

        {/* Center dot */}
        <div className="hidden md:flex justify-center">
          <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-cherry ring-4 ring-white">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
        </div>

        <div className={`${isEven ? "md:pl-12" : "md:pr-12 md:[direction:ltr]"}`}>
          <div className="rounded-2xl bg-cherry-50 p-6 border border-cherry-100">
            <p className="text-sm text-muted-foreground">
              {event.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
