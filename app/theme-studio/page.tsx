'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../theme-engine/theme-provider/ThemeContext';
import { THEME_CATEGORIES, isDarkTheme } from '../theme-engine/theme-registry';
import { ThemePreviewCard, ThemeFullPreview } from '../theme-engine/theme-preview/ThemePreviewCard';
import { exportThemeAsJSON, exportAllThemes, exportThemeAsCSS, copyClaudePromptToClipboard, generateClaudePrompt, duplicateTheme } from '../theme-engine/theme-builder/ThemeExport';
import type { Theme } from '../theme-engine/types';

type ViewMode = 'web' | 'mobile';

const MOBILE_CATS = ['productivity', 'health', 'finance', 'education', 'medical', 'navigation', 'social', 'healthcare'];

// ─── Reference Gallery types ────────────────────────────────────────────────

interface RefCategory {
  id: string;
  label: string;
  appCount: number;
  preview: string | null;
}

interface RefApp {
  id: string;
  name: string;
  developer: string;
  icon: string | null;
  preview: string | null;
  screenCount: number;
  screens: string[];
}

// ─── Category icon map ───────────────────────────────────────────────────────

const CAT_ICON: Record<string, string> = {
  finance: '💳',
  health: '❤️',
  'health-fitness': '🏃',
  fitness: '💪',
  medical: '🏥',
  education: '📚',
  productivity: '⚡',
  navigation: '🗺️',
  social: '💬',
  tech: '🤖',
  startup: '🚀',
  food: '🍔',
  travel: '✈️',
  shopping: '🛍️',
  music: '🎵',
  photography: '📷',
  news: '📰',
  weather: '⛅',
  games: '🎮',
  business: '💼',
  entertainment: '🎬',
  lifestyle: '🌿',
  dating: '💕',
  utilities: '🔧',
  reference: '📖',
  'smart-home': '🏠',
};

function getCatIcon(id: string): string {
  const lower = id.toLowerCase();
  for (const key of Object.keys(CAT_ICON)) {
    if (lower.includes(key)) return CAT_ICON[key];
  }
  return '📱';
}

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
  const [extraThemes, setExtraThemes] = useState<Theme[]>([]);

  const allThemes = [...themes, ...extraThemes];
  const webThemes = allThemes.filter(t => !MOBILE_CATS.includes(t.category));

  const webCats = THEME_CATEGORIES.filter(c => !MOBILE_CATS.includes(c.id) && c.id !== 'all');

  const filtered = webThemes.filter(t => {
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
              <><span>📱</span> Android Reference Gallery <span style={{ fontSize: 11, background: viewMode === 'mobile' ? `${c.primary}22` : c.tint, color: viewMode === 'mobile' ? c.primary : c.ink3, padding: '2px 7px', borderRadius: 999, fontWeight: 600 }}>References</span></>
            )}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', padding: '12px 0', fontSize: 12, color: c.ink3 }}>
          {viewMode === 'mobile' ? '📱 Browse app references for Android design inspiration' : '🖥 Desktop-first enterprise themes'}
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

      {/* ─── WEB MODE ─── */}
      {viewMode === 'web' && (
        <>
          {/* Controls */}
          <div style={{ padding: '16px 40px', background: c.bgSecondary, borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: c.ink3, fontSize: 13 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search web themes…"
                style={{ width: '100%', padding: '8px 10px 8px 30px', border: `1px solid ${c.rule}`, borderRadius: theme.components.form.radius, background: c.panel, color: c.ink, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: c.ink3 }}>✕</button>}
            </div>

            <button onClick={() => setCategory('all')}
              style={{ padding: '6px 12px', borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: category === 'all' ? 600 : 400, cursor: 'pointer', border: `1px solid ${category === 'all' ? c.primary : c.rule}`, background: category === 'all' ? c.primary : c.panel, color: category === 'all' ? c.primaryText : c.ink2, display: 'flex', alignItems: 'center', gap: 5 }}>
              All <span style={{ fontSize: 10, background: category === 'all' ? `${c.primaryText}30` : c.tint, color: category === 'all' ? c.primaryText : c.ink3, borderRadius: 9999, padding: '1px 6px', fontWeight: 600 }}>{webThemes.length}</span>
            </button>

            {webCats.map(cat => {
              const active = category === cat.id;
              const count = webThemes.filter(t => t.category === cat.id).length;
              if (count === 0) return null;
              return (
                <button key={cat.id} onClick={() => setCategory(cat.id)}
                  style={{ padding: '6px 12px', borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: active ? 600 : 400, cursor: 'pointer', border: `1px solid ${active ? c.primary : c.rule}`, background: active ? c.primary : c.panel, color: active ? c.primaryText : c.ink2, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {cat.label}
                  <span style={{ fontSize: 10, background: active ? `${c.primaryText}30` : c.tint, color: active ? c.primaryText : c.ink3, borderRadius: 9999, padding: '1px 6px', fontWeight: 600 }}>{count}</span>
                </button>
              );
            })}

            <div style={{ marginLeft: 'auto', fontSize: 12, color: c.ink3 }}>Showing {filtered.length} of {webThemes.length}</div>
          </div>

          {/* Web grid */}
          <div style={{ padding: '24px 40px 60px', maxWidth: 1600, margin: '0 auto' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: c.ink3 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎨</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: c.ink2 }}>No themes match</div>
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
        </>
      )}

      {/* ─── ANDROID REFERENCE GALLERY ─── */}
      {viewMode === 'mobile' && (
        <AndroidReferenceGallery themeColors={c} themeBorders={theme.borders} themeComponents={theme.components} />
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

// ─── Android Reference Gallery ───────────────────────────────────────────────

function AndroidReferenceGallery({ themeColors: c, themeBorders, themeComponents }: {
  themeColors: ReturnType<typeof useTheme>['theme']['colors'];
  themeBorders: ReturnType<typeof useTheme>['theme']['borders'];
  themeComponents: ReturnType<typeof useTheme>['theme']['components'];
}) {
  const [categories, setCategories] = useState<RefCategory[]>([]);
  const [selectedCat, setSelectedCat] = useState<RefCategory | null>(null);
  const [apps, setApps] = useState<RefApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<RefApp | null>(null);
  const [lightboxScreen, setLightboxScreen] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(false);
  const [catSearch, setCatSearch] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/references')
      .then(r => r.json())
      .then((data: RefCategory[]) => { setCategories(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openCategory = (cat: RefCategory) => {
    setSelectedCat(cat);
    setApps([]);
    setAppsLoading(true);
    fetch(`/api/references?category=${cat.id}`)
      .then(r => r.json())
      .then((data: RefApp[]) => { setApps(data); setAppsLoading(false); })
      .catch(() => setAppsLoading(false));
  };

  const openApp = (app: RefApp) => {
    setSelectedApp(app);
    if (app.screens.length > 0) { setLightboxScreen(app.screens[0]); setLightboxIdx(0); }
  };

  const lightboxNav = (dir: number) => {
    if (!selectedApp) return;
    const next = (lightboxIdx + dir + selectedApp.screens.length) % selectedApp.screens.length;
    setLightboxIdx(next);
    setLightboxScreen(selectedApp.screens[next]);
  };

  const handleDownload = async () => {
    setDownloading(true);
    const claudePrompt = `While building your own application, use this reference by providing your own images to put in the background.

These screenshots are design references only — they show layout patterns, color palettes, typography choices, and UI component arrangements from real apps in the ${selectedCat ? selectedCat.label : 'various'} category.

To use these references effectively:
1. Study the layout structure, spacing, and visual hierarchy
2. Replace all placeholder/reference images with your own branded images
3. Adapt the color palette to match your brand identity
4. Use the component patterns (cards, lists, navigation bars) as templates
5. Apply the active JISL theme tokens for consistent styling across your app

Do NOT copy any app content, logos, or copyrighted imagery — use only the structural layout patterns as inspiration.`;

    const element = document.createElement('a');
    const file = new Blob([claudePrompt], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `reference-prompt-${selectedCat ? selectedCat.id : 'all'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloading(false);
  };

  const filteredCats = categories.filter(cat =>
    !catSearch || cat.label.toLowerCase().includes(catSearch.toLowerCase())
  );

  // ── Breadcrumb ──────────────────────────────────────────────────────────────
  const breadcrumb = (
    <div style={{ padding: '12px 40px', background: c.bgSecondary, borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <button onClick={() => { setSelectedCat(null); setSelectedApp(null); }} style={{ background: 'none', border: 'none', color: c.primary, cursor: 'pointer', fontWeight: 600, padding: 0 }}>
        All Categories
      </button>
      {selectedCat && (
        <>
          <span style={{ color: c.ink3 }}>›</span>
          <button onClick={() => setSelectedApp(null)} style={{ background: 'none', border: 'none', color: selectedApp ? c.primary : c.ink, cursor: selectedApp ? 'pointer' : 'default', fontWeight: 600, padding: 0 }}>
            {getCatIcon(selectedCat.id)} {selectedCat.label}
          </button>
        </>
      )}
      {selectedApp && (
        <>
          <span style={{ color: c.ink3 }}>›</span>
          <span style={{ color: c.ink, fontWeight: 600 }}>{selectedApp.name}</span>
        </>
      )}
    </div>
  );

  // ── Info bar ────────────────────────────────────────────────────────────────
  const infoBar = (
    <div style={{ padding: '10px 40px', background: `${c.primary}08`, borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>📱</span>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: c.ink2 }}>Android App Reference Gallery</span>
          <span style={{ fontSize: 12, color: c.ink3, marginLeft: 8 }}>Browse real app screenshots for design inspiration. Download reference pack + Claude prompt.</span>
        </div>
      </div>
      <button
        onClick={handleDownload}
        disabled={downloading}
        style={{ padding: '8px 16px', background: c.primary, color: c.primaryText, border: 0, borderRadius: themeComponents.button.radius, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, opacity: downloading ? 0.7 : 1 }}
      >
        ⬇ Download Reference + Claude Prompt
      </button>
    </div>
  );

  // ── Category grid (home view) ────────────────────────────────────────────────
  if (!selectedCat) {
    return (
      <div>
        {infoBar}
        <div style={{ padding: '20px 40px', background: c.bgSecondary, borderBottom: `1px solid ${c.rule}` }}>
          <div style={{ position: 'relative', maxWidth: 400 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: c.ink3, fontSize: 13 }}>🔍</span>
            <input value={catSearch} onChange={e => setCatSearch(e.target.value)} placeholder="Search categories…"
              style={{ width: '100%', padding: '8px 10px 8px 30px', border: `1px solid ${c.rule}`, borderRadius: themeComponents.form.radius, background: c.panel, color: c.ink, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            {catSearch && <button onClick={() => setCatSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: c.ink3 }}>✕</button>}
          </div>
        </div>

        <div style={{ padding: '24px 40px 60px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: c.ink3 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              <div style={{ fontSize: 15 }}>Loading categories…</div>
            </div>
          ) : filteredCats.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: c.ink3 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div>No categories match "{catSearch}"</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
              {filteredCats.map(cat => (
                <CategoryCard key={cat.id} cat={cat} c={c} themeBorders={themeBorders} themeComponents={themeComponents} onClick={() => openCategory(cat)} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── App grid (category view) ─────────────────────────────────────────────────
  if (!selectedApp) {
    return (
      <div>
        {infoBar}
        {breadcrumb}
        <div style={{ padding: '24px 40px 60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: c.ink }}>{getCatIcon(selectedCat.id)} {selectedCat.label}</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: c.ink3 }}>{selectedCat.appCount} apps in this category</p>
            </div>
          </div>

          {appsLoading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: c.ink3 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              <div style={{ fontSize: 15 }}>Loading apps…</div>
            </div>
          ) : apps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: c.ink3 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
              <div>No apps with screenshots found</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {apps.map(app => (
                <AppCard key={app.id} app={app} c={c} themeBorders={themeBorders} themeComponents={themeComponents} onClick={() => openApp(app)} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── App detail / screenshot viewer ──────────────────────────────────────────
  return (
    <div>
      {infoBar}
      {breadcrumb}
      <div style={{ padding: '24px 40px 60px' }}>
        {/* App header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          {selectedApp.icon ? (
            <img src={selectedApp.icon} alt={selectedApp.name} style={{ width: 64, height: 64, borderRadius: 16, objectFit: 'cover', border: `1px solid ${c.rule}` }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: 16, background: c.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📱</div>
          )}
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: c.ink }}>{selectedApp.name}</h2>
            {selectedApp.developer && <p style={{ margin: '4px 0 0', fontSize: 13, color: c.ink3 }}>{selectedApp.developer}</p>}
            <p style={{ margin: '4px 0 0', fontSize: 12, color: c.ink3 }}>{selectedApp.screenCount} screenshots</p>
          </div>
        </div>

        {/* Screenshot grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {selectedApp.screens.map((src, idx) => (
            <button
              key={idx}
              onClick={() => { setLightboxScreen(src); setLightboxIdx(idx); }}
              style={{ background: 'none', border: `1px solid ${c.rule}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', padding: 0, transition: 'transform 0.15s', aspectRatio: '9/19.5' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img src={src} alt={`Screen ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxScreen && (
        <div
          onClick={() => setLightboxScreen(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400, padding: 20 }}
        >
          <button
            onClick={e => { e.stopPropagation(); lightboxNav(-1); }}
            style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: 48, height: 48, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >‹</button>

          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            {/* Phone frame around the screenshot */}
            <div style={{
              background: '#1A1A1A',
              borderRadius: 44,
              padding: '10px 6px',
              boxShadow: '0 0 0 2px #333, 0 30px 80px rgba(0,0,0,0.8), inset 0 0 0 1px #444',
              width: 320,
            }}>
              <div style={{ width: 80, height: 22, background: '#1A1A1A', borderRadius: '0 0 16px 16px', margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2A2A2A', border: '1px solid #333' }} />
                <div style={{ width: 40, height: 4, borderRadius: 2, background: '#2A2A2A' }} />
              </div>
              <div style={{ borderRadius: 28, overflow: 'hidden' }}>
                <img src={lightboxScreen} alt="Screenshot" style={{ width: '100%', display: 'block', aspectRatio: '9/19.5', objectFit: 'cover' }} />
              </div>
              <div style={{ width: 80, height: 4, background: '#444', borderRadius: 2, margin: '8px auto 0' }} />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
              {lightboxIdx + 1} / {selectedApp.screens.length} — {selectedApp.name}
            </div>
            <button onClick={() => setLightboxScreen(null)} style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', fontSize: 13 }}>
              ✕ Close
            </button>
          </div>

          <button
            onClick={e => { e.stopPropagation(); lightboxNav(1); }}
            style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: 48, height: 48, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >›</button>
        </div>
      )}
    </div>
  );
}

// ─── Category Card ───────────────────────────────────────────────────────────

function CategoryCard({ cat, c, themeBorders, themeComponents, onClick }: {
  cat: RefCategory;
  c: ReturnType<typeof useTheme>['theme']['colors'];
  themeBorders: ReturnType<typeof useTheme>['theme']['borders'];
  themeComponents: ReturnType<typeof useTheme>['theme']['components'];
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? c.panel : c.bgSecondary,
        border: `1px solid ${hover ? c.primary : c.rule}`,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        padding: 0,
        textAlign: 'left',
        transition: 'all 0.15s ease',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? `0 8px 24px rgba(0,0,0,0.12)` : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Preview image */}
      <div style={{ aspectRatio: '16/9', background: c.tint, overflow: 'hidden', position: 'relative' }}>
        {cat.preview ? (
          <img src={cat.preview} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
            {getCatIcon(cat.id)}
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 9999 }}>
          {cat.appCount} apps
        </div>
      </div>
      {/* Label */}
      <div style={{ padding: '10px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 18 }}>{getCatIcon(cat.id)}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{cat.label}</span>
        </div>
        <div style={{ fontSize: 11, color: c.ink3, marginTop: 3 }}>{cat.appCount} reference apps</div>
      </div>
    </button>
  );
}

// ─── App Card ────────────────────────────────────────────────────────────────

function AppCard({ app, c, themeBorders, themeComponents, onClick }: {
  app: RefApp;
  c: ReturnType<typeof useTheme>['theme']['colors'];
  themeBorders: ReturnType<typeof useTheme>['theme']['borders'];
  themeComponents: ReturnType<typeof useTheme>['theme']['components'];
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: c.panel,
        border: `1px solid ${hover ? c.primary : c.rule}`,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        padding: 0,
        textAlign: 'left',
        transition: 'all 0.15s ease',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? `0 8px 20px rgba(0,0,0,0.14)` : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Screenshot preview (phone aspect ratio) */}
      <div style={{ aspectRatio: '9/16', background: c.tint, overflow: 'hidden', position: 'relative' }}>
        {app.preview ? (
          <img src={app.preview} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>📱</div>
        )}
        <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 9999 }}>
          {app.screenCount} screens
        </div>
      </div>

      {/* App info */}
      <div style={{ padding: '10px 12px 12px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        {app.icon ? (
          <img src={app.icon} alt="" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{ width: 32, height: 32, borderRadius: 8, background: c.tint, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📱</div>
        )}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: c.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
          {app.developer && <div style={{ fontSize: 10, color: c.ink3, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.developer}</div>}
        </div>
      </div>
    </button>
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
