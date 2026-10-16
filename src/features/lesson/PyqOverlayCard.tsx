import { motion, AnimatePresence } from 'framer-motion'
import type { Question, VideoOverlay } from '../../data/types'
import { getNonSamplePaperCount, questions as allQuestions } from '../../data'
import { usePrefersReducedMotion } from '../../components/LivingCellBackground/useMotionPreference'

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
  const prefersReduced = usePrefersReducedMotion()

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
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full rounded-[16px] border p-5 backdrop-blur-md flex flex-col gap-4 shadow-xl transition-colors"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Header: Badges & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Question Type Badge (Readable in both themes) */}
                {question.isSample ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border tracking-wide uppercase font-semibold"
                    style={{
                      backgroundColor: 'var(--tag-med-bg)',
                      borderColor: 'var(--tag-med-border)',
                      color: 'var(--tag-med-text)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--tag-med-text)' }}
                      aria-hidden="true"
                    />
                    Sample question
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full border tracking-wide uppercase font-semibold"
                    style={{
                      backgroundColor: 'var(--tag-live-bg)',
                      borderColor: 'var(--tag-live-border)',
                      color: 'var(--tag-live-text)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--tag-live-text)' }}
                      aria-hidden="true"
                    />
                    NEET {question.year} • {question.paper}
                  </span>
                )}

                {/* "Asked in X of 5 papers" Tag */}
                {nonSamplePapers > 0 && (
                  <span
                    className="inline-flex items-center text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold"
                    style={{
                      backgroundColor: 'var(--tag-high-bg)',
                      borderColor: 'var(--tag-high-border)',
                      color: 'var(--tag-high-text)',
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[36px]"
                    style={{
                      backgroundColor: isVideoPaused ? 'var(--tag-live-bg)' : 'var(--surface-2)',
                      borderColor: isVideoPaused ? 'var(--accent)' : 'var(--border)',
                      color: isVideoPaused ? 'var(--accent)' : 'var(--text)',
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[36px]"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--on-accent)',
                      boxShadow: '0 0 12px color-mix(in srgb, var(--accent) 30%, transparent)',
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
                style={{ color: 'var(--text-muted)' }}
              >
                Question Checkpoint
              </p>
              <h3
                className="text-sm sm:text-base font-semibold leading-relaxed"
                style={{ color: 'var(--text)', fontFamily: 'var(--font-body)' }}
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
                let borderStyle = 'var(--border)'
                let bgStyle = 'var(--surface-2)'
                let textStyle = 'var(--text)'
                let statusLabel: string | null = null

                if (isAnswerRevealed) {
                  if (isCorrect) {
                    borderStyle = 'var(--tag-live-border)'
                    bgStyle = 'var(--tag-live-bg)'
                    textStyle = 'var(--tag-live-text)'
                    statusLabel = isSelected ? '✓ Correct Choice' : '✓ Correct Answer'
                  } else if (isSelected) {
                    borderStyle = 'var(--tag-high-border)'
                    bgStyle = 'var(--tag-high-bg)'
                    textStyle = 'var(--tag-high-text)'
                    statusLabel = '✗ Your Choice'
                  } else {
                    textStyle = 'var(--text-muted)'
                  }
                } else if (isSelected) {
                  borderStyle = 'var(--accent)'
                  bgStyle = 'var(--tag-live-bg)'
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
                    className="group flex items-start gap-3 p-3 rounded-[12px] border text-left transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[44px]"
                    style={{
                      borderColor: borderStyle,
                      backgroundColor: bgStyle,
                      cursor: isAnswerRevealed ? 'default' : 'pointer',
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5"
                      style={{
                        borderColor: isSelected || (isAnswerRevealed && isCorrect) ? borderStyle : 'var(--border)',
                        backgroundColor: isSelected || (isAnswerRevealed && isCorrect) ? 'var(--tag-live-bg)' : 'var(--surface)',
                        color: isAnswerRevealed && isCorrect ? 'var(--tag-live-text)' : isSelected && !isCorrect ? 'var(--tag-high-text)' : 'var(--text)',
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
                            color: isCorrect ? 'var(--tag-live-text)' : 'var(--tag-high-text)',
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
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 rounded-[12px] border flex flex-col gap-1.5"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--tag-live-border)',
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
                    style={{ color: 'var(--accent)' }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span
                    className="text-xs font-mono uppercase tracking-wider font-semibold"
                    style={{ color: 'var(--accent)' }}
                  >
                    Explanation
                  </span>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}
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
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
            className="w-full rounded-[16px] border p-5 backdrop-blur-md flex flex-col gap-4"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent)]"
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
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}
              >
                Past-Year Question Checkpoints
              </h3>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
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
                    className="flex items-center justify-between p-2.5 rounded-[12px] border text-left transition-all duration-150 hover:border-[var(--accent)] hover:bg-[var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-h-[44px] w-full"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div className="flex flex-col flex-1 min-w-0 pr-2">
                      <span className="text-xs font-medium text-[var(--text)] truncate block max-w-full">
                        {targetQ ? targetQ.text : ov.questionId}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--accent)]">
                        {ov.startSec.toFixed(1)}s – {ov.endSec.toFixed(1)}s
                      </span>
                    </div>

                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded border shrink-0"
                      style={{
                        backgroundColor: 'var(--tag-live-bg)',
                        borderColor: 'var(--tag-live-border)',
                        color: 'var(--tag-live-text)',
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
