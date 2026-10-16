import { Outlet, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { LivingCellBackground } from '../components/LivingCellBackground/LivingCellBackground'
import { CellDivisionTransition } from '../components/CellDivisionTransition'

/**
 * Root layout:
 * - Living cell background drifting behind all content (pointer-events: none, z-index: -1)
 * - Sticky header with navigation and Theme toggle
 * - Biological cell division page transition on route change
 */
export function RootLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ` +
    (isActive
      ? 'bg-[var(--surface-2)] text-[var(--accent)] font-semibold shadow-sm'
      : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]')

  return (
    <div className="min-h-dvh flex flex-col relative text-[var(--text)] bg-[var(--bg)] w-full max-w-full overflow-x-hidden">
      {/* ── Living Cell Background (behind content) ── */}
      <LivingCellBackground chapterId="cell-cycle" />

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-6 border-b backdrop-blur-md transition-colors"
        style={{
          height: 'var(--header-height)',
          backgroundColor: 'color-mix(in srgb, var(--surface) 88%, transparent)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo / title */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-bold shrink-0 transition-opacity hover:opacity-90"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text)',
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
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-[var(--accent)]"
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
          <span className="hidden sm:inline tracking-tight font-bold">NEET Biology Studio</span>
          <span className="sm:hidden tracking-tight font-bold">NBS</span>
        </NavLink>

        {/* Navigation & Theme Toggle */}
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

          <div className="flex items-center pl-1 sm:pl-2 border-l border-[var(--border)] shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Main content (above background) ── */}
      <main className="flex-1 relative z-10">
        <CellDivisionTransition>
          <Outlet />
        </CellDivisionTransition>
      </main>
    </div>
  )
}
