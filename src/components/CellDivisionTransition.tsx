import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from './LivingCellBackground/useMotionPreference'

interface CellDivisionTransitionProps {
  children: ReactNode
}

/**
 * CellDivisionTransition:
 * Biological cytokinesis page transition on route change.
 * Wrapped in prefers-reduced-motion check for accessible static visuals.
 */
export function CellDivisionTransition({ children }: CellDivisionTransitionProps) {
  const location = useLocation()
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return <>{children}</>
  }

  const isHome = location.pathname === '/'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{
          opacity: 0,
          scale: isHome ? 0.98 : 0.99,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: isHome ? 0.35 : 0.2,
            ease: [0.34, 1.56, 0.64, 1], // ease-membrane
          },
        }}
        exit={{
          opacity: 0,
          scale: 1.01,
          transition: {
            duration: 0.15,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
        className="w-full relative"
      >
        {/* Cell division cleavage furrow animation flash on page entrance */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* Left daughter cell diverging */}
          <motion.div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full absolute"
            style={{
              background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent) 0%, transparent 70%)',
              border: '1.5px solid color-mix(in srgb, var(--accent) 40%, transparent)',
            }}
            initial={{ x: 0, scale: 1 }}
            animate={{ x: -50, scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Right daughter cell diverging */}
          <motion.div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full absolute"
            style={{
              background: 'radial-gradient(circle, rgba(139, 124, 255, 0.25) 0%, transparent 70%)',
              border: '1.5px solid rgba(139, 124, 255, 0.4)',
            }}
            initial={{ x: 0, scale: 1 }}
            animate={{ x: 50, scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Cleavage furrow constriction line */}
          <motion.div
            className="w-0.5 h-32 absolute rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
            }}
            initial={{ scaleY: 1, opacity: 0.8 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  )
}
