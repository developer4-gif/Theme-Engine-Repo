import type { Theme } from '../types';
const theme: Theme = {
  id: 'minimal-white', name: 'Minimal White',
  description: 'Pure white with zero decoration — content-first minimalism.',
  category: 'minimal', tags: ['white', 'minimal', 'clean', 'flat'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#E5E7EB','#D1D5DB','#9CA3AF','#6B7280','#374151'], stripeHeight: 2 },
  colors: { bg: '#FFFFFF', bgSecondary: '#FAFAFA', bgTertiary: '#F5F5F5', panel: '#FFFFFF', panelSecondary: '#FAFAFA', tint: '#F5F5F5', ink: '#111111', ink2: '#444444', ink3: '#999999', rule: '#EEEEEE', ruleStrong: '#DDDDDD', primary: '#111111', primaryHover: '#000000', primaryText: '#FFFFFF', accent1: '#111111', accent2: '#444444', accent3: '#777777', accent4: '#AAAAAA', accent5: '#CCCCCC', alert: '#CC0000', warn: '#AA6600', ok: '#006633', info: '#004488', navBg: '#FFFFFF', navText: '#888888', navActiveText: '#111111', navActiveBg: 'transparent', navActiveBorder: '#111111', headerBg: '#FFFFFF', headerText: '#111111', headerBorder: '#EEEEEE' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '30px', '4xl': '38px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.6, relaxed: 1.8, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.5px', wider_ls: '1px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '40px', maxWidth: '1200px', navHeight: '48px', headerHeight: '60px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '8px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 2px rgba(0,0,0,0.04)', md: '0 2px 6px rgba(0,0,0,0.06)', lg: '0 4px 12px rgba(0,0,0,0.08)', xl: '0 10px 30px rgba(0,0,0,0.12)', inner: 'inset 0 1px 2px rgba(0,0,0,0.04)' },
  animations: { duration: { fast: '100ms', base: '180ms', slow: '320ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.18s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '200px', sidebarCollapsedWidth: '48px', navPosition: 'top', contentMaxWidth: '1200px', headerSticky: true, navSticky: false, sidebarStyle: 'none', navBarStyle: 'classic', statLayout: 'grid-4', contentLayout: 'table-primary' },
  components: {
    button: { style: 'sharp', radius: '3px', fontWeight: 500, letterSpacing: '0.3px', textTransform: 'none', paddingX: '14px', paddingY: '8px', borderWidth: '1px', borderColor: '#DDDDDD' },
    card: { style: 'bordered', radius: '4px', padding: '20px', shadow: 'none', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#FAFAFA', rowHoverBg: '#FAFAFA', borderColor: '#EEEEEE', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '3px', borderColor: '#DDDDDD', focusBorderColor: '#111111', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '6px', shadow: '0 10px 30px rgba(0,0,0,0.12)', overlayColor: 'rgba(0,0,0,0.2)', overlayBlur: 'none' },
    badge: { style: 'square', radius: '2px', fontSize: '10px', fontWeight: 500 },
    nav: { style: 'underline', itemRadius: '0px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 14, showLabels: true, showIcons: false, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '4px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
