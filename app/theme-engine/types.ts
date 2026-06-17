// ─── Theme Engine Type Definitions ───────────────────────────────────────────

export type LayoutVariant =
  | 'top-nav'
  | 'left-sidebar'
  | 'right-sidebar'
  | 'hybrid'
  | 'minimal'
  | 'dashboard'
  | 'enterprise';

export type ButtonStyle = 'rounded' | 'sharp' | 'pill' | 'outline' | 'ghost' | 'gradient' | 'glow';
export type CardStyle = 'flat' | 'soft' | 'bordered' | 'elevated' | 'glass' | 'inset' | 'neon';
export type TableStyle = 'enterprise' | 'minimal' | 'striped' | 'bordered' | 'card' | 'compact' | 'spreadsheet';
export type FormStyle = 'outlined' | 'filled' | 'underlined' | 'floating' | 'ghost';
export type ModalStyle = 'centered' | 'slide' | 'drawer' | 'fullscreen' | 'bottom-sheet';
export type BadgeStyle = 'pill' | 'square' | 'dot' | 'outline' | 'glow' | 'tag';
export type IconStyle = 'outline' | 'filled' | 'duotone' | 'sharp';
export type NavStyle = 'underline' | 'filled' | 'pill' | 'minimal' | 'bordered' | 'floating' | 'compact';
export type ShadowScale = 'none' | 'subtle' | 'medium' | 'strong' | 'dramatic';

export type SidebarStyle =
  | 'dark-solid'
  | 'light-card'
  | 'minimal-icon'
  | 'floating'
  | 'gradient'
  | 'glass'
  | 'bordered'
  | 'none';

export type NavBarStyle =
  | 'classic'
  | 'pills'
  | 'underline'
  | 'full-bg'
  | 'floating'
  | 'breadcrumb'
  | 'none';

export type StatLayout =
  | 'grid-4'
  | 'grid-3'
  | 'grid-2'
  | 'row-scroll'
  | 'sidebar-stats'
  | 'hero-stat';

export type ContentLayout =
  | 'table-primary'
  | 'chart-left-table-right'
  | 'table-top-charts-below'
  | 'cards-masonry'
  | 'split-kanban'
  | 'data-dense';

export type ActiveIndicator = 'border-left' | 'border-right' | 'bg-fill' | 'dot' | 'underline' | 'pill';

export interface ColorTokens {
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  panel: string;
  panelSecondary: string;
  tint: string;
  ink: string;
  ink2: string;
  ink3: string;
  rule: string;
  ruleStrong: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
  accent5: string;
  alert: string;
  warn: string;
  ok: string;
  info: string;
  navBg: string;
  navText: string;
  navActiveText: string;
  navActiveBg: string;
  navActiveBorder: string;
  headerBg: string;
  headerText: string;
  headerBorder: string;
  buttonGradient?: string;
  buttonGlow?: string;
}

export interface TypographyTokens {
  fontSans: string;
  fontSerif: string;
  fontMono: string;
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
  tight: number;
  normal: number;
  relaxed: number;
  tight_ls: string;
  normal_ls: string;
  wide_ls: string;
  wider_ls: string;
  headingFont: 'sans' | 'serif' | 'mono';
}

export interface SpacingTokens {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '8': string;
  '10': string;
  '12': string;
  '16': string;
  '20': string;
  '24': string;
  contentPadding: string;
  maxWidth: string;
  navHeight: string;
  headerHeight: string;
}

export interface BorderTokens {
  radius: { none: string; sm: string; md: string; lg: string; xl: string; full: string };
  width: { thin: string; base: string; thick: string };
}

export interface ShadowTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
}

export interface AnimationTokens {
  duration: { fast: string; base: string; slow: string };
  easing: { ease: string; easeIn: string; easeOut: string; spring: string };
  fade: string;
}

export interface LayoutTokens {
  variant: LayoutVariant;
  sidebarWidth: string;
  sidebarCollapsedWidth: string;
  navPosition: 'top' | 'left' | 'right' | 'both';
  contentMaxWidth: string;
  headerSticky: boolean;
  navSticky: boolean;
  sidebarStyle: SidebarStyle;
  navBarStyle: NavBarStyle;
  statLayout: StatLayout;
  contentLayout: ContentLayout;
}

export interface ComponentTokens {
  button: {
    style: ButtonStyle;
    radius: string;
    fontWeight: number;
    letterSpacing: string;
    textTransform: 'none' | 'uppercase' | 'capitalize';
    paddingX: string;
    paddingY: string;
    borderWidth?: string;
    borderColor?: string;
  };
  card: {
    style: CardStyle;
    radius: string;
    padding: string;
    shadow: string;
    borderWidth: string;
    accentWidth: string;
    accentPosition?: 'left' | 'top' | 'right' | 'none';
  };
  table: {
    style: TableStyle;
    headerBg: string;
    rowHoverBg: string;
    borderColor: string;
    cellPaddingX: string;
    cellPaddingY: string;
    fontSize: string;
    headerFontSize: string;
    stripeColor: string;
    density?: 'compact' | 'normal' | 'relaxed';
  };
  form: {
    style: FormStyle;
    radius: string;
    borderColor: string;
    focusBorderColor: string;
    bg: string;
    labelSize: string;
    inputSize: string;
  };
  modal: {
    style: ModalStyle;
    radius: string;
    shadow: string;
    overlayColor: string;
    overlayBlur: string;
  };
  badge: {
    style: BadgeStyle;
    radius: string;
    fontSize: string;
    fontWeight: number;
  };
  nav: {
    style: NavStyle;
    itemRadius: string;
    itemPadding: string;
    fontSize: string;
    iconSize: number;
    showLabels: boolean;
    showIcons?: boolean;
    activeIndicator: ActiveIndicator;
    groupHeaders?: boolean;
  };
  stat: {
    radius: string;
    valueFont: 'sans' | 'serif' | 'mono';
    valueFontSize: string;
    accentPosition: 'left' | 'top' | 'none' | 'right';
    accentWidth: string;
    bgStyle?: 'solid' | 'gradient' | 'glass';
  };
}

export interface BrandConfig {
  name: string;
  tagline: string;
  logo: string;
  logoAlt: string;
  favicon: string;
  stripeColors: string[];
  stripeHeight: number;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'corporate' | 'healthcare' | 'industrial' | 'tech' | 'luxury' | 'minimal' | 'government' | 'startup';
  tags: string[];
  brand: BrandConfig;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
  animations: AnimationTokens;
  layout: LayoutTokens;
  components: ComponentTokens;
  meta: {
    version: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    isDefault?: boolean;
    isCustom?: boolean;
  };
}

export interface ClaudePromptConfig {
  themeId: string;
  themeName: string;
  navigation: string;
  primaryColor: string;
  secondaryColor: string;
  buttonStyle: string;
  cardStyle: string;
  tableStyle: string;
  fontFamily: string;
  layoutVariant: string;
  borderRadius: string;
  category: string;
}
