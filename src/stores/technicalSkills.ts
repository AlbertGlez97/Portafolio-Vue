import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import type { TechnicalSkill } from '../interfaces'
import data from '../data/technicalSkills.json'
import { useToolStore } from './tool'

export const levelToPercentage = (level: string): number => {
  const map: Record<string, number> = {
    Básico: 40,
    Basico: 40,
    Intermedio: 60,
    Avanzado: 80,
    Experto: 95,
    Adaptable: 60
  }
  return map[level] ?? 50
}

export const useTechnicalSkillsStore = defineStore('technicalSkills', () => {
  const items = ref<TechnicalSkill[]>(data as TechnicalSkill[])
  const initialized = ref(true)

  const ensureLoaded = async (): Promise<void> => {
    // Data is already loaded from JSON import
  }

  const all: ComputedRef<TechnicalSkill[]> = computed(() => items.value)
  const sortedByCategory: ComputedRef<TechnicalSkill[]> = computed(() =>
    [...items.value].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return a.name.es.localeCompare(b.name.es)
    })
  )
  const frontendSkills = computed(() =>
    sortedByCategory.value.filter(s => s.category === 'frontend')
  )
  const backendSkills = computed(() =>
    sortedByCategory.value.filter(s => s.category === 'backend')
  )

  const getById = (id: number): TechnicalSkill | undefined =>
    items.value.find(s => s.id === id)
  const getNextId = (): number => Math.max(0, ...items.value.map(s => s.id)) + 1

  const syncWithTools = (skill: TechnicalSkill) => {
    if (!skill.type) return
    const toolStore = useToolStore()
    toolStore.upsertFromSkill(skill)
  }

  const create = (skill: Omit<TechnicalSkill, 'id'>) => {
    const newSkill: TechnicalSkill = { ...skill, id: getNextId() }
    if (!newSkill.percentage) {
      newSkill.percentage = levelToPercentage(newSkill.level.es)
    }
    items.value.push(newSkill)
    syncWithTools(newSkill)
  }

  const update = (skill: TechnicalSkill) => {
    const idx = items.value.findIndex(s => s.id === skill.id)
    if (idx !== -1) {
      items.value[idx] = { ...skill }
      syncWithTools(items.value[idx])
    }
  }

  const duplicate = (id: number): number | undefined => {
    const original = getById(id)
    if (!original) return
    const copy: TechnicalSkill = {
      ...JSON.parse(JSON.stringify(original)),
      id: getNextId()
    }
    items.value.push(copy)
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
    }
  }

  return {
    items,
    ensureLoaded,
    all,
    sortedByCategory,
    frontendSkills,
    backendSkills,
    create,
    update,
    duplicate,
    remove,
    getById,
    getNextId,
    levelToPercentage
  }
})
