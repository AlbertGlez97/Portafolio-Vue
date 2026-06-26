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
                v-for="skill in frontendSkills"
                :key="skill.id"
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
                v-for="skill in backendSkills"
                :key="skill.id"
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
            <div
              class="tool-category"
              :class="`tool-category--${cat}`"
              v-for="(list, cat) in toolsByCategory"
              :key="cat"
            >
              <div class="category-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="categoryIcons[cat] || categoryIcons.default"/>
                </svg>
              </div>
              <h3>{{ t.skills[cat] || cat }}</h3>
              <div class="tools-list">
                <TechBadge
                  v-for="tool in list"
                  :key="tool.id"
                  :label="tool.name[currentLanguage]"
                  :title="tool.description[currentLanguage]"
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
            v-for="skill in softItems"
            :key="skill.id"
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
import { computed } from 'vue'
import { useMainStore } from '../stores/main'
import {
  useTechnicalSkillsStore,
  useToolStore,
  useSoftSkillStore
} from '../stores'
import SkillBar from '../components/SkillBar.vue'
import TechBadge from '../components/TechBadge.vue'
import type { ToolEntry } from '../interfaces'

const mainStore = useMainStore()
const techStore = useTechnicalSkillsStore()
const toolStore = useToolStore()
const softStore = useSoftSkillStore()
const { t, currentLanguage } = storeToRefs(mainStore)
const { frontendSkills, backendSkills } = storeToRefs(techStore)
const { items: toolItems } = storeToRefs(toolStore)
const { items: softItems } = storeToRefs(softStore)

techStore.ensureLoaded()
toolStore.ensureLoaded()
softStore.ensureLoaded()

const toolsByCategory = computed(() => {
  const grouped: Record<string, ToolEntry[]> = {}
  for (const t of toolItems.value) {
    grouped[t.category] = grouped[t.category] || []
    grouped[t.category].push(t)
  }
  return grouped
})

const categoryIcons: Record<string, string> = {
  devops:        'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z',
  methodologies: 'M12,5V1L7,6L12,11V7A6,6 0 0,1 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13H4A8,8 0 0,0 12,21A8,8 0 0,0 20,13A8,8 0 0,0 12,5Z',
  testing:       'M9,2H15A1,1 0 0,1 16,3V7.78L17.37,11H20A1,1 0 0,1 21,12V14A1,1 0 0,1 20,15H19.37L21,19.22V20A1,1 0 0,1 20,21H4A1,1 0 0,1 3,20V19.22L4.63,15H4A1,1 0 0,1 3,14V12A1,1 0 0,1 4,11H6.63L8,7.78V3A1,1 0 0,1 9,2M9.2,13A2.8,2.8 0 0,0 6.4,15.8A2.8,2.8 0 0,0 9.2,18.6A2.8,2.8 0 0,0 12,15.8A2.8,2.8 0 0,0 9.2,13M14.8,13A2.8,2.8 0 0,0 12,15.8A2.8,2.8 0 0,0 14.8,18.6A2.8,2.8 0 0,0 17.6,15.8A2.8,2.8 0 0,0 14.8,13M10,4V7H14V4H10Z',
  webtech:       'M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z',
  cms:           'M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M13,3.5L18.5,9H13V3.5M8,11H16V13H8V11M8,15H13V17H8V15Z',
  default:       'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
}
</script>

<style scoped>
.skills {
  padding-top: 70px;
}

.skills-hero {
  background: transparent;
  text-align: center;
}

.skills-hero .section-title {
  font-style: italic;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.4s var(--ease-out-expo);
}

.skill-category:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(76, 175, 80, 0.15);
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
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
  transition: all 0.4s var(--ease-out-expo);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-top: 3px solid var(--category-color, var(--primary-color));
}

.tool-category:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--category-color, var(--primary-color));
  border-top-color: var(--category-color, var(--primary-color));
}

.tool-category--devops        { --category-color: #3b82f6; }
.tool-category--methodologies { --category-color: #8b5cf6; }
.tool-category--testing       { --category-color: #f59e0b; }
.tool-category--webtech       { --category-color: #10b981; }
.tool-category--cms           { --category-color: #ec4899; }

.tool-category .category-icon {
  color: var(--category-color, var(--primary-color));
}

.category-icon {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-md);
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
  transition: all 0.4s var(--ease-out-expo);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.soft-skill-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(76, 175, 80, 0.15);
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
