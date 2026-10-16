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

- ✅ Performance budget respected: sprite blitting, capped DPR, paused on background tabs

---

## ✅ Slice 3A: Mitosis Video Lesson & Dynamic PYQ Overlays (Complete)

**Date:** 2026-10-17

### What was built
1. **Mitosis Video Player Component** (`src/features/lesson/VideoPlayer.tsx`):
   - Native `<video>` embedding `public/videos/mitosis-lesson.mp4` (20s, 1280x720, 24fps)
   - `preload="metadata"`, `playsInline`, `controls`, and no autoplay with sound
   - Strictly uncropped presentation (`aspect-video object-contain`) to preserve the corner mark
   - Discreet "Visuals generated with AI" badge near the player
   - Prominent Mute/Unmute button with SVG state indicators and keyboard focus states
   - Graceful "Video coming soon" fallback card displayed on loading error or missing video file
   - Timing Helper (?debug in URL): displays live timestamp (`⏱ 12.3s / 20.0s`), "Copy time (M)" button, and global `M` key shortcut copying to clipboard with confirmation toast

2. **Dynamic PYQ Overlays & Card Component** (`src/features/lesson/PyqOverlayCard.tsx`):
   - Synchronized card presentation sliding in at `startSec` and out at `endSec` (fading when `prefers-reduced-motion` is active)
   - 4-choice MCQ interface with accessible radio semantics, visible focus rings, and ≥44px tap targets
   - "Pause and try" button: pauses video playback to let the student select an option calmly
   - Immediate option evaluation upon selection: green/teal border + "✓ Correct Answer" label, or rose/red + "✗ Your Choice", plus detailed biological rationale box
   - "Continue" button appearing after answer selection to seamlessly resume video playback
   - Automatic answer reveal at `revealAnswerAtSec` if not answered beforehand, using text labels as well as colour
   - Badges: "Sample question" badge on sample items, and "NEET <year> • <paper>" on real exam questions
   - "Asked in X of 5 papers" frequency tag: computed strictly from `questions.json` by counting distinct years of non-sample questions; hidden when no non-sample questions exist
   - Standby mode when no overlay is active: lists all upcoming question checkpoints with direct "Jump →" seek buttons
   - Accessibility: ARIA region `aria-label="NEET Past-Year Questions Panel"` with `aria-live="polite"` announcing new cards to screen readers; WCAG AA contrast

3. **Interactive Chapter List** (`src/features/lesson/ChapterList.tsx`):
   - 12 MITOSIS stages: Interphase (0s), Prophase (2s), Metaphase (3.8s), Anaphase (5.5s), Daughter cells (7s), Recap (8.8s), Interphase (10.3s), Prophase (12s), Prometaphase (13.7s), Metaphase (15.2s), Anaphase (16.8s), Telophase and cytokinesis (18.3s)
   - Formatted timestamps (`0:00`, `0:02`, `0:15.2`) and active stage highlighted with glowing border
   - Direct click-to-seek seeking video to `chapter.startSec`

4. **Lesson Orchestration & Responsive Layout** (`src/features/lesson/MitosisVideoLesson.tsx` & `src/app/pages/LessonPage.tsx`):
   - Desktop (≥1024px): 2-column layout with video & chapters on the left (~65% width) and PYQ panel on the right (~35% width)
   - Mobile (<1024px): single-column stacked layout where the PYQ card sits directly under the video, followed by the chapter list
   - 360px viewport: zero horizontal scroll verified (`scrollWidth === clientWidth`)
   - Frame-accurate time tracking using `requestVideoFrameCallback` with `requestAnimationFrame` fallback and a 0.04s frame boundary quantization tolerance for 24fps media

5. **Data Layer & Validation Suite** (`src/data/videos.json`, `src/data/questions.json`, `scripts/validate-data.mjs`):
   - Created `videos.json` array with video metadata, chapters, and timed overlays
   - Added 4 curated sample questions (`q-prophase`, `q-metaphase`, `q-anaphase`, `q-cytokinesis`) in original wording with 1-2 sentence explanations, `isSample: true`, and null year/paper
   - Extended `scripts/validate-data.mjs` to strictly enforce:
     - All overlay question IDs exist in `questions.json`
     - Overlay `endSec` is strictly after `startSec`
     - Overlays do not exceed `video.durationSec`
     - Any non-sample question MUST have valid `year`, `paper`, and `source`
   - Added `getNonSamplePaperCount(conceptId)` frequency calculation helper

### Verification
- ✅ `npm run build` — Clean production build with data validation, tsc, and vite build (0 errors)
- ✅ `npm run validate:data` — All 5 datasets verified (concepts, questions, videos, quiz, notes)
- ✅ `npm run lint` — 0 warnings, 0 errors (oxlint)
- ✅ `npm run typecheck` — Clean TypeScript type check (`tsc -b --noEmit`)
- ✅ Automated browser verification suite (`test-video-lesson.mjs`) passed 8/8 tests with Edge headless:
  - Video attributes, preload="metadata", playsInline, controls, and uncropped 16:9
  - Dedicated Mute toggle and audio state syncing
  - Seeking to overlays and active card rendering
  - "Pause and try", option evaluation, and "Continue" playback resumption
  - Automatic answer reveal at `revealAnswerAtSec`
  - Chapter list navigation and seeking
  - 360px mobile viewport zero-overflow check (`scrollWidth === 360`)
  - "Video coming soon" fallback card on loading error

---

## ✅ Slice 3B: Syllabus Architecture & Chapter Pages (Complete)

**Date:** 2026-10-17

### What was built
1. **Syllabus Data Model** (`src/data/syllabus.ts`):
   - Full NTA NEET Biology curriculum for Class 11 (5 units, 22 chapters) and Class 12 (5 units, 16 chapters).
   - Chapter attributes: `id`, `slug`, `title`, `classLevel` (11 | 12), `unit`, `weightage` ('High' | 'Medium' | 'Low'), `status` ('live' | 'coming-soon'), `videoUrl?`, `stageTimestamps?`, and brief syllabus descriptions.
   - Stage timestamps configured for Cell Cycle and Cell Division: Interphase (0s), Prophase (2s), Metaphase (3.8s), Anaphase (5.5s), Telophase (18.3s), Cytokinesis (18.3s).
   - Only `"cell-cycle-and-cell-division"` has `status: 'live'`; all others are marked `'coming-soon'`.

2. **Syllabus Home Page** (`/` in `src/app/pages/HomePage.tsx`):
   - **Hero Section**: Exact headline `"Master NEET Biology, concept by concept"` and single subtitle line `"Animated lessons, NCERT notes and PYQ practice for the full syllabus"`.
   - **Curriculum Controls**: Class 11 / Class 12 toggle tabs with chapter counts, and a real-time instant search input with clear button.
   - **Unit Cards Grid**: Consistent 12px rounded borders (`rounded-[12px]`) with thin bioluminescent borders.
   - **Chapter Rows**: Title, weightage badge (High [rose/amber], Medium [blue], Low [muted slate]), and status badge (Live with pulsing green status dot, or Soon).
   - **Strict Zero-Media Isolation**: Removed all legacy 3D/video embeds, feature cards, and Cell Cycle specific preview elements from `/`. Visiting `/` triggers **0 video or media requests**.
   - Navigation links seamlessly to `/chapter/:slug`.

3. **Chapter Page Architecture** (`/chapter/:slug` in `src/app/pages/ChapterPage.tsx`):
   - **Breadcrumbs**: `Home / Class 11 / Cell / Cell Cycle and Cell Division` with deep-linking to filtered class levels.
   - **Header**: Chapter title, weightage badge, class badge, and chapter curriculum overview.
   - **Four-Tab Workspace**: `Animation | Notes | Quiz | PYQ insights` (Animation tab selected by default).
   - **Animation Tab**:
     - Pre-rendered mitosis video player with `preload="metadata"` and dedicated `poster="/videos/mitosis-poster.jpg"`.
     - Stage Chips (`src/features/lesson/StageChips.tsx`): 6 interactive stage chips (`Interphase`, `Prophase`, `Metaphase`, `Anaphase`, `Telophase`, `Cytokinesis`) with formatted timestamps (`0:00`, `0:02`, `0:15`), active glow state, jump-to-timestamp seeking, and active stage one-line NCERT explanation card.
     - Dynamic time-synced PYQ question cards and overlay system.
   - **Tab Modularization**:
     - `NotesView.tsx`: NCERT revision note cards with 2-minute exam summary toggle.
     - `QuizView.tsx`: 5-question MCQ checkpoint quiz with instant feedback, scoring, and retries.
     - `InsightsView.tsx`: 5-year NEET question frequency analysis and high-yield breakdown.
   - **Coming Soon Page**:
     - Coming-soon chapters display a dedicated "Coming Soon" card with lesson production details and a `← Back to syllabus` button that navigates back to the home syllabus.

4. **Navbar & Routing Polish** (`src/app/Layout.tsx`, `src/app/Routes.tsx`):
   - Header navigation includes: Logo (links to `/`), Home, Syllabus, PYQ insights, Notes, Theme toggle, and Motion toggle.
   - Removed chapter-specific "Lesson" link from global navigation; `/lesson` gracefully redirects to `/chapter/cell-cycle-and-cell-division`.

### Verification
- ✅ **Network Verification (CDP / Headless Edge)**:
  - Navigated to `http://localhost:5173/`: 58 total requests, **0 video requests** (`.mp4` / `/videos/`). Verified video loads strictly on demand.
  - Navigated to `http://localhost:5173/chapter/cell-cycle-and-cell-division`: Loads poster and video metadata correctly on chapter entry.
  - Navigated to `http://localhost:5173/chapter/the-living-world`: Confirmed "Coming soon" state with "Back to syllabus" button.
- ✅ **Typecheck & Lint**:
  - `tsc -b --noEmit` passed with 0 errors.
  - `oxlint` passed with 0 errors and 0 warnings across all 36 files.
- ✅ **Production Build**:
  - `npm run build` compiled client bundle with complete data validation.

---

## ✅ UI/UX Refinement: Theme Overhaul, Biology Background & Chapter Polish (Complete)

**Date:** 2026-10-17

### What was built
1. **Motion Toggle Removal & Accessibility Standards**:
   - Deleted the "Motion: ON/OFF" button from the navbar.
   - Removed localStorage and state code for manual motion toggling.
   - Wrapped all decorative and layout animations (`CellDivisionTransition`, `PyqOverlayCard`, `LivingCellBackground`) in `prefers-reduced-motion` checks using `usePrefersReducedMotion()` hook.
   - When users specify reduced motion, animations stay completely static.

2. **Complete Theme Overhaul & WCAG AA Contrast**:
   - Replaced ad-hoc colors with unified CSS variables defined for `[data-theme="dark"]` and `[data-theme="light"]`:
     - **Dark (default)**: `--bg: #0B1220; --surface: #111A2C; --surface-2: #172238; --border: #2A3A57; --text: #F1F5F9; --text-2: #B6C2D4; --text-muted: #8A99B0; --accent: #2DD4BF; --on-accent: #04201C;`
     - **Light**: `--bg: #F6F8FB; --surface: #FFFFFF; --surface-2: #EEF2F7; --border: #D5DDE8; --text: #0F172A; --text-2: #44546A; --text-muted: #64748B; --accent: #0F766E; --on-accent: #FFFFFF;`
   - Defined tinted tag variables (`--tag-high-*`, `--tag-med-*`, `--tag-low-*`, `--tag-live-*`, `--tag-soon-*`, `--tag-class-*`) with lighter text on dark backgrounds and darker text on light backgrounds for high contrast and readability.
   - Adopted clean sans-serif typography (`Inter`) for headings and body; reserved monospace exclusively for tiny data labels and timestamps.
   - `ThemeToggle` defaults to system preference (`window.matchMedia('(prefers-color-scheme: light)')`), switches the entire app dynamically, and persists to `localStorage`.

3. **Visible & Biology-Themed Animated Background Layer**:
   - Replaced faint background with a biology-themed layer fixed behind all content (`pointer-events: none`, `z-index: 0`):
     - **10 translucent biological cells** (40px to 160px) in teal, violet, and coral with visible circular membranes, soft inner fills, and nucleus dots.
     - **Mitosis dividing cell** with an animated cleavage furrow loop every 9s.
     - **Rotating DNA double helix** with base-pair rungs in the corner.
     - Soft radial mask leaving the center headline and card area calm.
     - Theme-controlled opacity: 0.45 in dark mode and 0.32 in light mode.
     - GPU-friendly CSS transforms and opacity only; pauses via `visibilitychange` when tab is inactive.

4. **Chapter Page & Player Polish**:
   - Generated genuine frame capture from `mitosis-lesson.mp4` as `public/videos/mitosis-poster.jpg` (replacing accidental page screenshot).
   - Removed nested page elements from Animation tab: now contains ONLY the 16:9 video player, stage chips, and PYQ checkpoint panel beside it.
   - Fixed breadcrumb navigation to stay cleanly on a single flex row (`Home / Class 11 / Cell: Structure & Functions / Cell Cycle and Cell Division`).
   - Removed all instances of "Visuals generated with AI" and "Sample data" pills across views.

### Verification
- ✅ **Automated Browser Verification in Headless Edge**:
  - Home Page (`/`) in dark & light themes: verified text contrast (AA compliant), no Motion button, 86 background SVG elements rendered.
  - Chapter Page (`/chapter/cell-cycle-and-cell-division`) in dark & light themes: verified single-line breadcrumb, 16:9 rounded-16px player with mitosis poster, stage chips, PYQ panel, 0 pills, 0 console errors.
- ✅ **TypeScript & Linting**:
  - `npm run typecheck` (`tsc -b --noEmit`): 0 errors.
  - `npm run lint` (`oxlint`): 0 warnings, 0 errors across 34 files.
  - `npm run build`: Production bundle and data validation 100% passed.

---

## 🔜 Next Steps: Slice 4
- Three.js 3D interactive stages / GLB model exploration
- Stage controller & camera rigs connecting to 3D models per NEET_PROJECT_SPEC.md §6

---

## Spec Notes & Considerations
- **Video Player vs 3D Scene (Spec §6 & §10)**: Spec §6 prioritized an interactive 3D scene with Three.js / R3F for Slice 3. Slice 3A introduces a complementary high-definition pre-rendered animation video player (`mitosis-lesson.mp4`) with timed dynamic PYQ checkpoints and chapter scrubbing. This provides an immediate, polished multimedia lesson player and fallback while 3D GLB assets are prepared.
- **Data Model Evolution (§5)**: The spec originally defined `Question` with required `year: number` and `paper: string`. For prototype sample items (`isSample: true`), Slice 3A allows `year: null` and `paper: null`, while strictly requiring `year`, `paper`, and `source` for all non-sample exam questions.
- **Concept Tagging**: The spec mentioned `conceptIds: string[]`. Slice 3A supports both `conceptId: string` (singular) and `conceptIds?: string[]` to ensure seamless compatibility across all features and queries.
