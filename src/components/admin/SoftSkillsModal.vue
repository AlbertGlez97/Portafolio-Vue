<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div class="modal" role="dialog" aria-modal="true" ref="modalRef">
        <h2>{{ isEdit ? t.admin.softSkills.modal.titleEdit : t.admin.softSkills.modal.titleNew }}</h2>
        <form @submit.prevent="save">
          <section class="form-section">
            <div class="form-group">
              <label for="name-es">{{ t.admin.titleEs }}</label>
              <input id="name-es" ref="firstInput" v-model="form.name.es" required />
            </div>
            <div class="form-group">
              <label for="name-en">{{ t.admin.titleEn }}</label>
              <input id="name-en" v-model="form.name.en" required />
            </div>
          </section>
          <section class="form-section">
            <h3>{{ t.admin.descriptionEs }}</h3>
            <div class="form-group">
              <textarea v-model="form.description.es" required />
            </div>
            <h3>{{ t.admin.descriptionEn }}</h3>
            <div class="form-group">
              <textarea v-model="form.description.en" required />
            </div>
          </section>
          <div class="buttons">
            <button type="button" class="btn btn-secondary" @click="cancel">{{ t.admin.softSkills.modal.cancel }}</button>
            <button type="submit" class="btn btn-primary">{{ t.admin.softSkills.modal.save }}</button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSoftSkillStore, useMainStore } from '../../stores'
import type { SoftSkillEntry } from '../../interfaces'

const props = defineProps<{ modelValue: boolean; skill: SoftSkillEntry | null }>()
const emit = defineEmits(['update:modelValue'])

const softStore = useSoftSkillStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const emptyForm: SoftSkillEntry = {
  id: 0,
  name: { es: '', en: '' },
  description: { es: '', en: '' }
}
const form = reactive<SoftSkillEntry>({ ...emptyForm })

const isEdit = computed(() => !!props.skill)
const firstInput = ref<HTMLInputElement | null>(null)
const modalRef = ref<HTMLElement | null>(null)

watch(
  () => props.skill,
  val => {
    if (val) Object.assign(form, val)
    else Object.assign(form, { ...emptyForm })
  },
  { immediate: true }
)

const save = () => {
  if (!form.name.es || !form.name.en) return
  if (isEdit.value) softStore.update(form)
  else softStore.create({ ...form })
  emit('update:modelValue', false)
  Object.assign(form, { ...emptyForm })
}

const cancel = () => {
  emit('update:modelValue', false)
  Object.assign(form, { ...emptyForm })
}

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') cancel()
  trapFocus(e)
}

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

watch(
  () => props.modelValue,
  async val => {
    if (val) {
      await nextTick()
      firstInput.value?.focus()
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
