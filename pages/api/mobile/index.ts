import type { NextApiRequest, NextApiResponse } from 'next';

const HF_URL = (process.env.HF_BUCKET_URL ?? 'https://huggingface.co/buckets/SecretITis/Theme-Studio/resolve').replace(/\/$/, '');
const MANIFEST_URL = process.env.HF_MANIFEST_URL ?? `${HF_URL}/manifest.json`;

interface CatEntry { id: string; label: string; appCount: number; preview: string; }
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=300');

  const manifest = await getManifest();
  if (!manifest) return res.status(503).json({ error: 'Could not fetch manifest' });

  const categories = manifest.categories.map(c => {
    const parts = c.preview.split('/');
    return {
      id: c.id,
      label: c.label,
      appCount: c.appCount,
      previewUrl: `${HF_URL}/${c.id}/${parts[1]}/${parts[2].replace(/\.png$/i, '.jpg')}`,
      appsUrl: `https://theme-engine-repo.vercel.app/api/mobile/${c.id}`,
    };
  });

  res.status(200).json({
    total: categories.length,
    totalApps: categories.reduce((s, c) => s + c.appCount, 0),
    categories,
    usage: 'GET /api/mobile/[category-id] to get apps + screen URLs for that category',
  });
}
