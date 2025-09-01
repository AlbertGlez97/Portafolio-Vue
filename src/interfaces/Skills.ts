import type { MultiLanguageText } from './Personal'

export interface Skill {
  name: MultiLanguageText
  level: MultiLanguageText
  percentage: number
  description: MultiLanguageText
}

export interface Tool {
  name: MultiLanguageText
  level: MultiLanguageText
  description: MultiLanguageText
}

export interface Methodology {
  name: MultiLanguageText
  level: MultiLanguageText
  description: MultiLanguageText
}

export interface SoftSkill {
  name: MultiLanguageText
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
