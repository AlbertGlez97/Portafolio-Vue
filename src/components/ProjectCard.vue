<template>
  <div class="project-card" :class="{ 'featured': badgeClass === 'featured' }">
    <div class="project-image">
      <div class="image-placeholder">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
        </svg>
      </div>
    </div>
    
    <div class="project-content">
      <div class="project-header">
        <h3>{{ getTranslatedText(project.title) }}</h3>
        <span v-if="project.type" class="project-badge" :class="badgeClass">
          {{ getTranslatedText(project.type) }}
        </span>
      </div>
      
      <p class="project-description">{{ getTranslatedText(project.description) }}</p>
      
      <div v-if="project.features" class="project-features">
        <h5>{{ t.projectCard.features }}</h5>
        <ul class="features-list">
          <li v-for="feature in project.features" :key="feature.en" class="feature-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="check-icon">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
            {{ getTranslatedText(feature) }}
          </li>
        </ul>
      </div>
      
      <div class="project-technologies">
        <h5>{{ t.projectCard.technologies }}</h5>
        <div class="tech-tags">
          <span 
            v-for="tech in project.technologies" 
            :key="tech" 
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>
      </div>
      
      <div v-if="project.metrics" class="project-metrics">
        <div class="metric">
          <span class="metric-value">{{ project.metrics.responsive }}</span>
          <span class="metric-label">Responsive</span>
        </div>
        <div class="metric">
          <span class="metric-value">{{ project.metrics.performance }}</span>
          <span class="metric-label">Performance</span>
        </div>
        <div class="metric">
          <span class="metric-value">{{ getTranslatedText(project.metrics.seo) }}</span>
          <span class="metric-label">SEO</span>
        </div>
      </div>
      
      <div v-if="project.url || project.github" class="project-links">
        <a 
          v-if="project.url" 
          :href="project.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
          </svg>
          {{ t.projectCard.viewProject }}
        </a>
        <a 
          v-if="project.github" 
          :href="project.github" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link secondary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
          GitHub
        </a>
      </div>
      
      <div v-if="project.confidential" class="confidential-notice">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
        </svg>
        {{ t.projectCard.confidential }} - {{ project.company }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectCardProps } from '../interfaces'
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'

const props = defineProps<ProjectCardProps>()

const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { getTranslatedText } = mainStore

const badgeClass = computed(() => {
  const typeEs = props.project.type.es.toLowerCase()
  const typeEn = props.project.type.en.toLowerCase()
  if (typeEs.includes('destacado') || typeEn.includes('featured')) return 'featured'
  if (typeEs.includes('profesional') || typeEn.includes('professional')) return 'professional'
  return 'default'
})
</script>

<style scoped>
.project-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(76, 175, 80, 0.1);
  overflow: hidden;
  transition: all var(--transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.featured {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.05), 
    rgba(255, 193, 7, 0.05));
}

.project-image {
  height: 200px;
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.1), 
    rgba(255, 193, 7, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(76, 175, 80, 0.1);
}

.image-placeholder {
  color: var(--primary-color);
  opacity: 0.7;
}

.project-content {
  padding: var(--spacing-xl);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
  gap: var(--spacing-md);
}

.project-card h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
  flex-grow: 1;
}

.project-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.project-badge.featured {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-white);
}

.project-badge.professional {
  background-color: rgba(33, 150, 243, 0.2);
  color: #1976d2;
}

.project-badge.default {
  background-color: rgba(158, 158, 158, 0.2);
  color: var(--text-secondary);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.project-features h5,
.project-technologies h5 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-lg) 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.check-icon {
  color: var(--primary-color);
  margin-top: 2px;
  flex-shrink: 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
}

.tech-tag {
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--primary-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.project-metrics {
  display: flex;
  justify-content: space-around;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-md);
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
}

.metric-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.project-links {
  display: flex;
  gap: var(--spacing-md);
  margin-top: auto;
}

.project-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  transition: all var(--transition-fast);
}

.project-link.primary {
  background-color: var(--primary-color);
  color: var(--text-white);
}

.project-link.primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.project-link.secondary {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--text-secondary);
}

.project-link.secondary:hover {
  background-color: var(--text-secondary);
  color: var(--bg-primary);
}

.confidential-notice {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  background-color: rgba(255, 152, 0, 0.1);
  color: #f57c00;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-md);
}

/* Responsive */
@media (max-width: 768px) {
  .project-content {
    padding: var(--spacing-lg);
  }

  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-links {
    flex-direction: column;
  }

  .project-metrics {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .project-content {
    padding: var(--spacing-md);
  }

  .tech-tags {
    justify-content: center;
  }
}

/* Dark mode */
:global(.dark) .tech-tag {
  background-color: rgba(76, 175, 80, 0.2);
  color: var(--primary-light);
  border-color: rgba(76, 175, 80, 0.3);
}

:global(.dark) .project-badge.professional {
  background-color: rgba(33, 150, 243, 0.3);
  color: #64b5f6;
}

:global(.dark) .confidential-notice {
  background-color: rgba(255, 152, 0, 0.2);
  color: #ffb74d;
}
</style>
