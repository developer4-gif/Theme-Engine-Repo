import type { Theme } from '../types';

const theme: Theme = {
  id: 'wealth-navy',
  name: 'Wealth Navy',
  description: 'Deep navy wealth management — gold accents, portfolio charts, premium typography, private banking aesthetic. Inspired by investment advisory mobile apps.',
  category: 'finance',
  tags: ['finance', 'wealth', 'mobile', 'navy', 'gold', 'premium', 'investment', 'dark'],
  brand: { name: 'Wealth Navy', tagline: 'Wealth, managed.', logo: '', logoAlt: 'Wealth Navy', favicon: '', stripeColors: ['#C9A84C', '#0B1F3A', '#F0C96A', '#0B1F3A', '#C9A84C'], stripeHeight: 3 },
  colors: {
    bg: '#0B1F3A', bgSecondary: '#112544', bgTertiary: '#173060', panel: '#1A3060', panelSecondary: '#112544',
    tint: 'rgba(201,168,76,0.10)', ink: '#F0EDE0', ink2: '#A89060', ink3: '#5A5040',
    rule: '#1E3468', ruleStrong: '#2A4080', primary: '#C9A84C', primaryHover: '#B8942A', primaryText: '#0B1F3A',
    accent1: '#C9A84C', accent2: '#4CAF50', accent3: '#E53935', accent4: '#42A5F5', accent5: '#AB47BC',
    alert: '#E53935', warn: '#FFA000', ok: '#4CAF50', info: '#42A5F5',
    navBg: '#0B1F3A', navText: '#5A5040', navActiveText: '#C9A84C', navActiveBg: 'rgba(201,168,76,0.10)', navActiveBorder: '#C9A84C',
    headerBg: '#0B1F3A', headerText: '#F0EDE0', headerBorder: '#1E3468',
    buttonGradient: 'linear-gradient(135deg, #C9A84C 0%, #F0C96A 100%)',
  },
  typography: { fontSans: '"Inter", system-ui, sans-serif', fontSerif: '"Playfair Display", "Georgia", serif', fontMono: '"JetBrains Mono", monospace', headingFont: 'serif', xs: '10px', sm: '12px', base: '14px', md: '16px', lg: '18px', xl: '22px', '2xl': '28px', '3xl': '36px', '4xl': '48px', regular: 400, medium: 500, semibold: 600, bold: 700, tight: 1.1, normal: 1.55, relaxed: 1.75, tight_ls: '-0.02em', normal_ls: '0em', wide_ls: '0.03em', wider_ls: '0.08em' },
  spacing: { '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px', '16': '64px', '20': '80px', '24': '96px', contentPadding: '24px', maxWidth: '480px', navHeight: '64px', headerHeight: '60px' },
  borders: { radius: { none: '0', sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' }, width: { thin: '1px', base: '1px', thick: '2px' } },
  shadows: { none: 'none', sm: '0 2px 12px rgba(0,0,0,0.4)', md: '0 4px 24px rgba(0,0,0,0.5)', lg: '0 8px 40px rgba(201,168,76,0.20)', xl: '0 16px 64px rgba(201,168,76,0.28)', inner: 'inset 0 1px 3px rgba(0,0,0,0.4)' },
  animations: { duration: { fast: '150ms', base: '250ms', slow: '400ms' }, easing: { ease: 'cubic-bezier(0.4,0,0.2,1)', easeIn: 'cubic-bezier(0.4,0,1,1)', easeOut: 'cubic-bezier(0,0,0.2,1)', spring: 'cubic-bezier(0.34,1.56,0.64,1)' }, fade: '250ms' },
  layout: { variant: 'minimal', navPosition: 'top', sidebarStyle: 'none', navBarStyle: 'none', statLayout: 'hero-stat', contentLayout: 'cards-masonry', sidebarWidth: '0px', sidebarCollapsedWidth: '0px', headerSticky: true, navSticky: true, contentMaxWidth: '480px' },
  components: {
    button: { style: 'rounded', radius: '8px', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'none', paddingX: '24px', paddingY: '14px' },
    card: { style: 'bordered', radius: '12px', padding: '20px', shadow: '0 4px 20px rgba(0,0,0,0.4)', borderWidth: '1px', accentWidth: '0px', accentPosition: 'none' },
    table: { style: 'minimal', headerBg: '#1A3060', rowHoverBg: 'rgba(201,168,76,0.06)', borderColor: '#1E3468', cellPaddingX: '16px', cellPaddingY: '14px', fontSize: '14px', headerFontSize: '11px', stripeColor: 'rgba(255,255,255,0.02)', density: 'relaxed' },
    form: { style: 'outlined', radius: '8px', borderColor: '#2A4080', focusBorderColor: '#C9A84C', bg: '#1A3060', labelSize: '12px', inputSize: '16px' },
    modal: { style: 'bottom-sheet', radius: '20px', shadow: '0 -8px 48px rgba(0,0,0,0.7)', overlayColor: 'rgba(11,31,58,0.90)', overlayBlur: 'blur(12px)' },
    badge: { style: 'pill', radius: '9999px', fontSize: '11px', fontWeight: 600 },
    nav: { style: 'minimal', itemRadius: '0px', itemPadding: '12px 8px', fontSize: '10px', iconSize: 22, showLabels: true, showIcons: true, activeIndicator: 'underline', groupHeaders: false },
    stat: { radius: '12px', valueFont: 'serif', valueFontSize: '42px', accentPosition: 'none', accentWidth: '0px', bgStyle: 'glass' },
  },
  meta: { version: '1.0.0', author: 'Theme Engine', createdAt: '2026-06-22', updatedAt: '2026-06-22' },
};
export default theme;
