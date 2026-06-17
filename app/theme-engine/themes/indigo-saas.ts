import type { Theme } from '../types';
const theme: Theme = {
  id: 'indigo-saas', name: 'Indigo SaaS',
  description: 'Vibrant indigo-purple gradient — modern SaaS product feel.',
  category: 'tech', tags: ['indigo', 'saas', 'modern', 'gradient'],
  brand: { name: 'Jain Irrigation Systems Ltd.', tagline: 'Small Ideas. Big Revolutions.', logo: '/logos/jain-logo.png', logoAlt: 'JAIN Irrigation Systems Ltd.', favicon: '/logos/jain-favicon.ico', stripeColors: ['#FDD835','#F57C00','#7CB342','#3F51B5','#6D4C2A'], stripeHeight: 3 },
  colors: { bg: '#F5F4FF', bgSecondary: '#EAE9FC', bgTertiary: '#DDDCF8', panel: '#FFFFFF', panelSecondary: '#F8F8FE', tint: '#F0EFFD', ink: '#1A1640', ink2: '#3D3878', ink3: '#7B76B5', rule: '#E0DFFB', ruleStrong: '#C0BDEE', primary: '#3F51B5', primaryHover: '#303F9F', primaryText: '#FFFFFF', accent1: '#FDD835', accent2: '#FF7043', accent3: '#66BB6A', accent4: '#26C6DA', accent5: '#7E57C2', alert: '#E53935', warn: '#FB8C00', ok: '#43A047', info: '#1E88E5', navBg: '#3F51B5', navText: '#C5CAE9', navActiveText: '#FFFFFF', navActiveBg: '#303F9F', navActiveBorder: '#FDD835', headerBg: '#FFFFFF', headerText: '#1A1640', headerBorder: '#E0DFFB', buttonGradient: 'linear-gradient(135deg, #3F51B5, #7E57C2)', buttonGlow: '0 4px 14px rgba(63,81,181,0.4)' },
  typography: { fontSans: '"Inter", "IBM Plex Sans", sans-serif', fontSerif: '"IBM Plex Serif", Georgia, serif', fontMono: '"IBM Plex Mono", monospace', xs: '10px', sm: '11px', base: '13px', md: '14px', lg: '16px', xl: '18px', '2xl': '22px', '3xl': '28px', '4xl': '36px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.5, relaxed: 1.7, tight_ls: '-0.5px', normal_ls: '0px', wide_ls: '0.6px', wider_ls: '1.2px', headingFont: 'sans' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '32px', maxWidth: '1440px', navHeight: '56px', headerHeight: '64px' },
  borders: { radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 1px 3px rgba(63,81,181,0.10)', md: '0 4px 12px rgba(63,81,181,0.14)', lg: '0 8px 24px rgba(63,81,181,0.18)', xl: '0 20px 60px rgba(63,81,181,0.25)', inner: 'inset 0 1px 3px rgba(63,81,181,0.10)' },
  animations: { duration: { fast: '120ms', base: '220ms', slow: '380ms' }, easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: 'fadein 0.22s ease-out' },
  layout: { variant: 'left-sidebar', sidebarWidth: '240px', sidebarCollapsedWidth: '60px', navPosition: 'left', contentMaxWidth: '1440px', headerSticky: true, navSticky: true, sidebarStyle: 'gradient', navBarStyle: 'none', statLayout: 'grid-4', contentLayout: 'cards-masonry' },
  components: {
    button: { style: 'gradient', radius: '8px', fontWeight: 600, letterSpacing: '0.2px', textTransform: 'none', paddingX: '18px', paddingY: '9px' },
    card: { style: 'elevated', radius: '12px', padding: '20px', shadow: '0 4px 12px rgba(63,81,181,0.14)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#F0EFFD', rowHoverBg: '#EAE9FC', borderColor: '#E0DFFB', cellPaddingX: '16px', cellPaddingY: '12px', fontSize: '13px', headerFontSize: '10px', stripeColor: 'transparent', density: 'relaxed' },
    form: { style: 'outlined', radius: '8px', borderColor: '#E0DFFB', focusBorderColor: '#3F51B5', bg: '#FFFFFF', labelSize: '11px', inputSize: '13px' },
    modal: { style: 'centered', radius: '12px', shadow: '0 20px 60px rgba(63,81,181,0.25)', overlayColor: 'rgba(26,22,64,0.4)', overlayBlur: 'blur(4px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '10px', fontWeight: 600 },
    nav: { style: 'pill', itemRadius: '8px', itemPadding: '10px 14px', fontSize: '13px', iconSize: 18, showLabels: true, showIcons: true, activeIndicator: 'pill', groupHeaders: true },
    stat: { radius: '12px', valueFont: 'sans', valueFontSize: '32px', accentPosition: 'top', accentWidth: '3px', bgStyle: 'gradient' },
  },
  meta: { version: '1.0.0', author: 'JISL Theme Engine', createdAt: '2026-06-01', updatedAt: '2026-06-01' },
};
export default theme;
