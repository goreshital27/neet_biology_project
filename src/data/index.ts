import conceptsData from './concepts.json'
import questionsData from './questions.json'
import quizData from './quiz.json'
import notesData from './notes.json'
import chaptersData from './chapters.json'

import type { Concept, Question, QuizQuestion, RevisionNote, Chapter, ConceptFrequency } from './types'

export * from './types'

export const concepts: Concept[] = conceptsData as Concept[]
export const questions: Question[] = questionsData as Question[]
export const quizQuestions: QuizQuestion[] = quizData as QuizQuestion[]
export const revisionNotes: RevisionNote[] = notesData as RevisionNote[]
export const chapters: Chapter[] = chaptersData as Chapter[]

/**
 * Computes frequency of questions testing each concept across examination years.
 */
export function getConceptFrequencies(chapterId = 'cell-cycle'): ConceptFrequency[] {
  const chapterConcepts = concepts.filter((c) => c.chapterId === chapterId)

  return chapterConcepts.map((concept) => {
    const linkedQuestions = questions.filter((q) => q.conceptIds.includes(concept.id))
    const byYear: Record<number, number> = {}

    linkedQuestions.forEach((q) => {
      byYear[q.year] = (byYear[q.year] || 0) + 1
    })

    const hasSampleData = linkedQuestions.some((q) => q.isSample)

    return {
      conceptId: concept.id,
      conceptTitle: concept.title,
      stageIndex: concept.stageIndex,
      totalCount: linkedQuestions.length,
      byYear,
      neetAlert: concept.neetAlert,
      hasSampleData,
    }
  })
}

