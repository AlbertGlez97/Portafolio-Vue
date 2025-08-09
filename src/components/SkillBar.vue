<template>
  <div class="skill-bar">
    <div class="skill-info">
      <span class="skill-name">{{ skill.name[currentLanguage] }}</span>
      <span class="skill-level" :class="levelClass">{{ skill.level[currentLanguage] }}</span>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${skill.percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import type { SkillBarProps } from '../interfaces'

const props = defineProps<SkillBarProps>()

const mainStore = useMainStore()
const { currentLanguage } = storeToRefs(mainStore)

const levelClass = computed(() => {
  const level = props.skill.level[currentLanguage.value].toLowerCase()
  if (level.includes('experto') || level.includes('expert')) return 'expert'
  if (level.includes('avanzado') || level.includes('advanced')) return 'advanced'
  if (level.includes('intermedio') || level.includes('intermediate')) return 'intermediate'
  return 'basic'
})
</script>

<style scoped>
.skill-bar {
  margin-bottom: var(--spacing-lg);
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.skill-name {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  font-size: var(--font-size-md);
}

.skill-level {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
}

.skill-level.expert {
  background-color: rgba(76, 175, 80, 0.2);
  color: var(--primary-dark);
}

.skill-level.advanced {
  background-color: rgba(76, 175, 80, 0.15);
  color: var(--primary-color);
}

.skill-level.intermediate {
  background-color: rgba(255, 193, 7, 0.2);
  color: #f57c00;
}

.skill-level.basic {
  background-color: rgba(158, 158, 158, 0.2);
  color: var(--text-secondary);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: var(--border-radius-full);
  transition: width 1s ease-in-out;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Dark mode */
:global(.dark) .progress-bar {
  background-color: rgba(255, 255, 255, 0.1);
}

:global(.dark) .skill-level.expert {
  background-color: rgba(76, 175, 80, 0.3);
  color: var(--primary-light);
}

:global(.dark) .skill-level.advanced {
  background-color: rgba(76, 175, 80, 0.25);
  color: var(--primary-light);
}

:global(.dark) .skill-level.intermediate {
  background-color: rgba(255, 193, 7, 0.3);
  color: #ffb74d;
}
</style>
