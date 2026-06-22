import type { Theme } from '../types';

const theme: Theme = {
  id: 'file-manager',
  name: 'File Manager',
  description: 'Clean dark file browser — folder grid, storage ring, file type icons, batch actions. Inspired by file manager & cloud storage mobile apps.',
  category: 'productivity',
  tags: ["productivity","files","mobile","dark","storage","cloud","folders","management"],
  brand: { name: 'File Manager', tagline: '', logo: '', logoAlt: 'File Manager', favicon: '', stripeColors: ['#0A84FF', '#1C1C1E', '#30D158', '#1C1C1E', '#0A84FF'], stripeHeight: 3 },
  colors: {
    bg: '#1C1C1E', bgSecondary: '#2C2C2E', bgTertiary: '#3A3A3C', panel: '#2C2C2E', panelSecondary: '#1C1C1E',
    tint: 'rgba(10,132,255,0.10)', ink: '#FFFFFF', ink2: '#EBEBF5', ink3: '#8E8E93', rule: '#3A3A3C', ruleStrong: '#48484A',
    primary: '#0A84FF', primaryHover: '#0070E0', primaryText: '#FFFFFF',
    accent1: '#0A84FF', accent2: '#30D158', accent3: '#FFD60A', accent4: '#BF5AF2', accent5: '#FF453A',
    alert: '#FF453A', warn: '#FFD60A', ok: '#30D158', info: '#BF5AF2',
    navBg: '#1C1C1E', navText: '#8E8E93', navActiveText: '#0A84FF', navActiveBg: 'rgba(10,132,255,0.10)', navActiveBorder: '#0A84FF',
    headerBg: '#1C1C1E', headerText: '#FFFFFF', headerBorder: '#3A3A3C',
  },
  typography: { fontSans: '"SF Pro Text", "Inter", system-ui, sans-serif', fontSerif: '"Georgia", serif', fontMono: '"SF Mono", monospace', headingFont: 'sans', xs: '10px', sm: '12px', base: '14px', md: '16px', lg: '18px', xl: '22px', '2xl': '28px', '3xl': '36px', '4xl': '48px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.15, normal: 1.55, relaxed: 1.75, tight_ls: '-0.01em', normal_ls: '0em', wide_ls: '0.02em', wider_ls: '0.05em' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '20px', maxWidth: '480px', navHeight: '60px', headerHeight: '56px' },
  borders: { radius: { none: '0', sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 8px rgba(0,0,0,0.08)', md: '0 4px 20px rgba(0,0,0,0.10)', lg: '0 8px 32px rgba(0,0,0,0.12)', xl: '0 16px 48px rgba(0,0,0,0.15)', inner: 'inset 0 1px 3px rgba(0,0,0,0.05)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: '220ms' },
  layout: { variant: 'minimal', navPosition: 'top', sidebarStyle: 'none', navBarStyle: 'none', statLayout: 'row-scroll', contentLayout: 'cards-masonry', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', headerSticky: true, navSticky: true, contentMaxWidth: '480px' },
  components: {
    button: { style: 'rounded', radius: '10px', fontWeight: 600, letterSpacing: '0em', textTransform: 'none', paddingX: '24px', paddingY: '14px' },
    card: { style: 'flat', radius: '10px', padding: '20px', shadow: '0 2px 16px rgba(0,0,0,0.08)', borderWidth: '0px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#2C2C2E', rowHoverBg: 'rgba(0,0,0,0.03)', borderColor: '#3A3A3C', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'rgba(0,0,0,0.02)', density: 'relaxed' },
    form: { style: 'outlined', radius: '10px', borderColor: '#48484A', focusBorderColor: '#0A84FF', bg: '#2C2C2E', labelSize: '12px', inputSize: '16px' },
    modal: { style: 'bottom-sheet', radius: '20px', shadow: '0 -4px 40px rgba(0,0,0,0.12)', overlayColor: 'rgba(0,0,0,0.5)', overlayBlur: 'blur(8px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '11px', fontWeight: 600 },
    nav: { style: 'minimal', itemRadius: '0px', itemPadding: '12px 8px', fontSize: '10px', iconSize: 22, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '12px', valueFont: 'sans', valueFontSize: '36px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-22', updatedAt: '2026-06-22' },
};
export default theme;
