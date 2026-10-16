import type { VideoChapter } from '../../data/types'

interface ChapterListProps {
  chapters: VideoChapter[]
  currentTime: number
  duration: number
  onSeek: (startSec: number) => void
}

function formatSec(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  const sStr = s % 1 === 0 ? s.toString().padStart(2, '0') : s.toFixed(1).padStart(4, '0')
  return `${m}:${sStr}`
}

export function ChapterList({ chapters, currentTime, duration, onSeek }: ChapterListProps) {
  return (
    <div
      className="w-full rounded-2xl border p-4 backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(14, 21, 38, 0.7)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-teal)]"
            aria-hidden="true"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <h2
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
          >
            Mitosis Chapters ({chapters.length})
          </h2>
        </div>
        <span
          className="text-[11px]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          Click to jump
        </span>
      </div>

      {/* Chapters Grid / Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {chapters.map((ch, idx) => {
          const nextStart = chapters[idx + 1] ? chapters[idx + 1].startSec : duration
          const isActive = currentTime >= ch.startSec && currentTime < nextStart

          return (
            <button
              key={`${ch.label}-${ch.startSec}`}
              type="button"
              onClick={() => onSeek(ch.startSec)}
              aria-current={isActive ? 'step' : undefined}
              className="group flex flex-col items-start p-2 rounded-xl border text-left transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[44px] justify-center"
              style={{
                backgroundColor: isActive
                  ? 'rgba(79, 227, 200, 0.12)'
                  : 'rgba(7, 11, 20, 0.5)',
                borderColor: isActive ? 'var(--color-teal)' : 'var(--color-border)',
                boxShadow: isActive ? '0 0 12px rgba(79, 227, 200, 0.15)' : 'none',
              }}
            >
              <span
                className="text-[10px] font-mono leading-none mb-1 font-semibold"
                style={{
                  color: isActive ? 'var(--color-teal)' : 'var(--color-text-muted)',
                }}
              >
                {formatSec(ch.startSec)}
              </span>
              <span
                className="text-xs font-medium line-clamp-1 group-hover:text-[var(--color-teal)] transition-colors"
                style={{
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                }}
              >
                {ch.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
