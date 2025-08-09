import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { PersonalData } from '../domain/personal/Personal'
import { GetPersonalUseCase } from '../application/personal/GetPersonalUseCase'
import { StaticPersonalRepository } from '../infrastructure/personal/StaticPersonalRepository'

export const usePersonalStore = defineStore('personal', () => {
  // Instanciamos el repositorio y el caso de uso (capa de infraestructura -> aplicación)
  const repository = new StaticPersonalRepository()
  const getPersonalUseCase = new GetPersonalUseCase(repository)

  // Estado: datos personales obtenidos a través del caso de uso
  const personal: PersonalData = getPersonalUseCase.execute()

  // Getters: exponen la información al exterior
  const getPersonal = computed(() => personal)

  const getProfile = computed(() => personal.profile)

  const getContact = computed(() => personal.contact)

  const getAbout = computed(() => personal.about)

  const getAchievements = computed(() => personal.achievements)

  const getGoals = computed(() => personal.about.goals)

  const getInterests = computed(() => personal.about.interests)

  // Actions: métodos que procesan o filtran la información
  const getContactInfo = () => {
    return {
      email: personal.contact.email,
      phone: personal.contact.phone,
      location: personal.contact.location,
      linkedin: personal.contact.linkedin,
      github: personal.contact.github
    }
  }

  const getProfileDescription = (language: 'es' | 'en' = 'es') => {
    return personal.profile.description[language]
  }

  const getGoalsByPeriod = (period: 'shortTerm' | 'longTerm') => {
    return personal.about.goals[period]
  }

  return {
    // Estado
    personal,

    // Getters
    getPersonal,
    getProfile,
    getContact,
    getAbout,
    getAchievements,
    getGoals,
    getInterests,

    // Acciones
    getContactInfo,
    getProfileDescription,
    getGoalsByPeriod
  }
})
