import type { Theme } from '../types';

const theme: Theme = {
  id: 'loyalty-app',
  name: 'Loyalty App',
  description: 'Warm amber loyalty — points balance, reward cards, tier badges, redemption flow. Inspired by rewards & loyalty mobile apps.',
  category: 'startup',
  tags: ["loyalty","rewards","mobile","amber","warm","points","tier","retail"],
  brand: { name: 'Loyalty App', tagline: '', logo: '', logoAlt: 'Loyalty App', favicon: '', stripeColors: ['#F59E0B', '#FFFFFF', '#10B981', '#FFFFFF', '#F59E0B'], stripeHeight: 3 },
  colors: {
    bg: '#FFFFFF', bgSecondary: '#FFFBF0', bgTertiary: '#FFF5D6', panel: '#FFFFFF', panelSecondary: '#FFFBF0',
    tint: 'rgba(245,158,11,0.08)', ink: '#1A0E00', ink2: '#6A4010', ink3: '#C09050', rule: '#FFDDA0', ruleStrong: '#FFC870',
    primary: '#F59E0B', primaryHover: '#D97706', primaryText: '#FFFFFF',
    accent1: '#F59E0B', accent2: '#10B981', accent3: '#EF4444', accent4: '#7C3AED', accent5: '#3B82F6',
    alert: '#3B82F6', warn: '#EF4444', ok: '#10B981', info: '#7C3AED',
    navBg: '#FFFFFF', navText: '#C09050', navActiveText: '#F59E0B', navActiveBg: 'rgba(245,158,11,0.08)', navActiveBorder: '#F59E0B',
    headerBg: '#FFFFFF', headerText: '#1A0E00', headerBorder: '#FFDDA0',
  },
  typography: { fontSans: '"Poppins", system-ui, sans-serif', fontSerif: '"Georgia", serif', fontMono: '"SF Mono", monospace', headingFont: 'sans', xs: '10px', sm: '12px', base: '14px', md: '16px', lg: '18px', xl: '22px', '2xl': '28px', '3xl': '36px', '4xl': '48px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.15, normal: 1.55, relaxed: 1.75, tight_ls: '-0.01em', normal_ls: '0em', wide_ls: '0.02em', wider_ls: '0.05em' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '20px', maxWidth: '480px', navHeight: '60px', headerHeight: '56px' },
  borders: { radius: { none: '0', sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 8px rgba(0,0,0,0.08)', md: '0 4px 20px rgba(0,0,0,0.10)', lg: '0 8px 32px rgba(0,0,0,0.12)', xl: '0 16px 48px rgba(0,0,0,0.15)', inner: 'inset 0 1px 3px rgba(0,0,0,0.05)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: '220ms' },
  layout: { variant: 'minimal', navPosition: 'top', sidebarStyle: 'none', navBarStyle: 'none', statLayout: 'row-scroll', contentLayout: 'cards-masonry', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', headerSticky: true, navSticky: true, contentMaxWidth: '480px' },
  components: {
    button: { style: 'pill', radius: '9999px', fontWeight: 600, letterSpacing: '0em', textTransform: 'none', paddingX: '24px', paddingY: '14px' },
    card: { style: 'elevated', radius: '16px', padding: '20px', shadow: '0 2px 16px rgba(0,0,0,0.08)', borderWidth: '0px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#FFFBF0', rowHoverBg: 'rgba(0,0,0,0.03)', borderColor: '#FFDDA0', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'rgba(0,0,0,0.02)', density: 'relaxed' },
    form: { style: 'outlined', radius: '10px', borderColor: '#FFC870', focusBorderColor: '#F59E0B', bg: '#FFFFFF', labelSize: '12px', inputSize: '16px' },
    modal: { style: 'bottom-sheet', radius: '20px', shadow: '0 -4px 40px rgba(0,0,0,0.12)', overlayColor: 'rgba(0,0,0,0.5)', overlayBlur: 'blur(8px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '11px', fontWeight: 600 },
    nav: { style: 'minimal', itemRadius: '0px', itemPadding: '12px 8px', fontSize: '10px', iconSize: 22, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '12px', valueFont: 'sans', valueFontSize: '40px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-22', updatedAt: '2026-06-22' },
};
export default theme;
