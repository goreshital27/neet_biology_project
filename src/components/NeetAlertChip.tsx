import { motion } from 'framer-motion'

interface NeetAlertChipProps {
  label?: string
  testedCount?: string
  className?: string
}

/**
 * NEET Alert chip component.
 *
 * SPEC RULE: Warm Amber #FFB547 is strictly reserved ONLY for NEET Alert elements.
 * Features a bioluminescent pulsing glow to draw attention to high-yield exam points.
 */
export function NeetAlertChip({
  label = 'NEET Alert',
  testedCount,
  className = '',
}: NeetAlertChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${className}`}
      style={{
        backgroundColor: 'var(--color-alert-bg)',
        borderColor: 'rgba(255, 181, 71, 0.4)',
        color: 'var(--color-alert)',
        fontFamily: 'var(--font-mono)',
        boxShadow: 'var(--shadow-glow-alert)',
      }}
    >
      {/* Bioluminescent pulsing flame / dot */}
      <span className="relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: 'var(--color-alert)' }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: 'var(--color-alert-bright)' }}
        />
      </span>

      <span>{label}</span>

      {testedCount && (
        <span
          className="px-1.5 py-0.5 rounded text-[10px] font-medium"
          style={{
            backgroundColor: 'rgba(255, 181, 71, 0.2)',
            color: 'var(--color-alert-bright)',
          }}
        >
          {testedCount}
        </span>
      )}
    </motion.div>
  )
}
