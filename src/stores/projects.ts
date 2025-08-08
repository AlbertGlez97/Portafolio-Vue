import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { ProjectsData, Project, TechnologyBubble } from '../interfaces'
import projectsData from '../data/projects.json'

export const useProjectsStore = defineStore('projects', () => {
  // State
  const projects: ProjectsData = projectsData

  // Getters
  const getProjects = computed(() => projects)
  
  const getFeaturedProjects = computed(() => projects.featured)
  
  const getOtherProjects = computed(() => projects.other)
  
  const getAllProjects = computed(() => [...projects.featured, ...projects.other])

  const getTotalProjects = computed(() => 
    projects.featured.length + projects.other.length
  )

  const getFeaturedProjectsCount = computed(() => projects.featured.length)

  const getAllTechnologies = computed(() => {
    const techCount: { [key: string]: number } = {}
    
    // Count occurrences of each technology
    projects.featured.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })
    
    projects.other.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })
    
    // Convert to array with sizes based on frequency
    return Object.entries(techCount).map(([name, count]): TechnologyBubble => ({
      name,
      size: Math.max(14, Math.min(24, 14 + count * 2))
    }))
  })

  const getUniqueTechnologies = computed(() => {
    const allTechs = new Set<string>()
    
    projects.featured.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech))
    })
    
    projects.other.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech))
    })
    
    return allTechs.size
  })

  // Actions
  const getProjectById = (id: number): Project | undefined => {
    return getAllProjects.value.find(project => project.id === id)
  }

  const getProjectsByTechnology = (technology: string): Project[] => {
    return getAllProjects.value.filter(project =>
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
  }

  const getProjectsByType = (type: string): Project[] => {
    return getAllProjects.value.filter(project =>
      project.type.toLowerCase().includes(type.toLowerCase())
    )
  }

  return {
    // State
    projects,
    
    // Getters
    getProjects,
    getFeaturedProjects,
    getOtherProjects,
    getAllProjects,
    getTotalProjects,
    getFeaturedProjectsCount,
    getAllTechnologies,
    getUniqueTechnologies,
    
    // Actions
    getProjectById,
    getProjectsByTechnology,
    getProjectsByType
  }
})
