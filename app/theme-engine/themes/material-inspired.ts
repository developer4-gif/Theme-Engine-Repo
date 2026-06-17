import type { Theme } from '../types';
const theme: Theme = {
  id: 'material-inspired', name: 'Material Inspired',
  description: 'Material Design blue with elevation shadows — familiar, accessible, structured.',
  category: 'tech', tags: ['material', 'blue', 'elevation', 'google'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1976D2','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#FAFAFA', bgSecondary: '#F5F5F5', bgTertiary: '#EEEEEE', panel: '#FFFFFF', panelSecondary: '#F5F5F5', tint: '#E3F2FD', ink: '#212121', ink2: '#424242', ink3: '#9E9E9E', rule: '#E0E0E0', ruleStrong: '#BDBDBD', primary: '#1976D2', primaryHover: '#1565C0', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#F57C00', accent3: '#388E3C', accent4: '#0288D1', accent5: '#7B1FA2', alert: '#D32F2F', warn: '#F57C00', ok: '#388E3C', info: '#0288D1', navBg: '#1976D2', navText: '#BBDEFB', navActiveText: '#FFFFFF', navActiveBg: '#1565C0', navActiveBorder: '#FDD835', headerBg: '#1976D2', headerText: '#FFFFFF', headerBorder: '#1565C0', buttonGradient: 'linear-gradient(180deg, #1E88E5, #1565C0)', buttonGlow: '0 4px 12px rgba(25,118,210,0.4)' },
  typography: { fontSans: '"Roboto", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"Roboto Mono", "IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.3px', normal_ls: '0.1px', wide_ls: '0.8px', wider_ls: '1.5px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '24px', maxWidth: '1440px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '2px', md: '4px', lg: '6px', xl: '8px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)', md: '0 3px 6px rgba(0,0,0,0.16),0 3px 6px rgba(0,0,0,0.23)', lg: '0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgba(0,0,0,0.23)', xl: '0 19px 38px rgba(0,0,0,0.30),0 15px 12px rgba(0,0,0,0.22)', inner: 'inset 0 1px 3px rgba(0,0,0,0.12)' },
  animations: { duration: { fast: '150ms', base: '250ms', slow: '400ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.25s cubic-bezier(0.4,0,0.2,1)' },
  layout: { variant: 'left-sidebar', sidebarWidth: '240px', sidebarCollapsedWidth: '56px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'light-card', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'chart-left-table-right' },
  components: {
    button: { style: 'rounded', radius: '4px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', paddingX: '16px', paddingY: '9px' },
    card: { style: 'elevated', radius: '4px', padding: '16px', shadow: '0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)', borderWidth: '0px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'enterprise', headerBg: '#F5F5F5', rowHoverBg: '#E3F2FD', borderColor: '#E0E0E0', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'normal' },
    form: { style: 'filled', radius: '4px', borderColor: '#E0E0E0', focusBorderColor: '#1976D2', bg: '#F5F5F5', labelSize: '10px', inputSize: '13px' },
    modal: { style: 'centered', radius: '4px', shadow: '0 19px 38px rgba(0,0,0,0.30),0 15px 12px rgba(0,0,0,0.22)', overlayColor: 'rgba(0,0,0,0.5)', overlayBlur: 'none' },
    badge: { style: 'square', radius: '2px', fontSize: '10px', fontWeight: 500 },
    nav: { style: 'filled', itemRadius: '0px', itemPadding: '10px 16px', fontSize: '13px', iconSize: 20, showLabels: true, showIcons: true, activeIndicator: 'bg-fill', groupHeaders: true },
    stat: { radius: '4px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'top', accentWidth: '3px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
