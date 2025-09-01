<template>
  <main class="skills">
    <div class="container">
      <!-- Hero Section -->
      <section class="skills-hero section">
        <div class="hero-content animate-fadeInUp">
          <h1 class="section-title">{{ t.nav.skills }}</h1>
          <p class="hero-subtitle">{{ t.skills.subtitle }}</p>
        </div>
      </section>

      <!-- Technical Skills -->
      <section class="technical-skills section">
        <h2 class="section-title">{{ t.skills.technical }}</h2>
        <div class="skills-grid">
          <!-- Frontend Skills -->
          <div class="skill-category">
            <div class="category-header">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
              </svg>
              <h3>{{ t.skills.frontend }}</h3>
            </div>
            
            <div class="skills-list">
              <SkillBar 
                v-for="skill in skillsData.technical.frontend"
                :key="skill.name.en"
                :skill="skill"
              />
            </div>
          </div>

          <!-- Backend Skills -->
          <div class="skill-category">
            <div class="category-header">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
              </svg>
              <h3>{{ t.skills.backend }}</h3>
            </div>
            
            <div class="skills-list">
              <SkillBar 
                v-for="skill in skillsData.technical.backend"
                :key="skill.name.en"
                :skill="skill"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Tools & Technologies -->
      <section class="tools-section section">
        <div class="tools-content">
          <h2 class="section-title">{{ t.skills.toolsTech }}</h2>
          <div class="tools-grid">
            <div class="tool-category">
              <div class="category-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2Z"/>
                </svg>
              </div>
              <h3>{{ t.skills.tools }}</h3>
              <div class="tools-list">
                <TechBadge
                  v-for="tool in skillsData.tools"
                  :key="tool.name.en"
                  :label="tool.name[currentLanguage]"
                  :title="tool.description[currentLanguage]"
                  size="sm"
                />
              </div>
            </div>

            <div class="tool-category">
              <div class="category-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16,4C18.11,4 20.11,4.89 21.61,6.39C23.11,7.89 24,9.89 24,12A8,8 0 0,1 16,20H5A5,5 0 0,1 0,15A5,5 0 0,1 5,10C5.59,10 6.16,10.13 6.69,10.36C7.61,7.24 10.57,5 14,5C14.68,5 15.34,5.11 16,5.28V4Z"/>
                </svg>
              </div>
              <h3>{{ t.skills.methodologies }}</h3>
              <div class="tools-list">
                <TechBadge
                  v-for="methodology in skillsData.methodologies"
                  :key="methodology.name.en"
                  :label="methodology.name[currentLanguage]"
                  :title="methodology.description[currentLanguage]"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Soft Skills -->
      <section class="soft-skills section">
        <h2 class="section-title">{{ t.skills.soft }}</h2>
        <div class="soft-skills-grid">
          <div
            v-for="skill in skillsData.soft"
            :key="skill.name.en"
            class="soft-skill-item animate-fadeInUp"
          >
            <div class="skill-content">
              <h3>{{ skill.name[currentLanguage] }}</h3>
              <p>{{ skill.description[currentLanguage] }}</p>
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
import { useSkillsStore } from '../stores/skills'
import SkillBar from '../components/SkillBar.vue'
import TechBadge from '../components/TechBadge.vue'
import type { SkillsData } from '../interfaces'

const mainStore = useMainStore()
const skillsStore = useSkillsStore()
const { t, currentLanguage } = storeToRefs(mainStore)
const { getSkills } = storeToRefs(skillsStore)
const skillsData: SkillsData = getSkills.value
</script>

<style scoped>
.skills {
  padding-top: 70px;
}

.skills-hero {
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

.technical-skills {
  background-color: var(--bg-primary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-2xl);
}

.skill-category {
  background-color: var(--bg-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(76, 175, 80, 0.1);
  transition: all var(--transition-normal);
}

.skill-category:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid rgba(76, 175, 80, 0.1);
}

.category-header svg {
  color: var(--primary-color);
}

.category-header h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.tools-section {
  background-color: var(--bg-secondary);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.tool-category {
  background-color: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.tool-category:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.category-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

.tool-category h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.tools-list .tech-badge {
  cursor: help;
}


.soft-skills {
  background-color: var(--bg-primary);
}

.soft-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.soft-skill-item {
  background-color: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.soft-skill-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
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
  .skills-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .skill-category {
    padding: var(--spacing-xl);
  }

  .tools-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .soft-skills-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .soft-skill-item {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .skill-category {
    padding: var(--spacing-lg);
  }

  .tool-category {
    padding: var(--spacing-lg);
  }

  .soft-skill-item {
    padding: var(--spacing-md);
  }
}

/* Dark mode */
</style>
