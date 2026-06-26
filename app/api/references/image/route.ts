export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

function getFs() { return require('fs') as typeof import('fs'); }
function getPath() { return require('path') as typeof import('path'); }

function refsDir() {
  const resized = process.env.REFS_DIR;
  if (resized) {
    try { const fs = getFs(); if (fs.existsSync(resized) && fs.statSync(resized).isDirectory()) return resized; } catch {}
  }
  const path = getPath();
  return path.join(process.env.REFS_BASE ?? process.cwd(), 'references');
}

function hasLocalRefs(): boolean {
  if (!process.env.REFS_DIR) return false;
  try { const fs = getFs(); const rd = refsDir(); return fs.existsSync(rd) && fs.statSync(rd).isDirectory(); } catch { return false; }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const app      = searchParams.get('app');
  const file     = searchParams.get('file');

  if (!category || !app || !file) {
    return new NextResponse('Missing params', { status: 400 });
  }

  if (!hasLocalRefs()) {
    return new NextResponse('No local references — images served from HuggingFace', { status: 404 });
  }

  const fs   = getFs();
  const path = getPath();
  const rd   = refsDir();
  const safe = (s: string) => s.replace(/[^a-z0-9._-]/gi, '');
  const imgPath = path.join(rd, safe(category), safe(app), safe(file));

  if (!imgPath.startsWith(rd)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(imgPath)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const data = fs.readFileSync(imgPath);
  const ext  = path.extname(file).toLowerCase();
  const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

  return new NextResponse(data, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
