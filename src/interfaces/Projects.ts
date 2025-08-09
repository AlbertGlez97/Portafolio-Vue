import { MultiLanguageText } from './Personal'

export interface ProjectMetrics {
  responsive: string
  performance: string
  seo: MultiLanguageText
}

export interface Project {
  id: number
  title: MultiLanguageText
  type: MultiLanguageText
  description: MultiLanguageText
  features?: MultiLanguageText[]
  technologies: string[]
  metrics?: ProjectMetrics
  image?: string
  url?: string
  github?: string
  company?: string
  confidential?: boolean
}

export interface ProjectsData {
  featured: Project[]
  other: Project[]
}

export interface ProjectCardProps {
  project: Project
}

export interface TechnologyBubble {
  name: string
  size: number
}
