/**
 * NEET Biology Studio — Chapter Background Organelle Configurations
 *
 * Configures the biological elements drifting in the living background canvas
 * based on the active curriculum chapter.
 *
 * Extensible for future chapters (e.g., Plant Cells with Chloroplasts).
 */

export type OrganelleType =
  | 'cell'
  | 'mitochondrion'
  | 'golgi'
  | 'er'
  | 'ribosome'
  | 'vesicle'
  | 'spindle'
  | 'chromosome'
  | 'chloroplast'

export interface OrganelleSpawnConfig {
  type: OrganelleType
  weight: number
  /** Allowed depth tiers: 0 = far (small/sharp), 1 = mid, 2 = near (large/blurred) */
  depthTiers?: (0 | 1 | 2)[]
}

export interface ChapterBackgroundConfig {
  chapterId: string
  title: string
  organelles: OrganelleSpawnConfig[]
}

export const CHAPTER_BACKGROUND_CONFIGS: Record<string, ChapterBackgroundConfig> = {
  'cell-cycle': {
    chapterId: 'cell-cycle',
    title: 'Cell Cycle and Cell Division',
    organelles: [
      { type: 'cell', weight: 3 },
      { type: 'mitochondrion', weight: 4 },
      { type: 'golgi', weight: 3 },
      { type: 'er', weight: 3 },
      { type: 'ribosome', weight: 5 },
      { type: 'vesicle', weight: 6 },
      // Cell Cycle & Mitosis specific organelles:
      { type: 'spindle', weight: 3 },
      { type: 'chromosome', weight: 4 },
    ],
  },
  'plant-cell': {
    chapterId: 'plant-cell',
    title: 'Plant Physiology & Cell Structure',
    organelles: [
      { type: 'cell', weight: 3 },
      { type: 'chloroplast', weight: 5 }, // Chloroplast ready for plant topics
      { type: 'mitochondrion', weight: 3 },
      { type: 'golgi', weight: 3 },
      { type: 'er', weight: 3 },
      { type: 'vesicle', weight: 5 },
    ],
  },
}

export function getBackgroundConfigForChapter(chapterId = 'cell-cycle'): ChapterBackgroundConfig {
  return CHAPTER_BACKGROUND_CONFIGS[chapterId] ?? CHAPTER_BACKGROUND_CONFIGS['cell-cycle']
}
