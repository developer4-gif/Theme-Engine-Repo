'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './theme-engine/theme-provider/ThemeContext';
import { ThemeSwitcher } from './theme-engine/theme-builder/ThemeSwitcher';
import { THEME_REGISTRY } from './theme-engine/theme-registry';

export default function Home() {
  const { theme } = useTheme();
  const c = theme.colors;

  const features = [
    { icon: '🎨', title: '25 Theme Variants', desc: 'Navy Enterprise, Dark Executive, Luxury Black Gold, Soft Glass, Government Portal and 20+ more — all production-ready.' },
    { icon: '⚡', title: 'Instant Apply', desc: 'Click any theme and it applies globally with no reload. Persisted in localStorage across sessions.' },
    { icon: '🏗️', title: 'Design Tokens', desc: 'Colors, typography, spacing, borders, shadows, animations — every value is a typed token, not a magic string.' },
    { icon: '📐', title: 'Layout Variants', desc: 'Top Nav, Left Sidebar, Right Sidebar, Hybrid, Dashboard, Enterprise, Minimal — configurable per theme.' },
    { icon: '🤖', title: 'Claude Prompt Generator', desc: 'One click generates a complete Claude Code prompt with all theme tokens for building future pages.' },
    { icon: '📦', title: 'Export System', desc: 'Export any theme as JSON or CSS custom properties. Export all 25 themes as a bundle.' },
  ];

  const themeCategories = [
    { cat: 'corporate', label: 'Corporate', color: c.accent4, count: THEME_REGISTRY.filter(t => t.category === 'corporate').length },
    { cat: 'healthcare', label: 'Healthcare', color: c.accent3, count: THEME_REGISTRY.filter(t => t.category === 'healthcare').length },
    { cat: 'industrial', label: 'Industrial', color: c.accent2, count: THEME_REGISTRY.filter(t => t.category === 'industrial').length },
    { cat: 'tech', label: 'Technology', color: '#7B68EE', count: THEME_REGISTRY.filter(t => t.category === 'tech').length },
    { cat: 'luxury', label: 'Luxury', color: '#D4AF37', count: THEME_REGISTRY.filter(t => t.category === 'luxury').length },
    { cat: 'minimal', label: 'Minimal', color: c.ink3, count: THEME_REGISTRY.filter(t => t.category === 'minimal').length },
    { cat: 'government', label: 'Government', color: '#138808', count: THEME_REGISTRY.filter(t => t.category === 'government').length },
    { cat: 'startup', label: 'Startup', color: '#16A34A', count: THEME_REGISTRY.filter(t => t.category === 'startup').length },
  ];

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: theme.typography.fontSans, color: c.ink }}>

      {/* Brand stripe */}
      <div style={{ display: 'flex', height: theme.brand.stripeHeight }}>
        {theme.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
      </div>

      {/* Header */}
      <div style={{ background: c.headerBg, borderBottom: `1px solid ${c.headerBorder}`, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: theme.borders.radius.sm, background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: c.primaryText, fontFamily: theme.typography.fontMono }}>T</div>
          <div style={{ width: 1, height: 32, background: c.rule }} />
          <div>
            <div style={{ fontFamily: theme.typography.fontMono, fontSize: 10, color: c.ink3, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase' }}>JAIN IRRIGATION SYSTEMS LTD · JALGAON</div>
            <div style={{ fontFamily: theme.typography.fontSerif, fontSize: 20, fontWeight: 600, color: c.headerText, letterSpacing: '-0.3px' }}>Theme Engine</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <ThemeSwitcher />
          <Link href="/theme-studio" style={{ padding: '9px 16px', background: c.primary, color: c.primaryText, borderRadius: theme.components.button.radius, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            🎨 Open Theme Studio
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 40px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: theme.borders.radius.lg, background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, color: c.primaryText, fontFamily: theme.typography.fontMono, margin: '0 auto 24px', boxShadow: c.buttonGlow ?? theme.shadows.lg }}>T</div>

        <div style={{ fontFamily: theme.typography.fontMono, fontSize: 11, color: c.ink3, letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase', marginBottom: 12 }}>Enterprise Theme System</div>
        <h1 style={{ fontFamily: theme.typography.fontSerif, fontSize: 52, fontWeight: 700, color: c.ink, letterSpacing: '-1.5px', lineHeight: 1.08, marginBottom: 20 }}>
          Theme Engine<br />
          <span style={{ color: c.primary }}>& Studio</span>
        </h1>
        <p style={{ fontSize: 18, color: c.ink2, maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.65 }}>
          25+ enterprise-grade themes with complete design token systems. Apply any theme globally, preview before committing, and generate Claude Code prompts automatically.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/theme-studio" style={{ padding: '13px 28px', background: c.primary, color: c.primaryText, borderRadius: theme.components.button.radius, fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            🎨 Browse Themes ({THEME_REGISTRY.length}+)
          </Link>
          <Link href="/theme-studio" style={{ padding: '13px 28px', background: 'transparent', color: c.ink, border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>
            View Documentation →
          </Link>
        </div>
      </div>

      {/* Active theme showcase */}
      <div style={{ background: `${c.primary}08`, borderTop: `1px solid ${c.rule}`, borderBottom: `1px solid ${c.rule}`, padding: '20px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: theme.typography.fontMono, fontSize: 10, color: c.ink3, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase' }}>Current Theme</div>
          <div style={{ fontWeight: 600, fontSize: 15, color: c.ink }}>{theme.name}</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[c.primary, c.accent1, c.accent2, c.accent3, c.accent4, c.accent5].map((col, i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: theme.borders.radius.sm, background: col, border: `1px solid ${c.rule}` }} />
            ))}
          </div>
          <div style={{ fontSize: 12, color: c.ink3 }}>{theme.description}</div>
          <div style={{ marginLeft: 'auto' }}>
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 40px' }}>
        <div style={{ fontFamily: theme.typography.fontMono, fontSize: 11, color: c.ink3, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>What's Included</div>
        <h2 style={{ fontFamily: theme.typography.fontSerif, fontSize: 36, fontWeight: 600, color: c.ink, letterSpacing: '-0.8px', textAlign: 'center', marginBottom: 40 }}>Everything you need to ship</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: c.panel, border: `1px solid ${c.rule}`, borderRadius: theme.components.card.radius, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: theme.components.card.accentWidth, background: c.primary }} />
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, color: c.ink, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: c.ink2, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme categories */}
      <div style={{ background: c.panel, borderTop: `1px solid ${c.rule}`, borderBottom: `1px solid ${c.rule}`, padding: '60px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: theme.typography.fontMono, fontSize: 11, color: c.ink3, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>Theme Categories</div>
          <h2 style={{ fontFamily: theme.typography.fontSerif, fontSize: 36, fontWeight: 600, color: c.ink, letterSpacing: '-0.8px', textAlign: 'center', marginBottom: 40 }}>{THEME_REGISTRY.length} themes across 8 categories</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {themeCategories.map(cat => (
              <Link key={cat.cat} href={`/theme-studio`} style={{ textDecoration: 'none' }}>
                <div style={{ background: c.bg, border: `1px solid ${c.rule}`, borderRadius: theme.components.card.radius, padding: '18px 16px', textAlign: 'center', transition: 'all 0.15s ease', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color; (e.currentTarget as HTMLElement).style.background = c.tint; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.rule; (e.currentTarget as HTMLElement).style.background = c.bg; }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${cat.color}20`, border: `2px solid ${cat.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 22, fontWeight: 700, color: cat.color }}>
                    {cat.count}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: c.ink }}>{cat.label}</div>
                  <div style={{ fontSize: 11, color: c.ink3, marginTop: 2 }}>{cat.count} theme{cat.count !== 1 ? 's' : ''}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Theme preview strip */}
      <div style={{ padding: '60px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: theme.typography.fontMono, fontSize: 11, color: c.ink3, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>Quick Preview</div>
        <h2 style={{ fontFamily: theme.typography.fontSerif, fontSize: 36, fontWeight: 600, color: c.ink, letterSpacing: '-0.8px', textAlign: 'center', marginBottom: 40 }}>Sample themes</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {THEME_REGISTRY.slice(0, 10).map(t => (
            <div key={t.id} style={{ border: `1px solid ${c.rule}`, borderRadius: 8, overflow: 'hidden', background: c.panel }}>
              {/* Mini stripe */}
              <div style={{ display: 'flex', height: t.brand.stripeHeight }}>
                {t.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
              </div>
              {/* Mini header */}
              <div style={{ padding: '6px 10px', background: t.colors.headerBg, borderBottom: `1px solid ${t.colors.headerBorder}` }}>
                <div style={{ width: '60%', height: 4, background: t.colors.ink3, borderRadius: 2, opacity: 0.4 }} />
              </div>
              {/* Color swatches */}
              <div style={{ padding: '8px 10px', background: t.colors.bg, display: 'flex', gap: 4 }}>
                {[t.colors.primary, t.colors.accent1, t.colors.accent2, t.colors.accent3, t.colors.navBg].map((col, i) => (
                  <div key={i} style={{ flex: 1, height: 16, borderRadius: 3, background: col }} />
                ))}
              </div>
              <div style={{ padding: '8px 10px', background: t.colors.panel }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.colors.ink, marginBottom: 2 }}>{t.name}</div>
                <div style={{ fontSize: 10, color: t.colors.ink3, textTransform: 'capitalize' }}>{t.category}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/theme-studio" style={{ padding: '13px 32px', background: c.primary, color: c.primaryText, borderRadius: theme.components.button.radius, fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            View All {THEME_REGISTRY.length} Themes →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${c.rule}`, padding: '20px 40px', background: c.panel }}>
        <div style={{ display: 'flex', height: 2, marginBottom: 16 }}>
          {theme.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontFamily: theme.typography.fontMono, fontSize: 10, color: c.ink3, letterSpacing: 1.5, fontWeight: 600 }}>JAIN IRRIGATION SYSTEMS LTD · JALGAON · THEME ENGINE v1.0</div>
            <div style={{ fontSize: 12, color: c.ink3, marginTop: 3 }}>Theme Engine & Studio · {THEME_REGISTRY.length} Themes Available</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/theme-studio" style={{ fontSize: 12, color: c.primary, textDecoration: 'none', fontWeight: 500 }}>Theme Studio</Link>
            <span style={{ color: c.rule }}>·</span>
            <span style={{ fontSize: 12, color: c.ink3 }}>Factory Act Compliant</span>
            <span style={{ color: c.rule }}>·</span>
            <span style={{ fontSize: 12, color: c.ink3 }}>ISO 45001</span>
          </div>
        </div>
      </div>
    </div>
  );
}
