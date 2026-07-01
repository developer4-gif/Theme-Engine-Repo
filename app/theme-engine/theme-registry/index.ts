import type { Theme } from '../types';

// ── Original 35 web/enterprise themes ──────────────────────────────────────
import obsidian from '../themes/obsidian';
import crystal from '../themes/crystal';
import enterprise from '../themes/enterprise';
import aurelius from '../themes/aurelius';
import pulse from '../themes/pulse';
import slate from '../themes/slate';
import forge from '../themes/forge';
import aurora from '../themes/aurora';
import bioluminescent from '../themes/bioluminescent';
import navyEnterprise from '../themes/navy-enterprise';
import whiteCorporate from '../themes/white-corporate';
import darkExecutive from '../themes/dark-executive';
import indigoSaas from '../themes/indigo-saas';
import modernHealthcare from '../themes/modern-healthcare';
import industrialGray from '../themes/industrial-gray';
import manufacturingDashboard from '../themes/manufacturing-dashboard';
import analyticsPlatform from '../themes/analytics-platform';
import governmentPortal from '../themes/government-portal';
import luxuryBlackGold from '../themes/luxury-black-gold';
import softGlass from '../themes/soft-glass';
import minimalWhite from '../themes/minimal-white';
import professionalBanking from '../themes/professional-banking';
import materialInspired from '../themes/material-inspired';
import oceanBlue from '../themes/ocean-blue';
import emeraldBusiness from '../themes/emerald-business';
import modernErp from '../themes/modern-erp';
import medicalRecordsPro from '../themes/medical-records-pro';
import consultingFirm from '../themes/consulting-firm';
import executiveWorkspace from '../themes/executive-workspace';
import enterpriseDark from '../themes/enterprise-dark';
import smartOperations from '../themes/smart-operations';
import modernCrm from '../themes/modern-crm';
import platinumProfessional from '../themes/platinum-professional';
import cleanStartup from '../themes/clean-startup';
import jainsCrm from '../themes/jains-crm';

// ── Finance mobile themes ───────────────────────────────────────────────────
import aaveDark from '../themes/aave-dark';
import alineaInvest from '../themes/alinea-invest';
import bankingRed from '../themes/banking-red';
import fintechSavings from '../themes/fintech-savings';
import cryptoNeon from '../themes/crypto-neon';
import budgetMint from '../themes/budget-mint';
import wealthNavy from '../themes/wealth-navy';
import insuranceTrust from '../themes/insurance-trust';
import stockTrading from '../themes/stock-trading';
import paymentWallet from '../themes/payment-wallet';

// ── Health & Fitness mobile themes ─────────────────────────────────────────
import journalCream from '../themes/journal-cream';
import fitnessEnergy from '../themes/fitness-energy';
import wellnessCalm from '../themes/wellness-calm';
import sportsTracker from '../themes/sports-tracker';
import meditationIndigo from '../themes/meditation-indigo';
import lifestylePeach from '../themes/lifestyle-peach';
import runningCoach from '../themes/running-coach';
import nutritionTrack from '../themes/nutrition-track';
import mentalHealth from '../themes/mental-health';
import bloodPressure from '../themes/blood-pressure';
import parentingSoft from '../themes/parenting-soft';
import habitsTracker from '../themes/habits-tracker';

// ── Medical mobile themes ───────────────────────────────────────────────────
import clinicalWhite from '../themes/clinical-white';
import pharmacyGreen from '../themes/pharmacy-green';
import telehealthBlue from '../themes/telehealth-blue';
import anatomy3d from '../themes/anatomy-3d';
import emergencySos from '../themes/emergency-sos';
import healthcareDash from '../themes/healthcare-dash';

// ── Education mobile themes ─────────────────────────────────────────────────
import eduPlayful from '../themes/edu-playful';
import kidsLearn from '../themes/kids-learn';
import languageApp from '../themes/language-app';
import onlineCourse from '../themes/online-course';
import universityDark from '../themes/university-dark';

// ── Productivity mobile themes ──────────────────────────────────────────────
import productivityFocus from '../themes/productivity-focus';
import taskManager from '../themes/task-manager';
import noteTaking from '../themes/note-taking';
import calendarApp from '../themes/calendar-app';
import passwordVault from '../themes/password-vault';
import fileManager from '../themes/file-manager';
import remoteWork from '../themes/remote-work';

// ── Navigation mobile themes ────────────────────────────────────────────────
import mapsNight from '../themes/maps-night';
import rideSharng from '../themes/ride-sharing';
import evCharging from '../themes/ev-charging';
import transitGuide from '../themes/transit-guide';
import parkingFinder from '../themes/parking-finder';

// ── Social mobile themes ────────────────────────────────────────────────────
import socialDark from '../themes/social-dark';
import datingWarm from '../themes/dating-warm';
import socialLight from '../themes/social-light';
import messagingApp from '../themes/messaging-app';
import videoCall from '../themes/video-call';
import communityApp from '../themes/community-app';

// ── Tech mobile themes ──────────────────────────────────────────────────────
import musicPlayer from '../themes/music-player';
import photoVideo from '../themes/photo-video';
import creatorStudio from '../themes/creator-studio';
import aiAssistant from '../themes/ai-assistant';
import weatherWidget from '../themes/weather-widget';
import smartHome from '../themes/smart-home';

// ── Startup / Consumer mobile themes ───────────────────────────────────────
import foodDelivery from '../themes/food-delivery';
import travelExplorer from '../themes/travel-explorer';
import shoppingPink from '../themes/shopping-pink';
import newsReader from '../themes/news-reader';
import marketplace from '../themes/marketplace';
import loyaltyApp from '../themes/loyalty-app';
import subscriptionBox from '../themes/subscription-box';
import gigEconomy from '../themes/gig-economy';

export const THEME_REGISTRY: Theme[] = [
  // Web / Enterprise (35)
  obsidian, crystal, enterprise, aurelius, pulse, slate, forge, aurora, bioluminescent,
  navyEnterprise, whiteCorporate, darkExecutive, indigoSaas, modernHealthcare, industrialGray,
  manufacturingDashboard, analyticsPlatform, governmentPortal, luxuryBlackGold, softGlass,
  minimalWhite, professionalBanking, materialInspired, oceanBlue, emeraldBusiness, modernErp,
  medicalRecordsPro, consultingFirm, executiveWorkspace, enterpriseDark, smartOperations,
  modernCrm, platinumProfessional, cleanStartup, jainsCrm,

  // Finance Mobile (10)
  aaveDark, alineaInvest, bankingRed, fintechSavings, cryptoNeon, budgetMint, wealthNavy,
  insuranceTrust, stockTrading, paymentWallet,

  // Health & Fitness Mobile (12)
  journalCream, fitnessEnergy, wellnessCalm, sportsTracker, meditationIndigo, lifestylePeach,
  runningCoach, nutritionTrack, mentalHealth, bloodPressure, parentingSoft, habitsTracker,

  // Medical Mobile (6)
  clinicalWhite, pharmacyGreen, telehealthBlue, anatomy3d, emergencySos, healthcareDash,

  // Education Mobile (5)
  eduPlayful, kidsLearn, languageApp, onlineCourse, universityDark,

  // Productivity Mobile (7)
  productivityFocus, taskManager, noteTaking, calendarApp, passwordVault, fileManager, remoteWork,

  // Navigation Mobile (5)
  mapsNight, rideSharng, evCharging, transitGuide, parkingFinder,

  // Social Mobile (6)
  socialDark, datingWarm, socialLight, messagingApp, videoCall, communityApp,

  // Tech Mobile (6)
  musicPlayer, photoVideo, creatorStudio, aiAssistant, weatherWidget, smartHome,

  // Startup / Consumer Mobile (8)
  foodDelivery, travelExplorer, shoppingPink, newsReader, marketplace, loyaltyApp,
  subscriptionBox, gigEconomy,
];

export const THEME_MAP: Record<string, Theme> = Object.fromEntries(
  THEME_REGISTRY.map(t => [t.id, t])
);

export function getTheme(id: string): Theme {
  return THEME_MAP[id] ?? obsidian;
}

export function getDefaultTheme(): Theme {
  return THEME_REGISTRY.find(t => t.meta.isDefault) ?? obsidian;
}

export function getThemesByCategory(category: Theme['category']): Theme[] {
  return THEME_REGISTRY.filter(t => t.category === category);
}

export const THEME_CATEGORIES = [
  { id: 'all', label: 'All Themes' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'tech', label: 'Technology' },
  { id: 'finance', label: 'Finance' },
  { id: 'health', label: 'Health & Fitness' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'medical', label: 'Medical' },
  { id: 'education', label: 'Education' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'startup', label: 'Startup' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'government', label: 'Government' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'social', label: 'Social' },
] as const;

export function serializeTheme(theme: Theme): string {
  return JSON.stringify(theme, null, 2);
}

export function isDarkTheme(theme: Theme): boolean {
  const bg = theme.colors.bg;
  if (!bg.startsWith('#')) return false;
  const hex = bg.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.4;
}

export function themeToCSSVars(theme: Theme): string {
  const vars: string[] = [];
  Object.entries(theme.colors).forEach(([key, value]) => {
    vars.push(`  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`);
  });
  vars.push(`  --font-sans: ${theme.typography.fontSans};`);
  vars.push(`  --font-serif: ${theme.typography.fontSerif};`);
  vars.push(`  --font-mono: ${theme.typography.fontMono};`);
  return `:root {\n${vars.join('\n')}\n}`;
}

export default THEME_REGISTRY;
