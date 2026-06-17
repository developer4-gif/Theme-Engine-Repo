import type { Theme } from '../types';
const theme: Theme = {
  id: 'smart-operations', name: 'Smart Operations',
  description: 'IoT teal on dark — real-time operations monitoring and control.',
  category: 'industrial', tags: ['iot', 'teal', 'dark', 'operations', 'monitoring'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo-white.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#00BFA5','#1E88E5','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#0D1F20', bgSecondary: '#142425', bgTertiary: '#1C3030', panel: '#142425', panelSecondary: '#1C3030', tint: '#1F3A3A', ink: '#E0F4F0', ink2: '#90C4BC', ink3: '#4A7870', rule: '#1C3838', ruleStrong: '#2A5050', primary: '#00BFA5', primaryHover: '#009688', primaryText: '#0D1F20', accent1: '#FDD835', accent2: '#F57C00', accent3: '#00BFA5', accent4: '#1E88E5', accent5: '#CE93D8', alert: '#EF5350', warn: '#FFA726', ok: '#66BB6A', info: '#29B6F6', navBg: '#091818', navText: '#2A5050', navActiveText: '#00BFA5', navActiveBg: '#142425', navActiveBorder: '#00BFA5', headerBg: '#142425', headerText: '#E0F4F0', headerBorder: '#1C3838', buttonGradient: 'linear-gradient(135deg, #00BFA5, #00E5CC)', buttonGlow: '0 0 20px rgba(0,191,165,0.5)' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Mono", monospace', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.4, relaxed: 1.6, tight_ls: '-0.3px', normal_ls: '0px', wide_ls: '1px', wider_ls: '2px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '24px', maxWidth: '1600px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '12px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 4px rgba(0,0,0,0.4)', md: '0 4px 16px rgba(0,191,165,0.16)', lg: '0 8px 32px rgba(0,191,165,0.20)', xl: '0 20px 60px rgba(0,0,0,0.6)', inner: 'inset 0 1px 3px rgba(0,0,0,0.4)' },
  animations: { duration: { fast: '100ms', base: '200ms', slow: '350ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.20s ease-out' },
  layout: { variant: 'dashboard', sidebarWidth: '56px', sidebarCollapsedWidth: '56px', navPosition: 'left', contentMaxWidth: '1600px', headerSticky: true, navSticky: true, sidebarStyle: 'minimal-icon', navBarStyle: 'none', statLayout: 'hero-stat', contentLayout: 'chart-left-table-right' },
  components: {
    button: { style: 'glow', radius: '4px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'none', paddingX: '16px', paddingY: '9px' },
    card: { style: 'neon', radius: '8px', padding: '18px', shadow: '0 0 0 1px rgba(0,191,165,0.25)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'enterprise', headerBg: '#1C3030', rowHoverBg: '#1F3A3A', borderColor: '#1C3838', cellPaddingX: '12px', cellPaddingY: '10px', fontSize: '12px', headerFontSize: '10px', stripeColor: 'transparent', density: 'compact' },
    form: { style: 'outlined', radius: '4px', borderColor: '#2A5050', focusBorderColor: '#00BFA5', bg: '#1C3030', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '10px', shadow: '0 20px 60px rgba(0,0,0,0.6)', overlayColor: 'rgba(0,0,0,0.6)', overlayBlur: 'blur(6px)' },
    badge: { style: 'glow', radius: '4px', fontSize: '10px', fontWeight: 700 },
    nav: { style: 'compact', itemRadius: '4px', itemPadding: '12px 0', fontSize: '11px', iconSize: 22, showLabels: false, showIcons: true, activeIndicator: 'dot', groupHeaders: false },
    stat: { radius: '6px', valueFont: 'mono', valueFontSize: '40px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'glass' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
