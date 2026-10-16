#!/usr/bin/env node

/**
 * NEET Biology Studio — Data Validation Script
 * Specification: §5 Data model
 *
 * Ensures all biology data adheres to strict schema constraints.
 * Fails the build if:
 * 1. Any non-sample question is missing source, year, or conceptIds.
 * 2. Any question references a nonexistent concept ID.
 * 3. Any concept has duplicate or missing identifiers.
 * 4. Any quiz question or revision note references an invalid concept.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.resolve(__dirname, '../src/data')

function readJson(filename) {
  const filePath = path.join(dataDir, filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filename}`)
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

const errors = []
const warnings = []

console.log('🔬 NEET Biology Studio — Validating Data Layer...\n')

// 1. Validate Concepts
let concepts = []
try {
  concepts = readJson('concepts.json')
  if (!Array.isArray(concepts)) {
    errors.push('concepts.json: Root must be an array')
  } else {
    const conceptIds = new Set()
    concepts.forEach((concept, idx) => {
      const loc = `concepts.json[${idx}]`
      if (!concept.id || typeof concept.id !== 'string') {
        errors.push(`${loc}: Missing or invalid "id"`)
      } else if (conceptIds.has(concept.id)) {
        errors.push(`${loc}: Duplicate concept id "${concept.id}"`)
      } else {
        conceptIds.add(concept.id)
      }

      if (!concept.title || typeof concept.title !== 'string') {
        errors.push(`${loc}: Missing or invalid "title"`)
      }
      if (!concept.summary || typeof concept.summary !== 'string') {
        errors.push(`${loc}: Missing or invalid "summary"`)
      }
      if (typeof concept.stageIndex !== 'number' || concept.stageIndex < 0) {
        errors.push(`${loc}: Missing or invalid "stageIndex" (must be non-negative integer)`)
      }
    })
    console.log(`✓ concepts.json: ${concepts.length} concepts verified`)
  }
} catch (err) {
  errors.push(`Failed reading concepts.json: ${err.message}`)
}

const validConceptIds = new Set(concepts.map((c) => c.id))

// 2. Validate Questions
let sampleQuestionCount = 0
let verifiedQuestionCount = 0

try {
  const questions = readJson('questions.json')
  if (!Array.isArray(questions)) {
    errors.push('questions.json: Root must be an array')
  } else {
    const questionIds = new Set()
    questions.forEach((q, idx) => {
      const loc = `questions.json[${idx}]`
      if (!q.id || typeof q.id !== 'string') {
        errors.push(`${loc}: Missing or invalid "id"`)
      } else if (questionIds.has(q.id)) {
        errors.push(`${loc}: Duplicate question id "${q.id}"`)
      } else {
        questionIds.add(q.id)
      }

      if (typeof q.isSample !== 'boolean') {
        errors.push(`${loc}: Missing "isSample" boolean flag (must explicitly declare sample status)`)
      } else if (q.isSample) {
        sampleQuestionCount++
      } else {
        verifiedQuestionCount++
      }

      // Spec hard constraint: non-sample questions must have source, year, and paper
      if (!q.isSample) {
        if (!q.source || typeof q.source !== 'string' || q.source.trim() === '') {
          errors.push(`${loc}: Non-sample question MUST have a verified "source"`)
        }
        if (typeof q.year !== 'number' || q.year < 1990 || q.year > 2030) {
          errors.push(`${loc}: Non-sample question MUST have a valid "year"`)
        }
        if (!q.paper || typeof q.paper !== 'string' || q.paper.trim() === '') {
          errors.push(`${loc}: Non-sample question MUST have a verified "paper"`)
        }
        if (!q.conceptId && (!Array.isArray(q.conceptIds) || q.conceptIds.length === 0)) {
          errors.push(`${loc}: Non-sample question MUST link to at least one concept in "conceptId" or "conceptIds"`)
        }
      }

      if (!q.text || typeof q.text !== 'string') {
        errors.push(`${loc}: Missing or invalid "text"`)
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`${loc}: "options" must have at least 2 choices`)
      }
      if (typeof q.answerIndex !== 'number' || q.answerIndex < 0 || (q.options && q.answerIndex >= q.options.length)) {
        errors.push(`${loc}: "answerIndex" must be a valid 0-based index into options`)
      }
      if (!q.explanation || typeof q.explanation !== 'string') {
        errors.push(`${loc}: Missing or invalid "explanation"`)
      }

      if (q.conceptId && !validConceptIds.has(q.conceptId)) {
        errors.push(`${loc}: Unknown conceptId "${q.conceptId}" referenced`)
      }
      if (Array.isArray(q.conceptIds)) {
        q.conceptIds.forEach((cId) => {
          if (!validConceptIds.has(cId)) {
            errors.push(`${loc}: Unknown conceptId "${cId}" referenced`)
          }
        })
      }
    })
    console.log(`✓ questions.json: ${questions.length} questions verified (${sampleQuestionCount} sample, ${verifiedQuestionCount} real past-year)`)
  }
} catch (err) {
  errors.push(`Failed reading questions.json: ${err.message}`)
}

const validQuestionIds = new Set(
  (() => {
    try {
      return readJson('questions.json').map((q) => q.id)
    } catch {
      return []
    }
  })()
)

// 3. Validate Videos
try {
  const videos = readJson('videos.json')
  if (!Array.isArray(videos)) {
    errors.push('videos.json: Root must be an array')
  } else {
    videos.forEach((video, vIdx) => {
      const loc = `videos.json[${vIdx}]`
      if (!video.id || typeof video.id !== 'string') errors.push(`${loc}: Missing or invalid "id"`)
      if (!video.title || typeof video.title !== 'string') errors.push(`${loc}: Missing or invalid "title"`)
      if (!video.src || typeof video.src !== 'string') errors.push(`${loc}: Missing or invalid "src"`)
      if (typeof video.durationSec !== 'number' || video.durationSec <= 0) {
        errors.push(`${loc}: Missing or invalid "durationSec" (must be positive number)`)
      }

      if (!Array.isArray(video.chapters)) {
        errors.push(`${loc}: "chapters" must be an array`)
      } else {
        video.chapters.forEach((ch, cIdx) => {
          const chLoc = `${loc}.chapters[${cIdx}]`
          if (!ch.label || typeof ch.label !== 'string') errors.push(`${chLoc}: Missing or invalid "label"`)
          if (typeof ch.startSec !== 'number' || ch.startSec < 0 || ch.startSec > video.durationSec) {
            errors.push(`${chLoc}: "startSec" must be a non-negative number within durationSec`)
          }
        })
      }

      if (!Array.isArray(video.overlays)) {
        errors.push(`${loc}: "overlays" must be an array`)
      } else {
        video.overlays.forEach((ov, oIdx) => {
          const ovLoc = `${loc}.overlays[${oIdx}]`
          if (typeof ov.startSec !== 'number' || ov.startSec < 0) {
            errors.push(`${ovLoc}: "startSec" must be a non-negative number`)
          }
          if (typeof ov.endSec !== 'number') {
            errors.push(`${ovLoc}: Missing or invalid "endSec"`)
          } else if (ov.endSec <= ov.startSec) {
            errors.push(`${ovLoc}: "endSec" (${ov.endSec}s) must be after "startSec" (${ov.startSec}s)`)
          }
          if (ov.startSec > video.durationSec || ov.endSec > video.durationSec) {
            errors.push(`${ovLoc}: Overlay (${ov.startSec}s - ${ov.endSec}s) is beyond durationSec (${video.durationSec}s)`)
          }
          if (!ov.questionId || typeof ov.questionId !== 'string') {
            errors.push(`${ovLoc}: Missing or invalid "questionId"`)
          } else if (!validQuestionIds.has(ov.questionId)) {
            errors.push(`${ovLoc}: Overlay points to missing questionId "${ov.questionId}"`)
          }
          if (typeof ov.revealAnswerAtSec === 'number') {
            if (ov.revealAnswerAtSec < ov.startSec || ov.revealAnswerAtSec > ov.endSec) {
              errors.push(`${ovLoc}: "revealAnswerAtSec" (${ov.revealAnswerAtSec}s) must be between startSec and endSec`)
            }
          }
        })
      }
    })
    console.log(`✓ videos.json: ${videos.length} videos verified`)
  }
} catch (err) {
  errors.push(`Failed reading videos.json: ${err.message}`)
}

// 3. Validate Quiz
try {
  const quiz = readJson('quiz.json')
  if (!Array.isArray(quiz)) {
    errors.push('quiz.json: Root must be an array')
  } else {
    quiz.forEach((qz, idx) => {
      const loc = `quiz.json[${idx}]`
      if (!qz.id) errors.push(`${loc}: Missing "id"`)
      if (!qz.question) errors.push(`${loc}: Missing "question"`)
      if (!Array.isArray(qz.options) || qz.options.length < 2) errors.push(`${loc}: "options" must have >= 2 items`)
      if (typeof qz.correctIndex !== 'number' || (qz.options && qz.correctIndex >= qz.options.length)) {
        errors.push(`${loc}: "correctIndex" is out of bounds`)
      }
      if (qz.conceptId && !validConceptIds.has(qz.conceptId)) {
        errors.push(`${loc}: Unknown conceptId "${qz.conceptId}"`)
      }
    })
    console.log(`✓ quiz.json: ${quiz.length} quiz questions verified`)
  }
} catch (err) {
  errors.push(`Failed reading quiz.json: ${err.message}`)
}

// 4. Validate Notes
try {
  const notes = readJson('notes.json')
  if (!Array.isArray(notes)) {
    errors.push('notes.json: Root must be an array')
  } else {
    notes.forEach((n, idx) => {
      const loc = `notes.json[${idx}]`
      if (!n.id) errors.push(`${loc}: Missing "id"`)
      if (!n.title) errors.push(`${loc}: Missing "title"`)
      if (n.conceptId && !validConceptIds.has(n.conceptId)) {
        errors.push(`${loc}: Unknown conceptId "${n.conceptId}"`)
      }
    })
    console.log(`✓ notes.json: ${notes.length} revision notes verified`)
  }
} catch (err) {
  errors.push(`Failed reading notes.json: ${err.message}`)
}

console.log('')

// Output warnings
if (warnings.length > 0) {
  console.warn('⚠️  Warnings:')
  warnings.forEach((w) => console.warn(`  - ${w}`))
}

// Output errors and exit
if (errors.length > 0) {
  console.error('❌ Data Validation Failed with errors:')
  errors.forEach((e) => console.error(`  - ${e}`))
  process.exit(1)
} else {
  console.log('🎉 All NEET data passed validation successfully!\n')
  process.exit(0)
}

