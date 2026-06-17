import type { Theme } from '../types';
const theme: Theme = {
  id: 'clean-startup', name: 'Clean Startup',
  description: 'Crisp white with electric green — fast-moving product team energy.',
  category: 'startup', tags: ['startup', 'green', 'energetic', 'product'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#22C55E','#3B82F6','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#FFFFFF', bgSecondary: '#F9FAFB', bgTertiary: '#F3F4F6', panel: '#FFFFFF', panelSecondary: '#F9FAFB', tint: '#F3F4F6', ink: '#111827', ink2: '#374151', ink3: '#9CA3AF', rule: '#E5E7EB', ruleStrong: '#D1D5DB', primary: '#16A34A', primaryHover: '#15803D', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F97316', accent3: '#22C55E', accent4: '#3B82F6', accent5: '#8B5CF6', alert: '#DC2626', warn: '#D97706', ok: '#16A34A', info: '#2563EB', navBg: '#FFFFFF', navText: '#6B7280', navActiveText: '#111827', navActiveBg: '#F3F4F6', navActiveBorder: '#16A34A', headerBg: '#FFFFFF', headerText: '#111827', headerBorder: '#E5E7EB', buttonGradient: 'linear-gradient(135deg, #16A34A, #22C55E)', buttonGlow: '0 4px 14px rgba(22,163,74,0.3)' },
  typography: { fontSans: '"Inter", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '11px', sm: '12px', base: '14px', md: '14px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '30px', '4xl': '38px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.2px', wider_ls: '0.6px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 6px rgba(0,0,0,0.07)', lg: '0 10px 15px rgba(0,0,0,0.10)', xl: '0 25px 50px rgba(0,0,0,0.15)', inner: 'inset 0 2px 4px rgba(0,0,0,0.05)' },
  animations: { duration: { fast: '100ms', base: '200ms', slow: '350ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.2s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'top', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'pills', statLayout: 'grid-4', contentLayout: 'cards-masonry' },
  components: {
    button: { style: 'rounded', radius: '8px', fontWeight: 600, letterSpacing: '0px', textTransform: 'none', paddingX: '18px', paddingY: '9px' },
    card: { style: 'elevated', radius: '12px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.07)', borderWidth: '0px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#F9FAFB', rowHoverBg: '#F9FAFB', borderColor: '#E5E7EB', cellPaddingX: '16px', cellPaddingY: '13px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'outlined', radius: '8px', borderColor: '#E5E7EB', focusBorderColor: '#16A34A', bg: '#FFFFFF', labelSize: '12px', inputSize: '14px' },
    modal: { style: 'centered', radius: '12px', shadow: '0 25px 50px rgba(0,0,0,0.15)', overlayColor: 'rgba(0,0,0,0.25)', overlayBlur: 'blur(4px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '11px', fontWeight: 500 },
    nav: { style: 'pill', itemRadius: '9999px', itemPadding: '8px 16px', fontSize: '14px', iconSize: 17, showLabels: true, showIcons: true, activeIndicator: 'pill', groupHeaders: false },
    stat: { radius: '12px', valueFont: 'sans', valueFontSize: '34px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
