import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { ProjectsData, Project, TechnologyBubble } from '../interfaces'
import projectsData from '../data/projects.json'

/**
 * Store que centraliza la información de proyectos.
 */
export const useProjectsStore = defineStore('projects', () => {
  // --- State ---
  const load = (): ProjectsData => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('projects')
      if (stored) return JSON.parse(stored)
    }
    return projectsData
  }

  const projects = ref<ProjectsData>(load())

  const save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify(projects.value))
    }
  }

  // --- Getters ---
  const getProjects = computed(() => projects.value)
  const getFeaturedProjects = computed(() => projects.value.featured)
  const getOtherProjects = computed(() => projects.value.other)
  const getAllProjects = computed(() => [...projects.value.featured, ...projects.value.other])

  // Totales y métricas derivadas
  const getTotalProjects = computed(() =>
    projects.value.featured.length + projects.value.other.length
  )
  const getFeaturedProjectsCount = computed(() => projects.value.featured.length)

  // Calcula burbujas de tecnologías con tamaño proporcional a frecuencia
  const getAllTechnologies = computed(() => {
    const techCount: { [key: string]: number } = {}

    projects.value.featured.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })

    projects.value.other.forEach(project => {
      project.technologies.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })

    return Object.entries(techCount).map(([name, count]): TechnologyBubble => ({
      name,
      size: Math.max(14, Math.min(24, 14 + count * 2))
    }))
  })

  const getUniqueTechnologies = computed(() => {
    const allTechs = new Set<string>()
    projects.value.featured.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech))
    })
    projects.value.other.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech))
    })
    return allTechs.size
  })

  // --- Actions ---
  // Busca un proyecto por su id
  const getProjectById = (id: number): Project | undefined => {
    return getAllProjects.value.find(project => project.id === id)
  }

  // Filtra proyectos que usan cierta tecnología
  const getProjectsByTechnology = (technology: string): Project[] => {
    return getAllProjects.value.filter(project =>
      project.technologies.some(tech =>
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
  }

  // Filtra por tipo (profesional, personal, etc.)
  const getProjectsByType = (type: string): Project[] => {
    return getAllProjects.value.filter(project =>
      project.type.toLowerCase().includes(type.toLowerCase())
    )
  }

  const isFeatured = (id: number): boolean =>
    projects.value.featured.some(p => p.id === id)

  const getNextId = (): number => {
    return (
      Math.max(0, ...getAllProjects.value.map(p => p.id)) + 1
    )
  }

  const addProject = (project: Project, featured = false) => {
    if (featured) projects.value.featured.push(project)
    else projects.value.other.push(project)
    save()
  }

  const updateProject = (project: Project, featured = false) => {
    const inFeatured = isFeatured(project.id)
    if (inFeatured) {
      const idx = projects.value.featured.findIndex(p => p.id === project.id)
      if (idx !== -1) {
        if (featured) projects.value.featured[idx] = project
        else {
          projects.value.featured.splice(idx, 1)
          projects.value.other.push(project)
        }
      }
    } else {
      const idx = projects.value.other.findIndex(p => p.id === project.id)
      if (idx !== -1) {
        if (featured) {
          projects.value.other.splice(idx, 1)
          projects.value.featured.push(project)
        } else {
          projects.value.other[idx] = project
        }
      }
    }
    save()
  }

  const removeProject = (id: number) => {
    let idx = projects.value.featured.findIndex(p => p.id === id)
    if (idx !== -1) projects.value.featured.splice(idx, 1)
    else {
      idx = projects.value.other.findIndex(p => p.id === id)
      if (idx !== -1) projects.value.other.splice(idx, 1)
    }
    save()
  }

  const duplicateProject = (id: number): Project | null => {
    const original = getProjectById(id)
    if (!original) return null
    const copy: Project = JSON.parse(JSON.stringify(original))
    copy.id = getNextId()
    return copy
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
    getProjectsByType,
    isFeatured,
    getNextId,
    addProject,
    updateProject,
    removeProject,
    duplicateProject
  }
})
