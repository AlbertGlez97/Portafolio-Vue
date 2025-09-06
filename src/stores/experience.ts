import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Experience } from '../interfaces'
import experienceData from '../data/experience.json'

interface AppStorage {
  experience?: Experience[]
}

// Delay in ms for debounced localStorage writes
const SAVE_DELAY = 300

export const useExperienceStore = defineStore('experience', () => {
  // --- State -------------------------------------------------------------
  const items = ref<Experience[]>([])
  const initialized = ref(false)

  const load = (): Experience[] => {
    if (typeof window === 'undefined') return experienceData as Experience[]
    try {
      const raw = localStorage.getItem('app')
      if (raw) {
        const parsed = JSON.parse(raw) as AppStorage
        if (parsed.experience) return parsed.experience
      }
    } catch {
      /* ignore parse errors */
    }
    return experienceData as Experience[]
  }

  const ensureLoaded = async () => {
    if (initialized.value) return
    items.value = load()
    initialized.value = true
  }

  // Persist to localStorage with a small debounce
  let saveTimer: number | null = null
  const scheduleSave = () => {
    if (typeof window === 'undefined') return
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = window.setTimeout(() => {
      const raw = localStorage.getItem('app')
      const parsed: AppStorage = raw ? JSON.parse(raw) : {}
      parsed.experience = items.value
      localStorage.setItem('app', JSON.stringify(parsed))
    }, SAVE_DELAY)
  }

  // --- Getters ----------------------------------------------------------
  const all = computed(() => items.value)
  const sortedByPeriod = computed(() =>
    [...items.value].sort((a, b) => {
      if (a.current !== b.current) return a.current ? -1 : 1
      return b.start.localeCompare(a.start)
    })
  )
  // Lista pública usada por el timeline
  const publicList = computed(() => sortedByPeriod.value)

  const getExperienceById = (id: number): Experience | undefined =>
    items.value.find(e => e.id === id)

  const getNextId = (): number =>
    Math.max(0, ...items.value.map(e => e.id)) + 1

  // --- Actions ---------------------------------------------------------
  const create = (exp: Omit<Experience, 'id' | 'updatedAt'>) => {
    const newExp: Experience = {
      ...exp,
      id: getNextId(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(newExp)
    scheduleSave()
  }

  const update = (exp: Experience) => {
    const idx = items.value.findIndex(e => e.id === exp.id)
    if (idx !== -1) {
      items.value[idx] = {
        ...exp,
        updatedAt: new Date().toISOString()
      }
      scheduleSave()
    }
  }

  const duplicate = (id: number): number | undefined => {
    const original = getExperienceById(id)
    if (!original) return
    const copy: Experience = {
      ...JSON.parse(JSON.stringify(original)),
      id: getNextId(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(copy)
    scheduleSave()
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
      scheduleSave()
    }
  }

  const toggleFeatured = (id: number) => {
    const exp = getExperienceById(id)
    if (exp) {
      exp.featured = !exp.featured
      exp.updatedAt = new Date().toISOString()
      scheduleSave()
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
    getExperienceById,
    getNextId
  }
})
