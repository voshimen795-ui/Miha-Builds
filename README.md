# Miha Builds

Premium **portfolio & agency** one-pager for **Miha Builds** — a smooth,
single-page site showcasing projects, services, skills, and a contact form.
Bilingual (Serbian / English), Serbian by default.

Pure front-end React SPA — no backend, no database. Deploys free to Vercel,
Netlify, Cloudflare Pages, or GitHub Pages.

## Tech Stack

- **React 18 + TypeScript** (via Vite)
- **Tailwind CSS** + Radix UI (shadcn/ui components)
- **Framer Motion** for animation
- **react-icons** for tech logos
- Custom context-based **i18n** (`client/src/lib/i18n.tsx`)
- **Web3Forms** for the contact form (no backend needed)

## Getting Started

```bash
npm install
cp .env.example .env   # add your Web3Forms access key (see below)
npm run dev            # http://localhost:5173
```

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server.           |
| `npm run build`   | Build the static site into `dist/`.  |
| `npm run preview` | Preview the production build locally.|
| `npm run check`   | Type-check with `tsc`.               |

## Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com) — a free service that
emails submissions to you with no backend.

1. Go to web3forms.com and enter your email (`voshimen795@gmail.com`) to get a
   free **Access Key**.
2. Add it to `.env` as `VITE_WEB3FORMS_ACCESS_KEY=...`
3. On Vercel, add the same value under **Settings → Environment Variables**.

Until a key is set, the form shows a friendly error and points visitors to your
email address as a fallback.

## Editing Your Projects

Projects live in **`client/src/data/projects.ts`** — a simple array you edit
directly. Each project takes a `title`, `description`, `url`, `category`, and an
optional `imageUrl` (drop preview images in `client/public/images/`). Leave
`imageUrl` off to render the live site in an iframe instead.

## Structure

```
client/
  index.html
  public/            Static assets (images, favicon, robots.txt)
  src/
    components/
      sections/      hero, projects, services, skills, contact, footer
      ui/            shadcn/ui components
      navigation.tsx, floating-3d.tsx, scroll-progress.tsx
    data/projects.ts Your portfolio content
    lib/             i18n, motion variants, utils
    pages/home.tsx   Assembles all sections into the one-pager
    App.tsx, main.tsx
```

## Deploying to Vercel

The included `vercel.json` sets the build command and output directory. Import
the repo on Vercel, add the `VITE_WEB3FORMS_ACCESS_KEY` env var, and deploy —
that's it.

**Palette:** Deep Navy `#1A202C` · Champagne Gold `#D4AF37` · Off-White `#F7FAFC`
Fonts: Inter (sans), Playfair Display (serif), JetBrains Mono (mono).

## License

MIT
