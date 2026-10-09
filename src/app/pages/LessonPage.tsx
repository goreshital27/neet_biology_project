import { PageShell } from '../../components/PageShell'
import { SampleDataBadge } from '../../components/SampleDataBadge'
import { concepts } from '../../data'
import { NeetAlertChip } from '../../components/NeetAlertChip'

function MicroscopeIcon({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={{ color: 'var(--color-teal)' }}
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
    </svg>
  )
}

export function LessonPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center text-center px-4 py-16 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <MicroscopeIcon className="w-14 h-14" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-mono)' }}
          >
            Cell Cycle &amp; Cell Division
          </p>
          <SampleDataBadge />
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          3D Lesson Player Shell
        </h1>
        <p className="max-w-lg mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          The interactive Three.js 3D stage scene with step controls (next, back, scrub)
          and real-time camera rigs will be integrated in Slice 3.
        </p>

        {/* Preview of validated curriculum stages from data layer */}
        <div
          className="rounded-2xl border p-6 w-full text-left backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(14, 21, 38, 0.7)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
            <h2
              className="text-base font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              Curriculum Stages Ready for 3D Rigging ({concepts.length} Stages)
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(79, 227, 200, 0.1)',
                color: 'var(--color-teal)',
              }}
            >
              100% Validated
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {concepts.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl border flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(7, 11, 20, 0.5)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className="font-semibold"
                      style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-mono)' }}
                    >
                      Stage {c.stageIndex + 1}
                    </span>
                    {c.neetAlert && <NeetAlertChip label="Alert" className="text-[10px] py-0.5 px-2" />}
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
                    {c.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
