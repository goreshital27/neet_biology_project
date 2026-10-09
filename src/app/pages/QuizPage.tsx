import { useState } from 'react'
import { PageShell } from '../../components/PageShell'
import { SampleDataBadge } from '../../components/SampleDataBadge'
import { quizQuestions } from '../../data'
import { MembraneButton } from '../../components/MembraneButton'

export function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const score = quizQuestions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0)
  }, 0)

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center px-4 py-16 max-w-3xl mx-auto">
        <div className="p-3 rounded-2xl border mb-4 text-[var(--color-teal)] bg-[rgba(79,227,200,0.1)] border-[rgba(79,227,200,0.25)]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-mono)' }}
          >
            End-of-Topic Checkpoint
          </p>
          <SampleDataBadge />
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold mb-4 text-center"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Cell Cycle &amp; Mitosis Quiz
        </h1>

        <p className="max-w-lg mb-8 text-center text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
          Test your conceptual understanding of stages and chromosome counting.
        </p>

        {/* Questions list */}
        <div className="space-y-6 w-full mb-8">
          {quizQuestions.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id]
            const isCorrect = chosen === q.correctIndex

            return (
              <div
                key={q.id}
                className="rounded-2xl border p-5 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(14, 21, 38, 0.7)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[var(--color-teal)] font-semibold">
                    Question {qIndex + 1} of {quizQuestions.length}
                  </span>
                  <SampleDataBadge size="sm" />
                </div>

                <p className="text-base font-medium text-[var(--color-text-primary)] mb-4">
                  {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = chosen === optIndex

                    let optionBorder = 'var(--color-border)'
                    let optionBg = 'rgba(7, 11, 20, 0.5)'

                    if (showResults) {
                      if (optIndex === q.correctIndex) {
                        optionBorder = 'var(--color-teal)'
                        optionBg = 'rgba(79, 227, 200, 0.12)'
                      } else if (isSelected && !isCorrect) {
                        optionBorder = 'var(--color-rose)'
                        optionBg = 'rgba(255, 122, 156, 0.12)'
                      }
                    } else if (isSelected) {
                      optionBorder = 'var(--color-teal)'
                      optionBg = 'rgba(79, 227, 200, 0.08)'
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() => handleSelect(q.id, optIndex)}
                        className="w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center justify-between"
                        style={{
                          borderColor: optionBorder,
                          backgroundColor: optionBg,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[var(--color-teal)] shrink-0 ml-2" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {showResults && (
                  <div
                    className="mt-3.5 p-3 rounded-xl border text-xs leading-relaxed"
                    style={{
                      backgroundColor: 'rgba(7, 11, 20, 0.8)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <span className="font-semibold text-[var(--color-text-primary)] block mb-1">
                      Explanation:
                    </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Action button */}
        <div className="flex flex-col items-center gap-3">
          <MembraneButton
            variant="primary"
            onClick={() => setShowResults((prev) => !prev)}
            className="text-sm font-semibold"
          >
            {showResults ? 'Hide Explanations' : 'Submit & Check Answers'}
          </MembraneButton>

          {showResults && (
            <p className="text-sm font-mono text-[var(--color-teal)]">
              Your Score: {score} / {quizQuestions.length} correct
            </p>
          )}
        </div>
      </div>
    </PageShell>
  )
}
