<template>
  <!-- Tarjeta individual de certificación -->
  <div class="certification-card">
    <div class="cert-header">
      <div class="cert-logo">
        <!-- Ícono representativo según tipo de certificación -->
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path v-if="certification.icon === 'testing'" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
          <path v-else-if="certification.icon === 'terminal'" d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z"/>
          <path v-else-if="certification.icon === 'nodejs'" d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
          <path v-else-if="certification.icon === 'javascript'" d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z"/>
          <path v-else-if="certification.icon === 'linux'" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2Z"/>
          <path v-else-if="certification.icon === 'browser'" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
          <path v-else d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
        </svg>
      </div>
      <div class="cert-badge">
        <span class="badge-text">{{ certification.provider }}</span>
      </div>
    </div>
    <!-- Título y descripción traducidos -->
    <h3>{{ getTranslatedText(certification.title) }}</h3>
    <p>{{ getTranslatedText(certification.description) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { CertificationCardProps } from '../interfaces'
import { useMainStore } from '../stores/main'

// Prop con la certificación a mostrar
defineProps<CertificationCardProps>()

// Acceso a función de traducción del store principal
const mainStore = useMainStore()
const { getTranslatedText } = mainStore
</script>

<style scoped>
.certification-card {
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.certification-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.cert-logo {
  color: var(--primary-color);
  transition: transform var(--transition-fast);
}

.certification-card:hover .cert-logo {
  transform: scale(1.1);
}

.cert-badge {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--shadow-sm);
}

.certification-card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
  flex-grow: 0;
}

.certification-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .certification-card {
    padding: var(--spacing-lg);
  }

  .cert-header {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }
}

@media (max-width: 480px) {
  .certification-card {
    padding: var(--spacing-md);
  }

  .certification-card h3 {
    font-size: var(--font-size-md);
  }
}
</style>
