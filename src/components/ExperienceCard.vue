<template>
  <div class="experience-card" :class="{ 'current-job': job.type === 'current' }">
    <div class="card-header">
      <div class="job-info">
        <div class="job-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path v-if="job.icon === 'frontend'" d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
            <path v-else-if="job.icon === 'fullstack'" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2Z"/>
            <path v-else d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
          </svg>
        </div>
        <div class="job-details">
          <h3>{{ getTranslatedText(job.title) }}</h3>
          <h4>{{ job.company }}</h4>
          <div class="job-meta">
            <span class="period">{{ getTranslatedText(job.period) }}</span>
            <span v-if="job.type === 'current'" class="status current">{{ getTranslatedText(job.duration) }}</span>
            <span v-else class="status">{{ getTranslatedText(job.duration) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card-content">
      <p class="job-description">{{ getTranslatedText(job.description) }}</p>
      
      <div class="achievements">
        <h5>{{ t.experienceCard.achievements }}</h5>
        <ul class="achievements-list">
          <li v-for="achievement in job.achievements" :key="achievement.en" class="achievement-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="check-icon">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
            {{ getTranslatedText(achievement) }}
          </li>
        </ul>
      </div>
      
      <div class="technologies">
        <h5>{{ t.experienceCard.technologies }}</h5>
        <div class="tech-icons">
          <template v-for="tech in job.technologies" :key="tech">
            <TechIcon 
              v-if="getTechKey(tech)"
              :tech-data="technologiesData[getTechKey(tech)!]"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExperienceCardProps } from '../interfaces'
import TechIcon from './TechIcon.vue'
import technologiesData from '../data/technologies.json'
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'

defineProps<ExperienceCardProps>()

const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { getTranslatedText } = mainStore

// Función para obtener la clave de tecnología desde el nombre
const getTechKey = (techName: string): keyof typeof technologiesData | null => {
  // Mapeo de nombres de tecnologías a claves del JSON
  const techMapping: Record<string, keyof typeof technologiesData> = {
    'HTML5': 'html',
    'CSS3': 'css', 
    'JavaScript': 'javascript',
    'jQuery': 'jquery',
    'Bootstrap': 'bootstrap',
    'C#': 'csharp',
    'Vue.js': 'vue',
    'Nuxt.js': 'nuxt',
    'TypeScript': 'typescript',
    'Sass': 'sass',
    'Node.js': 'nodejs',
    'MongoDB': 'mongodb',
    'Express.js': 'express',
    'Svelte': 'svelte',
    'Redux': 'redux',
    'SQL Server': 'sqlserver',
    'GitLab': 'gitlab',
    'Docker': 'docker',
    '.NET MVC 6': 'dotnet',
    '.NET 6': 'dotnet6'
  }
  
  return techMapping[techName] || null
}
</script>

<style scoped>
.experience-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 2px solid rgba(76, 175, 80, 0.1);
  overflow: hidden;
  transition: all var(--transition-normal);
  margin-bottom: var(--spacing-xl);
}

.experience-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.current-job {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.05), 
    rgba(255, 193, 7, 0.05));
}

.card-header {
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-white);
}

.job-info {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
}

.job-icon {
  background-color: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  color: var(--text-white);
  flex-shrink: 0;
}

.job-details h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-white);
}

.job-details h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
  color: rgba(255, 255, 255, 0.9);
}

.job-meta {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  align-items: center;
}

.period {
  color: rgba(255, 255, 255, 0.8);
  font-weight: var(--font-weight-medium);
}

.status {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--text-white);
}

.status.current {
  background-color: var(--accent-color);
  color: var(--text-dark);
}

.card-content {
  padding: var(--spacing-xl);
}

.job-description {
  font-size: var(--font-size-lg);
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.achievements h5,
.technologies h5 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-lg) 0;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.check-icon {
  color: var(--primary-color);
  margin-top: 2px;
  flex-shrink: 0;
}

.tech-icons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

/* Responsive */
@media (max-width: 768px) {
  .job-info {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }

  .job-meta {
    justify-content: center;
  }

  .card-content {
    padding: var(--spacing-lg);
  }

  .tech-icons {
    justify-content: center;
  }
}

</style>
