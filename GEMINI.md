# Project Overview

This is a Nuxt 3 application primarily focused on a "devis" (quote) system, likely for window-related services, given the presence of components like `WindowCard.vue` and `WindowDrawer.vue`.

**Key Technologies:**

*   **Framework:** Nuxt 3 (Vue.js)
*   **Styling:** TailwindCSS with DaisyUI
*   **Modules:** `@nuxtjs/tailwindcss`, `@nuxt/fonts`, `@nuxt/image`
*   **PDF Generation:** `pdf-lib`
*   **Business Logic:** Separated into `business-rules.config.ts` and a `.rules/` directory, indicating a structured approach to business logic.

The project structure suggests a modular design with dedicated directories for components, composables (reusable logic), pages, types, and utilities.

# Building and Running

## Setup

Install the project dependencies using your preferred package manager:

```bash
npm install
# or yarn install
# or pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview the production build:

```bash
npm run preview
```

# Development Conventions

*   **Code Formatting:** The project uses Prettier for code formatting, as indicated by the `prettier` dependency and `.prettierrc` configuration.
*   **Styling:** Styling is managed with TailwindCSS, extended by DaisyUI components, promoting a utility-first CSS approach.
*   **Structure:** The codebase follows a clear modular structure:
    *   `components/`: Vue components for UI elements.
    *   `composables/`: Reusable Vue composition API functions.
    *   `pages/`: Nuxt pages (routes).
    *   `types/`: TypeScript type definitions.
    *   `utils/`: General utility functions.
    *   `assets/`: Static assets like images.
*   **Configuration:** Business rules are externalized in `business-rules.config.ts` and documented within the `.rules/` directory.
