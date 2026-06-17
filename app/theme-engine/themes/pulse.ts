import type { Theme } from '../types';
const theme: Theme = {
  id: 'pulse', name: 'Pulse',
  description: 'High-energy SaaS with coral gradients — pill navigation and masonry cards for modern dashboards.',
  category: 'startup', tags: ['saas', 'startup', 'coral', 'vibrant', 'pills', 'modern'],
  brand: { name: '', tagline: '', logo: '', logoAlt: '', favicon: '', stripeColors: ['#FF6B6B', '#FF8E53', '#FFD93D', '#6BCB77', '#4ECDC4'], stripeHeight: 4 },
  colors: { bg: '#FFF8F5', bgSecondary: '#FFF0EA', bgTertiary: '#FFE4D6', panel: '#FFFFFF', panelSecondary: '#FFF8F5', tint: '#FFF0EA', ink: '#1A0A00', ink2: '#5C2D0A', ink3: '#B87355', rule: '#FFD4BE', ruleStrong: '#FFB899', primary: '#FF6B6B', primaryHover: '#FF5252', primaryText: '#FFFFFF', accent1: '#FF8E53', accent2: '#FFD93D', accent3: '#6BCB77', accent4: '#4ECDC4', accent5: '#845EC2', alert: '#EF4444', warn: '#F59E0B', ok: '#6BCB77', info: '#4ECDC4', navBg: '#FFFFFF', navText: '#B87355', navActiveText: '#FF6B6B', navActiveBg: '#FFF0EA', navActiveBorder: '#FF6B6B', headerBg: '#FFFFFF', headerText: '#1A0A00', headerBorder: '#FFD4BE', buttonGradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', buttonGlow: '0 4px 20px rgba(255,107,107,0.4)' },
  typography: { fontSans: '"Plus Jakarta Sans", "Inter", sans-serif', fontSerif: '"Plus Jakarta Sans", sans-serif', fontMono: '"Fira Code", monospace', xs: '9px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '32px', '4xl': '40px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.5px', wider_ls: '1px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1280px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0', sm: '8px', md: '12px', lg: '16px', xl: '20px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 2px 8px rgba(255,107,107,0.08)', md: '0 4px 20px rgba(255,107,107,0.12)', lg: '0 8px 40px rgba(255,107,107,0.16)', xl: '0 16px 64px rgba(255,107,107,0.2)', inner: 'inset 0 2px 6px rgba(255,107,107,0.06)' },
  animations: { duration: { fast: '150ms', base: '280ms', slow: '450ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.28s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', navPosition: 'top', contentMaxWidth: '1280px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'pills', statLayout: 'grid-4', contentLayout: 'cards-masonry' },
  components: {
    button: { style: 'gradient', radius: '9999px', fontWeight: 600, letterSpacing: '0px', textTransform: 'none', paddingX: '20px', paddingY: '10px' },
    card: { style: 'soft', radius: '16px', padding: '24px', shadow: '0 2px 16px rgba(255,107,107,0.08)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#FFF8F5', rowHoverBg: '#FFF0EA', borderColor: '#FFD4BE', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'filled', radius: '12px', borderColor: 'transparent', focusBorderColor: '#FF6B6B', bg: '#FFF0EA', labelSize: '11px', inputSize: '13px' },
    modal: { style: 'centered', radius: '20px', shadow: '0 20px 64px rgba(255,107,107,0.2)', overlayColor: 'rgba(26,10,0,0.4)', overlayBlur: 'blur(12px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'pill', itemRadius: '9999px', itemPadding: '8px 18px', fontSize: '14px', iconSize: 16, showLabels: true, showIcons: true, activeIndicator: 'pill', groupHeaders: false },
    stat: { radius: '16px', valueFont: 'sans', valueFontSize: '34px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'gradient' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-17', updatedAt: '2026-06-17' },
};
export default theme;
