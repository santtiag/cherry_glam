"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Misión",
    description:
      "Empoderar a cada mujer para que se sienta segura y radiante, ofreciendo productos de maquillaje de alta calidad con asesoría personalizada que se adapta a su estilo único.",
  },
  {
    icon: Eye,
    title: "Visión",
    description:
      "Ser la tienda de maquillaje de referencia en Colombia, reconocida por nuestra calidad, innovación y compromiso con la belleza auténtica de cada persona.",
  },
  {
    icon: Heart,
    title: "Valores",
    description:
      "Calidad, autenticidad, inclusión, pasión por la belleza y servicio excepcional. Creemos que cada persona merece sentirse hermosa y confiada.",
  },
];

export function MissionVisionValues() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-cherry-100 hover:shadow-md transition-shadow"
        >
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-cherry/10 group-hover:bg-cherry transition-colors">
            <item.icon className="h-7 w-7 text-cherry group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
