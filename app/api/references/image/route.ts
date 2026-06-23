import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REFS_DIR = path.join(process.cwd(), 'references');

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const app = searchParams.get('app');
  const file = searchParams.get('file');

  if (!category || !app || !file) {
    return new NextResponse('Missing params', { status: 400 });
  }

  // Sanitize — no path traversal
  const safe = (s: string) => s.replace(/[^a-z0-9._-]/gi, '');
  const imgPath = path.join(REFS_DIR, safe(category), safe(app), safe(file));

  if (!imgPath.startsWith(REFS_DIR)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(imgPath)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const data = fs.readFileSync(imgPath);
  const ext = path.extname(file).toLowerCase();
  const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

  return new NextResponse(data, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
