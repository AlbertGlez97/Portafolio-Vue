import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { PersonalData } from '../domain/personal/Personal'
import { GetPersonalUseCase } from '../application/personal/GetPersonalUseCase'
import { StaticPersonalRepository } from '../infrastructure/personal/StaticPersonalRepository'

/**
 * Store que obtiene la información personal mediante la capa de aplicación.
 * Demuestra el flujo dominio → infraestructura → aplicación.
 */
export const usePersonalStore = defineStore('personal', () => {
  // Instanciamos el repositorio estático y el caso de uso
  const repository = new StaticPersonalRepository()
  const getPersonalUseCase = new GetPersonalUseCase(repository)

  // --- State --- datos cargados desde JSON a través del caso de uso
  const personal: PersonalData = getPersonalUseCase.execute()

  // --- Getters --- exposición de secciones para los componentes
  const getPersonal = computed(() => personal)
  const getProfile = computed(() => personal.profile)
  const getContact = computed(() => personal.contact)
  const getAbout = computed(() => personal.about)
  const getAchievements = computed(() => personal.achievements)
  const getGoals = computed(() => personal.about.goals)
  const getInterests = computed(() => personal.about.interests)

  // --- Actions --- funciones utilitarias
  // Devuelve información de contacto ya estructurada
  const getContactInfo = () => {
    return {
      email: personal.contact.email,
      phone: personal.contact.phone,
      location: personal.contact.location,
      linkedin: personal.contact.linkedin,
      github: personal.contact.github
    }
  }

  // Obtiene descripción del perfil en el idioma solicitado
  const getProfileDescription = (language: 'es' | 'en' = 'es') => {
    return personal.profile.description[language]
  }

  // Filtra objetivos por periodo (corto/largo plazo)
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
