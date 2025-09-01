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
  border: 1px solid color-mix(in srgb, var(--primary-color) 30%, transparent);
  background-color: color-mix(in srgb, var(--primary-color) 10%, transparent);
  color: var(--primary-dark);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  transition: background-color var(--transition-fast),
    border-color var(--transition-fast);
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
  background-color: color-mix(in srgb, var(--primary-color) 20%, transparent);
  color: var(--primary-light);
  border-color: color-mix(in srgb, var(--primary-color) 40%, transparent);
}

.tech-badge:hover,
.tech-badge:focus-visible {
  background-color: color-mix(in srgb, var(--primary-color) 20%, transparent);
  border-color: color-mix(in srgb, var(--primary-color) 40%, transparent);
  outline: none;
}

:global(.dark) .tech-badge:hover,
:global(.dark) .tech-badge:focus-visible {
  background-color: color-mix(in srgb, var(--primary-color) 30%, transparent);
  border-color: color-mix(in srgb, var(--primary-color) 50%, transparent);
}
</style>
