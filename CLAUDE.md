# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 website for MaxiVitre, a professional window cleaning service business operating in the Montpellier area. The site uses Vue 3 composition API with TypeScript, Tailwind CSS, and DaisyUI for styling.

## Development Commands

```bash
# Install dependencies
bun install

# Run development server (accessible on all network interfaces)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Generate static site
bun run generate
```

## Architecture

### Tech Stack
- **Framework**: Nuxt 3 with Vue 3 Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS with DaisyUI component library
- **Fonts**: Google Fonts (KoHo family) via @nuxt/fonts module


### Styling Configuration
- Custom DaisyUI theme "mytheme" defined in `tailwind.config.js`
- Primary color: #12CEF9 (cyan)
- Secondary color: #001f42 (dark blue)
- Theme applied via data-theme attribute on HTML element
- Typography plugin included for prose content

### Key Features
- Window cleaning service pricing calculator
- Service area display for Montpellier region
- Contact form via mailto links
- Responsive design with mobile/desktop breakpoints

## Development Notes

- The site uses server-side rendering (SSR) by default
- Development server binds to all network interfaces (HOST=0.0.0.0)
- Font loading handled automatically by @nuxt/fonts module
- All text content is in French as this is a local French business
- use bun instead of node
- never mention time estimation. talk in sprint points
- memory on creer chaque tache dans un fichier séparé

## Git & Development Rules

### Git & Commits
- **Demander autorisation** avant tout commit
- **Utiliser git add --patch** pour sélectionner les changements
- **Messages de commit clairs** et descriptifs
- **Interdiction stricte** : push, pull, reset, rebase, merge