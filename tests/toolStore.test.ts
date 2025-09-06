import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useToolStore } from '@/stores'

const flush = () => vi.runAllTimers()

describe('tool store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.useFakeTimers()
  })

  it('handles CRUD operations', () => {
    const store = useToolStore()
    store.$patch({ items: [] })
    store.create({
      name: { es: 'Git', en: 'Git' },
      level: { es: 'Avanzado', en: 'Advanced' },
      description: { es: 'desc', en: 'desc' },
      category: 'tools'
    })
    flush()
    expect(store.items.length).toBe(1)
    const id = store.items[0].id

    store.update({ ...store.items[0], category: 'methodologies' })
    flush()
    expect(store.items[0].category).toBe('methodologies')

    const dupId = store.duplicate(id)
    flush()
    expect(store.items.length).toBe(2)

    store.remove(id)
    flush()
    expect(store.items.find(t => t.id === id)).toBeUndefined()
  })
})
