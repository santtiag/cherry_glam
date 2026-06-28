import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { PromoBar } from "@/components/layout/PromoBar";
import { getActiveDiscounts } from "@/lib/actions/discounts";
import type { Discount } from "@/types/discount";

// Promo de respaldo si Supabase no está disponible (graceful degradation).
const mockPromo = {
  id: "mock-promo",
  title: "Envío gratis en compras desde $120.000 · ¡Pide hoy!",
  code: null,
  link: "/catalogo",
} as Pick<Discount, "id" | "title" | "code" | "link">;

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let promo: Pick<Discount, "id" | "title" | "code" | "link"> | undefined;
  try {
    const discounts = await getActiveDiscounts();
    promo = discounts[0] ?? mockPromo;
  } catch {
    promo = mockPromo;
  }

  return (
    <>
      {promo && (
        <PromoBar
          promoId={promo.id}
          message={promo.title}
          code={promo.code}
          link={promo.link}
        />
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
