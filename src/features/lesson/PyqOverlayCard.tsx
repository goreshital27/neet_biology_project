import { motion, AnimatePresence } from 'framer-motion'
import type { Question, VideoOverlay } from '../../data/types'
import { getNonSamplePaperCount, questions as allQuestions } from '../../data'
import { useMotionStore } from '../../components/LivingCellBackground/useMotionPreference'

interface PyqOverlayCardProps {
  overlay: VideoOverlay | null
  question: Question | null
  currentTime: number
  isVideoPaused: boolean
  userAnswerIndex: number | undefined
  onSelectOption: (optionIndex: number) => void
  onPauseAndTry: () => void
  onContinue: () => void
  onSeek: (seconds: number) => void
  allOverlays: VideoOverlay[]
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

export function PyqOverlayCard({
  overlay,
  question,
  currentTime,
  isVideoPaused,
  userAnswerIndex,
  onSelectOption,
  onPauseAndTry,
  onContinue,
  onSeek,
  allOverlays,
}: PyqOverlayCardProps) {
  const motionEnabled = useMotionStore((s) => s.motionEnabled)

  // Determine whether answer should be shown (either user answered or video reached reveal time)
  const isAnswerRevealed = Boolean(
    overlay && (userAnswerIndex !== undefined || currentTime >= overlay.revealAnswerAtSec)
  )

  const nonSamplePapers = question ? getNonSamplePaperCount(question.conceptId, allQuestions) : 0

  return (
    <section
      aria-label="NEET Past-Year Questions Panel"
      aria-live="polite"
      aria-atomic="true"
      className="w-full flex flex-col"
    >
      <AnimatePresence mode="wait">
        {overlay && question ? (
          <motion.div
            key={overlay.questionId}
            initial={motionEnabled ? { opacity: 0, x: 24 } : { opacity: 0 }}
            animate={motionEnabled ? { opacity: 1, x: 0 } : { opacity: 1 }}
            exit={motionEnabled ? { opacity: 0, x: -24 } : { opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full rounded-2xl border p-5 backdrop-blur-md flex flex-col gap-4 shadow-xl"
            style={{
              backgroundColor: 'rgba(14, 21, 38, 0.85)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* Header: Badges & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Sample vs Real Question Badge */}
                {question.isSample ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border tracking-wide uppercase font-semibold"
                    style={{
                      backgroundColor: 'rgba(90, 169, 255, 0.12)',
                      borderColor: 'rgba(90, 169, 255, 0.35)',
                      color: 'var(--color-blue)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-blue)' }}
                      aria-hidden="true"
                    />
                    Sample question
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border tracking-wide uppercase font-semibold"
                    style={{
                      backgroundColor: 'rgba(79, 227, 200, 0.12)',
                      borderColor: 'rgba(79, 227, 200, 0.35)',
                      color: 'var(--color-teal)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-teal)' }}
                      aria-hidden="true"
                    />
                    NEET {question.year} • {question.paper}
                  </span>
                )}

                {/* "Asked in X of 5 papers" Tag - shown ONLY for concepts with at least one non-sample question */}
                {nonSamplePapers > 0 && (
                  <span
                    className="inline-flex items-center text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold"
                    style={{
                      backgroundColor: 'var(--color-alert-bg)',
                      borderColor: 'var(--color-alert)',
                      color: 'var(--color-alert)',
                    }}
                  >
                    Asked in {nonSamplePapers} of 5 papers
                  </span>
                )}
              </div>

              {/* Pause & Try or Continue Button */}
              <div>
                {userAnswerIndex === undefined ? (
                  <button
                    type="button"
                    onClick={onPauseAndTry}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[36px]"
                    style={{
                      backgroundColor: isVideoPaused ? 'rgba(79, 227, 200, 0.06)' : 'rgba(79, 227, 200, 0.12)',
                      borderColor: 'var(--color-teal)',
                      color: 'var(--color-teal)',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <span>Pause and try</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onContinue}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white outline-none min-h-[36px]"
                    style={{
                      backgroundColor: 'var(--color-teal)',
                      color: 'var(--color-bg-primary)',
                      boxShadow: '0 0 12px rgba(79, 227, 200, 0.3)',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Continue</span>
                  </button>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div>
              <p
                className="text-xs font-mono uppercase tracking-wider mb-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Question Prompt
              </p>
              <h3
                className="text-sm sm:text-base font-medium leading-relaxed"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}
              >
                {question.text}
              </h3>
            </div>

            {/* 4 Options */}
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Question choices">
              {question.options.map((optText, optIdx) => {
                const isSelected = userAnswerIndex === optIdx
                const isCorrect = optIdx === question.answerIndex

                // Determine option presentation styling
                let borderStyle = 'var(--color-border)'
                let bgStyle = 'rgba(7, 11, 20, 0.6)'
                let textStyle = 'var(--color-text-primary)'
                let statusLabel: string | null = null

                if (isAnswerRevealed) {
                  if (isCorrect) {
                    borderStyle = 'var(--color-success)'
                    bgStyle = 'rgba(79, 227, 200, 0.15)'
                    statusLabel = isSelected ? '✓ Correct Choice' : '✓ Correct Answer'
                  } else if (isSelected) {
                    borderStyle = 'var(--color-error)'
                    bgStyle = 'rgba(255, 122, 156, 0.15)'
                    statusLabel = '✗ Your Choice'
                  } else {
                    textStyle = 'var(--color-text-muted)'
                  }
                } else if (isSelected) {
                  borderStyle = 'var(--color-teal)'
                  bgStyle = 'rgba(79, 227, 200, 0.1)'
                  statusLabel = 'Selected'
                }

                return (
                  <button
                    key={`${optIdx}-${optText}`}
                    type="button"
                    onClick={() => onSelectOption(optIdx)}
                    disabled={isAnswerRevealed}
                    aria-checked={isSelected}
                    role="radio"
                    className="group flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[44px]"
                    style={{
                      borderColor: borderStyle,
                      backgroundColor: bgStyle,
                      cursor: isAnswerRevealed ? 'default' : 'pointer',
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5"
                      style={{
                        borderColor: isSelected || (isAnswerRevealed && isCorrect) ? borderStyle : 'var(--color-border)',
                        backgroundColor: isSelected || (isAnswerRevealed && isCorrect) ? 'rgba(79, 227, 200, 0.15)' : 'rgba(14, 21, 38, 0.8)',
                        color: isAnswerRevealed && isCorrect ? 'var(--color-success)' : isSelected && !isCorrect ? 'var(--color-error)' : 'var(--color-text-primary)',
                      }}
                    >
                      {OPTION_LETTERS[optIdx]}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: textStyle }}>
                        {optText}
                      </p>
                      {statusLabel && (
                        <span
                          className="inline-block mt-1 text-[11px] font-mono font-semibold"
                          style={{
                            color: isCorrect ? 'var(--color-success)' : 'var(--color-error)',
                          }}
                        >
                          {statusLabel}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation box (revealed at revealAnswerAtSec or when answered) */}
            {isAnswerRevealed && (
              <motion.div
                initial={motionEnabled ? { opacity: 0, y: 8 } : { opacity: 0 }}
                animate={motionEnabled ? { opacity: 1, y: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 rounded-xl border flex flex-col gap-1.5"
                style={{
                  backgroundColor: 'rgba(7, 11, 20, 0.8)',
                  borderColor: 'rgba(79, 227, 200, 0.35)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--color-teal)' }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-semibold"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Explanation
                  </span>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Standby / Guide State when no question overlay is currently active */
          <motion.div
            key="standby"
            initial={motionEnabled ? { opacity: 0 } : { opacity: 0 }}
            animate={motionEnabled ? { opacity: 1 } : { opacity: 1 }}
            exit={motionEnabled ? { opacity: 0 } : { opacity: 0 }}
            className="w-full rounded-2xl border p-5 backdrop-blur-md flex flex-col gap-4"
            style={{
              backgroundColor: 'rgba(14, 21, 38, 0.7)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-teal)]"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <h3
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
              >
                Past-Year Question Checkpoints
              </h3>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Interactive past-year question (PYQ) cards appear alongside the mitosis animation as
              each tested stage plays. Click any checkpoint below to jump directly to it:
            </p>

            <div className="flex flex-col gap-2">
              {allOverlays.map((ov) => {
                const targetQ = allQuestions.find((q) => q.id === ov.questionId)
                return (
                  <button
                    key={ov.questionId}
                    type="button"
                    onClick={() => onSeek(ov.startSec)}
                    className="flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-150 hover:border-[var(--color-teal)] hover:bg-[rgba(79,227,200,0.06)] focus-visible:ring-2 focus-visible:ring-[var(--color-teal)] outline-none min-h-[44px] w-full"
                    style={{
                      backgroundColor: 'rgba(7, 11, 20, 0.5)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div className="flex flex-col flex-1 min-w-0 pr-2">
                      <span className="text-xs font-medium text-[var(--color-text-primary)] truncate block max-w-full">
                        {targetQ ? targetQ.text : ov.questionId}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--color-teal)]">
                        {ov.startSec.toFixed(1)}s – {ov.endSec.toFixed(1)}s
                      </span>
                    </div>

                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded border shrink-0"
                      style={{
                        backgroundColor: 'rgba(79, 227, 200, 0.1)',
                        borderColor: 'rgba(79, 227, 200, 0.3)',
                        color: 'var(--color-teal)',
                      }}
                    >
                      Jump →
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
