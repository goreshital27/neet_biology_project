import { useMotionStore } from './LivingCellBackground/useMotionPreference'

/**
 * Accessible Motion toggle button.
 * Requirements:
 * - Visible in header
 * - aria-pressed attribute
 * - min 44px tall (meets WCAG & mobile tap target)
 * - toggles living cell canvas drift animation
 * - saved in localStorage inside try/catch
 */
export function MotionToggle() {
  const motionEnabled = useMotionStore((s) => s.motionEnabled)
  const toggleMotion = useMotionStore((s) => s.toggleMotion)

  return (
    <button
      onClick={toggleMotion}
      aria-pressed={motionEnabled}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors"
      style={{
        minHeight: 'var(--tap-target-min)',
        borderColor: motionEnabled ? 'var(--color-border)' : 'var(--color-border-hover)',
        backgroundColor: motionEnabled
          ? 'rgba(79, 227, 200, 0.08)'
          : 'var(--color-bg-secondary)',
        color: motionEnabled ? 'var(--color-teal)' : 'var(--color-text-secondary)',
      }}
      aria-label={`Toggle background motion: currently ${motionEnabled ? 'enabled' : 'disabled'}`}
      title={`Background Motion: ${motionEnabled ? 'Enabled' : 'Disabled (Reduced motion active)'}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        {motionEnabled ? (
          // Active waves / flow icon
          <path d="M2 12c2.5-4 5.5-4 8 0s5.5 4 8 0 3-4 4-2" />
        ) : (
          // Paused / stopped icon
          <>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </>
        )}
      </svg>
      <span className="hidden sm:inline">Motion:</span>
      <span className="font-semibold uppercase text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>
        {motionEnabled ? 'On' : 'Off'}
      </span>
    </button>
  )
}
