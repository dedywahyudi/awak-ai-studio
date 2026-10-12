-- Automation layer: AI lead triage, content topic queue, social drafts, WhatsApp log.
-- Run after 0001_init.sql. All new tables have RLS enabled and no public policies:
-- only the service role key (used by n8n and server actions) can touch them.

-- ------------------------------------------------ leads: AI triage results
alter table public.leads
  add column if not exists ai_category      text,
  add column if not exists ai_priority      text check (ai_priority in ('tinggi', 'sedang', 'rendah')),
  add column if not exists ai_summary       text,
  add column if not exists ai_reply_draft   text,
  add column if not exists ai_processed_at  timestamptz;

-- ------------------------------------------------ blog topic queue
create table if not exists public.content_topics (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  topic       text not null,
  keyword     text,
  notes       text,
  status      text not null default 'queued' check (status in ('queued', 'used', 'skipped')),
  used_at     timestamptz,
  post_id     uuid references public.posts (id) on delete set null
);
create index if not exists content_topics_status_idx on public.content_topics (status, created_at);
alter table public.content_topics enable row level security;

-- ------------------------------------------------ social caption drafts (human approves before posting)
create table if not exists public.social_drafts (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  post_id     uuid references public.posts (id) on delete cascade,
  platform    text not null check (platform in ('instagram', 'tiktok', 'carousel')),
  caption     text,
  hashtags    text[] not null default '{}',
  slides      jsonb,
  status      text not null default 'draft' check (status in ('draft', 'approved', 'posted', 'rejected'))
);
create index if not exists social_drafts_status_idx on public.social_drafts (status, created_at desc);
alter table public.social_drafts enable row level security;

-- ------------------------------------------------ WhatsApp assistant conversation log
-- Used to give the assistant the last few messages as context. Contains personal data:
-- mention it in the privacy policy and purge old rows (see automation/README.md).
create table if not exists public.wa_messages (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  wa_id          text not null,
  role           text not null check (role in ('user', 'assistant')),
  body           text not null,
  wa_message_id  text unique
);
create index if not exists wa_messages_wa_id_idx on public.wa_messages (wa_id, created_at desc);
alter table public.wa_messages enable row level security;

-- ------------------------------------------------ starter topics (edit freely; no claims, just subjects)
insert into public.content_topics (topic, keyword) values
  ('Cara membalas pesan pelanggan WhatsApp lebih cepat tanpa menambah staf', 'balas pesan pelanggan whatsapp'),
  ('Apa itu chatbot untuk UMKM dan kapan bisnis Anda butuh', 'chatbot untuk umkm'),
  ('Cara membuat konten media sosial rutin untuk usaha kecil dengan waktu terbatas', 'konten media sosial umkm'),
  ('Otomatisasi pekerjaan admin: 5 tugas berulang yang bisa dikerjakan otomatis', 'otomatisasi admin umkm'),
  ('Website atau hanya Instagram? Cara memilih untuk usaha lokal', 'website untuk umkm'),
  ('Langkah klaim dan mengisi Google Business Profile untuk usaha di Medan', 'google business profile medan'),
  ('Cara merapikan daftar harga dan stok agar siap dipakai chatbot', 'data bisnis chatbot'),
  ('Berapa biaya membuat website dan chatbot untuk UMKM, dan apa saja yang memengaruhinya', 'biaya website chatbot umkm')
on conflict do nothing;
