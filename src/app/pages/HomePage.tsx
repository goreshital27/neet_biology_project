import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageShell } from '../../components/PageShell'
import { syllabusUnits, type SyllabusUnit, type SyllabusChapter } from '../../data'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const classParam = searchParams.get('class')
  const initialClass = classParam === '12' ? 12 : 11

  const [selectedClass, setSelectedClass] = useState<11 | 12 | 'all'>(initialClass)
  const [searchQuery, setSearchQuery] = useState('')

  // Handle class toggle changes and sync search params
  const handleClassChange = (newClass: 11 | 12 | 'all') => {
    setSelectedClass(newClass)
    if (newClass === 'all') {
      searchParams.delete('class')
      setSearchParams(searchParams, { replace: true })
    } else {
      setSearchParams({ class: String(newClass) }, { replace: true })
    }
  }

  // Filter units and chapters by selected class and search query
  const filteredUnits = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return syllabusUnits
      .filter((unit) => {
        if (selectedClass === 'all') return true
        return unit.classLevel === selectedClass
      })
      .map((unit) => {
        const matchingChapters = unit.chapters.filter((ch) => {
          if (!q) return true
          return (
            ch.title.toLowerCase().includes(q) ||
            ch.unit.toLowerCase().includes(q) ||
            (ch.description && ch.description.toLowerCase().includes(q))
          )
        })

        return {
          ...unit,
          chapters: matchingChapters,
        }
      })
      .filter((unit) => unit.chapters.length > 0)
  }, [selectedClass, searchQuery])

  // Count total chapters displayed
  const totalChaptersCount = useMemo(() => {
    return filteredUnits.reduce((acc, u) => acc + u.chapters.length, 0)
  }, [filteredUnits])

  return (
    <PageShell>
      <div className="flex flex-col px-3 sm:px-6 py-10 sm:py-16 max-w-7xl mx-auto w-full">
        {/* ── 1. Hero Section ── */}
        <section className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--text)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            Master NEET Biology, concept by concept
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}
          >
            Animated lessons, NCERT notes and PYQ practice for the full syllabus
          </p>
        </section>

        {/* ── 2. Controls Bar: Class Toggle & Search Box ── */}
        <section id="syllabus" className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Class 11 / Class 12 Toggle */}
          <div
            className="flex items-center p-1 rounded-[12px] border backdrop-blur-md self-start sm:self-auto"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
            role="tablist"
            aria-label="Filter syllabus by class"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedClass === 11}
              onClick={() => handleClassChange(11)}
              className="px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[38px]"
              style={{
                backgroundColor: selectedClass === 11 ? 'var(--accent)' : 'transparent',
                color: selectedClass === 11 ? 'var(--on-accent)' : 'var(--text-2)',
              }}
            >
              Class 11
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedClass === 12}
              onClick={() => handleClassChange(12)}
              className="px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[38px]"
              style={{
                backgroundColor: selectedClass === 12 ? 'var(--accent)' : 'transparent',
                color: selectedClass === 12 ? 'var(--on-accent)' : 'var(--text-2)',
              }}
            >
              Class 12
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedClass === 'all'}
              onClick={() => handleClassChange('all')}
              className="px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[38px]"
              style={{
                backgroundColor: selectedClass === 'all' ? 'var(--accent)' : 'transparent',
                color: selectedClass === 'all' ? 'var(--on-accent)' : 'var(--text-2)',
              }}
            >
              All
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters (e.g. Cell Cycle, Genetics, Photosynthesis)..."
              aria-label="Search NEET Biology chapters"
              className="w-full pl-10 pr-9 py-2 rounded-[12px] text-xs sm:text-sm border transition-all placeholder-[var(--text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[44px]"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </section>

        {/* Search Results Summary */}
        {searchQuery && (
          <div className="mb-4 text-xs font-mono text-[var(--text-2)]">
            Showing {totalChaptersCount} matching chapter{totalChaptersCount === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
          </div>
        )}

        {/* ── 3. Grid of Unit Cards ── */}
        {filteredUnits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {filteredUnits.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-[12px] border p-12 text-center flex flex-col items-center justify-center backdrop-blur-sm"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <p className="text-base font-semibold text-[var(--text)] mb-1">
              No chapters found
            </p>
            <p className="text-xs text-[var(--text-2)] mb-4">
              No syllabus chapters matched your search query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedClass('all')
              }}
              className="text-xs font-semibold px-4 py-2 rounded-[12px] bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </PageShell>
  )
}

function UnitCard({ unit }: { unit: SyllabusUnit }) {
  const liveCount = unit.chapters.filter((c) => c.status === 'live').length

  return (
    <div
      className="rounded-[12px] border p-5 backdrop-blur-sm flex flex-col justify-between transition-all"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Unit Card Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border)]">
        <div>
          <span
            className="text-[11px] font-mono font-semibold uppercase tracking-wider block mb-0.5"
            style={{ color: 'var(--accent)' }}
          >
            Class {unit.classLevel} Unit
          </span>
          <h2
            className="text-base sm:text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            {unit.title}
          </h2>
        </div>

        <span
          className="text-xs font-mono px-2.5 py-1 rounded-[12px] border"
          style={{
            backgroundColor: 'var(--surface-2)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          {unit.chapters.length} {unit.chapters.length === 1 ? 'Chapter' : 'Chapters'}
          {liveCount > 0 && ` • ${liveCount} Live`}
        </span>
      </div>

      {/* Chapters Rows */}
      <div className="space-y-2">
        {unit.chapters.map((chapter) => (
          <ChapterRow key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  )
}

function ChapterRow({ chapter }: { chapter: SyllabusChapter }) {
  const isLive = chapter.status === 'live'

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

  return (
    <Link
      to={`/chapter/${chapter.slug}`}
      className="group flex items-center justify-between p-3 rounded-[12px] border text-left transition-all duration-150 hover:border-[var(--accent)] hover:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[44px]"
      style={{
        backgroundColor: isLive ? 'color-mix(in srgb, var(--accent) 8%, var(--surface-2))' : 'var(--surface-2)',
        borderColor: isLive ? 'color-mix(in srgb, var(--accent) 40%, var(--border))' : 'var(--border)',
      }}
    >
      {/* Chapter Title */}
      <div className="flex-1 min-w-0 pr-3">
        <h3
          className="text-xs sm:text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {chapter.title}
        </h3>
      </div>

      {/* Tags: Weightage + Status */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Weightage Tag (Readable in both themes) */}
        <span
          className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full border font-semibold"
          style={{
            backgroundColor: weightageStyles.bg,
            borderColor: weightageStyles.border,
            color: weightageStyles.text,
          }}
        >
          {chapter.weightage}
        </span>

        {/* Live vs Soon Tag (Readable in both themes) */}
        {isLive ? (
          <span
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold"
            style={{
              backgroundColor: 'var(--tag-live-bg)',
              borderColor: 'var(--tag-live-border)',
              color: 'var(--tag-live-text)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--tag-live-text)] animate-pulse" aria-hidden="true" />
            Live
          </span>
        ) : (
          <span
            className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: 'var(--tag-soon-bg)',
              borderColor: 'var(--tag-soon-border)',
              color: 'var(--tag-soon-text)',
            }}
          >
            Soon
          </span>
        )}

        {/* Arrow chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </Link>
  )
}
