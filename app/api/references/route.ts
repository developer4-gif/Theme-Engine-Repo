export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

const HF_URL = (process.env.HF_BUCKET_URL ?? 'https://huggingface.co/buckets/SecretITis/Theme-Studio/resolve').replace(/\/$/, '');
const R2_URL = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '');
const MANIFEST_URL = process.env.HF_MANIFEST_URL ?? `${HF_URL}/manifest.json`;

// ── Types ─────────────────────────────────────────────────────────────────────
interface AppEntry { id: string; name: string; developer: string; icon: string | null; screens: string[]; }
interface CatEntry { id: string; label: string; appCount: number; preview: string; apps: AppEntry[]; }
interface Manifest { categories: CatEntry[]; }

// ── Manifest cache (per cold start) ──────────────────────────────────────────
let manifestCache: Manifest | null = null;
let manifestFetchedAt = 0;
const MANIFEST_TTL = 5 * 60 * 1000;

async function fetchManifest(): Promise<Manifest | null> {
  const now = Date.now();
  if (manifestCache && now - manifestFetchedAt < MANIFEST_TTL) return manifestCache;
  try {
    const res = await fetch(MANIFEST_URL, { cache: 'no-store' });
    if (!res.ok) return null;
    manifestCache = await res.json() as Manifest;
    manifestFetchedAt = now;
    return manifestCache;
  } catch { return null; }
}

// ── Image URL builder ─────────────────────────────────────────────────────────
function imgUrl(category: string, app: string, file: string): string {
  const f = file.replace(/\.png$/i, '.jpg');
  if (R2_URL) return `${R2_URL}/${category}/${app}/${f}`;
  return `${HF_URL}/${category}/${app}/${f}`;
}

// ── Local refs (only used when REFS_DIR is set — dev mode) ───────────────────
function hasLocalRefs(): boolean {
  if (!process.env.REFS_DIR) return false;
  try {
    // Dynamic require to avoid Turbopack static tracing
    const fs = require('fs') as typeof import('fs');
    const rd = process.env.REFS_DIR;
    return fs.existsSync(rd) && fs.statSync(rd).isDirectory();
  } catch { return false; }
}

function refsDir(): string {
  return process.env.REFS_DIR ?? require('path').join(process.cwd(), 'references');
}

function imgUrlLocal(category: string, app: string, file: string): string {
  return `/api/references/image?category=${category}&app=${app}&file=${file}`;
}

// ── GET handler ───────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const local = hasLocalRefs();

  // ── Remote mode (Vercel / production): HF manifest ──────────────────────────
  if (!local) {
    const manifest = await fetchManifest();
    if (!manifest) return NextResponse.json(category ? { apps: [], total: 0, hasMore: false } : []);

    if (!category) {
      const cats = manifest.categories.map(c => {
        const [, appId, file] = c.preview.split('/');
        return { id: c.id, label: c.label, appCount: c.appCount, preview: imgUrl(c.id, appId, file) };
      });
      return NextResponse.json(cats);
    }

    const cat = manifest.categories.find(c => c.id === category);
    if (!cat) return NextResponse.json({ apps: [], total: 0, hasMore: false });

    const offset = parseInt(searchParams.get('offset') ?? '0', 10);
    const limit  = parseInt(searchParams.get('limit')  ?? '20', 10);
    const page   = cat.apps.slice(offset, offset + limit);

    const apps = page.map(a => ({
      id: a.id, name: a.name, developer: a.developer,
      icon:    a.icon    ? imgUrl(category, a.id, a.icon)         : null,
      preview: a.screens.length > 0 ? imgUrl(category, a.id, a.screens[0]) : null,
      screenCount: a.screens.length,
      screens: a.screens.map(s => imgUrl(category, a.id, s)),
    }));

    return NextResponse.json({ apps, total: cat.apps.length, hasMore: offset + limit < cat.apps.length });
  }

  // ── Local mode (dev): read from disk ─────────────────────────────────────────
  const fs   = require('fs')   as typeof import('fs');
  const path = require('path') as typeof import('path');
  const rd   = refsDir();

  if (!category) {
    try {
      const cats = fs.readdirSync(rd)
        .filter((name: string) => { try { return fs.statSync(path.join(rd, name)).isDirectory(); } catch { return false; } })
        .map((name: string) => {
          const catDir = path.join(rd, name);
          const apps = fs.readdirSync(catDir).filter((a: string) => { try { return fs.statSync(path.join(catDir, a)).isDirectory(); } catch { return false; } });
          let preview: string | null = null;
          for (const a of apps.slice(0, 5) as string[]) {
            const appDir = path.join(catDir, a);
            const screens = fs.readdirSync(appDir).filter((f: string) => f.startsWith('screen-') && (f.endsWith('.jpg') || f.endsWith('.png')));
            if (screens.length > 0) { preview = imgUrlLocal(name, a, screens[0]); break; }
          }
          return { id: name, label: name.replace(/-/g, ' ').replace(/\b\w/g, (ch: string) => ch.toUpperCase()), appCount: apps.length, preview };
        })
        .filter((c: { appCount: number }) => c.appCount > 0);
      return NextResponse.json(cats);
    } catch { return NextResponse.json([]); }
  }

  try {
    const offset = parseInt(searchParams.get('offset') ?? '0', 10);
    const limit  = parseInt(searchParams.get('limit')  ?? '20', 10);
    const catDir = path.join(rd, category);
    if (!fs.existsSync(catDir)) return NextResponse.json({ apps: [], total: 0, hasMore: false });

    const allDirs = fs.readdirSync(catDir).filter((name: string) => { try { return fs.statSync(path.join(catDir, name)).isDirectory(); } catch { return false; } });
    const page = allDirs.slice(offset, offset + limit);

    const apps = (page as string[]).map((name: string) => {
      const appDir = path.join(catDir, name);
      const files  = fs.readdirSync(appDir) as string[];
      const screens = files.filter((f: string) => f.startsWith('screen-') && (f.endsWith('.jpg') || f.endsWith('.png'))).sort();
      if (screens.length === 0) return null;
      let meta: Record<string, string> = {};
      const metaFile = path.join(appDir, 'meta.json');
      if (fs.existsSync(metaFile)) { try { meta = JSON.parse(fs.readFileSync(metaFile, 'utf-8')); } catch {} }
      const iconFile = files.find((f: string) => f === 'icon.jpg' || f === 'icon.png') ?? null;
      return {
        id: name, name: (meta.name as string) || name, developer: (meta.developer as string) || '',
        icon:    iconFile ? imgUrlLocal(category, name, iconFile) : null,
        preview: imgUrlLocal(category, name, screens[0]),
        screenCount: screens.length,
        screens: screens.map((s: string) => imgUrlLocal(category, name, s)),
      };
    }).filter(Boolean);

    return NextResponse.json({ apps, total: allDirs.length, hasMore: offset + limit < allDirs.length });
  } catch { return NextResponse.json({ apps: [], total: 0, hasMore: false }); }
}
