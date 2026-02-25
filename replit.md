# Miha Builds - Portfolio Application

## Overview
Premium "Build in Public" portfolio application for "Miha Builds" - a 3-page site functioning as a high-conversion landing page and dynamic project showcase.

## Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion (via Vite)
- **Backend**: Express.js API
- **Database**: PostgreSQL (Drizzle ORM)
- **Routing**: wouter (client-side)

## Color Palette
- Deep Navy: `#1A202C` (background)
- Champagne Gold: `#D4AF37` (accents, CTAs)
- Off-White: `#F7FAFC` (text)

## Pages
1. **Home** (`/`) - Hero section with glassmorphism effects, feature cards, CTA
2. **The Lab** (`/lab`) - Dynamic project grid with browser window mockup cards
3. **Beta Program** (`/beta`) - Multi-step glassmorphism application form

## Key Components
- `Navigation` - Glassmorphism nav bar with scroll detection + mobile menu
- `ProjectCard` - Browser window mockup that renders project URLs with iframe (+ fallback)

## API Routes
- `GET /api/projects` - List all portfolio projects
- `GET /api/projects/:id` - Get single project
- `POST /api/beta-applications` - Submit beta application
- `GET /api/beta-applications` - List all applications

## Database Tables
- `projects` - Portfolio project entries
- `beta_applications` - Beta program submissions
- `users` - Base user table

## Design System
- Dark-mode focused with glassmorphism CSS utilities (`glass`, `glass-strong`, `glass-card`)
- Gold gradient text (`text-gold-gradient`)
- Gold glow effects (`glow-gold`, `glow-gold-sm`)
- Font: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)
