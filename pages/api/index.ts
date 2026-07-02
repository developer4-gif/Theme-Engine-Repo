import type { NextApiRequest, NextApiResponse } from 'next';
import { THEME_REGISTRY } from '../../app/theme-engine/theme-registry/index';

const BASE = 'https://theme-engine-repo.vercel.app';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  res.status(200).json({
    name: 'JISL Theme Engine',
    version: '2.0',
    description: 'Complete theme system with 90+ web themes and 18,000+ mobile app screen references.',

    instructions: `You now have full access to the JISL Theme Engine. Here is everything you can do:

BROWSER/WEB THEMES (${THEME_REGISTRY.length} themes):
- List all themes: GET ${BASE}/api/themes
- Search themes: GET ${BASE}/api/themes?search=dark&category=corporate
- Get full theme bundle (CSS + HTML pages + Claude prompt + JSON tokens): GET ${BASE}/api/themes/[theme-id]
- Get just CSS: GET ${BASE}/api/themes/[theme-id]?format=css
- Get just Claude prompt: GET ${BASE}/api/themes/[theme-id]?format=prompt

MOBILE APP REFERENCES (26 categories, 18,000+ apps):
- List all categories: GET ${BASE}/api/mobile
- List apps in a category: GET ${BASE}/api/mobile/[category-id]
- Search apps in category: GET ${BASE}/api/mobile/[category-id]?search=zomato
- Get single app screens + build prompt: GET ${BASE}/api/mobile/[category-id]?app=[app-id]
- Download screens as ZIP: GET ${BASE}/api/references/download?category=[id]&app=[id]

HOW TO USE:
- When user says "apply X theme" → fetch ${BASE}/api/themes/[id] and use the CSS + claudePrompt fields
- When user says "show me food delivery references" → fetch ${BASE}/api/mobile/food-delivery
- When user says "get screens for app X" → fetch ${BASE}/api/mobile/[category]?app=[name]
- Always use the claudePrompt field from theme bundles as your implementation guide`,

    quickLinks: {
      allThemes:        `${BASE}/api/themes`,
      popularThemes: {
        jainsCrm:       `${BASE}/api/themes/jains-crm`,
        obsidian:       `${BASE}/api/themes/obsidian`,
        pulse:          `${BASE}/api/themes/pulse`,
        enterprise:     `${BASE}/api/themes/enterprise`,
        aurora:         `${BASE}/api/themes/aurora`,
      },
      mobileCategories: `${BASE}/api/mobile`,
      popularCategories: {
        foodDelivery:   `${BASE}/api/mobile/food-delivery`,
        finance:        `${BASE}/api/mobile/finance`,
        health:         `${BASE}/api/mobile/health-fitness`,
        social:         `${BASE}/api/mobile/social`,
        ecommerce:      `${BASE}/api/mobile/shopping`,
      },
    },

    themeCount: THEME_REGISTRY.length,
    themeIds: THEME_REGISTRY.map(t => ({ id: t.id, name: t.name, category: t.category })),
  });
}
