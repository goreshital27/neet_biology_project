/**
 * NEET Biology Studio — Data Model Types
 * Specification: §5 Data model
 */

/**
 * Biology concept within a chapter and 3D lesson stage.
 */
export interface Concept {
  /** Unique concept identifier, e.g. "mitosis-anaphase" */
  id: string
  /** Chapter identifier, e.g. "cell-cycle" */
  chapterId: string
  /** Human-readable title */
  title: string
  /** Original wording explanation, 1-2 sentences */
  summary: string
  /** Step index of the 3D lesson scene that illustrates this concept (0-based) */
  stageIndex: number
  /** High-yield exam point highlighted in NEET Alert mode */
  neetAlert?: string
}

/**
 * Question linked to one or more concepts.
 *
 * NOTE: Never invent PYQs. When real verified past questions are unavailable,
 * questions MUST have `isSample: true` and display a "Sample data" badge.
 */
export interface Question {
  /** Unique question identifier, e.g. "sample-cc-q1" */
  id: string
  /** Examination year, e.g. 2023 */
  year: number
  /** Examination paper name, e.g. "NEET Practice Sample 2023" */
  paper: string
  /** Question prompt */
  text: string
  /** Four multiple choice options */
  options: string[]
  /** Index of correct option (0-based) */
  answerIndex: number
  /** Detailed rationale in original wording */
  explanation: string
  /** IDs of concepts tested by this question (foreign keys to Concept.id) */
  conceptIds: string[]
  /** Source attribution of the question */
  source: string
  /** True if placeholder/mock question; false ONLY when verified against actual past exam papers */
  isSample: boolean
}

/**
 * End-of-topic quiz question.
 */
export interface QuizQuestion {
  /** Unique quiz question identifier */
  id: string
  /** Question prompt */
  question: string
  /** Four options */
  options: string[]
  /** Index of correct option (0-based) */
  correctIndex: number
  /** Explanation in original wording */
  explanation: string
  /** Concept ID linked to this quiz question */
  conceptId: string
  /** Question difficulty level */
  difficulty?: 'easy' | 'medium' | 'hard'
  /** Sample data indicator */
  isSample: boolean
}

/**
 * Concise revision note per concept.
 */
export interface RevisionNote {
  /** Unique note identifier */
  id: string
  /** Foreign key to Concept.id */
  conceptId: string
  /** Foreign key to chapterId */
  chapterId: string
  /** Title of the revision card */
  title: string
  /** High-yield key bullet points */
  keyTakeaways: string[]
  /** Crucial takeaway frequently tested in NEET */
  examAlert: string
  /** 1-2 sentence ultra-compact summary for 'Revise in 2 minutes' mode */
  quickReviseSummary: string
  /** Sample data indicator */
  isSample: boolean
}

/**
 * Chapter metadata.
 */
export interface Chapter {
  id: string
  title: string
  description: string
  unit: string
  totalStages: number
  isSample: boolean
}

/**
 * Computed concept frequency record across examination years.
 */
export interface ConceptFrequency {
  conceptId: string
  conceptTitle: string
  stageIndex: number
  totalCount: number
  byYear: Record<number, number>
  neetAlert?: string
  hasSampleData: boolean
}
