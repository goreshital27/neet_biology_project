import { create } from 'zustand'

interface MotionState {
  motionEnabled: boolean
  toggleMotion: () => void
  setMotionEnabled: (enabled: boolean) => void
}

function getInitialMotionPreference(): boolean {
  if (typeof window === 'undefined') return true

  // 1. Check user preference stored in localStorage
  try {
    const stored = localStorage.getItem('nbs-motion')
    if (stored !== null) {
      return stored === 'true'
    }
  } catch {
    // localStorage may be inaccessible
  }

  // 2. Check system prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  return true
}

export const useMotionStore = create<MotionState>((set) => ({
  motionEnabled: getInitialMotionPreference(),
  toggleMotion: () =>
    set((state) => {
      const next = !state.motionEnabled
      try {
        localStorage.setItem('nbs-motion', String(next))
      } catch {
        // localStorage may be unavailable
      }
      return { motionEnabled: next }
    }),
  setMotionEnabled: (enabled: boolean) => {
    try {
      localStorage.setItem('nbs-motion', String(enabled))
    } catch {
      // localStorage may be unavailable
    }
    set({ motionEnabled: enabled })
  },
}))

