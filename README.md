# MaterialCalc.com

Free construction calculators for homeowners, DIYers, and contractors.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4
- **Font:** Inter (self-hosted via next/font)
- **Deployment:** Static export → Hostinger shared hosting (Apache)
- **No database, no API routes, no SSR required**

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build (static export)
npm run build

# The static site outputs to ./out/
```

## Project Structure

```
materialcalc/
├── public/                    Static assets
│   ├── images/               Logo, OG images
│   ├── .htaccess             Apache config (Hostinger)
│   ├── favicon.svg           Cube icon favicon
│   ├── manifest.json         PWA manifest
│   ├── robots.txt            Search engine rules
│   └── sitemap.xml           XML sitemap (9 pages)
│
├── src/
│   ├── app/                  Next.js App Router pages
│   │   ├── layout.tsx        Root layout (header + footer)
│   │   ├── page.tsx          Homepage / Concrete Calculator
│   │   ├── not-found.tsx     Custom 404
│   │   ├── concrete-slab-calculator/
│   │   ├── concrete-cost-calculator/
│   │   ├── concrete-footing-calculator/
│   │   ├── concrete-bags-calculator/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   │
│   ├── components/
│   │   ├── calculators/      5 calculator components
│   │   ├── layout/           Header, Footer, Breadcrumb
│   │   ├── seo/              Schema markup generator
│   │   └── ui/               FAQ accordion, ToolCard
│   │
│   ├── lib/
│   │   ├── calculations.ts   All concrete math formulas
│   │   └── constants.ts      Site config, tools, presets
│   │
│   └── styles/
│       └── globals.css        Tailwind + component classes
│
├── DEPLOY.md                  Hostinger deployment guide
└── package.json
```

## Pages (11 total)

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Concrete Calculator + tool directory |
| Slab Calculator | `/concrete-slab-calculator/` | Patios, driveways, garages |
| Cost Calculator | `/concrete-cost-calculator/` | Materials, delivery, labor |
| Footing Calculator | `/concrete-footing-calculator/` | Deck posts, piers, columns |
| Bags Calculator | `/concrete-bags-calculator/` | 40/50/60/80 lb bag comparison |
| About | `/about/` | Company info |
| Contact | `/contact/` | Contact form |
| Privacy Policy | `/privacy-policy/` | GDPR-friendly |
| Terms of Service | `/terms-of-service/` | Liability disclaimers |
| 404 | Any invalid URL | Calculator directory |

## Calculators

All 5 calculators include:
- Real-time calculations with instant results
- Waste factor toggle (0%, 5%, 10%, 15%)
- Copy results + Reset functionality
- Imperial/Metric unit support
- Mobile-responsive layout
- ARIA accessibility labels
- Cross-links to related calculators

## SEO

- Unique title/description per page
- Canonical URLs on all pages
- Open Graph + Twitter Card tags
- JSON-LD schema: WebSite, Organization, WebApplication, FAQPage, BreadcrumbList
- Internal linking across all calculator pages
- Semantic heading hierarchy (single H1 per page)

## Deployment

See [DEPLOY.md](./DEPLOY.md) for complete Hostinger deployment instructions.

## Brand

- **Navy:** #1B365D
- **Orange:** #E8862A
- **Font:** Inter (400, 500, 600, 700)
- **Domain:** materialcalc.com
- **Email:** materialcalcsite@gmail.com
