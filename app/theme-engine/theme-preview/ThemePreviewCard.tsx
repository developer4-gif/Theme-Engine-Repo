'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import type { Theme } from '../types';
import { AuroraMini, VortexMini, BioluminescentMini } from './AdvancedPreviews';

interface Props {
  theme: Theme;
  isActive: boolean;
  onApply: () => void;
  onExport: () => void;
  onDuplicate: () => void;
  onPreview: () => void;
}

// ─── Main card ────────────────────────────────────────────────────────────────

export function ThemePreviewCard({ theme: t, isActive, onApply, onExport, onDuplicate, onPreview }: Props) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  const isDark = isColorDark(t.colors.bg);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        animate={{
          boxShadow: isActive
            ? `0 0 0 2px ${t.colors.primary}, 0 16px 48px ${t.colors.primary}30`
            : hovered
              ? `0 20px 60px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.12)`
              : `0 2px 8px rgba(0,0,0,0.08)`,
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          border: isActive ? `2px solid ${t.colors.primary}` : `1px solid ${t.colors.rule}`,
          borderRadius: 14,
          overflow: 'hidden',
          background: t.colors.panel,
          cursor: 'pointer',
        }}
      >
        {/* Mini dashboard — unique per theme */}
        <div style={{ position: 'relative' }} onClick={onPreview}>
          <MiniDashboard theme={t} hovered={hovered} isDark={isDark} />
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 16px', background: t.colors.panel }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{
                fontFamily: t.typography.fontSerif,
                fontSize: 15, fontWeight: 700,
                color: t.colors.ink,
                letterSpacing: t.typography.tight_ls,
              }}>
                {t.name}
              </div>
              <div style={{ fontSize: 10, color: t.colors.ink3, marginTop: 2, lineHeight: 1.4 }}>
                {t.description.slice(0, 52)}…
              </div>
            </div>
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    padding: '3px 8px',
                    background: t.colors.primary,
                    color: t.colors.primaryText,
                    fontSize: 9, fontWeight: 800,
                    borderRadius: 9999,
                    fontFamily: t.typography.fontMono,
                    letterSpacing: '0.8px',
                    boxShadow: t.colors.buttonGlow ?? 'none',
                  }}
                >ACTIVE</motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Color dots */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 10, alignItems: 'center' }}>
            {[t.colors.primary, t.colors.accent1, t.colors.accent2, t.colors.accent3, t.colors.accent4].map((col, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.3 }}
                title={col}
                style={{
                  width: 14, height: 14,
                  borderRadius: t.components.badge.style === 'pill' ? 9999 : 3,
                  background: col,
                  border: `1px solid ${t.colors.rule}`,
                  flexShrink: 0,
                  cursor: 'default',
                }}
              />
            ))}
            <div style={{ flex: 1 }} />
            <span style={{
              fontSize: 9, color: t.colors.ink3,
              fontFamily: t.typography.fontMono,
              textTransform: 'uppercase', letterSpacing: '0.6px',
              padding: '2px 6px', background: t.colors.tint,
              borderRadius: 3,
            }}>{t.category}</span>
          </div>

          {/* Tags row */}
          <div style={{ display: 'flex', gap: 3, marginBottom: 10, flexWrap: 'wrap' }}>
            {[
              t.layout.sidebarStyle !== 'none' ? t.layout.sidebarStyle : t.layout.navBarStyle,
              t.components.button.style,
              t.layout.contentLayout.replace('-', ' '),
            ].map((tag, i) => (
              <span key={i} style={{
                padding: '2px 6px',
                background: i === 0 ? `${t.colors.primary}15` : t.colors.tint,
                color: i === 0 ? t.colors.primary : t.colors.ink3,
                fontSize: 9, borderRadius: 3,
                fontWeight: i === 0 ? 700 : 500,
                textTransform: 'uppercase', letterSpacing: '0.4px',
              }}>{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 5 }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={onApply}
              style={{
                flex: 1, padding: '8px 0',
                background: isActive
                  ? t.colors.tint
                  : (t.components.button.style === 'gradient' && t.colors.buttonGradient)
                    ? t.colors.buttonGradient
                    : t.colors.primary,
                color: isActive ? t.colors.ink2 : t.colors.primaryText,
                border: isActive ? `1px solid ${t.colors.rule}` : 0,
                borderRadius: t.components.button.style === 'pill' ? 9999 : t.components.button.radius,
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                fontFamily: t.typography.fontSans,
                letterSpacing: t.components.button.letterSpacing,
                boxShadow: !isActive && t.colors.buttonGlow ? t.colors.buttonGlow : 'none',
                transition: 'all 0.15s',
              }}
            >{isActive ? '✓ Applied' : 'Apply Theme'}</motion.button>
            {[
              { fn: onPreview, label: 'Preview', icon: '⊞' },
              { fn: onExport, label: 'Export', icon: '↓' },
              { fn: onDuplicate, label: 'Copy', icon: '⿻' },
            ].map((btn, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                whileHover={{ background: t.colors.tint }}
                onClick={btn.fn}
                title={btn.label}
                style={{
                  padding: '8px 9px',
                  background: 'transparent',
                  border: `1px solid ${t.colors.rule}`,
                  borderRadius: t.components.button.radius,
                  cursor: 'pointer', fontSize: 12,
                  color: t.colors.ink3,
                  transition: 'all 0.1s',
                }}
              >{btn.icon}</motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Theme-specific mini dashboards ──────────────────────────────────────────

function MiniDashboard({ theme: t, hovered, isDark }: { theme: Theme; hovered: boolean; isDark: boolean }) {
  const id = t.id;

  if (id === 'obsidian') return <ObsidianMini t={t} hovered={hovered} />;
  if (id === 'crystal') return <CrystalMini t={t} hovered={hovered} />;
  if (id === 'enterprise') return <EnterpriseMini t={t} hovered={hovered} />;
  if (id === 'aurelius') return <AureliusMini t={t} hovered={hovered} />;
  if (id === 'pulse') return <PulseMini t={t} hovered={hovered} />;
  if (id === 'slate') return <SlateMini t={t} hovered={hovered} />;
  if (id === 'forge') return <ForgeMini t={t} hovered={hovered} />;
  if (id === 'aurora') return <AuroraMini t={t} hovered={hovered} />;
  if (id === 'vortex') return <VortexMini t={t} hovered={hovered} />;
  if (id === 'bioluminescent') return <BioluminescentMini t={t} hovered={hovered} />;

  return <GenericMini t={t} />;
}

// ─── OBSIDIAN: Neon cyber grid, icon sidebar, live-feel chart ─────────────────

function ObsidianMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(n => n + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const bars = useMemo(() => Array.from({ length: 12 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.7 + tick * 0.3) * 60)), [tick]);

  return (
    <div style={{ height: 210, background: t.colors.bg, position: 'relative', overflow: 'hidden', fontFamily: t.typography.fontMono }}>
      {/* Grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`h${i}`} x1="0" y1={`${i * 25}%`} x2="100%" y2={`${i * 25}%`} stroke={t.colors.primary} strokeWidth="1" />
        ))}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={`v${i}`} x1={`${i * 20}%`} y1="0" x2={`${i * 20}%`} y2="100%" stroke={t.colors.primary} strokeWidth="1" />
        ))}
      </svg>

      {/* Stripe */}
      <div style={{ display: 'flex', height: t.brand.stripeHeight }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Icon sidebar */}
      <div style={{ position: 'absolute', left: 0, top: t.brand.stripeHeight, bottom: 0, width: 28, background: t.colors.navBg, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 6, borderRight: `1px solid ${t.colors.rule}` }}>
        {[t.colors.primary, t.colors.ink3, t.colors.ink3, t.colors.ink3, t.colors.ink3].map((col, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {i === 0 && (
              <div style={{ position: 'absolute', right: -1, top: 0, bottom: 0, width: 2, background: t.colors.primary, boxShadow: `0 0 6px ${t.colors.primary}` }} />
            )}
            <div style={{ width: 14, height: 14, borderRadius: 3, background: col, opacity: i === 0 ? 1 : 0.3, boxShadow: i === 0 ? `0 0 8px ${t.colors.primary}` : 'none' }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ marginLeft: 28, height: 22, background: t.colors.headerBg, borderBottom: `1px solid ${t.colors.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
        <div style={{ fontSize: 8, color: t.colors.primary, letterSpacing: 1, fontWeight: 700 }}>OBSIDIAN / DASHBOARD</div>
        <div style={{ display: 'flex', gap: 4 }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: t.colors.ok }} />
          <div style={{ fontSize: 7, color: t.colors.ink3 }}>LIVE</div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ marginLeft: 28, padding: '4px 6px', display: 'flex', gap: 4 }}>
        {[
          { label: 'TEMP', val: '38.2°C', col: t.colors.alert },
          { label: 'CPU', val: '72%', col: t.colors.primary },
          { label: 'MEM', val: '4.2G', col: t.colors.accent3 },
          { label: 'NET', val: '↑2.1M', col: t.colors.accent4 },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: t.colors.panel, border: `1px solid ${t.colors.rule}`, padding: '3px 4px', borderRadius: 3 }}>
            <div style={{ fontSize: 7, color: t.colors.ink3, letterSpacing: 0.5 }}>{s.label}</div>
            <motion.div
              animate={{ color: hovered ? s.col : t.colors.ink }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 9, fontWeight: 700, color: s.col, textShadow: hovered ? `0 0 8px ${s.col}` : 'none' }}
            >{s.val}</motion.div>
          </div>
        ))}
      </div>

      {/* Main area: chart left, table right */}
      <div style={{ marginLeft: 28, display: 'flex', gap: 4, padding: '0 6px', flex: 1 }}>
        {/* Bar chart with animation */}
        <div style={{ flex: 1.2, background: t.colors.panel, border: `1px solid ${t.colors.rule}`, borderRadius: 3, padding: '4px 3px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 7, color: t.colors.ink3, marginBottom: 3, letterSpacing: 0.5 }}>THROUGHPUT</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            {bars.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ flex: 1, background: `linear-gradient(180deg, ${t.colors.primary}, ${t.colors.primary}60)`, borderRadius: '1px 1px 0 0', boxShadow: `0 0 4px ${t.colors.primary}60`, minHeight: 2 }}
              />
            ))}
          </div>
        </div>

        {/* Data table */}
        <div style={{ flex: 1, background: t.colors.panel, border: `1px solid ${t.colors.rule}`, borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ background: t.colors.tint, padding: '2px 4px', borderBottom: `1px solid ${t.colors.rule}`, display: 'flex', gap: 3 }}>
            {['ID','STATUS','VAL'].map(h => <div key={h} style={{ flex: 1, fontSize: 6, color: t.colors.ink3, fontWeight: 700, letterSpacing: 0.5 }}>{h}</div>)}
          </div>
          {[
            { id: 'SYS-01', status: 'OK', val: '99.8', col: t.colors.ok },
            { id: 'SYS-02', status: 'WARN', val: '87.2', col: t.colors.warn },
            { id: 'SYS-03', status: 'OK', val: '94.1', col: t.colors.ok },
            { id: 'SYS-04', status: 'CRIT', val: '45.0', col: t.colors.alert },
          ].map((row, i) => (
            <motion.div
              key={row.id}
              animate={{ background: hovered && i === 1 ? t.colors.tint : 'transparent' }}
              style={{ display: 'flex', gap: 3, padding: '2px 4px', borderBottom: `1px solid ${t.colors.rule}` }}
            >
              <div style={{ flex: 1, fontSize: 7, color: t.colors.ink3, fontFamily: t.typography.fontMono }}>{row.id}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 6, color: row.col, fontWeight: 700, textShadow: hovered ? `0 0 6px ${row.col}` : 'none' }}>{row.status}</span>
              </div>
              <div style={{ flex: 1, fontSize: 7, color: t.colors.ink2 }}>{row.val}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CRYSTAL: Glassmorphism, blobs, pill nav ──────────────────────────────────

function CrystalMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  return (
    <div style={{ height: 210, background: 'linear-gradient(135deg, #F0F4FF 0%, #FAF0FF 50%, #FFF0F7 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated blobs */}
      <motion.div
        animate={{ x: hovered ? 10 : 0, y: hovered ? -8 : 0, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', filter: 'blur(20px)' }}
      />
      <motion.div
        animate={{ x: hovered ? -8 : 0, y: hovered ? 10 : 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: 10, left: 20, width: 60, height: 60, borderRadius: '50%', background: 'rgba(236,72,153,0.12)', filter: 'blur(16px)' }}
      />

      {/* Stripe */}
      <div style={{ display: 'flex', height: t.brand.stripeHeight }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Top pill nav */}
      <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(124,58,237,0.1)', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }} />
          <div style={{ width: 28, height: 4, background: t.colors.ink, borderRadius: 2, alignSelf: 'center', opacity: 0.5 }} />
        </div>
        <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,0.8)', borderRadius: 9999, padding: '2px 3px', border: '1px solid rgba(124,58,237,0.1)' }}>
          {['Home', 'Data', 'Team', 'Settings'].map((item, i) => (
            <div key={item} style={{ padding: '2px 7px', borderRadius: 9999, background: i === 0 ? 'rgba(124,58,237,0.15)' : 'transparent', fontSize: 7, color: i === 0 ? '#7C3AED' : t.colors.ink3, fontWeight: i === 0 ? 700 : 400 }}>{item}</div>
          ))}
        </div>
      </div>

      {/* Glass stat cards */}
      <div style={{ padding: '5px 8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
        {[
          { label: 'Revenue', val: '$48K', col: '#7C3AED' },
          { label: 'Users', val: '2.4K', col: '#EC4899' },
          { label: 'Growth', val: '+18%', col: '#10B981' },
          { label: 'NPS', val: '72', col: '#06B6D4' },
        ].map(s => (
          <motion.div
            key={s.label}
            whileHover={{ scale: 1.04 }}
            style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: 10, padding: '5px 5px' }}
          >
            <div style={{ fontSize: 7, color: t.colors.ink3, marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.col }}>{s.val}</div>
          </motion.div>
        ))}
      </div>

      {/* Masonry cards */}
      <div style={{ padding: '0 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        <motion.div
          animate={{ boxShadow: hovered ? '0 8px 32px rgba(124,58,237,0.15)' : '0 2px 8px rgba(124,58,237,0.05)' }}
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: 8, border: '1px solid rgba(255,255,255,0.8)' }}
        >
          <div style={{ fontSize: 8, color: '#7C3AED', fontWeight: 700, marginBottom: 4 }}>PERFORMANCE</div>
          <MiniSparkLine color="#7C3AED" height={28} />
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[{ label: 'Active', val: '89%', col: '#10B981' }, { label: 'Pending', val: '34', col: '#F59E0B' }].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '5px 7px', border: '1px solid rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 8, color: t.colors.ink3 }}>{s.label}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: s.col }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ENTERPRISE: Dense table, dark sidebar, authoritative ────────────────────

function EnterpriseMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  const rows = [
    { id: 'EMP-4821', name: 'R. Patil', dept: 'Manufacturing', status: 'Fit', blood: 'B+', statusCol: t.colors.ok },
    { id: 'EMP-4822', name: 'S. Bhosale', dept: 'Lab', status: 'Restricted', blood: 'O+', statusCol: t.colors.warn },
    { id: 'EMP-4823', name: 'A. Jadhav', dept: 'Quality', status: 'Fit', blood: 'A+', statusCol: t.colors.ok },
    { id: 'EMP-4824', name: 'P. Kulkarni', dept: 'Admin', status: 'Risk', blood: 'AB+', statusCol: t.colors.alert },
  ];

  return (
    <div style={{ height: 210, background: t.colors.bg, position: 'relative', overflow: 'hidden', fontFamily: t.typography.fontSans }}>
      {/* Stripe */}
      <div style={{ display: 'flex', height: t.brand.stripeHeight }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Dark sidebar */}
      <div style={{ position: 'absolute', left: 0, top: t.brand.stripeHeight, bottom: 0, width: 42, background: t.colors.navBg, display: 'flex', flexDirection: 'column', padding: '6px 0 0', gap: 1 }}>
        {['▪ Dashboard', '▪ Employees', '▪ Visits', '▪ Reports', '▪ Audit'].map((item, i) => (
          <div key={i} style={{
            padding: '5px 8px',
            background: i === 0 ? t.colors.navActiveBg : 'transparent',
            borderLeft: i === 0 ? `2px solid ${t.colors.navActiveBorder}` : '2px solid transparent',
          }}>
            <div style={{ width: i === 0 ? 20 : 14, height: 2.5, background: i === 0 ? '#C9A84C' : t.colors.navText, borderRadius: 1, opacity: i === 0 ? 1 : 0.4 }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ marginLeft: 42, background: t.colors.headerBg, borderBottom: `1px solid ${t.colors.headerBorder}`, padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 26 }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: t.colors.ink, letterSpacing: 0.5 }}>EMPLOYEE RECORDS</div>
        <div style={{ fontSize: 7, color: t.colors.ink3 }}>JISL · FY 2026</div>
      </div>

      {/* Stat strip */}
      <div style={{ marginLeft: 42, padding: '4px 6px', display: 'flex', gap: 3 }}>
        {[
          { l: 'TOTAL', v: '1,247', c: t.colors.accent4 },
          { l: 'FIT', v: '1,089', c: t.colors.ok },
          { l: 'RISK', v: '42', c: t.colors.alert },
          { l: 'PENDING', v: '116', c: t.colors.warn },
        ].map(s => (
          <div key={s.l} style={{ flex: 1, background: t.colors.tint, borderLeft: `2px solid ${s.c}`, padding: '2px 4px', borderRadius: '0 2px 2px 0' }}>
            <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: 0.5 }}>{s.l}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: s.c, fontFamily: t.typography.fontMono }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Dense table */}
      <div style={{ marginLeft: 42, overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 0, background: t.components.table.headerBg, borderTop: `1px solid ${t.colors.rule}`, borderBottom: `1px solid ${t.colors.rule}` }}>
          {['EMP ID', 'NAME', 'DEPT', 'STATUS', 'BLD'].map(h => (
            <div key={h} style={{ flex: h === 'NAME' ? 1.5 : 1, padding: '3px 5px', fontSize: 6, fontWeight: 700, color: t.colors.ink3, letterSpacing: 0.5, fontFamily: t.typography.fontMono }}>{h}</div>
          ))}
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.id}
            animate={{ background: hovered && i === 1 ? t.colors.tint : i % 2 === 1 ? t.components.table.stripeColor : 'transparent' }}
            style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${t.colors.rule}` }}
          >
            <div style={{ flex: 1, padding: '3px 5px', fontSize: 7, color: t.colors.ink3, fontFamily: t.typography.fontMono }}>{row.id}</div>
            <div style={{ flex: 1.5, padding: '3px 5px', fontSize: 7, color: t.colors.ink, fontWeight: 600 }}>{row.name}</div>
            <div style={{ flex: 1, padding: '3px 5px', fontSize: 7, color: t.colors.ink2 }}>{row.dept}</div>
            <div style={{ flex: 1, padding: '3px 5px' }}>
              <span style={{ fontSize: 6, color: row.statusCol, fontWeight: 700, padding: '1px 3px', background: `${row.statusCol}15`, borderRadius: 1 }}>{row.status}</span>
            </div>
            <div style={{ flex: 1, padding: '3px 5px', fontSize: 7, fontWeight: 700, color: t.colors.alert, fontFamily: t.typography.fontMono }}>{row.blood}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── AURELIUS: Private banking refinement, champagne gold on warm charcoal ────

function AureliusMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  return (
    <motion.div
      animate={{ opacity: hovered ? 1 : 0.92 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ height: 210, background: t.colors.bg, position: 'relative', overflow: 'hidden', fontFamily: t.typography.fontSerif }}
    >
      {/* 1px gold hairline top stripe */}
      <div style={{ height: 1, background: t.colors.primary, opacity: 0.7 }} />

      {/* Header — generous padding, extreme restraint */}
      <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 8, color: t.colors.ink, letterSpacing: '0.25em', fontFamily: t.typography.fontMono, fontWeight: 400 }}>AURELIUS</div>
        <div style={{ fontSize: 7, color: t.colors.ink3, letterSpacing: '0.2em', fontFamily: t.typography.fontMono }}>Q2 2026</div>
      </div>

      {/* Underline nav — gold only on active tab */}
      <div style={{ borderBottom: `1px solid ${t.colors.rule}`, display: 'flex', paddingLeft: 12, gap: 0 }}>
        {['Overview', 'Performance', 'Holdings', 'Reports'].map((item, i) => (
          <div key={item} style={{
            padding: '4px 10px 4px',
            fontSize: 7,
            color: i === 0 ? t.colors.ink2 : t.colors.ink3,
            borderBottom: i === 0 ? `1px solid ${t.colors.primary}` : '1px solid transparent',
            letterSpacing: '0.18em',
            fontFamily: t.typography.fontMono,
            marginBottom: -1,
          }}>{item}</div>
        ))}
      </div>

      {/* Body: 3-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr', gap: 0, padding: '10px 12px 0', height: 120 }}>

        {/* Col 1: Hero stat — large airy serif number */}
        <div style={{ padding: '0 12px 0 0', borderRight: `1px solid ${t.colors.rule}` }}>
          <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: '0.25em', fontFamily: t.typography.fontMono, marginBottom: 4 }}>TOTAL PORTFOLIO VALUE</div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.85 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ fontSize: 28, fontWeight: 300, color: t.colors.primary, letterSpacing: '-0.01em', lineHeight: 1.1, fontFamily: t.typography.fontSerif }}
          >₹84.2 Cr</motion.div>
          <div style={{ fontSize: 7, color: t.colors.ink2, marginTop: 4, letterSpacing: '0.05em' }}>↑ 12.4% year on year</div>
        </div>

        {/* Col 2: Two stacked stats */}
        <div style={{ padding: '0 10px', borderRight: `1px solid ${t.colors.rule}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'NET INFLOWS', val: '₹6.2 Cr', sub: 'this quarter' },
            { label: 'REALISED GAIN', val: '₹1.8 Cr', sub: 'post-tax' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: '0.22em', fontFamily: t.typography.fontMono }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 300, color: t.colors.ink, letterSpacing: '-0.01em', marginTop: 2, fontFamily: t.typography.fontSerif }}>{s.val}</div>
              <div style={{ fontSize: 6, color: t.colors.ink3, marginTop: 1, letterSpacing: '0.05em' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Col 3: Sparse label/value list */}
        <div style={{ padding: '0 0 0 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'ACCOUNTS', val: '1,247' },
            { label: 'EQUITY', val: '62%' },
            { label: 'FIXED INC', val: '28%' },
          ].map(r => (
            <div key={r.label}>
              <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: '0.2em', fontFamily: t.typography.fontMono }}>{r.label}</div>
              <div style={{ fontSize: 10, fontWeight: 300, color: t.colors.ink2, letterSpacing: '0.02em', marginTop: 1, fontFamily: t.typography.fontSerif }}>{r.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: thin rule + 2-row summary */}
      <div style={{ margin: '8px 12px 0', borderTop: `1px solid ${t.colors.rule}`, paddingTop: 6 }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { label: 'AXIS-PRIV', val: '₹18.4M', ret: '+14.2%', pos: true },
            { label: 'HDFC-CORP', val: '₹12.1M', ret: '−2.1%', pos: false },
            { label: 'SBI-BOND', val: '₹9.8M', ret: '+8.7%', pos: true },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              animate={{ background: hovered && i === 0 ? t.colors.tint : 'transparent' }}
              transition={{ duration: 0.6 }}
              style={{ flex: 1, padding: '3px 4px', borderRight: i < 2 ? `1px solid ${t.colors.rule}` : 'none' }}
            >
              <div style={{ fontSize: 6, color: t.colors.ink3, letterSpacing: '0.15em', fontFamily: t.typography.fontMono }}>{row.label}</div>
              <div style={{ fontSize: 7, color: t.colors.ink2, marginTop: 1, fontFamily: t.typography.fontSerif }}>{row.val}</div>
              <div style={{ fontSize: 6, color: row.pos ? t.colors.ok : t.colors.ink3, marginTop: 1 }}>{row.ret}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── PULSE: Vibrant SaaS, pill nav, cards, energy ───────────────────────────

function PulseMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(n => (n + 1) % 4), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: 210, background: t.colors.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Warm gradient wash */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(255,142,83,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Stripe */}
      <div style={{ display: 'flex', height: t.brand.stripeHeight }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>

      {/* Top nav */}
      <div style={{ background: 'rgba(255,255,255,0.95)', borderBottom: `1px solid ${t.colors.rule}`, padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' }} />
          <div style={{ fontSize: 9, fontWeight: 700, color: t.colors.ink }}>Pulse</div>
        </div>
        {/* Pill nav */}
        <div style={{ display: 'flex', gap: 2, background: t.colors.tint, borderRadius: 9999, padding: '2px' }}>
          {['Home', 'Metrics', 'Team', 'Docs'].map((item, i) => (
            <motion.div
              key={item}
              animate={{ background: i === active % 4 ? '#FFFFFF' : 'transparent', boxShadow: i === active % 4 ? '0 1px 4px rgba(255,107,107,0.2)' : 'none' }}
              style={{ padding: '2px 8px', borderRadius: 9999, fontSize: 7, color: i === active % 4 ? t.colors.primary : t.colors.ink3, fontWeight: i === active % 4 ? 700 : 400, cursor: 'default' }}
            >{item}</motion.div>
          ))}
        </div>
      </div>

      {/* Stat cards — masonry */}
      <div style={{ padding: '5px 7px 3px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
        {[
          { l: 'MRR', v: '$94K', c: t.colors.primary, delta: '+22%' },
          { l: 'DAU', v: '12.8K', c: t.colors.accent3, delta: '+8%' },
          { l: 'Churn', v: '1.2%', c: t.colors.accent2, delta: '-0.3%' },
          { l: 'NPS', v: '78', c: t.colors.accent4, delta: '+4' },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            animate={{ y: hovered && i % 2 === 0 ? -2 : 0, boxShadow: hovered ? `0 4px 16px ${s.c}25` : '0 1px 4px rgba(0,0,0,0.05)' }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{ background: '#FFFFFF', borderRadius: 12, padding: '5px 6px', border: `1px solid ${t.colors.rule}` }}
          >
            <div style={{ fontSize: 7, color: t.colors.ink3 }}>{s.l}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 7, color: t.colors.ok }}>{s.delta}</div>
          </motion.div>
        ))}
      </div>

      {/* 2×2 cards */}
      <div style={{ padding: '0 7px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 7, border: `1px solid ${t.colors.rule}` }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: t.colors.primary, marginBottom: 4 }}>WEEKLY GROWTH</div>
          <MiniSparkLine color={t.colors.primary} height={30} fill />
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 7, border: `1px solid ${t.colors.rule}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[{ l: 'Deals closed', v: 24, col: t.colors.accent3 }, { l: 'Pipeline', v: 89, col: t.colors.primary }].map(s => (
            <div key={s.l}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: 7, color: t.colors.ink3 }}>{s.l}</span>
                <span style={{ fontSize: 7, fontWeight: 700, color: s.col }}>{s.v}%</span>
              </div>
              <div style={{ height: 4, background: t.colors.rule, borderRadius: 9999 }}>
                <motion.div
                  animate={{ width: hovered ? `${s.v}%` : '30%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', background: s.col, borderRadius: 9999 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SLATE: Clean minimal, breadcrumb, pristine data ────────────────────────

function SlateMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  return (
    <div style={{ height: 210, background: '#FAFAFA', position: 'relative', overflow: 'hidden', fontFamily: t.typography.fontSans }}>
      {/* Stripe */}
      <div style={{ height: t.brand.stripeHeight, background: 'linear-gradient(90deg, #475569, #94A3B8, #475569)' }} />

      {/* Header */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, background: '#475569' }} />
          <div style={{ fontSize: 9, fontWeight: 600, color: '#0F172A' }}>Slate</div>
        </div>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {['Home', '›', 'Records', '›', 'Active'].map((item, i) => (
            <span key={i} style={{ fontSize: 8, color: i === 4 ? '#0F172A' : '#94A3B8', fontWeight: i === 4 ? 600 : 400 }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Stats grid-3 */}
      <div style={{ padding: '6px 10px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
        {[
          { l: 'Active records', v: '2,847', c: '#0EA5E9' },
          { l: 'Completed', v: '18,402', c: '#10B981' },
          { l: 'Flagged', v: '23', c: '#EF4444' },
        ].map(s => (
          <motion.div
            key={s.l}
            animate={{ boxShadow: hovered ? '0 4px 12px rgba(15,23,42,0.08)' : '0 1px 3px rgba(15,23,42,0.04)' }}
            style={{ background: '#FFFFFF', borderRadius: 8, padding: '6px 8px', border: '1px solid #E2E8F0' }}
          >
            <div style={{ fontSize: 7, color: '#94A3B8', marginBottom: 2 }}>{s.l}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{s.v}</div>
            <div style={{ width: '60%', height: 2, background: s.c, borderRadius: 1, marginTop: 3 }} />
          </motion.div>
        ))}
      </div>

      {/* Clean table */}
      <div style={{ margin: '0 10px', background: '#FFFFFF', borderRadius: 8, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', padding: '4px 8px' }}>
          {['NAME', 'DEPT', 'STATUS', 'DATE'].map(h => (
            <div key={h} style={{ flex: 1, fontSize: 7, color: '#94A3B8', fontWeight: 600, letterSpacing: 0.8 }}>{h}</div>
          ))}
        </div>
        {[
          { n: 'R. Patil', d: 'Ops', s: 'Active', date: '14 Jun', sc: '#10B981' },
          { n: 'S. Bhosale', d: 'Lab', s: 'Review', date: '12 Jun', sc: '#F59E0B' },
          { n: 'A. Jadhav', d: 'QC', s: 'Active', date: '11 Jun', sc: '#10B981' },
        ].map((row, i) => (
          <motion.div
            key={row.n}
            animate={{ background: hovered && i === 1 ? '#F8FAFC' : '#FFFFFF' }}
            style={{ display: 'flex', padding: '5px 8px', borderBottom: '1px solid #F1F5F9' }}
          >
            <div style={{ flex: 1, fontSize: 8, color: '#0F172A', fontWeight: 500 }}>{row.n}</div>
            <div style={{ flex: 1, fontSize: 8, color: '#94A3B8' }}>{row.d}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 7, color: row.sc, background: `${row.sc}15`, padding: '1px 4px', borderRadius: 3, fontWeight: 600 }}>{row.s}</span>
            </div>
            <div style={{ flex: 1, fontSize: 8, color: '#CBD5E1' }}>{row.date}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── FORGE: Industrial dark, hero stat, dense, amber glow ───────────────────

function ForgeMini({ t, hovered }: { t: Theme; hovered: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(n => (n + 1) % 100), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: 210, background: '#0D0D0D', position: 'relative', overflow: 'hidden', fontFamily: '"JetBrains Mono", monospace' }}>
      {/* Amber gradient top */}
      <div style={{ height: t.brand.stripeHeight, background: 'linear-gradient(90deg, #FF8F00, #E65100, #FF8F00)' }} />

      {/* Icon sidebar */}
      <div style={{ position: 'absolute', left: 0, top: t.brand.stripeHeight, bottom: 0, width: 28, background: '#0D0D0D', borderRight: '1px solid #2A1F0A', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6, gap: 6 }}>
        {[t.colors.primary, t.colors.ink3, t.colors.ink3, t.colors.ink3].map((col, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {i === 0 && <div style={{ position: 'absolute', right: -1, top: 0, bottom: 0, width: 2, background: '#FF8F00', boxShadow: '0 0 6px #FF8F00' }} />}
            <div style={{ width: 14, height: 14, borderRadius: 2, background: col, opacity: i === 0 ? 0.9 : 0.25, boxShadow: i === 0 ? '0 0 8px rgba(255,143,0,0.5)' : 'none' }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ marginLeft: 28, background: '#0D0D0D', borderBottom: '1px solid #2A1F0A', padding: '4px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 22 }}>
        <div style={{ fontSize: 8, color: '#FF8F00', letterSpacing: 1.5, fontWeight: 700 }}>FORGE // OPERATIONS</div>
        <motion.div
          animate={{ opacity: tick % 2 === 0 ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 7, color: t.colors.ok }}
        >● LIVE</motion.div>
      </div>

      {/* Hero stat */}
      <div style={{ marginLeft: 28, padding: '5px 8px 3px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 4 }}>
        <div style={{ background: '#141414', border: '1px solid #2A1F0A', borderTop: '2px solid #FF8F00', padding: '6px 8px' }}>
          <div style={{ fontSize: 7, color: t.colors.ink3, letterSpacing: 1 }}>OUTPUT / SHIFT</div>
          <motion.div
            animate={{ textShadow: hovered ? '0 0 20px rgba(255,143,0,0.8)' : 'none' }}
            style={{ fontSize: 26, fontWeight: 700, color: '#FF8F00', lineHeight: 1, marginTop: 2 }}
          >
            {4200 + (tick * 3) % 100}
          </motion.div>
          <div style={{ fontSize: 7, color: t.colors.ink3, marginTop: 1 }}>UNITS · TARGET: 5000</div>
          <div style={{ height: 3, background: '#2A1F0A', borderRadius: 1, marginTop: 4 }}>
            <motion.div
              animate={{ width: `${Math.min(85 + (tick % 5), 100)}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #FF8F00, #FFC107)', borderRadius: 1 }}
            />
          </div>
        </div>
        {[
          { l: 'MACHINE', v: tick % 2 === 0 ? 'RUN' : 'RUN', c: t.colors.ok },
          { l: 'QUALITY', v: '94.2%', c: t.colors.primary },
        ].map(s => (
          <div key={s.l} style={{ background: '#141414', border: '1px solid #2A1F0A', padding: '5px 6px' }}>
            <div style={{ fontSize: 7, color: t.colors.ink3, letterSpacing: 1 }}>{s.l}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.c, marginTop: 3, textShadow: hovered ? `0 0 8px ${s.c}` : 'none' }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Dense data table */}
      <div style={{ marginLeft: 28, margin: '3px 8px 0 36px' }}>
        <div style={{ background: '#1A1208', borderTop: '1px solid #2A1F0A', display: 'flex', padding: '2px 6px' }}>
          {['STATION', 'OPR', 'STATUS', 'EFF%', 'TEMP'].map(h => (
            <div key={h} style={{ flex: 1, fontSize: 6, color: t.colors.ink3, letterSpacing: 0.8, fontWeight: 700 }}>{h}</div>
          ))}
        </div>
        {[
          { st: 'ST-01', op: 'WLD', status: 'RUN', eff: '98.2', temp: '312°', ec: t.colors.ok },
          { st: 'ST-02', op: 'MLD', status: 'IDLE', eff: '0.0', temp: '180°', ec: t.colors.ink3 },
          { st: 'ST-03', op: 'QC', status: 'RUN', eff: '94.1', temp: '28°', ec: t.colors.ok },
          { st: 'ST-04', op: 'PKG', status: 'WARN', eff: '72.8', temp: '38°', ec: t.colors.warn },
        ].map((row, i) => (
          <motion.div
            key={row.st}
            animate={{ background: hovered && row.status === 'WARN' ? '#1F1500' : 'transparent' }}
            style={{ display: 'flex', padding: '2px 6px', borderTop: '1px solid #2A1F0A' }}
          >
            <div style={{ flex: 1, fontSize: 7, color: '#FF8F00', fontWeight: 600 }}>{row.st}</div>
            <div style={{ flex: 1, fontSize: 7, color: t.colors.ink3 }}>{row.op}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 6, color: row.ec, fontWeight: 700 }}>{row.status}</span>
            </div>
            <div style={{ flex: 1, fontSize: 7, color: row.ec }}>{row.eff}</div>
            <div style={{ flex: 1, fontSize: 7, color: t.colors.ink2 }}>{row.temp}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Generic fallback ─────────────────────────────────────────────────────────

function GenericMini({ t }: { t: Theme }) {
  return (
    <div style={{ height: 210, background: t.colors.bg, overflow: 'hidden' }}>
      <div style={{ display: 'flex', height: t.brand.stripeHeight }}>
        {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
      </div>
      <div style={{ background: t.colors.headerBg, borderBottom: `1px solid ${t.colors.rule}`, padding: '6px 10px', height: 28 }}>
        <div style={{ width: 60, height: 8, background: t.colors.ink3, borderRadius: 2, opacity: 0.3 }} />
      </div>
      <div style={{ padding: '10px 10px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
        {[t.colors.primary, t.colors.accent3, t.colors.accent4, t.colors.accent1].map((col, i) => (
          <div key={i} style={{ background: t.colors.panel, border: `2px solid ${col}`, borderRadius: t.components.card.radius, padding: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: t.typography.fontMono }}>{28 + i * 7}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 10px', background: t.colors.panel, border: `1px solid ${t.colors.rule}`, borderRadius: t.components.card.radius, overflow: 'hidden' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', gap: 6, padding: '5px 8px', borderBottom: `1px solid ${t.colors.rule}`, background: i % 2 === 1 ? t.colors.tint : 'transparent' }}>
            {[35, 55, 40].map((w, j) => (
              <div key={j} style={{ width: `${w}%`, height: 6, background: t.colors.ink3, borderRadius: 2, opacity: 0.15 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function MiniSparkLine({ color, height = 32, fill = false }: { color: string; height?: number; fill?: boolean }) {
  const pts = [30, 45, 38, 62, 54, 78, 68, 85, 72, 90];
  const w = 100, h = height;
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / 100) * h}`).join(' ');
  const safeId = color.replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {fill && (
        <defs>
          <linearGradient id={`sf${safeId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
      )}
      {fill && <polyline points={`0,${h} ${path} ${w},${h}`} fill={`url(#sf${safeId})`} stroke="none" />}
      <polyline points={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function isColorDark(color: string): boolean {
  if (!color.startsWith('#')) return false;
  const hex = color.replace('#', '');
  if (hex.length < 6) return false;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.4;
}

// ─── Full Theme Preview ───────────────────────────────────────────────────────

export function ThemeFullPreview({ theme: t, close }: { theme: Theme; close: () => void }) {
  const isDark = isColorDark(t.colors.bg);
  // The mini dashboard is 300px wide × 210px tall (card width).
  // We scale it up to fill the preview area while preserving exact look.
  const MINI_W = 300;
  const MINI_H = 210;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={close}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      {/* Modal panel — stop propagation so clicks inside don't close */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 900, background: t.colors.panel, borderRadius: 16, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', border: `1px solid ${t.colors.rule}` }}
      >
        {/* Brand stripe */}
        <div style={{ display: 'flex', height: Math.max(t.brand.stripeHeight, 3) }}>
          {t.brand.stripeColors.map((c, i) => <div key={i} style={{ flex: 1, background: c }} />)}
        </div>

        {/* Modal header */}
        <div style={{ padding: '14px 20px', background: t.colors.headerBg, borderBottom: `1px solid ${t.colors.headerBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: t.borders.radius.sm, background: t.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: t.colors.primaryText, fontFamily: t.typography.fontMono }}>T</div>
            <div>
              <div style={{ fontFamily: t.typography.fontMono, fontSize: 8, color: t.colors.ink3, letterSpacing: 2, textTransform: 'uppercase' }}>Theme Preview</div>
              <div style={{ fontFamily: t.typography.fontSerif, fontSize: 16, fontWeight: 700, color: t.colors.headerText, letterSpacing: t.typography.tight_ls }}>{t.name}</div>
            </div>
            <div style={{ marginLeft: 8, padding: '2px 10px', background: `${t.colors.primary}18`, border: `1px solid ${t.colors.primary}40`, borderRadius: 9999, fontSize: 10, color: t.colors.primary, fontFamily: t.typography.fontMono, letterSpacing: 1 }}>{t.category.toUpperCase()}</div>
          </div>
          <button
            onClick={close}
            style={{ padding: '6px 14px', background: 'transparent', color: t.colors.ink2, border: `1px solid ${t.colors.rule}`, borderRadius: t.components.button.radius, cursor: 'pointer', fontFamily: t.typography.fontSans, fontSize: 12 }}
          >✕ Close</button>
        </div>

        {/* Scaled dashboard — exact same content as the card, just bigger */}
        <div style={{ position: 'relative', overflow: 'hidden', background: t.colors.bg }}>
          {/* We scale the mini dashboard up. The container height = MINI_H * scale */}
          <FullScaledDashboard theme={t} isDark={isDark} miniW={MINI_W} miniH={MINI_H} />
        </div>

        {/* Footer: theme meta + tags */}
        <div style={{ padding: '12px 20px', background: t.colors.headerBg, borderTop: `1px solid ${t.colors.headerBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontSize: 12, color: t.colors.ink2, lineHeight: 1.5, flex: 1 }}>{t.description}</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {t.tags.slice(0, 5).map(tag => (
              <span key={tag} style={{ padding: '2px 8px', background: t.colors.tint, border: `1px solid ${t.colors.rule}`, borderRadius: 9999, fontSize: 10, color: t.colors.ink3, fontFamily: t.typography.fontMono }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FullScaledDashboard({ theme: t, isDark, miniW, miniH }: { theme: Theme; isDark: boolean; miniW: number; miniH: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const availW = containerRef.current.offsetWidth;
      setScale(availW / miniW);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [miniW]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: miniH * scale, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: miniW,
        height: miniH,
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        pointerEvents: 'none',
      }}>
        <MiniDashboard theme={t} hovered={true} isDark={isDark} />
      </div>
    </div>
  );
}

