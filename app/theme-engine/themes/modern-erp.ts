import type { Theme } from '../types';
const theme: Theme = {
  id: 'modern-erp', name: 'Modern ERP',
  description: 'Slate-blue dense ERP system — information-first, maximum density.',
  category: 'corporate', tags: ['erp', 'slate', 'dense', 'enterprise'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#2C4A8C','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#EEF0F6', bgSecondary: '#E4E7F0', bgTertiary: '#D8DCE8', panel: '#FFFFFF', panelSecondary: '#F4F5FA', tint: '#EEF0F6', ink: '#0E1428', ink2: '#263054', ink3: '#6A78A0', rule: '#CDD3E8', ruleStrong: '#A8B2D4', primary: '#2C4A8C', primaryHover: '#1E3470', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#4CAF50', accent4: '#2196F3', accent5: '#6D4C2A', alert: '#C62828', warn: '#E65100', ok: '#2E7D32', info: '#1565C0', navBg: '#1E2D50', navText: '#6A78A0', navActiveText: '#FFFFFF', navActiveBg: '#2C4A8C', navActiveBorder: '#FDD835', headerBg: '#FFFFFF', headerText: '#0E1428', headerBorder: '#CDD3E8' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '12px', md: '13px', lg: '14px', xl: '16px', '2xl': '20px', '3xl': '24px', '4xl': '32px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.4, relaxed: 1.6, tight_ls: '-0.3px', normal_ls: '0px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '3px', '2': '6px', '3': '10px', '4': '14px', '5': '18px', '6': '22px', '8': '28px', '10': '36px', '12': '44px', '16': '56px', '20': '72px', '24': '88px', contentPadding: '24px', maxWidth: '1600px', navHeight: '48px', headerHeight: '58px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '8px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(14,20,40,0.08)', md: '0 3px 10px rgba(14,20,40,0.10)', lg: '0 6px 20px rgba(14,20,40,0.14)', xl: '0 16px 48px rgba(14,20,40,0.18)', inner: 'inset 0 1px 3px rgba(14,20,40,0.08)' },
  animations: { duration: { fast: '100ms', base: '180ms', slow: '320ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.18s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '200px', sidebarCollapsedWidth: '44px', navPosition: 'left', contentMaxWidth: '1600px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'row-scroll', contentLayout: 'data-dense' },
  components: {
    button: { style: 'sharp', radius: '3px', fontWeight: 600, letterSpacing: '0.4px', textTransform: 'none', paddingX: '12px', paddingY: '6px' },
    card: { style: 'bordered', radius: '4px', padding: '14px', shadow: 'none', borderWidth: '1px', accentWidth: '2px', accentPosition: 'left' },
    table: { style: 'compact', headerBg: '#EEF0F6', rowHoverBg: '#E4E7F0', borderColor: '#CDD3E8', cellPaddingX: '10px', cellPaddingY: '7px', fontSize: '12px', headerFontSize: '10px', stripeColor: '#F4F5FA', density: 'compact' },
    form: { style: 'outlined', radius: '3px', borderColor: '#CDD3E8', focusBorderColor: '#2C4A8C', bg: '#FFFFFF', labelSize: '10px', inputSize: '12px' },
    modal: { style: 'centered', radius: '4px', shadow: '0 16px 48px rgba(14,20,40,0.18)', overlayColor: 'rgba(14,20,40,0.45)', overlayBlur: 'blur(2px)' },
    badge: { style: 'square', radius: '2px', fontSize: '9px', fontWeight: 600 },
    nav: { style: 'filled', itemRadius: '3px', itemPadding: '8px 12px', fontSize: '12px', iconSize: 15, showLabels: true, showIcons: true, activeIndicator: 'border-left', groupHeaders: true },
    stat: { radius: '4px', valueFont: 'mono', valueFontSize: '28px', accentPosition: 'left', accentWidth: '2px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
