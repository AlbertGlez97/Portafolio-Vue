import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Experience, ExperiencesData } from '../interfaces'
import experienceData from '../data/experience.json'

export const useExperienceStore = defineStore('experience', () => {
  const load = (): ExperiencesData => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('experience')
      if (stored) return JSON.parse(stored)
    }
    return experienceData as ExperiencesData
  }

  const experiences = ref<ExperiencesData>(load())

  const save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('experience', JSON.stringify(experiences.value))
    }
  }

  const getExperiences = computed(() => experiences.value)

  const getExperienceById = (id: number): Experience | undefined =>
    experiences.value.find(e => e.id === id)

  const getNextId = (): number =>
    Math.max(0, ...experiences.value.map(e => e.id)) + 1

  const addExperience = (exp: Experience) => {
    experiences.value.push(exp)
    save()
  }

  const updateExperience = (exp: Experience) => {
    const idx = experiences.value.findIndex(e => e.id === exp.id)
    if (idx !== -1) {
      experiences.value[idx] = exp
      save()
    }
  }

  const removeExperience = (id: number) => {
    const idx = experiences.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      experiences.value.splice(idx, 1)
      save()
    }
  }

  const duplicateExperience = (id: number): Experience | null => {
    const original = getExperienceById(id)
    if (!original) return null
    const copy: Experience = JSON.parse(JSON.stringify(original))
    copy.id = getNextId()
    copy.updatedAt = new Date().toISOString()
    return copy
  }

  return {
    experiences,
    getExperiences,
    getExperienceById,
    getNextId,
    addExperience,
    updateExperience,
    removeExperience,
    duplicateExperience
  }
})
