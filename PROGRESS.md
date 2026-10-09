# NEET Biology Studio — Progress

## ✅ Slice 1: Project Scaffold (Complete)

**Date:** 2026-10-10

### What was built
- **Vite + React + TypeScript** scaffold (Vite 8, React 19, TypeScript 6)
- **Tailwind CSS v4** with Vite plugin integration
- **Design tokens** in `src/styles/tokens.css`:
  - Bioluminescent dark palette (#070B14 background, #E8F0FA text, #A9B9CF muted, #4FE3C8 teal, #8B7CFF violet, #5AA9FF blue, #FF7A9C rose)
  - Warm amber #FFB547 reserved **strictly** for NEET Alert elements
  - Light and dark themes (dark is default; light toggle option preserved)
  - Typography: Bricolage Grotesque (display), Figtree (body), JetBrains Mono (data labels)
  - Spacing scale, border radii, shadows (including bioluminescent glow effects)
  - Layout tokens (header height, sidebar width, content max-width, 44px tap targets)
- **Global styles** (`src/styles/globals.css`):
  - Base resets, focus-visible states, reduced-motion support, scrollbar styling
  - Minimum 44px tap targets on interactive elements
- **Routing** via `react-router-dom`:
  - Home, Lesson, Insights, Quiz, Notes, 404 pages
  - Shared `RootLayout` with sticky header, navigation, and theme/motion controls
- **SVG Iconography**: Clean geometric stroke SVG icons matching logo style (no emojis in primary UI)

---

## ✅ Slice 2: Data Layer (Complete)

**Date:** 2026-10-10

### What was built
- **TypeScript Data Models** (`src/data/types.ts`):
  - `Concept`: id, chapterId, title, summary, stageIndex, neetAlert
  - `Question`: id, year, paper, text, options, answerIndex, explanation, conceptIds, source, isSample
  - `QuizQuestion`: id, question, options, correctIndex, explanation, conceptId, isSample
  - `RevisionNote`: id, conceptId, chapterId, title, keyTakeaways, examAlert, quickReviseSummary, isSample
  - `Chapter`: metadata and total stages
  - `ConceptFrequency`: computed breakdown across years
- **JSON Data Files** (`src/data/`):
  - `concepts.json`: 10 comprehensive curriculum concepts for Cell Cycle and Cell Division
  - `questions.json`: 10 sample NEET questions spanning 2019–2023 with `isSample: true` (no invented real PYQs; original wording)
  - `quiz.json`: 5 end-of-topic MCQ checkpoint questions
  - `notes.json`: 5 concise revision note cards with exam tips
  - `chapters.json`: Chapter metadata
- **Automated Validation Script** (`scripts/validate-data.mjs`):
  - Runs before build (`npm run build`) and via `npm run validate:data`
  - Verifies data integrity across all datasets
  - Hard constraint: fails the build immediately if any non-sample question is missing `source`, `year`, or `conceptIds`, or references nonexistent concept IDs
- **Sample Data Badge Component** (`src/components/SampleDataBadge.tsx`):
  - Displayed prominently across Home, Lesson, Insights, Quiz, and Notes views to clearly distinguish prototype sample items from verified exam questions.

---

## ✅ Slice 2B: Living Cell Background and Motion System (Complete)

**Date:** 2026-10-10

### What was built
1. **Living Cell Background Layer** (`src/components/LivingCellBackground/LivingCellBackground.tsx`):
   - Fixed, full-screen `<canvas>` positioned behind all page content (`aria-hidden="true"`, `pointer-events: none`).
   - Drifting translucent biological organelles with glowing outlines and inner details:
     - **Cells**: round with soft fills and violet/teal nuclei in varying sizes
     - **Mitochondria**: capsule-shaped outer/inner membranes with folded cristae in rose (`#FF7A9C`), rotating slowly
     - **Golgi bodies**: 3–4 stacked curved cisternae in violet (`#8B7CFF`) with nearby secretory vesicles
     - **Endoplasmic reticulum**: wavy tubules with ribosomal dots along contours in blue (`#5AA9FF`)
     - **Ribosome clusters**: clusters of tiny glowing dots in light teal (`#4FE3C8`)
     - **Vesicles & Lysosomes**: buoyant rings floating upward like cellular bubbles
     - **Cell Cycle specific additions**: Spindle fibre astral arrays and X-shaped condensed chromosome chromatids
   - **Performance Sprite Atlas** (`spriteRenderer.ts`):
     - Renders each organelle type across 3 depth tiers to offscreen canvases **once at init**
     - Zero `ctx.filter` or `ctx.shadowBlur` during animation frames (pure `ctx.drawImage` blits)
     - Responsive object counts: 40 on desktop, 25 on tablet, 14 on phones
     - Device pixel ratio capped at 2.0 on desktop, 1.5 on mobile
     - Delta-time `requestAnimationFrame` loop with visibility change detection (pauses when tab is hidden)
   - **Physics & Interactivity**:
     - Depth parallax: near objects are larger, softer, and move faster; far objects are smaller, sharper, and move slower
     - Multi-sine noise drift with boundary screen wrapping
     - Interactive cursor repulsion away from pointer
     - Scroll parallax offset
   - **Debug FPS Counter**:
     - Activated only when URL contains `?debug` (shows FPS, live organelle count, motion status)
2. **Accessibility & Contrast**:
   - Automatic `prefers-reduced-motion` compliance: draws a single static canvas frame without running the animation loop
   - Visible **Motion: On/Off** toggle button in header (`aria-pressed`, ≥44px tap target, persists to `localStorage` in try/catch)
   - Dark radial gradient overlay ensuring all page typography strictly maintains WCAG AA contrast (primary text contrast > 17:1 against background)
3. **Chapter Background Configuration** (`src/data/chapterBackgroundConfig.ts`):
   - Extensible organelle configuration per chapter; includes spindle fibres and chromosomes for `cell-cycle` and prepared for chloroplasts in future plant chapters
4. **Framer Motion UI Motion System**:
   - Motion tokens configured in `tokens.css` (`--ease-membrane`, `--ease-float`, `--ease-spring`, `--motion-duration-*`)
   - Card hover float (`whileHover={{ y: -6 }}`) on Feature Cards
   - Membrane ripple effect on button press (`src/components/MembraneButton.tsx`)
   - Bioluminescent pulsing glow on NEET Alert chips (`src/components/NeetAlertChip.tsx`) with reserved amber `#FFB547`
   - Biological cell division page transition (`src/components/CellDivisionTransition.tsx`) simulating cytokinesis cleavage on route changes
   - Expressive motion on Home page; calm and focused presentation on Lesson pages

### Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | ^14.1.0 | UI transitions, spring mechanics, layout animations |
| `zustand` | ^5.0.15 | Client state store for motion preference |
| `react-router-dom` | ^7.18.4 | Client routing |
| `tailwindcss` | ^4.3.3 | Styling |

### Verification
- ✅ `npm run build` — Clean build with data validation passing
- ✅ `npm run validate:data` — Verified all 4 datasets with strict schema enforcement
- ✅ `npm run lint` — 0 warnings, 0 errors (oxlint)
- ✅ `npm run typecheck` — Clean TypeScript type check (`tsc -b --noEmit`)
- ✅ Desktop & Mobile (360px) layout verified (no horizontal scroll, 44px tap targets)
- ✅ Performance budget respected: sprite blitting, capped DPR, paused on background tabs

---

## 🔜 Slice 3: 3D Lesson Player (Next)

### What it will include
- Three.js via `@react-three/fiber` and `@react-three/drei`
- ONE 3D model with 3 working stages (e.g. Prophase, Metaphase, Anaphase)
- Stage controller (next, back, scrub controls)
- Label and one-line explanation per stage
- Keyboard and touch support
- Low-power static fallback image when WebGL is weak or unavailable

---

## Spec Notes & Considerations
- **Palette refinement**: The spec §7 described a general deep dark background with bioluminescent accents; Slice 2B pinned specific hexadecimal values (`#070B14`, `#E8F0FA`, `#A9B9CF`, `#4FE3C8`, `#8B7CFF`, `#5AA9FF`, `#FF7A9C`, and `#FFB547`). These are recorded in `tokens.css` and strictly respect the rule that amber is reserved solely for NEET Alerts.
- **Motion hierarchy**: Per spec §7 ("keep everything else calm"), the strongest motion is placed on the Home page, while the lesson pages maintain a focused, calm study environment.
