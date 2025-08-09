import type { MultiLanguageText } from './Personal'

export interface Skill {
  name: MultiLanguageText
  level: MultiLanguageText
  percentage: number
  icon: string
  description: MultiLanguageText
}

export interface Tool {
  name: MultiLanguageText
  level: MultiLanguageText
  icon: string
  description: MultiLanguageText
}

export interface Methodology {
  name: MultiLanguageText
  level: MultiLanguageText
  icon: string
  description: MultiLanguageText
}

export interface SoftSkill {
  name: MultiLanguageText
  icon: string
  description: MultiLanguageText
}

export interface TechnicalSkills {
  frontend: Skill[]
  backend: Skill[]
}

export interface SkillsData {
  technical: TechnicalSkills
  tools: Tool[]
  methodologies: Methodology[]
  soft: SoftSkill[]
}

export interface SkillBarProps {
  skill: Skill
}
