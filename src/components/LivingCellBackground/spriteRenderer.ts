/**
 * NEET Biology Studio — Living Cell Background Sprite Renderer
 *
 * Pre-renders all organelle types across depth tiers to offscreen canvases ONCE.
 * Per-frame rendering blits cached sprites via drawImage() without any filter or shadowBlur.
 */

import type { OrganelleType } from '../../data/chapterBackgroundConfig'

export interface CachedSprite {
  canvas: HTMLCanvasElement
  width: number
  height: number
  originX: number
  originY: number
}

export type DepthTier = 0 | 1 | 2

export type SpriteAtlas = Map<string, CachedSprite>

// Bioluminescent palette: teal #4FE3C8, violet #8B7CFF, blue #5AA9FF, rose #FF7A9C (amber #FFB547 is strictly excluded from background)

/**
 * Creates an offscreen canvas with device pixel ratio scaling.
 */
function createOffscreen(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas')
  canvas.width = Math.ceil(width)
  canvas.height = Math.ceil(height)
  const ctx = canvas.getContext('2d')!
  return { canvas, ctx }
}

/**
 * Helper to render a specific organelle to an offscreen canvas.
 */
function renderOrganelleSprite(type: OrganelleType, depth: DepthTier): CachedSprite {
  // Depth settings: 0 = far (sharp, smaller), 1 = mid (soft), 2 = near (larger, soft/blurred)
  const blurAmounts = [0, 1.5, 3.5]
  const scaleFactors = [0.75, 1.0, 1.35]
  const blur = blurAmounts[depth]
  const scale = scaleFactors[depth]

  // Dimension allocation per type (with padding for glow/blur)
  let baseW = 60
  let baseH = 60

  switch (type) {
    case 'cell':
      baseW = 90
      baseH = 90
      break
    case 'mitochondrion':
      baseW = 80
      baseH = 45
      break
    case 'golgi':
      baseW = 75
      baseH = 55
      break
    case 'er':
      baseW = 90
      baseH = 60
      break
    case 'ribosome':
      baseW = 40
      baseH = 40
      break
    case 'vesicle':
      baseW = 36
      baseH = 36
      break
    case 'spindle':
      baseW = 85
      baseH = 75
      break
    case 'chromosome':
      baseW = 55
      baseH = 55
      break
    case 'chloroplast':
      baseW = 75
      baseH = 50
      break
  }

  const padding = 20 + blur * 4
  const width = (baseW * scale) + padding * 2
  const height = (baseH * scale) + padding * 2
  const originX = width / 2
  const originY = height / 2

  const { canvas, ctx } = createOffscreen(width, height)

  ctx.save()
  ctx.translate(originX, originY)
  ctx.scale(scale, scale)

  // One-time offscreen blur / glow for depth tier (NEVER used per-frame!)
  if (blur > 0) {
    ctx.filter = `blur(${blur}px)`
  }

  const hw = baseW / 2
  const hh = baseH / 2

  switch (type) {
    case 'cell': {
      // Cell membrane
      ctx.beginPath()
      ctx.arc(0, 0, hw - 10, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(79, 227, 200, 0.07)'
      ctx.fill()
      ctx.lineWidth = 1.75
      ctx.strokeStyle = 'rgba(79, 227, 200, 0.45)'
      ctx.stroke()

      // Nucleus
      ctx.beginPath()
      ctx.arc(hw * 0.15, -hh * 0.1, hw * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(139, 124, 255, 0.16)'
      ctx.fill()
      ctx.lineWidth = 1.25
      ctx.strokeStyle = 'rgba(139, 124, 255, 0.5)'
      ctx.stroke()

      // Nucleolus
      ctx.beginPath()
      ctx.arc(hw * 0.22, -hh * 0.05, hw * 0.12, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(232, 240, 250, 0.35)'
      ctx.fill()
      break
    }

    case 'mitochondrion': {
      // Outer capsule
      const r = hh - 6
      const len = hw - r - 6
      ctx.beginPath()
      ctx.roundRect(-len, -r, len * 2, r * 2, r)
      ctx.fillStyle = 'rgba(255, 122, 156, 0.08)'
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'rgba(255, 122, 156, 0.5)'
      ctx.stroke()

      // Inner membrane & cristae folds
      ctx.lineWidth = 1.25
      ctx.strokeStyle = 'rgba(255, 122, 156, 0.65)'
      ctx.beginPath()
      const cristaeCount = 5
      const step = (len * 1.6) / cristaeCount
      for (let i = 0; i < cristaeCount; i++) {
        const cx = -len * 0.8 + i * step
        const cyMax = r * 0.65
        const topToBottom = i % 2 === 0
        ctx.moveTo(cx, topToBottom ? -r * 0.75 : r * 0.75)
        ctx.lineTo(cx + (i % 2 === 0 ? 3 : -3), topToBottom ? cyMax : -cyMax)
      }
      ctx.stroke()
      break
    }

    case 'golgi': {
      // 4 stacked curved cisternae
      const layers = 4
      for (let i = 0; i < layers; i++) {
        const offset = (i - 1.5) * 8
        const curve = 12 - i * 2
        ctx.beginPath()
        ctx.lineWidth = 2.2
        ctx.lineCap = 'round'
        ctx.strokeStyle = `rgba(139, 124, 255, ${0.35 + i * 0.1})`
        ctx.moveTo(-hw * 0.65, offset - curve)
        ctx.quadraticCurveTo(0, offset + curve * 0.8, hw * 0.65, offset - curve)
        ctx.stroke()
      }
      // Budding secretory vesicle
      ctx.beginPath()
      ctx.arc(hw * 0.75, 4, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(139, 124, 255, 0.25)'
      ctx.fill()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(139, 124, 255, 0.6)'
      ctx.stroke()
      break
    }

    case 'er': {
      // Wavy endoplasmic reticulum tubes
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(90, 169, 255, 0.45)'
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(-hw * 0.7, -hh * 0.5)
      ctx.bezierCurveTo(-hw * 0.2, -hh * 0.9, 0, -hh * 0.1, hw * 0.7, -hh * 0.4)
      ctx.bezierCurveTo(hw * 0.4, 0, hw * 0.6, hh * 0.6, -hw * 0.4, hh * 0.5)
      ctx.bezierCurveTo(-hw * 0.8, hh * 0.2, -hw * 0.3, 0, hw * 0.2, hh * 0.1)
      ctx.stroke()

      // Small ribosome dots along the tubes
      ctx.fillStyle = 'rgba(79, 227, 200, 0.65)'
      const dots = [
        [-hw * 0.4, -hh * 0.6],
        [-hw * 0.1, -hh * 0.3],
        [hw * 0.3, -hh * 0.35],
        [hw * 0.5, hh * 0.2],
        [0, hh * 0.4],
        [-hw * 0.5, hh * 0.35],
      ]
      dots.forEach(([dx, dy]) => {
        ctx.beginPath()
        ctx.arc(dx, dy, 1.75, 0, Math.PI * 2)
        ctx.fill()
      })
      break
    }

    case 'ribosome': {
      // Cluster of small glowing dots
      ctx.fillStyle = 'rgba(79, 227, 200, 0.7)'
      const cluster = [
        [0, 0],
        [-6, -4],
        [7, -3],
        [-4, 6],
        [5, 5],
        [10, 2],
        [-8, 2],
      ]
      cluster.forEach(([dx, dy]) => {
        ctx.beginPath()
        ctx.arc(dx, dy, 1.8, 0, Math.PI * 2)
        ctx.fill()
      })
      break
    }

    case 'vesicle': {
      // Small translucent bubble ring
      ctx.beginPath()
      ctx.arc(0, 0, 8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(79, 227, 200, 0.08)'
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'rgba(79, 227, 200, 0.55)'
      ctx.stroke()

      // Faint inner highlight
      ctx.beginPath()
      ctx.arc(-2.5, -2.5, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(232, 240, 250, 0.35)'
      ctx.fill()
      break
    }

    case 'spindle': {
      // Spindle fibers radiating from pole
      ctx.lineWidth = 1.2
      ctx.strokeStyle = 'rgba(79, 227, 200, 0.45)'
      ctx.beginPath()
      const angles = [-0.65, -0.4, -0.15, 0.15, 0.4, 0.65]
      angles.forEach((ang) => {
        ctx.moveTo(0, 0)
        const fx = Math.cos(ang) * (hw * 0.85)
        const fy = Math.sin(ang) * (hh * 0.85)
        ctx.lineTo(fx, fy)
      })
      ctx.stroke()

      // Centriole focus point
      ctx.beginPath()
      ctx.arc(0, 0, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(139, 124, 255, 0.7)'
      ctx.fill()
      break
    }

    case 'chromosome': {
      // Condensed X-shaped sister chromatid pair
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'rgba(139, 124, 255, 0.65)'

      // Chromatid arm 1: top-left to bottom-right
      ctx.beginPath()
      ctx.moveTo(-12, -14)
      ctx.quadraticCurveTo(0, 0, 12, 14)
      ctx.stroke()

      // Chromatid arm 2: top-right to bottom-left
      ctx.beginPath()
      ctx.moveTo(12, -14)
      ctx.quadraticCurveTo(0, 0, -12, 14)
      ctx.stroke()

      // Glowing centromere waist
      ctx.beginPath()
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(79, 227, 200, 0.9)'
      ctx.fill()
      break
    }

    case 'chloroplast': {
      // Plant chloroplast envelope
      ctx.beginPath()
      ctx.ellipse(0, 0, hw - 6, hh - 8, 0, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(56, 217, 169, 0.08)'
      ctx.fill()
      ctx.lineWidth = 1.5
      ctx.strokeStyle = 'rgba(56, 217, 169, 0.55)'
      ctx.stroke()

      // Thylakoid grana stacks
      ctx.lineWidth = 1.75
      ctx.strokeStyle = 'rgba(56, 217, 169, 0.65)'
      const grana = [-16, 0, 16]
      grana.forEach((gx) => {
        ctx.beginPath()
        ctx.moveTo(gx, -6)
        ctx.lineTo(gx, 6)
        ctx.stroke()
      })
      break
    }
  }

  ctx.restore()

  return {
    canvas,
    width,
    height,
    originX,
    originY,
  }
}

/**
 * Initializes and returns a map of pre-rendered sprites for all organelle types across depth tiers.
 */
export function buildSpriteAtlas(): SpriteAtlas {
  const atlas: SpriteAtlas = new Map()
  const organelleTypes: OrganelleType[] = [
    'cell',
    'mitochondrion',
    'golgi',
    'er',
    'ribosome',
    'vesicle',
    'spindle',
    'chromosome',
    'chloroplast',
  ]

  const depths: DepthTier[] = [0, 1, 2]

  organelleTypes.forEach((type) => {
    depths.forEach((depth) => {
      const key = `${type}_d${depth}`
      atlas.set(key, renderOrganelleSprite(type, depth))
    })
  })

  return atlas
}
