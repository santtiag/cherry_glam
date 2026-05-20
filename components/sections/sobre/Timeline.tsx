"use client";

import { TimelineItem } from "./TimelineItem";
import type { TimelineEvent } from "@/types/timeline";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay eventos en la línea de tiempo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-0">
      {events.map((event, index) => (
        <TimelineItem
          key={event.id}
          event={event}
          index={index}
          isLast={index === events.length - 1}
        />
      ))}
    </div>
  );
}
