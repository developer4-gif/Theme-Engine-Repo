import type { Theme } from '../types';
const theme: Theme = {
  id: 'platinum-professional', name: 'Platinum Professional',
  description: 'Silver platinum with gold accents — premium institutional authority.',
  category: 'luxury', tags: ['platinum', 'silver', 'gold', 'premium', 'institutional'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#C0C0C0','#D4AF37','#A8A8A8','#304050','#6D4C2A'], stripeHeight: 2 },
  colors: { bg: '#F2F3F5', bgSecondary: '#E8EAEE', bgTertiary: '#DDE0E8', panel: '#FFFFFF', panelSecondary: '#F8F9FB', tint: '#EEF0F4', ink: '#10182A', ink2: '#304050', ink3: '#708098', rule: '#D8DCE8', ruleStrong: '#B8C0D4', primary: '#304050', primaryHover: '#1E2E40', primaryText: '#FFFFFF', accent1: '#D4AF37', accent2: '#B8960C', accent3: '#507060', accent4: '#304090', accent5: '#6D4C2A', alert: '#8B2222', warn: '#8B6600', ok: '#2A5A3A', info: '#1E3A80', navBg: '#FFFFFF', navText: '#708098', navActiveText: '#304050', navActiveBg: '#EEF0F4', navActiveBorder: '#D4AF37', headerBg: '#FFFFFF', headerText: '#10182A', headerBorder: '#D8DCE8' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.55, relaxed: 1.75, tight_ls: '-0.5px', normal_ls: '0.2px', wide_ls: '1px', wider_ls: '2px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '36px', maxWidth: '1360px', navHeight: '54px', headerHeight: '68px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '8px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(16,24,42,0.07)', md: '0 4px 12px rgba(16,24,42,0.09)', lg: '0 8px 24px rgba(16,24,42,0.12)', xl: '0 20px 50px rgba(16,24,42,0.18)', inner: 'inset 0 1px 3px rgba(16,24,42,0.07)' },
  animations: { duration: { fast: '150ms', base: '260ms', slow: '440ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.25,0.46,0.45,0.94)' }, fade: 'fadein 0.26s ease-out' },
  layout: { variant: 'top-nav', sidebarWidth: '220px', sidebarCollapsedWidth: '56px', navPosition: 'top', contentMaxWidth: '1360px', headerSticky: true, navSticky: true, sidebarStyle: 'none', navBarStyle: 'floating', statLayout: 'grid-4', contentLayout: 'table-top-charts-below' },
  components: {
    button: { style: 'sharp', radius: '2px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', paddingX: '18px', paddingY: '9px', borderWidth: '1px', borderColor: '#D4AF37' },
    card: { style: 'bordered', radius: '4px', padding: '22px', shadow: '0 1px 3px rgba(16,24,42,0.07)', borderWidth: '1px', accentWidth: '2px', accentPosition: 'top' },
    table: { style: 'enterprise', headerBg: '#EEF0F4', rowHoverBg: '#E8EAEE', borderColor: '#D8DCE8', cellPaddingX: '16px', cellPaddingY: '13px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'outlined', radius: '2px', borderColor: '#D8DCE8', focusBorderColor: '#304050', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '4px', shadow: '0 20px 50px rgba(16,24,42,0.18)', overlayColor: 'rgba(16,24,42,0.35)', overlayBlur: 'blur(2px)' },
    badge: { style: 'outline', radius: '1px', fontSize: '9px', fontWeight: 600 },
    nav: { style: 'underline', itemRadius: '0px', itemPadding: '12px 16px', fontSize: '13px', iconSize: 15, showLabels: true, showIcons: false, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '4px', valueFont: 'serif', valueFontSize: '34px', accentPosition: 'top', accentWidth: '2px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
