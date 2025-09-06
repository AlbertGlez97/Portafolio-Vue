import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCertificationStore, useEducationStore } from '@/stores'
import type { Certification } from '@/interfaces'

// helper to flush debounce timers
const flush = () => vi.runAllTimers()


describe('certification store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.useFakeTimers()
  })

  it('creates, updates, duplicates and removes certifications and saves to localStorage', () => {
    const store = useCertificationStore()
    store.$patch({ items: [] })
    store.create({
      title: { es: 'Cert ES', en: 'Cert EN' },
      provider: 'Provider',
      icon: 'icon',
      description: { es: 'Desc ES', en: 'Desc EN' }
    })
    flush()
    expect(store.items.length).toBe(1)
    const saved = JSON.parse(localStorage.getItem('app') || '{}')
    expect(saved.certifications.length).toBe(1)
    const id = store.items[0].id

    store.update({ ...store.items[0], provider: 'New Provider' })
    flush()
    expect(store.items[0].provider).toBe('New Provider')
    const savedAfter = JSON.parse(localStorage.getItem('app') || '{}')
    expect(savedAfter.certifications[0].provider).toBe('New Provider')

    const dupId = store.duplicate(id)
    flush()
    expect(store.items.length).toBe(2)
    expect(dupId).toBeDefined()

    store.remove(id)
    flush()
    expect(store.items.find(c => c.id === id)).toBeUndefined()
  })

  it('converts to education format and syncs with education store', async () => {
    const certStore = useCertificationStore()
    certStore.$patch({ items: [] })
    certStore.create({
      title: { es: 'A', en: 'A' },
      provider: 'P',
      icon: 'I',
      description: { es: 'D', en: 'D' }
    })
    flush()
    await certStore.ensureLoaded()
    const cert: Certification = certStore.items[0]
    const eduFormatted = certStore.toEducationFormat(cert)
    expect(eduFormatted).toEqual({
      id: cert.id,
      title: cert.title,
      provider: cert.provider,
      icon: cert.icon,
      description: cert.description
    })

    const eduStore = useEducationStore()
    expect(eduStore.getEducation).toBeDefined()
    certStore.update({ ...certStore.items[0], provider: 'Q' })
    flush()
    await Promise.resolve()
    expect(eduStore.getEducation).toBeDefined()
  })
})
