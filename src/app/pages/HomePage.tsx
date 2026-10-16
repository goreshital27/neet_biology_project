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
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            Master NEET Biology, concept by concept
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
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
              backgroundColor: 'rgba(14, 21, 38, 0.75)',
              borderColor: 'var(--color-border)',
            }}
            role="tablist"
            aria-label="Filter syllabus by class"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedClass === 11}
              onClick={() => handleClassChange(11)}
              className="px-3.5 sm:px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[38px]"
              style={{
                backgroundColor: selectedClass === 11 ? 'var(--color-teal)' : 'transparent',
                color: selectedClass === 11 ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                boxShadow: selectedClass === 11 ? '0 0 12px rgba(79, 227, 200, 0.25)' : 'none',
              }}
            >
              Class 11
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedClass === 12}
              onClick={() => handleClassChange(12)}
              className="px-3.5 sm:px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[38px]"
              style={{
                backgroundColor: selectedClass === 12 ? 'var(--color-teal)' : 'transparent',
                color: selectedClass === 12 ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                boxShadow: selectedClass === 12 ? '0 0 12px rgba(79, 227, 200, 0.25)' : 'none',
              }}
            >
              Class 12
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={selectedClass === 'all'}
              onClick={() => handleClassChange('all')}
              className="px-3.5 sm:px-4 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[38px]"
              style={{
                backgroundColor: selectedClass === 'all' ? 'var(--color-teal)' : 'transparent',
                color: selectedClass === 'all' ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                boxShadow: selectedClass === 'all' ? '0 0 12px rgba(79, 227, 200, 0.25)' : 'none',
              }}
            >
              All
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
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
              className="w-full pl-10 pr-9 py-2 rounded-[12px] text-xs sm:text-sm border transition-all placeholder-[var(--color-text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[44px]"
              style={{
                backgroundColor: 'rgba(14, 21, 38, 0.75)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
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
          <div className="mb-4 text-xs font-mono text-[var(--color-text-secondary)]">
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
              backgroundColor: 'rgba(14, 21, 38, 0.7)',
              borderColor: 'var(--color-border)',
            }}
          >
            <p className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
              No chapters found
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mb-4">
              No syllabus chapters matched your search query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedClass('all')
              }}
              className="text-xs font-semibold px-4 py-2 rounded-[12px] bg-[var(--color-teal)] text-[var(--color-bg-primary)] hover:opacity-90 transition-opacity"
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
        backgroundColor: 'rgba(14, 21, 38, 0.75)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Unit Card Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-border)]">
        <div>
          <span
            className="text-[10px] font-mono font-semibold uppercase tracking-wider block"
            style={{ color: 'var(--color-teal)' }}
          >
            Class {unit.classLevel} Unit
          </span>
          <h2
            className="text-base sm:text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {unit.title}
          </h2>
        </div>

        <span
          className="text-xs font-mono px-2.5 py-1 rounded-[12px] border"
          style={{
            backgroundColor: 'rgba(7, 11, 20, 0.6)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-muted)',
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

  const weightageBadge = {
    High: {
      bg: 'rgba(255, 181, 71, 0.12)',
      border: 'rgba(255, 181, 71, 0.35)',
      text: 'var(--color-alert)',
    },
    Medium: {
      bg: 'rgba(90, 169, 255, 0.12)',
      border: 'rgba(90, 169, 255, 0.35)',
      text: 'var(--color-blue)',
    },
    Low: {
      bg: 'rgba(114, 131, 155, 0.12)',
      border: 'rgba(114, 131, 155, 0.35)',
      text: 'var(--color-text-secondary)',
    },
  }[chapter.weightage]

  return (
    <Link
      to={`/chapter/${chapter.slug}`}
      className="group flex items-center justify-between p-3 rounded-[12px] border text-left transition-all duration-150 hover:border-[var(--color-border-hover)] hover:bg-[rgba(14,21,38,0.9)] focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[44px]"
      style={{
        backgroundColor: isLive ? 'rgba(79, 227, 200, 0.04)' : 'rgba(7, 11, 20, 0.55)',
        borderColor: isLive ? 'rgba(79, 227, 200, 0.3)' : 'var(--color-border)',
      }}
    >
      {/* Chapter Title */}
      <div className="flex-1 min-w-0 pr-3">
        <h3
          className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-teal)] transition-colors truncate"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {chapter.title}
        </h3>
      </div>

      {/* Tags: Weightage + Status */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Weightage Tag */}
        <span
          className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full border font-semibold"
          style={{
            backgroundColor: weightageBadge.bg,
            borderColor: weightageBadge.border,
            color: weightageBadge.text,
          }}
        >
          {chapter.weightage}
        </span>

        {/* Live vs Soon Tag */}
        {isLive ? (
          <span
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold"
            style={{
              backgroundColor: 'rgba(79, 227, 200, 0.15)',
              borderColor: 'var(--color-teal)',
              color: 'var(--color-teal)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal)] animate-pulse" aria-hidden="true" />
            Live
          </span>
        ) : (
          <span
            className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: 'rgba(14, 21, 38, 0.6)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
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
          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-teal)] group-hover:translate-x-0.5 transition-all"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </Link>
  )
}
