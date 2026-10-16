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
  poster = '/videos/mitosis-poster.jpg',
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
        {/* Left side: Debug timing helper (?debug in URL) or empty spacer */}
        <div className="flex items-center gap-2">
          {isDebug && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs"
              style={{
                backgroundColor: 'var(--surface-2)',
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>⏱ {currentTime.toFixed(1)}s / {duration.toFixed(0)}s</span>
              <button
                type="button"
                onClick={onCopyTime}
                className="px-2 py-0.5 rounded font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                  color: 'var(--accent)',
                }}
                title="Copy current timestamp to clipboard (or press key M)"
              >
                Copy time (M)
              </button>
              {copiedNotice && (
                <span
                  className="px-1.5 py-0.5 rounded text-[11px] font-bold"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--on-accent)',
                  }}
                >
                  {copiedNotice}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right side: Dedicated Mute/Unmute toggle button */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            aria-pressed={isMuted}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors hover:bg-[var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            style={{
              backgroundColor: isMuted ? 'var(--tag-high-bg)' : 'var(--surface)',
              borderColor: isMuted ? 'var(--tag-high-border)' : 'var(--border)',
              color: isMuted ? 'var(--tag-high-text)' : 'var(--text)',
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

      {/* 16:9 Video Container with Rounded Corners & Clear Controls */}
      <div
        className="relative w-full aspect-video rounded-[16px] overflow-hidden border flex items-center justify-center shadow-lg"
        style={{
          backgroundColor: '#000000',
          borderColor: 'var(--border)',
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
                backgroundColor: 'var(--tag-live-bg)',
                borderColor: 'var(--tag-live-border)',
                color: 'var(--tag-live-text)',
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
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}
            >
              Video coming soon
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
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
            className="w-full h-full object-contain rounded-[16px]"
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
