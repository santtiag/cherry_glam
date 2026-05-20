"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function CatalogCtas() {
  const treintaUrl = process.env.NEXT_PUBLIC_TREINTA_URL;
  const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    "¡Hola! Vi tu catálogo web y quiero hacer un pedido."
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {treintaUrl && (
        <Button
          asChild
          variant="outline"
          className="h-auto py-6 flex-col gap-2 border-cherry text-cherry hover:bg-cherry hover:text-white"
        >
          <Link href={treintaUrl} target="_blank" rel="noopener noreferrer">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-semibold">Ver en Treinta</span>
            <span className="text-xs opacity-80">Catálogo completo</span>
          </Link>
        </Button>
      )}

      {instagramHandle && (
        <Button
          asChild
          variant="outline"
          className="h-auto py-6 flex-col gap-2 border-pink-400 text-pink-500 hover:bg-pink-500 hover:text-white"
        >
          <Link
            href={`https://instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="h-6 w-6" />
            <span className="font-semibold">Síguenos en IG</span>
            <span className="text-xs opacity-80">@cherryglam</span>
          </Link>
        </Button>
      )}

      {whatsappNumber && (
        <Button
          asChild
          variant="outline"
          className="h-auto py-6 flex-col gap-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
        >
          <Link
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="font-semibold">Pedir por WhatsApp</span>
            <span className="text-xs opacity-80">Respuesta inmediata</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
