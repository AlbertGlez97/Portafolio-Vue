<template>
  <main class="projects">
    <div class="container">
      <!-- Hero Section -->
      <section class="projects-hero section">
        <div class="hero-content animate-fadeInUp">
          <h1 class="section-title">{{ t.nav.projects }}</h1>
          <p class="hero-subtitle">{{ t.projects.subtitle }}</p>
        </div>
      </section>

      <!-- Featured Projects -->
      <section class="featured-projects section">
        <h2 class="section-title">{{ t.projects.featured }}</h2>
        <div class="projects-grid featured">
          <ProjectCard 
            v-for="project in projectsData.featured" 
            :key="project.id"
            :project="project"
            class="animate-fadeInUp"
          />
        </div>
      </section>

      <!-- Other Projects -->
      <section class="other-projects section">
        <h2 class="section-title">{{ t.projects.others }}</h2>
        <div class="projects-grid">
          <ProjectCard 
            v-for="project in projectsData.other" 
            :key="project.id"
            :project="project"
            class="animate-fadeInUp"
          />
        </div>
      </section>

      <!-- Project Stats -->
      <section class="project-stats section">
        <div class="stats-content">
          <h2 class="section-title">{{ t.projects.stats }}</h2>
          <div class="stats-grid">
            <div class="stat-item animate-fadeInUp">
              <div class="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
                </svg>
              </div>
              <div class="stat-number">{{ totalProjects }}</div>
              <div class="stat-label">{{ t.projects.completed }}</div>
            </div>

            <div class="stat-item animate-fadeInUp">
              <div class="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2Z"/>
                </svg>
              </div>
              <div class="stat-number">{{ uniqueTechnologies }}</div>
              <div class="stat-label">{{ t.projects.technologiesUsed }}</div>
            </div>

            <div class="stat-item animate-fadeInUp">
              <div class="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16,4C18.11,4 20.11,4.89 21.61,6.39C23.11,7.89 24,9.89 24,12A8,8 0 0,1 16,20H5A5,5 0 0,1 0,15A5,5 0 0,1 5,10C5.59,10 6.16,10.13 6.69,10.36C7.61,7.24 10.57,5 14,5C14.68,5 15.34,5.11 16,5.28V4Z"/>
                </svg>
              </div>
              <div class="stat-number">{{ featuredProjects }}</div>
              <div class="stat-label">{{ t.projects.featuredCount }}</div>
            </div>

            <div class="stat-item animate-fadeInUp">
              <div class="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
                </svg>
              </div>
              <div class="stat-number">100%</div>
              <div class="stat-label">{{ t.projects.responsive }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Technologies Used -->
      <section class="technologies-section section">
        <div class="tech-content">
          <h2 class="section-title">{{ t.projects.techSection }}</h2>
          <div class="tech-cloud">
            <TechBadge
              v-for="tech in allTechnologies"
              :key="tech.name"
              :label="tech.name"
              size="sm"
            />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import { useProjectsStore } from '../stores/projects'
import ProjectCard from '../components/ProjectCard.vue'
import TechBadge from '../components/TechBadge.vue'
import type { ProjectsData } from '../interfaces'

const mainStore = useMainStore()
const projectsStore = useProjectsStore()
const { t } = storeToRefs(mainStore)
const { getProjects, getTotalProjects, getFeaturedProjectsCount, getUniqueTechnologies, getAllTechnologies } = storeToRefs(projectsStore)
const projectsData: ProjectsData = getProjects.value

// Use store computed values
const totalProjects = getTotalProjects
const featuredProjects = getFeaturedProjectsCount
const uniqueTechnologies = getUniqueTechnologies
const allTechnologies = getAllTechnologies
</script>

<style scoped>
.projects {
  padding-top: 70px;
}

.projects-hero {
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.05) 0%, 
    rgba(255, 193, 7, 0.05) 100%);
  text-align: center;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
}

.featured-projects {
  background-color: var(--bg-primary);
}

.other-projects {
  background-color: var(--bg-secondary);
}

.projects-grid {
  display: grid;
  gap: var(--spacing-xl);
}

.projects-grid.featured {
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}

.projects-grid:not(.featured) {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.project-stats {
  background-color: var(--bg-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.stat-item {
  background-color: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.stat-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.stat-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

.technologies-section {
  background-color: var(--bg-secondary);
}

.tech-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  max-width: 800px;
  margin: 0 auto;
}



/* Responsive */
@media (max-width: 1024px) {
  .projects-grid.featured {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .projects-grid:not(.featured) {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }

  .stat-item {
    padding: var(--spacing-xl);
  }

  .stat-number {
    font-size: var(--font-size-2xl);
  }

  .tech-cloud {
    gap: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .stat-item {
    padding: var(--spacing-lg);
  }

  .stat-number {
    font-size: var(--font-size-xl);
  }

  .stat-label {
    font-size: var(--font-size-sm);
  }

}

</style>
