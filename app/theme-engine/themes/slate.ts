import type { Theme } from '../types';
const theme: Theme = {
  id: 'slate', name: 'Slate',
  description: 'Ultra-minimal slate and white — breathing room for complex data without visual noise.',
  category: 'minimal', tags: ['minimal', 'clean', 'white', 'slate', 'spacious', 'airy'],
  brand: { name: '', tagline: '', logo: '', logoAlt: '', favicon: '', stripeColors: ['#475569', '#94A3B8', '#CBD5E1', '#94A3B8', '#475569'], stripeHeight: 2 },
  colors: { bg: '#FAFAFA', bgSecondary: '#F4F4F5', bgTertiary: '#E4E4E7', panel: '#FFFFFF', panelSecondary: '#FAFAFA', tint: '#F1F5F9', ink: '#0F172A', ink2: '#334155', ink3: '#94A3B8', rule: '#E2E8F0', ruleStrong: '#CBD5E1', primary: '#475569', primaryHover: '#334155', primaryText: '#FFFFFF', accent1: '#0EA5E9', accent2: '#8B5CF6', accent3: '#10B981', accent4: '#F59E0B', accent5: '#EF4444', alert: '#EF4444', warn: '#F59E0B', ok: '#10B981', info: '#0EA5E9', navBg: '#FFFFFF', navText: '#94A3B8', navActiveText: '#0F172A', navActiveBg: 'transparent', navActiveBorder: '#0F172A', headerBg: '#FFFFFF', headerText: '#0F172A', headerBorder: '#E2E8F0' },
  typography: { fontSans: '"DM Sans", "Inter", sans-serif', fontSerif: '"DM Serif Display", Georgia, serif', fontMono: '"JetBrains Mono", monospace', xs: '10px', sm: '12px', base: '14px', md: '15px', lg: '16px', xl: '20px', '2xl': '26px', '3xl': '34px', '4xl': '44px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.8, tight_ls: '-0.4px', normal_ls: '0px', wide_ls: '0.4px', wider_ls: '1px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '40px', maxWidth: '1200px', navHeight: '52px', headerHeight: '60px' },
  borders: { radius: { none: '0', sm: '4px', md: '8px', lg: '10px', xl: '14px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(15,23,42,0.06)', md: '0 4px 12px rgba(15,23,42,0.08)', lg: '0 8px 24px rgba(15,23,42,0.1)', xl: '0 16px 48px rgba(15,23,42,0.12)', inner: 'inset 0 1px 2px rgba(15,23,42,0.04)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.22s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', navPosition: 'top', contentMaxWidth: '1200px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'breadcrumb', statLayout: 'grid-3', contentLayout: 'table-primary' },
  components: {
    button: { style: 'rounded', radius: '8px', fontWeight: 500, letterSpacing: '0px', textTransform: 'none', paddingX: '16px', paddingY: '8px' },
    card: { style: 'flat', radius: '10px', padding: '24px', shadow: '0 1px 3px rgba(15,23,42,0.06)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'enterprise', headerBg: '#F8FAFC', rowHoverBg: '#F1F5F9', borderColor: '#E2E8F0', cellPaddingX: '16px', cellPaddingY: '14px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '8px', borderColor: '#E2E8F0', focusBorderColor: '#475569', bg: '#FFFFFF', labelSize: '11px', inputSize: '14px' },
    modal: { style: 'centered', radius: '12px', shadow: '0 20px 60px rgba(15,23,42,0.12)', overlayColor: 'rgba(15,23,42,0.3)', overlayBlur: 'blur(8px)' },
    badge: { style: 'square', radius: '4px', fontSize: '10px', fontWeight: 500 },
    nav: { style: 'minimal', itemRadius: '6px', itemPadding: '8px 14px', fontSize: '14px', iconSize: 15, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '10px', valueFont: 'sans', valueFontSize: '36px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-17', updatedAt: '2026-06-17' },
};
export default theme;
