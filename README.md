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
| `app/globals.css` | Design tokens, grid, every component style |
| `components/hero.tsx` | 01 hero and the "untangling" machine |
| `lib/geometry.ts` | Wire geometry for the machine (chaos and calm states) |
| `components/leak.tsx` | 02 opening of the dark "machine room" |
| `lib/motion.ts` | GSAP setup and the shared easing curves |

## Status

Prototype of sections 01 and 02. The remaining sections from the plan
(calculator, case studies, process, pricing, FAQ, contact) come next.
