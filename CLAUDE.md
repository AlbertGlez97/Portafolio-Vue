# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```
Runs on http://localhost:5174 (configured in vite.config.ts with host: true for network access)

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
Uses Vitest for unit testing with jsdom environment. Tests are located in the `tests/` directory and cover components, stores, and router functionality.

## Architecture Overview

This is a Vue 3 + TypeScript portfolio application implementing **Clean Architecture** principles with domain-driven design.

### Clean Architecture Layers
- **Domain** (`src/domain/`): Entities and repository interfaces
- **Application** (`src/application/`): Use cases and business logic
- **Infrastructure** (`src/infrastructure/`): Data access implementations (currently static JSON)
- **Presentation**: Vue components and Pinia stores

### Clean Architecture Flow Example
The personal data follows this pattern:
1. **Domain Entity**: `Personal.ts` defines interfaces (`PersonalData`, `Profile`, `Contact`, etc.)
2. **Repository Interface**: `PersonalRepository.ts` defines the contract
3. **Use Case**: `GetPersonalUseCase.ts` contains business logic
4. **Infrastructure**: `StaticPersonalRepository.ts` implements the repository by loading from `personal.json`
5. **Presentation**: Pinia store (`stores/personal.ts`) uses the use case and provides reactive state to Vue components

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
- `softSkills.json`: Soft skills and competencies
- `tools.json`: Development tools and software
- `experience.json`: Work history
- `education.json`: Academic background
- `certifications.json`: Professional certifications
- `auth.json`: Authentication credentials for admin panel

### State Management Pattern
Each domain has its own Pinia store in `src/stores/`:
- Stores load data from JSON files on initialization
- Main store (`main.ts`) handles global state (theme, language, menu)
- Domain-specific stores (e.g., `projects.ts`, `education.ts`, `technicalSkills.ts`)
- Admin-specific stores provide CRUD operations:
  - `certification.ts`, `softSkill.ts`, `tool.ts` - manage respective data types
  - These stores expose methods for create, update, delete operations on their data

## Component Architecture

### Key Components
- **TechGalaxy.vue**: Three.js 3D visualization with WebGL fallback
- **Admin components** (`src/components/admin/`): Full CRUD interface
  - Modals: `ProjectModal`, `ExperienceModal`, `CertificationModal`, `TechnicalSkillsModal`, `SoftSkillsModal`, `ToolsModal`, `ProfileModal`, `GitUploadModal`
  - Tables: `ProjectsTable`, `ExperienceTable`, `CertificationsTable`, `TechnicalSkillsTable`, `SoftSkillsTable`, `ToolsTable`
  - `ActionMenu`: Shared action menu component
- **LoginModal.vue**: Authentication interface
- **Display components**: `ProjectCard`, `FeaturedProject`, `CertificationCard`, `OverviewCard`, `TechBadge`, `SkillBar`
- **Layout components**: `NavBar`, `Footer`, `AppLogo`

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
- Configurable auto-rotation with pause/resume capability
- Gradient background adapts to dark/light theme

## Internationalization

- Default language: Spanish (`es`)
- Fallback: English (`en`)
- **Page-based translation structure**: Translation files are organized by page in `src/i18n/pages/`
  - Each page has separate `.es.json` and `.en.json` files (e.g., `home.es.json`, `about.en.json`)
  - Common translations in `common.es.json` and `common.en.json`
  - All translations are merged in `src/i18n/index.ts` using the `messages` export
- Language switching handled by main store with localStorage persistence
- Uses Vue I18n in Composition API mode (legacy: false)
- Data objects use `MultiLanguageText` interface with `es` and `en` properties

## Router Structure

Routes are lazy-loaded for optimal bundle splitting (except Home which loads directly):
- `/` - Home with TechGalaxy
- `/sobre-mi` - Professional timeline (redirects from `/about`)
- `/habilidades` - Technical and soft skills (redirects from `/skills`)
- `/proyectos` - Portfolio showcase (redirects from `/projects`)
- `/educacion` - Academic background (redirects from `/education`)
- `/contacto` - Contact form (redirects from `/contact`)
- `/admin` - Content management panel (requires authentication)
- `/:pathMatch(.*)*` - 404 Not Found page

The router includes:
- Enhanced scroll behavior with smooth scrolling and header offset (80px for fixed header)
- Meta tags for SEO (title, description)
- Authentication guards for admin routes (`beforeEach` checks `authStore.isLoggedIn`)
- Automatic menu closing on navigation
- Route metadata for navigation display (showInNav, icon, order)
- Error handling for chunk loading failures (auto-redirects to home)

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
- Git upload functionality for syncing changes

## Testing

- **Vitest** for unit tests with jsdom environment
- **@vue/test-utils** for Vue component testing
- **jsdom** for DOM simulation
- Test files are located in `tests/` directory
- Current test coverage includes:
  - Component tests: `TechBadge.test.ts`, `CertificationsTable.test.ts`, `AboutJourney.test.ts`
  - Store tests: `certificationStore.test.ts`, `softSkillStore.test.ts`, `technicalSkillsStore.test.ts`, `toolStore.test.ts`
  - Router test: `router.test.ts`
- Test configuration is defined in vite.config.ts with `test.environment: 'jsdom'`
