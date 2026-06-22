import type { Theme } from '../types';

const theme: Theme = {
  id: 'pharmacy-green',
  name: 'Pharmacy Green',
  description: 'Clean pharmacy & medicine — green cross accent, drug info cards, dosage reminders, clean prescription UI. Inspired by pharmacy & medication mobile apps.',
  category: 'medical',
  tags: ['medical', 'pharmacy', 'mobile', 'green', 'clean', 'medicine', 'health', 'prescription'],
  brand: { name: 'Pharmacy Green', tagline: 'Your health, simplified.', logo: '', logoAlt: 'Pharmacy Green', favicon: '', stripeColors: ['#2E7D32', '#FFFFFF', '#43A047', '#FFFFFF', '#2E7D32'], stripeHeight: 3 },
  colors: {
    bg: '#FFFFFF', bgSecondary: '#F1F8F1', bgTertiary: '#E8F5E9', panel: '#FFFFFF', panelSecondary: '#F1F8F1',
    tint: 'rgba(46,125,50,0.06)', ink: '#1B3D1C', ink2: '#3D6E3F', ink3: '#80A882',
    rule: '#C8E6C9', ruleStrong: '#A5D6A7', primary: '#2E7D32', primaryHover: '#1B5E20', primaryText: '#FFFFFF',
    accent1: '#2E7D32', accent2: '#0277BD', accent3: '#F57C00', accent4: '#6A1B9A', accent5: '#C62828',
    alert: '#C62828', warn: '#F57C00', ok: '#2E7D32', info: '#0277BD',
    navBg: '#FFFFFF', navText: '#80A882', navActiveText: '#2E7D32', navActiveBg: 'rgba(46,125,50,0.08)', navActiveBorder: '#2E7D32',
    headerBg: '#2E7D32', headerText: '#FFFFFF', headerBorder: '#1B5E20',
  },
  typography: { fontSans: '"Roboto", "Inter", system-ui, sans-serif', fontSerif: '"Georgia", serif', fontMono: '"Roboto Mono", monospace', headingFont: 'sans', xs: '10px', sm: '12px', base: '14px', md: '16px', lg: '18px', xl: '20px', '2xl': '24px', '3xl': '30px', '4xl': '38px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.2, normal: 1.55, relaxed: 1.75, tight_ls: '0em', normal_ls: '0em', wide_ls: '0.02em', wider_ls: '0.05em' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '16px', maxWidth: '480px', navHeight: '56px', headerHeight: '56px' },
  borders: { radius: { none: '0', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 6px rgba(0,0,0,0.06)', md: '0 4px 16px rgba(0,0,0,0.08)', lg: '0 8px 32px rgba(46,125,50,0.10)', xl: '0 16px 48px rgba(46,125,50,0.14)', inner: 'inset 0 1px 3px rgba(0,0,0,0.04)' },
  animations: { duration: { fast: '100ms', base: '180ms', slow: '300ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: '180ms' },
  layout: { variant: 'minimal', navPosition: 'top', sidebarStyle: 'none', navBarStyle: 'none', statLayout: 'row-scroll', contentLayout: 'cards-masonry', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', headerSticky: true, navSticky: true, contentMaxWidth: '480px' },
  components: {
    button: { style: 'rounded', radius: '8px', fontWeight: 500, letterSpacing: '0em', textTransform: 'none', paddingX: '20px', paddingY: '12px' },
    card: { style: 'elevated', radius: '8px', padding: '16px', shadow: '0 1px 8px rgba(0,0,0,0.06)', borderWidth: '0px', accentWidth: '4px', accentPosition: 'left' },
    table: { style: 'minimal', headerBg: '#F1F8F1', rowHoverBg: 'rgba(46,125,50,0.04)', borderColor: '#C8E6C9', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'rgba(0,0,0,0.02)', density: 'normal' },
    form: { style: 'outlined', radius: '8px', borderColor: '#A5D6A7', focusBorderColor: '#2E7D32', bg: '#FFFFFF', labelSize: '12px', inputSize: '16px' },
    modal: { style: 'bottom-sheet', radius: '16px', shadow: '0 -4px 24px rgba(0,0,0,0.10)', overlayColor: 'rgba(0,0,0,0.5)', overlayBlur: 'blur(4px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '11px', fontWeight: 500 },
    nav: { style: 'minimal', itemRadius: '0px', itemPadding: '12px 8px', fontSize: '10px', iconSize: 22, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '8px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'top', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-22', updatedAt: '2026-06-22' },
};
export default theme;
