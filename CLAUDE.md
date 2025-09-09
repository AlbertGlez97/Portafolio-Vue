# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Runs on http://localhost:5173

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Run tests:**
```bash
npm run test
```
Uses Vitest for unit testing

## Architecture Overview

This is a Vue 3 + TypeScript portfolio application implementing **Clean Architecture** principles with domain-driven design.

### Clean Architecture Layers
- **Domain** (`src/domain/`): Entities and repository interfaces
- **Application** (`src/application/`): Use cases and business logic
- **Infrastructure** (`src/infrastructure/`): Data access implementations (currently static JSON)
- **Presentation**: Vue components and Pinia stores

### Key Technologies
- **Vue 3** with Composition API (`<script setup>` syntax)
- **TypeScript** with strict mode
- **Pinia** for state management
- **Vue Router 4** with lazy loading
- **Vue I18n** for Spanish/English localization
- **Three.js** for 3D galaxy visualization
- **Vite** for build tooling with `@` alias → `src`

## Data Management

### Static Data Structure
All content stored in `src/data/*.json` files:
- `personal.json`: Contact info and profile data
- `projects.json`: Portfolio projects
- `technicalSkills.json`: Programming languages, frameworks
- `experience.json`: Work history
- `education.json`: Academic background
- `certifications.json`: Professional certifications

### State Management Pattern
Each domain has its own Pinia store in `src/stores/`:
- Stores load data from JSON files on initialization
- Main store (`main.ts`) handles global state (theme, language, menu)
- Admin stores provide CRUD operations for content management

## Component Architecture

### Key Components
- **TechGalaxy.vue**: Three.js 3D visualization with WebGL fallback
- **Admin components**: Full CRUD interface with modals and tables
- **LoginModal.vue**: Authentication interface

### Styling System
- CSS custom properties for theming in `src/assets/styles/main.css`
- Dark/light mode via CSS classes on `<body>`
- Component-scoped styles with global theme variables

## Three.js Integration

The **TechGalaxy** component creates a 3D sphere of technology names:
- Uses Fibonacci sphere algorithm for uniform distribution
- OrbitControls for user interaction
- Custom text sprites via `createTextSprite.ts`
- Accessibility features (respects `prefers-reduced-motion`)
- Automatic fallback to 2D badges if WebGL unavailable

## Internationalization

- Default language: Spanish (`es`)
- Fallback: English (`en`)
- Translation files: `src/i18n/es.json`, `src/i18n/en.json`
- Language switching handled by main store

## Router Structure

Routes are lazy-loaded for optimal bundle splitting:
- `/` - Home with TechGalaxy
- `/about` - Professional timeline
- `/skills` - Technical and soft skills
- `/projects` - Portfolio showcase
- `/education` - Academic background
- `/contact` - Contact form
- `/admin` - Content management panel

## File Paths and Imports

Use the `@` alias for cleaner imports:
```typescript
import { useMainStore } from '@/stores/main'
import type { Project } from '@/interfaces/Projects'
```

## Admin Panel Features

The admin interface (`/admin`) provides:
- User authentication via `LoginModal`
- CRUD operations for all content types
- Real-time preview of changes
- Data validation and error handling
- Modal-based editing interface

## Testing

- **Vitest** for unit tests
- **@vue/test-utils** for Vue component testing
- **jsdom** for DOM simulation
- Test files should be placed in `tests/` directory