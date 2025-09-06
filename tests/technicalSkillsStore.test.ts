import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTechnicalSkillsStore, useToolStore } from '@/stores'

const flush = () => vi.runAllTimers()

describe('technical skills store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.useFakeTimers()
  })

  it('handles CRUD operations and sync with tools', () => {
    const tech = useTechnicalSkillsStore()
    const tool = useToolStore()
    tech.$patch({ items: [] })
    tool.$patch({ items: [] })
    tech.create({
      name: { es: 'Vue', en: 'Vue' },
      level: { es: 'Avanzado', en: 'Advanced' },
      percentage: 90,
      description: { es: 'desc', en: 'desc' },
      category: 'frontend',
      type: 'tool'
    })
    flush()
    expect(tech.items.length).toBe(1)
    expect(tool.items.length).toBe(1)
    const id = tech.items[0].id

    tech.update({ ...tech.items[0], name: { es: 'Vue3', en: 'Vue3' } })
    flush()
    expect(tech.items[0].name.es).toBe('Vue3')

    const dupId = tech.duplicate(id)
    flush()
    expect(dupId).toBeDefined()
    expect(tech.items.length).toBe(2)

    tech.remove(id)
    flush()
    expect(tech.items.find(s => s.id === id)).toBeUndefined()
  })
})
