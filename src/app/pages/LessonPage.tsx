import { PageShell } from '../../components/PageShell'
import { SampleDataBadge } from '../../components/SampleDataBadge'
import { concepts } from '../../data'
import { NeetAlertChip } from '../../components/NeetAlertChip'
import { MitosisVideoLesson } from '../../features/lesson/MitosisVideoLesson'

export function LessonPage() {
  return (
    <PageShell>
      <div className="flex flex-col px-3 sm:px-6 py-8 max-w-7xl mx-auto w-full">
        {/* Lesson Header */}
        <div className="flex flex-col items-start mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-mono)' }}
            >
              Cell Cycle &amp; Cell Division
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{
                backgroundColor: 'rgba(139, 124, 255, 0.15)',
                color: 'var(--color-violet)',
              }}
            >
              Mitosis Lesson
            </span>
            <SampleDataBadge size="sm" />
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            Mitosis: Stages &amp; Dynamic PYQ Checkpoints
          </h1>

          <p
            className="text-xs sm:text-sm max-w-2xl leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Watch cell division unfold in high-fidelity animation while synchronized NEET
            past-year question (PYQ) cards test your understanding at key mitotic phases.
          </p>
        </div>

        {/* Video Lesson & PYQ Overlay Section */}
        <div className="mb-12">
          <MitosisVideoLesson />
        </div>

        {/* Curriculum Stages Reference Section */}
        <div
          className="rounded-2xl border p-5 sm:p-6 w-full text-left backdrop-blur-sm mt-4"
          style={{
            backgroundColor: 'rgba(14, 21, 38, 0.7)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--color-border)]">
            <div>
              <h2
                className="text-base sm:text-lg font-semibold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                Curriculum Stages ({concepts.length} Concepts)
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Comprehensive syllabus checkpoints mapped to cell division
              </p>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded font-mono font-medium"
              style={{
                backgroundColor: 'rgba(79, 227, 200, 0.1)',
                color: 'var(--color-teal)',
                border: '1px solid rgba(79, 227, 200, 0.25)',
              }}
            >
              100% NCERT-Aligned
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {concepts.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl border flex flex-col justify-between transition-colors hover:border-[var(--color-border-hover)]"
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
