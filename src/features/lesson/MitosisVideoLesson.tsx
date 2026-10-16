import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { videos, questions as allQuestions } from '../../data'
import { VideoPlayer } from './VideoPlayer'
import { ChapterList } from './ChapterList'
import { PyqOverlayCard } from './PyqOverlayCard'

export function MitosisVideoLesson() {
  const videoData = videos[0] // Mitosis lesson video
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [isVideoPaused, setIsVideoPaused] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({})
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null)

  // Debug timing helper (?debug in URL)
  const isDebug = typeof window !== 'undefined' && window.location.search.includes('debug')

  const handleCopyTime = useCallback(() => {
    const formatted = currentTime.toFixed(1)
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(formatted).then(() => {
        setCopiedNotice(`Copied ${formatted}s`)
        setTimeout(() => setCopiedNotice(null), 1800)
      }).catch(() => {
        // Clipboard write fallback
      })
    }
  }, [currentTime])

  // Global keydown listener for M key in debug mode
  useEffect(() => {
    if (!isDebug) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        handleCopyTime()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDebug, handleCopyTime])

  // Frame-accurate time tracking loop using requestVideoFrameCallback or requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isSubscribed = true
    let frameCallbackId: number | null = null
    let animFrameId: number | null = null

    const updateFrame = () => {
      if (!isSubscribed) return
      setCurrentTime(video.currentTime)
      setIsVideoPaused(video.paused)

      if ('requestVideoFrameCallback' in HTMLVideoElement.prototype && 'requestVideoFrameCallback' in video) {
        frameCallbackId = (video as unknown as { requestVideoFrameCallback: (cb: () => void) => number }).requestVideoFrameCallback(() => {
          updateFrame()
        })
      } else {
        animFrameId = requestAnimationFrame(updateFrame)
      }
    }

    const onStateChange = () => {
      setCurrentTime(video.currentTime)
      setIsVideoPaused(video.paused)
      setIsMuted(video.muted)
    }

    video.addEventListener('timeupdate', onStateChange)
    video.addEventListener('seeked', onStateChange)
    video.addEventListener('seeking', onStateChange)
    video.addEventListener('play', onStateChange)
    video.addEventListener('pause', onStateChange)
    video.addEventListener('volumechange', onStateChange)

    updateFrame()

    return () => {
      isSubscribed = false
      if (frameCallbackId !== null && 'cancelVideoFrameCallback' in video) {
        (video as unknown as { cancelVideoFrameCallback: (id: number) => void }).cancelVideoFrameCallback(frameCallbackId)
      }
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId)
      }
      video.removeEventListener('timeupdate', onStateChange)
      video.removeEventListener('seeked', onStateChange)
      video.removeEventListener('seeking', onStateChange)
      video.removeEventListener('play', onStateChange)
      video.removeEventListener('pause', onStateChange)
      video.removeEventListener('volumechange', onStateChange)
    }
  }, [])

  // Find active question overlay for current video time (with 0.04s tolerance for 24fps frame snapping)
  const activeOverlay = useMemo(() => {
    if (!videoData) return null
    const EPS = 0.04
    return (
      videoData.overlays.find((ov) => {
        const afterStart = currentTime >= ov.startSec - EPS
        const beforeEnd = currentTime < ov.endSec - EPS
        if (afterStart && beforeEnd) return true
        // Handle video duration boundary
        if (afterStart && ov.endSec >= videoData.durationSec && currentTime <= videoData.durationSec) return true
        return false
      }) ?? null
    )
  }, [currentTime, videoData])

  // Corresponding question for active overlay
  const activeQuestion = useMemo(() => {
    if (!activeOverlay) return null
    return allQuestions.find((q) => q.id === activeOverlay.questionId) ?? null
  }, [activeOverlay])

  const handlePauseAndTry = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsVideoPaused(true)
    }
  }, [])

  const handleContinue = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // User gesture enables playback
      })
      setIsVideoPaused(false)
    }
  }, [])

  const handleSeek = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds
      setCurrentTime(seconds)
    }
  }, [])

  const handleToggleMute = useCallback(() => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }, [])

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (!activeOverlay) return
      setUserAnswers((prev) => ({
        ...prev,
        [activeOverlay.questionId]: optionIndex,
      }))
    },
    [activeOverlay]
  )

  if (!videoData) {
    return null
  }

  return (
    <div className="w-full">
      {/* Responsive layout:
          - Desktop (>=1024px): 12-column grid. Video & Chapters in col-span-8 (66%), PYQ panel in col-span-4 (34%).
          - Mobile (<1024px): Single column stacked. Order 1: Video, Order 2: PYQ card directly under video, Order 3: Chapter list.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Video Player & Header Controls */}
        <div className="w-full lg:col-span-8 order-1 flex flex-col gap-3">
          <VideoPlayer
            videoRef={videoRef}
            src={videoData.src}
            currentTime={currentTime}
            duration={videoData.durationSec}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            hasError={hasVideoError}
            onError={() => setHasVideoError(true)}
            isDebug={isDebug}
            onCopyTime={handleCopyTime}
            copiedNotice={copiedNotice}
          />
        </div>

        {/* 2. PYQ Panel: Sits directly under video on mobile (<1024px), sits on the right (~35%) on desktop (>=1024px) */}
        <div className="w-full lg:col-span-4 order-2 lg:order-2 lg:row-span-2">
          <PyqOverlayCard
            overlay={activeOverlay}
            question={activeQuestion}
            currentTime={currentTime}
            isVideoPaused={isVideoPaused}
            userAnswerIndex={activeOverlay ? userAnswers[activeOverlay.questionId] : undefined}
            onSelectOption={handleSelectOption}
            onPauseAndTry={handlePauseAndTry}
            onContinue={handleContinue}
            onSeek={handleSeek}
            allOverlays={videoData.overlays}
          />
        </div>

        {/* 3. Chapter list: Sits under video on desktop, and under PYQ card on mobile */}
        <div className="w-full lg:col-span-8 order-3 lg:order-3">
          <ChapterList
            chapters={videoData.chapters}
            currentTime={currentTime}
            duration={videoData.durationSec}
            onSeek={handleSeek}
          />
        </div>
      </div>
    </div>
  )
}
