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
            <div
              class="form-group"
              v-for="(email, idx) in form.emails"
              :key="`email-${idx}`"
            >
              <label :for="`email-${idx}`">
                {{ t.admin.profile.fields.email }} {{ idx + 1 }}
              </label>
              <div class="dynamic-item">
                <input
                  :id="`email-${idx}`"
                  type="email"
                  v-model="form.emails[idx]"
                  :ref="idx === 0 ? firstInput : undefined"
                  required
                />
                <button
                  v-if="form.emails.length > 1"
                  type="button"
                  class="btn btn-secondary"
                  @click="removeEmail(idx)"
                >
                  {{ t.admin.profile.fields.remove }}
                </button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" @click="addEmail">
              {{ t.admin.profile.fields.addEmail }}
            </button>
            <div
              class="form-group"
              v-for="(phone, idx) in form.phones"
              :key="`phone-${idx}`"
            >
              <label :for="`phone-${idx}`">
                {{ t.admin.profile.fields.phone }} {{ idx + 1 }}
              </label>
              <div class="dynamic-item">
                <input :id="`phone-${idx}`" v-model="form.phones[idx]" />
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="removePhone(idx)"
                >
                  {{ t.admin.profile.fields.remove }}
                </button>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" @click="addPhone">
              {{ t.admin.profile.fields.addPhone }}
            </button>
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
import type { ContactInfo } from '../../stores/contact'

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
  emails: string[]
  phones: string[]
  location: { es: string; en: string }
  linkedin: string
  github: string
  otherLinks: OtherLink[]
}

const form = reactive<ContactForm>({
  emails: [''],
  phones: [],
  location: { es: '', en: '' },
  linkedin: '',
  github: '',
  otherLinks: []
})

const resetForm = () => {
  form.emails = contact.value.emails.length
    ? [...contact.value.emails]
    : ['']
  form.phones = contact.value.phones ? [...contact.value.phones] : []
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emails = form.emails.map(e => e.trim()).filter(Boolean)
  if (!emails[0] || !emailRegex.test(emails[0])) return
  const phones = form.phones.map(p => p.trim()).filter(Boolean)
  const payload: ContactInfo = {
    emails,
    location: { ...form.location },
    linkedin: form.linkedin,
    github: form.github,
    otherLinks: Object.fromEntries(
      form.otherLinks.filter(l => l.key && l.url).map(l => [l.key, l.url])
    ),
    ...(phones.length ? { phones } : {})
  }
  contactStore.updateContact(payload)
  contactStore.saveContact()
  emit('update:modelValue', false)
}

const addOtherLink = () => form.otherLinks.push({ key: '', url: '' })
const removeOtherLink = (idx: number) => form.otherLinks.splice(idx, 1)
const addEmail = () => form.emails.push('')
const removeEmail = (idx: number) => form.emails.splice(idx, 1)
const addPhone = () => form.phones.push('')
const removePhone = (idx: number) => form.phones.splice(idx, 1)
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
.dynamic-item,
.other-link {
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
  margin-bottom: var(--spacing-xs);
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
