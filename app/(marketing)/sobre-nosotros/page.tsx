import { getTimelineEvents } from "@/lib/actions/timeline";
import { Timeline } from "@/components/sections/sobre/Timeline";
import { MissionVisionValues } from "@/components/sections/sobre/MissionVisionValues";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce la historia de Cherry Glam, nuestra misión, visión y valores. Desde 2022 llevando belleza y confianza a cada rincón.",
};

// Mock fallback timeline
const mockTimeline = [
  {
    id: "1",
    year: 2022,
    title: "Nace Cherry Glam",
    description:
      "Desde casa, con pasión y dedicación, comenzamos a ofrecer productos de maquillaje a nuestras primeras clientas.",
    icon: "Sparkles",
    sort_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    year: 2023,
    title: "Primer Local Físico",
    description:
      "Abrimos nuestras puertas con un espacio acogedor donde las clientas pueden probar y elegir sus productos favoritos.",
    icon: "Store",
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    year: 2024,
    title: "+500 Clientas Felices",
    description:
      "Celebramos haber servido a más de 500 clientas satisfechas, construyendo una comunidad de belleza y confianza.",
    icon: "Users",
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    year: 2025,
    title: "Entregas Personalizadas",
    description:
      "Lanzamos nuestro servicio de entregas a domicilio con empaque personalizado y notas de agradecimiento.",
    icon: "Truck",
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "5",
    year: 2026,
    title: "Expansión Nacional",
    description:
      "Enviamos productos a todo Colombia, llevando la experiencia Cherry Glam a cada departamento del país.",
    icon: "Globe",
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
];

export default async function SobreNosotrosPage() {
  let events;
  try {
    events = await getTimelineEvents();
  } catch {
    events = mockTimeline;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cherry py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <RevealOnScroll>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Sobre Cherry Glam
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Nuestra historia, nuestra pasión y nuestro compromiso con la
              belleza auténtica.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Lo que nos Define
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Nuestra misión, visión y valores son el corazón de Cherry Glam.
              </p>
            </div>
          </RevealOnScroll>
          <MissionVisionValues />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-cherry-50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Nuestra Historia
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Un viaje de pasión, dedicación y crecimiento.
              </p>
            </div>
          </RevealOnScroll>
          <Timeline events={events.length > 0 ? events : mockTimeline} />
        </div>
      </section>
    </>
  );
}
