import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ExternalLink } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cherry-50">
      <AdminSidebar />
      <main className="ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-cherry-100 bg-white/80 px-8 py-3 backdrop-blur-md">
          <p className="text-sm text-muted-foreground">
            Panel de administración ·{" "}
            <span className="font-medium text-cherry">Cherry Glam</span>
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-cherry transition-colors hover:bg-cherry-50"
          >
            Ver sitio
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
