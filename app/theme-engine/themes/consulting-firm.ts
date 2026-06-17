import type { Theme } from '../types';
const theme: Theme = {
  id: 'consulting-firm', name: 'Consulting Firm',
  description: 'McKinsey-deep blue with serif authority — strategy meets precision.',
  category: 'corporate', tags: ['consulting', 'deep-blue', 'serif', 'formal'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#003087','#6D4C2A'], stripeHeight: 2 },
  colors: { bg: '#F4F5F8', bgSecondary: '#EAEDF2', bgTertiary: '#DFE3EC', panel: '#FFFFFF', panelSecondary: '#F8F9FB', tint: '#EEF1F7', ink: '#0A0F1E', ink2: '#1C2840', ink3: '#607090', rule: '#D8DCE8', ruleStrong: '#B8C0D4', primary: '#003087', primaryHover: '#002060', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#1B5E20', accent4: '#0D47A1', accent5: '#6D4C2A', alert: '#B71C1C', warn: '#E65100', ok: '#1B5E20', info: '#0D47A1', navBg: '#FFFFFF', navText: '#607090', navActiveText: '#003087', navActiveBg: '#EEF1F7', navActiveBorder: '#003087', headerBg: '#FFFFFF', headerText: '#0A0F1E', headerBorder: '#D8DCE8' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.05, normal: 1.6, relaxed: 1.8, tight_ls: '-0.6px', normal_ls: '0.2px', wide_ls: '1px', wider_ls: '2px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '40px', maxWidth: '1320px', navHeight: '52px', headerHeight: '66px' },
  borders: { radius: { none: '0px', sm: '1px', md: '2px', lg: '4px', xl: '6px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 2px rgba(10,15,30,0.06)', md: '0 4px 10px rgba(10,15,30,0.08)', lg: '0 8px 20px rgba(10,15,30,0.12)', xl: '0 20px 50px rgba(10,15,30,0.18)', inner: 'inset 0 1px 2px rgba(10,15,30,0.06)' },
  animations: { duration: { fast: '150ms', base: '260ms', slow: '420ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.25,0.46,0.45,0.94)' }, fade: 'fadein 0.26s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '220px', sidebarCollapsedWidth: '56px', navPosition: 'top', contentMaxWidth: '1320px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'underline', statLayout: 'grid-2', contentLayout: 'table-top-charts-below' },
  components: {
    button: { style: 'sharp', radius: '2px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', paddingX: '18px', paddingY: '9px' },
    card: { style: 'bordered', radius: '2px', padding: '24px', shadow: 'none', borderWidth: '1px', accentWidth: '2px', accentPosition: 'top' },
    table: { style: 'enterprise', headerBg: '#EEF1F7', rowHoverBg: '#EEF1F7', borderColor: '#D8DCE8', cellPaddingX: '18px', cellPaddingY: '14px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'underlined', radius: '0px', borderColor: '#D8DCE8', focusBorderColor: '#003087', bg: 'transparent', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '4px', shadow: '0 20px 50px rgba(10,15,30,0.18)', overlayColor: 'rgba(10,15,30,0.4)', overlayBlur: 'blur(2px)' },
    badge: { style: 'outline', radius: '1px', fontSize: '9px', fontWeight: 600 },
    nav: { style: 'underline', itemRadius: '0px', itemPadding: '12px 18px', fontSize: '13px', iconSize: 14, showLabels: true, showIcons: false, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '2px', valueFont: 'serif', valueFontSize: '36px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
