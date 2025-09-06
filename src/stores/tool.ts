import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import type { ToolEntry, TechnicalSkill } from '../interfaces'
import data from '../data/tools.json'

interface AppStorage {
  tools?: ToolEntry[]
}

const SAVE_DELAY = 300

export const useToolStore = defineStore('tool', () => {
  const items = ref<ToolEntry[]>([])
  const initialized = ref(false)

  const load = (): ToolEntry[] => {
    if (typeof window === 'undefined') return data as ToolEntry[]
    try {
      const raw = localStorage.getItem('app')
      if (raw) {
        const parsed = JSON.parse(raw) as AppStorage
        if (parsed.tools) return parsed.tools
      }
    } catch {
      /* ignore */
    }
    return data as ToolEntry[]
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
      parsed.tools = items.value
      localStorage.setItem('app', JSON.stringify(parsed))
    }, SAVE_DELAY)
  }

  const all: ComputedRef<ToolEntry[]> = computed(() => items.value)
  const sortedByCategory = computed(() =>
    [...items.value].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return a.name.es.localeCompare(b.name.es)
    })
  )
  const categories = computed(() =>
    Array.from(new Set(items.value.map(i => i.category)))
  )

  const getById = (id: number): ToolEntry | undefined =>
    items.value.find(t => t.id === id)
  const getNextId = (): number => Math.max(0, ...items.value.map(t => t.id)) + 1

  const create = (tool: Omit<ToolEntry, 'id'>) => {
    const newTool: ToolEntry = { ...tool, id: getNextId() }
    items.value.push(newTool)
    scheduleSave()
  }

  const update = (tool: ToolEntry) => {
    const idx = items.value.findIndex(t => t.id === tool.id)
    if (idx !== -1) {
      items.value[idx] = { ...tool }
      scheduleSave()
    }
  }

  const duplicate = (id: number): number | undefined => {
    const original = getById(id)
    if (!original) return
    const copy: ToolEntry = {
      ...JSON.parse(JSON.stringify(original)),
      id: getNextId()
    }
    items.value.push(copy)
    scheduleSave()
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(t => t.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
      scheduleSave()
    }
  }

  const upsertFromSkill = (skill: TechnicalSkill) => {
    const category =
      skill.type === 'methodology'
        ? 'methodologies'
        : skill.type === 'custom'
        ? skill.customCategory || 'custom'
        : 'tools'
    const existing = items.value.find(t => t.name.es === skill.name.es)
    if (existing) {
      existing.level = skill.level
      existing.description = skill.description
      existing.category = category
    } else {
      items.value.push({
        id: getNextId(),
        name: skill.name,
        level: skill.level,
        description: skill.description,
        category
      })
    }
    scheduleSave()
  }

  return {
    items,
    ensureLoaded,
    all,
    sortedByCategory,
    categories,
    create,
    update,
    duplicate,
    remove,
    upsertFromSkill,
    getById,
    getNextId
  }
})
