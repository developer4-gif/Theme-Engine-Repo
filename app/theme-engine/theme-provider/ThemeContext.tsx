'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Theme } from '../types';
import { getDefaultTheme, getTheme, THEME_REGISTRY } from '../theme-registry';

const STORAGE_KEY = 'jisl_active_theme';

interface ThemeContextValue {
  theme: Theme;
  themes: Theme[];
  setTheme: (id: string) => void;
  resetTheme: () => void;
  isDark: boolean;
  activeId: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>(getDefaultTheme().id);
  const [theme, setThemeObj] = useState<Theme>(getDefaultTheme());

  // On mount: load persisted theme from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = getTheme(saved);
        setActiveId(found.id);
        setThemeObj(found);
      }
    } catch {}
  }, []);

  // Apply CSS variables to :root whenever theme changes
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const setTheme = useCallback((id: string) => {
    const found = getTheme(id);
    setActiveId(found.id);
    setThemeObj(found);
    try { localStorage.setItem(STORAGE_KEY, found.id); } catch {}
  }, []);

  const resetTheme = useCallback(() => {
    const def = getDefaultTheme();
    setActiveId(def.id);
    setThemeObj(def);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  const isDark = isColorDark(theme.colors.bg);

  return (
    <ThemeContext.Provider value={{ theme, themes: THEME_REGISTRY, setTheme, resetTheme, isDark, activeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// ─── DOM injection ──────────────────────────────────────────────────────────

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;

  // Colors
  const c = theme.colors;
  root.style.setProperty('--bg', c.bg);
  root.style.setProperty('--bg-secondary', c.bgSecondary);
  root.style.setProperty('--bg-tertiary', c.bgTertiary);
  root.style.setProperty('--panel', c.panel);
  root.style.setProperty('--panel-secondary', c.panelSecondary);
  root.style.setProperty('--tint', c.tint);
  root.style.setProperty('--ink', c.ink);
  root.style.setProperty('--ink2', c.ink2);
  root.style.setProperty('--ink3', c.ink3);
  root.style.setProperty('--rule', c.rule);
  root.style.setProperty('--rule-strong', c.ruleStrong);
  root.style.setProperty('--primary', c.primary);
  root.style.setProperty('--primary-hover', c.primaryHover);
  root.style.setProperty('--primary-text', c.primaryText);
  root.style.setProperty('--accent1', c.accent1);
  root.style.setProperty('--accent2', c.accent2);
  root.style.setProperty('--accent3', c.accent3);
  root.style.setProperty('--accent4', c.accent4);
  root.style.setProperty('--accent5', c.accent5);
  root.style.setProperty('--color-alert', c.alert);
  root.style.setProperty('--color-warn', c.warn);
  root.style.setProperty('--color-ok', c.ok);
  root.style.setProperty('--color-info', c.info);
  root.style.setProperty('--nav-bg', c.navBg);
  root.style.setProperty('--nav-text', c.navText);
  root.style.setProperty('--nav-active-text', c.navActiveText);
  root.style.setProperty('--nav-active-bg', c.navActiveBg);
  root.style.setProperty('--nav-active-border', c.navActiveBorder);
  root.style.setProperty('--header-bg', c.headerBg);
  root.style.setProperty('--header-text', c.headerText);
  root.style.setProperty('--header-border', c.headerBorder);

  // Typography
  const t = theme.typography;
  root.style.setProperty('--font-sans', t.fontSans);
  root.style.setProperty('--font-serif', t.fontSerif);
  root.style.setProperty('--font-mono', t.fontMono);

  // Borders
  const br = theme.borders.radius;
  root.style.setProperty('--radius-sm', br.sm);
  root.style.setProperty('--radius-md', br.md);
  root.style.setProperty('--radius-lg', br.lg);
  root.style.setProperty('--radius-xl', br.xl);
  root.style.setProperty('--radius-full', br.full);

  // Shadows
  const sh = theme.shadows;
  root.style.setProperty('--shadow-sm', sh.sm);
  root.style.setProperty('--shadow-md', sh.md);
  root.style.setProperty('--shadow-lg', sh.lg);
  root.style.setProperty('--shadow-xl', sh.xl);

  // Components
  root.style.setProperty('--btn-radius', theme.components.button.radius);
  root.style.setProperty('--card-radius', theme.components.card.radius);
  root.style.setProperty('--card-shadow', theme.components.card.shadow);
  root.style.setProperty('--nav-item-radius', theme.components.nav.itemRadius);

  // Layout
  root.style.setProperty('--sidebar-width', theme.layout.sidebarWidth);
  root.style.setProperty('--nav-height', theme.spacing.navHeight);
  root.style.setProperty('--header-height', theme.spacing.headerHeight);
  root.style.setProperty('--content-max', theme.layout.contentMaxWidth);
  root.style.setProperty('--content-padding', theme.spacing.contentPadding);
}

function isColorDark(color: string): boolean {
  if (!color.startsWith('#')) return false;
  const hex = color.slice(1);
  if (hex.length < 6) return false;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.4;
}
