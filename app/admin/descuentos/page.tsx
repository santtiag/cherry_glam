"use client";

import { useState, useEffect } from "react";
import { getAllDiscounts, deleteDiscount } from "@/lib/actions/discounts";
import { DiscountForm } from "@/components/admin/DiscountForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Pencil, Trash2, Plus, Search, Tag } from "lucide-react";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import type { Discount } from "@/types/discount";

function formatValue(d: Discount) {
  return d.type === "percent"
    ? `${d.value}%`
    : `$${d.value.toLocaleString("es-CO")}`;
}

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState<Discount | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [query, setQuery] = useState("");

  async function load() {
    setIsLoading(true);
    try {
      setDiscounts(await getAllDiscounts());
    } catch {
      setDiscounts([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Estás segura de eliminar este descuento?")) return;
    try {
      await deleteDiscount(id);
      await load();
    } catch {
      alert("Error al eliminar");
    }
  }

  const filtered = discounts.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      (d.code || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Descuentos</h1>
          <p className="text-muted-foreground">
            Gestiona promociones y descuentos del sitio
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setIsDialogOpen(true);
          }}
          className="bg-cherry hover:bg-cherry-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Descuento
        </Button>
      </div>

      {!isLoading && discounts.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título o código..."
            className="pl-9"
          />
        </div>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : discounts.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-soft)] border border-cherry-100">
          <Tag className="mx-auto mb-3 h-10 w-10 text-cherry/40" />
          <p className="text-muted-foreground">No hay descuentos aún.</p>
          <Button
            onClick={() => {
              setEditing(null);
              setIsDialogOpen(true);
            }}
            variant="outline"
            className="mt-4"
          >
            Crear el primero
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow-[var(--shadow-soft)] border border-cherry-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Vigencia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-cherry/10 px-2.5 py-0.5 text-xs font-bold text-cherry ring-1 ring-gold/30">
                      {formatValue(d)}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {d.code || "—"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {d.starts_at} → {d.ends_at || "sin fin"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        d.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {d.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditing(d);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(d.id)}
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
              {editing ? "Editar Descuento" : "Nuevo Descuento"}
            </DialogTitle>
          </DialogHeader>
          <DiscountForm
            discount={editing || undefined}
            onSuccess={() => {
              setIsDialogOpen(false);
              load();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
