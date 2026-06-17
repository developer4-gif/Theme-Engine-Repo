'use client';

import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import type { Theme } from '../types';
import dynamic from 'next/dynamic';

// ─── Three.js vortex — dynamically imported to avoid SSR ─────────────────────
const VortexCanvas = dynamic(() => import('./VortexCanvas'), { ssr: false, loading: () => <div style={{ width: '100%', height: '100%', background: '#06000F' }} /> });

// ═══════════════════════════════════════════════════════════════════════════════
// AURORA PREVIEW
// Northern lights: animated gradient sky + glass sidebar + glowing stats
// ═══════════════════════════════════════════════════════════════════════════════

export function AuroraMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  const [phase, setPhase] = useState(0);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  // Aurora color-phase animation
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 360), 50);
    return () => clearInterval(id);
  }, []);

  // Count-up animation when hovered
  useEffect(() => {
    if (!hovered) return;
    const targets = [1247, 94, 38, 12];
    const unsubs = targets.map((target, i) => {
      const ctrl = animate(0, target, {
        duration: 1.2,
        delay: i * 0.12,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: v => setCounts(prev => { const next = [...prev]; next[i] = Math.round(v); return next; }),
      });
      return () => ctrl.stop();
    });
    return () => unsubs.forEach(fn => fn());
  }, [hovered]);

  const auroraHue1 = (phase * 1) % 360;
  const auroraHue2 = (phase * 1 + 120) % 360;
  const auroraHue3 = (phase * 1 + 240) % 360;

  return (
    <div style={{ height: 210, background: '#030B14', position: 'relative', overflow: 'hidden', fontFamily: t.typography.fontMono }}>

      {/* Animated aurora sky — three overlapping radial gradients that rotate hue */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-30%', left: '10%', width: '80%', height: '60%', background: `radial-gradient(ellipse, hsla(${auroraHue1},100%,60%,0.18) 0%, transparent 70%)`, filter: 'blur(12px)' }}
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.12, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: '-20%', left: '30%', width: '70%', height: '55%', background: `radial-gradient(ellipse, hsla(${auroraHue2},100%,55%,0.15) 0%, transparent 70%)`, filter: 'blur(16px)' }}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', top: '-10%', left: '5%', width: '60%', height: '50%', background: `radial-gradient(ellipse, hsla(${auroraHue3},90%,65%,0.12) 0%, transparent 70%)`, filter: 'blur(20px)' }}
        />
        {/* Star field */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
            style={{ position: 'absolute', left: `${(i * 6.25 + 3) % 100}%`, top: `${(i * 13 + 8) % 60}%`, width: 1.5, height: 1.5, borderRadius: '50%', background: '#E0F7FA', opacity: 0.5 }}
          />
        ))}
      </div>

      {/* Brand stripe */}
      <div style={{ display: 'flex', height: t.brand.stripeHeight, position: 'relative', zIndex: 1 }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Gradient glass sidebar */}
      <div style={{ position: 'absolute', left: 0, top: t.brand.stripeHeight, bottom: 0, width: 44, background: 'linear-gradient(180deg, rgba(0,245,196,0.06) 0%, rgba(0,153,204,0.08) 50%, rgba(123,47,190,0.06) 100%)', backdropFilter: 'blur(12px)', borderRight: '1px solid rgba(0,245,196,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 5, zIndex: 2 }}>
        {[t.colors.primary, t.colors.ink3, t.colors.ink3, t.colors.ink3, t.colors.ink3].map((col, i) => (
          <div key={i} style={{ position: 'relative', width: 28, display: 'flex', justifyContent: 'center' }}>
            {i === 0 && (
              <motion.div
                animate={{ boxShadow: [`0 0 6px ${t.colors.primary}`, `0 0 14px ${t.colors.primary}`, `0 0 6px ${t.colors.primary}`] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'rgba(0,245,196,0.12)' }}
              />
            )}
            <div style={{ width: 16, height: 16, borderRadius: 4, background: i === 0 ? t.colors.primary : col, opacity: i === 0 ? 0.9 : 0.25, position: 'relative', zIndex: 1, boxShadow: i === 0 ? `0 0 8px ${t.colors.primary}` : 'none' }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ marginLeft: 44, background: 'rgba(3,11,20,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,245,196,0.1)', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 24, zIndex: 2, position: 'relative' }}>
        <div style={{ fontSize: 8, color: t.colors.primary, letterSpacing: 1.5, fontWeight: 700 }}>AURORA / DASHBOARD</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: t.colors.ok, boxShadow: `0 0 6px ${t.colors.ok}` }} />
          <span style={{ fontSize: 7, color: t.colors.ink3 }}>LIVE</span>
        </div>
      </div>

      {/* Glass stat cards */}
      <div style={{ marginLeft: 44, padding: '5px 6px 4px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, position: 'relative', zIndex: 2 }}>
        {[
          { l: 'EMPLOYEES', col: t.colors.primary },
          { l: 'FIT RATE', col: t.colors.accent3 },
          { l: 'ALERTS', col: t.colors.warn },
          { l: 'CRITICAL', col: t.colors.alert },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            animate={{ boxShadow: hovered ? `0 0 16px ${s.col}30` : 'none' }}
            style={{ background: 'rgba(5,20,40,0.7)', backdropFilter: 'blur(8px)', border: `1px solid ${s.col}25`, borderTop: `2px solid ${s.col}`, borderRadius: 6, padding: '4px 5px' }}
          >
            <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: 0.5 }}>{s.l}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.col, fontFamily: t.typography.fontMono, textShadow: hovered ? `0 0 10px ${s.col}` : 'none' }}>
              {hovered ? counts[i].toLocaleString() : ['—', '—', '—', '—'][i]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom: chart + table */}
      <div style={{ marginLeft: 44, display: 'flex', gap: 4, padding: '0 6px', flex: 1, position: 'relative', zIndex: 2 }}>
        {/* Aurora area chart */}
        <div style={{ flex: 1.2, background: 'rgba(5,20,40,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,245,196,0.1)', borderRadius: 6, padding: '4px 5px' }}>
          <div style={{ fontSize: 7, color: t.colors.ink3, marginBottom: 3, letterSpacing: 0.5 }}>HEALTH TREND</div>
          <AuroraChart color={t.colors.primary} color2={t.colors.accent2} hovered={hovered} />
        </div>
        {/* Table */}
        <div style={{ flex: 1, background: 'rgba(5,20,40,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,245,196,0.1)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(0,245,196,0.04)', padding: '3px 5px', borderBottom: '1px solid rgba(0,245,196,0.1)', display: 'flex', gap: 2 }}>
            {['DEPT', 'FIT', 'RISK'].map(h => <div key={h} style={{ flex: 1, fontSize: 6, color: t.colors.ink3, fontWeight: 700 }}>{h}</div>)}
          </div>
          {[
            { d: 'PVC Plant', fit: 98, risk: 2 },
            { d: 'Lab', fit: 95, risk: 5 },
            { d: 'QC', fit: 100, risk: 0 },
            { d: 'Drip Mfg', fit: 88, risk: 12 },
          ].map((row, i) => (
            <motion.div key={row.d} animate={{ background: hovered && i === 3 ? 'rgba(255,71,87,0.08)' : 'transparent' }} style={{ display: 'flex', gap: 2, padding: '3px 5px', borderBottom: '1px solid rgba(0,245,196,0.06)' }}>
              <div style={{ flex: 1, fontSize: 7, color: t.colors.ink3 }}>{row.d}</div>
              <div style={{ flex: 1, fontSize: 7, color: t.colors.ok, fontWeight: 700 }}>{row.fit}%</div>
              <div style={{ flex: 1, fontSize: 7, color: row.risk > 5 ? t.colors.alert : t.colors.ink3 }}>{row.risk}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuroraChart({ color, color2, hovered }: { color: string; color2: string; hovered: boolean }) {
  const pts = [55, 62, 58, 71, 68, 80, 74, 85, 79, 90, 86, 94];
  const w = 100, h = 40;
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / 100) * h}`).join(' ');
  const safeId = 'aurora_chart';
  return (
    <motion.svg
      width="100%" height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={safeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
        <filter id="aurora_glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polyline points={`0,${h} ${path} ${w},${h}`} fill={`url(#${safeId})`} stroke="none" />
      <motion.polyline
        points={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter={hovered ? 'url(#aurora_glow)' : undefined}
        animate={{ strokeWidth: hovered ? 2 : 1.5 }}
      />
    </motion.svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VORTEX PREVIEW
// Three.js torus in background, data cards appear to orbit around it
// ═══════════════════════════════════════════════════════════════════════════════

export function VortexMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: 210, background: '#06000F', position: 'relative', overflow: 'hidden', fontFamily: t.typography.fontSans }}>

      {/* THREE.JS torus canvas — full bleed behind everything */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <VortexCanvas hovered={hovered} />
      </div>

      {/* Radial vignette over canvas */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(6,0,15,0.85) 80%)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Brand stripe */}
      <div style={{ display: 'flex', height: t.brand.stripeHeight, position: 'relative', zIndex: 3 }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Sidebar */}
      <div style={{ position: 'absolute', left: 0, top: t.brand.stripeHeight, bottom: 0, width: 44, background: 'rgba(6,0,15,0.9)', borderRight: '1px solid rgba(139,47,201,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 5, zIndex: 3 }}>
        {[t.colors.primary, t.colors.ink3, t.colors.ink3, t.colors.ink3, t.colors.ink3].map((col, i) => (
          <motion.div
            key={i}
            animate={i === 0 ? { boxShadow: [`0 0 0px ${t.colors.primary}`, `0 0 12px ${t.colors.primary}60`, `0 0 0px ${t.colors.primary}`] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 16, height: 16, borderRadius: 3, background: i === 0 ? t.colors.primary : col, opacity: i === 0 ? 0.9 : 0.2 }}
          />
        ))}
      </div>

      {/* Header */}
      <div style={{ marginLeft: 44, background: 'rgba(6,0,15,0.85)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(139,47,201,0.2)', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 24, position: 'relative', zIndex: 3 }}>
        <div style={{ fontSize: 8, color: t.colors.primary, letterSpacing: 1.5, fontWeight: 700, fontFamily: t.typography.fontMono }}>VORTEX / ANALYTICS</div>
        <motion.div
          animate={{ color: [t.colors.primary, t.colors.accent2, t.colors.accent3, t.colors.primary] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ fontSize: 7, fontFamily: t.typography.fontMono, fontWeight: 700 }}
        >LIVE ●</motion.div>
      </div>

      {/* Orbiting metric cards — positioned using CSS transforms that rotate slowly */}
      <div style={{ marginLeft: 44, position: 'relative', height: 130, zIndex: 3 }}>
        {[
          { label: 'THROUGHPUT', val: `${94 + (tick % 8)}%`, col: t.colors.primary, angle: 0 },
          { label: 'LATENCY', val: `${12 + (tick % 5)}ms`, col: t.colors.accent2, angle: 90 },
          { label: 'ERRORS', val: `${(tick % 3)}`, col: t.colors.alert, angle: 180 },
          { label: 'UPTIME', val: '99.9%', col: t.colors.accent3, angle: 270 },
        ].map((m, i) => {
          const orbitR = 34;
          const a = ((m.angle + tick * 0.5) * Math.PI) / 180;
          const cx = 50 + orbitR * Math.cos(a);
          const cy = 48 + orbitR * Math.sin(a) * 0.5;
          return (
            <motion.div
              key={m.label}
              animate={{ left: `${cx}%`, top: `${cy}%` }}
              transition={{ duration: 0.12, ease: 'linear' }}
              style={{ position: 'absolute', transform: 'translate(-50%, -50%)', background: 'rgba(13,0,32,0.85)', border: `1px solid ${m.col}40`, borderRadius: 5, padding: '4px 7px', backdropFilter: 'blur(4px)', minWidth: 52, textAlign: 'center', boxShadow: hovered ? `0 0 12px ${m.col}40` : 'none' }}
            >
              <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: 0.5 }}>{m.label}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: m.col, fontFamily: t.typography.fontMono, textShadow: hovered ? `0 0 8px ${m.col}` : 'none' }}>{m.val}</div>
            </motion.div>
          );
        })}

        {/* Center pulse ring */}
        <div style={{ position: 'absolute', left: '50%', top: '43%', transform: 'translate(-50%,-50%)', zIndex: 0 }}>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${t.colors.primary}`, position: 'absolute', top: -12, left: -12 }}
          />
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
            style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${t.colors.accent2}`, position: 'absolute', top: -12, left: -12 }}
          />
        </div>
      </div>

      {/* Bottom bar stats */}
      <div style={{ marginLeft: 44, padding: '3px 6px', display: 'flex', gap: 3, position: 'relative', zIndex: 3 }}>
        {[
          { l: 'P95', v: '42ms', c: t.colors.primary },
          { l: 'RPS', v: '18.4K', c: t.colors.accent2 },
          { l: 'CPU', v: '67%', c: t.colors.accent3 },
          { l: 'MEM', v: '3.2G', c: t.colors.accent4 },
          { l: 'ERR', v: '0.02%', c: t.colors.ok },
        ].map(s => (
          <div key={s.l} style={{ flex: 1, background: 'rgba(13,0,32,0.8)', border: `1px solid ${s.c}20`, borderRadius: 3, padding: '2px 3px', textAlign: 'center' }}>
            <div style={{ fontSize: 6, color: t.colors.ink3 }}>{s.l}</div>
            <div style={{ fontSize: 8, fontWeight: 700, color: s.c, fontFamily: t.typography.fontMono, textShadow: `0 0 6px ${s.c}60` }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BIOLUMINESCENT PREVIEW
// Deep ocean — animated SVG organisms, everything glows, pulsing life
// ═══════════════════════════════════════════════════════════════════════════════

export function BioluminescentMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 60);
    return () => clearInterval(id);
  }, []);

  // Organic blob positions that drift
  const blobs = useMemo(() => [
    { cx: 15, cy: 30, r: 18, col: t.colors.primary, phase: 0 },
    { cx: 75, cy: 20, r: 14, col: t.colors.accent2, phase: 90 },
    { cx: 45, cy: 65, r: 22, col: t.colors.accent1, phase: 180 },
    { cx: 85, cy: 55, r: 12, col: t.colors.accent3, phase: 270 },
    { cx: 25, cy: 80, r: 10, col: t.colors.accent4, phase: 135 },
  ], [t]);

  return (
    <div style={{ height: 210, background: '#010F0F', position: 'relative', overflow: 'hidden', fontFamily: t.typography.fontMono }}>

      {/* Animated SVG bioluminescent layer */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <defs>
          <filter id="bio_glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bio_glow_strong">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Drifting phosphor orbs */}
        {blobs.map((b, i) => {
          const drift = Math.sin((tick * 0.025 + b.phase * Math.PI / 180)) * 6;
          const drift2 = Math.cos((tick * 0.018 + b.phase * Math.PI / 180)) * 4;
          const pulseR = b.r + Math.sin(tick * 0.04 + i) * 2;
          return (
            <g key={i}>
              <circle cx={`${b.cx + drift}%`} cy={`${b.cy + drift2}%`} r={pulseR * 2.2} fill={b.col} opacity={0.03} filter="url(#bio_glow_strong)" />
              <circle cx={`${b.cx + drift}%`} cy={`${b.cy + drift2}%`} r={pulseR * 1.2} fill={b.col} opacity={0.06} filter="url(#bio_glow)" />
              <circle cx={`${b.cx + drift}%`} cy={`${b.cy + drift2}%`} r={3} fill={b.col} opacity={0.4} filter="url(#bio_glow)" />
            </g>
          );
        })}

        {/* Trailing tendrils — organic sine paths */}
        {[0, 1, 2].map(i => {
          const y = 20 + i * 30;
          const points = Array.from({ length: 20 }, (_, j) => {
            const x = (j / 19) * 100;
            const wy = y + Math.sin((j * 0.4 + tick * 0.03 + i * 2)) * 8;
            return `${x},${wy}`;
          }).join(' ');
          const col = [t.colors.primary, t.colors.accent2, t.colors.accent3][i];
          return (
            <polyline key={i} points={points} fill="none" stroke={col}
              strokeWidth={hovered ? 1.5 : 0.8} opacity={hovered ? 0.35 : 0.15}
              filter="url(#bio_glow)" strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Brand stripe */}
      <div style={{ display: 'flex', height: t.brand.stripeHeight, position: 'relative', zIndex: 2 }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Icon sidebar */}
      <div style={{ position: 'absolute', left: 0, top: t.brand.stripeHeight, bottom: 0, width: 28, background: 'rgba(1,15,15,0.95)', borderRight: '1px solid rgba(0,255,135,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 6, zIndex: 2 }}>
        {[t.colors.primary, t.colors.ink3, t.colors.ink3, t.colors.ink3].map((col, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {i === 0 && <div style={{ position: 'absolute', right: -2, top: 0, bottom: 0, width: 2, background: t.colors.primary, boxShadow: `0 0 6px ${t.colors.primary}`, borderRadius: 1 }} />}
            <motion.div
              animate={i === 0 ? { boxShadow: [`0 0 4px ${t.colors.primary}`, `0 0 12px ${t.colors.primary}`, `0 0 4px ${t.colors.primary}`] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              style={{ width: 14, height: 14, borderRadius: 3, background: i === 0 ? t.colors.primary : col, opacity: i === 0 ? 0.9 : 0.25 }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ marginLeft: 28, background: 'rgba(1,15,15,0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(0,255,135,0.08)', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 22, position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 8, color: t.colors.primary, letterSpacing: 1.5, fontWeight: 700, textShadow: `0 0 8px ${t.colors.primary}` }}>BIOLUMINESCENT</div>
        <div style={{ display: 'flex', gap: 2 }}>
          {[t.colors.primary, t.colors.accent2, t.colors.accent3].map((c, i) => (
            <motion.div key={i} animate={{ opacity: [0.4, 1, 0.4], boxShadow: [`0 0 3px ${c}`, `0 0 8px ${c}`, `0 0 3px ${c}`] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>

      {/* Hero stat — glowing big number */}
      <div style={{ marginLeft: 28, padding: '5px 6px 3px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 4, position: 'relative', zIndex: 2 }}>
        <motion.div
          animate={{ borderColor: hovered ? t.colors.primary : 'rgba(0,255,135,0.12)', boxShadow: hovered ? `0 0 20px rgba(0,255,135,0.15)` : 'none' }}
          style={{ background: 'rgba(1,30,30,0.8)', border: '1px solid rgba(0,255,135,0.12)', borderTop: `2px solid ${t.colors.primary}`, borderRadius: 6, padding: '5px 7px' }}
        >
          <div style={{ fontSize: 7, color: t.colors.ink3, letterSpacing: 1 }}>ECOSYSTEM HEALTH</div>
          <motion.div
            animate={{ textShadow: hovered ? [`0 0 10px ${t.colors.primary}`, `0 0 20px ${t.colors.primary}`, `0 0 10px ${t.colors.primary}`] : '0 0 0px transparent' }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 22, fontWeight: 700, color: t.colors.primary, lineHeight: 1, marginTop: 2 }}
          >98.4%</motion.div>
          <div style={{ fontSize: 7, color: t.colors.ink3, marginTop: 1 }}>1,247 ENTITIES ACTIVE</div>
        </motion.div>

        {[
          { l: 'SIGNALS', v: `${4200 + (tick % 100)}`, c: t.colors.accent2 },
          { l: 'ANOMALIES', v: `${3 + (tick % 4)}`, c: t.colors.alert },
        ].map(s => (
          <motion.div key={s.l}
            animate={{ boxShadow: hovered ? `0 0 12px ${s.c}25` : 'none' }}
            style={{ background: 'rgba(1,30,30,0.8)', border: `1px solid ${s.c}20`, borderRadius: 6, padding: '5px 6px' }}
          >
            <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: 0.5 }}>{s.l}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.c, textShadow: hovered ? `0 0 8px ${s.c}` : 'none', fontFamily: t.typography.fontMono }}>{s.v}</div>
          </motion.div>
        ))}
      </div>

      {/* Glowing rows */}
      <div style={{ marginLeft: 28, margin: '3px 6px 0 34px', background: 'rgba(1,20,20,0.7)', border: '1px solid rgba(0,255,135,0.08)', borderRadius: 5, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: 2, padding: '2px 5px', background: 'rgba(0,255,135,0.03)', borderBottom: '1px solid rgba(0,255,135,0.08)' }}>
          {['ENTITY', 'TYPE', 'SIGNAL', 'HEALTH'].map(h => <div key={h} style={{ flex: 1, fontSize: 6, color: t.colors.ink3, fontWeight: 700, letterSpacing: 0.5 }}>{h}</div>)}
        </div>
        {[
          { e: 'NODE-01', type: 'CORE', sig: '98Hz', health: 100, col: t.colors.ok },
          { e: 'NODE-02', type: 'RELAY', sig: '76Hz', health: 87, col: t.colors.warn },
          { e: 'NODE-03', type: 'SENSE', sig: '112Hz', health: 94, col: t.colors.ok },
          { e: 'NODE-04', type: 'CORE', sig: `${40 + (tick % 20)}Hz`, health: 62, col: t.colors.alert },
        ].map((row, i) => (
          <motion.div
            key={row.e}
            animate={{ background: hovered && i === 3 ? 'rgba(255,68,102,0.08)' : 'transparent' }}
            style={{ display: 'flex', gap: 2, padding: '2.5px 5px', borderBottom: '1px solid rgba(0,255,135,0.05)' }}
          >
            <div style={{ flex: 1, fontSize: 7, color: t.colors.primary, textShadow: hovered ? `0 0 6px ${t.colors.primary}` : 'none' }}>{row.e}</div>
            <div style={{ flex: 1, fontSize: 7, color: t.colors.ink3 }}>{row.type}</div>
            <div style={{ flex: 1, fontSize: 7, color: t.colors.ink2, fontFamily: t.typography.fontMono }}>{row.sig}</div>
            <div style={{ flex: 1, fontSize: 7, color: row.col, fontWeight: 700, textShadow: hovered ? `0 0 6px ${row.col}` : 'none' }}>{row.health}%</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
