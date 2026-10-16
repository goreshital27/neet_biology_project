import { useState } from 'react'
import { SampleDataBadge } from '../../components/SampleDataBadge'
import { revisionNotes } from '../../data'
import { NeetAlertChip } from '../../components/NeetAlertChip'

interface NotesViewProps {
  showHeader?: boolean
}

export function NotesView({ showHeader = true }: NotesViewProps) {
  const [quickReviseMode, setQuickReviseMode] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      {showHeader && (
        <>
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

          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 text-center"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            NCERT Revision Notes
          </h2>

          <p
            className="max-w-lg mb-6 text-center text-xs sm:text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Concise revision cards formatted for rapid pre-exam recall and key takeaways.
          </p>
        </>
      )}

      {/* 2-Minute Revision Mode Toggle */}
      <div className="mb-6 flex items-center justify-between w-full flex-wrap gap-3 pb-3 border-b border-[var(--color-border)]">
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-wider block"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            Study Mode
          </span>
          <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
            {quickReviseMode ? 'Ultra-concise 2-minute exam summary' : 'Detailed key takeaways and exam alerts'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setQuickReviseMode((prev) => !prev)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[12px] text-xs font-semibold border transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[38px]"
          style={{
            backgroundColor: quickReviseMode ? 'rgba(79, 227, 200, 0.15)' : 'rgba(14, 21, 38, 0.6)',
            borderColor: quickReviseMode ? 'var(--color-teal)' : 'var(--color-border)',
            color: quickReviseMode ? 'var(--color-teal)' : 'var(--color-text-secondary)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: quickReviseMode ? 'var(--color-teal)' : 'var(--color-text-muted)' }}
            aria-hidden="true"
          />
          {quickReviseMode ? '2-Min Mode: Active' : 'Enable 2-Min Mode'}
        </button>
      </div>

      {/* Revision Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {revisionNotes.map((note) => (
          <div
            key={note.id}
            className="rounded-[12px] border p-5 flex flex-col justify-between transition-all backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(14, 21, 38, 0.7)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[var(--color-border)]">
                <h3
                  className="text-sm sm:text-base font-semibold"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  {note.title}
                </h3>
                <NeetAlertChip label="Alert" className="text-[10px] py-0.5 px-2" />
              </div>

              {quickReviseMode ? (
                <div
                  className="p-3 rounded-[12px] border text-xs leading-relaxed my-2"
                  style={{
                    backgroundColor: 'rgba(79, 227, 200, 0.08)',
                    borderColor: 'rgba(79, 227, 200, 0.25)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <p className="font-medium">{note.quickReviseSummary}</p>
                </div>
              ) : (
                <ul className="space-y-2 mb-4 text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {note.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: 'var(--color-teal)' }}
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* High-yield exam alert box */}
            <div
              className="mt-3 p-3 rounded-[12px] border flex items-start gap-2"
              style={{
                backgroundColor: 'var(--color-alert-bg)',
                borderColor: 'var(--color-alert)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-0.5 text-[var(--color-alert)]"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <p
                className="text-[11px] leading-relaxed font-medium"
                style={{ color: 'var(--color-alert)' }}
              >
                {note.examAlert}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
