import React from 'react'

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  src: string
  poster?: string
  currentTime: number
  duration: number
  isMuted: boolean
  onToggleMute: () => void
  hasError: boolean
  onError: () => void
  isDebug: boolean
  onCopyTime: () => void
  copiedNotice: string | null
}

export function VideoPlayer({
  videoRef,
  src,
  poster,
  currentTime,
  duration,
  isMuted,
  onToggleMute,
  hasError,
  onError,
  isDebug,
  onCopyTime,
  copiedNotice,
}: VideoPlayerProps) {
  // Listen for native media error events directly
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleErrorEvent = () => onError()
    video.addEventListener('error', handleErrorEvent)
    return () => video.removeEventListener('error', handleErrorEvent)
  }, [videoRef, onError])

  return (
    <div className="relative w-full flex flex-col gap-2.5">
      {/* Top Header / Meta bar above the player */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {/* AI generated visuals badge */}
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: 'rgba(14, 21, 38, 0.7)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-teal)' }}
              aria-hidden="true"
            />
            Visuals generated with AI
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Debug timing helper */}
          {isDebug && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs"
              style={{
                backgroundColor: 'rgba(79, 227, 200, 0.08)',
                borderColor: 'var(--color-teal)',
                color: 'var(--color-teal)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>⏱ {currentTime.toFixed(1)}s / {duration.toFixed(0)}s</span>
              <button
                type="button"
                onClick={onCopyTime}
                className="px-2 py-0.5 rounded font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-teal)]"
                style={{
                  backgroundColor: 'rgba(79, 227, 200, 0.2)',
                  color: 'var(--color-teal)',
                }}
                title="Copy current timestamp to clipboard (or press key M)"
              >
                Copy time (M)
              </button>
              {copiedNotice && (
                <span
                  className="px-1.5 py-0.5 rounded text-[11px] font-bold"
                  style={{
                    backgroundColor: 'var(--color-teal)',
                    color: 'var(--color-bg-primary)',
                  }}
                >
                  {copiedNotice}
                </span>
              )}
            </div>
          )}

          {/* Dedicated Mute/Unmute button */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            aria-pressed={isMuted}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-teal)]"
            style={{
              backgroundColor: isMuted ? 'rgba(255, 122, 156, 0.12)' : 'rgba(14, 21, 38, 0.8)',
              borderColor: isMuted ? 'rgba(255, 122, 156, 0.4)' : 'var(--color-border)',
              color: isMuted ? 'var(--color-rose)' : 'var(--color-text-primary)',
              minHeight: '36px',
            }}
          >
            {isMuted ? (
              <>
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
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span>Muted</span>
              </>
            ) : (
              <>
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
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Video Container (Strictly uncropped with object-contain to preserve corner marks) */}
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden border flex items-center justify-center"
        style={{
          backgroundColor: '#000000',
          borderColor: 'var(--color-border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
        }}
      >
        {hasError ? (
          /* Video coming soon fallback */
          <div
            className="flex flex-col items-center justify-center p-6 text-center max-w-md"
            role="status"
            aria-live="polite"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3 border"
              style={{
                backgroundColor: 'rgba(79, 227, 200, 0.1)',
                borderColor: 'rgba(79, 227, 200, 0.3)',
                color: 'var(--color-teal)',
              }}
            >
              <svg
                width="24"
                height="24"
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
            <h3
              className="text-lg font-semibold mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              Video coming soon
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              The high-definition 3D mitosis animation is currently rendering or being transferred.
              You can still study the curriculum stages and sample PYQ questions below.
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="metadata"
            playsInline
            controls
            muted={isMuted}
            onError={onError}
            className="w-full h-full object-contain rounded-2xl"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        )}
      </div>
    </div>
  )
}
