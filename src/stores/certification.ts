import { defineStore } from 'pinia'
import { ref, computed, type ComputedRef } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Certification, EducationCertification } from '../interfaces'
import certificationsData from '../data/certifications.json'


export const useCertificationStore = defineStore('certifications', () => {
  const items = ref<Certification[]>(certificationsData as Certification[])
  const initialized = ref(true)

  const ensureLoaded = async (): Promise<void> => {
    // Data is already loaded from JSON import
  }


  const all: ComputedRef<Certification[]> = computed(() => items.value)
  const publicList: ComputedRef<Certification[]> = computed(() =>
    [...items.value].sort((a, b) => a.id - b.id)
  )

  const toEducationFormat = (cert: Certification): EducationCertification => ({
    id: cert.id,
    title: cert.title,
    provider: cert.provider,
    icon: cert.icon,
    description: cert.description
  })

  const getCertificationById = (id: number): Certification | undefined =>
    items.value.find(c => c.id === id)


  const create = (cert: Omit<Certification, 'id' | 'updatedAt'>) => {
    const newCert: Certification = {
      ...cert,
      id: uuidv4(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(newCert)
  }

  const update = (cert: Certification) => {
    const idx = items.value.findIndex(c => c.id === cert.id)
    if (idx !== -1) {
      items.value[idx] = { ...cert, updatedAt: new Date().toISOString() }
    }
  }

  const duplicate = (id: number): string | undefined => {
    const original = getCertificationById(id)
    if (!original) return
    const copy: Certification = {
      ...JSON.parse(JSON.stringify(original)),
      id: uuidv4(),
      updatedAt: new Date().toISOString()
    }
    items.value.push(copy)
    return copy.id
  }

  const remove = (id: number) => {
    const idx = items.value.findIndex(c => c.id === id)
    if (idx !== -1) {
      items.value.splice(idx, 1)
    }
  }
  return {
    items,
    ensureLoaded,
    all,
    publicList,
    toEducationFormat,
    create,
    update,
    duplicate,
    remove,
    getCertificationById
  }
})
