import type { Theme } from '../types';
const theme: Theme = {
  id: 'medical-records-pro', name: 'Medical Records Pro',
  description: 'Warm parchment — the original IHMS palette, familiar and clinical.',
  category: 'healthcare', tags: ['medical', 'parchment', 'warm', 'clinical'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1E88E5','#6D4C2A'], stripeHeight: 4 },
  colors: { bg: '#F5F3EE', bgSecondary: '#EDE9E0', bgTertiary: '#E2DDD0', panel: '#FFFFFF', panelSecondary: '#FAF8F4', tint: '#F0EDE6', ink: '#1A1815', ink2: '#3D3830', ink3: '#7A7268', rule: '#DDD8CE', ruleStrong: '#C4BEB2', primary: '#4F7942', primaryHover: '#3D6032', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#4F7942', accent4: '#1E88E5', accent5: '#6D4C2A', alert: '#A63228', warn: '#C17A1A', ok: '#4F7942', info: '#1E6496', navBg: '#FFFFFF', navText: '#5A5248', navActiveText: '#4F7942', navActiveBg: '#F0EDE6', navActiveBorder: '#4F7942', headerBg: '#FFFFFF', headerText: '#1A1815', headerBorder: '#DDD8CE' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1360px', navHeight: '52px', headerHeight: '66px' },
  borders: { radius: { none: '0px', sm: '3px', md: '6px', lg: '8px', xl: '12px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(26,24,21,0.08)', md: '0 4px 12px rgba(26,24,21,0.10)', lg: '0 8px 24px rgba(26,24,21,0.14)', xl: '0 20px 60px rgba(26,24,21,0.20)', inner: 'inset 0 1px 3px rgba(26,24,21,0.08)' },
  animations: { duration: { fast: '140ms', base: '240ms', slow: '400ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.24s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '220px', sidebarCollapsedWidth: '56px', navPosition: 'top', contentMaxWidth: '1360px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'underline', statLayout: 'grid-3', contentLayout: 'table-primary' },
  components: {
    button: { style: 'rounded', radius: '5px', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'none', paddingX: '16px', paddingY: '9px' },
    card: { style: 'soft', radius: '8px', padding: '20px', shadow: '0 1px 3px rgba(26,24,21,0.08)', borderWidth: '1px', accentWidth: '3px', accentPosition: 'left' },
    table: { style: 'enterprise', headerBg: '#F0EDE6', rowHoverBg: '#EDE9E0', borderColor: '#DDD8CE', cellPaddingX: '16px', cellPaddingY: '13px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'outlined', radius: '5px', borderColor: '#DDD8CE', focusBorderColor: '#4F7942', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '8px', shadow: '0 20px 60px rgba(26,24,21,0.20)', overlayColor: 'rgba(26,24,21,0.35)', overlayBlur: 'blur(2px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'underline', itemRadius: '4px', itemPadding: '11px 14px', fontSize: '13px', iconSize: 15, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '6px', valueFont: 'serif', valueFontSize: '32px', accentPosition: 'left', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
