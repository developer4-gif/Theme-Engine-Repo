import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REFS_DIR = path.join(process.cwd(), 'references');

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const app = searchParams.get('app');

  // List all categories
  if (!category) {
    try {
      const cats = fs.readdirSync(REFS_DIR)
        .filter(name => {
          const p = path.join(REFS_DIR, name);
          return fs.statSync(p).isDirectory();
        })
        .map(name => {
          const catDir = path.join(REFS_DIR, name);
          const apps = fs.readdirSync(catDir).filter(a => {
            return fs.statSync(path.join(catDir, a)).isDirectory();
          });
          // Find a preview image from first app
          let preview: string | null = null;
          for (const a of apps.slice(0, 5)) {
            const appDir = path.join(catDir, a);
            const screens = fs.readdirSync(appDir)
              .filter(f => f.startsWith('screen-') && (f.endsWith('.jpg') || f.endsWith('.png')));
            if (screens.length > 0) {
              preview = `/api/references/image?category=${name}&app=${a}&file=${screens[0]}`;
              break;
            }
          }
          return { id: name, label: name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), appCount: apps.length, preview };
        })
        .filter(c => c.id !== 'manifest.json' && c.appCount > 0);
      return NextResponse.json(cats);
    } catch {
      return NextResponse.json([]);
    }
  }

  // List apps in a category
  if (category && !app) {
    try {
      const catDir = path.join(REFS_DIR, category);
      if (!fs.existsSync(catDir)) return NextResponse.json([]);
      const apps = fs.readdirSync(catDir)
        .filter(name => fs.statSync(path.join(catDir, name)).isDirectory())
        .map(name => {
          const appDir = path.join(catDir, name);
          const files = fs.readdirSync(appDir);
          const screens = files.filter(f => f.startsWith('screen-') && (f.endsWith('.jpg') || f.endsWith('.png')));
          let meta: Record<string, string> = {};
          const metaFile = path.join(appDir, 'meta.json');
          if (fs.existsSync(metaFile)) {
            try { meta = JSON.parse(fs.readFileSync(metaFile, 'utf-8')); } catch {}
          }
          const iconFile = files.find(f => f === 'icon.jpg' || f === 'icon.png') ?? null;
          const icon = iconFile ? `/api/references/image?category=${category}&app=${name}&file=${iconFile}` : null;
          const preview = screens.length > 0 ? `/api/references/image?category=${category}&app=${name}&file=${screens[0]}` : null;
          return { id: name, name: (meta.name as string) || name, developer: (meta.developer as string) || '', icon, preview, screenCount: screens.length, screens: screens.map(s => `/api/references/image?category=${category}&app=${name}&file=${s}`) };
        })
        .filter(a => a.screenCount > 0);
      return NextResponse.json(apps);
    } catch {
      return NextResponse.json([]);
    }
  }

  return NextResponse.json({ error: 'Bad request' }, { status: 400 });
}
