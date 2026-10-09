import { PageShell } from '../../components/PageShell'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MembraneButton } from '../../components/MembraneButton'
import { NeetAlertChip } from '../../components/NeetAlertChip'
import { SampleDataBadge } from '../../components/SampleDataBadge'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <PageShell>
      {/* Hero section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24">
        {/* Topic Tag + Sample Data Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-4"
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{
              color: 'var(--color-teal)',
              borderColor: 'rgba(79, 227, 200, 0.3)',
              backgroundColor: 'rgba(79, 227, 200, 0.08)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Chapter: Cell Cycle &amp; Cell Division
          </span>
          <SampleDataBadge />
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight max-w-3xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          Journey into
          <br />
          <span
            style={{
              color: 'var(--color-teal)',
              textShadow: '0 0 35px rgba(79, 227, 200, 0.4)',
            }}
          >
            the Living Cell
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl text-base sm:text-lg mb-8 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Master NEET Biology through immersive interactive 3D cellular structures.
          Connect every mitotic stage directly to past exam questions with instant exam alerts.
        </motion.p>

        {/* CTAs with biological membrane ripple */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <MembraneButton
            variant="primary"
            onClick={() => navigate('/lesson')}
            className="text-base"
          >
            Start 3D Lesson
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </MembraneButton>

          <MembraneButton
            variant="secondary"
            onClick={() => navigate('/insights')}
            className="text-base"
          >
            Explore PYQ Insights
          </MembraneButton>
        </motion.div>
      </section>

      {/* Feature cards preview with float hover */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 pb-20 max-w-5xl mx-auto">
        <FeatureCard
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 18h8" />
              <path d="M3 22h18" />
              <path d="M14 22a7 7 0 1 0 0-14h-1" />
              <path d="M9 14h2" />
              <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
              <path d="M12 6V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
            </svg>
          }
          title="3D Lesson Player"
          description="Step through the cell cycle stages with interactive 3D models and scrub controls."
          accentVar="--color-teal"
        />

        <FeatureCard
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          }
          badge={<NeetAlertChip label="High Yield" testedCount="4/5 yrs" />}
          title="NEET Alert Layer"
          description="Exam-relevant cellular structures glow dynamically with historical question frequency."
          accentVar="--color-alert"
        />

        <FeatureCard
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          }
          title="Insights Dashboard"
          description="Discover concept appearance trends across five years of past examination papers."
          accentVar="--color-violet"
        />
      </section>
    </PageShell>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  accentVar,
  badge,
}: {
  icon: React.ReactNode
  title: string
  description: string
  accentVar: string
  badge?: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-2xl p-6 border flex flex-col justify-between backdrop-blur-sm transition-shadow"
      style={{
        backgroundColor: 'rgba(14, 21, 38, 0.75)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className="p-2.5 rounded-xl border flex items-center justify-center"
            style={{
              color: `var(${accentVar})`,
              backgroundColor: 'rgba(7, 11, 20, 0.6)',
              borderColor: 'var(--color-border)',
            }}
          >
            {icon}
          </span>
          {badge}
        </div>

        <h3
          className="text-lg font-semibold mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            color: `var(${accentVar})`,
          }}
        >
          {title}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}
