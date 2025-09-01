<template>
  <span class="tech-badge" :class="sizeClass">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClass = computed(() => `tech-badge--${props.size}`)
</script>

<style scoped>
.tech-badge {
  display: inline-block;
  border-radius: var(--border-radius-md);
  border: 1px solid rgba(76, 175, 80, 0.2);
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--primary-dark);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.tech-badge--sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
}

.tech-badge--md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
}

:global(.dark) .tech-badge {
  background-color: rgba(76, 175, 80, 0.2);
  color: var(--primary-light);
  border-color: rgba(76, 175, 80, 0.3);
}
</style>
