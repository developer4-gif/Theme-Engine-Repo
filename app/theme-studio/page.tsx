'use client';

import React, { useState, useCallback } from 'react';
import { useTheme } from '../theme-engine/theme-provider/ThemeContext';
import { THEME_CATEGORIES, isDarkTheme } from '../theme-engine/theme-registry';
import { ThemePreviewCard, ThemeFullPreview } from '../theme-engine/theme-preview/ThemePreviewCard';
import { exportThemeAsJSON, exportAllThemes, exportThemeAsCSS, copyClaudePromptToClipboard, generateClaudePrompt, duplicateTheme } from '../theme-engine/theme-builder/ThemeExport';
import type { Theme } from '../theme-engine/types';

type CategoryId = 'all' | 'corporate' | 'healthcare' | 'industrial' | 'tech' | 'luxury' | 'minimal' | 'government' | 'startup';

export default function ThemeStudioPage() {
  const { theme, themes, setTheme, activeId } = useTheme();
  const c = theme.colors;

  const [category, setCategory] = useState<CategoryId>('all');
  const [search, setSearch] = useState('');
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptTheme, setPromptTheme] = useState<Theme | null>(null);
  const [extraThemes, setExtraThemes] = useState<Theme[]>([]);

  const allThemes = [...themes, ...extraThemes];

  const filtered = allThemes.filter(t => {
    const matchCat = category === 'all' || t.category === category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleExport = useCallback((t: Theme) => exportThemeAsJSON(t), []);
  const handleCSSExport = useCallback((t: Theme) => exportThemeAsCSS(t), []);

  const handleCopyPrompt = useCallback(async (t: Theme) => {
    const ok = await copyClaudePromptToClipboard(t);
    if (ok) { setCopied(t.id); setTimeout(() => setCopied(null), 2500); }
  }, []);

  const handleDuplicate = useCallback((t: Theme) => {
    const dup = duplicateTheme(t);
    setExtraThemes(prev => [dup, ...prev]);
  }, []);

  const openPromptModal = (t: Theme) => { setPromptTheme(t); setShowPromptModal(true); };

  const darkCount = allThemes.filter(t => isDarkTheme(t)).length;
  const lightCount = allThemes.length - darkCount;

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: theme.typography.fontSans, color: c.ink }}>

      {/* Brand stripe */}
      <div style={{ display: 'flex', height: theme.brand.stripeHeight }}>
        {theme.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
      </div>

      {/* Header */}
      <div style={{ background: c.headerBg, borderBottom: `1px solid ${c.headerBorder}`, padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: theme.borders.radius.sm, background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: c.primaryText, fontFamily: theme.typography.fontMono }}>T</div>
          <div style={{ width: 1, height: 32, background: c.rule }} />
          <div>
            <div style={{ fontFamily: theme.typography.fontMono, fontSize: 10, color: c.ink3, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase' }}>JISL Theme Engine</div>
            <div style={{ fontFamily: theme.typography.fontSerif, fontSize: 22, fontWeight: 600, color: c.ink, letterSpacing: '-0.3px' }}>Theme Studio</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: c.ink3 }}>{allThemes.length} themes · {darkCount} dark · {lightCount} light</span>
          <button onClick={() => exportAllThemes(allThemes)} style={{ padding: '8px 14px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, color: c.ink2, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
            Export All JSON
          </button>
          <a href="/" style={{ padding: '8px 14px', background: c.primary, color: c.primaryText, border: 0, borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← Back to App
          </a>
        </div>
      </div>

      {/* Active theme banner */}
      <div style={{ background: `${c.primary}10`, borderBottom: `1px solid ${c.rule}`, padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.ok, display: 'inline-block' }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: c.ink }}>Active theme: <strong>{theme.name}</strong></span>
          <span style={{ fontSize: 11, color: c.ink3 }}>· {theme.description}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => openPromptModal(theme)} style={{ padding: '6px 12px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, fontSize: 11, fontWeight: 600, cursor: 'pointer', color: c.ink2, display: 'flex', alignItems: 'center', gap: 6 }}>
            🤖 Generate Claude Prompt
          </button>
          <button onClick={() => handleExport(theme)} style={{ padding: '6px 12px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, fontSize: 11, cursor: 'pointer', color: c.ink3 }}>
            Export Active Theme
          </button>
        </div>
      </div>

      {/* Controls bar */}
      <div style={{ padding: '20px 40px', background: c.bgSecondary, borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: c.ink3, fontSize: 14 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search themes by name or tag…"
            style={{ width: '100%', padding: '9px 12px 9px 34px', border: `1px solid ${c.rule}`, borderRadius: theme.components.form.radius, background: c.panel, color: c.ink, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
          {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: c.ink3, fontSize: 16 }}>✕</button>}
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {THEME_CATEGORIES.map(cat => {
            const active = category === cat.id;
            const count = cat.id === 'all' ? allThemes.length : allThemes.filter(t => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as CategoryId)}
                style={{
                  padding: '6px 12px', borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: active ? 600 : 400, cursor: 'pointer', border: `1px solid ${active ? c.primary : c.rule}`,
                  background: active ? c.primary : c.panel, color: active ? c.primaryText : c.ink2,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                {cat.label}
                <span style={{ fontSize: 10, background: active ? `${c.primaryText}30` : c.tint, color: active ? c.primaryText : c.ink3, borderRadius: 9999, padding: '1px 6px', fontWeight: 600 }}>{count}</span>
              </button>
            );
          })}
        </div>

        <div style={{ marginLeft: 'auto', fontSize: 12, color: c.ink3 }}>
          Showing {filtered.length} of {allThemes.length} themes
        </div>
      </div>

      {/* Theme grid */}
      <div style={{ padding: '28px 40px 60px', maxWidth: 1600, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: c.ink3 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎨</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: c.ink2 }}>No themes match your search</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Try a different keyword or category</div>
            <button onClick={() => { setSearch(''); setCategory('all'); }} style={{ marginTop: 16, padding: '8px 16px', background: c.primary, color: c.primaryText, border: 0, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {filtered.map(t => (
              <ThemePreviewCard
                key={t.id}
                theme={t}
                isActive={t.id === activeId}
                onApply={() => setTheme(t.id)}
                onExport={() => handleExport(t)}
                onDuplicate={() => handleDuplicate(t)}
                onPreview={() => setPreviewTheme(t)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full theme preview overlay */}
      {previewTheme && <ThemeFullPreview theme={previewTheme} close={() => setPreviewTheme(null)} />}

      {/* Claude Prompt Modal */}
      {showPromptModal && promptTheme && (
        <ClaudePromptModal
          theme={promptTheme}
          onClose={() => setShowPromptModal(false)}
          onCopy={() => handleCopyPrompt(promptTheme)}
          copied={copied === promptTheme.id}
        />
      )}
    </div>
  );
}

// ─── Claude Prompt Modal ────────────────────────────────────────────────────

function ClaudePromptModal({ theme: t, onClose, onCopy, copied }: { theme: Theme; onClose: () => void; onCopy: () => void; copied: boolean }) {
  const { theme } = useTheme();
  const c = theme.colors;
  const prompt = generateClaudePrompt(t);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.panel, borderRadius: theme.components.modal.radius, width: '100%', maxWidth: 800, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: theme.shadows.xl }}>
        {/* Header */}
        <div style={{ display: 'flex', height: theme.brand.stripeHeight }}>
          {theme.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
        </div>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: theme.typography.fontMono, fontSize: 10, color: c.ink3, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase' }}>Claude Code Prompt Generator</div>
            <div style={{ fontFamily: theme.typography.fontSerif, fontSize: 18, fontWeight: 600, color: c.ink }}>🤖 Theme: {t.name}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onCopy} style={{ padding: '8px 16px', background: copied ? c.ok : c.primary, color: '#fff', border: 0, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
              {copied ? '✓ Copied!' : '📋 Copy Prompt'}
            </button>
            <button onClick={onClose} style={{ padding: '8px 12px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, cursor: 'pointer', color: c.ink3, fontSize: 13 }}>✕</button>
          </div>
        </div>

        {/* Prompt content */}
        <div style={{ overflow: 'auto', flex: 1 }}>
          <div style={{ padding: '12px 24px', background: c.tint, borderBottom: `1px solid ${c.rule}`, fontSize: 12, color: c.ink2 }}>
            Copy this prompt and paste it into a new Claude Code session to build all future pages in the <strong>{t.name}</strong> theme.
          </div>
          <pre style={{ margin: 0, padding: '20px 24px', fontFamily: theme.typography.fontMono, fontSize: 12, color: c.ink2, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowX: 'hidden', background: c.bgSecondary }}>
            {prompt}
          </pre>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 24px', borderTop: `1px solid ${c.rule}`, display: 'flex', gap: 8, justifyContent: 'flex-end', background: c.panel }}>
          <button onClick={() => { exportThemeAsJSON(t); }} style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, color: c.ink2 }}>Export JSON</button>
          <button onClick={() => { exportThemeAsCSS(t); }} style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, color: c.ink2 }}>Export CSS</button>
          <button onClick={onCopy} style={{ padding: '7px 16px', background: copied ? c.ok : c.primary, color: '#fff', border: 0, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {copied ? '✓ Copied to Clipboard' : '📋 Copy Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
}
