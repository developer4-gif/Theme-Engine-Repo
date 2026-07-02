import type { NextApiRequest, NextApiResponse } from 'next';
import { THEME_REGISTRY } from '../../../app/theme-engine/theme-registry/index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const { search, category, dark } = req.query;

  let results = THEME_REGISTRY;

  if (category) {
    results = results.filter(t => t.category === category);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    results = results.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q))
    );
  }

  if (dark !== undefined) {
    const wantDark = dark === 'true';
    results = results.filter(t => {
      const isDark = t.colors.bg.startsWith('#') && parseInt(t.colors.bg.slice(1, 3), 16) < 80;
      return wantDark ? isDark : !isDark;
    });
  }

  const out = results.map(t => ({
    id: t.id,
    name: t.name,
    category: t.category,
    description: t.description,
    tags: t.tags,
    primaryColor: t.colors.primary,
    background: t.colors.bg,
    navPosition: t.layout.navPosition,
    layoutVariant: t.layout.variant,
    isDark: t.colors.bg.startsWith('#') && parseInt(t.colors.bg.slice(1, 3), 16) < 80,
    bundleUrl: `https://theme-engine-repo.vercel.app/api/themes/${t.id}`,
  }));

  res.status(200).json({
    total: out.length,
    themes: out,
    usage: {
      getBundle: 'GET /api/themes/[id] — returns CSS + Claude prompt + HTML pages + JSON tokens for a specific theme',
      search: 'GET /api/themes?search=dark&category=corporate&dark=true',
    },
  });
}
