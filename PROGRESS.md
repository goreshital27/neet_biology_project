# NEET Biology Studio — Progress

## ✅ Slice 1: Project Scaffold (Complete)

**Date:** 2026-10-10

### What was built
- **Vite + React + TypeScript** scaffold (Vite 8, React 19, TypeScript 6)
- **Tailwind CSS v4** with Vite plugin integration
- **Design tokens** in `src/styles/tokens.css`:
  - Colour palette: deep dark background with bioluminescent accents (cyan, green, purple)
  - Warm orange accent reserved for NEET Alerts
  - Light and dark themes (dark by default, respects `prefers-color-scheme`)
  - Typography: Bricolage Grotesque (display), Figtree (body), JetBrains Mono (data labels)
  - Spacing scale, border radii, shadows (including glow effects), transitions
  - Layout tokens (header height, sidebar width, content max-width, 44px tap targets)
- **Global styles** (`src/styles/globals.css`):
  - Base resets, focus-visible states, reduced-motion support, scrollbar styling
  - Minimum 44px tap targets on interactive elements
- **Routing** via react-router-dom:
  - Home, Lesson, Insights, Quiz, Notes, 404 pages
  - All pages render inside a shared `RootLayout` with sticky header and nav
- **Theme toggle** component with localStorage persistence
- **Folder structure** matching spec §4:
  - `/src/app` — routes, layout, providers
  - `/src/components` — UI primitives (PageShell, ThemeToggle)
  - `/src/features/{lesson,pyq,insights,quiz,notes}` — feature modules (stubs)
  - `/src/three` — 3D scenes (stub)
  - `/src/data` — JSON data files (stub)
  - `/src/styles` — tokens and globals
  - `/public/models` — GLB files + CREDITS.md
  - `/scripts` — data validation (stub)
- **Styled empty shell** with hero section, feature preview cards, placeholder pages
- **Build passes** with zero errors, zero lint warnings, zero type errors

### Dependencies installed
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.8 | UI library |
| react-dom | ^19.2.8 | React DOM renderer |
| react-router-dom | ^7.6.3 | Client-side routing |
| tailwindcss | ^4.1.10 | Utility-first CSS |
| @tailwindcss/vite | ^4.1.10 | Tailwind Vite plugin |
| zustand | ^5.0.6 | State management (installed, not used yet) |

### Verification
- ✅ `npm run build` — clean (0 errors, 0 warnings)
- ✅ `npm run lint` — 0 warnings, 0 errors (oxlint, 14 files, 116 rules)
- ✅ `npm run typecheck` — clean
- ✅ Dev server runs at localhost:5173
- ✅ Desktop layout renders correctly
- ✅ Mobile (360px) — no horizontal scroll, tap targets ≥ 44px

---

## 🔜 Slice 2: Data Layer (Next)

### What it will include
- TypeScript types for `Concept` and `Question` (from spec §5)
- JSON data files: `concepts.json`, `questions.json` with sample data
- Validation script that fails build if non-sample questions lack `source`, `year`, or `conceptIds`
- "Sample data" badge component for the UI
- Integration test for data validation

---

## Open Questions
- None at this time. All Slice 1 requirements are clear from the spec.
