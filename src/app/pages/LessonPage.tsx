import { PageShell } from '../../components/PageShell'

export function LessonPage() {
  return (
    <PageShell>
      <PlaceholderContent
        title="Lesson Player"
        subtitle="Cell Cycle & Cell Division"
        description="The 3D lesson player with interactive stages will be built in Slice 3."
        icon="🔬"
      />
    </PageShell>
  )
}

function PlaceholderContent({
  title,
  subtitle,
  description,
  icon,
}: {
  title: string
  subtitle: string
  description: string
  icon: string
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="text-4xl mb-4" aria-hidden="true">{icon}</span>
      <p
        className="text-xs font-medium uppercase tracking-widest mb-2"
        style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-mono)' }}
      >
        {subtitle}
      </p>
      <h1
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {title}
      </h1>
      <p style={{ color: 'var(--color-text-muted)' }}>{description}</p>

      <div
        className="mt-8 rounded-xl border-2 border-dashed p-12 w-full max-w-2xl"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <p
          className="text-sm"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Coming soon
        </p>
      </div>
    </div>
  )
}
