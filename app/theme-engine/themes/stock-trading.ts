import type { Theme } from '../types';

const theme: Theme = {
  id: 'stock-trading',
  name: 'Stock Trading',
  description: 'Fast trading interface — candlestick chart, order panel, watchlist, P&L tracker. Inspired by retail stock trading mobile apps.',
  category: 'finance',
  tags: ["finance","stocks","trading","mobile","dark","chart","watchlist","investor"],
  brand: { name: 'Stock Trading', tagline: '', logo: '', logoAlt: 'Stock Trading', favicon: '', stripeColors: ['#00C853', '#060E17', '#FF3D4A', '#060E17', '#00C853'], stripeHeight: 3 },
  colors: {
    bg: '#060E17', bgSecondary: '#0A1622', bgTertiary: '#121E2E', panel: '#121E2E', panelSecondary: '#0A1622',
    tint: 'rgba(0,200,83,0.08)', ink: '#FFFFFF', ink2: '#8AAAC4', ink3: '#4A6A84', rule: '#121E2E', ruleStrong: '#1A2A3E',
    primary: '#00C853', primaryHover: '#00A040', primaryText: '#060E17',
    accent1: '#00C853', accent2: '#FF3D4A', accent3: '#FFD700', accent4: '#00BFFF', accent5: '#BF5FFF',
    alert: '#BF5FFF', warn: '#FFD700', ok: '#FF3D4A', info: '#00BFFF',
    navBg: '#060E17', navText: '#4A6A84', navActiveText: '#00C853', navActiveBg: 'rgba(0,200,83,0.08)', navActiveBorder: '#00C853',
    headerBg: '#060E17', headerText: '#FFFFFF', headerBorder: '#121E2E',
  },
  typography: { fontSans: '"JetBrains Mono", "Inter", monospace', fontSerif: '"Georgia", serif', fontMono: '"SF Mono", monospace', headingFont: 'mono', xs: '10px', sm: '12px', base: '14px', md: '16px', lg: '18px', xl: '22px', '2xl': '28px', '3xl': '36px', '4xl': '48px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.15, normal: 1.55, relaxed: 1.75, tight_ls: '-0.01em', normal_ls: '0em', wide_ls: '0.02em', wider_ls: '0.05em' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '20px', maxWidth: '480px', navHeight: '60px', headerHeight: '56px' },
  borders: { radius: { none: '0', sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 8px rgba(0,0,0,0.08)', md: '0 4px 20px rgba(0,0,0,0.10)', lg: '0 8px 32px rgba(0,0,0,0.12)', xl: '0 16px 48px rgba(0,0,0,0.15)', inner: 'inset 0 1px 3px rgba(0,0,0,0.05)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: '220ms' },
  layout: { variant: 'minimal', navPosition: 'top', sidebarStyle: 'none', navBarStyle: 'none', statLayout: 'hero-stat', contentLayout: 'cards-masonry', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', headerSticky: true, navSticky: true, contentMaxWidth: '480px' },
  components: {
    button: { style: 'rounded', radius: '6px', fontWeight: 600, letterSpacing: '0em', textTransform: 'none', paddingX: '24px', paddingY: '14px' },
    card: { style: 'bordered', radius: '8px', padding: '20px', shadow: '0 2px 16px rgba(0,0,0,0.08)', borderWidth: '0px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#0A1622', rowHoverBg: 'rgba(0,0,0,0.03)', borderColor: '#121E2E', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'rgba(0,0,0,0.02)', density: 'relaxed' },
    form: { style: 'outlined', radius: '10px', borderColor: '#1A2A3E', focusBorderColor: '#00C853', bg: '#121E2E', labelSize: '12px', inputSize: '16px' },
    modal: { style: 'bottom-sheet', radius: '20px', shadow: '0 -4px 40px rgba(0,0,0,0.12)', overlayColor: 'rgba(0,0,0,0.5)', overlayBlur: 'blur(8px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '11px', fontWeight: 600 },
    nav: { style: 'minimal', itemRadius: '0px', itemPadding: '12px 8px', fontSize: '10px', iconSize: 22, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '12px', valueFont: 'sans', valueFontSize: '44px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-22', updatedAt: '2026-06-22' },
};
export default theme;
