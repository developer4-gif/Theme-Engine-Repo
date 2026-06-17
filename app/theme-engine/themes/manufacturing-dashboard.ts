import type { Theme } from '../types';
const theme: Theme = {
  id: 'manufacturing-dashboard', name: 'Manufacturing Dashboard',
  description: 'High-visibility dashboard for plant operations — real-time monitoring UI.',
  category: 'industrial', tags: ['manufacturing', 'dashboard', 'monitoring', 'orange'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1E88E5','#6D4C2A'], stripeHeight: 4 },
  colors: { bg: '#1A1E28', bgSecondary: '#21263A', bgTertiary: '#282F45', panel: '#21263A', panelSecondary: '#282F45', tint: '#2E3550', ink: '#E8EBF5', ink2: '#A8B0CC', ink3: '#606880', rule: '#343C58', ruleStrong: '#424C6A', primary: '#F57C00', primaryHover: '#E65100', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#7CB342', accent4: '#1E88E5', accent5: '#CE93D8', alert: '#F44336', warn: '#FFA726', ok: '#66BB6A', info: '#29B6F6', navBg: '#141820', navText: '#4A5270', navActiveText: '#F57C00', navActiveBg: '#21263A', navActiveBorder: '#F57C00', headerBg: '#21263A', headerText: '#E8EBF5', headerBorder: '#343C58', buttonGradient: 'linear-gradient(135deg, #F57C00, #FDD835)', buttonGlow: '0 0 20px rgba(245,124,0,0.5)' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Mono", monospace', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.4, relaxed: 1.6, tight_ls: '-0.3px', normal_ls: '0px', wide_ls: '1px', wider_ls: '2px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '24px', maxWidth: '1600px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '10px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 4px rgba(0,0,0,0.3)', md: '0 4px 14px rgba(0,0,0,0.4)', lg: '0 8px 28px rgba(0,0,0,0.5)', xl: '0 20px 60px rgba(0,0,0,0.6)', inner: 'inset 0 1px 3px rgba(0,0,0,0.4)' },
  animations: { duration: { fast: '100ms', base: '200ms', slow: '350ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.20s ease-out' },
  layout: { variant: 'dashboard', sidebarWidth: '56px', sidebarCollapsedWidth: '56px', navPosition: 'left', contentMaxWidth: '1600px', headerSticky: true, navSticky: true, sidebarStyle: 'minimal-icon', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'chart-left-table-right' },
  components: {
    button: { style: 'glow', radius: '4px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', paddingX: '18px', paddingY: '10px' },
    card: { style: 'neon', radius: '6px', padding: '18px', shadow: '0 0 0 1px rgba(245,124,0,0.3)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'enterprise', headerBg: '#282F45', rowHoverBg: '#2E3550', borderColor: '#343C58', cellPaddingX: '12px', cellPaddingY: '10px', fontSize: '12px', headerFontSize: '10px', stripeColor: 'transparent', density: 'compact' },
    form: { style: 'outlined', radius: '4px', borderColor: '#343C58', focusBorderColor: '#F57C00', bg: '#282F45', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '8px', shadow: '0 20px 60px rgba(0,0,0,0.6)', overlayColor: 'rgba(0,0,0,0.6)', overlayBlur: 'blur(4px)' },
    badge: { style: 'glow', radius: '4px', fontSize: '10px', fontWeight: 700 },
    nav: { style: 'compact', itemRadius: '4px', itemPadding: '12px 0', fontSize: '11px', iconSize: 22, showLabels: false, showIcons: true, activeIndicator: 'dot', groupHeaders: false },
    stat: { radius: '6px', valueFont: 'mono', valueFontSize: '34px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'gradient' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
