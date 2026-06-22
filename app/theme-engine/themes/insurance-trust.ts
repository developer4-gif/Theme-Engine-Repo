import type { Theme } from '../types';

const theme: Theme = {
  id: 'insurance-trust',
  name: 'Insurance Trust',
  description: 'Calm blue insurance mobile — shield motifs, policy cards, trust signals, clean claim flow. Inspired by insurance & protection mobile apps.',
  category: 'finance',
  tags: ['finance', 'insurance', 'mobile', 'blue', 'trust', 'clean', 'calm', 'protection'],
  brand: { name: 'Insurance Trust', tagline: 'Protected, always.', logo: '', logoAlt: 'Insurance Trust', favicon: '', stripeColors: ['#1565C0', '#FFFFFF', '#1976D2', '#FFFFFF', '#1565C0'], stripeHeight: 3 },
  colors: {
    bg: '#FAFCFF', bgSecondary: '#EEF3FB', bgTertiary: '#DEEAF7', panel: '#FFFFFF', panelSecondary: '#FAFCFF',
    tint: 'rgba(21,101,192,0.06)', ink: '#0D1B2A', ink2: '#3A5580', ink3: '#8AAAC8',
    rule: '#CADDF0', ruleStrong: '#AAC8E8', primary: '#1565C0', primaryHover: '#0D47A1', primaryText: '#FFFFFF',
    accent1: '#1565C0', accent2: '#00897B', accent3: '#F57C00', accent4: '#6A1B9A', accent5: '#C62828',
    alert: '#C62828', warn: '#F57C00', ok: '#00897B', info: '#1565C0',
    navBg: '#FFFFFF', navText: '#8AAAC8', navActiveText: '#1565C0', navActiveBg: 'rgba(21,101,192,0.08)', navActiveBorder: '#1565C0',
    headerBg: '#FFFFFF', headerText: '#0D1B2A', headerBorder: '#CADDF0',
  },
  typography: { fontSans: '"Inter", "Roboto", system-ui, sans-serif', fontSerif: '"Georgia", serif', fontMono: '"SF Mono", monospace', headingFont: 'sans', xs: '10px', sm: '12px', base: '14px', md: '16px', lg: '18px', xl: '22px', '2xl': '28px', '3xl': '36px', '4xl': '48px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.2, normal: 1.6, relaxed: 1.8, tight_ls: '-0.01em', normal_ls: '0em', wide_ls: '0.02em', wider_ls: '0.05em' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '20px', maxWidth: '480px', navHeight: '60px', headerHeight: '56px' },
  borders: { radius: { none: '0', sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 6px rgba(21,101,192,0.06)', md: '0 4px 16px rgba(21,101,192,0.08)', lg: '0 8px 32px rgba(21,101,192,0.10)', xl: '0 16px 48px rgba(21,101,192,0.14)', inner: 'inset 0 1px 3px rgba(0,0,0,0.04)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: '220ms' },
  layout: { variant: 'minimal', navPosition: 'top', sidebarStyle: 'none', navBarStyle: 'none', statLayout: 'row-scroll', contentLayout: 'cards-masonry', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', headerSticky: true, navSticky: true, contentMaxWidth: '480px' },
  components: {
    button: { style: 'rounded', radius: '10px', fontWeight: 600, letterSpacing: '0em', textTransform: 'none', paddingX: '24px', paddingY: '14px' },
    card: { style: 'elevated', radius: '12px', padding: '20px', shadow: '0 2px 12px rgba(21,101,192,0.06)', borderWidth: '0px', accentWidth: '4px', accentPosition: 'top' },
    table: { style: 'minimal', headerBg: '#EEF3FB', rowHoverBg: 'rgba(21,101,192,0.04)', borderColor: '#CADDF0', cellPaddingX: '16px', cellPaddingY: '14px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'rgba(0,0,0,0.02)', density: 'relaxed' },
    form: { style: 'outlined', radius: '10px', borderColor: '#CADDF0', focusBorderColor: '#1565C0', bg: '#FFFFFF', labelSize: '12px', inputSize: '16px' },
    modal: { style: 'bottom-sheet', radius: '20px', shadow: '0 -4px 32px rgba(0,0,0,0.10)', overlayColor: 'rgba(0,0,0,0.5)', overlayBlur: 'blur(8px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '11px', fontWeight: 600 },
    nav: { style: 'minimal', itemRadius: '0px', itemPadding: '12px 8px', fontSize: '10px', iconSize: 22, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '12px', valueFont: 'sans', valueFontSize: '36px', accentPosition: 'top', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-22', updatedAt: '2026-06-22' },
};
export default theme;
