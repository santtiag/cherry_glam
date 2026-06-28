"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Image,
  FileText,
  MessageSquareQuote,
  Timer,
  Tag,
  LogOut,
  Sparkles,
} from "lucide-react";
import { signOut } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/banners", label: "Banners", icon: Image },
  { href: "/admin/descuentos", label: "Descuentos", icon: Tag },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/testimonios", label: "Testimonios", icon: MessageSquareQuote },
  { href: "/admin/linea-de-tiempo", label: "Línea de Tiempo", icon: Timer },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 [background:var(--gradient-cherry)] text-white shadow-[var(--shadow-lift)]">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-gold/40">
            <Sparkles className="h-5 w-5 text-gold-light" />
          </div>
          <span className="font-serif text-lg font-bold">Cherry Glam</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full [background:var(--gradient-gold)]" />
                )}
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
