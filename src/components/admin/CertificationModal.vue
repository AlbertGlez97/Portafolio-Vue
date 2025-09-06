<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
        ref="modalRef"
      >
        <h2 id="cert-modal-title">
          {{
            isEdit
              ? t.admin.certifications.modal.titleEdit
              : t.admin.certifications.modal.titleNew
          }}
        </h2>
          <form @submit.prevent="save">
            <section class="form-section">
              <div class="form-group">
                <label for="title-es">{{ t.admin.titleEs }}</label>
                <input id="title-es" ref="firstInput" v-model="form.title.es" required />
              </div>
              <div class="form-group">
                <label for="title-en">{{ t.admin.titleEn }}</label>
                <input id="title-en" v-model="form.title.en" required />
              </div>
              <div class="form-group">
                <label for="provider">{{ t.admin.provider }}</label>
                <input id="provider" v-model="form.provider" required />
              </div>
              <div class="form-group">
                <label for="icon">{{ t.admin.icon }}</label>
                <input id="icon" v-model="form.icon" required />
              </div>
            </section>

            <section class="form-section">
              <h3>{{ t.admin.descriptionEs }}</h3>
              <div class="form-group">
                <textarea v-model="form.description.es" maxlength="600" required />
              </div>
              <h3>{{ t.admin.descriptionEn }}</h3>
              <div class="form-group">
                <textarea v-model="form.description.en" maxlength="600" required />
              </div>
            </section>

            <div class="buttons">
              <button type="button" class="btn btn-secondary" @click="cancel">{{ t.admin.certifications.modal.cancel }}</button>
              <button type="submit" class="btn btn-primary">{{ t.admin.certifications.modal.save }}</button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
  </template>


<script setup lang="ts">
import { reactive, ref, watch, computed, nextTick, onUnmounted, onMounted } from 'vue'
import { useCertificationStore, useMainStore } from '../../stores'
import type { Certification } from '../../interfaces'
import { storeToRefs } from 'pinia'

const props = defineProps<{ modelValue: boolean; certification: Certification | null }>()
const emit = defineEmits(['update:modelValue'])
const certificationStore = useCertificationStore()
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

const modalRef = ref<HTMLElement | null>(null)
const firstInput = ref<HTMLInputElement | null>(null)

const blank: Certification = {
  id: 0,
  title: { es: '', en: '' },
  provider: '',
  icon: '',
  description: { es: '', en: '' },
  updatedAt: ''
}

const form = reactive<Certification>({ ...blank })

watch(
  () => props.certification,
  val => {
    Object.assign(form, val ? { ...val } : { ...blank })
  },
  { immediate: true }
)

const isEdit = computed(() => !!props.certification && props.certification.id !== 0)

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
  await certificationStore.ensureLoaded()
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

const cancel = () => emit('update:modelValue', false)

const save = () => {
  if (
    !form.title.es ||
    !form.title.en ||
    !form.provider ||
    !form.icon ||
    !form.description.es ||
    !form.description.en
  )
    return
  if (isEdit.value) {
    certificationStore.update({ ...form })
  } else {
    certificationStore.create({
      title: form.title,
      provider: form.provider,
      icon: form.icon,
      description: form.description
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
