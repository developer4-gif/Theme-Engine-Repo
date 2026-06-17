import type { Theme } from '../types';
const theme: Theme = {
  id: 'emerald-business', name: 'Emerald Business',
  description: 'Rich emerald green enterprise — growth, vitality, precision.',
  category: 'corporate', tags: ['emerald', 'green', 'business', 'enterprise'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#00695C','#26A69A','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#F0FAF8', bgSecondary: '#E0F5F0', bgTertiary: '#CCF0E8', panel: '#FFFFFF', panelSecondary: '#F5FCFA', tint: '#E8F8F4', ink: '#0A2020', ink2: '#1A4040', ink3: '#5A8080', rule: '#B8E0D8', ruleStrong: '#90CABA', primary: '#00695C', primaryHover: '#004D40', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#26A69A', accent4: '#1E88E5', accent5: '#6D4C2A', alert: '#C62828', warn: '#E65100', ok: '#00695C', info: '#1E88E5', navBg: '#00695C', navText: '#80CBC4', navActiveText: '#FFFFFF', navActiveBg: '#004D40', navActiveBorder: '#FDD835', headerBg: '#FFFFFF', headerText: '#0A2020', headerBorder: '#B8E0D8' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '68px' },
  borders: { radius: { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '12px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(0,105,92,0.08)', md: '0 4px 12px rgba(0,105,92,0.12)', lg: '0 8px 24px rgba(0,105,92,0.16)', xl: '0 20px 60px rgba(0,105,92,0.20)', inner: 'inset 0 1px 3px rgba(0,105,92,0.08)' },
  animations: { duration: { fast: '140ms', base: '240ms', slow: '400ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.24s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'gradient', navBarStyle: 'none', statLayout: 'grid-3', contentLayout: 'split-kanban' },
  components: {
    button: { style: 'rounded', radius: '6px', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'none', paddingX: '16px', paddingY: '9px' },
    card: { style: 'soft', radius: '8px', padding: '20px', shadow: '0 4px 12px rgba(0,105,92,0.12)', borderWidth: '1px', accentWidth: '3px', accentPosition: 'left' },
    table: { style: 'minimal', headerBg: '#E8F8F4', rowHoverBg: '#E0F5F0', borderColor: '#B8E0D8', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '6px', borderColor: '#B8E0D8', focusBorderColor: '#00695C', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '8px', shadow: '0 20px 60px rgba(0,105,92,0.20)', overlayColor: 'rgba(10,32,32,0.4)', overlayBlur: 'blur(3px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'filled', itemRadius: '6px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 16, showLabels: true, showIcons: true, activeIndicator: 'bg-fill', groupHeaders: true },
    stat: { radius: '8px', valueFont: 'serif', valueFontSize: '32px', accentPosition: 'left', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
