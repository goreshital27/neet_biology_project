import { useEffect, useRef, useState } from 'react'
import { buildSpriteAtlas, type SpriteAtlas, type DepthTier } from './spriteRenderer'
import { getBackgroundConfigForChapter, type OrganelleType } from '../../data/chapterBackgroundConfig'
import { useMotionStore } from './useMotionPreference'

interface OrganelleParticle {
  type: OrganelleType
  depth: DepthTier
  x: number
  y: number
  vx: number
  vy: number
  baseSpeed: number
  rotation: number
  rotSpeed: number
  scale: number
  noiseSeedX: number
  noiseSeedY: number
  noiseFreq: number
  repelX: number
  repelY: number
}

interface LivingCellBackgroundProps {
  chapterId?: string
}

export function LivingCellBackground({ chapterId = 'cell-cycle' }: LivingCellBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const motionEnabled = useMotionStore((s) => s.motionEnabled)

  const [fps, setFps] = useState<number>(60)
  const [particleCount, setParticleCount] = useState<number>(0)
  const [showDebug] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.search.includes('debug')
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Pre-render sprite atlas once
    const atlas: SpriteAtlas = buildSpriteAtlas()

    // Determine target count based on screen width
    function getTargetParticleCount(w: number): number {
      if (w >= 1024) return 40
      if (w >= 768) return 25
      return 14
    }

    // Determine device pixel ratio (cap 2 on desktop, 1.5 on mobile)
    function getCappedDpr(w: number): number {
      const raw = window.devicePixelRatio || 1
      const isMobile = w < 768
      const cap = isMobile ? 1.5 : 2.0
      return Math.min(raw, cap)
    }

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = getCappedDpr(width)

    function resizeCanvas() {
      if (!canvas || !ctx) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = getCappedDpr(width)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.resetTransform()
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()

    // Prepare organelle pool based on chapter config
    const config = getBackgroundConfigForChapter(chapterId)
    const weightedTypes: OrganelleType[] = []
    config.organelles.forEach((o) => {
      for (let i = 0; i < o.weight; i++) {
        weightedTypes.push(o.type)
      }
    })

    const targetCount = getTargetParticleCount(width)
    setParticleCount(targetCount)

    // Depth tier distribution: ~45% far (0), ~35% mid (1), ~20% near (2)
    function pickDepth(): DepthTier {
      const r = Math.random()
      if (r < 0.45) return 0
      if (r < 0.8) return 1
      return 2
    }

    const particles: OrganelleParticle[] = []

    for (let i = 0; i < targetCount; i++) {
      const type = weightedTypes[Math.floor(Math.random() * weightedTypes.length)]
      const depth = pickDepth()

      // Far objects move slower; near objects move faster (parallax)
      const depthSpeedMultipliers = [0.4, 0.75, 1.25]
      const speedMult = depthSpeedMultipliers[depth]

      const rotates = type === 'mitochondrion' || type === 'chromosome' || type === 'cell'

      particles.push({
        type,
        depth,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 8 * speedMult,
        vy: (Math.random() - 0.5) * 8 * speedMult,
        baseSpeed: speedMult,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: rotates ? (Math.random() - 0.5) * 0.3 * speedMult : 0,
        scale: 0.85 + Math.random() * 0.3,
        noiseSeedX: Math.random() * 100,
        noiseSeedY: Math.random() * 100,
        noiseFreq: 0.08 + Math.random() * 0.06,
        repelX: 0,
        repelY: 0,
      })
    }

    // Interactive pointer repulsion
    let mouseX = -9999
    let mouseY = -9999

    const onPointerMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onPointerLeave = () => {
      mouseX = -9999
      mouseY = -9999
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)

    // Scroll parallax tracking
    let lastScrollY = window.scrollY
    let scrollDeltaY = 0

    const onScroll = () => {
      const current = window.scrollY
      scrollDeltaY = current - lastScrollY
      lastScrollY = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Animation loop variables
    let animationFrameId: number | null = null
    let lastTime = performance.now()
    let simTime = 0
    let frameCounter = 0
    let lastFpsUpdate = performance.now()

    function drawSingleFrame() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      // Draw all particles using cached sprites
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const spriteKey = `${p.type}_d${p.depth}`
        const sprite = atlas.get(spriteKey)
        if (!sprite) continue

        ctx.save()
        ctx.translate(p.x, p.y)
        if (p.rotation !== 0) {
          ctx.rotate(p.rotation)
        }
        ctx.drawImage(
          sprite.canvas,
          -sprite.originX,
          -sprite.originY,
          sprite.width,
          sprite.height,
        )
        ctx.restore()
      }
    }

    function animate(now: number) {
      if (!ctx) return

      const dt = Math.min((now - lastTime) / 1000, 0.1) // clamp dt
      lastTime = now
      simTime += dt

      // FPS tracking for debug mode
      frameCounter++
      if (now - lastFpsUpdate >= 500) {
        setFps(Math.round((frameCounter * 1000) / (now - lastFpsUpdate)))
        frameCounter = 0
        lastFpsUpdate = now
      }

      ctx.clearRect(0, 0, width, height)

      const margin = 80
      const mouseRepelRadius = 140

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // 1. Organic noise drift (sum of sinusoidal waves)
        const nx = Math.sin(simTime * p.noiseFreq + p.noiseSeedX) * 14 * p.baseSpeed
        let ny = Math.cos(simTime * p.noiseFreq + p.noiseSeedY) * 12 * p.baseSpeed

        // Vesicles and lysosomes gently float upward like bubbles
        if (p.type === 'vesicle') {
          ny -= 16 * p.baseSpeed
        }

        // 2. Cursor repulsion
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const distSq = dx * dx + dy * dy
        if (distSq < mouseRepelRadius * mouseRepelRadius && distSq > 1) {
          const dist = Math.sqrt(distSq)
          const force = (1 - dist / mouseRepelRadius) * 45 * p.baseSpeed
          p.repelX += (dx / dist) * force * dt * 8
          p.repelY += (dy / dist) * force * dt * 8
        }

        // Dampen repulsion smoothly
        p.repelX *= Math.pow(0.85, dt * 60)
        p.repelY *= Math.pow(0.85, dt * 60)

        // 3. Scroll parallax offset
        const parallaxFactor = (p.depth + 1) * 0.15
        p.y -= scrollDeltaY * parallaxFactor

        // 4. Update position
        p.x += (nx + p.repelX) * dt
        p.y += (ny + p.repelY) * dt
        p.rotation += p.rotSpeed * dt

        // 5. Screen boundary wrapping
        if (p.x < -margin) p.x = width + margin
        else if (p.x > width + margin) p.x = -margin

        if (p.y < -margin) p.y = height + margin
        else if (p.y > height + margin) p.y = -margin

        // 6. Blit cached sprite (pure drawImage, NO per-frame filter/shadowBlur!)
        const spriteKey = `${p.type}_d${p.depth}`
        const sprite = atlas.get(spriteKey)
        if (!sprite) continue

        ctx.save()
        ctx.translate(p.x, p.y)
        if (p.rotation !== 0) {
          ctx.rotate(p.rotation)
        }
        ctx.drawImage(
          sprite.canvas,
          -sprite.originX,
          -sprite.originY,
          sprite.width,
          sprite.height,
        )
        ctx.restore()
      }

      scrollDeltaY = 0

      animationFrameId = requestAnimationFrame(animate)
    }

    // Visibility change handler: pause when tab is hidden to save power
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
      } else {
        if (motionEnabled && animationFrameId === null) {
          lastTime = performance.now()
          animationFrameId = requestAnimationFrame(animate)
        }
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    const onResize = () => {
      resizeCanvas()
      const newTarget = getTargetParticleCount(width)
      setParticleCount(newTarget)
      if (!motionEnabled) {
        drawSingleFrame()
      }
    }

    window.addEventListener('resize', onResize, { passive: true })

    // If reduced motion is requested or user toggled off, draw ONE static frame and do not loop
    if (!motionEnabled) {
      drawSingleFrame()
    } else {
      lastTime = performance.now()
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [chapterId, motionEnabled])

  return (
    <>
      {/* ── Fixed living canvas behind all page content ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          width: '100vw',
          height: '100dvh',
        }}
      />

      {/* ── Dark gradient overlay ensuring WCAG AA text contrast ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(7, 11, 20, 0.65) 0%, rgba(7, 11, 20, 0.94) 85%)',
        }}
      />

      {/* ── Debug FPS Counter (only rendered with ?debug in URL) ── */}
      {showDebug && (
        <div
          className="fixed bottom-3 right-3 z-50 px-3 py-1.5 rounded-lg text-xs border backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(7, 11, 20, 0.85)',
            borderColor: 'var(--color-border)',
            fontFamily: 'var(--font-mono)',
            color: fps >= 45 ? 'var(--color-teal)' : fps >= 30 ? 'var(--color-warning)' : 'var(--color-error)',
          }}
          aria-live="polite"
        >
          <div>FPS: {fps} (target 30-60)</div>
          <div className="text-[10px] text-[var(--color-text-secondary)]">
            Organelles: {particleCount} | Motion: {motionEnabled ? 'ON' : 'OFF'}
          </div>
        </div>
      )}
    </>
  )
}
