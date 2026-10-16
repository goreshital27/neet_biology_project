import { PageShell } from '../../components/PageShell'
import { NotesView } from '../../features/notes/NotesView'

export function NotesPage() {
  return (
    <PageShell>
      <div className="px-4 py-12 max-w-5xl mx-auto w-full">
        <NotesView showHeader={true} />
      </div>
    </PageShell>
  )
}
