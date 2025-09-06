import { MultiLanguageText } from './Personal'

export interface Subject {
  name: MultiLanguageText
  icon: string
}

export interface AcademicEducation {
  degree: MultiLanguageText
  institution: string
  period: string
  status: MultiLanguageText
  description: MultiLanguageText
  subjects: Subject[]
}

export interface EducationCertification {
  id: number
  title: MultiLanguageText
  provider: string
  icon: string
  description: MultiLanguageText
}

export interface Philosophy {
  title: MultiLanguageText
  icon: string
  description: MultiLanguageText
}

export interface Goal {
  id: number
  title: MultiLanguageText
  period: MultiLanguageText
  description: MultiLanguageText
}

export interface EducationData {
  academic: AcademicEducation
  certifications: EducationCertification[]
  philosophy: Philosophy[]
  goals: Goal[]
}

export interface CertificationCardProps {
  certification: EducationCertification
}
