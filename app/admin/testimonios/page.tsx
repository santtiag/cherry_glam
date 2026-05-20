"use client";

import { useState, useEffect } from "react";
import {
  getAllTestimonials,
  deleteTestimonial,
} from "@/lib/actions/testimonials";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
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
import { Pencil, Trash2, Plus, Star } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";

export default function AdminTestimoniosPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function loadTestimonials() {
    setIsLoading(true);
    try {
      const data = await getAllTestimonials();
      setTestimonials(data);
    } catch {
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Estás segura de eliminar este testimonio?")) return;
    try {
      await deleteTestimonial(id);
      await loadTestimonials();
    } catch {
      alert("Error al eliminar");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Testimonios</h1>
          <p className="text-muted-foreground">Gestiona los testimonios de clientas</p>
        </div>
        <Button
          onClick={() => {
            setEditingTestimonial(null);
            setIsDialogOpen(true);
          }}
          className="bg-cherry hover:bg-cherry-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Testimonio
        </Button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center">Cargando...</div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-cherry-100">
          <p className="text-muted-foreground">No hay testimonios aún.</p>
          <Button
            onClick={() => {
              setEditingTestimonial(null);
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
                <TableHead>Nombre</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Mensaje</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < t.rating
                              ? "fill-gold text-gold"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{t.message}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        t.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingTestimonial(t);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(t.id)}
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
              {editingTestimonial ? "Editar Testimonio" : "Nuevo Testimonio"}
            </DialogTitle>
          </DialogHeader>
          <TestimonialForm
            testimonial={editingTestimonial || undefined}
            onSuccess={() => {
              setIsDialogOpen(false);
              loadTestimonials();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
