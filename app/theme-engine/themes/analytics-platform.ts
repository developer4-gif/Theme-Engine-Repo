import type { Theme } from '../types';
const theme: Theme = {
  id: 'analytics-platform', name: 'Analytics Platform',
  description: 'Data-forward charcoal with electric cyan — built for insights.',
  category: 'tech', tags: ['analytics', 'charcoal', 'cyan', 'data'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo-white.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#00BCD4','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#12151C', bgSecondary: '#191D27', bgTertiary: '#20263A', panel: '#191D27', panelSecondary: '#20263A', tint: '#242C42', ink: '#E4E8F5', ink2: '#9AA4BE', ink3: '#545E78', rule: '#2C3550', ruleStrong: '#3C4568', primary: '#00BCD4', primaryHover: '#0097A7', primaryText: '#12151C', accent1: '#FDD835', accent2: '#FF5722', accent3: '#76FF03', accent4: '#00BCD4', accent5: '#CE93D8', alert: '#FF5252', warn: '#FFD740', ok: '#69F0AE', info: '#40C4FF', navBg: '#0D1018', navText: '#3A4460', navActiveText: '#00BCD4', navActiveBg: '#191D27', navActiveBorder: '#00BCD4', headerBg: '#191D27', headerText: '#E4E8F5', headerBorder: '#2C3550', buttonGradient: 'linear-gradient(135deg, #00BCD4, #00E5FF)', buttonGlow: '0 0 20px rgba(0,188,212,0.5)' },
  typography: { fontSans: '"Inter", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.4px', normal_ls: '0px', wide_ls: '0.6px', wider_ls: '1.2px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '24px', maxWidth: '1600px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '12px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 4px rgba(0,188,212,0.12)', md: '0 4px 16px rgba(0,188,212,0.16)', lg: '0 8px 32px rgba(0,188,212,0.20)', xl: '0 20px 60px rgba(0,0,0,0.6)', inner: 'inset 0 1px 3px rgba(0,0,0,0.4)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.22s ease-out' },
  layout: { variant: 'dashboard', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1600px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'sidebar-stats', contentLayout: 'chart-left-table-right' },
  components: {
    button: { style: 'glow', radius: '6px', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'none', paddingX: '16px', paddingY: '9px' },
    card: { style: 'neon', radius: '8px', padding: '20px', shadow: '0 0 0 1px rgba(0,188,212,0.2)', borderWidth: '1px', accentWidth: '2px', accentPosition: 'top' },
    table: { style: 'enterprise', headerBg: '#20263A', rowHoverBg: '#242C42', borderColor: '#2C3550', cellPaddingX: '14px', cellPaddingY: '10px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'compact' },
    form: { style: 'outlined', radius: '6px', borderColor: '#2C3550', focusBorderColor: '#00BCD4', bg: '#20263A', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '10px', shadow: '0 20px 60px rgba(0,0,0,0.6)', overlayColor: 'rgba(0,0,0,0.6)', overlayBlur: 'blur(6px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'filled', itemRadius: '6px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 17, showLabels: true, showIcons: true, activeIndicator: 'bg-fill', groupHeaders: true },
    stat: { radius: '8px', valueFont: 'mono', valueFontSize: '32px', accentPosition: 'top', accentWidth: '2px', bgStyle: 'glass' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
