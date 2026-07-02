import type { NextApiRequest, NextApiResponse } from 'next';

const HF_URL = (process.env.HF_BUCKET_URL ?? 'https://huggingface.co/buckets/SecretITis/Theme-Studio/resolve').replace(/\/$/, '');
const MANIFEST_URL = process.env.HF_MANIFEST_URL ?? `${HF_URL}/manifest.json`;

interface AppEntry { id: string; name: string; developer: string; icon: string | null; screens: string[]; }
interface CatEntry { id: string; label: string; appCount: number; preview: string; apps: AppEntry[]; }
interface Manifest { categories: CatEntry[]; }

let cache: Manifest | null = null;
let cachedAt = 0;
const TTL = 5 * 60 * 1000;

async function getManifest(): Promise<Manifest | null> {
  if (cache && Date.now() - cachedAt < TTL) return cache;
  try {
    const res = await fetch(MANIFEST_URL, { cache: 'no-store' } as RequestInit);
    if (!res.ok) return null;
    cache = await res.json();
    cachedAt = Date.now();
    return cache;
  } catch { return null; }
}

function imgUrl(cat: string, app: string, file: string) {
  return `${HF_URL}/${cat}/${app}/${file.replace(/\.png$/i, '.jpg')}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=300');

  const { category, search, app, limit: limitStr } = req.query;
  const limit = parseInt((limitStr as string) ?? '30', 10);

  const manifest = await getManifest();
  if (!manifest) return res.status(503).json({ error: 'Could not fetch manifest' });

  const cat = manifest.categories.find(c => c.id === category);
  if (!cat) {
    return res.status(404).json({
      error: `Category "${category}" not found`,
      available: manifest.categories.map(c => ({ id: c.id, label: c.label, appCount: c.appCount })),
    });
  }

  // ?app=id — single app with full screens + Claude prompt
  if (app) {
    const found = cat.apps.find(a => a.id === app || a.name.toLowerCase().includes((app as string).toLowerCase()));
    if (!found) {
      return res.status(404).json({
        error: `App "${app}" not found in ${category}`,
        availableApps: cat.apps.slice(0, 20).map(a => ({ id: a.id, name: a.name })),
      });
    }
    const screens = found.screens.map(s => imgUrl(category as string, found.id, s));
    return res.status(200).json({
      id: found.id,
      name: found.name,
      developer: found.developer,
      category: cat.label,
      screenCount: found.screens.length,
      screens,
      downloadUrl: `https://theme-engine-repo.vercel.app/api/references/download?category=${encodeURIComponent(category as string)}&app=${encodeURIComponent(found.id)}`,
      claudePrompt: buildPrompt(cat.label, found.name, found.developer, screens),
    });
  }

  // List apps in category
  let apps = cat.apps;
  if (search) {
    const q = (search as string).toLowerCase();
    apps = apps.filter(a => a.name.toLowerCase().includes(q) || a.developer.toLowerCase().includes(q));
  }

  const page = apps.slice(0, limit).map(a => ({
    id: a.id,
    name: a.name,
    developer: a.developer,
    screenCount: a.screens.length,
    previewUrl: a.screens.length > 0 ? imgUrl(category as string, a.id, a.screens[0]) : null,
    screens: a.screens.map(s => imgUrl(category as string, a.id, s)),
    detailUrl: `https://theme-engine-repo.vercel.app/api/mobile/${category}?app=${encodeURIComponent(a.id)}`,
    downloadUrl: `https://theme-engine-repo.vercel.app/api/references/download?category=${encodeURIComponent(category as string)}&app=${encodeURIComponent(a.id)}`,
  }));

  res.status(200).json({
    category: cat.label,
    total: apps.length,
    showing: page.length,
    apps: page,
    usage: {
      singleApp: `GET /api/mobile/${category}?app=[app-id] — get all screens + Claude build prompt for one app`,
      search: `GET /api/mobile/${category}?search=zomato`,
      download: 'Use downloadUrl to get a ZIP with all screens + prompt file',
    },
  });
}

function buildPrompt(category: string, appName: string, developer: string, screens: string[]): string {
  return `# Mobile UI Reference: ${appName}
Category: ${category} | Developer: ${developer}
Screens: ${screens.length}

## Screen URLs
${screens.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## How to use these references
1. Study the layout, navigation pattern, color palette, and card styles from these screens
2. Note the primary color, background, and accent colors
3. Identify the navigation type (bottom tabs, side drawer, top nav, etc.)
4. Match card styles, typography scale, and spacing
5. Build mobile-first — max-width 480px, touch targets min 44px
6. Screen 1 is typically the home/dashboard — use it as the primary layout reference
7. This is a ${category} app — apply appropriate domain conventions

## Download all screens
${`https://theme-engine-repo.vercel.app/api/references/download?category=${encodeURIComponent(category)}&app=${encodeURIComponent(appName)}`}`;
}
