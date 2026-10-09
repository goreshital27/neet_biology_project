interface SampleDataBadgeProps {
  className?: string
  /** Size variant */
  size?: 'sm' | 'md'
}

/**
 * Visual badge indicating mock / curated sample content.
 * Requirement: spec §5 & user prompt:
 * "Never invent PYQs. Until real, verified questions are entered,
 * use clearly labelled sample items (isSample: true) and show a 'Sample data' badge"
 */
export function SampleDataBadge({ className = '', size = 'sm' }: SampleDataBadgeProps) {
  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px]'
      : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border tracking-wide uppercase ${sizeClasses} ${className}`}
      style={{
        backgroundColor: 'rgba(90, 169, 255, 0.12)',
        borderColor: 'rgba(90, 169, 255, 0.35)',
        color: 'var(--color-blue)',
        fontFamily: 'var(--font-mono)',
      }}
      title="Sample practice item for prototype preview (not a real past-year question)"
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: 'var(--color-blue)' }}
        aria-hidden="true"
      />
      Sample Data
    </span>
  )
}
