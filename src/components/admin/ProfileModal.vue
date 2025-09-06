<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        ref="modalRef"
      >
        <h2 id="profile-modal-title">{{ t.admin.profile.modal.title }}</h2>
        <form @submit.prevent="save">
          <section class="form-section">
            <div class="form-group">
              <label for="email">{{ t.admin.profile.fields.email }}</label>
              <input id="email" type="email" v-model="form.email" ref="firstInput" required />
            </div>
            <div class="form-group">
              <label for="phone">{{ t.admin.profile.fields.phone }}</label>
              <input id="phone" v-model="form.phone" />
            </div>
            <div class="form-group">
              <label for="linkedin">{{ t.admin.profile.fields.linkedin }}</label>
              <input id="linkedin" v-model="form.linkedin" />
            </div>
            <div class="form-group">
              <label for="github">{{ t.admin.profile.fields.github }}</label>
              <input id="github" v-model="form.github" />
            </div>
          </section>
          <section class="form-section">
            <div class="form-group">
              <label for="location-es">{{ t.admin.profile.fields.locationEs }}</label>
              <input id="location-es" v-model="form.location.es" />
            </div>
            <div class="form-group">
              <label for="location-en">{{ t.admin.profile.fields.locationEn }}</label>
              <input id="location-en" v-model="form.location.en" />
            </div>
          </section>
          <section class="form-section">
            <h3>{{ t.admin.profile.fields.otherLinks }}</h3>
            <div
              class="form-group other-link"
              v-for="(link, idx) in form.otherLinks"
              :key="idx"
            >
              <input
                v-model="link.key"
                :placeholder="t.admin.name"
              />
              <input
                v-model="link.url"
                :placeholder="t.admin.link"
              />
              <button
                type="button"
                class="btn btn-secondary"
                @click="removeOtherLink(idx)"
              >
                {{ t.admin.profile.fields.remove }}
              </button>
            </div>
            <button
              type="button"
              class="btn btn-secondary"
              @click="addOtherLink"
            >
              {{ t.admin.profile.fields.add }}
            </button>
          </section>
          <div class="buttons">
            <button type="button" class="btn btn-secondary" @click="cancel">
              {{ t.admin.profile.modal.cancel }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ t.admin.profile.modal.save }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '../../stores/main'
import { useContactStore } from '../../stores/contact'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)
const contactStore = useContactStore()
const { contact } = storeToRefs(contactStore)

const modalRef = ref<HTMLElement | null>(null)
const firstInput = ref<HTMLInputElement | null>(null)

interface OtherLink { key: string; url: string }
interface ContactForm {
  email: string
  phone: string
  location: { es: string; en: string }
  linkedin: string
  github: string
  otherLinks: OtherLink[]
}

const form = reactive<ContactForm>({
  email: '',
  phone: '',
  location: { es: '', en: '' },
  linkedin: '',
  github: '',
  otherLinks: []
})

const resetForm = () => {
  form.email = contact.value.email
  form.phone = contact.value.phone
  form.location.es = contact.value.location.es
  form.location.en = contact.value.location.en
  form.linkedin = contact.value.linkedin
  form.github = contact.value.github
  form.otherLinks = Object.entries(contact.value.otherLinks || {}).map(([key, url]) => ({ key, url }))
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      resetForm()
      nextTick(() => firstInput.value?.focus())
      window.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }
)

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

const cancel = () => emit('update:modelValue', false)

const save = () => {
  const payload = {
    email: form.email,
    phone: form.phone,
    location: { ...form.location },
    linkedin: form.linkedin,
    github: form.github,
    otherLinks: Object.fromEntries(form.otherLinks.filter(l => l.key && l.url).map(l => [l.key, l.url]))
  }
  contactStore.updateContact(payload)
  contactStore.saveContact()
  emit('update:modelValue', false)
}

const addOtherLink = () => form.otherLinks.push({ key: '', url: '' })
const removeOtherLink = (idx: number) => form.otherLinks.splice(idx, 1)
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}
.form-section {
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
.other-link {
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}
</style>
