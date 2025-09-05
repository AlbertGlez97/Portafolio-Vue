<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="modal-backdrop"
      @click.self="cancel"
    >
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        ref="modalRef"
      >
        <h2 id="project-modal-title">
          {{ isEdit ? t.admin.modal.titleEdit : t.admin.modal.titleNew }}
        </h2>
        <form @submit.prevent="save">
          <section class="form-section">
            <div class="form-group">
              <label for="title-es">{{ t.admin.modal.titleEs }}</label>
              <input id="title-es" ref="firstInput" v-model="form.title.es" required />
            </div>
            <div class="form-group">
              <label for="title-en">{{ t.admin.modal.titleEn }}</label>
              <input id="title-en" v-model="form.title.en" required />
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" v-model="featured" />
                {{ t.admin.modal.featured }}
              </label>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" v-model="form.confidential" />
                {{ t.admin.modal.confidential }}
              </label>
            </div>
            <div class="form-group">
              <label for="company">{{ t.admin.modal.company }}</label>
              <input id="company" v-model="form.company" />
            </div>
          </section>

          <section class="form-section">
            <h3>{{ t.admin.modal.contentEs }}</h3>
            <div class="form-group">
              <label for="desc-es">{{ t.admin.modal.descriptionEs }}</label>
              <textarea id="desc-es" v-model="form.description.es" required />
            </div>
            <h3>{{ t.admin.modal.contentEn }}</h3>
            <div class="form-group">
              <label for="desc-en">{{ t.admin.modal.descriptionEn }}</label>
              <textarea id="desc-en" v-model="form.description.en" required />
            </div>
            <div class="form-group">
              <label>{{ t.admin.modal.features }}</label>
              <div v-for="(ft, idx) in form.features" :key="idx" class="feature-item">
                <input v-model="ft.es" placeholder="ES" />
                <input v-model="ft.en" placeholder="EN" />
                <button type="button" class="btn btn-secondary" @click="removeFeature(idx)">×</button>
              </div>
              <button type="button" class="btn btn-secondary" @click="addFeature">
                {{ t.admin.modal.addFeature }}
              </button>
            </div>
          </section>

          <section class="form-section">
            <h3>{{ t.admin.modal.technologies }}</h3>
            <div class="form-group">
              <div class="chips">
                <span v-for="(tech, index) in form.technologies" :key="index" class="chip">
                  {{ tech }}
                  <button type="button" @click="removeTech(index)">×</button>
                </span>
              </div>
              <div class="tech-input">
                <input v-model="techInput" @keydown.enter.prevent="addTech" />
                <button type="button" class="btn btn-secondary" @click="addTech">
                  {{ t.admin.modal.addTech }}
                </button>
              </div>
            </div>
          </section>

          <section class="form-section">
            <h3>{{ t.admin.modal.links }}</h3>
            <div class="form-group">
              <label for="url">{{ t.admin.modal.projectUrl }}</label>
              <input id="url" type="url" v-model="form.url" />
            </div>
            <div class="form-group">
              <label for="github">{{ t.admin.modal.githubUrl }}</label>
              <input id="github" type="url" v-model="form.github" />
            </div>
          </section>

          <section class="form-section">
            <h3>{{ t.admin.modal.image }}</h3>
            <div class="form-group">
              <label for="image">{{ t.admin.modal.imagePath }}</label>
              <input id="image" v-model="form.image" />
              <img v-if="form.image" :src="form.image" alt="preview" class="preview" />
            </div>
          </section>

          <div class="buttons">
            <button type="button" class="btn btn-secondary" @click="cancel">
              {{ t.admin.modal.cancel }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ t.admin.modal.save }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick, onUnmounted, computed } from 'vue'
import { useProjectsStore, useMainStore } from '../../stores'
import type { Project } from '../../interfaces'
import { storeToRefs } from 'pinia'

const props = defineProps<{ modelValue: boolean; project?: Project | null; featured?: boolean }>()
const emit = defineEmits(['update:modelValue'])

const projectsStore = useProjectsStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const modalRef = ref<HTMLElement | null>(null)
const firstInput = ref<HTMLInputElement | null>(null)

const featured = ref(false)

const blankProject: Project = {
  id: 0,
  title: { es: '', en: '' },
  type: { es: '', en: '' },
  description: { es: '', en: '' },
  features: [],
  technologies: [],
  image: '',
  url: '',
  github: '',
  company: '',
  confidential: false
}

const form = reactive<Project>({ ...blankProject })
const techInput = ref('')

const resetForm = () => {
  Object.assign(form, blankProject)
  featured.value = false
  techInput.value = ''
}

watch(
  () => props.project,
  val => {
    if (val) {
      Object.assign(form, JSON.parse(JSON.stringify(val)))
    } else {
      resetForm()
    }
    featured.value = props.featured || false
  },
  { immediate: true }
)

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') cancel()
  trapFocus(e)
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      nextTick(() => firstInput.value?.focus())
      window.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})

const trapFocus = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !modalRef.value) return
  const focusables = modalRef.value.querySelectorAll<HTMLElement>(
    'input, textarea, button, select, a[href], [tabindex]:not([tabindex="-1"])'
  )
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      ;(last as HTMLElement).focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      ;(first as HTMLElement).focus()
    }
  }
}

const addFeature = () => form.features!.push({ es: '', en: '' })
const removeFeature = (idx: number) => form.features!.splice(idx, 1)

const addTech = () => {
  if (techInput.value.trim()) {
    form.technologies.push(techInput.value.trim())
    techInput.value = ''
  }
}
const removeTech = (idx: number) => form.technologies.splice(idx, 1)

const cancel = () => {
  emit('update:modelValue', false)
}

const isEdit = computed(() => !!props.project && props.project.id !== 0)

const save = () => {
  if (!form.title.es || !form.title.en) return
  form.type = featured.value
    ? { es: 'Destacado', en: 'Featured' }
    : { es: 'Otro', en: 'Other' }
  if (isEdit.value) {
    projectsStore.updateProject({ ...form }, featured.value)
  } else {
    form.id = projectsStore.getNextId()
    projectsStore.addProject({ ...form }, featured.value)
  }
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--overlay-bg);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  z-index: var(--z-overlay);
}
.modal {
  position: relative;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-md);
  border: 1px solid color-mix(in srgb, var(--primary-color), transparent 90%);
  transition: all var(--transition-normal);
  z-index: var(--z-modal);
}
.form-section {
  margin-bottom: var(--spacing-lg);
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
}
.form-group label {
  margin-bottom: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid color-mix(in srgb, var(--primary-color), transparent 80%);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  font-family: inherit;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: all var(--transition-fast);
}
.form-group textarea {
  min-height: 80px;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color), transparent 90%);
}
.feature-item {
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
  margin-bottom: var(--spacing-xs);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0 var(--spacing-xs);
  border-radius: var(--border-radius-md);
  background: var(--primary-color);
  color: var(--bg-primary);
  font-size: var(--font-size-sm);
}
.chip button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  margin-left: var(--spacing-xs);
}
.tech-input {
  display: flex;
  gap: var(--spacing-xs);
}
.preview {
  width: 80px;
  height: auto;
  margin-top: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  flex-wrap: wrap;
}
.buttons .btn {
  flex: 1 1 auto;
}
@media (max-width: 480px) {
  .buttons {
    flex-direction: column;
  }
  .buttons .btn {
    width: 100%;
  }
}
</style>
