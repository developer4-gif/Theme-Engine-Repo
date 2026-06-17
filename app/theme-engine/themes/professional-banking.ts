import type { Theme } from '../types';
const theme: Theme = {
  id: 'professional-banking', name: 'Professional Banking',
  description: 'Forest green precision — trust, stability, financial authority.',
  category: 'corporate', tags: ['banking', 'green', 'trust', 'finance'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#1B5E20','#2E7D32','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#F5F5EE', bgSecondary: '#ECEEE4', bgTertiary: '#E0E4D6', panel: '#FFFFFF', panelSecondary: '#FAFAF6', tint: '#F0F2E8', ink: '#0A1A0A', ink2: '#1B3A1B', ink3: '#5A7A5A', rule: '#D4DCC8', ruleStrong: '#BCCAAA', primary: '#1B5E20', primaryHover: '#0D4D12', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#2E7D32', accent4: '#1976D2', accent5: '#6D4C2A', alert: '#B71C1C', warn: '#E65100', ok: '#1B5E20', info: '#1976D2', navBg: '#FFFFFF', navText: '#3A5A3A', navActiveText: '#1B5E20', navActiveBg: '#F0F2E8', navActiveBorder: '#1B5E20', headerBg: '#FFFFFF', headerText: '#0A1A0A', headerBorder: '#D4DCC8' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1360px', navHeight: '52px', headerHeight: '66px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '8px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(10,26,10,0.07)', md: '0 4px 12px rgba(10,26,10,0.09)', lg: '0 8px 24px rgba(10,26,10,0.12)', xl: '0 20px 50px rgba(10,26,10,0.16)', inner: 'inset 0 1px 3px rgba(10,26,10,0.07)' },
  animations: { duration: { fast: '140ms', base: '240ms', slow: '400ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.24s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '220px', sidebarCollapsedWidth: '56px', navPosition: 'top', contentMaxWidth: '1360px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'underline', statLayout: 'grid-4', contentLayout: 'table-primary' },
  components: {
    button: { style: 'sharp', radius: '3px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', paddingX: '16px', paddingY: '9px' },
    card: { style: 'bordered', radius: '4px', padding: '20px', shadow: '0 1px 3px rgba(10,26,10,0.07)', borderWidth: '1px', accentWidth: '3px', accentPosition: 'left' },
    table: { style: 'enterprise', headerBg: '#F0F2E8', rowHoverBg: '#F0F2E8', borderColor: '#D4DCC8', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '3px', borderColor: '#D4DCC8', focusBorderColor: '#1B5E20', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '6px', shadow: '0 20px 50px rgba(10,26,10,0.16)', overlayColor: 'rgba(10,26,10,0.35)', overlayBlur: 'blur(2px)' },
    badge: { style: 'square', radius: '2px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'underline', itemRadius: '0px', itemPadding: '12px 16px', fontSize: '13px', iconSize: 15, showLabels: true, showIcons: false, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '4px', valueFont: 'serif', valueFontSize: '32px', accentPosition: 'left', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
