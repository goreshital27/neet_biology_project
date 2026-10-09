import type { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  /** Optional max-width constraint. Defaults to content-max-w token. */
  className?: string
}

/**
 * Consistent page wrapper.
 * Centers content, sets max-width, provides vertical spacing.
 */
export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div
      className={`mx-auto w-full ${className}`}
      style={{ maxWidth: 'var(--content-max-w)' }}
    >
      {children}
    </div>
  )
}

