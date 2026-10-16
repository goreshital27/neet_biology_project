import { Outlet, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { MotionToggle } from '../components/MotionToggle'
import { LivingCellBackground } from '../components/LivingCellBackground/LivingCellBackground'
import { CellDivisionTransition } from '../components/CellDivisionTransition'

/**
 * Root layout:
 * - Living cell background canvas drifting behind all content (aria-hidden, pointer-events: none)
 * - Dark gradient overlay maintaining WCAG AA contrast over background
 * - Sticky header with navigation, accessible Motion toggle, and Theme toggle
 * - Biological cell division page transition on route change
 */
export function RootLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-1.5 sm:px-3 py-1 sm:py-2 rounded-lg text-[11px] sm:text-sm font-medium transition-colors ` +
    `hover:bg-[var(--color-bg-elevated)] ` +
    (isActive
      ? 'text-[var(--color-teal)] font-semibold'
      : 'text-[var(--color-text-secondary)]')

  return (
    <div className="min-h-dvh flex flex-col relative text-[var(--color-text-primary)] w-full max-w-full overflow-x-hidden">
      {/* ── Living Cell Canvas & Contrast Overlay (behind content) ── */}
      <LivingCellBackground chapterId="cell-cycle" />

      {/* ── Header (above canvas) ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-2 sm:px-6 border-b backdrop-blur-md"
        style={{
          height: 'var(--header-height)',
          backgroundColor: 'rgba(7, 11, 20, 0.82)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Logo / title */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-semibold shrink-0"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-lg)',
          }}
          aria-label="NEET Biology Studio home"
        >
          {/* Stylized DNA / double-helix cell organelle SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-[var(--color-teal)]"
          >
            <path d="M2 15c6.667-6 13.333 0 20-6" />
            <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
            <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
            <path d="m17 6-2.5-2.5" />
            <path d="m14 8-1-1" />
            <path d="m7 18 2.5 2.5" />
            <path d="m3.5 14.5.5.5" />
            <path d="m20 9 .5.5" />
            <path d="m6.5 12.5 1 1" />
            <path d="m16.5 10.5 1 1" />
            <path d="m10 16 1 1" />
          </svg>
          <span className="hidden sm:inline tracking-tight">NEET Biology Studio</span>
          <span className="sm:hidden tracking-tight font-bold">NBS</span>
        </NavLink>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-1 sm:gap-2 max-w-[calc(100%-4rem)] sm:max-w-none">
          <nav
            className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none py-1"
            style={{ scrollbarWidth: 'none' }}
            aria-label="Main navigation"
          >
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/syllabus" className={navLinkClass}>
              Syllabus
            </NavLink>
            <NavLink to="/insights" className={navLinkClass}>
              PYQ insights
            </NavLink>
            <NavLink to="/notes" className={navLinkClass}>
              Notes
            </NavLink>
          </nav>

          <div className="flex items-center gap-1 pl-1 sm:pl-2 border-l border-[var(--color-border)] shrink-0">
            <MotionToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Main content (above canvas) ── */}
      <main className="flex-1 relative z-10">
        <CellDivisionTransition>
          <Outlet />
        </CellDivisionTransition>
      </main>
    </div>
  )
}
