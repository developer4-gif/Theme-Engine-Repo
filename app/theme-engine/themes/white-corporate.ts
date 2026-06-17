import type { Theme } from '../types';
const theme: Theme = {
  id: 'white-corporate', name: 'White Corporate',
  description: 'Clean white canvas with subtle grays — timeless corporate clarity.',
  category: 'corporate', tags: ['light', 'clean', 'corporate', 'minimal-color'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1E88E5','#6D4C2A'], stripeHeight: 4 },
  colors: { bg: '#F7F8FA', bgSecondary: '#EDEEF2', bgTertiary: '#E2E4EA', panel: '#FFFFFF', panelSecondary: '#F9FAFB', tint: '#F3F4F7', ink: '#111318', ink2: '#3A3E4A', ink3: '#888EA0', rule: '#E4E6EE', ruleStrong: '#C8CCd8', primary: '#212631', primaryHover: '#111318', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#7CB342', accent4: '#1E88E5', accent5: '#6D4C2A', alert: '#D32F2F', warn: '#F57C00', ok: '#388E3C', info: '#1976D2', navBg: '#FFFFFF', navText: '#3A3E4A', navActiveText: '#111318', navActiveBg: 'transparent', navActiveBorder: '#F57C00', headerBg: '#FFFFFF', headerText: '#111318', headerBorder: '#E4E6EE' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.6px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '52px', headerHeight: '66px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '10px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 2px rgba(17,19,24,0.06)', md: '0 4px 10px rgba(17,19,24,0.08)', lg: '0 8px 20px rgba(17,19,24,0.10)', xl: '0 20px 50px rgba(17,19,24,0.15)', inner: 'inset 0 1px 2px rgba(17,19,24,0.06)' },
  animations: { duration: { fast: '120ms', base: '200ms', slow: '350ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.2s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '220px', sidebarCollapsedWidth: '56px', navPosition: 'top', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'underline', statLayout: 'grid-4', contentLayout: 'chart-left-table-right' },
  components: {
    button: { style: 'sharp', radius: '4px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', paddingX: '14px', paddingY: '8px' },
    card: { style: 'bordered', radius: '4px', padding: '20px', shadow: 'none', borderWidth: '1px', accentWidth: '3px', accentPosition: 'top' },
    table: { style: 'enterprise', headerBg: '#F3F4F7', rowHoverBg: '#F3F4F7', borderColor: '#E4E6EE', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '4px', borderColor: '#E4E6EE', focusBorderColor: '#212631', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '6px', shadow: '0 20px 50px rgba(17,19,24,0.15)', overlayColor: 'rgba(17,19,24,0.35)', overlayBlur: 'blur(2px)' },
    badge: { style: 'square', radius: '2px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'underline', itemRadius: '0px', itemPadding: '12px 16px', fontSize: '13px', iconSize: 15, showLabels: true, showIcons: false, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '4px', valueFont: 'serif', valueFontSize: '32px', accentPosition: 'top', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
