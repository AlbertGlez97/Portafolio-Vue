<template>
  <div class="navbar-logo" @click="handleClick">
    <span class="logo-text">AG</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['open-login', 'navigate-home'])
const router = useRouter()

const clicks = ref(0)
let timer: ReturnType<typeof setTimeout> | null = null

const handleClick = () => {
  clicks.value++
  if (!timer) {
    timer = setTimeout(() => {
      if (clicks.value === 1) {
        router.push('/')
        emit('navigate-home')
      }
      clicks.value = 0
      timer = null
    }, 500)
  }

  if (clicks.value === 3) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    clicks.value = 0
    emit('open-login')
  }
}
</script>

<style scoped>
.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.logo-text {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
