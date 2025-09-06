import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useTechnicalSkillsStore } from './technicalSkills'
import { useToolStore } from './tool'
import { useSoftSkillStore } from './softSkill'

/**
 * Store alias que reagrupa los datos de habilidades desde las nuevas stores.
 * Se mantiene para compatibilidad con el código existente.
 */
export const useSkillsStore = defineStore('skills', () => {
  const tech = useTechnicalSkillsStore()
  const tool = useToolStore()
  const soft = useSoftSkillStore()

  tech.ensureLoaded()
  tool.ensureLoaded()
  soft.ensureLoaded()

  const getFrontendSkills = computed(() => tech.frontendSkills.value)
  const getBackendSkills = computed(() => tech.backendSkills.value)
  const getTools = computed(() => tool.items.filter(t => t.category === 'tools'))
  const getMethodologies = computed(() =>
    tool.items.filter(t => t.category === 'methodologies')
  )
  const getSoftSkills = computed(() => soft.items)

  return {
    getFrontendSkills,
    getBackendSkills,
    getTools,
    getMethodologies,
    getSoftSkills
  }
})
