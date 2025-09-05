<template>
  <div v-if="modelValue" class="modal-backdrop" @click.self="close">
    <div class="modal" role="dialog" aria-modal="true">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="submit">
        <div class="field">
          <label for="user">Usuario</label>
          <input id="user" ref="userInput" v-model="username" />
        </div>
        <div class="field">
          <label for="pass">Contraseña</label>
          <input id="pass" type="password" v-model="password" />
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <div class="buttons">
          <button type="button" @click="close">Cancelar</button>
          <button type="submit">Aceptar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const username = ref('')
const password = ref('')
const error = ref('')
const userInput = ref<HTMLInputElement | null>(null)
const auth = useAuthStore()
const router = useRouter()

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
    error.value = result.error || 'Credenciales inválidas'
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
    } else {
      window.removeEventListener('keydown', handleKey)
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  width: 300px;
  max-width: 90%;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.error {
  color: red;
  margin-bottom: 0.5rem;
}
</style>
