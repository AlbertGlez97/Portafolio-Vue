import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCertificationStore } from '@/stores'

describe('certification store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('creates, updates, duplicates and removes certifications', () => {
    const store = useCertificationStore()
    store.items = []
    store.create({
      title: { es: 'Cert ES', en: 'Cert EN' },
      provider: 'Provider',
      start: '2024-01',
      end: '2024-02',
      current: false,
      description: { es: 'Desc ES', en: 'Desc EN' },
      skills: ['Vue'],
      link: '',
      featured: false
    })
    expect(store.items.length).toBe(1)
    const id = store.items[0].id

    store.update({ ...store.items[0], provider: 'New Provider' })
    expect(store.items[0].provider).toBe('New Provider')

    const dupId = store.duplicate(id)
    expect(store.items.length).toBe(2)
    expect(dupId).toBeDefined()

    store.remove(id)
    expect(store.items.find(c => c.id === id)).toBeUndefined()
  })
})
