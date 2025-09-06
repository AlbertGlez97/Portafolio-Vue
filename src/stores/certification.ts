import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import type { Certification } from '../interfaces'
import certificationsData from '../data/certifications.json'

interface AppStorage {
  certifications?: Certification[]
}

const SAVE_DELAY = 300

export const useCertificationStore = defineStore('certifications', () => {
  const items = ref<Certification[]>([])
  const initialized = ref(false)

  const load = (): Certification[] => {
    if (typeof window === 'undefined') return certificationsData as Certification[]
    try {
      const raw = localStorage.getItem('app')
      if (raw) {
        const parsed = JSON.parse(raw) as AppStorage
        if (parsed.certifications) return parsed.certifications
      }
    } catch {
      /* ignore */
    }
    return certificationsData as Certification[]
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
      parsed.certifications = items.value
      localStorage.setItem('app', JSON.stringify(parsed))
    }, SAVE_DELAY)
  }

  const all: ComputedRef<Certification[]> = computed(() => items.value)
  const sortedByDate: ComputedRef<Certification[]> = computed(() =>
    [...items.value].sort((a, b) => {
      if (a.current !== b.current) return a.current ? -1 : 1
      return b.start.localeCompare(a.start)
    })
  )
  const publicList: ComputedRef<Certification[]> = computed(() => sortedByDate.value ?? [])

  const getCertificationById = (id: number): Certification | undefined =>
    items.value.find(c => c.id === id)

  const getNextId = (): number => Math.max(0, ...items.value.map(c => c.id)) + 1

  const create = (cert: Omit<Certification, 'id' | 'updatedAt'>) => {
    const newCert: Certification = {
      ...cert,
      id: getNextId(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(newCert)
    scheduleSave()
  }

  const update = (cert: Certification) => {
    const idx = items.value.findIndex(c => c.id === cert.id)
    if (idx !== -1) {
      items.value[idx] = { ...cert, updatedAt: new Date().toISOString() }
      scheduleSave()
    }
  }

  const duplicate = (id: number): number | undefined => {
    const original = getCertificationById(id)
    if (!original) return
    const copy: Certification = {
      ...JSON.parse(JSON.stringify(original)),
      id: getNextId(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(copy)
    scheduleSave()
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(c => c.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
      scheduleSave()
    }
  }

  const toggleFeatured = (id: number) => {
    const cert = getCertificationById(id)
    if (cert) {
      cert.featured = !cert.featured
      cert.updatedAt = new Date().toISOString()
      scheduleSave()
    }
  }

  return {
    items,
    ensureLoaded,
    all,
    sortedByDate,
    publicList,
    create,
    update,
    duplicate,
    remove,
    toggleFeatured,
    getCertificationById,
    getNextId
  }
})
