// Texto que puede representarse en español e inglés
export interface MultiLanguageText {
  es: string
  en: string
}

// Datos principales del perfil
export interface Profile {
  name: string
  title: MultiLanguageText
  description: MultiLanguageText
  image: string
}

// Información de contacto personal
export interface Contact {
  email: string
  phone: string
  location: MultiLanguageText
  linkedin: string
  github: string
}

// Objetivos profesionales a corto y largo plazo
export interface Goals {
  shortTerm: MultiLanguageText
  longTerm: MultiLanguageText
}

// Interés personal o profesional
export interface Interest {
  title: MultiLanguageText
  description: MultiLanguageText
  icon: string
}

// Información adicional sobre la persona
export interface About {
  goals: Goals
  interests: Interest[]
}

// Logros destacados de la trayectoria
export interface Achievement {
  title: MultiLanguageText
  description: MultiLanguageText
}

// Conjunto de datos personales completos
export interface PersonalData {
  profile: Profile
  contact: Contact
  about: About
  achievements: Achievement[]
}
