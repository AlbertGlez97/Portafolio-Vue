import { defineStore } from 'pinia'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { EducationData, EducationCertification } from '../interfaces'
import educationData from '../data/education.json'
import { useCertificationStore } from './certification'

/**
 * Store que gestiona formación académica, certificaciones y metas.
 */
export const useEducationStore = defineStore('education', () => {
  const certificationStore = useCertificationStore()
  // ensure certifications are loaded from storage
  void certificationStore.ensureLoaded()
  const { items } = storeToRefs(certificationStore)

  const base = educationData as Pick<EducationData, 'academic' | 'philosophy' | 'goals'>

  const getAcademicEducation = computed(() => base.academic)
  const getPhilosophy = computed(() => base.philosophy)
  const getGoals = computed(() => base.goals)

  const getCertifications = computed<EducationCertification[]>(() =>
    [...items.value]
      .sort((a, b) => a.id - b.id)
      .map(certificationStore.toEducationFormat)
  )

  const getEducation = computed<EducationData>(() => ({
    academic: getAcademicEducation.value,
    certifications: getCertifications.value,
    philosophy: getPhilosophy.value,
    goals: getGoals.value
  }))

  // Agrupa certificaciones por proveedor para facilitar su renderizado
  const getCertificationsByProvider = computed(() => {
    const providers: { [key: string]: EducationCertification[] } = {}
    getCertifications.value.forEach(cert => {
      if (!providers[cert.provider]) {
        providers[cert.provider] = []
      }
      providers[cert.provider].push(cert)
    })
    return providers
  })

  // Número total de certificaciones registradas
  const getTotalCertifications = computed(() => getCertifications.value.length)

  // --- Actions ---
  // Recupera una certificación por ID
  const getCertificationById = (id: number): EducationCertification | undefined => {
    return getCertifications.value.find(cert => cert.id === id)
  }

  // Filtra certificaciones por proveedor
  const getCertificationsByProviderName = (
    provider: string
  ): EducationCertification[] => {
    return getCertifications.value.filter(cert =>
      cert.provider.toLowerCase().includes(provider.toLowerCase())
    )
  }

  // Recupera una meta por su identificador
  const getGoalById = (id: number) => {
    return base.goals.find(goal => goal.id === id)
  }

    return {
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
