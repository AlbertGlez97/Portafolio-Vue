import { MultiLanguageText } from './Personal'

export interface Job {
  id: number
  title: MultiLanguageText
  company: string
  period: MultiLanguageText
  duration: MultiLanguageText
  type: 'current' | 'previous' | 'internship'
  description: MultiLanguageText
  achievements: MultiLanguageText[]
  technologies: string[]
  icon: string
}

export interface ExperienceData {
  jobs: Job[]
}

export interface ExperienceCardProps {
  job: Job
}
