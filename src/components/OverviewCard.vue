<template>
  <div class="overview-card animate-fadeInUp">
    <div class="card-icon">
      <slot name="icon" />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
// Componente reutilizable para las tarjetas de resumen rápido
// Recibe el título y la descripción ya traducidos
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>

<style scoped>
.overview-card {
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.overview-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.card-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.overview-card h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.overview-card p {
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 480px) {
  .overview-card {
    padding: var(--spacing-lg);
  }
}
</style>
