<template>
  <main class="education">
    <div class="container">
      <!-- Hero Section -->
      <section class="education-hero section">
        <div class="hero-content animate-fadeInUp">
          <h1 class="section-title">{{ t.nav.education }}</h1>
          <p class="hero-subtitle">{{ t.education.subtitle }}</p>
        </div>
      </section>

      <!-- Academic Education -->
      <section class="academic-section section">
        <h2 class="section-title">{{ t.education.academic }}</h2>
        <div class="education-card main-degree animate-fadeInUp">
          <div class="card-header">
            <div class="degree-info">
              <div class="institution-logo">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
              </div>
              <div class="degree-details">
                <h3>{{ getTranslatedText(educationData.academic.degree) }}</h3>
                <h4>{{ educationData.academic.institution }}</h4>
                <div class="degree-meta">
                  <span class="period">{{ educationData.academic.period }}</span>
                  <span class="status completed">{{ getTranslatedText(educationData.academic.status) }}</span>
                </div>
              </div>
            </div>
            <div class="degree-badge">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
              </svg>
            </div>
          </div>
          
          <div class="card-content">
            <p class="degree-description">{{ getTranslatedText(educationData.academic.description) }}</p>
            
            <div class="subjects-covered">
              <h5>{{ t.education.studyAreas }}</h5>
              <div class="subjects-grid">
                <div 
                  v-for="subject in educationData.academic.subjects" 
                  :key="subject.name.en"
                  class="subject-item"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path v-if="subject.icon === 'code'" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                    <path v-else-if="subject.icon === 'database'" d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
                    <path v-else-if="subject.icon === 'agile'" d="M16,4C18.11,4 20.11,4.89 21.61,6.39C23.11,7.89 24,9.89 24,12A8,8 0 0,1 16,20H5A5,5 0 0,1 0,15A5,5 0 0,1 5,10C5.59,10 6.16,10.13 6.69,10.36C7.61,7.24 10.57,5 14,5C14.68,5 15.34,5.11 16,5.28V4Z"/>
                    <path v-else-if="subject.icon === 'architecture'" d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2Z"/>
                    <path v-else-if="subject.icon === 'algorithm'" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z"/>
                    <path v-else d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"/>
                  </svg>
                  <span>{{ getTranslatedText(subject.name) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Professional Certifications -->
      <section class="certifications-section section">
        <h2 class="section-title">{{ t.education.certifications }}</h2>
        <div class="certifications-grid">
          <CertificationCard 
            v-for="certification in educationData.certifications" 
            :key="certification.id"
            :certification="certification"
            class="animate-fadeInUp"
          />
        </div>
      </section>

      <!-- Learning Philosophy -->
      <section class="philosophy-section section">
        <div class="philosophy-content">
          <h2 class="section-title">{{ t.education.philosophy }}</h2>
          <div class="philosophy-grid">
            <div 
              v-for="philosophy in educationData.philosophy" 
              :key="philosophy.title.en"
              class="philosophy-card animate-fadeInUp"
            >
              <div class="philosophy-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path v-if="philosophy.icon === 'learning'" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                  <path v-else-if="philosophy.icon === 'practice'" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                  <path v-else d="M16,4C18.11,4 20.11,4.89 21.61,6.39C23.11,7.89 24,9.89 24,12A8,8 0 0,1 16,20H5A5,5 0 0,1 0,15A5,5 0 0,1 5,10C5.59,10 6.16,10.13 6.69,10.36C7.61,7.24 10.57,5 14,5C14.68,5 15.34,5.11 16,5.28V4Z"/>
                </svg>
              </div>
              <h3>{{ getTranslatedText(philosophy.title) }}</h3>
              <p>{{ getTranslatedText(philosophy.description) }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Future Learning Goals -->
      <section class="future-goals-section section">
        <div class="goals-content">
          <h2 class="section-title">{{ t.education.goals }}</h2>
          <div class="goals-timeline">
            <div 
              v-for="goal in educationData.goals" 
              :key="goal.id"
              class="goal-item"
              :class="goal.id % 2 === 0 ? 'animate-fadeInRight' : 'animate-fadeInLeft'"
            >
              <div class="goal-marker">
                <span class="goal-number">{{ goal.id }}</span>
              </div>
              <div class="goal-content">
                <h3>{{ getTranslatedText(goal.title) }}</h3>
                <p>{{ getTranslatedText(goal.description) }}</p>
                <div class="goal-timeline-info">
                  <span class="goal-period">{{ getTranslatedText(goal.period) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'
import { useEducationStore } from '../stores/education'
import CertificationCard from '../components/CertificationCard.vue'
import type { EducationData } from '../interfaces'

const mainStore = useMainStore()
const educationStore = useEducationStore()
const { t } = storeToRefs(mainStore)
const { getTranslatedText } = mainStore
const { getEducation } = storeToRefs(educationStore)
const educationData: EducationData = getEducation.value
</script>

<style scoped>
.education {
  padding-top: 70px;
}

.education-hero {
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.05) 0%, 
    rgba(255, 193, 7, 0.05) 100%);
  text-align: center;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
}

.academic-section {
  background-color: var(--bg-primary);
}

.education-card {
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  border: 2px solid var(--primary-light);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.education-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-color);
}

.main-degree {
  background: linear-gradient(135deg, 
    rgba(76, 175, 80, 0.05), 
    rgba(255, 193, 7, 0.05));
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacing-2xl);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--text-white);
}

.degree-info {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.institution-logo {
  background-color: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  color: var(--text-white);
}

.degree-details h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-white);
}

.degree-details h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
  color: rgba(255, 255, 255, 0.9);
}

.degree-meta {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.period {
  color: rgba(255, 255, 255, 0.8);
  font-weight: var(--font-weight-medium);
}

.status {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.completed {
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--text-white);
}

.degree-badge {
  background-color: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-full);
  color: var(--text-white);
}

.card-content {
  padding: var(--spacing-2xl);
}

.degree-description {
  font-size: var(--font-size-lg);
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.subjects-covered h5 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.subject-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: var(--border-radius-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.subject-item:hover {
  background-color: rgba(76, 175, 80, 0.15);
  transform: translateX(5px);
}

.subject-item svg {
  color: var(--primary-color);
  flex-shrink: 0;
}

.certifications-section {
  background-color: var(--bg-secondary);
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
}

.philosophy-section {
  background-color: var(--bg-primary);
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.philosophy-card {
  background-color: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.philosophy-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.philosophy-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
}

.philosophy-card h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.philosophy-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.future-goals-section {
  background-color: var(--bg-secondary);
}

.goals-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.goal-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  position: relative;
}

.goal-item:last-child {
  margin-bottom: 0;
}

.goal-marker {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-white);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
  box-shadow: var(--shadow-md);
}

.goal-content {
  flex: 1;
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.goal-content:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.goal-content h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.goal-content p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.goal-timeline-info {
  display: flex;
  justify-content: flex-end;
}

.goal-period {
  background-color: rgba(76, 175, 80, 0.1);
  color: var(--primary-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Responsive */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }

  .degree-info {
    flex-direction: column;
    text-align: center;
  }

  .degree-meta {
    justify-content: center;
  }

  .card-content {
    padding: var(--spacing-xl);
  }

  .subjects-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .certifications-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .philosophy-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .goal-item {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-md);
  }

  .goal-marker {
    align-self: center;
  }

  .goal-timeline-info {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .card-header {
    padding: var(--spacing-xl);
  }

  .card-content {
    padding: var(--spacing-lg);
  }

  .degree-details h3 {
    font-size: var(--font-size-xl);
  }

  .subjects-grid {
    grid-template-columns: 1fr;
  }

  .subject-item {
    justify-content: center;
  }

  .philosophy-card {
    padding: var(--spacing-lg);
  }

  .goal-content {
    padding: var(--spacing-lg);
  }

  .goal-marker {
    width: 50px;
    height: 50px;
    font-size: var(--font-size-lg);
  }
}
</style>
