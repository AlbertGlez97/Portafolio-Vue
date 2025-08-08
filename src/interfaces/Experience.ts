export interface Job {
  id: number
  title: string
  company: string
  period: string
  duration: string
  type: 'current' | 'previous' | 'internship'
  description: string
  achievements: string[]
  technologies: string[]
  icon: string
}

export interface ExperienceData {
  jobs: Job[]
}

export interface ExperienceCardProps {
  job: Job
}
