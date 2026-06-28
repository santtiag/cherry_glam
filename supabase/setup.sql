-- Cherry Glam — correr una vez en el SQL Editor de Supabase.
-- Cubre: tabla de descuentos (+ RLS) y bucket de imágenes "media".

-- ─────────────────────────────────────────────
-- 1) Tabla de descuentos / promociones
-- ─────────────────────────────────────────────
create table if not exists public.discounts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  code        text,
  type        text not null default 'percent' check (type in ('percent', 'fixed')),
  value       numeric not null default 0,
  image_url   text,
  link        text,
  starts_at   date not null default current_date,
  ends_at     date,
  is_active   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- mantiene updated_at al día
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists discounts_set_updated_at on public.discounts;
create trigger discounts_set_updated_at
  before update on public.discounts
  for each row execute function public.set_updated_at();

-- RLS: lectura pública de los activos; escritura solo service role (bypassa RLS).
alter table public.discounts enable row level security;

drop policy if exists "discounts_public_read" on public.discounts;
create policy "discounts_public_read"
  on public.discounts for select
  using (is_active = true);

-- ─────────────────────────────────────────────
-- 2) Bucket de imágenes "media" (público para lectura)
-- ─────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

-- Lectura pública del bucket (las subidas usan el service role, que bypassa RLS).
drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');
