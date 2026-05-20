import Link from "next/link";
import { Sparkles, Phone, MapPin, Clock } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

const footerLinks = {
  navegacion: [
    { href: "/", label: "Inicio" },
    { href: "/sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/blog", label: "Blog" },
    { href: "/contacto", label: "Contacto" },
  ],
  legal: [
    { href: "#", label: "Términos y Condiciones" },
    { href: "#", label: "Política de Privacidad" },
    { href: "#", label: "Política de Envíos" },
  ],
};

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE;

  return (
    <footer className="bg-cherry text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl font-bold">Cherry Glam</span>
            </Link>
            <p className="text-sm text-white/70 max-w-xs">
              Tu tienda de maquillaje premium. Productos de calidad,
              asesoría personalizada y entregas a domicilio.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Tu ciudad, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Lun - Sáb: 9am - 7pm</span>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              {instagramHandle && (
                <a
                  href={`https://instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Cherry Glam. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/50 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
