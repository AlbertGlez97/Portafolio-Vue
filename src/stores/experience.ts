import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Experience } from '../interfaces'
import experienceData from '../data/experience.json'


export const useExperienceStore = defineStore('experience', () => {
  // --- State -------------------------------------------------------------
  const items = ref<Experience[]>(experienceData as Experience[])
  const initialized = ref(true)

  const ensureLoaded = async (): Promise<void> => {
    // Data is already loaded from JSON import
  }


  // --- Getters ----------------------------------------------------------
  const all: ComputedRef<Experience[]> = computed(() => items.value)
  const sortedByPeriod: ComputedRef<Experience[]> = computed(() =>
    [...items.value].sort((a, b) => {
      if (a.current !== b.current) return a.current ? -1 : 1
      return b.start.localeCompare(a.start)
    })
  )
  // Lista pública usada por el timeline
  const publicList: ComputedRef<Experience[]> = computed(() =>
    sortedByPeriod.value ?? []
  )

  const getExperienceById = (id: number): Experience | undefined =>
    items.value.find(e => e.id === id)


  // --- Actions ---------------------------------------------------------
  const create = (exp: Omit<Experience, 'id' | 'updatedAt'>) => {
    const newExp: Experience = {
      ...exp,
      id: uuidv4(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(newExp)
  }

  const update = (exp: Experience) => {
    const idx = items.value.findIndex(e => e.id === exp.id)
    if (idx !== -1) {
      items.value[idx] = {
        ...exp,
        updatedAt: new Date().toISOString()
      }
      }
  }

  const duplicate = (id: number): string | undefined => {
    const original = getExperienceById(id)
    if (!original) return
    const copy: Experience = {
      ...JSON.parse(JSON.stringify(original)),
      id: uuidv4(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(copy)
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
      }
  }

  const toggleFeatured = (id: number) => {
    const exp = getExperienceById(id)
    if (exp) {
      exp.featured = !exp.featured
      exp.updatedAt = new Date().toISOString()
      }
  }

  return {
    // state
    items,
    ensureLoaded,
    // getters
    all,
    sortedByPeriod,
    publicList,
    // actions
    create,
    update,
    duplicate,
    remove,
    toggleFeatured,
    getExperienceById
  }
})
