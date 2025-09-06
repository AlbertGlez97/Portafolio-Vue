import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { EducationData, EducationCertification } from '../interfaces'
import educationData from '../data/education.json'

/**
 * Store que gestiona formación académica, certificaciones y metas.
 */
export const useEducationStore = defineStore('education', () => {
  // --- State ---
  const education: EducationData = educationData

  // --- Getters ---
  const getEducation = computed(() => education)
  const getAcademicEducation = computed(() => education.academic)
  const getCertifications = computed(() => education.certifications)
  const getPhilosophy = computed(() => education.philosophy)
  const getGoals = computed(() => education.goals)

  // Agrupa certificaciones por proveedor para facilitar su renderizado
  const getCertificationsByProvider = computed(() => {
    const providers: { [key: string]: EducationCertification[] } = {}
    education.certifications.forEach(cert => {
      if (!providers[cert.provider]) {
        providers[cert.provider] = []
      }
      providers[cert.provider].push(cert)
    })
    return providers
  })

  // Número total de certificaciones registradas
  const getTotalCertifications = computed(() => education.certifications.length)

  // --- Actions ---
  // Recupera una certificación por ID
  const getCertificationById = (id: number): EducationCertification | undefined => {
    return education.certifications.find(cert => cert.id === id)
  }

  // Filtra certificaciones por proveedor
  const getCertificationsByProviderName = (provider: string): EducationCertification[] => {
    return education.certifications.filter(cert =>
      cert.provider.toLowerCase().includes(provider.toLowerCase())
    )
  }

  // Recupera una meta por su identificador
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
