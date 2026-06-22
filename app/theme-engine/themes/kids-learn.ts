import type { Theme } from '../types';

const theme: Theme = {
  id: 'kids-learn',
  name: 'Kids Learn',
  description: 'Bright rainbow children learning — big touch targets, bold colors, cartoon-style cards, reward badges. Inspired by toddler & kids educational mobile apps.',
  category: 'education',
  tags: ['education', 'kids', 'mobile', 'rainbow', 'bright', 'cartoon', 'toddler', 'learning'],
  brand: { name: 'Kids Learn', tagline: 'Learning is fun!', logo: '', logoAlt: 'Kids Learn', favicon: '', stripeColors: ['#FF6B6B', '#FFD700', '#6BCB77', '#4D96FF', '#FF6B6B'], stripeHeight: 5 },
  colors: {
    bg: '#FFFDF0', bgSecondary: '#FFF5D6', bgTertiary: '#FFE8B0', panel: '#FFFFFF', panelSecondary: '#FFFDF0',
    tint: 'rgba(107,203,119,0.10)', ink: '#2D1B00', ink2: '#7A5000', ink3: '#C0A040',
    rule: '#FFE0A0', ruleStrong: '#FFC870',
    primary: '#FF6B6B', primaryHover: '#FF5252', primaryText: '#FFFFFF',
    accent1: '#FF6B6B', accent2: '#FFD700', accent3: '#6BCB77', accent4: '#4D96FF', accent5: '#CC65FF',
    alert: '#FF6B6B', warn: '#FFD700', ok: '#6BCB77', info: '#4D96FF',
    navBg: '#FFFFFF', navText: '#C0A040', navActiveText: '#FF6B6B', navActiveBg: 'rgba(255,107,107,0.10)', navActiveBorder: '#FF6B6B',
    headerBg: '#FFFDF0', headerText: '#2D1B00', headerBorder: '#FFE0A0',
  },
  typography: { fontSans: '"Nunito", "Bubblegum Sans", system-ui, sans-serif', fontSerif: '"Georgia", serif', fontMono: '"SF Mono", monospace', headingFont: 'sans', xs: '12px', sm: '14px', base: '16px', md: '18px', lg: '22px', xl: '28px', '2xl': '36px', '3xl': '48px', '4xl': '64px', regular: 400, medium: 600, semibold: 700, bold: 900, tight: 1.1, normal: 1.6, relaxed: 1.8, tight_ls: '0em', normal_ls: '0em', wide_ls: '0.02em', wider_ls: '0.04em' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '20px', maxWidth: '480px', navHeight: '72px', headerHeight: '60px' },
  borders: { radius: { none: '0', sm: '12px', md: '20px', lg: '28px', xl: '40px', full: '9999px' }, width: { thin: '2px', base: '3px', thick: '4px' } },
  shadows: { none: 'none', sm: '0 4px 12px rgba(0,0,0,0.10)', md: '0 6px 20px rgba(0,0,0,0.12)', lg: '0 8px 32px rgba(255,107,107,0.20)', xl: '0 12px 48px rgba(255,107,107,0.25)', inner: 'inset 0 2px 6px rgba(0,0,0,0.06)' },
  animations: { duration: { fast: '200ms', base: '320ms', slow: '500ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: '320ms' },
  layout: { variant: 'minimal', navPosition: 'top', sidebarStyle: 'none', navBarStyle: 'none', statLayout: 'row-scroll', contentLayout: 'cards-masonry', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', headerSticky: true, navSticky: true, contentMaxWidth: '480px' },
  components: {
    button: { style: 'pill', radius: '9999px', fontWeight: 900, letterSpacing: '0em', textTransform: 'none', paddingX: '32px', paddingY: '18px' },
    card: { style: 'elevated', radius: '28px', padding: '24px', shadow: '0 6px 20px rgba(0,0,0,0.10)', borderWidth: '3px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#FFF5D6', rowHoverBg: 'rgba(107,203,119,0.06)', borderColor: '#FFE0A0', cellPaddingX: '20px', cellPaddingY: '16px', fontSize: '16px', headerFontSize: '12px', stripeColor: 'rgba(0,0,0,0.02)', density: 'relaxed' },
    form: { style: 'outlined', radius: '20px', borderColor: '#FFC870', focusBorderColor: '#FF6B6B', bg: '#FFFFFF', labelSize: '14px', inputSize: '18px' },
    modal: { style: 'bottom-sheet', radius: '40px', shadow: '0 -4px 48px rgba(0,0,0,0.12)', overlayColor: 'rgba(0,0,0,0.5)', overlayBlur: 'blur(8px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '13px', fontWeight: 700 },
    nav: { style: 'filled', itemRadius: '9999px', itemPadding: '14px 10px', fontSize: '12px', iconSize: 28, showLabels: true, showIcons: true, activeIndicator: 'bg-fill', groupHeaders: false },
    stat: { radius: '24px', valueFont: 'sans', valueFontSize: '48px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-22', updatedAt: '2026-06-22' },
};
export default theme;
