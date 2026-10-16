import { getConceptFrequencies } from '../../data'
import { NeetAlertChip } from '../../components/NeetAlertChip'

interface InsightsViewProps {
  showHeader?: boolean
}

export function InsightsView({ showHeader = true }: InsightsViewProps) {
  const frequencies = getConceptFrequencies('cell-cycle')

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      {showHeader && (
        <>
          <div className="p-3 rounded-2xl border mb-4 text-[var(--accent)] bg-[var(--tag-live-bg)] border-[var(--tag-live-border)]">
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
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              5-Year Concept Frequency
            </p>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 text-center"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            NEET Past-Year Question Frequency
          </h2>

          <p
            className="max-w-lg mb-8 text-center text-xs sm:text-sm"
            style={{ color: 'var(--text-2)' }}
          >
            Historical NEET question distribution across Cell Cycle concepts (2019 – 2023).
          </p>
        </>
      )}

      {/* Breakdown Card */}
      <div
        className="rounded-[12px] border p-5 sm:p-6 w-full backdrop-blur-sm transition-colors"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border)]">
          <span className="text-xs sm:text-sm font-semibold text-[var(--text)] font-mono uppercase">
            Curriculum Concept Breakdown (5 Years)
          </span>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded border"
            style={{
              backgroundColor: 'var(--tag-live-bg)',
              borderColor: 'var(--tag-live-border)',
              color: 'var(--tag-live-text)',
            }}
          >
            5-Year Verified
          </span>
        </div>

        <div className="space-y-3">
          {frequencies.map((freq) => (
            <div
              key={freq.conceptId}
              className="p-3.5 rounded-[12px] border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors"
              style={{
                backgroundColor: 'var(--surface-2)',
                borderColor: 'var(--border)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold text-[var(--accent)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Stage {freq.stageIndex + 1}
                  </span>
                  <h3 className="text-xs sm:text-sm font-semibold text-[var(--text)]">
                    {freq.conceptTitle}
                  </h3>
                </div>
                {freq.neetAlert && (
                  <p className="text-xs text-[var(--text-2)] line-clamp-1">
                    {freq.neetAlert}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {freq.totalCount >= 2 && (
                  <NeetAlertChip label="High Yield" testedCount={`${freq.totalCount} Qs`} />
                )}
                <span
                  className="text-xs px-2.5 py-1 rounded-[12px] font-mono border"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {freq.totalCount} Qs tested
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
