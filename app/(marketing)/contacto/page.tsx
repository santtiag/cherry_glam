import { ContactInfo } from "@/components/sections/contacto/ContactInfo";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para hacer tu pedido, resolver dudas o recibir asesoría personalizada de maquillaje.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="relative bg-cherry py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <RevealOnScroll>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Contáctanos
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Estamos aquí para ayudarte. Escríbenos por WhatsApp o síguenos en
              redes sociales.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
