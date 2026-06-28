"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-cherry-100 shadow-[var(--shadow-soft)]"
          : "bg-white/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cherry text-white shadow-[var(--shadow-soft)] transition-transform group-hover:scale-105 group-hover:rotate-6">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-serif text-xl font-bold text-cherry tracking-tight">
            Cherry Glam
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-cherry" : "text-foreground/80 hover:text-cherry"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full [background:var(--gradient-gold)]"
                  />
                )}
              </Link>
            );
          })}
          <Button
            asChild
            className="shimmer-on-hover ml-2 bg-cherry hover:bg-cherry-dark text-white active:scale-95 transition-transform"
          >
            <Link href="/catalogo">Comprar Ahora</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-cherry-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6 text-cherry" /> : <Menu className="h-6 w-6 text-cherry" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-cherry-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-cherry hover:bg-cherry-50 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="w-full mt-2 bg-cherry hover:bg-cherry-dark text-white"
              >
                <Link href="/catalogo" onClick={() => setIsOpen(false)}>
                  Comprar Ahora
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
