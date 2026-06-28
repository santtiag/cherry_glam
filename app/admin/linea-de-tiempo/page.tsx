"use client";

import { useState, useEffect } from "react";
import {
  getAllTimelineEvents,
  deleteTimelineEvent,
} from "@/lib/actions/timeline";
import { TimelineForm } from "@/components/admin/TimelineForm";
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
import { TableSkeleton } from "@/components/admin/TableSkeleton";
import type { TimelineEvent } from "@/types/timeline";

export default function AdminTimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function loadEvents() {
    setIsLoading(true);
    try {
      const data = await getAllTimelineEvents();
      setEvents(data);
    } catch {
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Estás segura de eliminar este evento?")) return;
    try {
      await deleteTimelineEvent(id);
      await loadEvents();
    } catch {
      alert("Error al eliminar");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Línea de Tiempo</h1>
          <p className="text-muted-foreground">Gestiona los eventos de la historia</p>
        </div>
        <Button
          onClick={() => {
            setEditingEvent(null);
            setIsDialogOpen(true);
          }}
          className="bg-cherry hover:bg-cherry-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Evento
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : events.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-[var(--shadow-soft)] border border-cherry-100">
          <p className="text-muted-foreground">No hay eventos aún.</p>
          <Button
            onClick={() => {
              setEditingEvent(null);
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
                <TableHead>Año</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-bold text-cherry">
                    {event.year}
                  </TableCell>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {event.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingEvent(event);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(event.id)}
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
              {editingEvent ? "Editar Evento" : "Nuevo Evento"}
            </DialogTitle>
          </DialogHeader>
          <TimelineForm
            event={editingEvent || undefined}
            onSuccess={() => {
              setIsDialogOpen(false);
              loadEvents();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
