import type { Theme } from '../types';

import obsidian from '../themes/obsidian';
import crystal from '../themes/crystal';
import enterprise from '../themes/enterprise';
import aurelius from '../themes/aurelius';
import pulse from '../themes/pulse';
import slate from '../themes/slate';
import forge from '../themes/forge';
import aurora from '../themes/aurora';
import vortex from '../themes/vortex';
import bioluminescent from '../themes/bioluminescent';

export const THEME_REGISTRY: Theme[] = [
  obsidian,
  crystal,
  enterprise,
  aurelius,
  pulse,
  slate,
  forge,
  aurora,
  vortex,
  bioluminescent,
];

export const THEME_MAP: Record<string, Theme> = Object.fromEntries(
  THEME_REGISTRY.map(t => [t.id, t])
);

export function getTheme(id: string): Theme {
  return THEME_MAP[id] ?? obsidian;
}

export function getDefaultTheme(): Theme {
  return THEME_REGISTRY.find(t => t.meta.isDefault) ?? obsidian;
}

export function getThemesByCategory(category: Theme['category']): Theme[] {
  return THEME_REGISTRY.filter(t => t.category === category);
}

export const THEME_CATEGORIES = [
  { id: 'all', label: 'All Themes' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'tech', label: 'Technology' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'startup', label: 'Startup' },
  { id: 'industrial', label: 'Industrial' },
] as const;

export function serializeTheme(theme: Theme): string {
  return JSON.stringify(theme, null, 2);
}

export function isDarkTheme(theme: Theme): boolean {
  const bg = theme.colors.bg;
  if (!bg.startsWith('#')) return false;
  const hex = bg.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.4;
}

export function themeToCSSVars(theme: Theme): string {
  const vars: string[] = [];
  Object.entries(theme.colors).forEach(([key, value]) => {
    vars.push(`  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`);
  });
  vars.push(`  --font-sans: ${theme.typography.fontSans};`);
  vars.push(`  --font-serif: ${theme.typography.fontSerif};`);
  vars.push(`  --font-mono: ${theme.typography.fontMono};`);
  return `:root {\n${vars.join('\n')}\n}`;
}

export default THEME_REGISTRY;
