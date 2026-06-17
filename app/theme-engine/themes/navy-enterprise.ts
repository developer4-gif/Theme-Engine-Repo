import type { Theme } from '../types';
const theme: Theme = {
  id: 'navy-enterprise', name: 'Navy Enterprise',
  description: 'Deep navy authority with crisp white panels — classic enterprise command.',
  category: 'corporate', tags: ['dark-nav', 'enterprise', 'professional', 'blue'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1E88E5','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#F0F2F5', bgSecondary: '#E4E8EE', bgTertiary: '#D8DEE8', panel: '#FFFFFF', panelSecondary: '#F8F9FB', tint: '#F0F4F8', ink: '#0D1B2E', ink2: '#2C3E52', ink3: '#6B7A8D', rule: '#DDE3EC', ruleStrong: '#BBC5D4', primary: '#1B3A6B', primaryHover: '#152E56', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#7CB342', accent4: '#1E88E5', accent5: '#6D4C2A', alert: '#C0392B', warn: '#E67E22', ok: '#4F7942', info: '#1E88E5', navBg: '#1B3A6B', navText: '#A8BBCF', navActiveText: '#FFFFFF', navActiveBg: '#2A5298', navActiveBorder: '#FDD835', headerBg: '#FFFFFF', headerText: '#0D1B2E', headerBorder: '#DDE3EC' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", "SF Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.6px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '68px' },
  borders: { radius: { none: '0px', sm: '3px', md: '6px', lg: '8px', xl: '12px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(13,27,46,0.08)', md: '0 4px 12px rgba(13,27,46,0.10)', lg: '0 8px 24px rgba(13,27,46,0.14)', xl: '0 20px 60px rgba(13,27,46,0.20)', inner: 'inset 0 1px 3px rgba(13,27,46,0.08)' },
  animations: { duration: { fast: '150ms', base: '250ms', slow: '400ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.25s ease-out' },
  layout: { variant: 'enterprise', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'table-primary' },
  components: {
    button: { style: 'sharp', radius: '3px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', paddingX: '18px', paddingY: '9px' },
    card: { style: 'bordered', radius: '6px', padding: '20px', shadow: 'none', borderWidth: '1px', accentWidth: '3px', accentPosition: 'left' },
    table: { style: 'enterprise', headerBg: '#F0F4F8', rowHoverBg: '#EEF3F8', borderColor: '#DDE3EC', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '3px', borderColor: '#DDE3EC', focusBorderColor: '#1B3A6B', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '8px', shadow: '0 20px 60px rgba(13,27,46,0.20)', overlayColor: 'rgba(13,27,46,0.4)', overlayBlur: 'blur(2px)' },
    badge: { style: 'square', radius: '2px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'filled', itemRadius: '4px', itemPadding: '10px 16px', fontSize: '13px', iconSize: 16, showLabels: true, showIcons: true, activeIndicator: 'border-left', groupHeaders: true },
    stat: { radius: '6px', valueFont: 'serif', valueFontSize: '32px', accentPosition: 'left', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01', isDefault: true },
};
export default theme;
