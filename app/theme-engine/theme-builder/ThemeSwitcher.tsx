'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../theme-provider/ThemeContext';
import { isDarkTheme } from '../theme-registry';
import Link from 'next/link';

export function ThemeSwitcher() {
  const { theme, themes, setTheme, activeId } = useTheme();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const c = theme.colors;
  const filtered = themes.filter(t => !q || t.name.toLowerCase().includes(q.toLowerCase()) || t.category.includes(q.toLowerCase()));

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '7px 12px', background: 'transparent', border: `1px solid ${c.rule}`,
          borderRadius: theme.components.button.radius, color: c.ink2, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: theme.typography.fontSans,
        }}
      >
        {/* Theme color swatch */}
        <div style={{ display: 'flex', gap: 2 }}>
          {[c.primary, c.accent1, c.accent2, c.accent3].map((col, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: col }} />
          ))}
        </div>
        <span style={{ fontWeight: 500 }}>{theme.name}</span>
        <span style={{ color: c.ink3 }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 4, zIndex: 200,
          background: c.panel, border: `1px solid ${c.rule}`, borderRadius: theme.components.card.radius,
          boxShadow: theme.shadows.lg, width: 280, overflow: 'hidden',
        }}>
          {/* Search */}
          <div style={{ padding: '10px 12px', borderBottom: `1px solid ${c.rule}` }}>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search themes…"
              autoFocus
              style={{ width: '100%', padding: '6px 10px', border: `1px solid ${c.rule}`, borderRadius: theme.components.form.radius, background: c.tint, color: c.ink, fontSize: 12, outline: 'none', fontFamily: theme.typography.fontSans, boxSizing: 'border-box' }}
            />
          </div>

          {/* Theme list */}
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {filtered.map(t => {
              const active = t.id === activeId;
              return (
                <div
                  key={t.id}
                  onClick={() => { setTheme(t.id); setOpen(false); setQ(''); }}
                  style={{
                    padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                    background: active ? `${c.primary}12` : 'transparent', borderLeft: active ? `2px solid ${c.primary}` : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = c.tint; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {/* Color swatches */}
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    {[t.colors.primary, t.colors.accent1, t.colors.accent2, t.colors.navBg].map((col, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: col }} />
                    ))}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: active ? c.primary : c.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: c.ink3, textTransform: 'capitalize' }}>{t.category}</div>
                  </div>
                  {active && <span style={{ fontSize: 12, color: c.primary }}>✓</span>}
                  {isDarkTheme(t) && <span style={{ fontSize: 9, padding: '1px 4px', background: '#1A1A2E', color: '#A0A8C0', borderRadius: 2, fontWeight: 600 }}>DARK</span>}
                </div>
              );
            })}
          </div>

          {/* Footer: link to Theme Studio */}
          <div style={{ padding: '8px 12px', borderTop: `1px solid ${c.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: c.ink3 }}>{themes.length} themes available</span>
            <Link href="/theme-studio" onClick={() => setOpen(false)} style={{ fontSize: 11, color: c.primary, textDecoration: 'none', fontWeight: 600 }}>
              Open Theme Studio →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
