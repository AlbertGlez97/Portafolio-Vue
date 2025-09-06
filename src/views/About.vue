<template>
  <main class="about">
    <div class="container">
      <!-- Hero Section -->
      <section class="about-hero section">
        <div class="hero-content">
          <div class="hero-text animate-fadeInLeft">
            <h1 class="section-title">{{ t.about.title }}</h1>
            <p class="hero-description">{{ t.about.description }}</p>
          </div>
          <div class="hero-image animate-fadeInRight">
            <div class="image-placeholder">
              <div class="placeholder-content"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Personal Info -->
      <section class="personal-info section">
        <div class="info-grid">
          <div class="info-card animate-fadeInUp">
            <div class="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
              </svg>
            </div>
            <h3>{{ t.contact.details.location }}</h3>
            <p>{{ getTranslatedText(personalData.contact.location) }}</p>
          </div>

          <div class="info-card animate-fadeInUp">
            <div class="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,8L12,13L4,8V6L12,11L20,6V8Z" />
              </svg>
            </div>
            <h3>Email</h3>
            <p>albert.gonzalez0297@gmail.com</p>
          </div>

          <div class="info-card animate-fadeInUp">
            <div class="card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
              </svg>
            </div>
            <h3>{{ t.contact.details.linkedin }}</h3>
            <p>{{ personalData.contact.linkedin }}</p>
          </div>
        </div>
      </section>

      <!-- Professional Journey -->
      <section class="journey section">
        <h2 class="section-title">{{ t.about.journey.title }}</h2>
        <div class="journey-timeline">
          <div
            v-for="(item, index) in journeyItems"
            :key="index"
            class="timeline-item"
            :class="index % 2 === 0 ? 'animate-fadeInLeft' : 'animate-fadeInRight'"
          >
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ item.period }}</div>
              <h3>{{ item.role }}</h3>
              <h4>{{ item.company }}</h4>
              <p>{{ item.description }}</p>
              <ul class="timeline-tech">
                <li v-for="tech in item.technologies" :key="tech">{{ tech }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Goals & Objectives -->
      <section class="goals section">
        <h2 class="section-title">{{ t.about.goals.title }}</h2>
        <div class="goals-grid">
          <div class="goal-card animate-fadeInUp">
            <div class="goal-icon">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
              </svg>
            </div>
            <h3>{{ t.about.goals.shortTitle }}</h3>
            <p>{{ getTranslatedText(personalData.about.goals.shortTerm) }}</p>
          </div>

          <div class="goal-card animate-fadeInUp">
            <div class="goal-icon">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z" />
              </svg>
            </div>
            <h3>{{ t.about.goals.longTitle }}</h3>
            <p>{{ getTranslatedText(personalData.about.goals.longTerm) }}</p>
          </div>
        </div>
      </section>

      <!-- Interests & Passions -->
      <section class="interests section">
        <h2 class="section-title">{{ t.about.interestsTitle }}</h2>
        <div class="interests-grid">
          <div v-for="interest in personalData.about.interests" :key="interest.title.en"
            class="interest-card animate-fadeInUp">
            <div class="interest-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path v-if="interest.icon === 'components'"
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                <path v-else-if="interest.icon === 'meetings'"
                  d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                <path v-else
                  d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A8.5,8.5 0 0,0 20.5,12.5A8.5,8.5 0 0,0 12,3Z" />
              </svg>
            </div>
            <h3>{{ getTranslatedText(interest.title) }}</h3>
            <p>{{ getTranslatedText(interest.description) }}</p>
          </div>
        </div>
      </section>
      <!-- Soft Skills -->
      <section class="soft-skills section">
        <h2 class="section-title">{{ t.about.softSkills.title }}</h2>
        <div class="skills-grid">
          <div class="skill-item animate-fadeInUp">
            <div class="skill-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
              </svg>
            </div>
            <div class="skill-content">
              <h3>{{ t.about.softSkills.communication.title }}</h3>
              <p>{{ t.about.softSkills.communication.description }}</p>
            </div>
          </div>

          <div class="skill-item animate-fadeInUp">
            <div class="skill-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M16,4C18.11,4 20.11,4.89 21.61,6.39C23.11,7.89 24,9.89 24,12A8,8 0 0,1 16,20H5A5,5 0 0,1 0,15A5,5 0 0,1 5,10C5.59,10 6.16,10.13 6.69,10.36C7.61,7.24 10.57,5 14,5C14.68,5 15.34,5.11 16,5.28V4M16,6A6,6 0 0,0 10,12H5A3,3 0 0,0 2,15A3,3 0 0,0 5,18H16A6,6 0 0,0 22,12A6,6 0 0,0 16,6Z" />
              </svg>
            </div>
            <div class="skill-content">
              <h3>{{ t.about.softSkills.teamwork.title }}</h3>
              <p>{{ t.about.softSkills.teamwork.description }}</p>
            </div>
          </div>

          <div class="skill-item animate-fadeInUp">
            <div class="skill-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M9,2V8H7V2H9M17,2V8H15V2H17M12,8A4,4 0 0,1 16,12V18A4,4 0 0,1 12,22A4,4 0 0,1 8,18V12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12V18A2,2 0 0,0 12,20A2,2 0 0,0 14,18V12A2,2 0 0,0 12,10Z" />
              </svg>
            </div>
            <div class="skill-content">
              <h3>{{ t.about.softSkills.analytical.title }}</h3>
              <p>{{ t.about.softSkills.analytical.description }}</p>
            </div>
          </div>

          <div class="skill-item animate-fadeInUp">
            <div class="skill-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
              </svg>
            </div>
            <div class="skill-content">
              <h3>{{ t.about.softSkills.timeManagement.title }}</h3>
              <p>{{ t.about.softSkills.timeManagement.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainStore } from "../stores/main";
import { usePersonalStore } from "../stores/personal";
import { useExperienceStore } from "../stores";
// Importamos el modelo del dominio
import type { PersonalData } from "../domain/personal/Personal";
import { storeToRefs } from "pinia";

// Stores para traducciones y datos personales
const mainStore = useMainStore();
const personalStore = usePersonalStore();
const { t } = storeToRefs(mainStore);
const { getTranslatedText } = mainStore;
const { getPersonal } = storeToRefs(personalStore);
// Datos personales provenientes de la capa de dominio
const personalData: PersonalData = getPersonal.value;

// Lista de eventos de la línea de tiempo profesional sincronizada con el store
const experienceStore = useExperienceStore();
const journeyItems = computed(() =>
  experienceStore.publicList.value.map(exp => ({
    period: `${exp.start} - ${exp.current || !exp.end ? t.value.admin.present : exp.end}`,
    role: getTranslatedText(exp.role),
    company: exp.company,
    description: getTranslatedText(exp.summary),
    technologies: exp.technologies
  }))
);
</script>

<style scoped>
.about {
  padding-top: 70px;
}

.about-hero {
  background: linear-gradient(135deg,
      rgba(76, 175, 80, 0.05) 0%,
      rgba(255, 193, 7, 0.05) 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.hero-text h1 {
  margin-bottom: var(--spacing-lg);
}

.hero-description {
  font-size: var(--font-size-lg);
  line-height: 1.7;
  color: var(--text-secondary);
}

.hero-image {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  border-radius: var(--border-radius-full);
  background-image: url("/src/assets/img/fotoPerfil2.jpg");
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

.personal-info {
  background-color: var(--bg-secondary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.info-grid> :nth-child(1) {
  margin-left: 1rem;
}

.info-grid> :nth-child(4) {
  margin-right: 1rem;
}

.info-card {
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.card-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.info-card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.info-card p {
  color: var(--text-secondary);
  margin: 0;
}

.journey {
  background-color: var(--bg-primary);
}

.journey-timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.journey-timeline::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom,
      var(--primary-color),
      var(--accent-color));
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: var(--spacing-2xl);
  display: flex;
  align-items: center;
}

.timeline-item:nth-child(odd) {
  flex-direction: row;
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-marker {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border: 4px solid var(--bg-primary);
  border-radius: var(--border-radius-full);
  transform: translateX(-50%);
  z-index: 2;
  box-shadow: var(--shadow-sm);
}

.timeline-content {
  width: 45%;
  background-color: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(76, 175, 80, 0.1);
  transition: all var(--transition-normal);
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-light);
}

.timeline-date {
  color: var(--primary-color);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
}

.timeline-content h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.timeline-content h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--primary-dark);
  margin-bottom: var(--spacing-sm);
}

.timeline-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.timeline-tech {
  margin-top: var(--spacing-sm);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  padding: 0;
  list-style: none;
}

.timeline-tech li {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 2px 6px;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
}

.goals {
  background-color: var(--bg-secondary);
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-xl);
}

.goal-card {
  background-color: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.goal-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.goal-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
}

.goal-card h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.goal-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: var(--font-size-lg);
  margin: 0;
}

.interests {
  background-color: var(--bg-primary);
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.interest-card {
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.interest-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.interest-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.interest-card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.interest-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.soft-skills {
  background-color: var(--bg-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.skill-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  background-color: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.skill-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.skill-icon {
  color: var(--primary-color);
  flex-shrink: 0;
  margin-top: var(--spacing-xs);
}

.skill-content h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.skill-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    text-align: center;
  }

  .image-placeholder {
    width: 250px;
    height: 250px;
  }

  .info-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
  }

  .journey-timeline::before {
    left: 30px;
  }

  .timeline-item {
    flex-direction: row !important;
    padding-left: 60px;
  }

  .timeline-marker {
    left: 30px;
  }

  .timeline-content {
    width: 100%;
  }

  .goals-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .interests-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .image-placeholder {
    width: 200px;
    height: 200px;
  }

  .info-card {
    padding: var(--spacing-lg);
  }

  .timeline-content {
    padding: var(--spacing-md);
  }

  .goal-card {
    padding: var(--spacing-xl);
  }

  .interest-card {
    padding: var(--spacing-lg);
  }

  .skill-item {
    padding: var(--spacing-md);
  }
}
</style>
