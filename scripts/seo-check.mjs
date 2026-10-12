// Weekly SEO health check. Crawls the sitemap and checks every page.
// Usage: node scripts/seo-check.mjs [baseUrl]   (default: $SITE_URL or http://localhost:3000)
// Writes seo-report.md. Exit code 1 if any ERROR is found (warnings do not fail).
import { writeFileSync } from 'node:fs';

const base = (process.argv[2] || process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
const origin = new URL(base).origin;
const issues = []; // {level, url, msg}
const add = (level, url, msg) => issues.push({ level, url, msg });

const get = async (url) => {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'awak-seo-check' } });
    return { status: res.status, text: await res.text(), ok: res.ok };
  } catch (e) {
    return { status: 0, text: '', ok: false, err: e.message };
  }
};

// Sitemap URLs may use the production origin even when checking a local server: rewrite them.
const sm = await get(`${base}/sitemap.xml`);
if (!sm.ok) {
  console.error(`Cannot read ${base}/sitemap.xml (status ${sm.status} ${sm.err || ''})`);
  process.exit(1);
}
const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const u = new URL(m[1].trim());
  return `${origin}${u.pathname}${u.search}`;
});

const attr = (tag, name) => (tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i')) || [])[1];
const internalLinks = new Set();
const titles = new Map();
const descs = new Map();

for (const url of urls) {
  const r = await get(url);
  if (!r.ok) { add('ERROR', url, `HTTP ${r.status} ${r.err || ''}`); continue; }
  const html = r.text;

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim();
  if (!title) add('ERROR', url, 'Missing <title>');
  else {
    if (title.length > 65) add('WARN', url, `Title is ${title.length} chars (aim for 65 or fewer)`);
    if (title.length < 15) add('WARN', url, `Title is short (${title.length} chars)`);
    titles.set(title, [...(titles.get(title) || []), url]);
  }

  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  const desc = metas.find((m) => /name=["']description["']/i.test(m));
  const dc = desc && attr(desc, 'content');
  if (!dc) add('ERROR', url, 'Missing meta description');
  else {
    if (dc.length > 165) add('WARN', url, `Meta description is ${dc.length} chars (aim for 160 or fewer)`);
    if (dc.length < 50) add('WARN', url, `Meta description is short (${dc.length} chars)`);
    descs.set(dc, [...(descs.get(dc) || []), url]);
  }

  const links = html.match(/<link\b[^>]*>/gi) || [];
  if (!links.some((l) => /rel=["']canonical["']/i.test(l))) add('ERROR', url, 'Missing canonical link');
  if (!metas.some((m) => /property=["']og:title["']/i.test(m))) add('WARN', url, 'Missing og:title');
  if (/noindex/i.test(metas.find((m) => /name=["']robots["']/i.test(m)) || '')) add('ERROR', url, 'Page is noindex but listed in sitemap');

  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 === 0) add('ERROR', url, 'No <h1>');
  if (h1 > 1) add('WARN', url, `${h1} <h1> elements`);

  for (const img of html.match(/<img\b[^>]*>/gi) || []) {
    if (attr(img, 'alt') === undefined) add('WARN', url, `Image without alt: ${(attr(img, 'src') || '').slice(0, 60)}`);
  }

  for (const a of html.match(/<a\b[^>]*>/gi) || []) {
    const href = attr(a, 'href');
    if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const u = new URL(href, url);
      if (u.origin === origin) internalLinks.add(`${u.origin}${u.pathname}`);
    } catch { /* ignore malformed */ }
  }
}

for (const [t, list] of titles) if (list.length > 1) add('WARN', list.join(', '), `Duplicate title: "${t}"`);
for (const [d, list] of descs) if (list.length > 1) add('WARN', list.join(', '), 'Duplicate meta description');

const known = new Set(urls.map((u) => u.replace(/\/$/, '') || u));
for (const link of internalLinks) {
  if (known.has(link.replace(/\/$/, '')) || /\.(png|jpg|svg|ico|webp|xml|txt|woff2?)$/i.test(link)) continue;
  const r = await get(link);
  if (!r.ok) add('ERROR', link, `Broken internal link (HTTP ${r.status})`);
}

for (const f of ['/robots.txt']) {
  const r = await get(`${origin}${f}`);
  if (!r.ok) add('ERROR', `${origin}${f}`, `HTTP ${r.status}`);
}

const errors = issues.filter((i) => i.level === 'ERROR');
const warns = issues.filter((i) => i.level === 'WARN');
const rows = (list) => list.map((i) => `- \`${i.url}\`: ${i.msg}`).join('\n') || '- none';
const report = `# SEO check\n\n${base} on ${new Date().toISOString().slice(0, 10)}\n\nPages checked: ${urls.length}. Errors: ${errors.length}. Warnings: ${warns.length}.\n\n## Errors\n${rows(errors)}\n\n## Warnings\n${rows(warns)}\n`;
writeFileSync('seo-report.md', report);
console.log(report);
process.exit(errors.length ? 1 : 0);
