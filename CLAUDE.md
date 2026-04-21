# Go-Next-Level Web Template

⚠️ **DO NOT build client sites directly in this folder.**
This is the starter template. For each new client project, copy this folder:
```
cp -r gonextlevel-web-template gonextlevel-[client-slug]
cd gonextlevel-[client-slug]
npm install
```

---

## What's Pre-Configured
- **Astro** (latest, static output) + **Tailwind CSS v4**
- **Cloudflare Pages** deployment via `wrangler.toml`
- **BaseLayout** with SEO meta, Open Graph, Twitter cards, JSON-LD structured data slots
- **404 page** (customize to match design)
- **sitemap.xml** generator (add pages during build)
- **robots.txt** (update domain)
- **site.webmanifest** + SVG favicon placeholder
- `prefers-reduced-motion` respected in global CSS
- Focus styles for accessibility

## What You Must Replace After Copying
Search for `REPLACE` across the project — every instance needs updating:

| File | What to replace |
|------|----------------|
| `wrangler.toml` | `REPLACE_WITH_PROJECT_NAME` |
| `src/styles/global.css` | Font variables, color palette (after `/ui-ux-pro-max`) |
| `src/layouts/BaseLayout.astro` | Font `<link>` imports |
| `src/pages/index.astro` | Business name, tagline, description, JSON-LD fields |
| `src/pages/404.astro` | Business name, design system styles |
| `src/pages/sitemap.xml.ts` | All page paths |
| `public/robots.txt` | Domain |
| `public/site.webmanifest` | Business name, description, theme color |
| `public/favicon.svg` | Branded SVG favicon |

## Build Workflow (3 Phases)

### Phase 1 — Foundation (run BEFORE writing any code)
1. `/frontend-design` — bold aesthetic direction, NOT generic AI defaults
2. `/ui-ux-pro-max` — complete design system: font pairing, hex palette, spacing
3. `/taste-skill` — senior UI/UX standards, overrides default LLM biases
4. `/emil-design-eng` — animation philosophy, interaction details, component polish

### Phase 2 — Build
- Check **21st.dev Magic** (`/ui`) for every major section before building from scratch
- Hero sections, navbars, footers, feature grids, pricing, testimonials, CTAs, forms
- Customize all 21st.dev components to the design system — never use default styling
- Real content in every section — no lorem ipsum
- Add all new pages to `sitemap.xml.ts`
- Web3Forms for all contact forms

### Phase 3 — Refinement
Run the tier-specific skills from the client prompt, then always close with:
- `/polish` — alignment, spacing, consistency, micro-details
- `/audit` — accessibility, performance, responsive, SEO

## Deploy
```bash
npm run build
npx wrangler pages deploy dist --project-name=[project-name]
```

## Tech Constraints
- Fonts: NEVER Inter, Roboto, Arial, system fonts — premium Google Fonts or Fontsource only
- Images: WebP/AVIF, lazy loading, explicit width + height attributes
- Single H1 per page, proper heading hierarchy
- WCAG AA color contrast (4.5:1 minimum)
- Mobile-first, test at 375px / 768px / 1024px / 1440px
