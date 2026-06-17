import type { Theme } from '../types';
const theme: Theme = {
  id: 'soft-glass', name: 'Soft Glass',
  description: 'Frosted glass morphism with pastel gradients — airy and modern.',
  category: 'tech', tags: ['glass', 'blur', 'pastel', 'modern', 'gradient'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#1E88E5','#9C27B0'], stripeHeight: 3 },
  colors: { bg: 'linear-gradient(135deg, #E8F4FD 0%, #F3E8FF 50%, #FFF3E8 100%)', bgSecondary: '#EEF6FD', bgTertiary: '#E4EFF9', panel: 'rgba(255,255,255,0.72)', panelSecondary: 'rgba(255,255,255,0.52)', tint: 'rgba(255,255,255,0.40)', ink: '#1A1240', ink2: '#3D3070', ink3: '#8070B0', rule: 'rgba(180,160,220,0.3)', ruleStrong: 'rgba(150,120,200,0.5)', primary: '#6C3FD6', primaryHover: '#5530B8', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#FF7043', accent3: '#66BB6A', accent4: '#29B6F6', accent5: '#CE93D8', alert: '#E53935', warn: '#FB8C00', ok: '#43A047', info: '#1E88E5', navBg: 'rgba(255,255,255,0.85)', navText: '#4A3880', navActiveText: '#6C3FD6', navActiveBg: 'rgba(108,63,214,0.10)', navActiveBorder: '#6C3FD6', headerBg: 'rgba(255,255,255,0.85)', headerText: '#1A1240', headerBorder: 'rgba(180,160,220,0.3)' },
  typography: { fontSans: '"Inter", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.5px', wider_ls: '1px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '68px' },
  borders: { radius: { none: '0px', sm: '6px', md: '12px', lg: '16px', xl: '24px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 2px 8px rgba(108,63,214,0.10)', md: '0 8px 24px rgba(108,63,214,0.14)', lg: '0 16px 48px rgba(108,63,214,0.18)', xl: '0 24px 72px rgba(108,63,214,0.24)', inner: 'inset 0 1px 4px rgba(108,63,214,0.10)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.22s ease-out' },
  layout: { variant: 'dashboard', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'glass', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'cards-masonry' },
  components: {
    button: { style: 'pill', radius: '9999px', fontWeight: 600, letterSpacing: '0.2px', textTransform: 'none', paddingX: '22px', paddingY: '10px' },
    card: { style: 'glass', radius: '16px', padding: '22px', shadow: '0 8px 32px rgba(108,63,214,0.14)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: 'rgba(255,255,255,0.5)', rowHoverBg: 'rgba(255,255,255,0.4)', borderColor: 'rgba(180,160,220,0.3)', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'outlined', radius: '12px', borderColor: 'rgba(180,160,220,0.5)', focusBorderColor: '#6C3FD6', bg: 'rgba(255,255,255,0.6)', labelSize: '11px', inputSize: '13px' },
    modal: { style: 'centered', radius: '20px', shadow: '0 24px 72px rgba(108,63,214,0.24)', overlayColor: 'rgba(26,18,64,0.3)', overlayBlur: 'blur(8px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'pill', itemRadius: '12px', itemPadding: '10px 16px', fontSize: '13px', iconSize: 17, showLabels: true, showIcons: true, activeIndicator: 'pill', groupHeaders: false },
    stat: { radius: '16px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'glass' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
