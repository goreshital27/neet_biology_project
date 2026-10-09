import { Outlet, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'

/**
 * Root layout: sticky header + main content area.
 * No sidebar for now — mobile-first, per spec §7.
 */
export function RootLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ` +
    `hover:bg-[var(--color-bg-elevated)] ` +
    (isActive
      ? 'text-[var(--color-accent-cyan)]'
      : 'text-[var(--color-text-secondary)]')

  return (
    <div className="min-h-dvh flex flex-col">
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 border-b"
        style={{
          height: 'var(--header-height)',
          backgroundColor: 'var(--color-bg-primary)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Logo / title */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-lg)',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-[var(--color-accent-cyan)]"
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
          <span className="hidden sm:inline">NEET Biology Studio</span>
          <span className="sm:hidden">NBS</span>
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/lesson" className={navLinkClass}>
            Lesson
          </NavLink>
          <NavLink to="/insights" className={navLinkClass}>
            Insights
          </NavLink>
          <NavLink to="/quiz" className={navLinkClass}>
            Quiz
          </NavLink>
          <ThemeToggle />
        </nav>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

