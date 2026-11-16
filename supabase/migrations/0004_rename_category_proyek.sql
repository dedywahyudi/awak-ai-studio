-- The site section "Studi Kasus" is now "Proyek". Rename the blog post category to match.
-- Order matters: drop the old check first, move the rows, then add the new check.
alter table public.posts drop constraint if exists posts_category_check;

update public.posts set category = 'Proyek' where category = 'Studi Kasus';

alter table public.posts
  add constraint posts_category_check
  check (category in ('AI untuk UMKM', 'Proyek', 'Tips Digital'));
