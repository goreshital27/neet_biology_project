import type { ReactNode } from 'react'
import { PageShell } from '../../components/PageShell'

function MicroscopeIcon({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={{ color: 'var(--color-accent-cyan)' }}
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
    </svg>
  )
}

export function LessonPage() {
  return (
    <PageShell>
      <PlaceholderContent
        title="Lesson Player"
        subtitle="Cell Cycle & Cell Division"
        description="The 3D lesson player with interactive stages will be built in Slice 3."
        icon={<MicroscopeIcon className="w-12 h-12 mb-4" />}
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
  icon: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="flex items-center justify-center mb-4">{icon}</div>
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

