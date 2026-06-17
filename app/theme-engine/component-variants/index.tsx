'use client';

import React, { type CSSProperties, type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../theme-provider/ThemeContext';

// ─── Button ──────────────────────────────────────────────────────────────────

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function ThemeButton({ children, onClick, variant = 'primary', size = 'md', icon, disabled, className = '', type = 'button' }: ButtonProps) {
  const { theme } = useTheme();
  const btn = theme.components.button;
  const c = theme.colors;
  const [hov, setHov] = useState(false);

  const fontSize = size === 'sm' ? theme.typography.sm : size === 'lg' ? theme.typography.lg : theme.typography.base;
  const padding = size === 'sm' ? '5px 10px' : size === 'lg' ? `13px 24px` : `${btn.paddingY} ${btn.paddingX}`;

  const getBg = () => {
    if (variant !== 'primary') return variant === 'danger' ? c.alert : variant === 'success' ? c.ok : 'transparent';
    if (btn.style === 'gradient' && c.buttonGradient) return c.buttonGradient;
    if (btn.style === 'glow' && c.buttonGradient) return c.buttonGradient;
    return hov ? c.primaryHover : c.primary;
  };

  const getColor = () => {
    if (variant === 'ghost' || variant === 'outline') return c.ink2;
    return c.primaryText;
  };

  const getBorder = () => {
    if (variant === 'outline' || btn.style === 'outline') return `2px solid ${c.primary}`;
    if (btn.borderWidth && btn.borderColor) return `${btn.borderWidth} solid ${btn.borderColor}`;
    if (variant === 'ghost') return `1px solid ${c.rule}`;
    return 'none';
  };

  const getRadius = () => btn.style === 'pill' ? '9999px' : btn.radius;

  const getShadow = () => {
    if (!hov) return 'none';
    if ((btn.style === 'glow' || btn.style === 'gradient') && c.buttonGlow) return c.buttonGlow;
    return 'none';
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      transition={{ duration: 0.12 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: getBorder(),
        fontFamily: theme.typography.fontSans,
        fontWeight: btn.fontWeight,
        letterSpacing: btn.letterSpacing,
        textTransform: btn.textTransform as CSSProperties['textTransform'],
        borderRadius: getRadius(),
        opacity: disabled ? 0.5 : 1,
        fontSize,
        padding,
        background: getBg(),
        color: getColor(),
        boxShadow: getShadow(),
        transition: `background ${theme.animations.duration.fast}, box-shadow ${theme.animations.duration.fast}`,
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </motion.button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  accent?: string;
  padding?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function ThemeCard({ children, title, subtitle, action, accent, padding, className = '', style }: CardProps) {
  const { theme } = useTheme();
  const card = theme.components.card;
  const c = theme.colors;
  const accentPos = card.accentPosition ?? 'left';

  const getBackground = () => {
    if (card.style === 'glass') return `rgba(255,255,255,0.15)`;
    if (card.style === 'inset') return c.bgSecondary;
    return c.panel;
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        background: getBackground(),
        border: `${card.borderWidth} solid ${c.rule}`,
        borderRadius: card.radius,
        boxShadow: card.shadow,
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: card.style === 'glass' ? 'blur(12px)' : undefined,
        ...style,
      }}
    >
      {accent && accentPos === 'left' && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: card.accentWidth, background: accent }} />}
      {accent && accentPos === 'top' && <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: card.accentWidth, background: accent }} />}
      {accent && accentPos === 'right' && <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: card.accentWidth, background: accent }} />}

      {(title || action) && (
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${c.rule}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {title && <div style={{ fontFamily: theme.typography.fontMono, fontSize: theme.typography.xs, fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.ink }}>{title}</div>}
            {subtitle && <div style={{ fontSize: theme.typography.sm, color: c.ink3, marginTop: 2 }}>{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      <div style={{ padding: padding !== undefined ? (typeof padding === 'number' ? `${padding}px` : padding) : card.padding }}>
        {children}
      </div>
    </motion.div>
  );
}

// ─── Stat ────────────────────────────────────────────────────────────────────

interface StatProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  trend?: 'up' | 'down';
}

export function ThemeStat({ label, value, sub, accent, trend }: StatProps) {
  const { theme } = useTheme();
  const s = theme.components.stat;
  const c = theme.colors;
  const vFont = s.valueFont === 'mono' ? theme.typography.fontMono : s.valueFont === 'serif' ? theme.typography.fontSerif : theme.typography.fontSans;

  const getBg = () => {
    if (s.bgStyle === 'gradient' && accent) return `linear-gradient(135deg, ${accent}18, ${accent}04)`;
    if (s.bgStyle === 'glass') return 'rgba(255,255,255,0.12)';
    return c.panel;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      style={{ background: getBg(), border: `1px solid ${c.rule}`, borderRadius: theme.components.card.radius, padding: 18, position: 'relative', overflow: 'hidden' }}
    >
      {accent && s.accentPosition === 'left' && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: s.accentWidth, background: accent }} />}
      {accent && s.accentPosition === 'top' && <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: s.accentWidth, background: accent }} />}
      <div style={{ fontFamily: theme.typography.fontMono, fontSize: theme.typography.xs, letterSpacing: '1px', textTransform: 'uppercase', color: c.ink3, fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: vFont, fontSize: s.valueFontSize, fontWeight: 600, lineHeight: 1.1, marginTop: 8, color: c.ink }}>{value}</div>
      {sub && (
        <div style={{ fontSize: theme.typography.sm, color: trend === 'up' ? c.alert : trend === 'down' ? c.ok : c.ink3, marginTop: 6 }}>{sub}</div>
      )}
    </motion.div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

interface BadgeProps { children: ReactNode; bg: string; fg: string; dot?: string; }

export function ThemeBadge({ children, bg, fg, dot }: BadgeProps) {
  const { theme } = useTheme();
  const b = theme.components.badge;
  const isGlow = b.style === 'glow';

  return (
    <span style={{
      padding: b.style === 'pill' ? '3px 10px' : b.style === 'tag' ? '2px 8px 2px 6px' : '2px 7px',
      background: bg, color: fg, fontSize: b.fontSize, fontWeight: b.fontWeight,
      borderRadius: b.radius, display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: theme.typography.fontMono, letterSpacing: '0.4px',
      boxShadow: isGlow ? `0 0 8px ${fg}60` : undefined,
      border: b.style === 'outline' ? `1px solid ${fg}` : undefined,
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: dot }} />}
      {children}
    </span>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T, i: number) => ReactNode;
  mono?: boolean;
  align?: 'left' | 'right' | 'center';
}

interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function ThemeTable<T extends Record<string, unknown>>({ columns, rows, onRowClick, emptyMessage }: TableProps<T>) {
  const { theme } = useTheme();
  const tbl = theme.components.table;
  const c = theme.colors;

  const thStyle: CSSProperties = {
    textAlign: 'left', padding: `${tbl.cellPaddingY} ${tbl.cellPaddingX}`,
    fontSize: tbl.headerFontSize, letterSpacing: '1px', textTransform: 'uppercase',
    color: c.ink3, fontWeight: 600, fontFamily: theme.typography.fontMono,
    background: tbl.headerBg, borderBottom: `1px solid ${tbl.borderColor}`,
  };

  const tdStyle: CSSProperties = {
    padding: `${tbl.cellPaddingY} ${tbl.cellPaddingX}`,
    fontSize: tbl.fontSize, color: c.ink, verticalAlign: 'middle',
    borderBottom: `1px solid ${tbl.borderColor}`,
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>{columns.map(col => <th key={String(col.key)} style={{ ...thStyle, textAlign: col.align ?? 'left' }}>{col.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} style={{ ...tdStyle, textAlign: 'center', color: c.ink3 }}>{emptyMessage ?? 'No records found.'}</td></tr>
          )}
          {rows.map((row, i) => (
            <motion.tr
              key={i}
              onClick={() => onRowClick?.(row)}
              whileHover={onRowClick ? { backgroundColor: tbl.rowHoverBg } : {}}
              style={{ background: tbl.style === 'striped' && i % 2 === 1 ? tbl.stripeColor : 'transparent', cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map(col => (
                <td key={String(col.key)} style={{ ...tdStyle, textAlign: col.align ?? 'left', fontFamily: col.mono ? theme.typography.fontMono : undefined }}>
                  {col.render ? col.render(row, i) : String(row[col.key] ?? '')}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Form Field ──────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  select?: boolean;
  options?: string[];
  optionLabels?: string[];
  textarea?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
}

export function ThemeField({ label, value, onChange, type = 'text', placeholder, select, options, optionLabels, textarea, readOnly, fullWidth }: FormFieldProps) {
  const { theme } = useTheme();
  const f = theme.components.form;
  const c = theme.colors;
  const [focused, setFocused] = useState(false);

  const getInputStyle = (): CSSProperties => {
    const base: CSSProperties = {
      width: '100%', fontFamily: theme.typography.fontSans, fontSize: theme.typography.base,
      color: c.ink, outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
    };

    if (f.style === 'underlined') {
      return { ...base, padding: '8px 0', background: 'transparent', border: 'none', borderBottom: `1px solid ${focused ? f.focusBorderColor : f.borderColor}`, borderRadius: 0, resize: textarea ? 'vertical' : undefined };
    }

    return {
      ...base,
      padding: '8px 10px', background: readOnly ? c.tint : f.bg,
      border: `1px solid ${focused ? f.focusBorderColor : f.borderColor}`,
      borderRadius: f.radius,
      boxShadow: focused ? `0 0 0 3px ${f.focusBorderColor}22` : 'none',
      resize: textarea ? 'vertical' : undefined,
    };
  };

  const labelStyle: CSSProperties = {
    fontFamily: theme.typography.fontMono, fontSize: f.labelSize, fontWeight: 600,
    letterSpacing: '0.8px', textTransform: 'uppercase', color: focused ? f.focusBorderColor : c.ink3,
    marginBottom: 5, display: 'block', transition: 'color 0.15s',
  };

  return (
    <div style={{ gridColumn: fullWidth ? '1 / -1' : undefined }}>
      <label style={labelStyle}>{label}</label>
      {select ? (
        <select value={value} onChange={e => onChange?.(e.target.value)} style={getInputStyle()} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
          {(options ?? []).map((o, i) => <option key={o} value={o}>{optionLabels?.[i] ?? o}</option>)}
        </select>
      ) : textarea ? (
        <textarea value={value} onChange={e => onChange?.(e.target.value)} rows={3} placeholder={placeholder} readOnly={readOnly} style={getInputStyle()} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      ) : (
        <input type={type} value={value} onChange={onChange ? e => onChange(e.target.value) : undefined} placeholder={placeholder} readOnly={readOnly} style={getInputStyle()} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps { children: ReactNode; close: () => void; title: string; wide?: boolean; }

export function ThemeModal({ children, close, title, wide }: ModalProps) {
  const { theme } = useTheme();
  const m = theme.components.modal;
  const c = theme.colors;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      style={{ position: 'fixed', inset: 0, background: m.overlayColor, backdropFilter: m.overlayBlur, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: c.panel, borderRadius: m.radius, width: '100%', maxWidth: wide ? 900 : 560, maxHeight: '90vh', overflow: 'auto', boxShadow: m.shadow }}
      >
        <div style={{ display: 'flex', height: theme.brand.stripeHeight }}>
          {theme.brand.stripeColors.map((col, i) => <div key={i} style={{ flex: 1, background: col }} />)}
        </div>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${c.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: theme.typography.fontSerif, fontSize: theme.typography.xl, fontWeight: 600, color: c.ink }}>{title}</div>
          <button onClick={close} style={{ background: 'transparent', border: 0, color: c.ink3, padding: 4, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function ThemePanel({ children, title, subtitle, action, accent, padding }: CardProps) {
  return <ThemeCard title={title} subtitle={subtitle} action={action} accent={accent} padding={padding}>{children}</ThemeCard>;
}
