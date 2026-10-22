# Miha Builds

Site for **Miha Builds**, a business process automation studio (n8n + AI).
Bilingual (Serbian / English), Serbian by default.

Visual direction: **"Tihi motor"** (quiet engine). A calm, editorial paper
surface above, the running machine shown underneath. One signal colour.

## Stack

- **Next.js 15** (App Router) + **React 19** + TypeScript, deployed on Vercel
- **GSAP** (ScrollTrigger, SplitText, CustomEase) for scroll and type motion
- **Lenis** for weighted smooth scrolling
- Fonts: Instrument Serif (headlines), Geist Sans and Geist Mono
- Plain CSS with design tokens in `app/globals.css` (no UI kit)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where things live

| Path | What |
| --- | --- |
| `lib/content.ts` | All copy, SR and EN side by side |
| `app/globals.css` | Design tokens, grid, nav, buttons, hero |
| `app/sections.css` | Sections 02-12 and case-study pages |
| `components/hero.tsx` | 01 hero and the "untangling" machine |
| `components/sections/` | 02 leak, 03 calculator, 04 systems, 05 process, 06 tools, 07 pricing, 08 trust, 09 about, 10 sites, 11 FAQ, 12 contact |
| `app/sistemi/[slug]/` | One page per automation system |
| `lib/motion.ts`, `lib/use-reveal.ts` | GSAP setup, easing curves, shared section reveal |

## Environment variables (Vercel)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Contact form delivery (free key at web3forms.com). Without it the form opens the visitor's mail app. |
| `NEXT_PUBLIC_SITE_URL` | Final domain, e.g. `https://mihabuilds.rs`, for sitemap and share images. |
