import type { StageTimestamp } from '../../data/syllabus'

interface StageChipsProps {
  stages: StageTimestamp[]
  currentTime: number
  duration: number
  onSeek: (timestamp: number) => void
}

function formatSec(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function StageChips({ stages, currentTime, duration, onSeek }: StageChipsProps) {
  // Determine active stage based on current video time
  const activeIndex = (() => {
    let active = 0
    for (let i = 0; i < stages.length; i++) {
      const nextTime = stages[i + 1] ? stages[i + 1].timestamp : duration
      if (currentTime >= stages[i].timestamp - 0.05 && currentTime < nextTime - 0.05) {
        return i
      }
    }
    return active
  })()

  const currentStage = stages[activeIndex] ?? stages[0]

  return (
    <div
      className="w-full rounded-[12px] border p-4 backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(14, 21, 38, 0.7)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-teal)' }}
            aria-hidden="true"
          />
          <h2
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
          >
            Mitosis Stage Jumps
          </h2>
        </div>
        <span
          className="text-[11px] font-mono"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Click stage to seek
        </span>
      </div>

      {/* Stage Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
        {stages.map((stage, idx) => {
          const isActive = idx === activeIndex

          return (
            <button
              key={stage.label}
              type="button"
              onClick={() => onSeek(stage.timestamp)}
              aria-current={isActive ? 'step' : undefined}
              className="flex flex-col items-center justify-center p-2 rounded-[12px] border text-center transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[44px]"
              style={{
                backgroundColor: isActive ? 'rgba(79, 227, 200, 0.15)' : 'rgba(7, 11, 20, 0.5)',
                borderColor: isActive ? 'var(--color-teal)' : 'var(--color-border)',
                boxShadow: isActive ? '0 0 12px rgba(79, 227, 200, 0.2)' : 'none',
              }}
            >
              <span
                className="text-xs font-semibold leading-tight line-clamp-1"
                style={{
                  color: isActive ? 'var(--color-teal)' : 'var(--color-text-primary)',
                }}
              >
                {stage.label}
              </span>
              <span
                className="text-[10px] font-mono mt-0.5"
                style={{
                  color: isActive ? 'var(--color-teal)' : 'var(--color-text-muted)',
                }}
              >
                {formatSec(stage.timestamp)}
              </span>
            </button>
          )
        })}
      </div>

      {/* One-line explanation for active stage */}
      {currentStage && (
        <div
          className="p-3 rounded-[12px] border flex items-start gap-2.5 transition-all"
          style={{
            backgroundColor: 'rgba(7, 11, 20, 0.65)',
            borderColor: 'rgba(79, 227, 200, 0.25)',
          }}
        >
          <span
            className="text-[11px] font-mono uppercase font-bold shrink-0 px-2 py-0.5 rounded border mt-0.5"
            style={{
              backgroundColor: 'rgba(79, 227, 200, 0.12)',
              borderColor: 'var(--color-teal)',
              color: 'var(--color-teal)',
            }}
          >
            {currentStage.label}
          </span>
          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
          >
            {currentStage.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
