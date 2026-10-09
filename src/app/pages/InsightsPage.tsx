import { PageShell } from '../../components/PageShell'

export function InsightsPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <span className="text-4xl mb-4" aria-hidden="true">📊</span>
        <p
          className="text-xs font-medium uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-accent-purple)', fontFamily: 'var(--font-mono)' }}
        >
          Concept Frequency
        </p>
        <h1
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Insights Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Concept frequency analysis across five years of NEET papers. Coming in Slice 6.
        </p>
        <div
          className="mt-8 rounded-xl border-2 border-dashed p-12 w-full max-w-2xl"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            Coming soon
          </p>
        </div>
      </div>
    </PageShell>
  )
}

