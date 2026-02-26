# Miha Builds - Portfolio Application

## Overview
Premium "Build in Public" portfolio application for "Miha Builds" - a multi-page site functioning as a high-conversion landing page, service showcase, and dynamic project portfolio, plus an admin dashboard. Bilingual (Serbian/English) with Serbian as default.

## Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion (via Vite)
- **Backend**: Express.js API
- **Database**: PostgreSQL (Drizzle ORM)
- **Routing**: wouter (client-side)
- **i18n**: Custom context-based system (`client/src/lib/i18n.tsx`) with Serbian default, English toggle

## Color Palette
- Deep Navy: `#1A202C` (background)
- Champagne Gold: `#D4AF37` (accents, CTAs)
- Off-White: `#F7FAFC` (text)

## Pages
1. **Home** (`/`) - Hero section with glassmorphism effects, stats, process steps, feature cards, CTA
2. **Services** (`/services`) - 4 pricing tiers (Landing Page, Business Website, E-Commerce, Custom Web App) with price ranges, feature lists, and "Included in Every Project" section
3. **The Lab** (`/lab`) - Dynamic project grid with browser window mockup cards + sticky filter bar
4. **Beta Program** (`/beta`) - Multi-step glassmorphism application form
5. **Admin** (`/admin`) - Password-protected dashboard for managing beta applications (password: mihabuilds2026)

## Key Components
- `Navigation` - Glassmorphism nav bar with scroll detection + mobile menu + language toggle (Globe icon)
- `ProjectCard` - Browser window mockup with image preview or live iframe rendering
- `Floating3D` - Floating 3D metallic shapes with parallax scroll effects
- `StickyCTA` - Floating bottom CTA bar (hidden on /beta, /admin, /services)
- `ScrollProgress` - Gold progress bar at top of page
- `I18nProvider` - Language context wrapping entire app, stores preference in localStorage

## API Routes
- `GET /api/projects` - List all portfolio projects
- `GET /api/projects/:id` - Get single project
- `POST /api/beta-applications` - Submit beta application
- `GET /api/beta-applications` - List all applications
- `PATCH /api/beta-applications/:id` - Update application status

## Database Tables
- `projects` - Portfolio project entries with optional imageUrl (dionaservis.com uses iframe, others use generated preview images)
- `beta_applications` - Beta program submissions with status tracking
- `users` - Base user table

## Design System
- Dark-mode focused with glassmorphism CSS utilities (`glass`, `glass-strong`, `glass-card`)
- Gold gradient text (`text-gold-gradient`)
- Gold glow effects (`glow-gold`, `glow-gold-sm`)
- 3D floating elements for visual depth
- Enhanced Framer Motion animations: stagger containers, blur-fade transitions, parallax scrolling, spring physics
- Font: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)

## Service Packages (Pricing)
1. Landing Page: €200–€500
2. Business Website: €500–€1,500
3. E-Commerce: €1,500–€3,000
4. Custom Web App: €3,000+
