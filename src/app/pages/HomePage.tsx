import { PageShell } from '../../components/PageShell'
import { NavLink } from 'react-router-dom'

export function HomePage() {
  return (
    <PageShell>
      {/* Hero section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24">
        <p
          className="text-sm font-medium uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-mono)' }}
        >
          Cell Cycle &amp; Cell Division
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          Journey into
          <br />
          <span style={{ color: 'var(--color-accent-cyan)' }}>the Cell</span>
        </h1>
        <p
          className="max-w-lg text-lg mb-8"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Learn NEET Biology through immersive 3D explorations. See how each concept
          has been tested in past papers — and master it.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <NavLink
            to="/lesson"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base transition-all"
            style={{
              backgroundColor: 'var(--color-accent-cyan)',
              color: 'var(--color-text-inverse)',
              boxShadow: 'var(--shadow-glow-cyan)',
            }}
          >
            Start Lesson →
          </NavLink>
          <NavLink
            to="/insights"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base transition-all border"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            View Insights
          </NavLink>
        </div>
      </section>

      {/* Feature cards preview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-16 max-w-5xl mx-auto">
        <FeatureCard
          icon="🔬"
          title="3D Lesson Player"
          description="Interactive stages with step-by-step cell division models."
          accentVar="--color-accent-cyan"
        />
        <FeatureCard
          icon="🔥"
          title="NEET Alerts"
          description="See which concepts are tested most — exam-relevant parts glow."
          accentVar="--color-alert"
        />
        <FeatureCard
          icon="📊"
          title="Insights Dashboard"
          description="Concept frequency across five years of past papers."
          accentVar="--color-accent-purple"
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
}: {
  icon: string
  title: string
  description: string
  accentVar: string
}) {
  return (
    <div
      className="rounded-xl p-6 border transition-all"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)',
      }}
    >
      <span className="text-2xl mb-3 block" aria-hidden="true">
        {icon}
      </span>
      <h3
        className="text-lg font-semibold mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          color: `var(${accentVar})`,
        }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {description}
      </p>
    </div>
  )
}

