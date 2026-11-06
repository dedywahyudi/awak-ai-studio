-- Scheduled publishing to the website and Instagram.
-- Run in the Supabase SQL editor after 0001 and 0002.
--
-- Flow: you (a human) set a post to status 'scheduled' with scheduled_at and, for Instagram,
-- instagram_caption + instagram_image + instagram_status 'pending'. The scheduled GitHub Action
-- (scripts/publish-scheduled.mjs) publishes what is due. Drafts are never published by automation.

alter table public.posts drop constraint if exists posts_status_check;
alter table public.posts
  add constraint posts_status_check check (status in ('draft', 'scheduled', 'published'));

alter table public.posts add column if not exists scheduled_at       timestamptz;
alter table public.posts add column if not exists instagram_caption  text;
alter table public.posts add column if not exists instagram_image    text;   -- public JPEG, path ("/images/...") or full URL
alter table public.posts add column if not exists instagram_status   text not null default 'none';
alter table public.posts add column if not exists instagram_media_id text;
alter table public.posts add column if not exists instagram_error    text;
alter table public.posts add column if not exists instagram_posted_at timestamptz;

alter table public.posts drop constraint if exists posts_instagram_status_check;
alter table public.posts
  add constraint posts_instagram_status_check
  check (instagram_status in ('none', 'pending', 'posted', 'failed', 'skipped'));

alter table public.posts drop constraint if exists posts_instagram_caption_length;
alter table public.posts
  add constraint posts_instagram_caption_length
  check (instagram_caption is null or char_length(instagram_caption) <= 2200);

-- A scheduled post needs a time.
alter table public.posts drop constraint if exists posts_scheduled_needs_time;
alter table public.posts
  add constraint posts_scheduled_needs_time
  check (status <> 'scheduled' or scheduled_at is not null);

create index if not exists posts_scheduled_idx
  on public.posts (scheduled_at) where status = 'scheduled';
