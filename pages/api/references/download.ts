import type { NextApiRequest, NextApiResponse } from 'next';
import JSZip from 'jszip';

function getFs() { return require('fs') as typeof import('fs'); }
function getPath() { return require('path') as typeof import('path'); }

function refsDir() {
  const resized = process.env.REFS_DIR;
  if (resized) { try { if (getFs().existsSync(resized)) return resized; } catch {} }
  return getPath().join(process.env.REFS_BASE ?? process.cwd(), 'references');
}

const CLAUDE_PROMPT = `These screenshots are design references only — they show layout patterns, color palettes, typography choices, and UI component arrangements from real apps.

Paste this into Claude Code along with your own content:

---

I'm building an Android app and I have reference screenshots in the attached folder.
Please help me implement a similar layout using:
1. The structural patterns from these screenshots (navigation, cards, lists, hero sections)
2. Replace ALL reference images/screenshots with my own branded images and content
3. Apply the JISL theme tokens for colors, typography, and spacing
4. Do NOT copy any app content, logos, or copyrighted imagery

Focus on:
- Layout structure and spacing
- Component patterns (bottom nav, cards, stat rows, search bars)
- Visual hierarchy and typography scale
- Color usage patterns (primary actions, secondary content, backgrounds)

Important: Replace every reference image with your own content. Use the layout as a template, not a copy.
`;

function addAppToZip(zipFolder: JSZip, appDir: string, appName: string) {
  const fs   = getFs();
  const path = getPath();
  const appFolder = zipFolder.folder(appName)!;
  const files = fs.readdirSync(appDir) as string[];

  const metaFile = path.join(appDir, 'meta.json');
  if (fs.existsSync(metaFile)) appFolder.file('meta.json', fs.readFileSync(metaFile));

  const iconFile = files.find((f: string) => f === 'icon.jpg' || f === 'icon.png');
  if (iconFile) appFolder.file(iconFile, fs.readFileSync(path.join(appDir, iconFile)));

  const screens = files.filter((f: string) => f.startsWith('screen-') && (f.endsWith('.jpg') || f.endsWith('.png'))).sort();
  for (const screen of screens) appFolder.file(screen, fs.readFileSync(path.join(appDir, screen)));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, app } = req.query;
  const fs   = getFs();
  const path = getPath();
  const rd   = refsDir();

  const zip = new JSZip();
  zip.file('CLAUDE_PROMPT.txt', CLAUDE_PROMPT);

  if (category && app) {
    const appDir = path.join(rd, category as string, app as string);
    if (!fs.existsSync(appDir)) return res.status(404).send('App not found');
    addAppToZip(zip, appDir, app as string);
    const buf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${app}-reference.zip"`);
    return res.send(buf);
  }

  if (category) {
    const catDir = path.join(rd, category as string);
    if (!fs.existsSync(catDir)) return res.status(404).send('Category not found');
    const catFolder = zip.folder(category as string)!;
    const apps = (fs.readdirSync(catDir) as string[]).filter((n: string) => { try { return fs.statSync(path.join(catDir, n)).isDirectory(); } catch { return false; } }).slice(0, 10);
    for (const a of apps) addAppToZip(catFolder, path.join(catDir, a), a);
    const buf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${category}-references.zip"`);
    return res.send(buf);
  }

  return res.status(400).send('Specify category or category+app');
}
