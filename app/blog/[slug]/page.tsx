import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { articleJsonLd, pageMeta } from '@/lib/seo';
import { categoryLabel } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

type Params = { slug: string };

export const revalidate = 3600;

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
  });
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="bg-page pb-16 pt-12 md:pb-28 md:pt-20">
      <Container className="flex max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-link hover:text-white">
            <ArrowLeft size={16} aria-hidden="true" /> Semua tulisan
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Eyebrow>{categoryLabel(post.category)}</Eyebrow>
            <time dateTime={post.publishedAt} className="text-subtle">
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-strong md:text-5xl">
            {post.title}
          </h1>
        </div>

        {/* react-markdown does not render raw HTML by default, so post content cannot inject markup. */}
        <div className="prose-awak text-lg leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <aside className="mt-4 flex flex-col items-start gap-4 rounded-pricing border border-line-featured bg-featured p-7">
          <p className="font-display text-xl font-bold text-strong">Ingin AI seperti ini di bisnis Anda?</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="whatsapp" href={waLink(waConsultMessage())}>
              Chat WhatsApp
            </Button>
            <Button variant="secondary" href="/layanan">
              Lihat Layanan <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </aside>
      </Container>
      <JsonLd data={articleJsonLd(post)} />
    </article>
  );
}
