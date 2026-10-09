# NEET Biology Studio — Project Spec

Read this file fully before doing any task. Follow it unless the user overrides it in chat.
Working name: "NEET Biology Studio" (placeholder, easy to rename).
Default chapter for the demo: **Cell Cycle and Cell Division** (user may change it).

## 1. Goal
A competition-demo website that teaches NEET Biology through immersive 3D and animation.
Core idea: students learn a concept in an interactive 3D scene, then immediately see how NEET
tested it, with real past-year questions (PYQs) and a "how often is this tested" view.
This is a polished prototype of ONE chapter, not the whole syllabus.

Audience: NEET UG aspirants (many are teenagers on mid-range or cheap Android phones).
Judges: will look at idea, working demo, UI/UX, engineering quality, feasibility.

## 2. Hard constraints
- Static front-end only. No backend, no database, no user accounts, no login.
- No analytics, trackers, ads or behaviour monitoring (students may be under 18; keep data local).
- Progress/bookmarks live in `localStorage` only, wrapped in try/catch.
- Free hosting target (Vercel / Netlify / GitHub Pages). Must build to static files.
- Mobile-first. Must be smooth on a mid-range phone. Provide a low-power fallback (static images
  or simplified scene) when WebGL is weak or `prefers-reduced-motion` is set.
- Accessibility: keyboard navigable, visible focus states, text contrast AA, captions or text
  alternatives for every animation, never rely on colour alone.
- All biology content must be accurate and in original wording. Do NOT copy NCERT or any book text.

## 3. Stack
- Vite + React + TypeScript
- Tailwind CSS
- Three.js via @react-three/fiber and @react-three/drei
- GSAP (ScrollTrigger) for scroll storytelling, Framer Motion for UI transitions
- Lenis for smooth scroll
- Zustand for state
- D3 or Recharts for charts
- 3D assets: GLB (glTF), compressed with Draco or meshopt, produced in Blender
- Pin dependency versions. Run lint and type-check before every commit.

## 4. Folder structure
```
/src
  /app            routes, layout, providers
  /components     ui primitives
  /features
    /lesson       lesson player, stage controller, NEET Alert layer
    /pyq          checkpoint modal, question card
    /insights     concept-frequency dashboard
    /quiz         end-of-topic quiz
    /notes        revision notes viewer
  /three          scenes, camera rigs, materials, loaders
  /data           concepts.json, questions.json, quiz.json, notes.json
  /styles         tokens.css, globals
/public/models    optimized .glb files
/scripts          data validation and export scripts
```

## 5. Data model (JSON, validated with a script)
```ts
type Concept = {
  id: string;            // "mitosis-anaphase"
  chapterId: string;     // "cell-cycle"
  title: string;
  summary: string;       // original wording, 1-2 sentences
  stageIndex: number;    // which step of the 3D lesson shows it
  neetAlert?: string;    // the line to highlight as exam-relevant
};

type Question = {
  id: string;            // "neet-2023-q112"
  year: number;
  paper: string;         // e.g. "NEET UG 2023"
  text: string;
  options: string[];
  answerIndex: number;
  explanation: string;   // original wording
  conceptIds: string[];  // links to Concept.id
  source: string;        // where the question came from
  isSample: boolean;     // true if placeholder, never present as real
};
```
Concept frequency = number of questions linked to each concept, grouped by year.
**Never invent PYQs.** Until real, verified questions are entered, use clearly labelled sample
items (`isSample: true`) and show a "Sample data" badge in the UI. Keep a script that fails the
build if any non-sample question is missing `source`, `year` or `conceptIds`.

## 6. Features (priority order)
1. Lesson player: 3D scene with step controls (next, back, scrub), label and one-line explanation per
   stage, keyboard and touch support.
2. NEET Alert layer: exam-relevant parts glow or pulse on the model, with a tag such as
   "Tested in 4 of 5 papers" computed from the data.
3. PYQ checkpoints: lesson pauses, shows a past question, student answers, explanation plays using
   the current 3D stage.
4. Insights dashboard: chart of how often each concept appears across five years.
5. Quiz: 5 NEET-style MCQs with explanations.
6. Revision notes: one concise page per topic, plus a "revise in 2 minutes" mode.
7. Local progress: mark topics revised, bookmarks, XP and streak (all local).

## 7. Design direction
Goal: striking, immersive, fun to watch, but still readable for studying.
- Concept: a journey into the cell. Scroll zooms from organism, to tissue, to cell, to organelle.
- Mood: deep dark background, bioluminescent accents. Warm accent reserved for NEET Alerts.
- Signature moment (one only): the zoom journey on the landing page. Keep everything else calm.
- Optional desktop-only touch: cursor acts as a microscope lens.
- Typography: a distinctive display face for headings (e.g. Bricolage Grotesque), a clean readable
  body face (e.g. Figtree), a mono face for data labels. Avoid Inter and Space Grotesk.
- Define colour, type, spacing and radius as tokens in `tokens.css` first. Support light and dark.
- Motion: purposeful, GPU-friendly, respects `prefers-reduced-motion`.
- Layout: no horizontal scroll at 360px width. Tap targets at least 44px.

## 8. Performance budgets (targets)
- Each GLB under about 3 MB after compression; lazy-load scenes.
- Initial JS as small as practical; code-split the 3D bundle.
- 60 fps target on desktop, stable 30 fps on a mid-range phone. Cap device pixel ratio.
- Show a lightweight loading state and a static fallback image per scene.

## 9. Working rules for the agent
- Work in thin vertical slices. Finish one slice end to end before starting the next.
- After each slice: run the dev server, open it in the browser, check desktop and phone widths,
  fix console errors, run lint and type-check, then commit with a clear message.
- Do not add features, services or dependencies that are not in this spec without asking.
- If something is uncertain (biology fact, licence, data), flag it in the reply and in a TODO list,
  do not guess.
- Models from the web (Sketchfab, NIH 3D): record the author and licence of every asset in
  `/public/models/CREDITS.md` before using it.
- Keep a `PROGRESS.md` with what is done, what is next, and open questions.

## 10. Slices (definition of done)
1. Project scaffold, tokens, layout, routing, deploys to a free host. Done when a styled empty shell
   is live and builds with no errors.
2. Data layer: JSON files, types, validation script, sample data labelled as sample.
3. 3D lesson player with ONE model and three working stages.
4. Full stage set for the chosen chapter, with explanations and NEET Alert pulses.
5. PYQ checkpoint flow.
6. Insights dashboard.
7. Quiz and notes.
8. Landing-page zoom journey and visual polish.
9. Mobile and performance pass, accessibility pass, fallback modes.
10. Demo mode: a guided 3-minute walkthrough path for judges, plus final deploy.
