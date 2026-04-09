<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-grain"></div>

      <div class="hero-layout">
        <!-- Left: Editorial text block -->
        <div class="hero-editorial">
          <span class="hero-tag" :style="{ animationDelay: '0.1s' }">{{ t.hero.greeting }}</span>
          <h1 class="hero-name">
            <span class="name-line" :style="{ animationDelay: '0.2s' }">Albert</span>
            <span class="name-line name-accent" :style="{ animationDelay: '0.35s' }">González</span>
          </h1>
          <div class="hero-role" :style="{ animationDelay: '0.5s' }">
            <div class="role-line"></div>
            <h2>{{ t.hero.position }}</h2>
          </div>
          <p class="hero-description" :style="{ animationDelay: '0.6s' }">
            {{ t.hero.description }}
          </p>

          <div class="hero-actions" :style="{ animationDelay: '0.75s' }">
            <button
              @click="downloadCV"
              class="btn-editorial btn-editorial-primary"
              :disabled="isDownloading"
            >
              <span>{{ isDownloading ? t.hero.generatingCV : t.hero.downloadCV }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
            <router-link to="/contact" class="btn-editorial btn-editorial-outline">
              <span>{{ t.hero.contactMe }}</span>
            </router-link>
          </div>
        </div>

        <!-- Right: Profile image with geometric frame -->
        <div class="hero-visual">
          <div class="visual-frame">
            <div class="frame-accent"></div>
            <div class="profile-image">
              <img src="@/assets/img/fotoPerfil.jpg" alt="Albert González" />
            </div>
            <div class="frame-label">
              <span>CDMX</span>
              <span class="frame-dot"></span>
              <span>2026</span>
            </div>
          </div>
          <!-- Floating decorative elements -->
          <div class="deco-circle deco-circle-1"></div>
          <div class="deco-circle deco-circle-2"></div>
          <div class="deco-cross">+</div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="scroll-indicator" @click="scrollToOverview">
        <span class="scroll-text">scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Quick Overview Section -->
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

    <!-- Featured Projects Preview -->
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
import { ref, onMounted } from 'vue';
import { useMainStore } from "../stores/main";
import { storeToRefs } from "pinia";
import OverviewCard from "../components/OverviewCard.vue";
import FeaturedProject from "../components/FeaturedProject.vue";
import projectsData from "../data/projects.json";

const store = useMainStore();
const { t } = storeToRefs(store);
const { getTranslatedText } = store;

const isDownloading = ref(false);

// Trigger entrance animations on mount
onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelector('.hero')?.classList.add('is-visible');
  });
});

const downloadCV = async () => {
  try {
    isDownloading.value = true;

    const cvWindow = window.open('/cv.html', '_blank', 'width=1200,height=800,scrollbars=yes');

    if (!cvWindow) {
      throw new Error('No se pudo abrir la ventana del CV.');
    }

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

const scrollToOverview = () => {
  const overviewSection = document.querySelector(".overview");
  if (overviewSection) {
    overviewSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

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

const featuredProjects = projectsData.featured.slice(0, 2).map(project => ({
  title: project.title,
  description: project.description,
  url: project.url,
  technologies: project.technologies,
}));
</script>

<style scoped>
/* ═══════════════════════════════════════
   HERO — Editorial Developer Aesthetic
   ═══════════════════════════════════════ */

.home {
  padding-top: 70px;
}

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
}

/* Grain texture overlay */
.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat;
  z-index: 0;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  position: relative;
  z-index: 1;
}

/* ── Editorial Text Block ── */

.hero-editorial {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hero-tag {
  display: inline-block;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--primary-color);
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-name {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.name-line {
  font-family: 'Instrument Serif', serif;
  font-size: clamp(3.5rem, 7vw, 6.5rem);
  font-weight: 400;
  line-height: 0.95;
  color: var(--text-primary);
  opacity: 0;
  transform: translateY(40px);
  animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.name-accent {
  font-style: italic;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-color) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-role {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.role-line {
  width: 48px;
  height: 2px;
  background: var(--primary-color);
  flex-shrink: 0;
}

.hero-role h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin: 0;
}

.hero-description {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 520px;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* ── CTA Buttons ── */

.hero-actions {
  display: flex;
  gap: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: revealUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.btn-editorial {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  text-decoration: none;
}

.btn-editorial-primary {
  background: var(--primary-color);
  color: #fff;
  border-radius: 100px;
}

.btn-editorial-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.3);
}

.btn-editorial-primary:hover svg {
  transform: translate(3px, -3px);
}

.btn-editorial-primary svg {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.btn-editorial-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-editorial-outline {
  background: transparent;
  color: var(--text-primary);
  border: 1.5px solid var(--text-light);
  border-radius: 100px;
}

.btn-editorial-outline:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* ── Visual / Profile Block ── */

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-frame {
  position: relative;
  width: 380px;
  max-width: 100%;
}

.frame-accent {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  opacity: 0.4;
  z-index: 0;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-visual:hover .frame-accent {
  top: -16px;
  right: -16px;
  opacity: 0.7;
}

.profile-image {
  position: relative;
  z-index: 1;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.15),
    rgba(255, 193, 7, 0.1)
  );
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(0.9) contrast(1.05);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-visual:hover .profile-image img {
  filter: saturate(1.1) contrast(1.05);
  transform: scale(1.03);
}

.frame-label {
  position: absolute;
  bottom: -2rem;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-light);
  z-index: 2;
}

.frame-dot {
  width: 4px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 50%;
}

/* Floating decorative elements */
.deco-circle {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid var(--primary-light);
  opacity: 0.25;
  pointer-events: none;
}

.deco-circle-1 {
  width: 120px;
  height: 120px;
  top: -30px;
  left: -40px;
  animation: floatSlow 8s ease-in-out infinite;
}

.deco-circle-2 {
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: -20px;
  border-color: var(--accent-color);
  animation: floatSlow 6s ease-in-out infinite reverse;
}

.deco-cross {
  position: absolute;
  top: 20px;
  right: 40px;
  font-family: 'Instrument Serif', serif;
  font-size: 2rem;
  color: var(--primary-color);
  opacity: 0.3;
  animation: rotateSlow 12s linear infinite;
  pointer-events: none;
}

/* ── Scroll Indicator ── */

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 2;
}

.scroll-text {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-light);
  writing-mode: vertical-rl;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: var(--primary-color);
  animation: scrollPulse 2s ease-in-out infinite;
  transform-origin: top;
}

/* ═══════════════════════════════════════
   SECTIONS — Overview & Projects
   ═══════════════════════════════════════ */

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

/* ═══════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════ */

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(8px, -12px); }
}

@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes scrollPulse {
  0% { transform: scaleY(0); opacity: 0; }
  50% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(0); opacity: 0; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-tag,
  .name-line,
  .hero-role,
  .hero-description,
  .hero-actions {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .deco-circle,
  .deco-cross,
  .scroll-line {
    animation: none;
  }
}

/* ═══════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════ */

@media (max-width: 1024px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    padding: 0 var(--spacing-md);
  }

  .hero-editorial {
    align-items: center;
  }

  .hero-role {
    justify-content: center;
  }

  .hero-description {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
  }

  .visual-frame {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-top: 1rem;
  }

  .name-line {
    font-size: clamp(2.5rem, 10vw, 3.5rem);
  }

  .visual-frame {
    width: 260px;
  }

  .frame-accent {
    top: -8px;
    right: -8px;
  }

  .deco-circle-1,
  .deco-circle-2,
  .deco-cross {
    display: none;
  }

  .hero-actions {
    flex-wrap: wrap;
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
  .name-line {
    font-size: clamp(2rem, 12vw, 2.5rem);
  }

  .visual-frame {
    width: 220px;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .btn-editorial {
    padding: 0.75rem 1.25rem;
    font-size: 0.85rem;
  }
}
</style>
