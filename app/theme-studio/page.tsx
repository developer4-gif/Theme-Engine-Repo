'use client';

import React, { useState, useCallback } from 'react';
import { useTheme } from '../theme-engine/theme-provider/ThemeContext';
import { THEME_CATEGORIES, isDarkTheme } from '../theme-engine/theme-registry';
import { ThemePreviewCard, ThemeFullPreview } from '../theme-engine/theme-preview/ThemePreviewCard';
import { exportThemeAsJSON, exportAllThemes, exportThemeAsCSS, copyClaudePromptToClipboard, generateClaudePrompt, duplicateTheme } from '../theme-engine/theme-builder/ThemeExport';
import type { Theme } from '../theme-engine/types';

type ViewMode = 'web' | 'mobile';

// Mobile categories — productivity, health, finance, education, medical, navigation, social
const MOBILE_CATS = ['productivity', 'health', 'finance', 'education', 'medical', 'navigation', 'social', 'healthcare'];

export default function ThemeStudioPage() {
  const { theme, themes, setTheme, activeId } = useTheme();
  const c = theme.colors;

  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptTheme, setPromptTheme] = useState<Theme | null>(null);
  const [androidPreviewTheme, setAndroidPreviewTheme] = useState<Theme | null>(null);
  const [extraThemes, setExtraThemes] = useState<Theme[]>([]);

  const allThemes = [...themes, ...extraThemes];

  // Split web vs mobile themes
  const webThemes = allThemes.filter(t => !MOBILE_CATS.includes(t.category));
  const mobileThemes = allThemes.filter(t => MOBILE_CATS.includes(t.category));
  const activePool = viewMode === 'web' ? webThemes : mobileThemes;

  // Category tabs for current mode
  const webCats = THEME_CATEGORIES.filter(c => !MOBILE_CATS.includes(c.id) && c.id !== 'all');
  const mobileCats = THEME_CATEGORIES.filter(c => MOBILE_CATS.includes(c.id));
  const activeCats = viewMode === 'web' ? webCats : mobileCats;

  const filtered = activePool.filter(t => {
    const matchCat = category === 'all' || t.category === category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleExport = useCallback((t: Theme) => exportThemeAsJSON(t), []);

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

  // Reset category when switching modes
  const switchMode = (mode: ViewMode) => {
    setViewMode(mode);
    setCategory('all');
    setSearch('');
  };

  return (
    <div style={{ minHeight: '100vh', background: c.bg, fontFamily: theme.typography.fontSans, color: c.ink }}>

      {/* Brand stripe */}
      <div style={{ display: 'flex', height: theme.brand.stripeHeight }}>
        {theme.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
      </div>

      {/* Header */}
      <div style={{ background: c.headerBg, borderBottom: `1px solid ${c.headerBorder}`, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: theme.borders.radius.sm, background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: c.primaryText, fontFamily: theme.typography.fontMono }}>T</div>
          <div style={{ width: 1, height: 32, background: c.rule }} />
          <div>
            <div style={{ fontFamily: theme.typography.fontMono, fontSize: 10, color: c.ink3, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase' }}>JISL Theme Engine</div>
            <div style={{ fontFamily: theme.typography.fontSerif, fontSize: 20, fontWeight: 600, color: c.ink, letterSpacing: '-0.3px' }}>Theme Studio</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: c.ink3 }}>{allThemes.length} themes · {darkCount} dark · {lightCount} light</span>
          <button onClick={() => exportAllThemes(allThemes)} style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, color: c.ink2, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>Export All JSON</button>
          <a href="/" style={{ padding: '7px 14px', background: c.primary, color: c.primaryText, border: 0, borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>← Back</a>
        </div>
      </div>

      {/* Web / Mobile Toggle */}
      <div style={{ background: c.bgSecondary, borderBottom: `1px solid ${c.rule}`, padding: '0 40px', display: 'flex', alignItems: 'center', gap: 0 }}>
        {(['web', 'mobile'] as ViewMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => switchMode(mode)}
            style={{
              padding: '14px 28px',
              background: 'transparent',
              border: 'none',
              borderBottom: viewMode === mode ? `2px solid ${c.primary}` : '2px solid transparent',
              color: viewMode === mode ? c.primary : c.ink3,
              fontWeight: viewMode === mode ? 700 : 400,
              fontSize: 13,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s ease',
            }}
          >
            {mode === 'web' ? (
              <><span>🖥</span> Browser / Web Themes <span style={{ fontSize: 11, background: c.tint, color: c.ink3, padding: '2px 7px', borderRadius: 999, fontWeight: 600 }}>{webThemes.length}</span></>
            ) : (
              <><span>📱</span> Android / Mobile Themes <span style={{ fontSize: 11, background: viewMode === 'mobile' ? `${c.primary}22` : c.tint, color: viewMode === 'mobile' ? c.primary : c.ink3, padding: '2px 7px', borderRadius: 999, fontWeight: 600 }}>{mobileThemes.length}</span></>
            )}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', padding: '12px 0', fontSize: 12, color: c.ink3 }}>
          {viewMode === 'mobile' ? '📱 Preview themes on Android phone frame' : '🖥 Desktop-first enterprise themes'}
        </div>
      </div>

      {/* Active theme banner */}
      <div style={{ background: `${c.primary}10`, borderBottom: `1px solid ${c.rule}`, padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.ok, display: 'inline-block' }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: c.ink }}>Active: <strong>{theme.name}</strong></span>
          <span style={{ fontSize: 11, color: c.ink3 }}>· {theme.description}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => openPromptModal(theme)} style={{ padding: '6px 12px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, fontSize: 11, fontWeight: 600, cursor: 'pointer', color: c.ink2 }}>
            🤖 Claude Prompt
          </button>
          <button onClick={() => handleExport(theme)} style={{ padding: '6px 12px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, fontSize: 11, cursor: 'pointer', color: c.ink3 }}>
            Export JSON
          </button>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: '16px 40px', background: c.bgSecondary, borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: c.ink3, fontSize: 13 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${viewMode === 'mobile' ? 'mobile' : 'web'} themes…`}
            style={{ width: '100%', padding: '8px 10px 8px 30px', border: `1px solid ${c.rule}`, borderRadius: theme.components.form.radius, background: c.panel, color: c.ink, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: c.ink3 }}>✕</button>}
        </div>

        {/* All button */}
        <button onClick={() => setCategory('all')}
          style={{ padding: '6px 12px', borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: category === 'all' ? 600 : 400, cursor: 'pointer', border: `1px solid ${category === 'all' ? c.primary : c.rule}`, background: category === 'all' ? c.primary : c.panel, color: category === 'all' ? c.primaryText : c.ink2, display: 'flex', alignItems: 'center', gap: 5 }}>
          All <span style={{ fontSize: 10, background: category === 'all' ? `${c.primaryText}30` : c.tint, color: category === 'all' ? c.primaryText : c.ink3, borderRadius: 9999, padding: '1px 6px', fontWeight: 600 }}>{activePool.length}</span>
        </button>

        {activeCats.map(cat => {
          const active = category === cat.id;
          const count = activePool.filter(t => t.category === cat.id).length;
          if (count === 0) return null;
          return (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              style={{ padding: '6px 12px', borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: active ? 600 : 400, cursor: 'pointer', border: `1px solid ${active ? c.primary : c.rule}`, background: active ? c.primary : c.panel, color: active ? c.primaryText : c.ink2, display: 'flex', alignItems: 'center', gap: 5 }}>
              {cat.label}
              <span style={{ fontSize: 10, background: active ? `${c.primaryText}30` : c.tint, color: active ? c.primaryText : c.ink3, borderRadius: 9999, padding: '1px 6px', fontWeight: 600 }}>{count}</span>
            </button>
          );
        })}

        <div style={{ marginLeft: 'auto', fontSize: 12, color: c.ink3 }}>Showing {filtered.length} of {activePool.length}</div>
      </div>

      {/* Mobile mode hint banner */}
      {viewMode === 'mobile' && (
        <div style={{ padding: '10px 40px', background: `${c.primary}08`, borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>📱</span>
          <div>
            <span style={{ fontSize: 12, fontWeight: 600, color: c.ink2 }}>Android App Themes</span>
            <span style={{ fontSize: 12, color: c.ink3, marginLeft: 8 }}>Click "Try on Android" to preview any theme on a real phone frame. Export JSON to use in your app.</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ padding: '24px 40px 60px', maxWidth: 1600, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: c.ink3 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{viewMode === 'mobile' ? '📱' : '🎨'}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: c.ink2 }}>No themes match</div>
            <button onClick={() => { setSearch(''); setCategory('all'); }} style={{ marginTop: 16, padding: '8px 16px', background: c.primary, color: c.primaryText, border: 0, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Clear Filters</button>
          </div>
        ) : viewMode === 'mobile' ? (
          /* ─── MOBILE GRID — card + android preview side by side ─── */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filtered.map(t => (
              <MobileThemeCard
                key={t.id}
                theme={t}
                isActive={t.id === activeId}
                onApply={() => setTheme(t.id)}
                onExport={() => handleExport(t)}
                onPreview={() => setAndroidPreviewTheme(t)}
                onCopyPrompt={() => openPromptModal(t)}
              />
            ))}
          </div>
        ) : (
          /* ─── WEB GRID ─── */
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

      {/* Android Preview Modal */}
      {androidPreviewTheme && (
        <AndroidPreviewModal
          theme={androidPreviewTheme}
          onClose={() => setAndroidPreviewTheme(null)}
          onApply={() => { setTheme(androidPreviewTheme.id); setAndroidPreviewTheme(null); }}
          onExport={() => handleExport(androidPreviewTheme)}
          onCopyPrompt={() => openPromptModal(androidPreviewTheme)}
        />
      )}

      {/* Web Full preview */}
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

// ─── Mobile Theme Card ──────────────────────────────────────────────────────

function MobileThemeCard({ theme: t, isActive, onApply, onExport, onPreview, onCopyPrompt }: {
  theme: Theme; isActive: boolean; onApply: () => void; onExport: () => void; onPreview: () => void; onCopyPrompt: () => void;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const tc = t.colors;
  const isDark = (t.colors.bg.startsWith('#') && parseInt(t.colors.bg.slice(1, 3), 16) < 100);

  return (
    <div style={{ background: c.panel, border: `1px solid ${isActive ? c.primary : c.rule}`, borderRadius: 12, overflow: 'hidden', boxShadow: isActive ? `0 0 0 2px ${c.primary}` : '0 1px 6px rgba(0,0,0,0.08)' }}>
      {/* Mini Android phone preview */}
      <div style={{ background: tc.bg, padding: '12px', position: 'relative', minHeight: 200 }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
          <span style={{ fontSize: 9, color: tc.ink3, fontFamily: 'monospace' }}>9:41</span>
          <div style={{ display: 'flex', gap: 3 }}>
            {['▌▌▌', '●', '▮'].map((s, i) => <span key={i} style={{ fontSize: 8, color: tc.ink3 }}>{s}</span>)}
          </div>
        </div>

        {/* Top app bar */}
        <div style={{ background: tc.headerBg, padding: '10px 12px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: tc.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, color: tc.primaryText, fontWeight: 800 }}>A</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: tc.headerText, flex: 1 }}>{t.name}</span>
          <div style={{ width: 24, height: 24, borderRadius: 4, background: `${tc.ink}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, color: tc.ink2 }}>⋮</span>
          </div>
        </div>

        {/* Content area */}
        <div style={{ background: tc.bgSecondary, padding: '8px', borderRadius: '0 0 8px 8px' }}>
          {/* Stat row */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {[tc.primary, tc.accent1, tc.accent2].map((col, i) => (
              <div key={i} style={{ flex: 1, background: tc.panel, border: `1px solid ${tc.rule}`, borderRadius: 6, padding: '6px 8px', borderTop: `2px solid ${col}` }}>
                <div style={{ fontSize: 9, color: tc.ink3, marginBottom: 2 }}>Stat {i + 1}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: tc.ink, fontFamily: 'monospace' }}>{['1.2k', '84%', '₹4.2L'][i]}</div>
              </div>
            ))}
          </div>

          {/* List items */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{ background: tc.panel, border: `1px solid ${tc.rule}`, borderRadius: 6, padding: '7px 10px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: [tc.primary, tc.accent2, tc.accent3][i], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12 }}>{['💊', '📊', '📋'][i]}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: tc.ink }}>Item {i + 1}</div>
                <div style={{ fontSize: 9, color: tc.ink3 }}>Description text</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: tc.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 8, color: tc.primaryText }}>›</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav bar */}
        <div style={{ background: tc.navBg, borderTop: `1px solid ${tc.rule}`, padding: '8px 4px 4px', display: 'flex', justifyContent: 'space-around', borderRadius: '0 0 8px 8px', marginTop: 2 }}>
          {['🏠', '🔍', '➕', '🔔', '👤'].map((icon, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px', borderRadius: 6, background: i === 0 ? `${tc.primary}20` : 'transparent' }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <div style={{ width: i === 0 ? 16 : 0, height: 2, background: tc.primary, borderRadius: 1 }} />
            </div>
          ))}
        </div>

        {/* Active badge */}
        {isActive && (
          <div style={{ position: 'absolute', top: 8, right: 8, background: c.ok, color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 9999, letterSpacing: 0.5 }}>ACTIVE</div>
        )}
      </div>

      {/* Card footer */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.ink }}>{t.name}</div>
            <div style={{ fontSize: 11, color: c.ink3, marginTop: 2 }}>{t.category} · {isDark ? '🌙 Dark' : '☀️ Light'}</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[t.colors.primary, t.colors.accent1, t.colors.accent2, t.colors.accent3].map((col, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: col, border: `1px solid ${c.rule}` }} />
            ))}
          </div>
        </div>

        <div style={{ fontSize: 11, color: c.ink3, marginBottom: 10, lineHeight: 1.5 }}>{t.description.slice(0, 80)}{t.description.length > 80 ? '…' : ''}</div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {t.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{ fontSize: 9, padding: '2px 6px', background: c.tint, color: c.ink3, borderRadius: 9999, fontWeight: 500 }}>{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={onApply} style={{ flex: 1, padding: '8px', background: isActive ? c.ok : c.primary, color: isActive ? '#fff' : c.primaryText, border: 0, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {isActive ? '✓ Applied' : 'Apply'}
          </button>
          <button onClick={onPreview} style={{ padding: '8px 10px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: 8, fontSize: 12, cursor: 'pointer', color: c.ink2, fontWeight: 600 }} title="Try on Android">
            📱
          </button>
          <button onClick={onExport} style={{ padding: '8px 10px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: 8, fontSize: 12, cursor: 'pointer', color: c.ink2 }} title="Export JSON">
            ↓
          </button>
          <button onClick={onCopyPrompt} style={{ padding: '8px 10px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: 8, fontSize: 12, cursor: 'pointer', color: c.ink2 }} title="Copy Claude Prompt">
            🤖
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Android Preview Modal ──────────────────────────────────────────────────

function AndroidPreviewModal({ theme: t, onClose, onApply, onExport, onCopyPrompt }: {
  theme: Theme; onClose: () => void; onApply: () => void; onExport: () => void; onCopyPrompt: () => void;
}) {
  const { theme } = useTheme();
  const c = theme.colors;
  const tc = t.colors;
  const [activeTab, setActiveTab] = useState(0);

  const screens = [
    { label: 'Home', icon: '🏠' },
    { label: 'List', icon: '📋' },
    { label: 'Detail', icon: '📊' },
    { label: 'Profile', icon: '👤' },
  ];

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.panel, borderRadius: 16, width: '100%', maxWidth: 900, maxHeight: '95vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>

        {/* Modal header */}
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.headerBg }}>
          <div>
            <div style={{ fontSize: 10, color: c.ink3, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase', fontFamily: theme.typography.fontMono }}>Android Preview</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: c.ink }}>{t.name} <span style={{ fontSize: 12, color: c.ink3, fontWeight: 400 }}>· {t.category}</span></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onCopyPrompt} style={{ padding: '8px 14px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: 8, fontSize: 12, cursor: 'pointer', color: c.ink2, fontWeight: 600 }}>🤖 Claude Prompt</button>
            <button onClick={onExport} style={{ padding: '8px 14px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: 8, fontSize: 12, cursor: 'pointer', color: c.ink2 }}>↓ Export JSON</button>
            <button onClick={onApply} style={{ padding: '8px 16px', background: c.primary, color: c.primaryText, border: 0, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontWeight: 700 }}>Apply Theme</button>
            <button onClick={onClose} style={{ padding: '8px 12px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: 8, cursor: 'pointer', color: c.ink3, fontSize: 14 }}>✕</button>
          </div>
        </div>

        {/* Content: phone + JSON side by side */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

          {/* Left: Android phone frame */}
          <div style={{ width: 360, flexShrink: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: c.bgSecondary, borderRight: `1px solid ${c.rule}` }}>

            {/* Screen tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: c.tint, borderRadius: 8, padding: 3 }}>
              {screens.map((s, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '5px 10px', borderRadius: 6, border: 'none', background: activeTab === i ? tc.primary : 'transparent', color: activeTab === i ? tc.primaryText : c.ink3, fontSize: 11, fontWeight: activeTab === i ? 600 : 400, cursor: 'pointer' }}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            {/* Phone frame */}
            <div style={{
              width: 270,
              background: '#1A1A1A',
              borderRadius: 36,
              padding: '10px 6px',
              boxShadow: '0 0 0 2px #333, 0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px #444',
              position: 'relative',
            }}>
              {/* Camera notch */}
              <div style={{ width: 80, height: 22, background: '#1A1A1A', borderRadius: '0 0 16px 16px', margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2A2A2A', border: '1px solid #333' }} />
                <div style={{ width: 40, height: 4, borderRadius: 2, background: '#2A2A2A' }} />
              </div>

              {/* Screen content */}
              <div style={{ background: tc.bg, borderRadius: 22, overflow: 'hidden', minHeight: 480 }}>
                {/* Status bar */}
                <div style={{ background: tc.headerBg, padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 9, color: tc.headerText, fontWeight: 600 }}>9:41</span>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    <span style={{ fontSize: 8, color: tc.headerText }}>●●●</span>
                    <span style={{ fontSize: 8, color: tc.headerText }}>WiFi</span>
                    <span style={{ fontSize: 8, color: tc.headerText }}>100%</span>
                  </div>
                </div>

                {activeTab === 0 && <AndroidHomeScreen t={t} />}
                {activeTab === 1 && <AndroidListScreen t={t} />}
                {activeTab === 2 && <AndroidDetailScreen t={t} />}
                {activeTab === 3 && <AndroidProfileScreen t={t} />}

                {/* Bottom nav */}
                <div style={{ background: tc.navBg, borderTop: `1px solid ${tc.rule}`, padding: '8px 0 12px', display: 'flex', justifyContent: 'space-around' }}>
                  {['🏠', '🔍', '➕', '🔔', '👤'].map((icon, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      {i === activeTab && <div style={{ width: 18, height: 2, background: tc.primary, borderRadius: 1 }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Home indicator */}
              <div style={{ width: 80, height: 4, background: '#444', borderRadius: 2, margin: '8px auto 0' }} />
            </div>

            {/* Color palette */}
            <div style={{ marginTop: 16, display: 'flex', gap: 6 }}>
              {[tc.primary, tc.accent1, tc.accent2, tc.accent3, tc.accent4, tc.accent5].map((col, i) => (
                <div key={i} title={col} style={{ width: 28, height: 28, borderRadius: 6, background: col, border: `1px solid ${c.rule}`, cursor: 'pointer' }} />
              ))}
            </div>
          </div>

          {/* Right: JSON token viewer */}
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${c.rule}`, background: c.bgSecondary }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.ink2 }}>Theme JSON — ready to import</div>
              <div style={{ fontSize: 11, color: c.ink3, marginTop: 2 }}>Copy this JSON and use it directly in your Android/React Native app</div>
            </div>
            <pre style={{ margin: 0, padding: '16px 20px', fontFamily: theme.typography.fontMono, fontSize: 11, color: c.ink2, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: c.bgSecondary, flex: 1, overflow: 'auto' }}>
              {JSON.stringify({
                id: t.id,
                name: t.name,
                description: t.description,
                category: t.category,
                colors: t.colors,
                typography: t.typography,
                spacing: t.spacing,
                borders: t.borders,
                shadows: t.shadows,
                components: t.components,
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Android Screens ────────────────────────────────────────────────────────

function AndroidHomeScreen({ t }: { t: Theme }) {
  const tc = t.colors;
  return (
    <div style={{ background: tc.bg, padding: '12px 10px' }}>
      {/* Top app bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 9, color: tc.ink3 }}>Good morning</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: tc.ink }}>Dashboard</div>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: tc.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, color: tc.primaryText, fontWeight: 700 }}>U</span>
        </div>
      </div>

      {/* Hero card */}
      <div style={{ background: tc.primary, borderRadius: 12, padding: '14px', marginBottom: 10, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: 9, color: `${tc.primaryText}99`, marginBottom: 2 }}>Total Balance</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: tc.primaryText, fontFamily: 'monospace' }}>₹84,200</div>
        <div style={{ fontSize: 9, color: `${tc.primaryText}80`, marginTop: 4 }}>↑ 12.4% this month</div>
        <div style={{ position: 'absolute', right: -10, top: -10, width: 60, height: 60, borderRadius: '50%', background: `${tc.primaryText}10` }} />
      </div>

      {/* Quick stats */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {[
          { label: 'Income', val: '₹12k', col: tc.ok },
          { label: 'Spend', val: '₹4.2k', col: tc.alert },
          { label: 'Saved', val: '₹8k', col: tc.accent2 },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: tc.panel, borderRadius: 8, padding: '8px 6px', borderTop: `2px solid ${s.col}` }}>
            <div style={{ fontSize: 8, color: tc.ink3 }}>{s.label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: tc.ink, fontFamily: 'monospace' }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Recent list */}
      <div style={{ fontSize: 10, fontWeight: 600, color: tc.ink3, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Recent</div>
      {['Transaction 1', 'Transaction 2', 'Transaction 3'].map((item, i) => (
        <div key={i} style={{ background: tc.panel, borderRadius: 8, padding: '8px 10px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${tc.rule}` }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: [tc.primary, tc.accent2, tc.accent3][i] }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: tc.ink }}>{item}</div>
            <div style={{ fontSize: 9, color: tc.ink3 }}>Today</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: i === 1 ? tc.alert : tc.ok }}>
            {i === 1 ? '-₹500' : '+₹1.2k'}
          </div>
        </div>
      ))}
    </div>
  );
}

function AndroidListScreen({ t }: { t: Theme }) {
  const tc = t.colors;
  return (
    <div style={{ background: tc.bg, padding: '12px 10px' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: tc.ink, marginBottom: 10 }}>All Items</div>
      {/* Search bar */}
      <div style={{ background: tc.panel, border: `1px solid ${tc.rule}`, borderRadius: 8, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: tc.ink3 }}>🔍</span>
        <span style={{ fontSize: 10, color: tc.ink3 }}>Search…</span>
      </div>
      {/* List */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ background: tc.panel, border: `1px solid ${tc.rule}`, borderRadius: 8, padding: '10px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: [tc.primary, tc.accent1, tc.accent2, tc.accent3, tc.accent4, tc.accent5][i], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 16 }}>{'💊📋📊🔬🏥💉'[i]}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: tc.ink }}>Item {i + 1}</div>
            <div style={{ fontSize: 9, color: tc.ink3 }}>Category · Updated just now</div>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: i < 2 ? tc.ok : tc.ink3 }} />
        </div>
      ))}
    </div>
  );
}

function AndroidDetailScreen({ t }: { t: Theme }) {
  const tc = t.colors;
  return (
    <div style={{ background: tc.bg }}>
      {/* Hero */}
      <div style={{ background: tc.primary, padding: '16px 12px 20px' }}>
        <div style={{ fontSize: 9, color: `${tc.primaryText}80` }}>Detail View</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: tc.primaryText }}>Item Name</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {['Active', 'Verified'].map((l, i) => (
            <span key={i} style={{ fontSize: 9, padding: '2px 8px', background: `${tc.primaryText}20`, color: tc.primaryText, borderRadius: 9999 }}>{l}</span>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${tc.rule}` }}>
        {['42', '8.4k', '99%'].map((v, i) => (
          <div key={i} style={{ flex: 1, padding: '10px 8px', textAlign: 'center', borderRight: i < 2 ? `1px solid ${tc.rule}` : 'none' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: tc.primary, fontFamily: 'monospace' }}>{v}</div>
            <div style={{ fontSize: 8, color: tc.ink3 }}>{'Items Sessions Score'.split(' ')[i]}</div>
          </div>
        ))}
      </div>
      {/* Content */}
      <div style={{ padding: '10px' }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ padding: '8px 0', borderBottom: `1px solid ${tc.rule}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: tc.ink3 }}>{'Field Label Description'.split(' ')[i]}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: tc.ink }}>Value {i + 1}</span>
          </div>
        ))}
        <button style={{ width: '100%', marginTop: 12, padding: '10px', background: tc.primary, color: tc.primaryText, border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          Primary Action
        </button>
      </div>
    </div>
  );
}

function AndroidProfileScreen({ t }: { t: Theme }) {
  const tc = t.colors;
  return (
    <div style={{ background: tc.bg, padding: '0 0 10px' }}>
      {/* Profile header */}
      <div style={{ background: tc.headerBg, padding: '16px 12px', textAlign: 'center', borderBottom: `1px solid ${tc.rule}` }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: tc.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', border: `3px solid ${tc.accent1}` }}>
          <span style={{ fontSize: 22, color: tc.primaryText, fontWeight: 800 }}>U</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: tc.ink }}>User Name</div>
        <div style={{ fontSize: 10, color: tc.ink3 }}>user@email.com</div>
      </div>
      {/* Settings list */}
      <div style={{ padding: '10px' }}>
        {['Account Settings', 'Notifications', 'Privacy & Security', 'Help & Support', 'Sign Out'].map((item, i) => (
          <div key={i} style={{ background: tc.panel, border: `1px solid ${tc.rule}`, borderRadius: 8, padding: '10px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: i === 4 ? tc.alert : tc.ink, fontWeight: i === 4 ? 600 : 400 }}>{item}</span>
            <span style={{ fontSize: 12, color: tc.ink3 }}>›</span>
          </div>
        ))}
      </div>
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
        <div style={{ display: 'flex', height: theme.brand.stripeHeight }}>
          {theme.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
        </div>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: theme.typography.fontMono, fontSize: 10, color: c.ink3, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase' }}>Claude Code Prompt</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: c.ink }}>🤖 {t.name}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onCopy} style={{ padding: '8px 16px', background: copied ? c.ok : c.primary, color: '#fff', border: 0, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
              {copied ? '✓ Copied!' : '📋 Copy Prompt'}
            </button>
            <button onClick={onClose} style={{ padding: '8px 12px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, cursor: 'pointer', color: c.ink3 }}>✕</button>
          </div>
        </div>
        <div style={{ padding: '10px 24px', background: c.tint, borderBottom: `1px solid ${c.rule}`, fontSize: 12, color: c.ink2 }}>
          Paste this into Claude Code to build pages using the <strong>{t.name}</strong> theme tokens.
        </div>
        <pre style={{ margin: 0, padding: '20px 24px', fontFamily: theme.typography.fontMono, fontSize: 12, color: c.ink2, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: c.bgSecondary, flex: 1, overflow: 'auto' }}>
          {prompt}
        </pre>
        <div style={{ padding: '12px 24px', borderTop: `1px solid ${c.rule}`, display: 'flex', gap: 8, justifyContent: 'flex-end', background: c.panel }}>
          <button onClick={() => exportThemeAsJSON(t)} style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, color: c.ink2 }}>Export JSON</button>
          <button onClick={() => exportThemeAsCSS(t)} style={{ padding: '7px 14px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, color: c.ink2 }}>Export CSS</button>
          <button onClick={onCopy} style={{ padding: '7px 16px', background: copied ? c.ok : c.primary, color: '#fff', border: 0, borderRadius: theme.components.button.radius, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {copied ? '✓ Copied' : '📋 Copy Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
}
