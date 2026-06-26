'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

interface RefApp {
  id: string;
  name: string;
  developer: string;
  icon: string | null;
  screenCount: number;
  screens: string[];
}

// ─── Phone frame around a single screenshot ───────────────────────────────────

function PhoneFrame({ src, label, active, scale, opacity }: {
  src: string;
  label?: string;
  active: boolean;
  scale: number;
  opacity: number;
}) {
  return (
    <div style={{
      transform: `scale(${scale})`,
      opacity,
      transition: 'transform 0.4s cubic-bezier(0.25,1,0.5,1), opacity 0.4s ease',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
    }}>
      {/* Label above active card */}
      <div style={{
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        color: active ? '#fff' : 'rgba(255,255,255,0.35)',
        textAlign: 'center',
        maxWidth: 180,
        minHeight: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.3s',
        lineHeight: 1.4,
        padding: '0 8px',
      }}>
        {label}
      </div>

      {/* Phone shell */}
      <div style={{
        width: 180,
        height: 360,
        borderRadius: 32,
        background: active
          ? 'linear-gradient(160deg, #2a2a3e 0%, #1a1a2e 100%)'
          : 'linear-gradient(160deg, #1e1e2e 0%, #14141f 100%)',
        border: active ? '2px solid rgba(139,92,246,0.8)' : '2px solid rgba(255,255,255,0.1)',
        boxShadow: active
          ? '0 0 0 1px rgba(139,92,246,0.4), 0 24px 60px rgba(0,0,0,0.7)'
          : '0 8px 32px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 18, borderRadius: 9,
          background: '#000', zIndex: 10,
        }} />
        {/* Screen image */}
        <img
          src={src}
          alt=""
          draggable={false}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
        />
        {/* Home bar */}
        <div style={{
          position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 4, borderRadius: 2,
          background: 'rgba(255,255,255,0.4)', zIndex: 10,
        }} />
      </div>
    </div>
  );
}

// ─── Main viewer ──────────────────────────────────────────────────────────────

export default function Phone3DViewer({ app, catId, onClose }: {
  app: RefApp;
  catId: string;
  onClose: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);   // live px during drag
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX  = useRef(0);
  const CARD_STEP   = 220; // px between card centres

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx(p => Math.min(p + 1, app.screens.length - 1));
      if (e.key === 'ArrowLeft')  setActiveIdx(p => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [app.screens.length, onClose]);

  // ── Pointer drag on the backdrop ────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag on the backdrop itself, not buttons
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  };

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = e.clientX - dragStartX.current;
    setDragOffset(0);
    if (delta < -50)       setActiveIdx(p => Math.min(p + 1, app.screens.length - 1));
    else if (delta > 50)   setActiveIdx(p => Math.max(p - 1, 0));
  }, [isDragging, app.screens.length]);

  // Wheel
  const onWheel = (e: React.WheelEvent) => {
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (dx > 20)  setActiveIdx(p => Math.min(p + 1, app.screens.length - 1));
    if (dx < -20) setActiveIdx(p => Math.max(p - 1, 0));
  };

  // ── Layout: cards centred on active, fan out left/right ─────────────────────
  // We show all cards, each positioned relative to the active one
  const translateX = (i: number) => {
    const base = (i - activeIdx) * CARD_STEP;
    return base + (isDragging ? dragOffset * 0.6 : 0);
  };

  const getScale = (i: number) => {
    const dist = Math.abs(i - activeIdx);
    if (dist === 0) return 1;
    if (dist === 1) return 0.82;
    return 0.68;
  };

  const getOpacity = (i: number) => {
    const dist = Math.abs(i - activeIdx);
    if (dist === 0) return 1;
    if (dist === 1) return 0.6;
    if (dist === 2) return 0.35;
    return 0;
  };

  // Dots
  const dots = (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {app.screens.map((_, i) => (
        <button key={i} onClick={() => setActiveIdx(i)} style={{
          width: i === activeIdx ? 20 : 6, height: 6, borderRadius: 3,
          background: i === activeIdx ? '#8b5cf6' : 'rgba(255,255,255,0.25)',
          border: 0, padding: 0, cursor: 'pointer',
          transition: 'all 0.25s ease', flexShrink: 0,
        }} />
      ))}
    </div>
  );

  return (
    <div
      onClick={onClose}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5,5,15,0.95)',
        backdropFilter: 'blur(18px)',
        zIndex: 500,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 24,
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* App name */}
      <div onClick={e => e.stopPropagation()} style={{ textAlign: 'center', zIndex: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{app.name}</div>
        {app.developer && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{app.developer}</div>}
      </div>

      {/* Carousel */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 450,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {app.screens.map((src, i) => {
          const dist = Math.abs(i - activeIdx);
          if (dist > 2) return null; // don't render far-off cards
          return (
            <div
              key={i}
              onClick={e => { e.stopPropagation(); if (!isDragging) setActiveIdx(i); }}
              style={{
                position: 'absolute',
                transform: `translateX(${translateX(i)}px)`,
                transition: isDragging ? 'none' : 'transform 0.42s cubic-bezier(0.25,1,0.5,1)',
                zIndex: dist === 0 ? 10 : dist === 1 ? 5 : 1,
                cursor: i === activeIdx ? 'default' : 'pointer',
              }}
            >
              <PhoneFrame
                src={src}
                label={`Screen ${i + 1}`}
                active={i === activeIdx}
                scale={getScale(i)}
                opacity={getOpacity(i)}
              />
            </div>
          );
        })}
      </div>

      {/* Dots + counter */}
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10 }}>
        {dots}
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          {activeIdx + 1} / {app.screens.length} · drag or swipe · ← →
        </div>
      </div>

      {/* Bottom bar */}
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: 10, zIndex: 10 }}>
        <button
          onClick={() => {
            const a = document.createElement('a');
            a.href = `/api/references/download?category=${encodeURIComponent(catId)}&app=${encodeURIComponent(app.id)}`;
            a.download = `${app.id}-reference.zip`;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
          }}
          style={{ padding: '10px 24px', background: '#8b5cf6', color: '#fff', border: 0, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          ⬇ Download + Claude Prompt
        </button>
        <button
          onClick={onClose}
          style={{ padding: '10px 18px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, fontSize: 12, cursor: 'pointer' }}
        >
          ✕ Close
        </button>
      </div>

      {/* Side arrows */}
      <button
        onClick={e => { e.stopPropagation(); setActiveIdx(p => Math.max(p - 1, 0)); }}
        style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: activeIdx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: 26, cursor: activeIdx === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', zIndex: 20 }}
      >‹</button>
      <button
        onClick={e => { e.stopPropagation(); setActiveIdx(p => Math.min(p + 1, app.screens.length - 1)); }}
        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: activeIdx === app.screens.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: 26, cursor: activeIdx === app.screens.length - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', zIndex: 20 }}
      >›</button>
    </div>
  );
}
