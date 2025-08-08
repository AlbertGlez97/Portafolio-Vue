import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { EducationData, Certification } from '../interfaces'
import educationData from '../data/education.json'

export const useEducationStore = defineStore('education', () => {
  // State
  const education: EducationData = educationData

  // Getters
  const getEducation = computed(() => education)
  
  const getAcademicEducation = computed(() => education.academic)
  
  const getCertifications = computed(() => education.certifications)
  
  const getPhilosophy = computed(() => education.philosophy)
  
  const getGoals = computed(() => education.goals)

  const getCertificationsByProvider = computed(() => {
    const providers: { [key: string]: Certification[] } = {}
    education.certifications.forEach(cert => {
      if (!providers[cert.provider]) {
        providers[cert.provider] = []
      }
      providers[cert.provider].push(cert)
    })
    return providers
  })

  const getTotalCertifications = computed(() => education.certifications.length)

  // Actions
  const getCertificationById = (id: number): Certification | undefined => {
    return education.certifications.find(cert => cert.id === id)
  }

  const getCertificationsByProviderName = (provider: string): Certification[] => {
    return education.certifications.filter(cert => 
      cert.provider.toLowerCase().includes(provider.toLowerCase())
    )
  }

  const getGoalById = (id: number) => {
    return education.goals.find(goal => goal.id === id)
  }

  return {
    // State
    education,
    
    // Getters
    getEducation,
    getAcademicEducation,
    getCertifications,
    getPhilosophy,
    getGoals,
    getCertificationsByProvider,
    getTotalCertifications,
    
    // Actions
    getCertificationById,
    getCertificationsByProviderName,
    getGoalById
  }
})
