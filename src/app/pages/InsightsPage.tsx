import { PageShell } from '../../components/PageShell'
import { InsightsView } from '../../features/insights/InsightsView'

export function InsightsPage() {
  return (
    <PageShell>
      <div className="px-4 py-12 max-w-5xl mx-auto w-full">
        <InsightsView showHeader={true} />
      </div>
    </PageShell>
  )
}
