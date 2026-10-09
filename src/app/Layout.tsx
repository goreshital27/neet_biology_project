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
          {/* Emoji placeholder — replace with SVG logo later */}
          <span aria-hidden="true" className="text-xl">🧬</span>
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
