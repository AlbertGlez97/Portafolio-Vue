import { MultiLanguageText } from './Personal'

export interface Experience {
  id: number
  start: string
  end?: string
  current: boolean
  role: MultiLanguageText
  company: string
  location?: string
  summary: MultiLanguageText
  technologies: string[]
  featured?: boolean
  updatedAt: string
}

export type ExperiencesData = Experience[]
