import type { NextApiRequest, NextApiResponse } from 'next';

function getFs() { return require('fs') as typeof import('fs'); }
function getPath() { return require('path') as typeof import('path'); }

function refsDir() {
  const resized = process.env.REFS_DIR;
  if (resized) { try { const fs = getFs(); if (fs.existsSync(resized) && fs.statSync(resized).isDirectory()) return resized; } catch {} }
  return getPath().join(process.env.REFS_BASE ?? process.cwd(), 'references');
}

function hasLocalRefs(): boolean {
  if (!process.env.REFS_DIR) return false;
  try { const fs = getFs(); const rd = refsDir(); return fs.existsSync(rd) && fs.statSync(rd).isDirectory(); } catch { return false; }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, app, file } = req.query;
  if (!category || !app || !file) return res.status(400).send('Missing params');
  if (!hasLocalRefs()) return res.status(404).send('No local references — images served from HuggingFace');

  const fs   = getFs();
  const path = getPath();
  const rd   = refsDir();
  const safe = (s: string) => s.replace(/[^a-z0-9._-]/gi, '');
  const imgPath = path.join(rd, safe(category as string), safe(app as string), safe(file as string));

  if (!imgPath.startsWith(rd)) return res.status(403).send('Forbidden');
  if (!fs.existsSync(imgPath)) return res.status(404).send('Not found');

  const data = fs.readFileSync(imgPath);
  const ext  = path.extname(file as string).toLowerCase();
  res.setHeader('Content-Type', ext === '.png' ? 'image/png' : 'image/jpeg');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(data);
}
