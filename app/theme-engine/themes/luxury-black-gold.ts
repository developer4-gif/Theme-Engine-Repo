import type { Theme } from '../types';
const theme: Theme = {
  id: 'luxury-black-gold', name: 'Luxury Black Gold',
  description: 'Obsidian black with 24k gold accents — premium luxury brand experience.',
  category: 'luxury', tags: ['black', 'gold', 'luxury', 'premium', 'dark'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo-white.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#D4AF37','#B8960C','#C9A227','#A0872A','#8B7322'], stripeHeight: 2 },
  colors: { bg: '#0A0A0A', bgSecondary: '#111111', bgTertiary: '#1A1A1A', panel: '#141414', panelSecondary: '#1C1C1C', tint: '#181818', ink: '#F5F0E8', ink2: '#C8BEA8', ink3: '#7A7060', rule: '#2A2820', ruleStrong: '#3A3828', primary: '#D4AF37', primaryHover: '#B8960C', primaryText: '#0A0A0A', accent1: '#D4AF37', accent2: '#C9A227', accent3: '#8B7322', accent4: '#A0872A', accent5: '#6B5B1A', alert: '#CC3333', warn: '#CC7700', ok: '#447733', info: '#3366AA', navBg: '#050505', navText: '#4A4438', navActiveText: '#D4AF37', navActiveBg: '#111111', navActiveBorder: '#D4AF37', headerBg: '#111111', headerText: '#F5F0E8', headerBorder: '#2A2820' },
  typography: { fontSans: '"Cormorant Garamond", "Georgia", serif', fontSerif: '"Cormorant Garamond", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '17px', xl: '20px', '2xl': '26px', '3xl': '34px', '4xl': '44px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.05, normal: 1.6, relaxed: 1.8, tight_ls: '-0.8px', normal_ls: '0.5px', wide_ls: '1.5px', wider_ls: '3px', headingFont: 'serif' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '40px', maxWidth: '1400px', navHeight: '60px', headerHeight: '72px' },
  borders: { radius: { none: '0px', sm: '1px', md: '2px', lg: '4px', xl: '6px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '1px' } },
  shadows: { none: 'none', sm: '0 1px 4px rgba(0,0,0,0.4)', md: '0 4px 16px rgba(0,0,0,0.5)', lg: '0 8px 32px rgba(0,0,0,0.6)', xl: '0 20px 60px rgba(0,0,0,0.7)', inner: 'inset 0 1px 4px rgba(0,0,0,0.5)' },
  animations: { duration: { fast: '150ms', base: '280ms', slow: '500ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.25,0.46,0.45,0.94)' }, fade: 'fadein 0.28s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '260px', sidebarCollapsedWidth: '64px', navPosition: 'left', contentMaxWidth: '1400px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'grid-2', contentLayout: 'table-top-charts-below' },
  components: {
    button: { style: 'sharp', radius: '0px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', paddingX: '24px', paddingY: '12px', borderWidth: '1px', borderColor: '#D4AF37' },
    card: { style: 'bordered', radius: '2px', padding: '28px', shadow: '0 4px 16px rgba(0,0,0,0.5)', borderWidth: '1px', accentWidth: '1px', accentPosition: 'top' },
    table: { style: 'bordered', headerBg: '#111111', rowHoverBg: '#1A1A1A', borderColor: '#2A2820', cellPaddingX: '20px', cellPaddingY: '16px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'underlined', radius: '0px', borderColor: '#3A3828', focusBorderColor: '#D4AF37', bg: 'transparent', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '2px', shadow: '0 20px 60px rgba(0,0,0,0.7)', overlayColor: 'rgba(0,0,0,0.7)', overlayBlur: 'blur(6px)' },
    badge: { style: 'outline', radius: '0px', fontSize: '9px', fontWeight: 600 },
    nav: { style: 'minimal', itemRadius: '0px', itemPadding: '14px 24px', fontSize: '12px', iconSize: 16, showLabels: true, showIcons: false, activeIndicator: 'border-left', groupHeaders: false },
    stat: { radius: '0px', valueFont: 'serif', valueFontSize: '40px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
