<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text animate-fadeInLeft">
            <h1 class="hero-greeting">{{ t.hero.greeting }}</h1>
            <h2 class="hero-name">Albert González</h2>
            <h3 class="hero-position">{{ t.hero.position }}</h3>
            <p class="hero-description">{{ t.hero.description }}</p>

            <div class="hero-actions">
              <a
                href="/CV_Albert_Gonzalez.pdf"
                download
                class="btn btn-primary"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                  />
                </svg>
                {{ t.hero.downloadCV }}
              </a>
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

      <!-- Scroll Indicator -->
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

    <!-- Quick Overview Section -->
    <section class="overview section">
      <div class="container">
        <div class="overview-grid">
          <div class="overview-card animate-fadeInUp">
            <div class="card-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"
                />
              </svg>
            </div>
            <h3>3+ Años</h3>
            <p>de experiencia en desarrollo Front-End</p>
          </div>

          <div class="overview-card animate-fadeInUp">
            <div class="card-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                />
              </svg>
            </div>
            <h3>Vue.js & TypeScript</h3>
            <p>Especialización en tecnologías modernas</p>
          </div>

          <div class="overview-card animate-fadeInUp">
            <div class="card-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"
                />
              </svg>
            </div>
            <h3>Proyectos Exitosos</h3>
            <p>Sistemas empresariales y aplicaciones web</p>
          </div>

          <div class="overview-card animate-fadeInUp">
            <div class="card-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L20.29,9.12L22,10.83V6H16Z"
                />
              </svg>
            </div>
            <h3>Crecimiento Continuo</h3>
            <p>Aprendizaje constante y mejora profesional</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Preview -->
    <section class="featured-projects section">
      <div class="container">
        <h2 class="section-title">Proyectos Destacados</h2>
        <div class="projects-grid">
          <div class="project-card animate-fadeInUp">
            <div class="project-image">
              <div class="project-placeholder">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"
                  />
                </svg>
              </div>
            </div>
            <div class="project-content">
              <h3>Atotonilco Estudio</h3>
              <p>
                Sitio web para promocionar servicios de estudio fotográfico con
                diseño responsivo y enfoque visual.
              </p>
              <div class="project-tech">
                <TechIcon
                  v-for="techKey in atotonilcoTechs"
                  :key="techKey"
                  :tech-data="technologiesData[techKey]"
                />
              </div>
              <a
                href="https://www.atotonilcoestudio.com/"
                target="_blank"
                class="project-link"
              >
                Ver Proyecto
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="project-card animate-fadeInUp">
            <div class="project-image">
              <div class="project-placeholder">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"
                  />
                </svg>
              </div>
            </div>
            <div class="project-content">
              <h3>Carnal MX</h3>
              <p>
                Proyecto artístico de crónica contemporánea sobre la Ciudad de
                México con panel administrativo y APIs REST.
              </p>
              <div class="project-tech">
                <TechIcon
                  v-for="techKey in carnalMxTechs"
                  :key="techKey"
                  :tech-data="technologiesData[techKey]"
                />
              </div>
              <a
                href="https://www.carnalmx.com/"
                target="_blank"
                class="project-link"
              >
                Ver Proyecto
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="projects-cta">
          <router-link to="/projects" class="btn btn-primary">
            Ver Todos los Proyectos
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useMainStore } from "../stores/main";
import { storeToRefs } from "pinia";
import TechIcon from "../components/TechIcon.vue";
import technologiesData from "../data/technologies.json";

const store = useMainStore();
const { t } = storeToRefs(store);

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

// Definir las tecnologías para cada proyecto
const atotonilcoTechs: (keyof typeof technologiesData)[] = [
  "html",
  "css",
  "javascript",
  "dotnet",
];
const carnalMxTechs: (keyof typeof technologiesData)[] = [
  "html",
  "bootstrap",
  "csharp",
  "sqlserver",
];
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

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 350px;
  height: 350px;
  border-radius: var(--border-radius-full);
  background-image: url('/src/assets/img/fotoPerfil.jpg');
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

.featured-projects {
  background-color: var(--bg-primary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

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

  .overview-card {
    padding: var(--spacing-lg);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
