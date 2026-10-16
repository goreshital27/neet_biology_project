import { useState, useEffect } from 'react'
import { usePrefersReducedMotion } from './useMotionPreference'

interface CellConfig {
  id: string
  color: 'teal' | 'violet' | 'coral'
  size: number
  top: string
  left: string
  dx: number
  dy: number
  duration: number
  delay: number
  rotDuration: number
  rotDirection: 1 | -1
  mobileOnly?: boolean
}

const CELLS: CellConfig[] = [
  { id: 'c1', color: 'teal', size: 140, top: '12%', left: '8%', dx: 40, dy: -30, duration: 24, delay: 0, rotDuration: 30, rotDirection: 1 },
  { id: 'c2', color: 'violet', size: 100, top: '15%', left: '84%', dx: -35, dy: 40, duration: 28, delay: 2, rotDuration: 36, rotDirection: -1 },
  { id: 'c3', color: 'coral', size: 160, top: '68%', left: '86%', dx: -45, dy: -35, duration: 32, delay: 4, rotDuration: 42, rotDirection: 1 },
  { id: 'c4', color: 'teal', size: 75, top: '78%', left: '16%', dx: 30, dy: -25, duration: 22, delay: 1, rotDuration: 28, rotDirection: -1 },
  { id: 'c5', color: 'violet', size: 115, top: '8%', left: '48%', dx: -25, dy: 35, duration: 26, delay: 3, rotDuration: 34, rotDirection: 1 },
  // Desktop-extended cells (light on mobile)
  { id: 'c6', color: 'coral', size: 65, top: '48%', left: '4%', dx: 35, dy: 30, duration: 20, delay: 5, rotDuration: 26, rotDirection: -1, mobileOnly: false },
  { id: 'c7', color: 'teal', size: 90, top: '42%', left: '76%', dx: -30, dy: -40, duration: 30, delay: 2, rotDuration: 38, rotDirection: 1, mobileOnly: false },
  { id: 'c8', color: 'violet', size: 130, top: '85%', left: '38%', dx: 40, dy: -20, duration: 34, delay: 6, rotDuration: 44, rotDirection: -1, mobileOnly: false },
  { id: 'c9', color: 'coral', size: 85, top: '82%', left: '62%', dx: -35, dy: 25, duration: 25, delay: 4, rotDuration: 32, rotDirection: 1, mobileOnly: false },
  { id: 'c10', color: 'teal', size: 55, top: '32%', left: '92%', dx: -20, dy: 30, duration: 18, delay: 1, rotDuration: 24, rotDirection: 1, mobileOnly: false },
]

export function LivingCellBackground({ chapterId = 'cell-cycle' }: { chapterId?: string }) {
  void chapterId // Extensible for future chapters
  const prefersReduced = usePrefersReducedMotion()
  const [isTabHidden, setIsTabHidden] = useState(false)

  // Pause CSS animations when browser tab is inactive to preserve GPU/battery
  useEffect(() => {
    if (typeof document === 'undefined') return
    const handleVisibility = () => {
      setIsTabHidden(document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const colorPalettes = {
    teal: {
      stroke: '#2DD4BF',
      fill: 'rgba(45, 212, 191, 0.12)',
      nucleus: '#2DD4BF',
      nucleusRing: 'rgba(45, 212, 191, 0.35)',
    },
    violet: {
      stroke: '#8B7CFF',
      fill: 'rgba(139, 124, 255, 0.12)',
      nucleus: '#8B7CFF',
      nucleusRing: 'rgba(139, 124, 255, 0.35)',
    },
    coral: {
      stroke: '#FB7185',
      fill: 'rgba(251, 113, 133, 0.12)',
      nucleus: '#FB7185',
      nucleusRing: 'rgba(251, 113, 133, 0.35)',
    },
  }

  const animationPlayState = isTabHidden || prefersReduced ? 'paused' : 'running'

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: 'var(--bg-cells-opacity, 0.42)',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 36%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,1) 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 36%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,1) 100%)',
        transition: 'opacity 0.3s ease',
      }}
    >
      <style>{`
        @keyframes driftMotion {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(var(--drift-x), var(--drift-y), 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes rotateMotion {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(var(--rot-deg)); }
        }

        @keyframes mitosisLoop {
          0% {
            transform: scale(0.95);
            opacity: 0.9;
          }
          30% {
            transform: scale(1.08) scaleX(1.22);
            opacity: 1;
          }
          55% {
            transform: scale(1.05) scaleX(1.35);
            opacity: 1;
          }
          75% {
            transform: scale(1.1) scaleX(1.45);
            opacity: 0.85;
          }
          92% {
            transform: scale(0.92);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.9;
          }
        }

        @keyframes furrowConstrict {
          0%, 25% {
            r: 32px;
            opacity: 0;
          }
          45% {
            opacity: 0.8;
          }
          65%, 85% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes dnaTwist {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(4deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @keyframes dnaStrandFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -120; }
        }
      `}</style>

      {/* ── 1. Floating Translucent Biological Cells ── */}
      {CELLS.map((cell, index) => {
        const pal = colorPalettes[cell.color]
        const isExtra = cell.mobileOnly === false
        return (
          <div
            key={cell.id}
            className={`absolute ${isExtra ? 'hidden md:block' : ''}`}
            style={{
              top: cell.top,
              left: cell.left,
              width: cell.size,
              height: cell.size,
              animation: prefersReduced
                ? 'none'
                : `driftMotion ${cell.duration}s ease-in-out infinite alternate`,
              animationDelay: `${cell.delay}s`,
              animationPlayState,
              willChange: prefersReduced ? 'auto' : 'transform',
              '--drift-x': `${cell.dx}px`,
              '--drift-y': `${cell.dy}px`,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                animation: prefersReduced
                  ? 'none'
                  : `rotateMotion ${cell.rotDuration}s linear infinite`,
                animationPlayState,
                willChange: prefersReduced ? 'auto' : 'transform',
                '--rot-deg': `${cell.rotDirection * 360}deg`,
              } as React.CSSProperties}
            >
              <svg
                width={cell.size}
                height={cell.size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-sm"
              >
                <defs>
                  <radialGradient id={`cell-grad-${index}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={pal.stroke} stopOpacity="0.22" />
                    <stop offset="70%" stopColor={pal.stroke} stopOpacity="0.10" />
                    <stop offset="100%" stopColor={pal.stroke} stopOpacity="0.02" />
                  </radialGradient>
                </defs>

                {/* Outer Cytoplasmic Membrane */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill={`url(#cell-grad-${index})`}
                  stroke={pal.stroke}
                  strokeWidth="2.2"
                  strokeOpacity="0.85"
                />

                {/* Inner Membrane Echo / Lipid Bilayer detail */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={pal.stroke}
                  strokeWidth="1"
                  strokeOpacity="0.25"
                  strokeDasharray="4 2"
                />

                {/* Nucleus envelope ring */}
                <circle
                  cx="46"
                  cy="48"
                  r="14"
                  fill={pal.nucleusRing}
                  stroke={pal.stroke}
                  strokeWidth="1.4"
                  strokeOpacity="0.75"
                />

                {/* Nucleolus dot */}
                <circle
                  cx="45"
                  cy="47"
                  r="5"
                  fill={pal.nucleus}
                  opacity="0.9"
                />

                {/* Minute organelle particles / ribosomes */}
                <circle cx="68" cy="38" r="2.2" fill={pal.stroke} opacity="0.6" />
                <circle cx="34" cy="68" r="1.8" fill={pal.stroke} opacity="0.5" />
                <circle cx="62" cy="64" r="2.5" fill={pal.stroke} opacity="0.55" />
              </svg>
            </div>
          </div>
        )
      })}

      {/* ── 2. Mitosis Dividing Cell (Cleavage Furrow animation) ── */}
      <div
        className="absolute hidden sm:block"
        style={{
          top: '38%',
          left: '7%',
          width: 130,
          height: 100,
          animation: prefersReduced ? 'none' : 'mitosisLoop 9s ease-in-out infinite',
          animationPlayState,
          willChange: prefersReduced ? 'auto' : 'transform, opacity',
        }}
      >
        <svg
          width="130"
          height="100"
          viewBox="0 0 130 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="mitosis-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.26" />
              <stop offset="65%" stopColor="#8B7CFF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.04" />
            </radialGradient>
          </defs>

          {/* Left daughter lobe */}
          <ellipse
            cx="44"
            cy="50"
            rx="34"
            ry="38"
            fill="url(#mitosis-grad)"
            stroke="#2DD4BF"
            strokeWidth="2"
            strokeOpacity="0.8"
          />

          {/* Right daughter lobe */}
          <ellipse
            cx="86"
            cy="50"
            rx="34"
            ry="38"
            fill="url(#mitosis-grad)"
            stroke="#8B7CFF"
            strokeWidth="2"
            strokeOpacity="0.8"
          />

          {/* Left daughter nucleus */}
          <circle cx="42" cy="50" r="10" fill="rgba(45, 212, 191, 0.4)" stroke="#2DD4BF" strokeWidth="1.4" />
          <circle cx="42" cy="50" r="3.5" fill="#2DD4BF" />

          {/* Right daughter nucleus */}
          <circle cx="88" cy="50" r="10" fill="rgba(139, 124, 255, 0.4)" stroke="#8B7CFF" strokeWidth="1.4" />
          <circle cx="88" cy="50" r="3.5" fill="#8B7CFF" />

          {/* Cleavage furrow constriction pinch markers */}
          <path
            d="M 65 14 Q 65 50 65 86"
            stroke="#2DD4BF"
            strokeWidth="2.5"
            strokeDasharray="3 3"
            strokeOpacity="0.85"
          />
        </svg>
      </div>

      {/* ── 3. Rotating DNA Double Helix Near Corner ── */}
      <div
        className="absolute hidden sm:block"
        style={{
          bottom: '4%',
          right: '3%',
          width: 76,
          height: 180,
          animation: prefersReduced ? 'none' : 'dnaTwist 10s ease-in-out infinite',
          animationPlayState,
          willChange: prefersReduced ? 'auto' : 'transform',
        }}
      >
        <svg
          width="76"
          height="180"
          viewBox="0 0 76 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base pair rungs connecting the two helical strands */}
          {[18, 36, 54, 72, 90, 108, 126, 144, 162].map((y, idx) => {
            const phase = (idx % 4) * 0.5
            const x1 = 18 + Math.sin(phase * Math.PI) * 16
            const x2 = 58 - Math.sin(phase * Math.PI) * 16
            const color = idx % 2 === 0 ? '#2DD4BF' : '#8B7CFF'
            return (
              <g key={y}>
                <line
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke={color}
                  strokeWidth="2"
                  strokeOpacity="0.65"
                  strokeLinecap="round"
                />
                <circle cx={(x1 + x2) / 2} cy={y} r="2" fill={color} opacity="0.8" />
              </g>
            )
          })}

          {/* Strand 1 (Teal) */}
          <path
            d="M 22 8 Q 62 48 22 88 T 22 168"
            stroke="#2DD4BF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeOpacity="0.85"
            fill="none"
            style={{
              strokeDasharray: '8 2',
              animation: prefersReduced ? 'none' : 'dnaStrandFlow 12s linear infinite',
              animationPlayState,
            }}
          />

          {/* Strand 2 (Violet) */}
          <path
            d="M 54 8 Q 14 48 54 88 T 54 168"
            stroke="#8B7CFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeOpacity="0.85"
            fill="none"
            style={{
              strokeDasharray: '8 2',
              animation: prefersReduced ? 'none' : 'dnaStrandFlow 12s linear infinite',
              animationPlayState,
            }}
          />
        </svg>
      </div>
    </div>
  )
}
