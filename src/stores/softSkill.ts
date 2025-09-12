import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import type { SoftSkillEntry } from '../interfaces'
import data from '../data/softSkills.json'

export const useSoftSkillStore = defineStore('softSkill', () => {
  const items = ref<SoftSkillEntry[]>(data as SoftSkillEntry[])
  const initialized = ref(true)

  const ensureLoaded = async (): Promise<void> => {
    // Data is already loaded from JSON import
  }

  const all: ComputedRef<SoftSkillEntry[]> = computed(() => items.value)
  const sorted = computed(() =>
    [...items.value].sort((a, b) => a.name.es.localeCompare(b.name.es))
  )

  const getById = (id: number): SoftSkillEntry | undefined =>
    items.value.find(s => s.id === id)
  const getNextId = (): number => Math.max(0, ...items.value.map(s => s.id)) + 1

  const create = (skill: Omit<SoftSkillEntry, 'id'>) => {
    const newSkill: SoftSkillEntry = { ...skill, id: getNextId() }
    items.value.push(newSkill)
  }

  const update = (skill: SoftSkillEntry) => {
    const idx = items.value.findIndex(s => s.id === skill.id)
    if (idx !== -1) {
      items.value[idx] = { ...skill }
    }
  }

  const duplicate = (id: number): number | undefined => {
    const original = getById(id)
    if (!original) return
    const copy: SoftSkillEntry = {
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
    sorted,
    create,
    update,
    duplicate,
    remove,
    getById,
    getNextId
  }
})
