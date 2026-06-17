import type { Theme } from '../types';
const theme: Theme = {
  id: 'government-portal', name: 'Government Portal',
  description: 'Tricolor-accented federal style — accessible, compliant, authoritative.',
  category: 'government', tags: ['government', 'tricolor', 'accessible', 'federal'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FF9933','#FFFFFF','#138808','#000080','#6D4C2A'], stripeHeight: 5 },
  colors: { bg: '#F2F2F2', bgSecondary: '#E8E8E8', bgTertiary: '#DCDCDC', panel: '#FFFFFF', panelSecondary: '#F8F8F8', tint: '#F0F0F0', ink: '#1A1A1A', ink2: '#3A3A3A', ink3: '#777777', rule: '#D4D4D4', ruleStrong: '#BBBBBB', primary: '#000080', primaryHover: '#00006A', primaryText: '#FFFFFF', accent1: '#FF9933', accent2: '#138808', accent3: '#000080', accent4: '#8B4513', accent5: '#6D4C2A', alert: '#CC0000', warn: '#FF6600', ok: '#007700', info: '#000080', navBg: '#000080', navText: '#99AACC', navActiveText: '#FFFFFF', navActiveBg: '#00006A', navActiveBorder: '#FF9933', headerBg: '#000080', headerText: '#FFFFFF', headerBorder: '#00006A' },
  typography: { fontSans: '"Noto Sans", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '12px', base: '14px', md: '14px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '30px', '4xl': '38px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.2, normal: 1.6, relaxed: 1.8, tight_ls: '-0.3px', normal_ls: '0px', wide_ls: '0.5px', wider_ls: '1px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1200px', navHeight: '56px', headerHeight: '72px' },
  borders: { radius: { none: '0px', sm: '0px', md: '2px', lg: '4px', xl: '6px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 2px rgba(0,0,0,0.08)', md: '0 2px 6px rgba(0,0,0,0.10)', lg: '0 4px 12px rgba(0,0,0,0.12)', xl: '0 12px 36px rgba(0,0,0,0.16)', inner: 'inset 0 1px 2px rgba(0,0,0,0.08)' },
  animations: { duration: { fast: '150ms', base: '250ms', slow: '400ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.25s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'top', contentMaxWidth: '1200px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'full-bg', statLayout: 'grid-4', contentLayout: 'table-primary' },
  components: {
    button: { style: 'sharp', radius: '0px', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'none', paddingX: '18px', paddingY: '10px' },
    card: { style: 'bordered', radius: '2px', padding: '20px', shadow: 'none', borderWidth: '1px', accentWidth: '4px', accentPosition: 'top' },
    table: { style: 'bordered', headerBg: '#F0F0F0', rowHoverBg: '#F8F8F8', borderColor: '#D4D4D4', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '0px', borderColor: '#D4D4D4', focusBorderColor: '#000080', bg: '#FFFFFF', labelSize: '11px', inputSize: '14px' },
    modal: { style: 'centered', radius: '0px', shadow: '0 12px 36px rgba(0,0,0,0.16)', overlayColor: 'rgba(0,0,0,0.4)', overlayBlur: 'none' },
    badge: { style: 'square', radius: '0px', fontSize: '11px', fontWeight: 600 },
    nav: { style: 'underline', itemRadius: '0px', itemPadding: '14px 18px', fontSize: '14px', iconSize: 16, showLabels: true, showIcons: false, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '2px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'top', accentWidth: '4px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
