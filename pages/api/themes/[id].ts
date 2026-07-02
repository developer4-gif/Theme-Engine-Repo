import type { NextApiRequest, NextApiResponse } from 'next';
import { THEME_MAP, THEME_REGISTRY } from '../../../app/theme-engine/theme-registry/index';
import type { Theme } from '../../../app/theme-engine/types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const { id, format } = req.query;
  const theme = THEME_MAP[id as string];

  if (!theme) {
    return res.status(404).json({
      error: `Theme "${id}" not found`,
      available: THEME_REGISTRY.map(t => t.id),
    });
  }

  // ?format=css — just the CSS
  if (format === 'css') {
    res.setHeader('Content-Type', 'text/css');
    return res.status(200).send(buildCSS(theme));
  }

  // ?format=prompt — just the Claude prompt
  if (format === 'prompt') {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(buildPrompt(theme));
  }

  // Default — full bundle
  return res.status(200).json({
    id: theme.id,
    name: theme.name,
    category: theme.category,
    description: theme.description,
    tokens: theme,
    css: buildCSS(theme),
    claudePrompt: buildPrompt(theme),
    pages: {
      signIn: buildSignInHTML(theme),
      dashboard: buildDashboardHTML(theme),
    },
    usage: {
      cssOnly: `GET /api/themes/${theme.id}?format=css`,
      promptOnly: `GET /api/themes/${theme.id}?format=prompt`,
    },
  });
}

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
  ].join('\n');
}

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
Sidebar: ${theme.layout.sidebarWidth} | Content max-width: ${theme.layout.contentMaxWidth}
Padding: ${theme.spacing.contentPadding}

## Colors
bg: ${theme.colors.bg} | panel: ${theme.colors.panel} | tint: ${theme.colors.tint}
primary: ${theme.colors.primary} (hover: ${theme.colors.primaryHover}) | on-primary: ${theme.colors.primaryText}
ink: ${theme.colors.ink} | ink2: ${theme.colors.ink2} | ink3: ${theme.colors.ink3}
rule: ${theme.colors.rule}
accents: ${theme.colors.accent1} · ${theme.colors.accent2} · ${theme.colors.accent3} · ${theme.colors.accent4} · ${theme.colors.accent5}
alert: ${theme.colors.alert} | warn: ${theme.colors.warn} | ok: ${theme.colors.ok}
navBg: ${theme.colors.navBg} | navText: ${theme.colors.navText} | navActive: ${theme.colors.navActiveText} on ${theme.colors.navActiveBg}
headerBg: ${theme.colors.headerBg} | headerText: ${theme.colors.headerText}
${theme.colors.buttonGradient ? `buttonGradient: ${theme.colors.buttonGradient}` : ''}
${theme.colors.buttonGlow     ? `buttonGlow: ${theme.colors.buttonGlow}` : ''}

## Typography
sans: ${theme.typography.fontSans}
serif: ${theme.typography.fontSerif}
mono: ${theme.typography.fontMono}
headingFont: ${theme.typography.headingFont} | base: ${theme.typography.base}

## Components
button: style=${theme.components.button.style} radius=${theme.components.button.radius} weight=${theme.components.button.fontWeight}
card: style=${theme.components.card.style} radius=${theme.components.card.radius}
table: style=${theme.components.table.style} headerBg=${theme.components.table.headerBg}
form: style=${theme.components.form.style} radius=${theme.components.form.radius}
nav: style=${theme.components.nav.style} itemRadius=${theme.components.nav.itemRadius}
badge: style=${theme.components.badge.style}
stat: valueFontSize=${theme.components.stat.valueFontSize}

## Radii & Shadows
sm:${theme.borders.radius.sm} md:${theme.borders.radius.md} lg:${theme.borders.radius.lg} xl:${theme.borders.radius.xl}
shadow-sm: ${theme.shadows.sm}
shadow-md: ${theme.shadows.md}
shadow-lg: ${theme.shadows.lg}

## Brand
name: ${theme.brand.name} | tagline: ${theme.brand.tagline}
stripeColors: ${theme.brand.stripeColors.join(', ')} | stripeHeight: ${theme.brand.stripeHeight}px

## Rules — follow for every page
1. Never hardcode colors — use tokens above only
2. Render brand stripe at top of every page (height: ${theme.brand.stripeHeight}px, gradient: stripeColors)
3. Place logo at /public/logo.png — brand.logo is intentionally empty
4. Primary buttons: use buttonGradient + buttonGlow
5. Glass cards: backdropFilter blur(12px) + border 1px solid rule
6. Table headers: always use components.table.headerBg
7. Animations: use duration.base (${theme.animations.duration.base}) + easing.ease
8. Save chosen theme to localStorage key: jisl_active_theme`;
}

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
.logo{font-size:22px;font-weight:700;color:${c.ink};margin-bottom:4px}
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
  <label>Email</label><input type="email" placeholder="you@example.com">
  <label>Password</label><input type="password" placeholder="••••••••">
  <button class="btn">Sign In</button>
  <div class="link">Don't have an account? <a href="#">Sign Up</a></div>
</div>
</body></html>`;
}

function buildDashboardHTML(theme: Theme): string {
  const c = theme.colors;
  const cp = theme.components;
  const isLeft = theme.layout.navPosition === 'left';
  const navItems = ['Dashboard', 'Analytics', 'Reports', 'Settings', 'Users'];
  const stats = [
    { label: 'Total Revenue', value: '₹24.5L', change: '+12%', up: true },
    { label: 'Active Users',  value: '8,421',  change: '+5%',  up: true },
    { label: 'Pending Tasks', value: '143',     change: '-3%',  up: false },
    { label: 'Completed',     value: '1,920',   change: '+18%', up: true },
  ];
  const rows = [
    ['Ramesh Jain',   'Senior Manager', 'Active',   '₹85,000'],
    ['Priya Shah',    'Analyst',        'Active',   '₹62,000'],
    ['Arjun Patel',   'Developer',      'On Leave', '₹74,000'],
    ['Sunita Verma',  'Designer',       'Active',   '₹58,000'],
    ['Vikram Nair',   'Team Lead',      'Active',   '₹91,000'],
  ];

  const navHtml = navItems.map((item, i) => `
    <div style="padding:${cp.nav.itemPadding};border-radius:${cp.nav.itemRadius};background:${i===0?c.navActiveBg:'transparent'};color:${i===0?c.navActiveText:c.navText};font-size:${cp.nav.fontSize};cursor:pointer;margin-bottom:4px">${item}</div>
  `).join('');

  const topNavHtml = navItems.map((item, i) => `
    <div style="padding:8px 16px;border-radius:${cp.nav.itemRadius};background:${i===0?c.navActiveBg:'transparent'};color:${i===0?c.navActiveText:c.navText};font-size:${cp.nav.fontSize};cursor:pointer">${item}</div>
  `).join('');

  const statHtml = stats.map(s => `
    <div style="background:${c.panel};border:1px solid ${c.rule};border-radius:${cp.stat.radius};padding:20px;flex:1;min-width:140px">
      <div style="font-size:11px;color:${c.ink3};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">${s.label}</div>
      <div style="font-size:${cp.stat.valueFontSize};font-weight:700;color:${c.ink};margin-bottom:4px">${s.value}</div>
      <div style="font-size:12px;color:${s.up?c.ok:c.alert}">${s.change}</div>
    </div>`).join('');

  const rowHtml = rows.map((r, i) => `
    <tr>
      ${r.map(cell => `<td style="padding:${cp.table.cellPaddingY} ${cp.table.cellPaddingX};font-size:${cp.table.fontSize};color:${c.ink};border-bottom:1px solid ${cp.table.borderColor};background:${i%2===1?cp.table.stripeColor:'transparent'}">${cell}</td>`).join('')}
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${theme.brand.name} — Dashboard</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:${c.bg};font-family:${theme.typography.fontSans};min-height:100vh}</style>
</head>
<body>
<div style="height:${theme.brand.stripeHeight}px;background:linear-gradient(90deg,${theme.brand.stripeColors.join(',')})"></div>
<div style="background:${c.headerBg};border-bottom:1px solid ${c.rule};padding:0 24px;height:${theme.spacing.headerHeight};display:flex;align-items:center;justify-content:space-between">
  <div style="font-size:16px;font-weight:700;color:${c.ink}">${theme.brand.name}</div>
  ${!isLeft ? `<div style="display:flex;gap:4px">${topNavHtml}</div>` : ''}
  <div style="width:32px;height:32px;border-radius:50%;background:${c.primary};display:flex;align-items:center;justify-content:center;color:${c.primaryText};font-size:13px;font-weight:700">JD</div>
</div>
<div style="display:flex;flex:1">
  ${isLeft ? `<div style="width:${theme.layout.sidebarWidth};background:${c.navBg};border-right:1px solid ${c.rule};padding:16px;min-height:calc(100vh - ${theme.spacing.headerHeight})">${navHtml}</div>` : ''}
  <div style="flex:1;padding:24px">
    ${!isLeft ? `<div style="display:flex;gap:4px;margin-bottom:20px;border-bottom:1px solid ${c.rule};padding-bottom:12px">${topNavHtml}</div>` : ''}
    <div style="font-size:20px;font-weight:700;color:${c.ink};margin-bottom:20px">Dashboard Overview</div>
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px">${statHtml}</div>
    <div style="background:${c.panel};border:1px solid ${c.rule};border-radius:${cp.card.radius};overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        <thead><tr>${['Name','Role','Status','Salary'].map(h=>`<th style="background:${cp.table.headerBg};padding:${cp.table.cellPaddingY} ${cp.table.cellPaddingX};font-size:${cp.table.headerFontSize};color:${c.ink3};text-align:left;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid ${cp.table.borderColor}">${h}</th>`).join('')}</tr></thead>
        <tbody>${rowHtml}</tbody>
      </table>
    </div>
  </div>
</div>
</body></html>`;
}
