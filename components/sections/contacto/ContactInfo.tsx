"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function ContactInfo() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-cherry-100">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
          Información de Contacto
        </h3>
        <ul className="space-y-5">
          <li className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cherry/10">
              <MapPin className="h-5 w-5 text-cherry" />
            </div>
            <div>
              <p className="font-medium text-foreground">Dirección</p>
              <p className="text-sm text-muted-foreground">Tu ciudad, Colombia</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cherry/10">
              <Phone className="h-5 w-5 text-cherry" />
            </div>
            <div>
              <p className="font-medium text-foreground">Teléfono</p>
              <p className="text-sm text-muted-foreground">+57 300 123 4567</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cherry/10">
              <Mail className="h-5 w-5 text-cherry" />
            </div>
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">
                hola@cherryglam.com
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cherry/10">
              <Clock className="h-5 w-5 text-cherry" />
            </div>
            <div>
              <p className="font-medium text-foreground">Horario</p>
              <p className="text-sm text-muted-foreground">
                Lunes - Sábado: 9:00 AM - 7:00 PM
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm border border-cherry-100">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
          Redes Sociales
        </h3>
        <div className="space-y-4">
          {instagramHandle && (
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 hover:shadow-sm transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                <InstagramIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-foreground">Instagram</p>
                <p className="text-sm text-muted-foreground">@{instagramHandle}</p>
              </div>
            </a>
          )}

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:shadow-sm transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">+57 {whatsappNumber.slice(2)}</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
