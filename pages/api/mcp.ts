import type { NextApiRequest, NextApiResponse } from 'next';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { THEME_REGISTRY, THEME_MAP } from '../../app/theme-engine/theme-registry/index';
import type { Theme } from '../../app/theme-engine/types';

export const config = { api: { bodyParser: false } };

const HF_URL = (process.env.HF_BUCKET_URL ?? 'https://huggingface.co/buckets/SecretITis/Theme-Studio/resolve').replace(/\/$/, '');
const MANIFEST_URL = process.env.HF_MANIFEST_URL ?? `${HF_URL}/manifest.json`;

interface AppEntry { id: string; name: string; developer: string; icon: string | null; screens: string[]; }
interface CatEntry { id: string; label: string; appCount: number; preview: string; apps: AppEntry[]; }
interface Manifest { categories: CatEntry[]; }

let manifestCache: Manifest | null = null;
let manifestFetchedAt = 0;
const MANIFEST_TTL = 5 * 60 * 1000;

async function fetchManifest(): Promise<Manifest | null> {
  const now = Date.now();
  if (manifestCache && now - manifestFetchedAt < MANIFEST_TTL) return manifestCache;
  try {
    const res = await fetch(MANIFEST_URL, { cache: 'no-store' } as RequestInit);
    if (!res.ok) return null;
    manifestCache = await res.json() as Manifest;
    manifestFetchedAt = now;
    return manifestCache;
  } catch { return null; }
}

function hfImg(category: string, app: string, file: string): string {
  return `${HF_URL}/${category}/${app}/${file.replace(/\.png$/i, '.jpg')}`;
}

// ── CSS generator (server-safe) ──────────────────────────────────────────────
function buildCSS(theme: Theme): string {
  const c = theme.colors;
  const t = theme.typography;
  const br = theme.borders.radius;
  const sh = theme.shadows;
  const cp = theme.components;
  const lines = [
    `/* JISL Theme Engine — ${theme.name} */`,
    `:root {`,
    `  --color-bg: ${c.bg};`,
    `  --color-bg-secondary: ${c.bgSecondary};`,
    `  --color-bg-tertiary: ${c.bgTertiary};`,
    `  --color-panel: ${c.panel};`,
    `  --color-panel-secondary: ${c.panelSecondary};`,
    `  --color-tint: ${c.tint};`,
    `  --color-ink: ${c.ink};`,
    `  --color-ink2: ${c.ink2};`,
    `  --color-ink3: ${c.ink3};`,
    `  --color-rule: ${c.rule};`,
    `  --color-primary: ${c.primary};`,
    `  --color-primary-hover: ${c.primaryHover};`,
    `  --color-primary-text: ${c.primaryText};`,
    `  --color-accent1: ${c.accent1};`,
    `  --color-accent2: ${c.accent2};`,
    `  --color-accent3: ${c.accent3};`,
    `  --color-accent4: ${c.accent4};`,
    `  --color-accent5: ${c.accent5};`,
    `  --color-alert: ${c.alert};`,
    `  --color-warn: ${c.warn};`,
    `  --color-ok: ${c.ok};`,
    `  --color-nav-bg: ${c.navBg};`,
    `  --color-nav-text: ${c.navText};`,
    `  --color-nav-active: ${c.navActiveText};`,
    `  --color-header-bg: ${c.headerBg};`,
    ...(c.buttonGradient ? [`  --btn-gradient: ${c.buttonGradient};`] : []),
    ...(c.buttonGlow     ? [`  --btn-glow: ${c.buttonGlow};`]         : []),
    `  --font-sans: ${t.fontSans};`,
    `  --font-serif: ${t.fontSerif};`,
    `  --font-mono: ${t.fontMono};`,
    `  --radius-sm: ${br.sm};`,
    `  --radius-md: ${br.md};`,
    `  --radius-lg: ${br.lg};`,
    `  --radius-xl: ${br.xl};`,
    `  --radius-full: ${br.full};`,
    `  --shadow-sm: ${sh.sm};`,
    `  --shadow-md: ${sh.md};`,
    `  --shadow-lg: ${sh.lg};`,
    `  --shadow-xl: ${sh.xl};`,
    `  --btn-radius: ${cp.button.radius};`,
    `  --btn-padding: ${cp.button.paddingY} ${cp.button.paddingX};`,
    `  --card-radius: ${cp.card.radius};`,
    `  --card-shadow: ${cp.card.shadow};`,
    `  --nav-height: ${theme.spacing.navHeight};`,
    `  --header-height: ${theme.spacing.headerHeight};`,
    `  --sidebar-width: ${theme.layout.sidebarWidth};`,
    `}`,
  ];
  return lines.join('\n');
}

// ── HTML page generator ──────────────────────────────────────────────────────
function buildSignInHTML(theme: Theme): string {
  const c = theme.colors;
  const cp = theme.components;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${theme.brand.name} — Sign In</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:${c.bg};font-family:${theme.typography.fontSans};display:flex;align-items:center;justify-content:center;padding:24px}
.stripe{position:fixed;top:0;left:0;right:0;height:${theme.brand.stripeHeight}px;background:linear-gradient(90deg,${theme.brand.stripeColors.join(',')})}
.card{background:${c.panel};border:1px solid ${c.rule};border-radius:${cp.card.radius};padding:40px;width:100%;max-width:400px;box-shadow:${cp.card.shadow}}
.logo{font-size:22px;font-weight:700;color:${c.ink};margin-bottom:6px}
.tagline{font-size:13px;color:${c.ink3};margin-bottom:32px}
label{display:block;font-size:11px;font-weight:600;color:${c.ink3};letter-spacing:0.06em;text-transform:uppercase;margin-bottom:6px}
input{width:100%;background:${cp.form.bg};border:1px solid ${cp.form.borderColor};border-radius:${cp.form.radius};padding:10px 14px;font-size:${cp.form.inputSize};color:${c.ink};outline:none;margin-bottom:20px;transition:border-color 0.15s}
input:focus{border-color:${cp.form.focusBorderColor}}
.btn{width:100%;padding:${cp.button.paddingY} ${cp.button.paddingX};background:${c.buttonGradient ?? c.primary};color:${c.primaryText};border:none;border-radius:${cp.button.radius};font-size:15px;font-weight:${cp.button.fontWeight};cursor:pointer;box-shadow:${c.buttonGlow ?? 'none'}}
.link{text-align:center;margin-top:20px;font-size:13px;color:${c.ink3}}
.link a{color:${c.primary};text-decoration:none}
</style>
</head>
<body>
<div class="stripe"></div>
<div class="card">
  <div class="logo">${theme.brand.name}</div>
  <div class="tagline">${theme.brand.tagline}</div>
  <label>Email</label>
  <input type="email" placeholder="you@example.com">
  <label>Password</label>
  <input type="password" placeholder="••••••••">
  <button class="btn">Sign In</button>
  <div class="link">Don't have an account? <a href="#">Sign Up</a></div>
</div>
</body>
</html>`;
}

function buildDashboardHTML(theme: Theme): string {
  const c = theme.colors;
  const cp = theme.components;
  const isLeft = theme.layout.navPosition === 'left';
  const navItems = ['Dashboard', 'Analytics', 'Reports', 'Settings', 'Users'];
  const stats = [
    { label: 'Total Revenue', value: '₹24.5L', change: '+12%' },
    { label: 'Active Users', value: '8,421', change: '+5%' },
    { label: 'Pending Tasks', value: '143', change: '-3%' },
    { label: 'Completed', value: '1,920', change: '+18%' },
  ];
  const rows = [
    ['Ramesh Jain', 'Senior Manager', 'Active', '₹85,000'],
    ['Priya Shah', 'Analyst', 'Active', '₹62,000'],
    ['Arjun Patel', 'Developer', 'On Leave', '₹74,000'],
    ['Sunita Verma', 'Designer', 'Active', '₹58,000'],
    ['Vikram Nair', 'Team Lead', 'Active', '₹91,000'],
  ];

  const sidebarNav = navItems.map((item, i) => `
    <div style="padding:${cp.nav.itemPadding};border-radius:${cp.nav.itemRadius};background:${i === 0 ? c.navActiveBg : 'transparent'};color:${i === 0 ? c.navActiveText : c.navText};font-size:${cp.nav.fontSize};font-weight:500;cursor:pointer;margin-bottom:4px">
      ${item}
    </div>`).join('');

  const topNav = navItems.map((item, i) => `
    <div style="padding:8px 16px;border-radius:${cp.nav.itemRadius};background:${i === 0 ? c.navActiveBg : 'transparent'};color:${i === 0 ? c.navActiveText : c.navText};font-size:${cp.nav.fontSize};font-weight:500;cursor:pointer">
      ${item}
    </div>`).join('');

  const statCards = stats.map(s => `
    <div style="background:${c.panel};border:1px solid ${c.rule};border-radius:${cp.stat.radius};padding:20px;flex:1;min-width:160px">
      <div style="font-size:11px;color:${c.ink3};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">${s.label}</div>
      <div style="font-size:${cp.stat.valueFontSize};font-weight:700;color:${c.ink};margin-bottom:4px">${s.value}</div>
      <div style="font-size:12px;color:${s.change.startsWith('+') ? c.ok : c.alert}">${s.change}</div>
    </div>`).join('');

  const tableRows = rows.map((r, i) => `
    <tr style="background:${i % 2 === 0 ? 'transparent' : cp.table.stripeColor}">
      ${r.map(cell => `<td style="padding:${cp.table.cellPaddingY} ${cp.table.cellPaddingX};font-size:${cp.table.fontSize};color:${c.ink};border-bottom:1px solid ${cp.table.borderColor}">${cell}</td>`).join('')}
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${theme.brand.name} — Dashboard</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:${c.bg};font-family:${theme.typography.fontSans};min-height:100vh;display:flex;flex-direction:column}
.stripe{height:${theme.brand.stripeHeight}px;background:linear-gradient(90deg,${theme.brand.stripeColors.join(',')})}
.header{background:${c.headerBg};border-bottom:1px solid ${c.headerBorder ?? c.rule};padding:0 24px;height:${theme.spacing.headerHeight};display:flex;align-items:center;justify-content:space-between;position:sticky;top:${theme.brand.stripeHeight}px}
.logo{font-size:16px;font-weight:700;color:${c.headerText ?? c.ink}}
.layout{display:flex;flex:1}
.sidebar{width:${theme.layout.sidebarWidth};background:${c.navBg};border-right:1px solid ${c.rule};padding:16px;flex-shrink:0}
.content{flex:1;padding:24px;overflow:auto}
.stats{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px}
table{width:100%;border-collapse:collapse}
th{background:${cp.table.headerBg};padding:${cp.table.cellPaddingY} ${cp.table.cellPaddingX};font-size:${cp.table.headerFontSize};color:${c.ink3};text-align:left;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid ${cp.table.borderColor}}
.table-wrap{background:${c.panel};border:1px solid ${c.rule};border-radius:${cp.card.radius};overflow:hidden}
.page-title{font-size:20px;font-weight:700;color:${c.ink};margin-bottom:20px}
</style>
</head>
<body>
<div class="stripe"></div>
<div class="header">
  <div class="logo">${theme.brand.name}</div>
  <div style="display:flex;gap:8px">${isLeft ? topNav.slice(0, 0) : `<div style="display:flex;gap:4px">${topNav}</div>`}
    <div style="width:32px;height:32px;border-radius:50%;background:${c.primary};display:flex;align-items:center;justify-content:center;color:${c.primaryText};font-size:13px;font-weight:700">JD</div>
  </div>
</div>
<div class="layout">
  ${isLeft ? `<div class="sidebar">${sidebarNav}</div>` : ''}
  <div class="content">
    ${!isLeft ? `<div style="display:flex;gap:4px;margin-bottom:24px;border-bottom:1px solid ${c.rule};padding-bottom:16px">${topNav}</div>` : ''}
    <div class="page-title">Dashboard Overview</div>
    <div class="stats">${statCards}</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Salary</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
  </div>
</div>
</body>
</html>`;
}

// ── Claude prompt generator ───────────────────────────────────────────────────
function buildPrompt(theme: Theme): string {
  const nav = theme.layout.navPosition === 'left'  ? 'Left Sidebar'
            : theme.layout.navPosition === 'right' ? 'Right Sidebar'
            : theme.layout.navPosition === 'both'  ? 'Hybrid (Top + Left Sidebar)'
            : 'Top Navigation';

  return `# JISL Theme: ${theme.name}
Apply this theme to ALL pages you build in this project.

## Identity
ID: ${theme.id} | Category: ${theme.category}
${theme.description}

## Layout
Pattern: ${nav} (variant: ${theme.layout.variant})
Sidebar width: ${theme.layout.sidebarWidth} | Content max-width: ${theme.layout.contentMaxWidth}
Content padding: ${theme.spacing.contentPadding}

## Colors
bg: ${theme.colors.bg} | panel: ${theme.colors.panel} | tint: ${theme.colors.tint}
primary: ${theme.colors.primary} (hover: ${theme.colors.primaryHover}) | on primary: ${theme.colors.primaryText}
ink: ${theme.colors.ink} | ink2: ${theme.colors.ink2} | ink3: ${theme.colors.ink3}
rule: ${theme.colors.rule} | ruleStrong: ${theme.colors.ruleStrong}
accents: ${theme.colors.accent1} · ${theme.colors.accent2} · ${theme.colors.accent3} · ${theme.colors.accent4} · ${theme.colors.accent5}
status → alert: ${theme.colors.alert} | warn: ${theme.colors.warn} | ok: ${theme.colors.ok} | info: ${theme.colors.info}
nav → bg: ${theme.colors.navBg} | text: ${theme.colors.navText} | active: ${theme.colors.navActiveText} on ${theme.colors.navActiveBg}
header → bg: ${theme.colors.headerBg} | text: ${theme.colors.headerText}
${theme.colors.buttonGradient ? `buttonGradient: ${theme.colors.buttonGradient}` : ''}
${theme.colors.buttonGlow     ? `buttonGlow: ${theme.colors.buttonGlow}` : ''}

## Typography
sans: ${theme.typography.fontSans}
serif: ${theme.typography.fontSerif}
mono: ${theme.typography.fontMono}
headingFont: ${theme.typography.headingFont} | base: ${theme.typography.base}

## Components
button: style=${theme.components.button.style} radius=${theme.components.button.radius} weight=${theme.components.button.fontWeight} padding=${theme.components.button.paddingY} ${theme.components.button.paddingX}
card: style=${theme.components.card.style} radius=${theme.components.card.radius} shadow=${theme.components.card.shadow}
table: style=${theme.components.table.style} headerBg=${theme.components.table.headerBg} rowHover=${theme.components.table.rowHoverBg}
form: style=${theme.components.form.style} radius=${theme.components.form.radius} border=${theme.components.form.borderColor} focusBorder=${theme.components.form.focusBorderColor}
nav: style=${theme.components.nav.style} itemRadius=${theme.components.nav.itemRadius} fontSize=${theme.components.nav.fontSize}
badge: style=${theme.components.badge.style} radius=${theme.components.badge.radius}
stat: valueFontSize=${theme.components.stat.valueFontSize} bgStyle=${theme.components.stat.bgStyle}

## Radii & Shadows
sm:${theme.borders.radius.sm} md:${theme.borders.radius.md} lg:${theme.borders.radius.lg} xl:${theme.borders.radius.xl} full:${theme.borders.radius.full}
shadow-sm: ${theme.shadows.sm}
shadow-md: ${theme.shadows.md}
shadow-lg: ${theme.shadows.lg}

## Brand
name: ${theme.brand.name} | tagline: ${theme.brand.tagline}
stripeColors: ${theme.brand.stripeColors.join(', ')} | stripeHeight: ${theme.brand.stripeHeight}px

## Rules — follow these for every page
1. Never hardcode colors — use the tokens above only
2. Render brand stripe at the very top of every page (height: ${theme.brand.stripeHeight}px, gradient from stripeColors)
3. Place logo at /public/logo.png — brand.logo is intentionally empty
4. Primary buttons: use buttonGradient + buttonGlow for the main CTA
5. Glass cards: backdropFilter blur(12px) + border 1px solid rule color
6. Table headers: always use components.table.headerBg
7. Sidebar themes (navPosition=left): icon-only mode when sidebarStyle=minimal-icon
8. Top-nav themes: pills→pill tabs, underline→bottom border indicator, floating→elevated panel
9. Animations: duration.base + easing.ease for all transitions
10. Save chosen theme to localStorage key: jisl_active_theme`;
}

// ── Mobile app prompt builder ─────────────────────────────────────────────────
function buildMobilePrompt(category: string, appName: string, developer: string, screens: string[]): string {
  return `# Mobile App Reference: ${appName}
Category: ${category} | Developer: ${developer}
Screens available: ${screens.length}

## Screen URLs
${screens.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Build Instructions
Use these screens as UI reference to build a similar app:
1. Study the layout patterns, color usage, and navigation from these screens
2. Extract the primary color, background, and accent from the screenshots
3. Replicate the navigation pattern (bottom tabs, top nav, etc.)
4. Match the card/list styles, typography scale, and spacing feel
5. Build mobile-first — max-width 480px, touch-friendly tap targets (min 44px)
6. Reference screen 1 for the home/dashboard layout
7. Use the developer name and app name as context for the domain (${category})

## Download
To get all screens as files: ${`https://theme-engine-repo.vercel.app/api/references/download?category=${encodeURIComponent(category)}&app=${encodeURIComponent(appName)}`}`;
}

// ── MCP server factory ────────────────────────────────────────────────────────
function createServer(): McpServer {
  const server = new McpServer({ name: 'jisl-theme-engine', version: '2.0.0' });

  // ── THEME TOOLS ─────────────────────────────────────────────────────────────

  server.tool('list_themes',
    'List all available JISL themes (90+ themes). Returns id, name, category, description, colors.',
    {},
    async () => {
      const out = THEME_REGISTRY.map(t => ({
        id: t.id, name: t.name, category: t.category,
        description: t.description, tags: t.tags,
        layoutVariant: t.layout.variant, navPosition: t.layout.navPosition,
        primaryColor: t.colors.primary,
        isDark: t.colors.bg.startsWith('#') && parseInt(t.colors.bg.slice(1, 3), 16) < 80,
      }));
      return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
    }
  );

  server.tool('get_theme_bundle',
    'Get EVERYTHING for a theme in one call: JSON tokens + CSS variables + Claude prompt + HTML pages (sign-in & dashboard). Use this when applying a theme to a project.',
    { id: z.string().describe('Theme ID, e.g. "jains-crm", "obsidian", "pulse"') },
    async ({ id }) => {
      const theme = THEME_MAP[id];
      if (!theme) {
        const ids = THEME_REGISTRY.map(t => t.id).join(', ');
        return { content: [{ type: 'text', text: `Theme "${id}" not found.\nAvailable: ${ids}` }], isError: true };
      }
      const bundle = [
        `# THEME BUNDLE: ${theme.name}`,
        ``,
        `## ── 1. CLAUDE PROMPT (paste into CLAUDE.md or conversation start) ──`,
        buildPrompt(theme),
        ``,
        `## ── 2. CSS VARIABLES (save as theme.css and import in your project) ──`,
        '```css',
        buildCSS(theme),
        '```',
        ``,
        `## ── 3. SIGN-IN PAGE HTML (save as sign-in.html) ──`,
        '```html',
        buildSignInHTML(theme),
        '```',
        ``,
        `## ── 4. DASHBOARD PAGE HTML (save as dashboard.html) ──`,
        '```html',
        buildDashboardHTML(theme),
        '```',
        ``,
        `## ── 5. THEME JSON TOKENS ──`,
        '```json',
        JSON.stringify(theme, null, 2),
        '```',
      ].join('\n');
      return { content: [{ type: 'text', text: bundle }] };
    }
  );

  server.tool('get_theme_css',
    'Get CSS custom properties (:root block) for a theme',
    { id: z.string().describe('Theme ID') },
    async ({ id }) => {
      const theme = THEME_MAP[id];
      if (!theme) return { content: [{ type: 'text', text: `Theme "${id}" not found.` }], isError: true };
      return { content: [{ type: 'text', text: buildCSS(theme) }] };
    }
  );

  server.tool('get_theme_prompt',
    'Get the Claude implementation prompt for a theme — tells Claude how to build every page using this theme',
    { id: z.string().describe('Theme ID') },
    async ({ id }) => {
      const theme = THEME_MAP[id];
      if (!theme) return { content: [{ type: 'text', text: `Theme "${id}" not found.` }], isError: true };
      return { content: [{ type: 'text', text: buildPrompt(theme) }] };
    }
  );

  server.tool('search_themes',
    'Search themes by keyword, category, or dark/light preference',
    {
      query:    z.string().optional().describe('Keyword in name/description/tags'),
      category: z.string().optional().describe('Category: corporate, finance, health, healthcare, medical, education, productivity, luxury, minimal, startup, industrial, government, navigation, social, tech'),
      dark:     z.boolean().optional().describe('true = dark themes, false = light themes'),
    },
    async ({ query, category, dark }) => {
      let results = THEME_REGISTRY;
      if (category) results = results.filter(t => t.category === category);
      if (query) {
        const q = query.toLowerCase();
        results = results.filter(t =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.includes(q))
        );
      }
      if (dark !== undefined) {
        results = results.filter(t => {
          const isDark = t.colors.bg.startsWith('#') && parseInt(t.colors.bg.slice(1, 3), 16) < 80;
          return dark ? isDark : !isDark;
        });
      }
      const out = results.map(t => ({ id: t.id, name: t.name, category: t.category, description: t.description, primaryColor: t.colors.primary }));
      return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
    }
  );

  // ── MOBILE REFERENCE TOOLS ──────────────────────────────────────────────────

  server.tool('list_mobile_categories',
    'List all mobile app reference categories (26 categories, 18k+ apps) from JISL Theme Studio',
    {},
    async () => {
      const manifest = await fetchManifest();
      if (!manifest) return { content: [{ type: 'text', text: 'Could not fetch categories. Try again shortly.' }], isError: true };
      const out = manifest.categories.map(c => ({
        id: c.id, label: c.label, appCount: c.appCount,
        previewUrl: hfImg(c.id, c.preview.split('/')[1], c.preview.split('/')[2]),
      }));
      return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
    }
  );

  server.tool('search_mobile_apps',
    'Search mobile app references by category. Returns app list with screen URLs.',
    {
      category: z.string().describe('Category ID from list_mobile_categories, e.g. "food-delivery", "finance", "health"'),
      query:    z.string().optional().describe('Filter by app name keyword'),
      limit:    z.number().optional().describe('Max results (default 20)'),
    },
    async ({ category, query, limit = 20 }) => {
      const manifest = await fetchManifest();
      if (!manifest) return { content: [{ type: 'text', text: 'Could not fetch manifest.' }], isError: true };
      const cat = manifest.categories.find(c => c.id === category);
      if (!cat) {
        const ids = manifest.categories.map(c => c.id).join(', ');
        return { content: [{ type: 'text', text: `Category "${category}" not found.\nAvailable: ${ids}` }], isError: true };
      }
      let apps = cat.apps;
      if (query) {
        const q = query.toLowerCase();
        apps = apps.filter(a => a.name.toLowerCase().includes(q) || a.developer.toLowerCase().includes(q));
      }
      apps = apps.slice(0, limit);
      const out = apps.map(a => ({
        id: a.id, name: a.name, developer: a.developer,
        screenCount: a.screens.length,
        screens: a.screens.map(s => hfImg(category, a.id, s)),
        downloadUrl: `https://theme-engine-repo.vercel.app/api/references/download?category=${encodeURIComponent(category)}&app=${encodeURIComponent(a.id)}`,
      }));
      return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
    }
  );

  server.tool('get_app_reference',
    'Get full reference for a specific app: all screen URLs + a Claude build prompt. Use this to build a UI inspired by this app.',
    {
      category: z.string().describe('Category ID'),
      app_id:   z.string().describe('App ID from search_mobile_apps'),
    },
    async ({ category, app_id }) => {
      const manifest = await fetchManifest();
      if (!manifest) return { content: [{ type: 'text', text: 'Could not fetch manifest.' }], isError: true };
      const cat = manifest.categories.find(c => c.id === category);
      if (!cat) return { content: [{ type: 'text', text: `Category "${category}" not found.` }], isError: true };
      const app = cat.apps.find(a => a.id === app_id);
      if (!app) return { content: [{ type: 'text', text: `App "${app_id}" not found in category "${category}".` }], isError: true };
      const screens = app.screens.map(s => hfImg(category, app.id, s));
      const prompt = buildMobilePrompt(category, app.name, app.developer, screens);
      const out = {
        id: app.id, name: app.name, developer: app.developer,
        category, screenCount: app.screens.length,
        screens,
        downloadUrl: `https://theme-engine-repo.vercel.app/api/references/download?category=${encodeURIComponent(category)}&app=${encodeURIComponent(app.id)}`,
        claudePrompt: prompt,
      };
      return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
    }
  );

  return server;
}

// ── Next.js route handler ────────────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Mcp-Session-Id');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    const server = createServer();
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (err) {
    console.error('[MCP]', err);
    if (!res.headersSent) res.status(500).json({ error: 'MCP handler failed' });
  }
}
