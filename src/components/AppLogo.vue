<template>
  <div 
    class="navbar-logo" 
    @click="handleClick"
    @touchend="handleTouch"
    @touchstart="preventScroll"
  >
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
let touchHandled = ref(false)

// Prevenir scroll accidental en touch
const preventScroll = (event: TouchEvent) => {
  touchHandled.value = false
}

// Manejar eventos touch específicamente en móvil
const handleTouch = (event: TouchEvent) => {
  event.preventDefault()
  event.stopPropagation()
  
  if (touchHandled.value) return
  touchHandled.value = true
  
  processClick()
}

// Manejar clicks de mouse/desktop
const handleClick = (event: Event) => {
  // Si ya se manejó con touch, evitar doble procesamiento
  if (touchHandled.value) {
    touchHandled.value = false
    return
  }
  
  event.preventDefault()
  event.stopPropagation()
  
  processClick()
}

// Lógica principal de procesamiento de clicks/touches
const processClick = () => {
  clicks.value++
  
  if (!timer) {
    // Aumentar tiempo de espera para dispositivos móviles
    const delay = window.innerWidth <= 768 ? 800 : 500
    
    timer = setTimeout(() => {
      if (clicks.value === 1) {
        // Solo navegar si estamos en una ruta diferente
        if (router.currentRoute.value.path !== '/') {
          router.push('/')
          emit('navigate-home')
        }
      }
      clicks.value = 0
      timer = null
    }, delay)
  }

  // Para abrir login necesitas 3 clicks rápidos
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
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  /* Mejorar area de toque en móvil */
  min-width: 44px;
  min-height: 44px;
  justify-content: center;
  /* Prevenir selección de texto */
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  /* Asegurar que esté por encima de otros elementos pero no del navbar */
  position: relative;
  z-index: 5;
}

.navbar-logo:hover {
  background-color: rgba(76, 175, 80, 0.1);
  transform: scale(1.05);
}

.navbar-logo:active {
  transform: scale(0.98);
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
