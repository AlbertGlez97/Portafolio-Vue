<template>
  <main class="experience">
    <div class="container">
      <!-- Sección Hero de Experiencia -->
      <section class="experience-hero section">
        <div class="hero-content animate-fadeInUp">
          <h1 class="section-title">{{ t.nav.experience }}</h1>
          <p class="hero-subtitle">{{ t.experience.subtitle }}</p>
        </div>
      </section>

      <!-- Timeline de Experiencia Laboral -->
      <section class="experience-timeline section">
        <div class="timeline-container">
          <!-- Renderizado dinámico de tarjetas de experiencia -->
          <ExperienceCard 
            v-for="job in experienceData.jobs" 
            :key="job.id"
            :job="job"
            class="animate-fadeInUp"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
// Importaciones necesarias para el manejo de estado y componentes
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import { useExperienceStore } from '../stores/experience'
import ExperienceCard from '../components/ExperienceCard.vue'
import type { ExperienceData } from '../interfaces'

// Inicialización de stores para manejo de estado
const mainStore = useMainStore()
const experienceStore = useExperienceStore()

// Extracción de datos reactivos de los stores
const { t } = storeToRefs(mainStore) // Traducciones del idioma actual
const { getExperience } = storeToRefs(experienceStore) // Datos de experiencia laboral

// Obtención de los datos de experiencia para renderizado
const experienceData: ExperienceData = getExperience.value
</script>

<style scoped>
/* Estilos principales de la página de experiencia */
.experience {
  padding-top: 70px; /* Espacio para el header fijo */
}

/* Sección hero con gradiente de fondo */
.experience-hero {
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.05) 0%, 
    rgba(255, 193, 7, 0.05) 100%);
  text-align: center;
}

/* Subtítulo del hero */
.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
}

/* Sección del timeline */
.experience-timeline {
  background-color: var(--bg-primary);
}

/* Contenedor principal del timeline */
.timeline-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

/* Línea central del timeline - elemento pseudo */
.timeline-container::before {
  content: '';
  position: absolute;
  left: 50%; /* Centrado horizontalmente */
  top: 0;
  bottom: 0;
  width: 3px; /* Grosor de la línea */
  background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
  transform: translateX(-50%); /* Centrado perfecto */
  z-index: 1; /* Detrás de los puntos verdes */
}

/* Posicionamiento de tarjetas impares (lado izquierdo) */
.timeline-container .experience-card:nth-child(odd) {
  margin-right: 50%; /* Ocupa la mitad izquierda */
  padding-right: var(--spacing-xl); /* Espacio hacia la línea central */
}

/* Posicionamiento de tarjetas pares (lado derecho) */
.timeline-container .experience-card:nth-child(even) {
  margin-left: 50%; /* Ocupa la mitad derecha */
  padding-left: var(--spacing-xl); /* Espacio hacia la línea central */
}

/* Puntos verdes del timeline - tamaño más pequeño y mejor posicionado */
.timeline-container .experience-card::before {
  content: '';
  position: absolute;
  width: 16px; /* Tamaño más pequeño y proporcional */
  height: 16px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); /* Gradiente como en Education */
  border: 3px solid var(--bg-primary); /* Borde más delgado */
  border-radius: var(--border-radius-full); /* Círculo perfecto */
  top: var(--spacing-xl); /* Posición vertical */
  z-index: 2; /* Encima de la línea central */
  box-shadow: var(--shadow-sm); /* Sombra más sutil */
}

/* Posicionamiento del punto verde para tarjetas impares - centrado en la línea */
.timeline-container .experience-card:nth-child(odd)::before {
  right: -11px; /* Centrado perfectamente en la línea de 3px */
}

/* Posicionamiento del punto verde para tarjetas pares - centrado en la línea */
.timeline-container .experience-card:nth-child(even)::before {
  left: -11px; /* Centrado perfectamente en la línea de 3px */
}

/* Estilos responsive para tablets */
@media (max-width: 768px) {
  /* Línea del timeline se mueve a la izquierda */
  .timeline-container::before {
    left: 30px;
  }

  /* Todas las tarjetas se alinean a la izquierda */
  .timeline-container .experience-card:nth-child(odd),
  .timeline-container .experience-card:nth-child(even) {
    margin: 0;
    padding: 0 0 0 60px;
  }

  /* Todos los puntos verdes se posicionan a la izquierda */
  .timeline-container .experience-card::before {
    left: 20px !important;
    right: auto !important;
  }
}

/* Estilos responsive para móviles */
@media (max-width: 480px) {
  /* Padding adicional para el contenedor */
  .timeline-container {
    padding: 0 var(--spacing-md);
  }

  /* Ajuste de padding para tarjetas en móvil */
  .timeline-container .experience-card:nth-child(odd),
  .timeline-container .experience-card:nth-child(even) {
    padding-left: 50px;
  }

  /* Posición final de puntos verdes en móvil */
  .timeline-container .experience-card::before {
    left: 15px !important;
  }
}
</style>
