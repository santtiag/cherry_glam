// Construye enlaces wa.me con mensaje pre-armado. Devuelve null si no hay número.

export function whatsappLink(message: string): string | null {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(productName: string, price?: string): string {
  return price
    ? `¡Hola Cherry Glam! Quiero pedir: ${productName} (${price}). ¿Me ayudas?`
    : `¡Hola Cherry Glam! Quiero pedir: ${productName}. ¿Me ayudas?`;
}
