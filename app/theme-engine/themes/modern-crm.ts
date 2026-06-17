import type { Theme } from '../types';
const theme: Theme = {
  id: 'modern-crm', name: 'Modern CRM',
  description: 'Purple-blue CRM energy — relationship-first, pipeline-focused.',
  category: 'tech', tags: ['crm', 'purple', 'pipeline', 'saas'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1589EE','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#F4F3FF', bgSecondary: '#EAE8FF', bgTertiary: '#DDD9FF', panel: '#FFFFFF', panelSecondary: '#F9F8FF', tint: '#F0EEFF', ink: '#1A1240', ink2: '#3D2E8A', ink3: '#8070C0', rule: '#DDD8FF', ruleStrong: '#C0B8F8', primary: '#16013F', primaryHover: '#0D0028', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#22C55E', accent4: '#1589EE', accent5: '#A855F7', alert: '#EF4444', warn: '#F59E0B', ok: '#22C55E', info: '#1589EE', navBg: '#16013F', navText: '#6650AA', navActiveText: '#FFFFFF', navActiveBg: '#2A0A60', navActiveBorder: '#1589EE', headerBg: '#FFFFFF', headerText: '#1A1240', headerBorder: '#DDD8FF', buttonGradient: 'linear-gradient(135deg, #16013F, #3730A3)', buttonGlow: '0 4px 14px rgba(22,1,63,0.4)' },
  typography: { fontSans: '"Inter", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.4px', normal_ls: '0px', wide_ls: '0.5px', wider_ls: '1px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(22,1,63,0.10)', md: '0 4px 12px rgba(22,1,63,0.14)', lg: '0 8px 24px rgba(22,1,63,0.18)', xl: '0 20px 60px rgba(22,1,63,0.25)', inner: 'inset 0 1px 3px rgba(22,1,63,0.10)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.22s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'split-kanban' },
  components: {
    button: { style: 'gradient', radius: '8px', fontWeight: 600, letterSpacing: '0.2px', textTransform: 'none', paddingX: '18px', paddingY: '9px' },
    card: { style: 'elevated', radius: '12px', padding: '20px', shadow: '0 4px 12px rgba(22,1,63,0.14)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#F0EEFF', rowHoverBg: '#EAE8FF', borderColor: '#DDD8FF', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '8px', borderColor: '#DDD8FF', focusBorderColor: '#16013F', bg: '#FFFFFF', labelSize: '11px', inputSize: '13px' },
    modal: { style: 'centered', radius: '12px', shadow: '0 20px 60px rgba(22,1,63,0.25)', overlayColor: 'rgba(22,1,63,0.4)', overlayBlur: 'blur(4px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'filled', itemRadius: '8px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 18, showLabels: true, showIcons: true, activeIndicator: 'bg-fill', groupHeaders: true },
    stat: { radius: '12px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'top', accentWidth: '3px', bgStyle: 'gradient' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
