import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PageShell } from '../../components/PageShell'
import { getChapterBySlug } from '../../data'
import { MitosisVideoLesson } from '../../features/lesson/MitosisVideoLesson'
import { NotesView } from '../../features/notes/NotesView'
import { QuizView } from '../../features/quiz/QuizView'
import { InsightsView } from '../../features/insights/InsightsView'
import { MembraneButton } from '../../components/MembraneButton'

type ChapterTab = 'animation' | 'notes' | 'quiz' | 'insights'

export function ChapterPage() {
  const { slug } = useParams<{ slug: string }>()
  const chapter = getChapterBySlug(slug || 'cell-cycle-and-cell-division')
  const [activeTab, setActiveTab] = useState<ChapterTab>('animation')

  // Handle nonexistent chapter slug
  if (!chapter) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center text-center px-4 py-20 max-w-xl mx-auto">
          <div
            className="w-14 h-14 rounded-[12px] border flex items-center justify-center mb-4"
            style={{
              backgroundColor: 'var(--tag-high-bg)',
              borderColor: 'var(--tag-high-border)',
              color: 'var(--tag-high-text)',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            Chapter Not Found
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
            The chapter &ldquo;{slug}&rdquo; does not exist in the NEET Biology syllabus.
          </p>
          <Link to="/">
            <MembraneButton variant="primary">← Back to syllabus</MembraneButton>
          </Link>
        </div>
      </PageShell>
    )
  }

  // Weightage tag visual style using theme CSS variables
  const weightageStyles = {
    High: {
      bg: 'var(--tag-high-bg)',
      border: 'var(--tag-high-border)',
      text: 'var(--tag-high-text)',
    },
    Medium: {
      bg: 'var(--tag-med-bg)',
      border: 'var(--tag-med-border)',
      text: 'var(--tag-med-text)',
    },
    Low: {
      bg: 'var(--tag-low-bg)',
      border: 'var(--tag-low-border)',
      text: 'var(--tag-low-text)',
    },
  }[chapter.weightage]

  // ──────────────── COMING SOON VIEW ────────────────
  if (chapter.status === 'coming-soon') {
    return (
      <PageShell>
        <div className="flex flex-col px-3 sm:px-6 py-8 max-w-5xl mx-auto w-full">
          {/* Breadcrumb: Single line on desktop/tablet, wraps only on small screens */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-row items-center flex-wrap gap-2 text-xs sm:text-sm mb-6 text-[var(--text-muted)] font-medium"
          >
            <Link to="/" className="hover:text-[var(--accent)] transition-colors shrink-0">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <Link to={`/?class=${chapter.classLevel}`} className="hover:text-[var(--accent)] transition-colors shrink-0">
              Class {chapter.classLevel}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-[var(--text-2)] shrink-0">
              {chapter.unit}
            </span>
            <span className="opacity-50">/</span>
            <span className="text-[var(--accent)] font-semibold">
              {chapter.title}
            </span>
          </nav>

          {/* Header: Title, Weightage tag, Class tag */}
          <div className="flex flex-col items-start mb-8 pb-6 border-b border-[var(--border)]">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono"
                style={{
                  backgroundColor: 'var(--tag-class-bg)',
                  borderColor: 'var(--tag-class-border)',
                  color: 'var(--tag-class-text)',
                }}
              >
                Class {chapter.classLevel}
              </span>

              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono"
                style={{
                  backgroundColor: weightageStyles.bg,
                  borderColor: weightageStyles.border,
                  color: weightageStyles.text,
                }}
              >
                {chapter.weightage} Weightage
              </span>

              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono"
                style={{
                  backgroundColor: 'var(--tag-soon-bg)',
                  borderColor: 'var(--tag-soon-border)',
                  color: 'var(--tag-soon-text)',
                }}
              >
                Coming Soon
              </span>
            </div>

            <h1
              className="text-2xl sm:text-4xl font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
            >
              {chapter.title}
            </h1>
            <p className="text-xs sm:text-sm max-w-2xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
              {chapter.description}
            </p>
          </div>

          {/* Coming Soon Card with Back to Syllabus CTA */}
          <div
            className="rounded-[16px] border p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto w-full backdrop-blur-sm"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <div
              className="w-14 h-14 rounded-[12px] border flex items-center justify-center mb-4"
              style={{
                backgroundColor: 'var(--tag-live-bg)',
                borderColor: 'var(--tag-live-border)',
                color: 'var(--tag-live-text)',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>

            <h2
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
            >
              Coming Soon
            </h2>

            <p className="text-xs sm:text-sm max-w-md leading-relaxed mb-8" style={{ color: 'var(--text-2)' }}>
              Interactive 3D animations, NCERT notes, end-of-topic quiz questions, and 5-year NEET past-question frequency
              analytics for <strong className="text-[var(--text)]">{chapter.title}</strong> are currently being authored according to the official NTA syllabus.
            </p>

            <Link to="/">
              <MembraneButton variant="primary" className="text-sm">
                ← Back to syllabus
              </MembraneButton>
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  // ──────────────── LIVE CHAPTER VIEW ────────────────
  return (
    <PageShell>
      <div className="flex flex-col px-3 sm:px-6 py-6 max-w-7xl mx-auto w-full">
        {/* Breadcrumb: Flex row staying on one line, wraps only on small screens */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-row items-center flex-wrap gap-2 text-xs sm:text-sm mb-4 text-[var(--text-muted)] font-medium"
        >
          <Link to="/" className="hover:text-[var(--accent)] transition-colors shrink-0">
            Home
          </Link>
          <span className="opacity-50">/</span>
          <Link to={`/?class=${chapter.classLevel}`} className="hover:text-[var(--accent)] transition-colors shrink-0">
            Class {chapter.classLevel}
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-[var(--text-2)] shrink-0">
            {chapter.unit}
          </span>
          <span className="opacity-50">/</span>
          <span className="text-[var(--accent)] font-semibold">
            {chapter.title}
          </span>
        </nav>

        {/* Header: Chapter title, weightage tag, class tag */}
        <div className="flex flex-col items-start mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono"
              style={{
                backgroundColor: 'var(--tag-class-bg)',
                borderColor: 'var(--tag-class-border)',
                color: 'var(--tag-class-text)',
              }}
            >
              Class {chapter.classLevel}
            </span>

            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono"
              style={{
                backgroundColor: weightageStyles.bg,
                borderColor: weightageStyles.border,
                color: weightageStyles.text,
              }}
            >
              {chapter.weightage} Weightage
            </span>

            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono"
              style={{
                backgroundColor: 'var(--tag-live-bg)',
                borderColor: 'var(--tag-live-border)',
                color: 'var(--tag-live-text)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--tag-live-text)] animate-pulse" aria-hidden="true" />
              Live Interactive Lesson
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            {chapter.title}
          </h1>

          <p className="text-xs sm:text-sm max-w-2xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
            {chapter.description}
          </p>
        </div>

        {/* Tabs: Animation | Notes | Quiz | PYQ insights */}
        <div className="w-full mb-6">
          <div
            className="flex items-center gap-1 p-1 rounded-[12px] border backdrop-blur-md overflow-x-auto scrollbar-none w-full sm:w-auto sm:inline-flex"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
            role="tablist"
            aria-label="Chapter sections"
          >
            {[
              { id: 'animation', label: 'Animation' },
              { id: 'notes', label: 'Notes' },
              { id: 'quiz', label: 'Quiz' },
              { id: 'insights', label: 'PYQ insights' },
            ].map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id as ChapterTab)}
                  className="px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none shrink-0"
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? 'var(--on-accent)' : 'var(--text-2)',
                    boxShadow: isActive ? '0 0 12px color-mix(in srgb, var(--accent) 30%, transparent)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="w-full">
          {activeTab === 'animation' && (
            <div className="w-full animate-fadeIn">
              <MitosisVideoLesson
                posterUrl={chapter.posterUrl}
                stageChips={chapter.stageTimestamps}
              />
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="w-full animate-fadeIn py-2">
              <NotesView showHeader={false} />
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="w-full animate-fadeIn py-2">
              <QuizView showHeader={false} />
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="w-full animate-fadeIn py-2">
              <InsightsView showHeader={false} />
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}
