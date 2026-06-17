import type { Theme, ClaudePromptConfig } from '../types';

// Export a theme as downloadable JSON
export function exportThemeAsJSON(theme: Theme): void {
  const json = JSON.stringify(theme, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `theme-${theme.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Export all themes as a ZIP-like JSON bundle
export function exportAllThemes(themes: Theme[]): void {
  const bundle = {
    exportedAt: new Date().toISOString(),
    engine: 'Theme Engine v2.0',
    count: themes.length,
    themes,
  };
  const json = JSON.stringify(bundle, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `jisl-all-themes-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Export theme as CSS custom properties
export function exportThemeAsCSS(theme: Theme): void {
  const lines: string[] = [
    `/* JISL Theme Engine — ${theme.name} */`,
    `/* Generated: ${new Date().toISOString()} */`,
    '',
    ':root {',
  ];

  const c = theme.colors;
  lines.push(`  /* Colors */`);
  lines.push(`  --color-bg: ${c.bg};`);
  lines.push(`  --color-bg-secondary: ${c.bgSecondary};`);
  lines.push(`  --color-bg-tertiary: ${c.bgTertiary};`);
  lines.push(`  --color-panel: ${c.panel};`);
  lines.push(`  --color-panel-secondary: ${c.panelSecondary};`);
  lines.push(`  --color-tint: ${c.tint};`);
  lines.push(`  --color-ink: ${c.ink};`);
  lines.push(`  --color-ink2: ${c.ink2};`);
  lines.push(`  --color-ink3: ${c.ink3};`);
  lines.push(`  --color-rule: ${c.rule};`);
  lines.push(`  --color-primary: ${c.primary};`);
  lines.push(`  --color-primary-hover: ${c.primaryHover};`);
  lines.push(`  --color-primary-text: ${c.primaryText};`);
  lines.push(`  --color-accent1: ${c.accent1};`);
  lines.push(`  --color-accent2: ${c.accent2};`);
  lines.push(`  --color-accent3: ${c.accent3};`);
  lines.push(`  --color-accent4: ${c.accent4};`);
  lines.push(`  --color-accent5: ${c.accent5};`);
  lines.push(`  --color-alert: ${c.alert};`);
  lines.push(`  --color-warn: ${c.warn};`);
  lines.push(`  --color-ok: ${c.ok};`);
  lines.push(`  --color-nav-bg: ${c.navBg};`);
  lines.push(`  --color-nav-text: ${c.navText};`);
  lines.push(`  --color-nav-active: ${c.navActiveText};`);
  lines.push(`  --color-header-bg: ${c.headerBg};`);
  lines.push(``);

  const t = theme.typography;
  lines.push(`  /* Typography */`);
  lines.push(`  --font-sans: ${t.fontSans};`);
  lines.push(`  --font-serif: ${t.fontSerif};`);
  lines.push(`  --font-mono: ${t.fontMono};`);
  lines.push(``);

  const br = theme.borders.radius;
  lines.push(`  /* Border Radius */`);
  lines.push(`  --radius-sm: ${br.sm};`);
  lines.push(`  --radius-md: ${br.md};`);
  lines.push(`  --radius-lg: ${br.lg};`);
  lines.push(`  --radius-xl: ${br.xl};`);
  lines.push(`  --radius-full: ${br.full};`);
  lines.push(``);

  const sh = theme.shadows;
  lines.push(`  /* Shadows */`);
  lines.push(`  --shadow-sm: ${sh.sm};`);
  lines.push(`  --shadow-md: ${sh.md};`);
  lines.push(`  --shadow-lg: ${sh.lg};`);
  lines.push(`  --shadow-xl: ${sh.xl};`);
  lines.push(``);

  const cp = theme.components;
  lines.push(`  /* Component Tokens */`);
  lines.push(`  --btn-radius: ${cp.button.radius};`);
  lines.push(`  --btn-padding: ${cp.button.paddingY} ${cp.button.paddingX};`);
  lines.push(`  --card-radius: ${cp.card.radius};`);
  lines.push(`  --card-shadow: ${cp.card.shadow};`);
  lines.push(`  --nav-height: ${theme.spacing.navHeight};`);
  lines.push(`  --header-height: ${theme.spacing.headerHeight};`);
  lines.push(`  --sidebar-width: ${theme.layout.sidebarWidth};`);
  lines.push(`}`);

  const css = lines.join('\n');
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `theme-${theme.id}.css`;
  a.click();
  URL.revokeObjectURL(url);
}

// Generate Claude Code prompt for building pages with this theme
export function generateClaudePrompt(theme: Theme): string {
  const nav = theme.layout.navPosition === 'left' ? 'Left Sidebar'
    : theme.layout.navPosition === 'right' ? 'Right Sidebar'
    : theme.layout.navPosition === 'both' ? 'Hybrid (Top + Left Sidebar)'
    : 'Top Navigation';

  const prompt = `Build all future pages using the selected JISL theme:

## Theme Configuration

**Theme Name:** ${theme.name}
**Theme ID:** ${theme.id}
**Category:** ${theme.category}
**Description:** ${theme.description}

## Layout

- Navigation Pattern: ${nav}
- Layout Variant: ${theme.layout.variant}
- Sidebar Width: ${theme.layout.sidebarWidth}
- Header Sticky: ${theme.layout.headerSticky}
- Content Max Width: ${theme.layout.contentMaxWidth}
- Content Padding: ${theme.spacing.contentPadding}

## Colors

- Background: ${theme.colors.bg}
- Panel: ${theme.colors.panel}
- Tint: ${theme.colors.tint}
- Primary: ${theme.colors.primary} (hover: ${theme.colors.primaryHover})
- Primary Text: ${theme.colors.primaryText}
- Ink (primary text): ${theme.colors.ink}
- Ink2 (secondary text): ${theme.colors.ink2}
- Ink3 (muted text): ${theme.colors.ink3}
- Rule (border): ${theme.colors.rule}
- Alert: ${theme.colors.alert}
- Warning: ${theme.colors.warn}
- Success: ${theme.colors.ok}
- Accent 1: ${theme.colors.accent1}
- Accent 2: ${theme.colors.accent2}
- Accent 3: ${theme.colors.accent3}
- Accent 4: ${theme.colors.accent4}
- Nav Background: ${theme.colors.navBg}
- Nav Text: ${theme.colors.navText}
- Nav Active: ${theme.colors.navActiveText} on ${theme.colors.navActiveBg}
- Nav Active Border/Indicator: ${theme.colors.navActiveBorder}

## Typography

- Primary Font (Sans): ${theme.typography.fontSans}
- Heading Font (Serif): ${theme.typography.fontSerif}
- Code Font (Mono): ${theme.typography.fontMono}
- Heading Style: ${theme.typography.headingFont}
- Base Font Size: ${theme.typography.base}

## Component Styles

- Button Style: ${theme.components.button.style} (radius: ${theme.components.button.radius}, weight: ${theme.components.button.fontWeight}, transform: ${theme.components.button.textTransform})
- Card Style: ${theme.components.card.style} (radius: ${theme.components.card.radius}, shadow: ${theme.components.card.shadow})
- Table Style: ${theme.components.table.style}
- Form Style: ${theme.components.form.style}
- Badge Style: ${theme.components.badge.style}
- Modal Style: ${theme.components.modal.style}
- Nav Item Style: ${theme.components.nav.style}

## Border & Shadow Tokens

- Border Radius (sm/md/lg): ${theme.borders.radius.sm} / ${theme.borders.radius.md} / ${theme.borders.radius.lg}
- Shadow (sm/md/lg): ${theme.shadows.sm}

## Brand Identity

- Organization: ${theme.brand.name}
- Tagline: ${theme.brand.tagline}
- Logo: ${theme.brand.logo}
- Brand Stripe Colors: ${theme.brand.stripeColors.join(', ')}
- Brand Stripe Height: ${theme.brand.stripeHeight}px

## Implementation Instructions

1. Use \`useTheme()\` hook from \`@/app/theme-engine/theme-provider/ThemeContext\` to access all tokens
2. Never hardcode colors — always reference \`theme.colors.*\`
3. Always render the BrandStripe at the top of headers: \`theme.brand.stripeColors\` as flex divs
4. **Logo:** Replace \`theme.brand.logo\` with your own logo path. Each theme ships without a logo so you can adapt it — place your logo at \`/public/logo.png\` (or \`/public/logo-white.png\` for dark themes) and reference it as \`/logo.png\`. The theme's \`brand.logo\` field is intentionally empty — fill it with your asset.
5. Apply button styles using \`theme.components.button\` tokens (style, radius, gradient, glow)
6. Apply card styles using \`theme.components.card\` tokens (glass = backdropFilter, neon = glow border)
7. Apply table header background from \`theme.components.table.headerBg\`
8. Font families from \`theme.typography.fontSans/fontSerif/fontMono\`
9. All animations should use \`theme.animations.duration.base\` and \`theme.animations.easing.ease\`
10. Persist theme selection in localStorage with key \`jisl_active_theme\`
11. For sidebar layout themes (\`navPosition: 'left'\`): render icon-only sidebar when \`sidebarStyle === 'minimal-icon'\`
12. For top-nav themes: use \`navBarStyle\` — pills get pill-shaped tabs, underline gets bottom border, floating gets elevated panel

## Example Component Pattern

\`\`\`tsx
const { theme } = useTheme();
const c = theme.colors;

<div style={{
  background: c.panel,
  border: \`1px solid \${c.rule}\`,
  borderRadius: theme.components.card.radius,
  padding: 20,
}}>
  <h1 style={{ fontFamily: theme.typography.fontSerif, color: c.ink }}>
    Page Title
  </h1>
</div>
\`\`\``;

  return prompt;
}

// Copy Claude prompt to clipboard
export async function copyClaudePromptToClipboard(theme: Theme): Promise<boolean> {
  const prompt = generateClaudePrompt(theme);
  try {
    await navigator.clipboard.writeText(prompt);
    return true;
  } catch {
    // Fallback: textarea trick
    const ta = document.createElement('textarea');
    ta.value = prompt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  }
}

// Duplicate a theme with a new ID
export function duplicateTheme(theme: Theme, newName?: string): Theme {
  const name = newName ?? `${theme.name} (Copy)`;
  return {
    ...theme,
    id: `${theme.id}-copy-${Date.now()}`,
    name,
    meta: { ...theme.meta, isDefault: false, isCustom: true, updatedAt: new Date().toISOString().slice(0, 10) },
  };
}

// Build theme config summary for display
export function getThemeSummary(theme: Theme): ClaudePromptConfig {
  const navLabel = theme.layout.navPosition === 'left' ? 'Left Sidebar'
    : theme.layout.navPosition === 'right' ? 'Right Sidebar'
    : theme.layout.navPosition === 'both' ? 'Hybrid'
    : 'Top Navigation';

  return {
    themeId: theme.id,
    themeName: theme.name,
    navigation: navLabel,
    primaryColor: theme.colors.primary,
    secondaryColor: theme.colors.accent1,
    buttonStyle: theme.components.button.style,
    cardStyle: theme.components.card.style,
    tableStyle: theme.components.table.style,
    fontFamily: theme.typography.fontSans,
    layoutVariant: theme.layout.variant,
    borderRadius: theme.borders.radius.md,
    category: theme.category,
  };
}
