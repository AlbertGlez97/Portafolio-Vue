import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import type { ToolEntry, TechnicalSkill } from '../interfaces'
import data from '../data/tools.json'

export const useToolStore = defineStore('tool', () => {
  const items = ref<ToolEntry[]>(data as ToolEntry[])
  const initialized = ref(true)

  const ensureLoaded = async (): Promise<void> => {
    // Data is already loaded from JSON import
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
  }

  const update = (tool: ToolEntry) => {
    const idx = items.value.findIndex(t => t.id === tool.id)
    if (idx !== -1) {
      items.value[idx] = { ...tool }
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
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(t => t.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
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
