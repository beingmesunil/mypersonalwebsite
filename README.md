# Lumen Studio — Photography Portfolio

A production-ready, cinematic photography portfolio built with **React 19**, **TypeScript**, **Vite** and **Tailwind CSS v4**. Dark by default, mobile-first, WCAG AA-minded, SEO-complete and fully content-driven — every word and photograph on the site comes from `src/data`, not from component code.

> Sample identity: _Aria Lindqvist / Lumen Studio_. Change `src/constants/site.ts` and the files in `src/data/` to make it yours.

---

## Project Overview

|                |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Framework**  | React 19 + TypeScript (strict)                                 |
| **Build tool** | Vite 7                                                         |
| **Styling**    | Tailwind CSS v4 (CSS-first `@theme` tokens)                    |
| **Routing**    | React Router 7, route-based code splitting                     |
| **Animation**  | Framer Motion (reduced-motion aware)                           |
| **Forms**      | React Hook Form + Zod                                          |
| **Icons**      | Lucide React                                                   |
| **Testing**    | Vitest + Testing Library (46 tests)                            |
| **Quality**    | ESLint 9 (flat config, jsx-a11y), Prettier, Husky, lint-staged |

### Design system

| Token              | Value            | Usage                 |
| ------------------ | ---------------- | --------------------- |
| `--color-canvas`   | `#050505`        | Page background       |
| `--color-surface`  | `#0A0A0A`        | Alternating sections  |
| `--color-elevated` | `#111111`        | Cards, inputs, panels |
| `--color-ink`      | `#FFFFFF`        | Headings              |
| `--color-muted`    | `#D4D4D4`        | Body copy             |
| `--color-subtle`   | `#A3A3A3`        | Secondary copy        |
| `--color-accent`   | `#D4A574`        | Warm gold accent      |
| `--font-display`   | Playfair Display | Headings              |
| `--font-sans`      | Inter            | Body                  |

All tokens live in [`src/styles/index.css`](src/styles/index.css). There are **no inline styles** and no hard-coded colours, durations or breakpoints in components — spacing (`--spacing-section`), fluid type (`--text-display-*`), easing (`--ease-cinematic`), and motion timings (`src/constants/animation.ts`) are all tokenised.

---

## Features

**Pages** — Home (all sections), Portfolio, About, Services, Journal, Journal post, Contact, 404.

- **Hero** — full-screen photograph, dark cinematic gradient, staggered entrance, animated scroll indicator.
- **Featured portfolio** — CSS masonry grid, five category filters, hover zoom, category badges, and a **lightbox** with full keyboard support (`←`/`→` navigate, `Home`/`End` jump, `Esc` closes, focus is trapped and restored).
- **About** — portrait, biography, mission statement, career highlights and four **animated counters** that run once on scroll into view.
- **Services** — four cards with icon, description, deliverables, starting price and a Learn More link.
- **Testimonials** — swipeable scroll-snap cards on touch devices, auto-advancing carousel with dots and arrows on desktop; autoplay pauses on hover and focus.
- **Journal** — preview cards on the home page, index page, and full article pages with `BlogPosting` structured data.
- **Contact** — two-column layout: validated form (React Hook Form + Zod) beside studio details, social links and a map (Google Maps embed when configured, on-brand placeholder otherwise).
- **Footer** — logo, quick links, studio details, social links, copyright and back-to-top; plus a floating back-to-top button.

**Accessibility (WCAG AA)** — semantic landmarks, skip link, labelled form fields with `role="alert"` errors, `aria-live` submission feedback, visible gold focus rings on every interactive element, accessible names on all icon buttons, `aria-modal` dialog, and full `prefers-reduced-motion` support (CSS _and_ Framer Motion's `MotionConfig reducedMotion="user"`).

**SEO** — per-route `<title>`/description/canonical, Open Graph + Twitter cards, JSON-LD (`ProfessionalService`, `OfferCatalog`, `BlogPosting`, `BreadcrumbList`), and `sitemap.xml` + `robots.txt` generated at build time from the route table and journal data, so they can never drift.

**Performance** — route-level code splitting, vendor chunk separation (react / motion / forms), lazy-loaded images with `srcset` + `sizes`, eager LCP images, intrinsic aspect-ratio boxes (no layout shift), and shimmer placeholders. Production JS is roughly 165 kB gzipped across cacheable chunks.

---

## Folder Structure

```
src/
├── assets/               # Local static assets imported by components
├── components/
│   ├── ui/               # Primitives: Button, LazyImage, Section, fields, Reveal…
│   ├── layout/           # Header, Footer, RootLayout, Seo, BackToTop, errors
│   ├── portfolio/        # Gallery, masonry grid, category filter, lightbox
│   ├── testimonials/     # Testimonial card + carousel
│   ├── contact/          # Contact form, studio details, map
│   └── sections/         # Page sections composed from the folders above
├── pages/                # Route components (lazily loaded, default exports)
├── hooks/                # useCountUp, useFocusTrap, useMediaQuery, …
├── services/             # Zod schema + contact submission service
├── types/                # Shared domain types
├── constants/            # Site config, routes, navigation, animation, UI limits
├── utils/                # cn, image, format, portfolio, seo, scroll helpers
├── data/                 # ← All editable content lives here
├── styles/               # Tailwind theme + base layer
├── router/               # Route table with code-split pages
└── test/                 # Vitest setup and browser API stubs
```

`components/sections/` is an addition to the requested structure: it holds the page-level compositions (Hero, About, Services…) so that `ui/`, `portfolio/`, `testimonials/` and `contact/` stay purely reusable.

---

## Installation

Requires **Node.js ≥ 20.19** and npm 10+.

```bash
git clone https://github.com/beingmesunil/mypersonalwebsite.git
cd mypersonalwebsite
npm install          # also installs the Husky git hooks
cp .env.example .env # optional
```

### Environment variables

| Variable                | Required | Description                                                                                                             |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONTACT_ENDPOINT` | No       | HTTPS endpoint that receives contact submissions as JSON. Unset, the form resolves locally in demo mode.                |
| `VITE_MAP_EMBED_URL`    | No       | Google Maps embed URL for the contact section. Unset, a styled placeholder is rendered and no third-party script loads. |

---

## Development

```bash
npm run dev            # Vite dev server on http://localhost:5173
npm run lint           # ESLint (flat config)
npm run lint:fix       # ESLint with --fix
npm run format         # Prettier write
npm run format:check   # Prettier check (used in CI)
npm run typecheck      # tsc --noEmit across app + node configs
npm run test           # Vitest, single run
npm run test:watch     # Vitest, watch mode
npm run test:coverage  # Coverage report
```

> **Note on `ajv`.** It is listed as a dev dependency even though nothing imports it. `@hookform/resolvers` declares `ajv` as an _optional_ peer dependency, and without an explicit entry `npm install` and `npm ci` resolve the dependency tree differently, which breaks `npm ci` in CI. Pinning it keeps the lockfile deterministic.

### Editing content

No component needs to be touched to re-skin the site:

| File                           | Contents                                                           |
| ------------------------------ | ------------------------------------------------------------------ |
| `src/constants/site.ts`        | Name, tagline, intro, email, phone, address, geo, social image     |
| `src/constants/navigation.ts`  | Primary/footer navigation and social links                         |
| `src/data/portfolioData.ts`    | Gallery items (title, category, location, year, image, `featured`) |
| `src/data/servicesData.ts`     | Services, deliverables and starting prices                         |
| `src/data/testimonialsData.ts` | Client testimonials and ratings                                    |
| `src/data/blogData.ts`         | Journal posts (slug, excerpt, tags, body paragraphs)               |
| `src/data/aboutData.ts`        | Biography, mission, highlights, portrait                           |
| `src/data/statsData.ts`        | The four animated counters                                         |

**Images.** Sample photography uses deterministic [Lorem Picsum](https://picsum.photos) URLs so the project renders real photographs immediately. `src/utils/image.ts` also understands Unsplash URLs and passes any other source (including files you import from `src/assets/`) through untouched — swap the `src` values in `src/data/` and the responsive `srcset` keeps working. Before launch, replace `public/og-image.svg` with a 1200×630 JPG/PNG export for maximum crawler support and update `SITE.ogImage`.

---

## Build Commands

```bash
npm run build     # tsc -b && vite build  →  dist/ (incl. sitemap.xml + robots.txt)
npm run preview   # Serve the production build locally
```

The build emits hashed, long-cacheable assets plus a generated `sitemap.xml` and `robots.txt`. Set the production origin in `SITE.url` (`src/constants/site.ts`) **before** building — canonical URLs, Open Graph tags and the sitemap all derive from it.

---

## Deployment Instructions

The output is a static SPA in `dist/`. Every host needs a catch-all rewrite to `index.html` so deep links work.

**Vercel** — `vercel.json` is included (rewrites, immutable asset caching, security headers). Import the repo; Vercel detects Vite automatically.

**Netlify** — `public/_redirects` is included.

```
Build command: npm run build
Publish directory: dist
```

**Cloudflare Pages** — build `npm run build`, output `dist`, and enable Single Page App handling.

**GitHub Pages** — add `base: '/<repo-name>/'` to `vite.config.ts`, then publish `dist` (e.g. with `actions/deploy-pages`). A `404.html` copy of `index.html` restores deep linking.

**Any static host / nginx**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Pre-launch checklist**

1. Set `SITE.url`, `SITE.email`, `SITE.phone` and the address in `src/constants/site.ts`.
2. Replace sample photography, `public/og-image.svg` and `public/favicon.svg`.
3. Point `VITE_CONTACT_ENDPOINT` at a real form backend.
4. Run `npm run build && npm run preview`, then a Lighthouse pass (the app targets 90+ on all four categories).

---

## Git Workflow

```bash
git checkout -b feat/lightbox-zoom     # branch off the default branch
npm run lint && npm run test           # keep the tree green
git add -p
git commit -m "feat(portfolio): add pinch-to-zoom to the lightbox"
git push -u origin feat/lightbox-zoom  # open a pull request
```

- `main` is always deployable; feature work happens on short-lived branches.
- Branch names follow `<type>/<short-description>` using the commit types below.
- CI (`.github/workflows/ci.yml`) runs format check → lint → typecheck → test → build on every push and pull request.

**Git hooks (Husky)**

| Hook         | Runs                                                        |
| ------------ | ----------------------------------------------------------- |
| `pre-commit` | `lint-staged` — ESLint `--fix` and Prettier on staged files |
| `commit-msg` | Conventional Commits validation                             |
| `pre-push`   | `npm run typecheck && npm run test`                         |

---

## Commit Convention

[Conventional Commits](https://www.conventionalcommits.org/): `<type>(<optional scope>): <subject>` — imperative mood, no trailing period, ≤ 72 characters.

| Type        | When to use it                                          |
| ----------- | ------------------------------------------------------- |
| `feat:`     | A new user-facing capability                            |
| `fix:`      | A bug fix                                               |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `style:`    | Formatting, whitespace, Tailwind class ordering         |
| `test:`     | Adding or correcting tests                              |
| `docs:`     | Documentation only                                      |
| `chore:`    | Tooling, dependencies, configuration                    |

```
feat(contact): validate enquiries with zod
fix(header): close the mobile drawer on route change
refactor(portfolio): extract gallery state into PortfolioGallery
test(lightbox): cover arrow-key navigation
docs(readme): document the deployment checklist
chore(deps): bump vite to 7.3
```

---

## License

Source code is available under the MIT License. Sample photography is served from Lorem Picsum and sample copy is fictional — replace both before publishing your own site.
