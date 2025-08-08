export interface ProjectMetrics {
  responsive: string
  performance: string
  seo: string
}

export interface Project {
  id: number
  title: string
  type: string
  description: string
  features?: string[]
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
