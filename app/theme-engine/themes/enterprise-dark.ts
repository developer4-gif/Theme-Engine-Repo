import type { Theme } from '../types';
const theme: Theme = {
  id: 'enterprise-dark', name: 'Enterprise Dark',
  description: 'Midnight dark with electric blue — modern enterprise cloud platform.',
  category: 'tech', tags: ['dark', 'blue', 'enterprise', 'cloud', 'modern'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo-white.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#2563EB','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#0F1723', bgSecondary: '#161E2E', bgTertiary: '#1E2840', panel: '#161E2E', panelSecondary: '#1E2840', tint: '#232E46', ink: '#E2E8F8', ink2: '#94A3C0', ink3: '#4A5878', rule: '#283454', ruleStrong: '#364466', primary: '#2563EB', primaryHover: '#1D4ED8', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F97316', accent3: '#22C55E', accent4: '#2563EB', accent5: '#A855F7', alert: '#EF4444', warn: '#F59E0B', ok: '#22C55E', info: '#3B82F6', navBg: '#0A1020', navText: '#3A4A68', navActiveText: '#2563EB', navActiveBg: '#161E2E', navActiveBorder: '#2563EB', headerBg: '#161E2E', headerText: '#E2E8F8', headerBorder: '#283454', buttonGradient: 'linear-gradient(135deg, #2563EB, #7C3AED)', buttonGlow: '0 0 20px rgba(37,99,235,0.5)' },
  typography: { fontSans: '"Inter", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.5px', wider_ls: '1px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 4px rgba(0,0,0,0.3)', md: '0 4px 16px rgba(37,99,235,0.16)', lg: '0 8px 32px rgba(37,99,235,0.20)', xl: '0 20px 60px rgba(0,0,0,0.6)', inner: 'inset 0 1px 3px rgba(0,0,0,0.4)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.22s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'chart-left-table-right' },
  components: {
    button: { style: 'gradient', radius: '8px', fontWeight: 600, letterSpacing: '0.2px', textTransform: 'none', paddingX: '18px', paddingY: '9px' },
    card: { style: 'bordered', radius: '10px', padding: '20px', shadow: '0 4px 16px rgba(37,99,235,0.16)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'enterprise', headerBg: '#1E2840', rowHoverBg: '#232E46', borderColor: '#283454', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '8px', borderColor: '#283454', focusBorderColor: '#2563EB', bg: '#1E2840', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '12px', shadow: '0 20px 60px rgba(0,0,0,0.6)', overlayColor: 'rgba(0,0,0,0.6)', overlayBlur: 'blur(6px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'filled', itemRadius: '8px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 17, showLabels: true, showIcons: true, activeIndicator: 'pill', groupHeaders: true },
    stat: { radius: '10px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'top', accentWidth: '2px', bgStyle: 'glass' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
