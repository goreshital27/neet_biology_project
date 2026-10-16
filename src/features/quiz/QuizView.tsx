import { useState } from 'react'
import { quizQuestions } from '../../data'
import { MembraneButton } from '../../components/MembraneButton'

interface QuizViewProps {
  showHeader?: boolean
}

export function QuizView({ showHeader = true }: QuizViewProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const score = quizQuestions.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0)
  }, 0)

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
      {showHeader && (
        <>
          <div className="p-3 rounded-2xl border mb-4 text-[var(--accent)] bg-[var(--tag-live-bg)] border-[var(--tag-live-border)]">
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
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              End-of-Topic Checkpoint
            </p>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-bold mb-3 text-center"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
          >
            Cell Cycle &amp; Mitosis MCQ Quiz
          </h2>

          <p
            className="max-w-lg mb-8 text-center text-xs sm:text-sm"
            style={{ color: 'var(--text-2)' }}
          >
            Test your conceptual understanding of mitotic phases, ploidy count, and organelles.
          </p>
        </>
      )}

      {/* Questions list */}
      <div className="space-y-5 w-full">
        {quizQuestions.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id]
          const isAnswered = userChoice !== undefined
          const isCorrect = userChoice === q.correctIndex

          return (
            <div
              key={q.id}
              className="rounded-[12px] border p-5 backdrop-blur-sm transition-colors"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full border font-mono"
                  style={{
                    backgroundColor: 'var(--tag-live-bg)',
                    borderColor: 'var(--tag-live-border)',
                    color: 'var(--tag-live-text)',
                  }}
                >
                  Question {qIndex + 1} of {quizQuestions.length}
                </span>

                {showResults && isAnswered && (
                  <span
                    className="text-xs font-semibold font-mono"
                    style={{
                      color: isCorrect ? 'var(--tag-live-text)' : 'var(--tag-high-text)',
                    }}
                  >
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                )}
              </div>

              <h3
                className="text-sm sm:text-base font-semibold mb-4 leading-relaxed"
                style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}
              >
                {q.question}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isSelected = userChoice === optIndex
                  const isOptionCorrect = optIndex === q.correctIndex

                  let btnBg = 'var(--surface-2)'
                  let btnBorder = 'var(--border)'
                  let btnText = 'var(--text)'

                  if (showResults) {
                    if (isOptionCorrect) {
                      btnBg = 'var(--tag-live-bg)'
                      btnBorder = 'var(--tag-live-border)'
                      btnText = 'var(--tag-live-text)'
                    } else if (isSelected && !isOptionCorrect) {
                      btnBg = 'var(--tag-high-bg)'
                      btnBorder = 'var(--tag-high-border)'
                      btnText = 'var(--tag-high-text)'
                    }
                  } else if (isSelected) {
                    btnBg = 'var(--tag-live-bg)'
                    btnBorder = 'var(--accent)'
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() => !showResults && handleSelect(q.id, optIndex)}
                      disabled={showResults}
                      className="w-full text-left p-3 rounded-[12px] border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[44px]"
                      style={{
                        backgroundColor: btnBg,
                        borderColor: btnBorder,
                        color: btnText,
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-md border flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5"
                        style={{
                          borderColor: isSelected || (showResults && isOptionCorrect) ? 'var(--accent)' : 'var(--border)',
                          backgroundColor: isSelected || (showResults && isOptionCorrect) ? 'var(--tag-live-bg)' : 'var(--surface)',
                          color: showResults && isOptionCorrect ? 'var(--tag-live-text)' : 'var(--text)',
                        }}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  )
                })}
              </div>

              {showResults && (
                <div
                  className="mt-4 p-3 rounded-[12px] border text-xs leading-relaxed"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-2)',
                  }}
                >
                  <strong className="text-[var(--accent)] block mb-1 font-mono uppercase text-[11px]">
                    Explanation
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit / Reset Actions */}
      <div className="mt-8 flex flex-col items-center gap-4 w-full">
        {showResults ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <div
              className="p-4 rounded-[12px] border w-full text-center"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <p
                className="text-lg font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: score >= 4 ? 'var(--tag-live-text)' : 'var(--tag-high-text)',
                }}
              >
                Your Score: {score} / {quizQuestions.length} correct
              </p>
              <p className="text-xs text-[var(--text-2)] mt-1">
                {score >= 4
                  ? 'Excellent mastery of cell cycle concepts!'
                  : 'Review the high-yield revision cards and try again.'}
              </p>
            </div>

            <MembraneButton
              variant="secondary"
              onClick={() => {
                setShowResults(false)
                setSelectedAnswers({})
              }}
            >
              Retake Quiz
            </MembraneButton>
          </div>
        ) : (
          <MembraneButton
            variant="primary"
            onClick={() => setShowResults(true)}
            disabled={Object.keys(selectedAnswers).length === 0}
            className="w-full sm:w-auto"
          >
            Submit All Answers ({Object.keys(selectedAnswers).length}/{quizQuestions.length})
          </MembraneButton>
        )}
      </div>
    </div>
  )
}
