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

/**
 * Habilidad técnica editable desde el panel de administración.
 * Incluye identificador, categoría (frontend/back) y un tipo opcional
 * para sincronizarse con el store de herramientas/metodologías.
 */
export interface TechnicalSkill extends Skill {
  id: number
  category: 'frontend' | 'backend'
  type?: 'tool' | 'methodology' | 'custom'
  customCategory?: string
}

/** Entrada de herramienta o metodología administrable */
export interface ToolEntry {
  id: number
  name: MultiLanguageText
  level: MultiLanguageText
  description: MultiLanguageText
  category: string
}

/** Habilidad blanda con identificador para CRUD */
export interface SoftSkillEntry extends SoftSkill {
  id: number
}
