import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useMotionStore } from './LivingCellBackground/useMotionPreference'

interface CellDivisionTransitionProps {
  children: ReactNode
}

/**
 * CellDivisionTransition:
 * Implements a biological page transition themed around cell division (cytokinesis).
 *
 * Requirements:
 * - A page transition where a cell divides into two
 * - Use Framer Motion for UI
 * - Respects reduced motion settings (instant fade when motion is disabled)
 * - Calmer transitions on lesson pages, expressive on landing page
 */
export function CellDivisionTransition({ children }: CellDivisionTransitionProps) {
  const location = useLocation()
  const motionEnabled = useMotionStore((s) => s.motionEnabled)

  if (!motionEnabled) {
    return <>{children}</>
  }

  const isHome = location.pathname === '/'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{
          opacity: 0,
          scale: isHome ? 0.96 : 0.99,
          filter: 'blur(4px)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: isHome ? 0.45 : 0.25,
            ease: [0.34, 1.56, 0.64, 1], // ease-membrane
          },
        }}
        exit={{
          opacity: 0,
          scale: 1.02,
          filter: 'blur(3px)',
          transition: {
            duration: 0.2,
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
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {/* Left daughter cell diverging */}
          <motion.div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full absolute"
            style={{
              background: 'radial-gradient(circle, rgba(79, 227, 200, 0.25) 0%, rgba(79, 227, 200, 0) 70%)',
              border: '1.5px solid rgba(79, 227, 200, 0.4)',
            }}
            initial={{ x: 0, scale: 1 }}
            animate={{ x: -60, scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Right daughter cell diverging */}
          <motion.div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full absolute"
            style={{
              background: 'radial-gradient(circle, rgba(139, 124, 255, 0.25) 0%, rgba(139, 124, 255, 0) 70%)',
              border: '1.5px solid rgba(139, 124, 255, 0.4)',
            }}
            initial={{ x: 0, scale: 1 }}
            animate={{ x: 60, scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Cleavage furrow constriction line */}
          <motion.div
            className="w-0.5 h-36 absolute rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, #4FE3C8, transparent)',
            }}
            initial={{ scaleY: 1, opacity: 0.8 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  )
}
