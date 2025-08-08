export interface Subject {
  name: string
  icon: string
}

export interface AcademicEducation {
  degree: string
  institution: string
  period: string
  status: string
  description: string
  subjects: Subject[]
}

export interface Certification {
  id: number
  title: string
  provider: string
  icon: string
  description: string
}

export interface Philosophy {
  title: string
  icon: string
  description: string
}

export interface Goal {
  id: number
  title: string
  period: string
  description: string
}

export interface EducationData {
  academic: AcademicEducation
  certifications: Certification[]
  philosophy: Philosophy[]
  goals: Goal[]
}

export interface CertificationCardProps {
  certification: Certification
}
