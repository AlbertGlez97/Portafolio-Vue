export interface Skill {
  name: string
  level: string
  percentage: number
  icon: string
  description: string
}

export interface Tool {
  name: string
  level: string
  icon: string
  description: string
}

export interface Methodology {
  name: string
  level: string
  icon: string
  description: string
}

export interface SoftSkill {
  name: string
  icon: string
  description: string
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
