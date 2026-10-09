import { BrowserRouter } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Wraps the app with all context providers.
 * Add Zustand providers, theme context, etc. here in later slices.
 */
export function Providers({ children }: ProvidersProps) {
  return <BrowserRouter>{children}</BrowserRouter>
}
