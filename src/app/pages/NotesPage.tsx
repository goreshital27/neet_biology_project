import { useState } from 'react'
import { PageShell } from '../../components/PageShell'
import { SampleDataBadge } from '../../components/SampleDataBadge'
import { revisionNotes } from '../../data'
import { NeetAlertChip } from '../../components/NeetAlertChip'

export function NotesPage() {
  const [quickReviseMode, setQuickReviseMode] = useState(false)

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center px-4 py-16 max-w-4xl mx-auto">
        <div className="p-3 rounded-2xl border mb-4 text-[var(--color-blue)] bg-[rgba(90,169,255,0.1)] border-[rgba(90,169,255,0.25)]">
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
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-mono)' }}
          >
            High-Yield Revision
          </p>
          <SampleDataBadge />
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold mb-4 text-center"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Revision Notes
        </h1>

        <p className="max-w-lg mb-6 text-center text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
          Concise revision cards formatted for rapid pre-exam recall.
        </p>

        {/* 2-Minute Revision Mode Toggle */}
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => setQuickReviseMode((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all"
            style={{
              backgroundColor: quickReviseMode
                ? 'rgba(79, 227, 200, 0.15)'
                : 'rgba(14, 21, 38, 0.7)',
              borderColor: quickReviseMode ? 'var(--color-teal)' : 'var(--color-border)',
              color: quickReviseMode ? 'var(--color-teal)' : 'var(--color-text-primary)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: quickReviseMode ? 'var(--color-teal)' : 'var(--color-text-muted)' }}
            />
            {quickReviseMode ? 'Exit 2-Minute Mode' : '⚡ Revise in 2 Minutes Mode'}
          </button>
        </div>

        {/* Notes Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {revisionNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border p-5 backdrop-blur-sm flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(14, 21, 38, 0.7)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="text-base font-semibold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {note.title}
                  </h3>
                  <NeetAlertChip label="Alert" className="text-[10px] py-0.5 px-2" />
                </div>

                {quickReviseMode ? (
                  <p
                    className="text-sm font-medium leading-relaxed p-3 rounded-xl border mt-3"
                    style={{
                      backgroundColor: 'rgba(79, 227, 200, 0.08)',
                      borderColor: 'rgba(79, 227, 200, 0.25)',
                      color: 'var(--color-teal)',
                    }}
                  >
                    {note.quickReviseSummary}
                  </p>
                ) : (
                  <>
                    <ul className="text-xs text-[var(--color-text-secondary)] space-y-2 mt-3 mb-4 list-disc list-inside">
                      {note.keyTakeaways.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="p-3 rounded-xl border text-xs"
                      style={{
                        backgroundColor: 'var(--color-alert-bg)',
                        borderColor: 'rgba(255, 181, 71, 0.3)',
                        color: 'var(--color-alert-bright)',
                      }}
                    >
                      <strong className="block mb-0.5 text-[var(--color-alert)]">
                        Exam Tip:
                      </strong>
                      {note.examAlert}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
