import type { Theme } from '../types';
const theme: Theme = {
  id: 'executive-workspace', name: 'Executive Workspace',
  description: 'Walnut and cream warmth — leadership desk aesthetic with serif authority.',
  category: 'luxury', tags: ['walnut', 'cream', 'warm', 'luxury', 'serif'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1E88E5','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#F8F4EE', bgSecondary: '#F0EAE0', bgTertiary: '#E6DDD0', panel: '#FFFFFF', panelSecondary: '#FCF8F4', tint: '#F2ECE4', ink: '#1E1208', ink2: '#3E2E18', ink3: '#7A6448', rule: '#DDD0BE', ruleStrong: '#C0AA8A', primary: '#6D4C2A', primaryHover: '#5A3A1C', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#5A8A3A', accent4: '#1E88E5', accent5: '#6D4C2A', alert: '#AA2222', warn: '#AA6600', ok: '#3A6A2A', info: '#1E5A96', navBg: '#FFFFFF', navText: '#7A6448', navActiveText: '#6D4C2A', navActiveBg: '#F2ECE4', navActiveBorder: '#6D4C2A', headerBg: '#FFFFFF', headerText: '#1E1208', headerBorder: '#DDD0BE' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"Cormorant Garamond", "IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '20px', '2xl': '26px', '3xl': '34px', '4xl': '44px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.08, normal: 1.6, relaxed: 1.8, tight_ls: '-0.6px', normal_ls: '0.2px', wide_ls: '1px', wider_ls: '2px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '40px', maxWidth: '1360px', navHeight: '56px', headerHeight: '70px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '10px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 4px rgba(30,18,8,0.08)', md: '0 4px 14px rgba(30,18,8,0.10)', lg: '0 8px 28px rgba(30,18,8,0.14)', xl: '0 20px 60px rgba(30,18,8,0.20)', inner: 'inset 0 1px 3px rgba(30,18,8,0.08)' },
  animations: { duration: { fast: '150ms', base: '260ms', slow: '440ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.25,0.46,0.45,0.94)' }, fade: 'fadein 0.26s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1360px', headerSticky: true, navSticky: true, sidebarStyle: 'light-card', navBarStyle: 'none', statLayout: 'grid-2', contentLayout: 'table-primary' },
  components: {
    button: { style: 'sharp', radius: '3px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', paddingX: '18px', paddingY: '10px' },
    card: { style: 'soft', radius: '6px', padding: '24px', shadow: '0 1px 4px rgba(30,18,8,0.08)', borderWidth: '1px', accentWidth: '2px', accentPosition: 'left' },
    table: { style: 'minimal', headerBg: '#F2ECE4', rowHoverBg: '#F0EAE0', borderColor: '#DDD0BE', cellPaddingX: '18px', cellPaddingY: '14px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'outlined', radius: '3px', borderColor: '#DDD0BE', focusBorderColor: '#6D4C2A', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '6px', shadow: '0 20px 60px rgba(30,18,8,0.20)', overlayColor: 'rgba(30,18,8,0.35)', overlayBlur: 'blur(2px)' },
    badge: { style: 'outline', radius: '2px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'minimal', itemRadius: '3px', itemPadding: '12px 16px', fontSize: '13px', iconSize: 16, showLabels: true, showIcons: true, activeIndicator: 'border-left', groupHeaders: true },
    stat: { radius: '4px', valueFont: 'serif', valueFontSize: '38px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
