-- Awak AI Studio: initial schema.
-- Run in Supabase SQL editor, or with the Supabase CLI: `supabase db push`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- leads
create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  nama             text not null,
  nama_bisnis      text not null,
  kontak           text not null,
  jenis_kebutuhan  text not null,
  budget_range     text,
  deskripsi        text not null,
  source_page      text not null default '/',
  status           text not null default 'new'
                   check (status in ('new', 'contacted', 'closed')),
  constraint leads_lengths check (
    char_length(nama) <= 80 and char_length(nama_bisnis) <= 120
    and char_length(kontak) <= 120 and char_length(deskripsi) <= 2000
  )
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- RLS on, and NO policies: anon/authenticated users cannot read or write leads.
-- Only the service role key (server action) can insert; you read them in the dashboard.
alter table public.leads enable row level security;

-- ---------------------------------------------------------------- posts
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  content       text not null,                -- Markdown
  excerpt       text,
  cover_image   text,
  category      text not null
                check (category in ('AI untuk UMKM', 'Studi Kasus', 'Tips Digital')),
  published_at  timestamptz,
  status        text not null default 'draft'
                check (status in ('draft', 'published')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint posts_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index if not exists posts_status_published_idx
  on public.posts (status, published_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- Publishing needs a date.
create or replace function public.posts_default_published_at()
returns trigger language plpgsql as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end $$;

drop trigger if exists posts_default_published_at on public.posts;
create trigger posts_default_published_at
  before insert or update on public.posts
  for each row execute function public.posts_default_published_at();

alter table public.posts enable row level security;

-- The public site (anon key) may read ONLY published posts. Drafts stay private,
-- which is what enforces "no publish without manual approval": a human flips status.
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  to anon, authenticated
  using (status = 'published');
