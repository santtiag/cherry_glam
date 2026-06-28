"use client";

import { useState, useEffect } from "react";
import {
  getAllPosts,
  deleteBlogPost,
  togglePublishPost,
} from "@/lib/actions/blog";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/admin/TableSkeleton";
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
import { Pencil, Trash2, Plus, Eye, EyeOff, Search } from "lucide-react";
import type { BlogPost } from "@/types/blog";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">(
    "all"
  );

  async function loadPosts() {
    setIsLoading(true);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("¿Estás segura de eliminar esta entrada?")) return;
    try {
      await deleteBlogPost(id);
      await loadPosts();
    } catch {
      alert("Error al eliminar");
    }
  }

  async function handleTogglePublish(post: BlogPost) {
    try {
      await togglePublishPost(post.id, post.status);
      await loadPosts();
    } catch {
      alert("Error al cambiar estado");
    }
  }

  const filtered = posts.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground">Gestiona las entradas del blog</p>
        </div>
        <Button
          onClick={() => {
            setEditingPost(null);
            setIsDialogOpen(true);
          }}
          className="bg-cherry hover:bg-cherry-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Entrada
        </Button>
      </div>

      {!isLoading && posts.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título o categoría..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-1 rounded-lg border border-cherry-100 bg-white p-1">
            {(["all", "published", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? "bg-cherry text-white"
                    : "text-muted-foreground hover:bg-cherry-50"
                }`}
              >
                {s === "all" ? "Todas" : s === "published" ? "Publicadas" : "Borradores"}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <TableSkeleton />
      ) : posts.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-cherry-100">
          <p className="text-muted-foreground">No hay entradas aún.</p>
          <Button
            onClick={() => {
              setEditingPost(null);
              setIsDialogOpen(true);
            }}
            variant="outline"
            className="mt-4"
          >
            Crear la primera
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white shadow-[var(--shadow-soft)] border border-cherry-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="w-[160px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-cherry/10 px-2.5 py-0.5 text-xs font-medium text-cherry">
                      {post.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status === "published" ? (
                        <>
                          <Eye className="h-3 w-3" /> Publicado
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" /> Borrador
                        </>
                      )}
                    </button>
                  </TableCell>
                  <TableCell>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("es-CO")
                      : "--"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingPost(post);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Editar Entrada" : "Nueva Entrada"}
            </DialogTitle>
          </DialogHeader>
          <BlogEditor
            post={editingPost || undefined}
            onSuccess={() => {
              setIsDialogOpen(false);
              loadPosts();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
