import type { Theme } from '../types';
const theme: Theme = {
  id: 'modern-healthcare', name: 'Modern Healthcare',
  description: 'Clinical teal and white — trusted, accessible healthcare platform.',
  category: 'healthcare', tags: ['teal', 'healthcare', 'clinical', 'accessible'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#00897B','#6D4C2A'], stripeHeight: 4 },
  colors: { bg: '#F0FAFA', bgSecondary: '#E3F4F4', bgTertiary: '#CFECEC', panel: '#FFFFFF', panelSecondary: '#F5FBFB', tint: '#EAF6F6', ink: '#0D2626', ink2: '#1F4B4B', ink3: '#5E8585', rule: '#C8E6E6', ruleStrong: '#A0CFCF', primary: '#00897B', primaryHover: '#00695C', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#66BB6A', accent4: '#26C6DA', accent5: '#6D4C2A', alert: '#C62828', warn: '#EF6C00', ok: '#2E7D32', info: '#0277BD', navBg: '#FFFFFF', navText: '#1F4B4B', navActiveText: '#00897B', navActiveBg: '#EAF6F6', navActiveBorder: '#00897B', headerBg: '#FFFFFF', headerText: '#0D2626', headerBorder: '#C8E6E6' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '52px', headerHeight: '68px' },
  borders: { radius: { none: '0px', sm: '4px', md: '8px', lg: '10px', xl: '14px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(0,137,123,0.08)', md: '0 4px 12px rgba(0,137,123,0.12)', lg: '0 8px 24px rgba(0,137,123,0.16)', xl: '0 20px 60px rgba(0,137,123,0.20)', inner: 'inset 0 1px 3px rgba(0,137,123,0.08)' },
  animations: { duration: { fast: '130ms', base: '230ms', slow: '380ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.23s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '220px', sidebarCollapsedWidth: '56px', navPosition: 'top', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'pills', statLayout: 'grid-3', contentLayout: 'table-primary' },
  components: {
    button: { style: 'rounded', radius: '6px', fontWeight: 600, letterSpacing: '0.2px', textTransform: 'none', paddingX: '16px', paddingY: '9px' },
    card: { style: 'soft', radius: '10px', padding: '20px', shadow: '0 4px 12px rgba(0,137,123,0.12)', borderWidth: '1px', accentWidth: '3px', accentPosition: 'left' },
    table: { style: 'minimal', headerBg: '#EAF6F6', rowHoverBg: '#E3F4F4', borderColor: '#C8E6E6', cellPaddingX: '16px', cellPaddingY: '13px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'outlined', radius: '6px', borderColor: '#C8E6E6', focusBorderColor: '#00897B', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '10px', shadow: '0 20px 60px rgba(0,137,123,0.20)', overlayColor: 'rgba(13,38,38,0.4)', overlayBlur: 'blur(3px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'pill', itemRadius: '6px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 16, showLabels: true, showIcons: true, activeIndicator: 'pill', groupHeaders: false },
    stat: { radius: '8px', valueFont: 'serif', valueFontSize: '32px', accentPosition: 'left', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
