<template>
  <div class="project-card animate-fadeInUp">
    <div class="project-image">
      <div class="project-placeholder">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
        </svg>
      </div>
    </div>
    <div class="project-content">
      <h3>{{ getTranslatedText(project.title) }}</h3>
      <p>{{ getTranslatedText(project.description) }}</p>
      <div class="project-tech">
        <TechIcon
          v-for="techKey in project.techs"
          :key="techKey"
          :tech-data="technologiesData[techKey]"
        />
      </div>
      <a :href="project.url" target="_blank" class="project-link">
        {{ t.projectCard.viewProject }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import TechIcon from './TechIcon.vue'
import technologiesData from '../data/technologies.json'
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'

// Definimos la estructura del proyecto destacado
interface FeaturedProject {
  title: { es: string; en: string }
  description: { es: string; en: string }
  url: string
  techs: (keyof typeof technologiesData)[]
}

const props = defineProps<{ project: FeaturedProject }>()

const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const { getTranslatedText } = mainStore
</script>

<style scoped>
.project-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.project-image {
  height: 200px;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1),
    rgba(255, 193, 7, 0.1)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-placeholder {
  color: var(--primary-color);
  opacity: 0.7;
}

.project-content {
  padding: var(--spacing-lg);
}

.project-content h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.project-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.project-link:hover {
  color: var(--primary-dark);
  gap: var(--spacing-sm);
}
</style>
