<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="close">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <h2 id="login-title">{{ t.auth.title }}</h2>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="user">{{ t.auth.username }}</label>
            <input
              id="user"
              ref="userInput"
              v-model="username"
              :class="{ error }"
              autocomplete="username"
            />
          </div>
          <div class="form-group">
            <label for="pass">{{ t.auth.password }}</label>
            <input
              id="pass"
              type="password"
              v-model="password"
              :class="{ error }"
              autocomplete="current-password"
            />
          </div>
          <p v-if="error" class="error-message" aria-live="polite">{{ error }}</p>
          <div class="buttons">
            <button type="button" class="btn btn-secondary" @click="close">
              {{ t.auth.cancel }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ t.auth.accept }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useMainStore } from '../stores/main'
import { storeToRefs } from 'pinia'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const username = ref('')
const password = ref('')
const error = ref('')
const userInput = ref<HTMLInputElement | null>(null)
const auth = useAuthStore()
const router = useRouter()
const store = useMainStore()
const { t } = storeToRefs(store)

const close = () => {
  emit('update:modelValue', false)
  error.value = ''
  username.value = ''
  password.value = ''
}

const submit = () => {
  const result = auth.login(username.value, password.value)
  if (result.ok) {
    close()
    router.push('/admin')
  } else {
    error.value = result.error || t.value.auth.errorInvalid
  }
}

const handleKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      nextTick(() => userInput.value?.focus())
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
  max-width: 480px;
  box-shadow: var(--shadow-md);
  border: 1px solid color-mix(in srgb, var(--primary-color), transparent 90%);
  transition: all var(--transition-normal);
  z-index: var(--z-modal);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  margin-bottom: var(--spacing-xs);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.form-group input {
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

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color), transparent 90%);
}

.form-group input.error {
  border-color: var(--danger-color);
}

.error-message {
  color: var(--danger-color);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
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
