import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSoftSkillStore } from '@/stores'

const flush = () => vi.runAllTimers()

describe('soft skill store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.useFakeTimers()
  })

  it('handles CRUD operations', () => {
    const store = useSoftSkillStore()
    store.$patch({ items: [] })
    store.create({
      name: { es: 'Comunicacion', en: 'Communication' },
      description: { es: 'desc', en: 'desc' }
    })
    flush()
    expect(store.items.length).toBe(1)
    const id = store.items[0].id

    store.update({ ...store.items[0], name: { es: 'Colaboración', en: 'Collaboration' } })
    flush()
    expect(store.items[0].name.es).toBe('Colaboración')

    const dupId = store.duplicate(id)
    flush()
    expect(store.items.length).toBe(2)

    store.remove(id)
    flush()
    expect(store.items.find(s => s.id === id)).toBeUndefined()
  })
})
