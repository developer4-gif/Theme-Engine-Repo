import type { Theme } from '../types';
const theme: Theme = {
  id: 'industrial-gray', name: 'Industrial Gray',
  description: 'Steel gray with safety-yellow accents — built for manufacturing floors.',
  category: 'industrial', tags: ['gray', 'steel', 'industrial', 'manufacturing'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#546E7A','#37474F','#6D4C2A'], stripeHeight: 4 },
  colors: { bg: '#ECEFF1', bgSecondary: '#E0E5E8', bgTertiary: '#CFD8DC', panel: '#FFFFFF', panelSecondary: '#F5F7F8', tint: '#ECEFF1', ink: '#1C2529', ink2: '#37474F', ink3: '#78909C', rule: '#CFD8DC', ruleStrong: '#B0BEC5', primary: '#37474F', primaryHover: '#263238', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#558B2F', accent4: '#1565C0', accent5: '#6D4C2A', alert: '#B71C1C', warn: '#E65100', ok: '#2E7D32', info: '#1565C0', navBg: '#263238', navText: '#78909C', navActiveText: '#FDD835', navActiveBg: '#37474F', navActiveBorder: '#FDD835', headerBg: '#37474F', headerText: '#ECEFF1', headerBorder: '#263238' },
  typography: { fontSans: '"IBM Plex Sans", -apple-system, sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '1px', wider_ls: '2px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '68px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '4px', xl: '6px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(28,37,41,0.10)', md: '0 4px 12px rgba(28,37,41,0.12)', lg: '0 8px 24px rgba(28,37,41,0.16)', xl: '0 20px 60px rgba(28,37,41,0.20)', inner: 'inset 0 1px 3px rgba(28,37,41,0.10)' },
  animations: { duration: { fast: '150ms', base: '250ms', slow: '400ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.25s ease-out' },
  layout: { variant: 'enterprise', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'dark-solid', navBarStyle: 'none', statLayout: 'row-scroll', contentLayout: 'data-dense' },
  components: {
    button: { style: 'sharp', radius: '2px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', paddingX: '18px', paddingY: '10px', borderWidth: '2px', borderColor: '#FDD835' },
    card: { style: 'bordered', radius: '4px', padding: '20px', shadow: 'none', borderWidth: '1px', accentWidth: '4px', accentPosition: 'left' },
    table: { style: 'striped', headerBg: '#37474F', rowHoverBg: '#E0E5E8', borderColor: '#CFD8DC', cellPaddingX: '14px', cellPaddingY: '10px', fontSize: '13px', headerFontSize: '10px', stripeColor: '#F5F7F8', density: 'compact' },
    form: { style: 'outlined', radius: '2px', borderColor: '#CFD8DC', focusBorderColor: '#37474F', bg: '#FFFFFF', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '4px', shadow: '0 20px 60px rgba(28,37,41,0.20)', overlayColor: 'rgba(28,37,41,0.5)', overlayBlur: 'none' },
    badge: { style: 'square', radius: '0px', fontSize: '10px', fontWeight: 700 },
    nav: { style: 'filled', itemRadius: '2px', itemPadding: '10px 16px', fontSize: '12px', iconSize: 16, showLabels: true, showIcons: true, activeIndicator: 'border-left', groupHeaders: true },
    stat: { radius: '4px', valueFont: 'mono', valueFontSize: '32px', accentPosition: 'left', accentWidth: '4px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
