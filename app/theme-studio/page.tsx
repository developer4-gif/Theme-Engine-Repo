'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '../theme-engine/theme-provider/ThemeContext';
import { THEME_CATEGORIES, isDarkTheme } from '../theme-engine/theme-registry';
import { ThemePreviewCard, ThemeFullPreview } from '../theme-engine/theme-preview/ThemePreviewCard';
import { exportThemeAsJSON, exportAllThemes, exportThemeAsCSS, copyClaudePromptToClipboard, generateClaudePrompt, duplicateTheme } from '../theme-engine/theme-builder/ThemeExport';
import type { Theme } from '../theme-engine/types';

const Phone3DViewer = dynamic(() => import('./Phone3DViewer'), { ssr: false });

type ViewMode = 'web' | 'mobile';

const MOBILE_CATS = ['productivity', 'health', 'finance', 'education', 'medical', 'navigation', 'social', 'healthcare'];

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Category icon map ────────────────────────────────────────────────────────

const CAT_ICON: Record<string, string> = {
  finance: '💳', health: '❤️', 'health-fitness': '🏃', fitness: '💪',
  medical: '🏥', education: '📚', productivity: '⚡', navigation: '🗺️',
  social: '💬', tech: '🤖', startup: '🚀', food: '🍔', travel: '✈️',
  shopping: '🛍️', music: '🎵', photography: '📷', news: '📰',
  weather: '⛅', games: '🎮', business: '💼', entertainment: '🎬',
  lifestyle: '🌿', dating: '💕', utilities: '🔧', reference: '📖',
  book: '📗', 'smart-home': '🏠',
};

function getCatIcon(id: string): string {
  const lower = id.toLowerCase();
  for (const key of Object.keys(CAT_ICON)) {
    if (lower.includes(key)) return CAT_ICON[key];
  }
  return '📱';
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ThemeStudioPage() {
  const { theme, themes, setTheme, activeId } = useTheme();
  const c = theme.colors;

  const [viewMode, setViewMode]       = useState<ViewMode>('web');
  const [category, setCategory]       = useState('all');
  const [search, setSearch]           = useState('');
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [copied, setCopied]           = useState<string | null>(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptTheme, setPromptTheme] = useState<Theme | null>(null);
  const [extraThemes, setExtraThemes] = useState<Theme[]>([]);

  const allThemes = [...themes, ...extraThemes];
  const webThemes = allThemes.filter(t => !MOBILE_CATS.includes(t.category));
  const webCats   = THEME_CATEGORIES.filter(c => !MOBILE_CATS.includes(c.id) && c.id !== 'all');

  const filtered = webThemes.filter(t => {
    const matchCat    = category === 'all' || t.category === category;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleExport    = useCallback((t: Theme) => exportThemeAsJSON(t), []);
  const handleCopyPrompt = useCallback(async (t: Theme) => {
    const ok = await copyClaudePromptToClipboard(t);
    if (ok) { setCopied(t.id); setTimeout(() => setCopied(null), 2500); }
  }, []);
  const handleDuplicate = useCallback((t: Theme) => {
    setExtraThemes(prev => [duplicateTheme(t), ...prev]);
  }, []);

  const openPromptModal = (t: Theme) => { setPromptTheme(t); setShowPromptModal(true); };

  const darkCount  = allThemes.filter(t => isDarkTheme(t)).length;
  const lightCount = allThemes.length - darkCount;

  const switchMode = (mode: ViewMode) => { setViewMode(mode); setCategory('all'); setSearch(''); };

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

      {/* Tab bar */}
      <div style={{ background: c.bgSecondary, borderBottom: `1px solid ${c.rule}`, padding: '0 40px', display: 'flex', alignItems: 'center' }}>
        {(['web', 'mobile'] as ViewMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => switchMode(mode)}
            style={{
              padding: '14px 28px', background: 'transparent', border: 'none',
              borderBottom: viewMode === mode ? `2px solid ${c.primary}` : '2px solid transparent',
              color: viewMode === mode ? c.primary : c.ink3,
              fontWeight: viewMode === mode ? 700 : 400,
              fontSize: 13, cursor: 'pointer', letterSpacing: '0.02em',
              display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s ease',
            }}
          >
            {mode === 'web' ? (
              <><span>🖥</span> Browser Themes <span style={{ fontSize: 11, background: viewMode === 'web' ? `${c.primary}22` : c.tint, color: viewMode === 'web' ? c.primary : c.ink3, padding: '2px 7px', borderRadius: 999, fontWeight: 600 }}>{webThemes.length}</span></>
            ) : (
              <><span>📱</span> Screens <span style={{ fontSize: 11, background: viewMode === 'mobile' ? `${c.primary}22` : c.tint, color: viewMode === 'mobile' ? c.primary : c.ink3, padding: '2px 7px', borderRadius: 999, fontWeight: 600 }}>18k+ apps</span></>
            )}
          </button>
        ))}
      </div>

      {/* Active theme bar — only in web mode */}
      {viewMode === 'web' && (
        <div style={{ background: `${c.primary}10`, borderBottom: `1px solid ${c.rule}`, padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.ok, display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: c.ink }}>Active: <strong>{theme.name}</strong></span>
            <span style={{ fontSize: 11, color: c.ink3 }}>· {theme.description}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => openPromptModal(theme)} style={{ padding: '6px 12px', background: c.tint, border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, fontSize: 11, fontWeight: 600, cursor: 'pointer', color: c.ink2 }}>🤖 Claude Prompt</button>
            <button onClick={() => handleExport(theme)} style={{ padding: '6px 12px', background: 'transparent', border: `1px solid ${c.rule}`, borderRadius: theme.components.button.radius, fontSize: 11, cursor: 'pointer', color: c.ink3 }}>Export JSON</button>
          </div>
        </div>
      )}

      {/* ─── WEB MODE ─── */}
      {viewMode === 'web' && (
        <>
          <div style={{ padding: '16px 40px', background: c.bgSecondary, borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: c.ink3, fontSize: 13 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search web themes…"
                style={{ width: '100%', padding: '8px 10px 8px 30px', border: `1px solid ${c.rule}`, borderRadius: theme.components.form.radius, background: c.panel, color: c.ink, fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: c.ink3 }}>✕</button>}
            </div>
            <button onClick={() => setCategory('all')} style={{ padding: '6px 12px', borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: category === 'all' ? 600 : 400, cursor: 'pointer', border: `1px solid ${category === 'all' ? c.primary : c.rule}`, background: category === 'all' ? c.primary : c.panel, color: category === 'all' ? c.primaryText : c.ink2 }}>
              All <span style={{ fontSize: 10, marginLeft: 4 }}>{webThemes.length}</span>
            </button>
            {webCats.map(cat => {
              const active = category === cat.id;
              const count  = webThemes.filter(t => t.category === cat.id).length;
              if (count === 0) return null;
              return (
                <button key={cat.id} onClick={() => setCategory(cat.id)} style={{ padding: '6px 12px', borderRadius: theme.components.button.radius, fontSize: 12, fontWeight: active ? 600 : 400, cursor: 'pointer', border: `1px solid ${active ? c.primary : c.rule}`, background: active ? c.primary : c.panel, color: active ? c.primaryText : c.ink2 }}>
                  {cat.label} <span style={{ fontSize: 10, marginLeft: 4 }}>{count}</span>
                </button>
              );
            })}
            <div style={{ marginLeft: 'auto', fontSize: 12, color: c.ink3 }}>Showing {filtered.length}</div>
          </div>

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
                    key={t.id} theme={t} isActive={t.id === activeId}
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

      {previewTheme && <ThemeFullPreview theme={previewTheme} close={() => setPreviewTheme(null)} />}

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

// ─── Client-side cache (module-level, lives for the browser session) ─────────

interface CatCache {
  apps: RefApp[];
  hasMore: boolean;
  offset: number;       // how many we've fetched so far
}
const categoriesCache: { data: RefCategory[] | null } = { data: null };
const appsCache = new Map<string, CatCache>();

// ─── Android Reference Gallery ────────────────────────────────────────────────

function AndroidReferenceGallery({ themeColors: c, themeBorders, themeComponents }: {
  themeColors: ReturnType<typeof useTheme>['theme']['colors'];
  themeBorders: ReturnType<typeof useTheme>['theme']['borders'];
  themeComponents: ReturnType<typeof useTheme>['theme']['components'];
}) {
  const [categories, setCategories] = useState<RefCategory[]>([]);
  const [selectedCat, setSelectedCat] = useState<RefCategory | null>(null);
  const [apps, setApps]               = useState<RefApp[]>([]);
  const [selectedApp, setSelectedApp] = useState<RefApp | null>(null);
  const [loading, setLoading]         = useState(!categoriesCache.data);
  const [appsLoading, setAppsLoading] = useState(false);
  const [hasMore, setHasMore]         = useState(false);
  const [appsOffset, setAppsOffset]   = useState(0);
  const [catSearch, setCatSearch]     = useState('');
  const [appSearch, setAppSearch]     = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null);
  const PAGE = 20;

  // Load categories — use cache if already fetched
  useEffect(() => {
    if (categoriesCache.data) {
      setCategories(categoriesCache.data);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch('/api/references')
      .then(r => r.json())
      .then((data: RefCategory[]) => {
        categoriesCache.data = data;
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const loadApps = useCallback((catId: string, offset: number, replace: boolean) => {
    setAppsLoading(true);
    fetch(`/api/references?category=${catId}&offset=${offset}&limit=${PAGE}`)
      .then(r => r.json())
      .then((data: { apps: RefApp[]; hasMore: boolean }) => {
        setApps(prev => {
          const next = replace ? data.apps : [...prev, ...data.apps];
          // Update cache
          appsCache.set(catId, { apps: next, hasMore: data.hasMore, offset: offset + PAGE });
          return next;
        });
        setHasMore(data.hasMore);
        setAppsOffset(offset + PAGE);
        setAppsLoading(false);
      })
      .catch(() => setAppsLoading(false));
  }, []);

  const openCategory = (cat: RefCategory) => {
    setSelectedCat(cat);
    setAppSearch('');
    setSelectedApp(null);

    // Restore from cache — no network request
    const cached = appsCache.get(cat.id);
    if (cached) {
      setApps(cached.apps);
      setHasMore(cached.hasMore);
      setAppsOffset(cached.offset);
      return;
    }

    // First visit — fetch
    setApps([]);
    setAppsOffset(0);
    setHasMore(false);
    loadApps(cat.id, 0, true);
  };

  // Infinite scroll — load next 5 when sentinel visible
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || appsLoading || !selectedCat) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) loadApps(selectedCat.id, appsOffset, false);
    }, { threshold: 0.1 });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [hasMore, appsLoading, appsOffset, selectedCat, loadApps]);

  const filteredCats = categories.filter(cat =>
    !catSearch || cat.label.toLowerCase().includes(catSearch.toLowerCase())
  );

  // ── Info bar — shows download scoped to current view ─────────────────────────
  const infoBar = (
    <div style={{ padding: '12px 40px', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', borderBottom: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📱</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>Screens</div>
          <div style={{ fontSize: 11, color: 'rgba(226,232,240,0.5)' }}>18,000+ app screenshots · 26 categories · Download images + Claude prompt</div>
        </div>
      </div>
      {selectedCat && (
        <DownloadButton catId={selectedCat.id} appId={selectedApp?.id} />
      )}
    </div>
  );

  // ── Breadcrumb ────────────────────────────────────────────────────────────────
  const breadcrumb = selectedCat && (
    <div style={{ padding: '10px 40px', background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
      <button onClick={() => { setSelectedCat(null); setSelectedApp(null); }} style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
        All Categories
      </button>
      <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
      <button onClick={() => setSelectedApp(null)} style={{ background: 'none', border: 'none', color: selectedApp ? '#818cf8' : '#e2e8f0', cursor: selectedApp ? 'pointer' : 'default', fontWeight: 600, padding: 0 }}>
        {getCatIcon(selectedCat.id)} {selectedCat.label}
      </button>
      {selectedApp && (
        <>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{selectedApp.name}</span>
        </>
      )}
    </div>
  );

  // ── Category grid (home) ──────────────────────────────────────────────────────
  if (!selectedCat) {
    return (
      <div style={{ background: '#0a0f1a', minHeight: 'calc(100vh - 200px)' }}>
        {infoBar}
        <div style={{ padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'relative', maxWidth: 400 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>🔍</span>
            <input value={catSearch} onChange={e => setCatSearch(e.target.value)} placeholder="Search categories…"
              style={{ width: '100%', padding: '9px 10px 9px 32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
            {catSearch && <button onClick={() => setCatSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>✕</button>}
          </div>
        </div>
        <div style={{ padding: '24px 40px 60px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
              <div>Loading categories…</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
              {filteredCats.map((cat, idx) => (
                <CategoryCard key={cat.id} cat={cat} idx={idx} onClick={() => openCategory(cat)} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── App deck (category view) ──────────────────────────────────────────────────
  const filteredApps = appSearch
    ? apps.filter(a => a.name.toLowerCase().includes(appSearch.toLowerCase()) || a.developer.toLowerCase().includes(appSearch.toLowerCase()))
    : apps;

  return (
    <div style={{ background: '#0a0f1a', minHeight: 'calc(100vh - 200px)' }}>
      {infoBar}
      {breadcrumb}

      <div style={{ padding: '16px 40px', background: '#0d1321', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>🔍</span>
          <input
            value={appSearch}
            onChange={e => setAppSearch(e.target.value)}
            placeholder={`Search ${selectedCat.appCount} apps in ${selectedCat.label}…`}
            style={{ width: '100%', padding: '9px 10px 9px 32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
          {appSearch && <button onClick={() => setAppSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>✕</button>}
        </div>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          {appSearch ? `${filteredApps.length} match` : `${apps.length} loaded of ${selectedCat.appCount}`}
        </span>
      </div>

      <div style={{ padding: '20px 40px 80px' }}>
        {appsLoading && apps.length === 0 ? (
          <AppDeckSkeleton />
        ) : filteredApps.length === 0 && appSearch ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
            <div>No apps match "{appSearch}"</div>
            <button onClick={() => setAppSearch('')} style={{ marginTop: 12, padding: '7px 16px', background: 'rgba(139,92,246,0.3)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.4)', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>Clear search</button>
          </div>
        ) : apps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.4)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div>No apps found</div>
          </div>
        ) : (
          <>
            <AppDeck apps={filteredApps} catId={selectedCat.id} onOpen={setSelectedApp} />
            {/* Sentinel for infinite scroll */}
            {!appSearch && (
              <div ref={sentinelRef} style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
                {appsLoading && (
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                    <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>◌</span>
                    Loading more apps…
                  </div>
                )}
                {!hasMore && apps.length > 0 && (
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>· All {apps.length} apps loaded ·</div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* 3D phone viewer modal */}
      {selectedApp && (
        <Phone3DViewer
          app={selectedApp}
          catId={selectedCat?.id ?? ''}
          onClose={() => setSelectedApp(null)}
        />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── App Deck — grid with flow animation ─────────────────────────────────────

function AppDeck({ apps, catId, onOpen }: { apps: RefApp[]; catId: string; onOpen: (app: RefApp) => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {apps.map((app, i) => (
        <AppCard key={app.id} app={app} catId={catId} delay={Math.min(i, 12) * 0.03} onClick={() => onOpen(app)} />
      ))}
    </div>
  );
}

function AppCard({ app, catId, delay, onClick }: { app: RefApp; catId: string; delay: number; onClick: () => void }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111827',
        border: `1px solid ${hover ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hover ? '0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.3)' : '0 2px 6px rgba(0,0,0,0.3)',
        transform: hover ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: `transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.2s ease`,
        display: 'flex',
        flexDirection: 'column',
        animationDelay: `${delay}s`,
      }}
    >
      {/* Screenshot — compact 3:5 portrait */}
      <div style={{ aspectRatio: '3/5', background: '#0d1321', overflow: 'hidden', position: 'relative' }}>
        {app.preview ? (
          <img
            src={app.preview}
            alt={app.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease', transform: hover ? 'scale(1.05)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📱</div>
        )}
        {/* Screen count badge */}
        <div style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 9999 }}>
          {app.screenCount}
        </div>
        {/* Hover overlay */}
        {hover && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(79,70,229,0.7) 0%, transparent 55%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '10px 8px' }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', color: '#1e1b4b', fontSize: 9, fontWeight: 800, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em' }}>
              VIEW →
            </div>
          </div>
        )}
      </div>

      {/* Info + actions */}
      <div style={{ padding: '7px 8px 8px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {app.icon ? (
            <img src={app.icon} alt="" loading="lazy" style={{ width: 22, height: 22, borderRadius: 5, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)' }} />
          ) : (
            <div style={{ width: 22, height: 22, borderRadius: 5, background: 'rgba(139,92,246,0.15)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>📱</div>
          )}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>{app.name}</div>
            {app.developer && <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.developer}</div>}
          </div>
        </div>

        {/* Download button — prompt first */}
        <button
          onClick={e => {
            e.stopPropagation();
            downloadAppZip(catId, app.id);
          }}
          style={{
            width: '100%', padding: '5px 0',
            background: hover ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.04)',
            color: hover ? '#c4b5fd' : 'rgba(255,255,255,0.35)',
            border: `1px solid ${hover ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 6, fontSize: 8, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.15s ease', letterSpacing: '0.03em',
          }}
        >
          🤖 Prompt + ⬇ ZIP
        </button>
      </div>
    </div>
  );
}

function AppDeckSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{ borderRadius: 10, overflow: 'hidden', background: '#111827', border: '1px solid rgba(255,255,255,0.06)', animation: 'pulse 1.4s ease-in-out infinite', animationDelay: `${i * 0.05}s` }}>
          <div style={{ aspectRatio: '3/5', background: '#1a2234' }} />
          <div style={{ padding: 8 }}>
            <div style={{ height: 8, width: '70%', background: '#1a2234', borderRadius: 4, marginBottom: 5 }} />
            <div style={{ height: 7, width: '50%', background: '#1a2234', borderRadius: 4 }} />
          </div>
        </div>
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

// ─── Category Card (dark theme) ───────────────────────────────────────────────

function CategoryCard({ cat, idx, onClick }: { cat: RefCategory; idx: number; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = (idx % 8) * 0.04;

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? '#1a2234' : '#111827',
        border: `1px solid ${hover ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer', padding: 0, textAlign: 'left',
        transform: visible ? (hover ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s cubic-bezier(0.34,1.2,0.64,1) ${delay}s, box-shadow 0.2s ease, border-color 0.2s ease`,
        boxShadow: hover ? '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.2)' : '0 2px 6px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ aspectRatio: '16/9', background: '#0d1321', overflow: 'hidden', position: 'relative' }}>
        {cat.preview ? (
          <img src={cat.preview} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease', transform: hover ? 'scale(1.05)' : 'scale(1)' }} loading="lazy" />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{getCatIcon(cat.id)}</div>
        )}
        <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 9999 }}>{cat.appCount} apps</div>
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16 }}>{getCatIcon(cat.id)}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>{cat.label}</span>
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{cat.appCount} reference apps</div>
      </div>
    </button>
  );
}

// ─── Download button ──────────────────────────────────────────────────────────

function DownloadButton({ catId, appId }: { catId: string; appId?: string }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // If viewing a specific app → download that app's zip
    // If viewing a category → download that category's zip only
    const url  = appId
      ? `/api/references/download?category=${encodeURIComponent(catId)}&app=${encodeURIComponent(appId)}`
      : `/api/references/download?category=${encodeURIComponent(catId)}`;
    const name = appId ? `${appId}-reference.zip` : `${catId}-references.zip`;
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      style={{
        padding: '8px 18px',
        background: downloading ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.85)',
        color: '#fff', border: '1px solid rgba(139,92,246,0.6)', borderRadius: 10,
        fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        backdropFilter: 'blur(4px)', opacity: downloading ? 0.7 : 1,
      }}
    >
      {downloading ? '⏳ Preparing…' : appId ? '⬇ Download App + Prompt' : '⬇ Download Category + Prompt'}
    </button>
  );
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function downloadAppZip(catId: string, appId: string) {
  const url = `/api/references/download?category=${encodeURIComponent(catId)}&app=${encodeURIComponent(appId)}`;
  const a = document.createElement('a');
  a.href = url;
  a.download = `${appId}-reference.zip`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// ─── Claude Prompt Modal ──────────────────────────────────────────────────────

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
