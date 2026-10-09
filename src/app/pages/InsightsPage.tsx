import { PageShell } from '../../components/PageShell'
import { SampleDataBadge } from '../../components/SampleDataBadge'
import { getConceptFrequencies } from '../../data'
import { NeetAlertChip } from '../../components/NeetAlertChip'

export function InsightsPage() {
  const frequencies = getConceptFrequencies('cell-cycle')

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center px-4 py-16 max-w-4xl mx-auto">
        <div className="p-3 rounded-2xl border mb-4 text-[var(--color-violet)] bg-[rgba(139,124,255,0.1)] border-[rgba(139,124,255,0.25)]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-violet)', fontFamily: 'var(--font-mono)' }}
          >
            5-Year Concept Frequency
          </p>
          <SampleDataBadge />
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold mb-4 text-center"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Insights Dashboard
        </h1>

        <p className="max-w-lg mb-8 text-center text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
          Historical NEET test distribution across concepts. D3 / interactive bar charts
          will be rendered in Slice 6.
        </p>

        {/* Live Frequency Table / Cards from Data Layer */}
        <div
          className="rounded-2xl border p-6 w-full backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(14, 21, 38, 0.7)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              Tested Concept Breakdown (2019 – 2023)
            </span>
            <SampleDataBadge size="sm" />
          </div>

          <div className="space-y-3">
            {frequencies.map((freq) => (
              <div
                key={freq.conceptId}
                className="p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                style={{
                  backgroundColor: 'rgba(7, 11, 20, 0.5)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-semibold text-[var(--color-teal)]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      Stage {freq.stageIndex + 1}
                    </span>
                    <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
                      {freq.conceptTitle}
                    </h3>
                  </div>
                  {freq.neetAlert && (
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1">
                      {freq.neetAlert}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {freq.totalCount >= 2 && (
                    <NeetAlertChip label="High Yield" testedCount={`${freq.totalCount} Qs`} />
                  )}
                  <span
                    className="text-xs px-2.5 py-1 rounded-lg border font-mono font-medium"
                    style={{
                      backgroundColor: 'rgba(90, 169, 255, 0.08)',
                      borderColor: 'rgba(90, 169, 255, 0.25)',
                      color: 'var(--color-blue)',
                    }}
                  >
                    {freq.totalCount} Sample Q{freq.totalCount === 1 ? '' : 's'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
