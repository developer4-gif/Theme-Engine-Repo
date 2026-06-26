'use client';

import React, { useState } from 'react';

interface RefApp {
  id: string;
  name: string;
  developer: string;
  icon: string | null;
  preview: string | null;
  screenCount: number;
  screens: string[];
}

export default function AppCard3D({
  app, c, onClick, onDownloadGLB,
}: {
  app: RefApp;
  c: Record<string, string>;
  themeBorders: Record<string, unknown>;
  themeComponents: Record<string, unknown>;
  onClick: () => void;
  onDownloadGLB: (app: RefApp) => void;
}) {
  const [hover, setHover] = useState(false);
  const [dlHover, setDlHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: c.panel,
        border: `1px solid ${hover ? c.primary : c.rule}`,
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? `0 12px 32px rgba(0,0,0,0.22)` : '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Flat preview image */}
      <div
        onClick={onClick}
        style={{ aspectRatio: '9/16', background: '#0a0f1a', overflow: 'hidden', position: 'relative' }}
      >
        {app.preview
          ? <img src={app.preview} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#334' }}>📱</div>
        }
        <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.72)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 9999 }}>
          {app.screenCount} screens
        </div>
        {hover && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 20, letterSpacing: '0.04em' }}>
              VIEW 3D →
            </div>
          </div>
        )}
      </div>

      {/* App info */}
      <div style={{ padding: '10px 12px 8px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        {app.icon
          ? <img src={app.icon} alt="" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
          : <div style={{ width: 32, height: 32, borderRadius: 8, background: c.tint, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📱</div>
        }
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: c.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
          {app.developer && <div style={{ fontSize: 10, color: c.ink3, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.developer}</div>}
        </div>
      </div>

      {/* Download GLB */}
      <div style={{ padding: '0 12px 10px' }}>
        <button
          onMouseEnter={() => setDlHover(true)}
          onMouseLeave={() => setDlHover(false)}
          onClick={(e) => { e.stopPropagation(); onDownloadGLB(app); }}
          style={{
            width: '100%', padding: '6px 0',
            background: dlHover ? c.primary : c.tint,
            color: dlHover ? c.primaryText : c.ink2,
            border: `1px solid ${dlHover ? c.primary : c.rule}`,
            borderRadius: 8, fontSize: 10, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          ⬇ Download 3D + Prompt
        </button>
      </div>
    </div>
  );
}
