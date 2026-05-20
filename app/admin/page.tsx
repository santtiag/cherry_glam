import { getAllBanners } from "@/lib/actions/banners";
import { getAllPosts } from "@/lib/actions/blog";
import { getAllTestimonials } from "@/lib/actions/testimonials";
import { getAllTimelineEvents } from "@/lib/actions/timeline";
import { StatCard } from "@/components/admin/StatCard";
import {
  Image,
  FileText,
  MessageSquareQuote,
  Timer,
  Eye,
  MousePointerClick,
} from "lucide-react";

export default async function AdminDashboardPage() {
  let bannersCount = 0;
  let postsCount = 0;
  let testimonialsCount = 0;
  let timelineCount = 0;

  try {
    const banners = await getAllBanners();
    bannersCount = banners.length;
  } catch {
    bannersCount = 0;
  }

  try {
    const posts = await getAllPosts();
    postsCount = posts.length;
  } catch {
    postsCount = 0;
  }

  try {
    const testimonials = await getAllTestimonials();
    testimonialsCount = testimonials.length;
  } catch {
    testimonialsCount = 0;
  }

  try {
    const events = await getAllTimelineEvents();
    timelineCount = events.length;
  } catch {
    timelineCount = 0;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de tu sitio web</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Banners"
          value={bannersCount}
          icon={<Image className="h-6 w-6 text-cherry" />}
        />
        <StatCard
          title="Entradas Blog"
          value={postsCount}
          icon={<FileText className="h-6 w-6 text-cherry" />}
        />
        <StatCard
          title="Testimonios"
          value={testimonialsCount}
          icon={<MessageSquareQuote className="h-6 w-6 text-cherry" />}
        />
        <StatCard
          title="Eventos Timeline"
          value={timelineCount}
          icon={<Timer className="h-6 w-6 text-cherry" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-cherry-100">
          <h2 className="font-serif text-xl font-semibold mb-4">Métricas</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-cherry-50">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-cherry" />
                <span className="text-sm font-medium">Visitas totales</span>
              </div>
              <span className="font-bold text-foreground">--</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-cherry-50">
              <div className="flex items-center gap-3">
                <MousePointerClick className="h-5 w-5 text-cherry" />
                <span className="text-sm font-medium">Clics a WhatsApp</span>
              </div>
              <span className="font-bold text-foreground">--</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Las métricas avanzadas requieren configuración de analytics.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-cherry-100">
          <h2 className="font-serif text-xl font-semibold mb-4">Acceso Rápido</h2>
          <div className="space-y-2">
            <a
              href="/admin/banners"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-cherry-50 transition-colors"
            >
              <Image className="h-5 w-5 text-cherry" />
              <span className="text-sm">Gestionar Banners</span>
            </a>
            <a
              href="/admin/blog"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-cherry-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-cherry" />
              <span className="text-sm">Gestionar Blog</span>
            </a>
            <a
              href="/admin/testimonios"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-cherry-50 transition-colors"
            >
              <MessageSquareQuote className="h-5 w-5 text-cherry" />
              <span className="text-sm">Gestionar Testimonios</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
