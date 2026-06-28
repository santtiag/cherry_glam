// Tokens de motion compartidos para todo el sitio (Framer Motion).
// Centraliza el "easing de marca" para que todas las animaciones se sientan iguales.

import type { Variants, Transition } from "framer-motion";

// Curva de marca (easeInOutCubic-like) ya usada en RevealOnScroll/FadeIn.
export const EASE_BRAND = [0.25, 0.1, 0.25, 1] as const;

export const transition = (duration = 0.6, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_BRAND,
});

// Aparición hacia arriba reutilizable (con/ sin stagger).
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: transition(0.7, delay as number),
  }),
};

// Contenedor para escalonar hijos.
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

// Hijo de un staggerContainer.
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition(0.6) },
};
