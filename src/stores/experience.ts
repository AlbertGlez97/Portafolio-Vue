import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { ExperienceData, Job } from '../interfaces'
import experienceData from '../data/experience.json'

export const useExperienceStore = defineStore('experience', () => {
  // State
  const experience: ExperienceData = experienceData

  // Getters
  const getExperience = computed(() => experience)
  
  const getJobs = computed(() => experience.jobs)
  
  const getCurrentJobs = computed(() => 
    experience.jobs.filter(job => job.type === 'current')
  )
  
  const getPreviousJobs = computed(() => 
    experience.jobs.filter(job => job.type === 'previous')
  )
  
  const getInternships = computed(() => 
    experience.jobs.filter(job => job.type === 'internship')
  )

  const getTotalExperience = computed(() => {
    // Calculate total years of experience
    const currentYear = new Date().getFullYear()
    const startYear = 2021 // Based on the first internship
    return currentYear - startYear
  })

  const getAllTechnologies = computed(() => {
    const techSet = new Set<string>()
    experience.jobs.forEach(job => {
      job.technologies.forEach(tech => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  })

  // Actions
  const getJobById = (id: number): Job | undefined => {
    return experience.jobs.find(job => job.id === id)
  }

  const getJobsByCompany = (company: string): Job[] => {
    return experience.jobs.filter(job => 
      job.company.toLowerCase().includes(company.toLowerCase())
    )
  }

  const getJobsByTechnology = (technology: string): Job[] => {
    return experience.jobs.filter(job =>
      job.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
  }

  return {
    // State
    experience,
    
    // Getters
    getExperience,
    getJobs,
    getCurrentJobs,
    getPreviousJobs,
    getInternships,
    getTotalExperience,
    getAllTechnologies,
    
    // Actions
    getJobById,
    getJobsByCompany,
    getJobsByTechnology
  }
})
