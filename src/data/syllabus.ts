/**
 * NEET Biology Studio — Complete Syllabus Data
 * Class 11 and Class 12 Units and Chapters
 */

export type Weightage = 'High' | 'Medium' | 'Low'
export type ChapterStatus = 'live' | 'coming-soon'

export interface StageTimestamp {
  label: string
  timestamp: number
  explanation: string
}

export interface SyllabusChapter {
  id: string
  slug: string
  title: string
  classLevel: 11 | 12
  unit: string
  weightage: Weightage
  status: ChapterStatus
  videoUrl?: string
  posterUrl?: string
  stageTimestamps?: StageTimestamp[]
  description?: string
}

export interface SyllabusUnit {
  id: string
  title: string
  classLevel: 11 | 12
  chapters: SyllabusChapter[]
}

export const syllabusUnits: SyllabusUnit[] = [
  // ──────────────── CLASS 11 UNITS ────────────────
  {
    id: 'diversity-in-the-living-world',
    title: 'Diversity in the Living World',
    classLevel: 11,
    chapters: [
      {
        id: 'the-living-world',
        slug: 'the-living-world',
        title: 'The Living World',
        classLevel: 11,
        unit: 'Diversity in the Living World',
        weightage: 'Low',
        status: 'coming-soon',
        description: 'Characteristics of living organisms, taxonomic hierarchy, and classification aids.',
      },
      {
        id: 'biological-classification',
        slug: 'biological-classification',
        title: 'Biological Classification',
        classLevel: 11,
        unit: 'Diversity in the Living World',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Five kingdom system: Monera, Protista, Fungi, Plantae, Animalia, and acellular entities.',
      },
      {
        id: 'plant-kingdom',
        slug: 'plant-kingdom',
        title: 'Plant Kingdom',
        classLevel: 11,
        unit: 'Diversity in the Living World',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperm life cycles.',
      },
      {
        id: 'animal-kingdom',
        slug: 'animal-kingdom',
        title: 'Animal Kingdom',
        classLevel: 11,
        unit: 'Diversity in the Living World',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Levels of organisation, body symmetry, germ layers, coelom, and phylum characteristics.',
      },
    ],
  },
  {
    id: 'structural-organisation',
    title: 'Structural Organisation',
    classLevel: 11,
    chapters: [
      {
        id: 'morphology-of-flowering-plants',
        slug: 'morphology-of-flowering-plants',
        title: 'Morphology of Flowering Plants',
        classLevel: 11,
        unit: 'Structural Organisation',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Modifications of roots, stems, leaves, inflorescence types, and floral diagrams.',
      },
      {
        id: 'anatomy-of-flowering-plants',
        slug: 'anatomy-of-flowering-plants',
        title: 'Anatomy of Flowering Plants',
        classLevel: 11,
        unit: 'Structural Organisation',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Meristematic and permanent tissues, vascular bundles, and secondary growth.',
      },
      {
        id: 'structural-organisation-in-animals',
        slug: 'structural-organisation-in-animals',
        title: 'Structural Organisation in Animals',
        classLevel: 11,
        unit: 'Structural Organisation',
        weightage: 'Low',
        status: 'coming-soon',
        description: 'Epithelial, connective, muscular, and nervous animal tissues and frog anatomy.',
      },
    ],
  },
  {
    id: 'cell',
    title: 'Cell: Structure & Functions',
    classLevel: 11,
    chapters: [
      {
        id: 'cell-the-unit-of-life',
        slug: 'cell-the-unit-of-life',
        title: 'Cell: The Unit of Life',
        classLevel: 11,
        unit: 'Cell: Structure & Functions',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Prokaryotic vs eukaryotic cells, membrane architecture, endomembrane system, and organelles.',
      },
      {
        id: 'biomolecules',
        slug: 'biomolecules',
        title: 'Biomolecules',
        classLevel: 11,
        unit: 'Cell: Structure & Functions',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Carbohydrates, lipids, proteins, nucleic acids, and enzyme catalytic kinetics.',
      },
      {
        id: 'cell-cycle-and-cell-division',
        slug: 'cell-cycle-and-cell-division',
        title: 'Cell Cycle and Cell Division',
        classLevel: 11,
        unit: 'Cell: Structure & Functions',
        weightage: 'High',
        status: 'live',
        videoUrl: '/videos/mitosis-lesson.mp4',
        posterUrl: '/videos/mitosis-poster.jpg',
        description: 'Stages of interphase, mitotic karyokinesis, cytokinesis, and meiotic crossing over.',
        stageTimestamps: [
          {
            label: 'Interphase',
            timestamp: 0.0,
            explanation: 'The cell prepares for division by replicating genomic DNA and centrosomes in S phase.',
          },
          {
            label: 'Prophase',
            timestamp: 12.0,
            explanation: 'Chromatin condenses into visible chromosomes while the nucleolus and nuclear envelope disassemble.',
          },
          {
            label: 'Metaphase',
            timestamp: 15.2,
            explanation: 'Chromosomes achieve peak condensation and align at the equatorial metaphase plate.',
          },
          {
            label: 'Anaphase',
            timestamp: 16.8,
            explanation: 'Centromeres split simultaneously, drawing sister chromatids toward opposite spindle poles.',
          },
          {
            label: 'Telophase',
            timestamp: 18.3,
            explanation: 'Chromosomes uncoil into diffuse chromatin while new nuclear envelopes assemble around each cluster.',
          },
          {
            label: 'Cytokinesis',
            timestamp: 19.0,
            explanation: 'In animal cells, an inward-deepening cleavage furrow partitions the cytoplasm into two daughter cells.',
          },
        ],
      },
    ],
  },
  {
    id: 'plant-physiology',
    title: 'Plant Physiology',
    classLevel: 11,
    chapters: [
      {
        id: 'transport-in-plants',
        slug: 'transport-in-plants',
        title: 'Transport in Plants',
        classLevel: 11,
        unit: 'Plant Physiology',
        weightage: 'Low',
        status: 'coming-soon',
        description: 'Water potential, transpiration pull, and phloem mass flow translocation.',
      },
      {
        id: 'mineral-nutrition',
        slug: 'mineral-nutrition',
        title: 'Mineral Nutrition',
        classLevel: 11,
        unit: 'Plant Physiology',
        weightage: 'Low',
        status: 'coming-soon',
        description: 'Essential macro/micronutrients, deficiency syndromes, and biological nitrogen fixation.',
      },
      {
        id: 'photosynthesis',
        slug: 'photosynthesis-in-higher-plants',
        title: 'Photosynthesis in Higher Plants',
        classLevel: 11,
        unit: 'Plant Physiology',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Light reaction photophosphorylation, Calvin C3 cycle, Hatch-Slack C4 pathway, and photorespiration.',
      },
      {
        id: 'respiration-in-plants',
        slug: 'respiration-in-plants',
        title: 'Respiration in Plants',
        classLevel: 11,
        unit: 'Plant Physiology',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Glycolysis, Krebs citric acid cycle, electron transport system, and ATP balance.',
      },
      {
        id: 'plant-growth-and-development',
        slug: 'plant-growth-and-development',
        title: 'Plant Growth and Development',
        classLevel: 11,
        unit: 'Plant Physiology',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Phytohormones (auxins, gibberellins, cytokinins, ethylene, ABA) and photoperiodism.',
      },
    ],
  },
  {
    id: 'human-physiology',
    title: 'Human Physiology',
    classLevel: 11,
    chapters: [
      {
        id: 'breathing-and-exchange-of-gases',
        slug: 'breathing-and-exchange-of-gases',
        title: 'Breathing and Exchange of Gases',
        classLevel: 11,
        unit: 'Human Physiology',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Respiratory volumes, partial pressure gradients, and oxygen dissociation curves.',
      },
      {
        id: 'body-fluids-and-circulation',
        slug: 'body-fluids-and-circulation',
        title: 'Body Fluids and Circulation',
        classLevel: 11,
        unit: 'Human Physiology',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Blood composition, cardiac cycle mechanics, ECG tracing, and double circulation.',
      },
      {
        id: 'excretory-products-and-elimination',
        slug: 'excretory-products-and-elimination',
        title: 'Excretory Products and Elimination',
        classLevel: 11,
        unit: 'Human Physiology',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Nephron countercurrent multiplier mechanism, RAAS regulation, and micturition.',
      },
      {
        id: 'locomotion-and-movement',
        slug: 'locomotion-and-movement',
        title: 'Locomotion and Movement',
        classLevel: 11,
        unit: 'Human Physiology',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Sliding filament muscle theory, actin-myosin cross-bridge cycles, and human skeletal system.',
      },
      {
        id: 'neural-control-and-coordination',
        slug: 'neural-control-and-coordination',
        title: 'Neural Control and Coordination',
        classLevel: 11,
        unit: 'Human Physiology',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Action potential generation, synaptic transmission, and sensory receptors.',
      },
      {
        id: 'chemical-coordination-and-integration',
        slug: 'chemical-coordination-and-integration',
        title: 'Chemical Coordination and Integration',
        classLevel: 11,
        unit: 'Human Physiology',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Endocrine glands, peptide/steroid hormone signaling pathways, and feedback loops.',
      },
    ],
  },

  // ──────────────── CLASS 12 UNITS ────────────────
  {
    id: 'reproduction',
    title: 'Reproduction',
    classLevel: 12,
    chapters: [
      {
        id: 'sexual-reproduction-in-flowering-plants',
        slug: 'sexual-reproduction-in-flowering-plants',
        title: 'Sexual Reproduction in Flowering Plants',
        classLevel: 12,
        unit: 'Reproduction',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Microsporogenesis, megasporogenesis, double fertilisation, and apomixis.',
      },
      {
        id: 'human-reproduction',
        slug: 'human-reproduction',
        title: 'Human Reproduction',
        classLevel: 12,
        unit: 'Reproduction',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Spermatogenesis, oogenesis, menstrual cycle hormonal surges, fertilisation, and embryonic cleavage.',
      },
      {
        id: 'reproductive-health',
        slug: 'reproductive-health',
        title: 'Reproductive Health',
        classLevel: 12,
        unit: 'Reproduction',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Contraceptive modalities, sexually transmitted infections, and assisted reproductive technologies (ART).',
      },
    ],
  },
  {
    id: 'genetics-and-evolution',
    title: 'Genetics and Evolution',
    classLevel: 12,
    chapters: [
      {
        id: 'principles-of-inheritance-and-variation',
        slug: 'principles-of-inheritance-and-variation',
        title: 'Principles of Inheritance and Variation',
        classLevel: 12,
        unit: 'Genetics and Evolution',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Mendelian inheritance, linkage mapping, sex determination, and chromosomal disorders.',
      },
      {
        id: 'molecular-basis-of-inheritance',
        slug: 'molecular-basis-of-inheritance',
        title: 'Molecular Basis of Inheritance',
        classLevel: 12,
        unit: 'Genetics and Evolution',
        weightage: 'High',
        status: 'coming-soon',
        description: 'DNA double helix, semiconservative replication, transcription, genetic code, translation, and lac operon.',
      },
      {
        id: 'evolution',
        slug: 'evolution',
        title: 'Evolution',
        classLevel: 12,
        unit: 'Genetics and Evolution',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Origin of life, Darwinian natural selection, homologous/analogous structures, and Hardy-Weinberg equilibrium.',
      },
    ],
  },
  {
    id: 'biology-and-human-welfare',
    title: 'Biology and Human Welfare',
    classLevel: 12,
    chapters: [
      {
        id: 'human-health-and-disease',
        slug: 'human-health-and-disease',
        title: 'Human Health and Disease',
        classLevel: 12,
        unit: 'Biology and Human Welfare',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Bacterial/viral/protozoan pathogens, innate/acquired immunity, antibody structure, AIDS, and oncology.',
      },
      {
        id: 'microbes-in-human-welfare',
        slug: 'microbes-in-human-welfare',
        title: 'Microbes in Human Welfare',
        classLevel: 12,
        unit: 'Biology and Human Welfare',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Fermentation industries, biological sewage treatment, biogas generation, and biocontrol agents.',
      },
    ],
  },
  {
    id: 'biotechnology',
    title: 'Biotechnology',
    classLevel: 12,
    chapters: [
      {
        id: 'biotechnology-principles-and-processes',
        slug: 'principles-and-processes',
        title: 'Biotechnology: Principles and Processes',
        classLevel: 12,
        unit: 'Biotechnology',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Restriction endonucleases, plasmid cloning vectors (pBR322), PCR thermocycling, and bioreactors.',
      },
      {
        id: 'biotechnology-and-its-applications',
        slug: 'applications',
        title: 'Biotechnology and its Applications',
        classLevel: 12,
        unit: 'Biotechnology',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Bt cotton, RNA interference pest defense, recombinant insulin synthesis, and gene therapy.',
      },
    ],
  },
  {
    id: 'ecology',
    title: 'Ecology & Environment',
    classLevel: 12,
    chapters: [
      {
        id: 'organisms-and-populations',
        slug: 'organisms-and-populations',
        title: 'Organisms and Populations',
        classLevel: 12,
        unit: 'Ecology & Environment',
        weightage: 'High',
        status: 'coming-soon',
        description: 'Abiotic adaptations, population growth models (logistic/exponential), and biotic interactions.',
      },
      {
        id: 'ecosystem',
        slug: 'ecosystem',
        title: 'Ecosystem',
        classLevel: 12,
        unit: 'Ecology & Environment',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Ecological pyramids of biomass/energy, nutrient biogeochemical cycling, and primary productivity.',
      },
      {
        id: 'biodiversity-and-conservation',
        slug: 'biodiversity-and-conservation',
        title: 'Biodiversity and Conservation',
        classLevel: 12,
        unit: 'Ecology & Environment',
        weightage: 'Medium',
        status: 'coming-soon',
        description: 'Species-area relationships, threats (evil quartet), in-situ vs ex-situ conservation sanctuaries.',
      },
    ],
  },
]

/**
 * Flat list of all chapters across Class 11 and Class 12.
 */
export const allSyllabusChapters: SyllabusChapter[] = syllabusUnits.flatMap((u) => u.chapters)

/**
 * Find a chapter by slug (or fallback id).
 */
export function getChapterBySlug(slug: string): SyllabusChapter | undefined {
  return allSyllabusChapters.find(
    (c) => c.slug === slug || c.id === slug || (slug === 'cell-cycle' && c.id === 'cell-cycle-and-cell-division')
  )
}
