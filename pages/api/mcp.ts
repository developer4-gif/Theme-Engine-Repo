import type { NextApiRequest, NextApiResponse } from 'next';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { THEME_REGISTRY, THEME_MAP } from '../../app/theme-engine/theme-registry/index';
import type { Theme } from '../../app/theme-engine/types';

export const config = { api: { bodyParser: false } };

// ── CSS generator (server-safe, no browser APIs) ────────────────────────────
function buildCSS(theme: Theme): string {
  const c = theme.colors;
  const t = theme.typography;
  const br = theme.borders.radius;
  const sh = theme.shadows;
  const cp = theme.components;

  return [
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
    c.buttonGradient ? `  --btn-gradient: ${c.buttonGradient};` : '',
    c.buttonGlow     ? `  --btn-glow: ${c.buttonGlow};`         : '',
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
  ].filter(l => l !== '').join('\n');
}

// ── Claude prompt generator (server-safe) ──────────────────────────────────
function buildPrompt(theme: Theme): string {
  const nav = theme.layout.navPosition === 'left'  ? 'Left Sidebar'
            : theme.layout.navPosition === 'right' ? 'Right Sidebar'
            : theme.layout.navPosition === 'both'  ? 'Hybrid (Top + Left Sidebar)'
            : 'Top Navigation';

  return `Build all future pages using the JISL theme below.

## Theme: ${theme.name}
ID: ${theme.id} | Category: ${theme.category}
${theme.description}

## Layout
- Pattern: ${nav} (variant: ${theme.layout.variant})
- Sidebar width: ${theme.layout.sidebarWidth}
- Content max-width: ${theme.layout.contentMaxWidth}
- Content padding: ${theme.spacing.contentPadding}

## Colors
bg: ${theme.colors.bg} | panel: ${theme.colors.panel} | tint: ${theme.colors.tint}
primary: ${theme.colors.primary} (hover: ${theme.colors.primaryHover}) | primaryText: ${theme.colors.primaryText}
ink: ${theme.colors.ink} | ink2: ${theme.colors.ink2} | ink3: ${theme.colors.ink3}
rule: ${theme.colors.rule}
accents: ${theme.colors.accent1}, ${theme.colors.accent2}, ${theme.colors.accent3}, ${theme.colors.accent4}, ${theme.colors.accent5}
alert: ${theme.colors.alert} | warn: ${theme.colors.warn} | ok: ${theme.colors.ok}
navBg: ${theme.colors.navBg} | navText: ${theme.colors.navText} | navActive: ${theme.colors.navActiveText} on ${theme.colors.navActiveBg}
headerBg: ${theme.colors.headerBg} | headerText: ${theme.colors.headerText}
${theme.colors.buttonGradient ? `buttonGradient: ${theme.colors.buttonGradient}` : ''}
${theme.colors.buttonGlow     ? `buttonGlow: ${theme.colors.buttonGlow}` : ''}

## Typography
sans: ${theme.typography.fontSans}
serif: ${theme.typography.fontSerif}
mono: ${theme.typography.fontMono}
headingFont: ${theme.typography.headingFont} | base size: ${theme.typography.base}

## Components
button: ${theme.components.button.style} | radius: ${theme.components.button.radius} | weight: ${theme.components.button.fontWeight}
card: ${theme.components.card.style} | radius: ${theme.components.card.radius} | shadow: ${theme.components.card.shadow}
table: ${theme.components.table.style} | headerBg: ${theme.components.table.headerBg}
form: ${theme.components.form.style} | radius: ${theme.components.form.radius}
nav: ${theme.components.nav.style} | itemRadius: ${theme.components.nav.itemRadius}
badge: ${theme.components.badge.style} | radius: ${theme.components.badge.radius}

## Border & Shadow
radii — sm:${theme.borders.radius.sm} md:${theme.borders.radius.md} lg:${theme.borders.radius.lg} xl:${theme.borders.radius.xl}
shadows — sm:${theme.shadows.sm} | md:${theme.shadows.md}

## Brand
name: ${theme.brand.name} | tagline: ${theme.brand.tagline}
stripeColors: ${theme.brand.stripeColors.join(', ')} | stripeHeight: ${theme.brand.stripeHeight}px

## Implementation Rules
1. Never hardcode colors — use theme tokens only
2. Render BrandStripe at top of every page header
3. Place your logo at /public/logo.png — theme.brand.logo is intentionally empty
4. Button: use buttonGradient + buttonGlow for primary CTAs
5. Card glass style = backdropFilter: blur(12px) + border: 1px solid rule color
6. Table header background = components.table.headerBg
7. Sidebar themes (navPosition left): icon-only when sidebarStyle === 'minimal-icon'
8. Top-nav themes: pills → pill tabs, underline → bottom border indicator, floating → elevated panel
9. Animations: use animations.duration.base + animations.easing.ease
10. Persist selected theme in localStorage key: jisl_active_theme`;
}

// ── MCP server factory ───────────────────────────────────────────────────────
function createServer(): McpServer {
  const server = new McpServer({
    name: 'jisl-theme-engine',
    version: '1.0.0',
  });

  // list_themes
  server.tool(
    'list_themes',
    'List all available JISL themes with id, name, category, and description',
    {},
    async () => {
      const themes = THEME_REGISTRY.map(t => ({
        id: t.id,
        name: t.name,
        category: t.category,
        description: t.description,
        tags: t.tags,
        layoutVariant: t.layout.variant,
        navPosition: t.layout.navPosition,
        primaryColor: t.colors.primary,
        isDark: t.colors.bg.startsWith('#') && parseInt(t.colors.bg.slice(1, 3), 16) < 80,
      }));
      return {
        content: [{ type: 'text', text: JSON.stringify(themes, null, 2) }],
      };
    }
  );

  // get_theme
  server.tool(
    'get_theme',
    'Get the full theme JSON for a given theme id',
    { id: z.string().describe('Theme ID, e.g. "jains-crm" or "obsidian"') },
    async ({ id }) => {
      const theme = THEME_MAP[id];
      if (!theme) {
        const ids = THEME_REGISTRY.map(t => t.id).join(', ');
        return { content: [{ type: 'text', text: `Theme "${id}" not found. Available: ${ids}` }], isError: true };
      }
      return { content: [{ type: 'text', text: JSON.stringify(theme, null, 2) }] };
    }
  );

  // get_theme_css
  server.tool(
    'get_theme_css',
    'Get CSS custom properties (:root block) for a theme — paste into any project stylesheet',
    { id: z.string().describe('Theme ID') },
    async ({ id }) => {
      const theme = THEME_MAP[id];
      if (!theme) return { content: [{ type: 'text', text: `Theme "${id}" not found.` }], isError: true };
      return { content: [{ type: 'text', text: buildCSS(theme) }] };
    }
  );

  // get_theme_prompt
  server.tool(
    'get_theme_prompt',
    'Get the Claude integration prompt for a theme — paste into CLAUDE.md or the start of any conversation',
    { id: z.string().describe('Theme ID') },
    async ({ id }) => {
      const theme = THEME_MAP[id];
      if (!theme) return { content: [{ type: 'text', text: `Theme "${id}" not found.` }], isError: true };
      return { content: [{ type: 'text', text: buildPrompt(theme) }] };
    }
  );

  // search_themes
  server.tool(
    'search_themes',
    'Search themes by category, tag, or keyword in name/description',
    {
      query:    z.string().optional().describe('Keyword to search in name/description'),
      category: z.string().optional().describe('Filter by category, e.g. "corporate", "finance", "health"'),
      dark:     z.boolean().optional().describe('true = dark themes only, false = light themes only'),
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
      const out = results.map(t => ({ id: t.id, name: t.name, category: t.category, description: t.description }));
      return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
    }
  );

  return server;
}

// ── Next.js API route handler ────────────────────────────────────────────────
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS — allow any Claude Code session to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Mcp-Session-Id');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless — no session needed on Vercel
    });

    // Wire up server → transport → response
    const server = createServer();
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (err) {
    console.error('[MCP]', err);
    if (!res.headersSent) res.status(500).json({ error: 'MCP handler failed' });
  }
}
