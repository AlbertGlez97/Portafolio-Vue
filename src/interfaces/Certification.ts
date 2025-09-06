import { MultiLanguageText } from './Personal'

export interface Certification {
  id: number
  title: MultiLanguageText
  provider: string
  start: string
  end?: string
  current: boolean
  description: MultiLanguageText
  skills: string[]
  link?: string
  featured: boolean
  updatedAt: string
}

export type CertificationsData = Certification[]
