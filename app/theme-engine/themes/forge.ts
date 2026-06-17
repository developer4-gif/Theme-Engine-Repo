import type { Theme } from '../types';
const theme: Theme = {
  id: 'forge', name: 'Forge',
  description: 'Industrial dark with amber glows — monospace precision for operational and manufacturing dashboards.',
  category: 'industrial', tags: ['industrial', 'dark', 'amber', 'mono', 'operational', 'manufacturing'],
  brand: { name: '', tagline: '', logo: '', logoAlt: '', favicon: '', stripeColors: ['#FF8F00', '#F57C00', '#E65100', '#BF360C', '#FF8F00'], stripeHeight: 2 },
  colors: { bg: '#0D0D0D', bgSecondary: '#111111', bgTertiary: '#1A1208', panel: '#141414', panelSecondary: '#1A1208', tint: '#1F1500', ink: '#FFE0B2', ink2: '#FFAB40', ink3: '#795548', rule: '#2A1F0A', ruleStrong: '#3D2B0E', primary: '#FF8F00', primaryHover: '#E65100', primaryText: '#0D0D0D', accent1: '#FF8F00', accent2: '#FF5722', accent3: '#4CAF50', accent4: '#03A9F4', accent5: '#9C27B0', alert: '#FF5722', warn: '#FFC107', ok: '#4CAF50', info: '#03A9F4', navBg: '#0D0D0D', navText: '#5D4037', navActiveText: '#FF8F00', navActiveBg: 'transparent', navActiveBorder: '#FF8F00', headerBg: '#0D0D0D', headerText: '#FFE0B2', headerBorder: '#2A1F0A', buttonGradient: 'linear-gradient(135deg, #FF8F00, #E65100)', buttonGlow: '0 0 20px rgba(255,143,0,0.5), 0 0 40px rgba(255,143,0,0.2)' },
  typography: { fontSans: '"JetBrains Mono", "Fira Code", monospace', fontSerif: '"JetBrains Mono", monospace', fontMono: '"JetBrains Mono", "Fira Code", monospace', xs: '9px', sm: '11px', base: '12px', md: '13px', lg: '14px', xl: '16px', '2xl': '20px', '3xl': '26px', '4xl': '32px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.4, relaxed: 1.6, tight_ls: '-0.3px', normal_ls: '0.5px', wide_ls: '1px', wider_ls: '2px', headingFont: 'mono' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '20px', maxWidth: '1600px', navHeight: '52px', headerHeight: '56px' },
  borders: { radius: { none: '0', sm: '1px', md: '2px', lg: '4px', xl: '6px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 2px 8px rgba(0,0,0,0.5)', md: '0 4px 16px rgba(0,0,0,0.6)', lg: '0 8px 32px rgba(0,0,0,0.7)', xl: '0 16px 64px rgba(0,0,0,0.8)', inner: 'inset 0 1px 3px rgba(0,0,0,0.5)' },
  animations: { duration: { fast: '80ms', base: '150ms', slow: '250ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.15s ease-out' },
  layout: { variant: 'dashboard', sidebarWidth: '52px', sidebarCollapsedWidth: '52px', navPosition: 'left', contentMaxWidth: '1600px', headerSticky: true, navSticky: true, sidebarStyle: 'minimal-icon', navBarStyle: 'none', statLayout: 'hero-stat', contentLayout: 'data-dense' },
  components: {
    button: { style: 'glow', radius: '2px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', paddingX: '18px', paddingY: '8px' },
    card: { style: 'bordered', radius: '2px', padding: '16px', shadow: 'none', borderWidth: '1px', accentWidth: '2px', accentPosition: 'left' },
    table: { style: 'compact', headerBg: '#1A1208', rowHoverBg: '#1F1500', borderColor: '#2A1F0A', cellPaddingX: '12px', cellPaddingY: '6px', fontSize: '11px', headerFontSize: '9px', stripeColor: '#111111', density: 'compact' },
    form: { style: 'outlined', radius: '2px', borderColor: '#2A1F0A', focusBorderColor: '#FF8F00', bg: '#141414', labelSize: '9px', inputSize: '11px' },
    modal: { style: 'centered', radius: '2px', shadow: '0 20px 60px rgba(0,0,0,0.8)', overlayColor: 'rgba(0,0,0,0.9)', overlayBlur: 'blur(4px)' },
    badge: { style: 'square', radius: '1px', fontSize: '9px', fontWeight: 700 },
    nav: { style: 'minimal', itemRadius: '2px', itemPadding: '14px 0', fontSize: '11px', iconSize: 20, showLabels: false, showIcons: true, activeIndicator: 'border-right', groupHeaders: false },
    stat: { radius: '2px', valueFont: 'mono', valueFontSize: '44px', accentPosition: 'top', accentWidth: '2px', bgStyle: 'solid' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-17', updatedAt: '2026-06-17' },
};
export default theme;
