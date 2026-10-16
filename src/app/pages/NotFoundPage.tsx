import { useNavigate } from 'react-router-dom'
import { PageShell } from '../../components/PageShell'
import { MembraneButton } from '../../components/MembraneButton'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-md mx-auto">
        <div className="p-4 rounded-2xl border mb-4 text-[var(--accent)] bg-[var(--tag-live-bg)] border-[var(--tag-live-border)]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <h1
          className="text-4xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
        >
          404
        </h1>

        <p className="mb-6 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
          This page doesn't exist. Maybe the cell hasn't divided here yet.
        </p>

        <MembraneButton
          variant="primary"
          onClick={() => navigate('/')}
          className="text-sm font-semibold"
        >
          ← Back to Home
        </MembraneButton>
      </div>
    </PageShell>
  )
}
