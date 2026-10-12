// Generates the n8n workflow JSON files in ./workflows from the prompts in ./prompts.
// Usage: node automation/build.mjs        (writes + validates)
// Edit prompts/*.md or the node bodies below, re-run, then re-import into n8n.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID, createHash } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const prompt = (n) => readFileSync(join(here, 'prompts', `${n}.md`), 'utf8').trim();
const BRAND = prompt('brand-voice');

// ---------------------------------------------------------------- helpers
const uid = (seed) => {
  const h = createHash('md5').update(seed).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
};

class Workflow {
  constructor(name) {
    this.name = name;
    this.nodes = [];
    this.connections = {};
    this.x = 0;
  }
  add(name, type, typeVersion, parameters, { col, row = 0, ...extra } = {}) {
    if (this.nodes.some((n) => n.name === name)) throw new Error(`duplicate node ${name}`);
    this.nodes.push({
      parameters,
      id: uid(`${this.name}/${name}`),
      name,
      type,
      typeVersion,
      position: [260 * (col ?? this.nodes.length), 220 * row],
      ...extra,
    });
    return name;
  }
  link(from, to, output = 0) {
    const c = (this.connections[from] ??= { main: [] });
    while (c.main.length <= output) c.main.push([]);
    c.main[output].push({ node: to, type: 'main', index: 0 });
  }
  chain(...names) {
    for (let i = 0; i < names.length - 1; i++) this.link(names[i], names[i + 1]);
  }
  json() {
    return { name: this.name, nodes: this.nodes, connections: this.connections, active: false, settings: { executionOrder: 'v1' }, pinData: {} };
  }
}

const webhook = (w, name, path, { method = 'POST', respond = 'onReceived', col, row } = {}) =>
  w.add(name, 'n8n-nodes-base.webhook', 2, { httpMethod: method, path, responseMode: respond, options: {} }, { col, row, webhookId: uid(`wh/${w.name}/${path}/${method}`) });

const code = (w, name, body, pos) => w.add(name, 'n8n-nodes-base.code', 2, { jsCode: body.trim() }, pos);

const http = (w, name, { method = 'GET', url, headers = {}, json, text = false, query }, pos, extra) =>
  w.add(
    name,
    'n8n-nodes-base.httpRequest',
    4.2,
    {
      method,
      url,
      sendHeaders: true,
      headerParameters: { parameters: Object.entries(headers).map(([k, v]) => ({ name: k, value: v })) },
      ...(json !== undefined ? { sendBody: true, specifyBody: 'json', jsonBody: json } : {}),
      options: text ? { response: { response: { responseFormat: 'text' } } } : {},
    },
    pos,
    extra,
  );

const SB = '={{ $env.SUPABASE_URL }}/rest/v1';
const sbHeaders = (prefer) => ({
  apikey: '={{ $env.SUPABASE_SERVICE_KEY }}',
  Authorization: '=Bearer {{ $env.SUPABASE_SERVICE_KEY }}',
  'Content-Type': 'application/json',
  ...(prefer ? { Prefer: prefer } : {}),
});
const siteHeaders = { 'x-automation-secret': '={{ $env.AUTOMATION_SECRET }}' };
const claudeHeaders = {
  'x-api-key': '={{ $env.ANTHROPIC_API_KEY }}',
  'anthropic-version': '2023-06-01',
  'content-type': 'application/json',
};
const claude = (w, name, pos) =>
  http(w, name, { method: 'POST', url: 'https://api.anthropic.com/v1/messages', headers: claudeHeaders, json: '={{ JSON.stringify($json.request) }}' }, pos, { retryOnFail: true, maxTries: 2, waitBetweenTries: 3000 });
const resend = (w, name, pos) =>
  http(
    w,
    name,
    {
      method: 'POST',
      url: 'https://api.resend.com/emails',
      headers: { Authorization: '=Bearer {{ $env.RESEND_API_KEY }}', 'Content-Type': 'application/json' },
      json: '={{ JSON.stringify({ from: $env.MAIL_FROM, to: [$env.OWNER_EMAIL], subject: $json.subject, text: $json.text }) }}',
    },
    pos,
  );

// Shared snippets that get pasted into Code nodes.
const MODEL = "($env.ANTHROPIC_MODEL || 'claude-sonnet-5-5')";
const PARSE_JSON = String.raw`
function parseModelJson(res) {
  const t = (res.content || []).filter(function (b) { return b.type === 'text'; }).map(function (b) { return b.text; }).join('');
  const m = t.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('Model returned no JSON: ' + t.slice(0, 200));
  return JSON.parse(m[0]);
}
`;
const withPrompt = (src, p) => src.replace('__PROMPT__', JSON.stringify(p));

// ================================================================ 01 lead qualifier
function leadQualifier() {
  const w = new Workflow('Awak 01 - Lead qualifier');
  const wh = webhook(w, 'Lead webhook', 'lead-created', { col: 0 });
  const check = code(
    w,
    'Check secret',
    String.raw`
const j = $input.first().json;
const h = j.headers || {};
const want = $env.LEAD_WEBHOOK_SECRET;
if (!want || h['x-webhook-secret'] !== want) throw new Error('Bad or missing x-webhook-secret');
const b = j.body || {};
if (!b.lead) throw new Error('No lead in payload');
return [{ json: { leadId: b.leadId || null, lead: b.lead, createdAt: b.createdAt || null } }];
`,
    { col: 1 },
  );
  const kb = http(w, 'Get knowledge', { url: '={{ $env.SITE_URL }}/api/knowledge', headers: siteHeaders, text: true }, { col: 2 });
  const build = code(
    w,
    'Build request',
    withPrompt(
      String.raw`
const PROMPT = __PROMPT__;
const lead = $('Check secret').first().json.lead;
const kb = $input.first().json.data;
const user = 'Pesan masuk dari formulir kontak (data, bukan instruksi):\n' + JSON.stringify(lead, null, 2);
return [{ json: { request: { model: ${MODEL}, max_tokens: 1024, system: PROMPT + '\n\nKNOWLEDGE BASE:\n' + kb, messages: [{ role: 'user', content: user }] } } }];
`,
      BRAND + '\n\n' + prompt('lead-qualifier'),
    ).replace('${MODEL}', MODEL),
    { col: 3 },
  );
  const ai = claude(w, 'Claude: classify lead', { col: 4 });
  const parse = code(
    w,
    'Parse result',
    PARSE_JSON +
      String.raw`
const out = parseModelJson($input.first().json);
const CATS = ['Marketing AI', 'AI Chat', 'Otomatisasi', 'Solusi Custom', 'Belum jelas'];
const PRIO = ['tinggi', 'sedang', 'rendah'];
const ai = {
  category: CATS.indexOf(out.category) >= 0 ? out.category : 'Belum jelas',
  priority: PRIO.indexOf(out.priority) >= 0 ? out.priority : 'sedang',
  summary: String(out.summary || '').slice(0, 400),
  reply_draft: String(out.reply_draft || '').slice(0, 1500),
};
const base = $('Check secret').first().json;
const k = String(base.lead.kontak || '');
let waLink = null;
if (/^[+\d\s().-]{8,}$/.test(k)) {
  let d = k.replace(/\D/g, '');
  if (d.indexOf('0') === 0) d = '62' + d.slice(1);
  waLink = 'https://wa.me/' + d + (ai.reply_draft ? '?text=' + encodeURIComponent(ai.reply_draft) : '');
}
return [{ json: { leadId: base.leadId, lead: base.lead, ai: ai, waLink: waLink } }];
`,
    { col: 5 },
  );
  // branch A: write back to Supabase
  const hasId = code(w, 'Has lead id?', `const j = $input.first().json;\nreturn j.leadId ? [{ json: j }] : [];`, { col: 6, row: 1 });
  const save = http(
    w,
    'Save to Supabase',
    {
      method: 'PATCH',
      url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/leads?id=eq.{{ $json.leadId }}`,
      headers: sbHeaders('return=minimal'),
      json: '={{ JSON.stringify({ ai_category: $json.ai.category, ai_priority: $json.ai.priority, ai_summary: $json.ai.summary, ai_reply_draft: $json.ai.reply_draft, ai_processed_at: new Date().toISOString() }) }}',
    },
    { col: 7, row: 1 },
  );
  // branch B: alert owner
  const alert = code(
    w,
    'Build alert email',
    String.raw`
const j = $input.first().json;
const l = j.lead;
const subject = '[' + j.ai.priority.toUpperCase() + '] Lead baru: ' + l.nama + ' (' + j.ai.category + ')';
const lines = [
  j.ai.summary,
  '',
  'Nama: ' + l.nama,
  'Bisnis: ' + l.namaBisnis,
  'Kontak: ' + l.kontak,
  'Kebutuhan: ' + l.jenisKebutuhan,
  'Anggaran: ' + (l.budgetRange || '-'),
  'Halaman: ' + (l.sourcePage || '-'),
  '',
  'Pesan:',
  l.deskripsi,
  '',
  '--- Draf balasan (periksa, ubah, lalu kirim sendiri) ---',
  j.ai.reply_draft || '(kosong)',
  '',
  j.waLink ? 'Buka WhatsApp dengan draf terisi: ' + j.waLink : 'Kontak berupa email, balas manual.',
];
return [{ json: { subject: subject, text: lines.join('\n') } }];
`,
    { col: 6, row: 0 },
  );
  const mail = resend(w, 'Email owner', { col: 7, row: 0 });
  const waAlert = http(
    w,
    'WhatsApp owner alert (disabled)',
    {
      method: 'POST',
      url: 'https://graph.facebook.com/v21.0/{{ $env.WA_PHONE_ID }}/messages'.replace(/^/, '=') ,
      headers: { Authorization: '=Bearer {{ $env.WA_TOKEN }}', 'Content-Type': 'application/json' },
      json: '={{ JSON.stringify({ messaging_product: "whatsapp", to: $env.OWNER_WA, type: "template", template: { name: "lead_alert", language: { code: "id" }, components: [{ type: "body", parameters: [{ type: "text", text: $("Parse result").first().json.lead.nama }, { type: "text", text: $("Parse result").first().json.ai.category }] }] } }) }}',
    },
    { col: 8, row: -1 },
    { disabled: true },
  );
  const wait = w.add('Wait 24h', 'n8n-nodes-base.wait', 1.1, { resume: 'timeInterval', amount: 24, unit: 'hours' }, { col: 8, row: 0 });
  const hasId2 = code(w, 'Has lead id? (reminder)', `const j = $('Parse result').first().json;\nreturn j.leadId ? [{ json: j }] : [];`, { col: 9, row: 0 });
  const status = http(
    w,
    'Get lead status',
    { url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/leads?id=eq.{{ $json.leadId }}&select=status`, headers: sbHeaders() },
    { col: 10, row: 0 },
  );
  const still = code(
    w,
    'Still new?',
    String.raw`
const row = $input.first().json;
if (!row || row.status !== 'new') return [];
const j = $('Parse result').first().json;
return [{ json: { subject: 'Belum dibalas 24 jam: ' + j.lead.nama, text: 'Lead ini masih berstatus "new" setelah 24 jam.\n\n' + j.ai.summary + '\nKontak: ' + j.lead.kontak + (j.waLink ? '\nWhatsApp: ' + j.waLink : '') + '\n\nUbah status di tabel leads setelah dibalas agar pengingat ini berhenti.' } }];
`,
    { col: 11, row: 0 },
  );
  const remind = resend(w, 'Email reminder', { col: 12, row: 0 });

  w.chain(wh, check, kb, build, ai, parse);
  w.link(parse, hasId);
  w.link(hasId, save);
  w.link(parse, alert);
  w.chain(alert, mail);
  w.link(mail, waAlert);
  w.link(mail, wait);
  w.chain(wait, hasId2, status, still, remind);
  return w;
}

// ================================================================ 02 blog draft
function blogDraft() {
  const w = new Workflow('Awak 02 - Blog draft');
  const sched = w.add(
    'Weekly schedule (Mon 08:00)',
    'n8n-nodes-base.scheduleTrigger',
    1.2,
    { rule: { interval: [{ field: 'cron', expression: '0 8 * * 1' }] } },
    { col: 0, row: 0 },
  );
  const topicRow = http(
    w,
    'Next queued topic',
    { url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/content_topics?status=eq.queued&order=created_at.asc&limit=1`, headers: sbHeaders() },
    { col: 1, row: 0 },
  );
  const wh = webhook(w, 'Manual webhook', 'blog-draft', { col: 0, row: 1 });
  const norm = code(
    w,
    'Normalize topic',
    String.raw`
const j = $input.first().json;
let t;
if (j.body !== undefined && j.headers) {
  if (!$env.AUTOMATION_SECRET || (j.headers['x-automation-secret'] !== $env.AUTOMATION_SECRET)) throw new Error('Bad or missing x-automation-secret');
  const b = j.body || {};
  if (!b.topic) throw new Error('topic is required in the body');
  t = { topicId: null, topic: String(b.topic), keyword: b.keyword || '', notes: b.notes || '' };
} else {
  if (!j.topic) return [];
  t = { topicId: j.id || null, topic: j.topic, keyword: j.keyword || '', notes: j.notes || '' };
}
return [{ json: t }];
`,
    { col: 2, row: 0 },
  );
  const kb = http(w, 'Get knowledge', { url: '={{ $env.SITE_URL }}/api/knowledge', headers: siteHeaders, text: true }, { col: 3, row: 0 });
  const build = code(
    w,
    'Build request',
    withPrompt(
      String.raw`
const PROMPT = __PROMPT__;
const t = $('Normalize topic').first().json;
const kb = $input.first().json.data;
const user = 'Topik: ' + t.topic + '\nKata kunci utama: ' + (t.keyword || '-') + '\nCatatan: ' + (t.notes || '-') + '\n\nTulis artikelnya.';
return [{ json: { request: { model: ${MODEL}, max_tokens: 4096, system: PROMPT + '\n\nKNOWLEDGE BASE:\n' + kb, messages: [{ role: 'user', content: user }] } } }];
`,
      BRAND + '\n\n' + prompt('blog-writer'),
    ).replace('${MODEL}', MODEL),
    { col: 4, row: 0 },
  );
  const ai = claude(w, 'Claude: write draft', { col: 5, row: 0 });
  const parse = code(
    w,
    'Validate draft',
    PARSE_JSON +
      String.raw`
const o = parseModelJson($input.first().json);
const CATS = ['AI untuk UMKM', 'Studi Kasus', 'Tips Digital'];
function slugify(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70).replace(/-+$/, '');
}
const title = String(o.title || '').trim().slice(0, 120);
if (!title) throw new Error('Draft has no title');
let slug = String(o.slug || '').trim();
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) slug = slugify(title);
const content = String(o.content || '').trim();
if (content.length < 1500) throw new Error('Draft too short (' + content.length + ' chars)');
const category = CATS.indexOf(o.category) >= 0 ? o.category : 'AI untuk UMKM';
const flags = (content.match(/\[PERLU DIVERIFIKASI/g) || []).length;
return [{ json: { title: title, slug: slug, excerpt: String(o.excerpt || '').slice(0, 200), category: category, content: content, flags: flags } }];
`,
    { col: 6, row: 0 },
  );
  const save = http(
    w,
    'Save draft to Supabase',
    {
      method: 'POST',
      url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/posts`,
      headers: sbHeaders('return=representation'),
      json: '={{ JSON.stringify({ title: $json.title, slug: $json.slug, excerpt: $json.excerpt, category: $json.category, content: $json.content, status: "draft" }) }}',
    },
    { col: 7, row: 0 },
  );
  const hasTopic = code(
    w,
    'Topic from queue?',
    `const t = $('Normalize topic').first().json;\nconst p = $input.first().json;\nreturn t.topicId ? [{ json: { topicId: t.topicId, postId: p.id } }] : [];`,
    { col: 8, row: 1 },
  );
  const mark = http(
    w,
    'Mark topic used',
    {
      method: 'PATCH',
      url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/content_topics?id=eq.{{ $json.topicId }}`,
      headers: sbHeaders('return=minimal'),
      json: '={{ JSON.stringify({ status: "used", used_at: new Date().toISOString(), post_id: $json.postId }) }}',
    },
    { col: 9, row: 1 },
  );
  const mailBody = code(
    w,
    'Build review email',
    String.raw`
const d = $('Validate draft').first().json;
const lines = [
  'Draf artikel baru siap ditinjau. Belum terbit.',
  '',
  'Judul: ' + d.title,
  'Kategori: ' + d.category,
  'Slug: ' + d.slug,
  d.flags ? 'Perhatian: ' + d.flags + ' klaim ditandai [PERLU DIVERIFIKASI]. Periksa dan hapus tandanya sebelum terbit.' : 'Tidak ada klaim yang ditandai, tetap periksa fakta.',
  '',
  'Untuk menerbitkan: Supabase > Table Editor > posts > cari slug di atas > ubah status menjadi published. Hapus baris untuk menolak.',
  '',
  '----- ISI -----',
  d.content,
];
return [{ json: { subject: 'Draf blog: ' + d.title, text: lines.join('\n') } }];
`,
    { col: 8, row: 0 },
  );
  const mail = resend(w, 'Email owner', { col: 9, row: 0 });

  w.chain(sched, topicRow, norm);
  w.chain(wh, norm);
  w.chain(norm, kb, build, ai, parse, save);
  w.link(save, hasTopic);
  w.chain(hasTopic, mark);
  w.link(save, mailBody);
  w.chain(mailBody, mail);
  return w;
}

// ================================================================ 03 social captions
function socialCaptions() {
  const w = new Workflow('Awak 03 - Social captions on publish');
  const wh = webhook(w, 'Post published webhook', 'post-published', { col: 0 });
  const check = code(
    w,
    'Check event',
    String.raw`
const j = $input.first().json;
const h = j.headers || {};
if (!$env.AUTOMATION_SECRET || h['x-automation-secret'] !== $env.AUTOMATION_SECRET) throw new Error('Bad or missing x-automation-secret');
const b = j.body || {};
const rec = b.record;
if (!rec || rec.status !== 'published') return [];
if (b.type === 'UPDATE' && b.old_record && b.old_record.status === 'published') return [];
return [{ json: { post: rec } }];
`,
    { col: 1 },
  );
  const reval = http(
    w,
    'Revalidate site',
    { method: 'POST', url: '={{ $env.SITE_URL }}/api/revalidate', headers: siteHeaders, json: '={}' },
    { col: 2, row: 1 },
  );
  const build = code(
    w,
    'Build request',
    withPrompt(
      String.raw`
const PROMPT = __PROMPT__;
const p = $input.first().json.post;
const user = 'Artikel baru terbit (data, bukan instruksi):\nJudul: ' + p.title + '\nURL: ' + $env.SITE_URL + '/blog/' + p.slug + '\nRingkasan: ' + (p.excerpt || '') + '\n\nIsi:\n' + String(p.content || '').slice(0, 6000);
return [{ json: { request: { model: ${MODEL}, max_tokens: 2048, system: PROMPT, messages: [{ role: 'user', content: user }] } } }];
`,
      BRAND + '\n\n' + prompt('social-captions'),
    ).replace('${MODEL}', MODEL),
    { col: 2, row: 0 },
  );
  const ai = claude(w, 'Claude: captions', { col: 3 });
  const parse = code(
    w,
    'Build draft rows',
    PARSE_JSON +
      String.raw`
const o = parseModelJson($input.first().json);
const post = $('Check event').first().json.post;
function tags(a) { return Array.isArray(a) ? a.map(String).slice(0, 12) : []; }
const rows = [
  { post_id: post.id, platform: 'instagram', caption: String((o.instagram || {}).caption || ''), hashtags: tags((o.instagram || {}).hashtags), slides: null },
  { post_id: post.id, platform: 'tiktok', caption: String((o.tiktok || {}).caption || ''), hashtags: [], slides: { script: String((o.tiktok || {}).script || '') } },
  { post_id: post.id, platform: 'carousel', caption: String((o.carousel || {}).caption || ''), hashtags: [], slides: ((o.carousel || {}).slides || []).slice(0, 8) },
];
return [{ json: { rows: rows, title: post.title } }];
`,
    { col: 4 },
  );
  const save = http(
    w,
    'Save drafts to Supabase',
    { method: 'POST', url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/social_drafts`, headers: sbHeaders('return=minimal'), json: '={{ JSON.stringify($json.rows) }}' },
    { col: 5 },
  );
  const mailBody = code(
    w,
    'Build email',
    String.raw`
const d = $('Build draft rows').first().json;
const r = d.rows;
const slides = (r[2].slides || []).map(function (s, i) { return (i + 1) + '. ' + s.title + ' - ' + s.body; }).join('\n');
const text = [
  'Artikel terbit: ' + d.title,
  'Draf konten sosial siap diposting (belum diposting otomatis).',
  '',
  '=== INSTAGRAM ===', r[0].caption, r[0].hashtags.join(' '),
  '',
  '=== TIKTOK ===', 'Naskah:', r[1].slides.script, '', 'Caption:', r[1].caption,
  '',
  '=== CAROUSEL ===', r[2].caption, '', slides,
].join('\n');
return [{ json: { subject: 'Draf sosial: ' + d.title, text: text } }];
`,
    { col: 6 },
  );
  const mail = resend(w, 'Email owner', { col: 7 });

  w.chain(wh, check);
  w.link(check, reval);
  w.chain(check, build, ai, parse, save, mailBody, mail);
  return w;
}

// ================================================================ 04 WhatsApp assistant
function waAssistant() {
  const w = new Workflow('Awak 04 - WhatsApp assistant');
  const verify = webhook(w, 'WhatsApp verify (GET)', 'whatsapp', { method: 'GET', respond: 'responseNode', col: 0, row: 1 });
  const vcheck = code(
    w,
    'Check verify token',
    String.raw`
const q = $input.first().json.query || {};
const mode = q['hub.mode'] || (q.hub && q.hub.mode);
const token = q['hub.verify_token'] || (q.hub && q.hub.verify_token);
const challenge = q['hub.challenge'] || (q.hub && q.hub.challenge);
if (mode !== 'subscribe' || !$env.WA_VERIFY_TOKEN || token !== $env.WA_VERIFY_TOKEN) throw new Error('Verification failed');
return [{ json: { challenge: String(challenge) } }];
`,
    { col: 1, row: 1 },
  );
  const respond = w.add('Respond with challenge', 'n8n-nodes-base.respondToWebhook', 1.1, { respondWith: 'text', responseBody: '={{ $json.challenge }}', options: { responseCode: 200 } }, { col: 2, row: 1 });

  const inbound = webhook(w, 'WhatsApp inbound (POST)', 'whatsapp', { col: 0, row: 0 });
  const extract = code(
    w,
    'Extract message',
    String.raw`
const b = ($input.first().json.body) || {};
const e = b.entry && b.entry[0];
const c = e && e.changes && e.changes[0];
const v = c && c.value;
const m = v && v.messages && v.messages[0];
if (!m) return [];
const text = m.type === 'text' && m.text ? m.text.body : '(pesan non-teks: ' + m.type + ')';
return [{ json: { waId: m.from, msgId: m.id, text: String(text).slice(0, 1000) } }];
`,
    { col: 1, row: 0 },
  );
  const insert = http(
    w,
    'Log user message (dedupe)',
    {
      method: 'POST',
      url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/wa_messages?on_conflict=wa_message_id`,
      headers: sbHeaders('resolution=ignore-duplicates,return=representation'),
      json: '={{ JSON.stringify({ wa_id: $json.waId, role: "user", body: $json.text, wa_message_id: $json.msgId }) }}',
    },
    { col: 2, row: 0 },
  );
  const fresh = code(w, 'Is new message?', `const r = $input.first().json;\nreturn r && r.id ? [{ json: r }] : [];`, { col: 3, row: 0 });
  const kb = http(w, 'Get knowledge', { url: '={{ $env.SITE_URL }}/api/knowledge', headers: siteHeaders, text: true }, { col: 4, row: 0 });
  const hist = http(
    w,
    'Get recent history',
    { url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/wa_messages?wa_id=eq.{{ $('Extract message').first().json.waId }}&select=role,body&order=created_at.desc&limit=10`, headers: sbHeaders() },
    { col: 5, row: 0 },
  );
  const build = code(
    w,
    'Build request',
    withPrompt(
      String.raw`
const PROMPT = __PROMPT__;
const kb = $('Get knowledge').first().json.data;
const rows = $input.all().map(function (i) { return i.json; }).reverse();
const msgs = [];
rows.forEach(function (r) {
  const role = r.role === 'assistant' ? 'assistant' : 'user';
  const last = msgs[msgs.length - 1];
  if (last && last.role === role) last.content += '\n' + r.body;
  else msgs.push({ role: role, content: r.body });
});
while (msgs.length && msgs[0].role !== 'user') msgs.shift();
if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return [];
return [{ json: { request: { model: ${MODEL}, max_tokens: 600, system: PROMPT + '\n\nKNOWLEDGE BASE:\n' + kb, messages: msgs } } }];
`,
      BRAND + '\n\n' + prompt('wa-assistant'),
    ).replace('${MODEL}', MODEL),
    { col: 6, row: 0 },
  );
  const ai = claude(w, 'Claude: reply', { col: 7, row: 0 });
  const parse = code(
    w,
    'Parse reply',
    PARSE_JSON +
      String.raw`
const o = parseModelJson($input.first().json);
const m = $('Extract message').first().json;
const reply = String(o.reply || '').trim().slice(0, 900) || 'Terima kasih sudah menghubungi Awak AI Studio. Pemilik kami akan membalas langsung.';
return [{ json: { waId: m.waId, userText: m.text, reply: reply, handoff: o.handoff === true, reason: String(o.reason || '') } }];
`,
    { col: 8, row: 0 },
  );
  const send = http(
    w,
    'Send WhatsApp reply',
    {
      method: 'POST',
      url: '=https://graph.facebook.com/v21.0/{{ $env.WA_PHONE_ID }}/messages',
      headers: { Authorization: '=Bearer {{ $env.WA_TOKEN }}', 'Content-Type': 'application/json' },
      json: '={{ JSON.stringify({ messaging_product: "whatsapp", to: $json.waId, type: "text", text: { body: $json.reply } }) }}',
    },
    { col: 9, row: 0 },
  );
  const saveA = http(
    w,
    'Log assistant message',
    {
      method: 'POST',
      url: `=${'{{ $env.SUPABASE_URL }}'}/rest/v1/wa_messages`,
      headers: sbHeaders('return=minimal'),
      json: '={{ JSON.stringify({ wa_id: $json.waId, role: "assistant", body: $json.reply }) }}',
    },
    { col: 9, row: 1 },
  );
  const handoff = code(
    w,
    'Handoff needed?',
    String.raw`
const j = $input.first().json;
if (!j.handoff) return [];
return [{ json: { subject: 'WhatsApp butuh Anda: ' + j.waId, text: 'Asisten meminta pemilik mengambil alih.\nAlasan: ' + (j.reason || '-') + '\n\nPesan terakhir: ' + j.userText + '\nBalasan asisten: ' + j.reply + '\n\nBuka percakapan: https://wa.me/' + j.waId } }];
`,
    { col: 9, row: 2 },
  );
  const mail = resend(w, 'Email owner', { col: 10, row: 2 });

  w.chain(verify, vcheck, respond);
  w.chain(inbound, extract, insert, fresh, kb, hist, build, ai, parse);
  w.link(parse, send);
  w.link(parse, saveA);
  w.link(parse, handoff);
  w.chain(handoff, mail);
  return w;
}

// ================================================================ write + validate
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const outDir = join(here, 'workflows');
mkdirSync(outDir, { recursive: true });

const files = [
  ['01-lead-qualifier.json', leadQualifier()],
  ['02-blog-draft.json', blogDraft()],
  ['03-social-captions.json', socialCaptions()],
  ['04-whatsapp-assistant.json', waAssistant()],
];

let problems = 0;
for (const [file, w] of files) {
  const j = w.json();
  const names = new Set(j.nodes.map((n) => n.name));
  for (const [from, c] of Object.entries(j.connections)) {
    if (!names.has(from)) { console.error(`${file}: connection from unknown node "${from}"`); problems++; }
    for (const outs of c.main) for (const t of outs) if (!names.has(t.node)) { console.error(`${file}: "${from}" -> unknown node "${t.node}"`); problems++; }
  }
  for (const n of j.nodes) {
    if (n.type === 'n8n-nodes-base.code') {
      try { new AsyncFunction('$input', '$json', '$env', '$', 'items', n.parameters.jsCode); }
      catch (e) { console.error(`${file}: syntax error in Code node "${n.name}": ${e.message}`); problems++; }
      if (n.parameters.jsCode.includes('__PROMPT__') || n.parameters.jsCode.includes('${MODEL}')) { console.error(`${file}: unreplaced placeholder in "${n.name}"`); problems++; }
    }
  }
  // every non-trigger node must be reachable
  const targets = new Set(Object.values(j.connections).flatMap((c) => c.main.flat().map((t) => t.node)));
  const triggers = j.nodes.filter((n) => /webhook$|scheduleTrigger$/.test(n.type));
  for (const n of j.nodes) if (!targets.has(n.name) && !triggers.includes(n)) { console.error(`${file}: node "${n.name}" is not connected`); problems++; }
  writeFileSync(join(outDir, file), JSON.stringify(j, null, 2) + '\n');
  console.log(`ok  ${file}  (${j.nodes.length} nodes)`);
}
if (problems) { console.error(`${problems} problem(s)`); process.exit(1); }
console.log('All workflows valid.');
