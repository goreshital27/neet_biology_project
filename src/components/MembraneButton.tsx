import { useState, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'

interface MembraneButtonProps {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  ariaLabel?: string
  title?: string
}

interface Ripple {
  x: number
  y: number
  id: number
}

/**
 * MembraneButton:
 * Features a biological membrane ripple effect on tap/click with
 * elastic compression (satisfies requirement 5: membrane ripple on button press).
 */
export function MembraneButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
  title,
}: MembraneButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = { x, y, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    onClick?.(e)
  }

  const baseStyle: Record<string, string> = {
    primary: 'bg-[var(--color-teal)] text-[var(--color-text-inverse)] shadow-[var(--shadow-glow-cyan)] font-semibold',
    secondary: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
    outline: 'border border-[var(--color-teal)] text-[var(--color-teal)] bg-transparent',
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
      className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-xl transition-colors ${baseStyle[variant]} ${className}`}
      style={{
        minHeight: 'var(--tap-target-min)',
      }}
    >
      {/* Expanding membrane ripple rings */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
            backgroundColor:
              variant === 'primary'
                ? 'rgba(255, 255, 255, 0.45)'
                : 'rgba(79, 227, 200, 0.35)',
            transform: 'scale(2.5)',
            transition: 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease-out',
          }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
