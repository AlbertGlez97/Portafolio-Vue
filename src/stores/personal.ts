import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { PersonalData } from '../interfaces'
import personalData from '../data/personal.json'

export const usePersonalStore = defineStore('personal', () => {
  // State
  const personal: PersonalData = personalData

  // Getters
  const getPersonal = computed(() => personal)
  
  const getProfile = computed(() => personal.profile)
  
  const getContact = computed(() => personal.contact)
  
  const getAbout = computed(() => personal.about)
  
  const getAchievements = computed(() => personal.achievements)

  const getGoals = computed(() => personal.about.goals)
  
  const getInterests = computed(() => personal.about.interests)

  // Actions
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
    // State
    personal,
    
    // Getters
    getPersonal,
    getProfile,
    getContact,
    getAbout,
    getAchievements,
    getGoals,
    getInterests,
    
    // Actions
    getContactInfo,
    getProfileDescription,
    getGoalsByPeriod
  }
})
