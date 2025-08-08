export interface MultiLanguageText {
  es: string
  en: string
}

export interface Profile {
  name: string
  title: string
  description: MultiLanguageText
  image: string
}

export interface Contact {
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

export interface Goals {
  shortTerm: MultiLanguageText
  longTerm: MultiLanguageText
}

export interface Interest {
  title: MultiLanguageText
  description: MultiLanguageText
  icon: string
}

export interface About {
  goals: Goals
  interests: Interest[]
}

export interface Achievement {
  title: MultiLanguageText
  description: MultiLanguageText
}

export interface PersonalData {
  profile: Profile
  contact: Contact
  about: About
  achievements: Achievement[]
}
