"use client";

import { useState } from "react";
import { getAllBanners, deleteBanner } from "@/lib/actions/banners";
import { BannerForm } from "@/components/admin/BannerForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Banner } from "@/types/banner";
import { useEffect } from "react";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function loadBanners() {
    setIsLoading(true);
    try {
      const data = await getAllBanners();
      setBanners(data);
    } catch {
      setBanners([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadBanners();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Estás segura de eliminar este banner?")) return;
    try {
      await deleteBanner(id);
      await loadBanners();
    } catch {
      alert("Error al eliminar");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Banners</h1>
          <p className="text-muted-foreground">Gestiona los banners del Hero</p>
        </div>
        <Button
          onClick={() => {
            setEditingBanner(null);
            setIsDialogOpen(true);
          }}
          className="bg-cherry hover:bg-cherry-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Banner
        </Button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center">Cargando...</div>
      ) : banners.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-cherry-100">
          <p className="text-muted-foreground">No hay banners aún.</p>
          <Button
            onClick={() => {
              setEditingBanner(null);
              setIsDialogOpen(true);
            }}
            variant="outline"
            className="mt-4"
          >
            Crear el primero
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow-sm border border-cherry-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell>{banner.start_date}</TableCell>
                  <TableCell>{banner.end_date || "Sin fin"}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        banner.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {banner.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingBanner(banner);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(banner.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBanner ? "Editar Banner" : "Nuevo Banner"}
            </DialogTitle>
          </DialogHeader>
          <BannerForm
            banner={editingBanner || undefined}
            onSuccess={() => {
              setIsDialogOpen(false);
              loadBanners();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
