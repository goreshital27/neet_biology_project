import { useState, useEffect } from 'react'

/**
 * Hook to detect prefers-reduced-motion media query.
 * When the user prefers reduced motion, decorative animations stay static.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}

/**
 * Backwards compatibility hook for any component still migrating.
 * Note: Motion is always ON unless prefers-reduced-motion is enabled.
 */
export function useMotionStore<T>(selector: (state: { motionEnabled: boolean }) => T): T {
  const prefersReduced = usePrefersReducedMotion()
  return selector({ motionEnabled: !prefersReduced })
}
