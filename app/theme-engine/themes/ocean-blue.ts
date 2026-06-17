import type { Theme } from '../types';
const theme: Theme = {
  id: 'ocean-blue', name: 'Ocean Blue',
  description: 'Deep ocean blue with calm surfaces — serene, professional, trustworthy.',
  category: 'corporate', tags: ['ocean', 'blue', 'calm', 'professional'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#0277BD','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#EEF4FB', bgSecondary: '#E0ECF8', bgTertiary: '#D0E4F4', panel: '#FFFFFF', panelSecondary: '#F4F8FD', tint: '#EAF2FB', ink: '#0A1E36', ink2: '#1A3A5E', ink3: '#5A7A9A', rule: '#C8DDEF', ruleStrong: '#A0C0E0', primary: '#0277BD', primaryHover: '#01579B', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#43A047', accent4: '#00ACC1', accent5: '#6D4C2A', alert: '#C62828', warn: '#E65100', ok: '#2E7D32', info: '#0277BD', navBg: '#0D2B4E', navText: '#7AA8CC', navActiveText: '#FFFFFF', navActiveBg: '#1A3A5E', navActiveBorder: '#FDD835', headerBg: '#FFFFFF', headerText: '#0A1E36', headerBorder: '#C8DDEF' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '68px' },
  borders: { radius: { none: '0px', sm: '4px', md: '8px', lg: '10px', xl: '14px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(2,119,189,0.08)', md: '0 4px 14px rgba(2,119,189,0.12)', lg: '0 8px 28px rgba(2,119,189,0.16)', xl: '0 20px 60px rgba(2,119,189,0.22)', inner: 'inset 0 1px 3px rgba(2,119,189,0.08)' },
  animations: { duration: { fast: '140ms', base: '240ms', slow: '400ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.24s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'table-top-charts-below' },
  components: {
    button: { style: 'rounded', radius: '6px', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'none', paddingX: '16px', paddingY: '9px' },
    card: { style: 'soft', radius: '10px', padding: '20px', shadow: '0 4px 14px rgba(2,119,189,0.12)', borderWidth: '1px', accentWidth: '3px', accentPosition: 'left' },
    table: { style: 'enterprise', headerBg: '#EAF2FB', rowHoverBg: '#E0ECF8', borderColor: '#C8DDEF', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '6px', borderColor: '#C8DDEF', focusBorderColor: '#0277BD', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '10px', shadow: '0 20px 60px rgba(2,119,189,0.22)', overlayColor: 'rgba(10,30,54,0.4)', overlayBlur: 'blur(3px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'filled', itemRadius: '6px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 16, showLabels: true, showIcons: true, activeIndicator: 'border-left', groupHeaders: true },
    stat: { radius: '8px', valueFont: 'serif', valueFontSize: '32px', accentPosition: 'left', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
