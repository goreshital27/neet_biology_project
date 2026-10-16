import { PageShell } from '../../components/PageShell'
import { QuizView } from '../../features/quiz/QuizView'

export function QuizPage() {
  return (
    <PageShell>
      <div className="px-4 py-12 max-w-4xl mx-auto w-full">
        <QuizView showHeader={true} />
      </div>
    </PageShell>
  )
}
