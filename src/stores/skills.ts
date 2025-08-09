import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { SkillsData } from '../interfaces'
import skillsData from '../data/skills.json'

export const useSkillsStore = defineStore('skills', () => {
  // State
  const skills: SkillsData = skillsData

  // Getters
  const getSkills = computed(() => skills)
  
  const getTechnicalSkills = computed(() => skills.technical)
  
  const getFrontendSkills = computed(() => skills.technical.frontend)
  
  const getBackendSkills = computed(() => skills.technical.backend)
  
  const getTools = computed(() => skills.tools)
  
  const getMethodologies = computed(() => skills.methodologies)
  
  const getSoftSkills = computed(() => skills.soft)

  // Actions
  const getSkillByName = (name: string) => {
    const allSkills = [...skills.technical.frontend, ...skills.technical.backend]
    return allSkills.find(
      skill =>
        skill.name.es.toLowerCase() === name.toLowerCase() ||
        skill.name.en.toLowerCase() === name.toLowerCase()
    )
  }

  const getToolByName = (name: string) => {
    return skills.tools.find(
      tool =>
        tool.name.es.toLowerCase() === name.toLowerCase() ||
        tool.name.en.toLowerCase() === name.toLowerCase()
    )
  }

  return {
    // State
    skills,
    
    // Getters
    getSkills,
    getTechnicalSkills,
    getFrontendSkills,
    getBackendSkills,
    getTools,
    getMethodologies,
    getSoftSkills,
    
    // Actions
    getSkillByName,
    getToolByName
  }
})
