"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/actions/storage";

interface ImageUploadProps {
  name: string; // nombre del campo en el form (image_url, cover_image, avatar_url)
  label: string;
  defaultValue?: string;
  required?: boolean;
}

export function ImageUpload({
  name,
  label,
  defaultValue = "",
  required,
}: ImageUploadProps) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadImage(fd);
      setValue(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}
      </Label>

      {/* El valor (URL pública) viaja en el form vía este hidden input */}
      <input type="hidden" name={name} value={value} required={required} />

      {value ? (
        <div className="relative w-full overflow-hidden rounded-xl border border-cherry-100 bg-cherry-50">
          <div className="relative aspect-video w-full">
            <Image src={value} alt="Vista previa" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            aria-label="Quitar imagen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cherry-200 bg-cherry-50/50 px-4 py-8 text-cherry transition-colors hover:border-cherry hover:bg-cherry-50 disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm font-medium">Subiendo...</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6" />
              <span className="text-sm font-medium">
                Haz clic para subir una imagen
              </span>
              <span className="text-xs text-muted-foreground">
                JPG, PNG o WebP · máx. 5MB
              </span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}

      {/* Fallback manual: pegar una URL si se prefiere */}
      <details className="text-xs text-muted-foreground">
        <summary className="cursor-pointer select-none">O pegar una URL</summary>
        <Input
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://..."
          className="mt-2"
        />
      </details>
    </div>
  );
}
