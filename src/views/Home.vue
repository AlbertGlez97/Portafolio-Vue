<template>
  <main class="home">
    <!-- Hero Section: presentación principal -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text animate-fadeInLeft">
            <h1 class="hero-greeting">{{ t.hero.greeting }}</h1>
            <h2 class="hero-name">Albert González</h2>
            <h3 class="hero-position">{{ t.hero.position }}</h3>
            <p class="hero-description">{{ t.hero.description }}</p>

            <div class="hero-actions">
              <button
                @click="downloadCV"
                class="btn btn-primary"
                :disabled="isDownloading"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                  />
                </svg>
                {{ isDownloading ? t.hero.generatingCV : t.hero.downloadCV }}
              </button>
              <router-link to="/contact" class="btn btn-secondary">
                {{ t.hero.contactMe }}
              </router-link>
            </div>
          </div>

          <div class="hero-image animate-fadeInRight">
            <div class="image-placeholder">
              <div class="placeholder-content">             
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator para mover a la sección siguiente -->
      <div class="scroll-indicator">
        <div class="scroll-arrow animate-pulse" @click="scrollToOverview">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </svg>
        </div>
      </div>
    </section>

    <!-- Quick Overview Section: tarjetas de datos clave -->
      <section class="overview section">
        <div class="container">
          <div class="overview-grid">
            <OverviewCard
              v-for="(item, index) in overviewItems"
              :key="index"
              :title="getTranslatedText(item.title)"
              :description="getTranslatedText(item.description)"
            >
              <template #icon>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path :d="item.icon" />
                </svg>
              </template>
            </OverviewCard>
          </div>
        </div>
      </section>

      <!-- Featured Projects Preview: muestra 2 proyectos destacados -->
      <section class="featured-projects section">
        <div class="container">
          <h2 class="section-title">{{ t.home.featured.title }}</h2>
          <div class="projects-grid">
            <FeaturedProject
              v-for="project in featuredProjects"
              :key="project.title.en"
              :project="project"
            />
          </div>

          <div class="projects-cta">
            <router-link to="/projects" class="btn btn-primary">
              {{ t.home.featured.viewAll }}
            </router-link>
          </div>
        </div>
      </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from "../stores/main";
import { storeToRefs } from "pinia";
import OverviewCard from "../components/OverviewCard.vue";
import FeaturedProject from "../components/FeaturedProject.vue";
import projectsData from "../data/projects.json";

// Acceso a traducciones y helper de texto
const store = useMainStore();
const { t } = storeToRefs(store);
const { getTranslatedText } = store;

// Estado para la apertura de vista previa del CV
const isDownloading = ref(false);

// Función para abrir vista previa del CV
const downloadCV = async () => {
  try {
    isDownloading.value = true;
    
    // Abrir el CV HTML sin auto-descarga (vista previa)
    const cvWindow = window.open('/cv.html', '_blank', 'width=1200,height=800,scrollbars=yes');
    
    if (!cvWindow) {
      throw new Error('No se pudo abrir la ventana del CV. Verifique que su navegador permita ventanas emergentes.');
    }

    // Habilitar el botón inmediatamente después de abrir la ventana
    setTimeout(() => {
      isDownloading.value = false;
    }, 500);

  } catch (error) {
    console.error('Error al abrir vista previa del CV:', error);
    
    const userLanguage = store.currentLanguage === 'es' ? 'es' : 'en';
    const message = userLanguage === 'es'
      ? 'No se pudo abrir la vista previa del CV. Por favor, verifique que su navegador permita ventanas emergentes o intente nuevamente.'
      : 'Could not open CV preview. Please check that your browser allows pop-ups or try again.';
    alert(message);
    
    isDownloading.value = false;
  }
};

// Función para hacer scroll suave a la sección overview
const scrollToOverview = () => {
  const overviewSection = document.querySelector(".overview");
  if (overviewSection) {
    overviewSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Datos para el resumen rápido de la sección overview
interface OverviewItem {
  icon: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
}

const overviewItems: OverviewItem[] = [
  {
    icon: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z",
    title: { es: "3+ Años", en: "3+ Years" },
    description: {
      es: "de experiencia en desarrollo Full Stack",
      en: "of Full Stack development experience",
    },
  },
  {
    icon: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
    title: { es: "Vue.js & TypeScript", en: "Vue.js & TypeScript" },
    description: {
      es: "Especialización en tecnologías modernas",
      en: "Specialization in modern technologies",
    },
  },
  {
    icon: "M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z",
    title: { es: "Proyectos Exitosos", en: "Successful Projects" },
    description: {
      es: "Sistemas empresariales y aplicaciones web",
      en: "Enterprise systems and web applications",
    },
  },
  {
    icon: "M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L20.29,9.12L22,10.83V6H16Z",
    title: { es: "Crecimiento Continuo", en: "Continuous Growth" },
    description: {
      es: "Aprendizaje constante y mejora profesional",
      en: "Constant learning and professional improvement",
    },
  },
];

// Proyectos destacados que se mostrarán en el home
const featuredProjects = projectsData.featured.slice(0, 2).map(project => ({
  title: project.title,
  description: project.description,
  url: project.url,
  technologies: project.technologies,
}));
</script>

<style scoped>
.home {
  padding-top: 70px;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1) 0%,
    rgba(255, 193, 7, 0.1) 100%
  );
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%234CAF50" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23FFC107" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%234CAF50" opacity="0.15"/><circle cx="10" cy="90" r="0.5" fill="%23FFC107" opacity="0.15"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.hero-greeting {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-normal);
  color: var(--text-secondary);
  margin-bottom: 0;
}

.hero-name {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0;
}

.hero-position {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-medium);
  color: var(--primary-dark);
  margin-bottom: var(--spacing-sm);
}

.hero-description {
  font-size: var(--font-size-lg);
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.hero-actions .btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.hero-actions .btn:disabled:hover {
  transform: none !important;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 350px;
  height: 350px;
  border-radius: var(--border-radius-full);
  background-image: url('@/assets/img/fotoPerfil.jpg');
  background-size: cover;
  border: 3px dashed var(--primary-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  transition: all var(--transition-normal);
}

.placeholder-content {
  text-align: center;
  color: var(--primary-color);
}

.placeholder-content svg {
  margin-bottom: var(--spacing-sm);
  opacity: 0.7;
}

.placeholder-content p {
  font-size: var(--font-size-sm);
  color: var(--text-light);
  margin: 0;
}

.scroll-indicator {
  position: absolute;
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  color: var(--primary-color);
  z-index: 2;
}

.scroll-arrow {
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-arrow:hover {
  transform: translateY(-8px);
  color: var(--primary-dark);
}

.scroll-arrow svg {
  transition: transform var(--transition-fast);
  filter: drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3));
}

.scroll-arrow:hover svg {
  transform: translateY(5px);
  filter: drop-shadow(0 4px 8px rgba(76, 175, 80, 0.5));
}

.overview {
  background-color: var(--bg-secondary);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}


.featured-projects {
  background-color: var(--bg-primary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}


.projects-cta {
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    text-align: center;
  }

  .hero-name {
    font-size: var(--font-size-4xl);
  }

  .hero-position {
    font-size: var(--font-size-2xl);
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .image-placeholder {
    width: 280px;
    height: 280px;
  }

  .overview-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .hero-name {
    font-size: var(--font-size-3xl);
  }

  .hero-position {
    font-size: var(--font-size-xl);
  }

  .hero-description {
    font-size: var(--font-size-base);
  }

  .image-placeholder {
    width: 250px;
    height: 250px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
