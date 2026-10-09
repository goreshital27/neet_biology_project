import { NavLink } from 'react-router-dom'
import { PageShell } from '../../components/PageShell'

export function NotFoundPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <span className="text-5xl mb-4" aria-hidden="true">🔍</span>
        <h1
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          404
        </h1>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          This page doesn't exist. Maybe the cell hasn't divided here yet.
        </p>
        <NavLink
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base transition-all"
          style={{
            backgroundColor: 'var(--color-accent-cyan)',
            color: 'var(--color-text-inverse)',
          }}
        >
          ← Back to Home
        </NavLink>
      </div>
    </PageShell>
  )
}
