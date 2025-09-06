<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-modal-title"
        ref="modalRef"
      >
        <h2 id="experience-modal-title">
          {{
            isEdit
              ? t.admin.experience.modal.titleEdit
              : t.admin.experience.modal.titleNew
          }}
        </h2>
        <form @submit.prevent="save">
          <section class="form-section">
            <div class="form-group">
              <label for="start">{{ t.admin.start }}</label>
              <input id="start" type="month" v-model="form.start" required />
            </div>
            <div class="form-group">
              <label for="end">{{ t.admin.end }}</label>
              <input id="end" type="month" v-model="form.end" :disabled="form.current" />
            </div>
            <div class="form-group">
              <label><input type="checkbox" v-model="form.current" /> {{ t.admin.current }}</label>
            </div>
            <div class="form-group">
              <label><input type="checkbox" v-model="form.featured" /> {{ t.admin.featured }}</label>
            </div>
          </section>

          <section class="form-section">
            <div class="form-group">
              <label for="role-es">{{ t.admin.roleEs }}</label>
              <input id="role-es" ref="firstInput" v-model="form.role.es" required />
            </div>
            <div class="form-group">
              <label for="role-en">{{ t.admin.roleEn }}</label>
              <input id="role-en" v-model="form.role.en" required />
            </div>
            <div class="form-group">
              <label for="company">{{ t.admin.company }}</label>
              <input id="company" v-model="form.company" required />
            </div>
            <div class="form-group">
              <label for="location">{{ t.admin.location }}</label>
              <input id="location" v-model="form.location" />
            </div>
          </section>

          <section class="form-section">
            <h3>{{ t.admin.summaryEs }}</h3>
            <div class="form-group">
              <textarea v-model="form.summary.es" maxlength="600" required />
            </div>
            <h3>{{ t.admin.summaryEn }}</h3>
            <div class="form-group">
              <textarea v-model="form.summary.en" maxlength="600" required />
            </div>
          </section>

          <section class="form-section">
            <h3>{{ t.admin.tech }}</h3>
            <div class="form-group">
              <div class="chips">
                <span v-for="(tech, idx) in form.technologies" :key="idx" class="chip">
                  {{ tech }}
                  <button type="button" @click="removeTech(idx)">×</button>
                </span>
              </div>
              <div class="tech-input">
                <input v-model="techInput" @keydown.enter.prevent="addTech" />
                <button type="button" class="btn btn-secondary" @click="addTech">{{ t.admin.experience.modal.addTech }}</button>
              </div>
            </div>
          </section>

          <div class="buttons">
            <button type="button" class="btn btn-secondary" @click="cancel">{{ t.admin.experience.modal.cancel }}</button>
            <button type="submit" class="btn btn-primary">{{ t.admin.experience.modal.save }}</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick, onUnmounted, onMounted } from 'vue'
import { useExperienceStore, useMainStore } from '../../stores'
import type { Experience } from '../../interfaces'
import { storeToRefs } from 'pinia'

const props = defineProps<{ modelValue: boolean; experience: Experience | null }>()
const emit = defineEmits(['update:modelValue'])
const experienceStore = useExperienceStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const modalRef = ref<HTMLElement | null>(null)
const firstInput = ref<HTMLInputElement | null>(null)

const blank: Experience = {
  id: 0,
  start: '',
  end: '',
  current: false,
  role: { es: '', en: '' },
  company: '',
  location: '',
  summary: { es: '', en: '' },
  technologies: [],
  featured: false,
  updatedAt: ''
}

const form = reactive<Experience>({ ...blank })
const techInput = ref('')

const resetForm = () => {
  Object.assign(form, blank)
  techInput.value = ''
}

watch(
  () => props.experience,
  val => {
    if (val) Object.assign(form, JSON.parse(JSON.stringify(val)))
    else resetForm()
  },
  { immediate: true }
)

const isEdit = computed(() => !!props.experience && props.experience.id !== 0)

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

onMounted(async () => {
  await experienceStore.ensureLoaded()
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

const addTech = () => {
  if (techInput.value.trim()) {
    form.technologies.push(techInput.value.trim())
    techInput.value = ''
  }
}
const removeTech = (idx: number) => form.technologies.splice(idx, 1)

const cancel = () => emit('update:modelValue', false)

const save = () => {
  if (!form.start || !form.role.es || !form.role.en || !form.company || !form.summary.es || !form.summary.en)
    return
  if (!form.current && form.end && form.end < form.start) return
  if (isEdit.value) {
    experienceStore.update({ ...form })
  } else {
    experienceStore.create({
      start: form.start,
      end: form.end,
      current: form.current,
      role: form.role,
      company: form.company,
      location: form.location,
      summary: form.summary,
      technologies: form.technologies,
      featured: form.featured
    })
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
