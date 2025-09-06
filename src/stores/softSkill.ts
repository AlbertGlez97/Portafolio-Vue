import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import type { SoftSkillEntry } from '../interfaces'
import data from '../data/softSkills.json'

interface AppStorage {
  softSkills?: SoftSkillEntry[]
}

const SAVE_DELAY = 300

export const useSoftSkillStore = defineStore('softSkill', () => {
  const items = ref<SoftSkillEntry[]>([])
  const initialized = ref(false)

  const load = (): SoftSkillEntry[] => {
    if (typeof window === 'undefined') return data as SoftSkillEntry[]
    try {
      const raw = localStorage.getItem('app')
      if (raw) {
        const parsed = JSON.parse(raw) as AppStorage
        if (parsed.softSkills) return parsed.softSkills
      }
    } catch {
      /* ignore */
    }
    return data as SoftSkillEntry[]
  }

  const ensureLoaded = async (): Promise<void> => {
    if (initialized.value) return
    try {
      items.value = load()
    } catch {
      items.value = []
    } finally {
      initialized.value = true
    }
  }

  let saveTimer: number | null = null
  const scheduleSave = () => {
    if (typeof window === 'undefined') return
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = window.setTimeout(() => {
      let parsed: AppStorage = {}
      const raw = localStorage.getItem('app')
      try {
        parsed = raw ? JSON.parse(raw) : {}
      } catch {
        parsed = {}
      }
      parsed.softSkills = items.value
      localStorage.setItem('app', JSON.stringify(parsed))
    }, SAVE_DELAY)
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
    scheduleSave()
  }

  const update = (skill: SoftSkillEntry) => {
    const idx = items.value.findIndex(s => s.id === skill.id)
    if (idx !== -1) {
      items.value[idx] = { ...skill }
      scheduleSave()
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
    scheduleSave()
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
      scheduleSave()
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
