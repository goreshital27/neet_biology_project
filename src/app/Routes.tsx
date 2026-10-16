import { Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './Layout'
import { HomePage } from './pages/HomePage'
import { ChapterPage } from './pages/ChapterPage'
import { InsightsPage } from './pages/InsightsPage'
import { QuizPage } from './pages/QuizPage'
import { NotesPage } from './pages/NotesPage'
import { NotFoundPage } from './pages/NotFoundPage'

/**
 * Application route definitions.
 * Each route renders inside <RootLayout>.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="syllabus" element={<HomePage />} />
        <Route path="chapter/:slug" element={<ChapterPage />} />
        <Route path="lesson" element={<Navigate to="/chapter/cell-cycle-and-cell-division" replace />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
