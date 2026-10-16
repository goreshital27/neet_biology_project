import conceptsData from './concepts.json'
import questionsData from './questions.json'
import quizData from './quiz.json'
import notesData from './notes.json'
import chaptersData from './chapters.json'
import videosData from './videos.json'

import type { Concept, Question, QuizQuestion, RevisionNote, Chapter, ConceptFrequency, Video } from './types'

export * from './types'

export const concepts: Concept[] = conceptsData as Concept[]
export const questions: Question[] = questionsData as Question[]
export const quizQuestions: QuizQuestion[] = quizData as QuizQuestion[]
export const revisionNotes: RevisionNote[] = notesData as RevisionNote[]
export const chapters: Chapter[] = chaptersData as Chapter[]
export const videos: Video[] = videosData as Video[]

/**
 * Computes frequency of questions testing each concept across examination years.
 */
export function getConceptFrequencies(chapterId = 'cell-cycle'): ConceptFrequency[] {
  const chapterConcepts = concepts.filter((c) => c.chapterId === chapterId)

  return chapterConcepts.map((concept) => {
    const linkedQuestions = questions.filter(
      (q) => q.conceptId === concept.id || (q.conceptIds && q.conceptIds.includes(concept.id))
    )
    const byYear: Record<number, number> = {}

    linkedQuestions.forEach((q) => {
      if (typeof q.year === 'number') {
        byYear[q.year] = (byYear[q.year] || 0) + 1
      }
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

/**
 * Computes how many distinct examination years a concept was tested in,
 * considering ONLY non-sample (verified) questions.
 * Returns 0 if there are no non-sample questions for this concept.
 */
export function getNonSamplePaperCount(conceptId: string, questionList: Question[] = questions): number {
  const nonSample = questionList.filter(
    (q) =>
      !q.isSample &&
      (q.conceptId === conceptId || q.conceptIds?.includes(conceptId)) &&
      typeof q.year === 'number'
  )
  if (nonSample.length === 0) return 0
  const distinctYears = new Set(nonSample.map((q) => q.year as number))
  return distinctYears.size
}


