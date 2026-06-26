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

// ─── Phone mockup — white/grey shell, images scroll inside the screen ─────────

function PhoneMockup({ screens, activeIdx, onChangeIdx, width = 260 }: {
  screens: string[];
  activeIdx: number;
  onChangeIdx: (i: number) => void;
  width?: number;
}) {
  const height     = Math.round(width * 530 / 260);
  const dragging   = useRef(false);
  const dragStartX = useRef(0);
  const baseOffset = useRef(0);
  const containerW = useRef(width);
  const [offset, setOffset]   = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Snap to activeIdx when changed externally (arrow keys / dots)
  useEffect(() => {
    setOffset(-activeIdx * 100);
  }, [activeIdx]);

  const snapTo = useCallback((rawOffset: number, flickDelta: number) => {
    const raw = -rawOffset / 100;
    let idx: number;
    if (Math.abs(flickDelta) > 25) {
      idx = flickDelta < 0
        ? Math.min(screens.length - 1, Math.ceil(raw - 0.1))
        : Math.max(0, Math.floor(raw + 0.1));
    } else {
      idx = Math.max(0, Math.min(screens.length - 1, Math.round(raw)));
    }
    onChangeIdx(idx);
    setOffset(-idx * 100);
  }, [screens.length, onChangeIdx]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    containerW.current = (e.currentTarget as HTMLElement).offsetWidth;
    dragging.current   = true;
    dragStartX.current = e.clientX;
    baseOffset.current = offset;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const deltaPx  = e.clientX - dragStartX.current;
    const deltaPct = (deltaPx / containerW.current) * 100;
    let next = baseOffset.current + deltaPct;
    const min = -(screens.length - 1) * 100;
    if (next > 0)   next = next * 0.18;
    if (next < min) next = min + (next - min) * 0.18;
    setOffset(next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    const deltaPx = e.clientX - dragStartX.current;
    snapTo(offset, deltaPx);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (dx > 15)  onChangeIdx(Math.min(screens.length - 1, activeIdx + 1));
    if (dx < -15) onChangeIdx(Math.max(0, activeIdx - 1));
  };

  return (
    <div style={{
      position: 'relative',
      width,
      height,
      borderRadius: Math.round(width * 40 / 260),
      background: 'linear-gradient(160deg, #f2f2f2 0%, #d0d0d0 100%)',
      boxShadow: '0 2px 0 #b8b8b8, 0 5px 0 #a8a8a8, 0 12px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.95)',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      {/* Power button */}
      <div style={{ position: 'absolute', right: -3, top: Math.round(height * 0.19), width: 3, height: Math.round(height * 0.11), borderRadius: '0 2px 2px 0', background: '#b8b8b8' }} />
      {/* Volume buttons */}
      <div style={{ position: 'absolute', left: -3, top: Math.round(height * 0.17), width: 3, height: Math.round(height * 0.07), borderRadius: '2px 0 0 2px', background: '#b8b8b8' }} />
      <div style={{ position: 'absolute', left: -3, top: Math.round(height * 0.26), width: 3, height: Math.round(height * 0.07), borderRadius: '2px 0 0 2px', background: '#b8b8b8' }} />
      {/* Silent switch */}
      <div style={{ position: 'absolute', left: -3, top: Math.round(height * 0.11), width: 3, height: Math.round(height * 0.04), borderRadius: '2px 0 0 2px', background: '#b8b8b8' }} />

      {/* Screen bezel */}
      <div style={{
        position: 'absolute',
        inset: Math.round(width * 10 / 260),
        borderRadius: Math.round(width * 32 / 260),
        background: '#0a0a0a',
        overflow: 'hidden',
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute',
          top: Math.round(height * 0.018),
          left: '50%', transform: 'translateX(-50%)',
          width: Math.round(width * 0.33), height: Math.round(height * 0.04),
          borderRadius: 99, background: '#000', zIndex: 10,
        }} />

        {/* Swipeable screen */}
        <div
          style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
        >
          <div style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(${offset}%)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            willChange: 'transform',
          }}>
            {screens.map((src, i) => (
              <div key={i} style={{ flexShrink: 0, width: '100%', height: '100%' }}>
                <img
                  src={src} alt={`Screen ${i + 1}`} loading="lazy" draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Home bar */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: Math.round(width * 0.34), height: 3, borderRadius: 2,
          background: 'rgba(255,255,255,0.45)', zIndex: 10,
        }} />
      </div>

      {/* Screen counter */}
      <div style={{
        position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px',
        borderRadius: 99, whiteSpace: 'nowrap', zIndex: 20,
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        {activeIdx + 1} / {screens.length}
      </div>
    </div>
  );
}

// ─── Main viewer ──────────────────────────────────────────────────────────────

export default function Phone3DViewer({ app, catId, onClose }: { app: RefApp; catId: string; onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [vw, setVw] = useState(1200);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx(p => Math.min(p + 1, app.screens.length - 1));
      if (e.key === 'ArrowLeft')  setActiveIdx(p => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [app.screens.length, onClose]);

  const narrow = vw < 640;
  // Scale phone to fit narrow screens with padding
  const phoneW = narrow ? Math.min(220, vw - 48) : 260;

  const dots = (
    <div style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 220 }}>
      {app.screens.map((_, i) => (
        <button key={i} onClick={() => setActiveIdx(i)} style={{
          width: i === activeIdx ? 18 : 6, height: 6, borderRadius: 3,
          background: i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.3)',
          border: 0, padding: 0, cursor: 'pointer',
          transition: 'all 0.25s ease', flexShrink: 0,
        }} />
      ))}
    </div>
  );

  const downloadBtn = (
    <button
      onClick={() => {
        const a = document.createElement('a');
        a.href = `/api/references/download?category=${encodeURIComponent(catId)}&app=${encodeURIComponent(app.id)}`;
        a.download = `${app.id}-reference.zip`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      }}
      style={{ width: '100%', padding: '10px 0', background: '#3b82f6', color: '#fff', border: 0, borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
    >
      ⬇ Download Images + Claude Prompt
    </button>
  );

  // ── Narrow: stacked, no arrows ───────────────────────────────────────────────
  if (narrow) {
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)', zIndex: 500, overflowY: 'auto', overflowX: 'hidden' }}>
        <div onClick={e => e.stopPropagation()} style={{ maxWidth: 400, margin: '0 auto', padding: '24px 16px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <PhoneMockup screens={app.screens} activeIdx={activeIdx} onChangeIdx={setActiveIdx} width={phoneW} />
          {dots}
          <div style={{ width: '100%', color: '#fff' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{app.name}</div>
            {app.developer && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>{app.developer}</div>}
            {downloadBtn}
            <button onClick={onClose} style={{ width: '100%', marginTop: 8, padding: '8px 0', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, fontSize: 12, cursor: 'pointer' }}>✕ Close</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Wide: phone centre, arrows on sides, info panel right ───────────────────
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', overflow: 'hidden' }}>
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>

        {/* Left arrow */}
        <button
          onClick={() => setActiveIdx(p => Math.max(p - 1, 0))}
          style={{ width: 44, height: 44, borderRadius: '50%', background: activeIdx === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: activeIdx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: 24, cursor: activeIdx === 0 ? 'default' : 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
        >‹</button>

        {/* Phone + dots */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <PhoneMockup screens={app.screens} activeIdx={activeIdx} onChangeIdx={setActiveIdx} width={phoneW} />
          {dots}
        </div>

        {/* Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 200, flexShrink: 0, color: '#fff' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 3 }}>{app.name}</div>
            {app.developer && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>{app.developer}</div>}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
              Drag or scroll inside phone<br />Arrow keys · ← →
            </div>
          </div>
          {downloadBtn}
          <button onClick={onClose} style={{ width: '100%', padding: '8px 0', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, fontSize: 12, cursor: 'pointer' }}>✕ Close (Esc)</button>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => setActiveIdx(p => Math.min(p + 1, app.screens.length - 1))}
          style={{ width: 44, height: 44, borderRadius: '50%', background: activeIdx === app.screens.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: activeIdx === app.screens.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: 24, cursor: activeIdx === app.screens.length - 1 ? 'default' : 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
        >›</button>

      </div>
    </div>
  );
}
