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
| **Testing**    | Vitest + Testing Library (63 tests)                            |
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
├── assets/
│   └── photos/           # ← Drop your photographs here; picked up automatically
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
npm run photos:list    # Which photographs are supplied vs still placeholders
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

### Adding your photographs

Drop image files into **`src/assets/photos/`** and they replace the placeholder imagery automatically — no code change needed. A Vite plugin picks up each file, reads its real pixel dimensions from the file header, and hands them to the layout so the gallery reserves exactly the right space.

The filename must match the `localKey` declared in `src/data/`:

```
src/assets/photos/hero.jpg              →  home page hero
src/assets/photos/about-portrait.jpg    →  About section portrait
src/assets/photos/glacier-veil.jpg      →  the "Glacier Veil" gallery item
src/assets/photos/elena-marsh-avatar.jpg → that client's testimonial photo
```

```bash
npm run photos:list   # every key the site wants, and which files you've supplied
```

Export at a long edge of ~2000px, JPEG quality 80 (or WebP), ideally under 400 KB each. Anything not yet supplied keeps its [Lorem Picsum](https://picsum.photos) placeholder, so the site is never broken mid-swap. Full details — including which alt text and captions you still need to rewrite by hand — are in [`src/assets/photos/README.md`](src/assets/photos/README.md).

Remote URLs still work too: `src/utils/image.ts` understands Unsplash and Picsum sources and builds responsive `srcset`s for them. Local files are served as exported, which is why the sizing advice above matters.

Before launch, replace `public/og-image.svg` with a 1200×630 JPG/PNG export for maximum crawler support and update `SITE.ogImage`.

---

## Build Commands

```bash
npm run build     # tsc -b && vite build  →  dist/ (incl. sitemap.xml + robots.txt)
npm run preview   # Serve the production build locally
```

The build emits hashed, long-cacheable assets plus a generated `sitemap.xml` and `robots.txt`. Set the production origin in `SITE.url` (`src/constants/site.ts`) **before** building — canonical URLs, Open Graph tags and the sitemap all derive from it.

---

## Deployment Instructions

The site is configured for **GitHub Pages at `https://beingmesunil.github.io/mypersonalwebsite`**.

`SITE.url` in `src/constants/site.ts` is the single source of truth: Vite's `base`, the router `basename`, canonical URLs, Open Graph tags, the sitemap and the web manifest are all derived from it. Moving to a custom domain means editing that one line (and adding a `CNAME` file in `public/` if you stay on Pages).

### One-time repository setting

The included workflow deploys the **built** site, which requires Pages to be sourced from Actions rather than from a branch:

> **Settings → Pages → Build and deployment → Source: GitHub Actions**

Until that is switched, Pages serves the raw repository (the unbuilt `index.html`), which will not work. After switching, every push to `main` builds and publishes via `.github/workflows/deploy.yml`.

### What the build emits for Pages

| File                        | Why                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------- |
| `404.html`                  | A copy of the shell, so deep links like `/portfolio` work — Pages has no rewrite rules |
| `.nojekyll`                 | Stops Jekyll from stripping files Vite emits                                           |
| `site.webmanifest`          | Generated with the correct `start_url` and `scope` for the base path                   |
| `sitemap.xml`, `robots.txt` | Generated from the route table and journal data                                        |

> **Note.** On a _project_ Pages site, crawlers read `beingmesunil.github.io/robots.txt` — the repository root, not this project's sub-path. The emitted `robots.txt` is therefore advisory only; submit `sitemap.xml` directly in Search Console, or move to a custom domain (or a user site) if robots directives matter to you.

### Other hosts

**Vercel** — `vercel.json` is included (rewrites, immutable asset caching, security headers). Import the repo; Vercel detects Vite automatically.

**Netlify** — `public/_redirects` is included.

```
Build command: npm run build
Publish directory: dist
```

**Cloudflare Pages** — build `npm run build`, output `dist`, enable Single Page App handling.

**Any static host / nginx**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

On any of these the site is served from the domain root, so set `SITE.url` to that origin — the base path disappears automatically.

**Pre-launch checklist**

1. Set `SITE.email`, `SITE.phone` and the address in `src/constants/site.ts` (the URL is already set).
2. Add your photographs to `src/assets/photos/` and rewrite the alt text and captions in `src/data/`.
3. Replace `public/og-image.svg` and `public/favicon.svg`.
4. Point `VITE_CONTACT_ENDPOINT` at a real form backend.
5. Run `npm run build && npm run preview`, then a Lighthouse pass (the app targets 90+ on all four categories).

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
