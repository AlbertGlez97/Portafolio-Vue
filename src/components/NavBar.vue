<template>
  <!-- Navegación principal del sitio -->
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo que redirige al inicio con opción de login -->
        <AppLogo @open-login="emit('open-login')" @navigate-home="closeMenu" />

        <!-- Menú de navegación en versión escritorio -->
        <ul class="navbar-menu desktop-menu">
          <li v-for="item in menuItems" :key="item.name">
            <router-link 
              :to="item.path" 
              class="navbar-link"
              :class="{ active: $route.path === item.path }"
            >
              {{ t.nav[item.name as keyof typeof t.nav] }}
            </router-link>
          </li>
        </ul>

        <!-- Controles de idioma, tema y menú móvil -->
        <div class="navbar-controls">
          <!-- Interruptor de idioma -->
          <button
            @click="toggleLanguage"
            class="control-btn language-btn"
            :title="currentLanguage === 'es' ? t.navbar.switchToEnglish : t.navbar.switchToSpanish"
          >
            {{ currentLanguage === 'es' ? 'EN' : 'ES' }}
          </button>

          <!-- Interruptor de modo oscuro/claro -->
          <button
            @click="toggleDarkMode"
            class="control-btn theme-btn"
            :title="isDarkMode ? t.navbar.lightMode : t.navbar.darkMode"
          >
            <span v-if="isDarkMode">☀️</span>
            <span v-else>🌙</span>
          </button>

          <!-- Icono de cierre de sesión -->
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="control-btn logout-btn"
            :title="t.actions.signOut"
            :aria-label="t.actions.signOut"
          >
            🚪
          </button>

          <!-- Botón hamburguesa para menú móvil -->
          <button
            @click="toggleMenu"
            class="control-btn mobile-menu-btn"
            :class="{ active: isMenuOpen }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- Menú lateral en móviles -->
      <div class="mobile-menu" :class="{ active: isMenuOpen }">
        <ul class="mobile-menu-list">
          <li v-for="item in menuItems" :key="item.name">
            <router-link 
              :to="item.path" 
              class="mobile-menu-link"
              :class="{ active: $route.path === item.path }"
              @click="closeMenu"
            >
              {{ t.nav[item.name as keyof typeof t.nav] }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useMainStore } from '../stores/main'
import AppLogo from './AppLogo.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits(['open-login'])

// Consumo de la store global para idioma/tema/menú
const store = useMainStore()
const { currentLanguage, isDarkMode, isMenuOpen, t } = storeToRefs(store)
const { toggleLanguage, toggleDarkMode, toggleMenu, closeMenu } = store

// Autenticación
const auth = useAuthStore()
const { isLoggedIn } = storeToRefs(auth)
const { logout } = auth
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/')
}

// Estado local para aplicar estilo cuando se hace scroll
const isScrolled = ref(false)

// Rutas base de navegación
const baseMenuItems = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/sobre-mi' },
  { name: 'education', path: '/educacion' },
  { name: 'skills', path: '/habilidades' },
  { name: 'projects', path: '/proyectos' },
  { name: 'contact', path: '/contacto' }
]

// Menú dinámico que incluye el panel administrativo si hay sesión
const menuItems = computed(() => {
  const items = [...baseMenuItems]
  if (isLoggedIn.value) {
    items.push({ name: 'adminPanel', path: '/admin' })
  }
  return items
})

// Detecta desplazamiento para cambiar estilo del header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
  border-bottom: 1px solid transparent;
}

.navbar-scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: var(--shadow-sm);
  border-bottom-color: rgba(76, 175, 80, 0.1);
}

.dark .navbar {
  background-color: rgba(33, 33, 33, 0.95);
}

.dark .navbar-scrolled {
  background-color: rgba(33, 33, 33, 0.98);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  min-height: 70px;
}



.navbar-menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-lg);
  margin: 0;
  padding: 0;
}

.navbar-link {
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.navbar-link:hover {
  color: var(--primary-color);
  background-color: rgba(76, 175, 80, 0.1);
}

.navbar-link.active {
  color: var(--primary-color);
  background-color: rgba(76, 175, 80, 0.15);
}

.navbar-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-full);
}

.navbar-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.control-btn {
  background: none;
  border: none;
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  z-index: calc(var(--z-header) - 1);
}

.control-btn:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.language-btn {
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  font-size: var(--font-size-sm);
}

.theme-btn {
  font-size: var(--font-size-lg);
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
}

.mobile-menu-btn span {
  width: 20px;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-fast);
  border-radius: var(--border-radius-full);
}

.mobile-menu-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  border-top: 1px solid rgba(76, 175, 80, 0.1);
  box-shadow: var(--shadow-lg);
  transform: translateY(-100%);
  opacity: 0;
  transition: all var(--transition-normal);
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
}

.mobile-menu-list {
  list-style: none;
  padding: var(--spacing-md) 0;
  margin: 0;
}

.mobile-menu-link {
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  border-left: 3px solid transparent;
}

.mobile-menu-link:hover {
  color: var(--primary-color);
  background-color: rgba(76, 175, 80, 0.1);
  border-left-color: var(--primary-color);
}

.mobile-menu-link.active {
  color: var(--primary-color);
  background-color: rgba(76, 175, 80, 0.15);
  border-left-color: var(--primary-color);
  font-weight: var(--font-weight-bold);
}

.desktop-menu {
  display: flex;
}

/* Responsive */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }

  .navbar-controls {
    gap: var(--spacing-xs);
  }

  .control-btn {
    min-width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .navbar-content {
    padding: var(--spacing-xs) 0;
    min-height: 60px;
  }

}
</style>
