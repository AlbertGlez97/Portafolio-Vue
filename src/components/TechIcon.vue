<template>
  <div class="tech-icon" :data-tech="techData.name">
    <svg class="tech-svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path :d="techData.svg"/>
    </svg>
    <span class="tech-name">{{ techData.name }}</span>
  </div>
</template>

<script setup lang="ts">
interface TechData {
  name: string
  svg: string
  color: string
}

interface Props {
  techData: TechData
}

defineProps<Props>()
</script>

<style scoped>
.tech-icon {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 2px solid transparent;
}

.tech-icon:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tech-svg {
  color: var(--primary-color);
  transition: all var(--transition-normal);
}

.tech-icon:hover .tech-svg {
  color: white;
  opacity: 0;
}

.tech-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: white;
  opacity: 0;
  transition: all var(--transition-normal);
  white-space: nowrap;
  text-align: center;
  pointer-events: none;
}

.tech-icon:hover .tech-name {
  opacity: 1;
}
</style>
