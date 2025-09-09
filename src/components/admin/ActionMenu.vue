<template>
  <!-- Componente de menú de acciones para móvil -->
  <div class="action-menu" :class="{ 'mobile-only': isMobile }">
    <!-- Versión desktop: botones normales -->
    <div v-if="!isMobile" class="desktop-actions">
      <button 
        v-for="action in actions" 
        :key="action.key"
        class="btn btn-secondary"
        @click="$emit('action', action.key)"
        :title="action.label"
      >
        {{ action.label }}
      </button>
    </div>

    <!-- Versión móvil: menú hamburguesa -->
    <div v-else class="mobile-actions">
      <button
        class="action-menu-toggle"
        @click="toggleMenu"
        @blur="handleBlur"
        :aria-expanded="isOpen"
        :aria-label="t.admin.actions || 'Acciones'"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      
      <div 
        v-show="isOpen" 
        class="action-dropdown"
        @click.stop
      >
        <button
          v-for="action in actions"
          :key="action.key"
          class="action-item"
          @click="handleAction(action.key)"
        >
          <span class="action-icon" v-if="action.icon">{{ action.icon }}</span>
          <span class="action-label">{{ action.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMainStore } from '../../stores/main'
import { storeToRefs } from 'pinia'

// Definir tipos para las acciones
interface Action {
  key: string
  label: string
  icon?: string
}

// Props del componente
const props = defineProps<{
  actions: Action[]
}>()

// Eventos emitidos
const emit = defineEmits(['action'])

// Store para traducciones
const mainStore = useMainStore()
const { t } = storeToRefs(mainStore)

// Estado del menú
const isOpen = ref(false)
const screenWidth = ref(window.innerWidth)

// Computed para detectar si estamos en móvil
const isMobile = computed(() => screenWidth.value <= 768)

// Alternar visibilidad del menú
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// Manejar acción seleccionada
const handleAction = (actionKey: string) => {
  emit('action', actionKey)
  isOpen.value = false
}

// Cerrar menú al perder foco
const handleBlur = (event: FocusEvent) => {
  // Pequeño delay para permitir clicks en el dropdown
  setTimeout(() => {
    if (!event.relatedTarget || !event.currentTarget?.contains(event.relatedTarget as Node)) {
      isOpen.value = false
    }
  }, 100)
}

// Cerrar menú al hacer click fuera
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (isOpen.value && !target.closest('.mobile-actions')) {
    isOpen.value = false
  }
}

// Actualizar ancho de pantalla
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
  if (!isMobile.value) {
    isOpen.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.action-menu {
  position: relative;
}

/* Estilos para versión desktop */
.desktop-actions {
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  flex-wrap: nowrap;
}

.desktop-actions .btn {
  font-size: var(--font-size-xs);
  padding: calc(var(--spacing-xs) / 1.5) var(--spacing-xs);
  white-space: nowrap;
  min-width: auto;
}

/* Estilos para versión móvil */
.mobile-actions {
  position: relative;
}

.action-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: 1px solid color-mix(in srgb, var(--primary-color), transparent 70%);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  padding: 4px;
  transition: all var(--transition-fast);
}

.action-menu-toggle:hover {
  background: color-mix(in srgb, var(--primary-color), transparent 90%);
  border-color: var(--primary-color);
}

.hamburger-line {
  width: 16px;
  height: 2px;
  background: var(--text-primary);
  margin: 1px 0;
  border-radius: 1px;
  transition: all var(--transition-fast);
}

.action-menu-toggle:hover .hamburger-line {
  background: var(--primary-color);
}

.action-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  background: var(--bg-primary);
  border: 1px solid color-mix(in srgb, var(--primary-color), transparent 70%);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  min-width: 140px;
  margin-top: var(--spacing-xs);
  overflow: hidden;
  animation: slideDown var(--transition-fast) ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.action-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
  gap: var(--spacing-xs);
}

.action-item:hover {
  background: color-mix(in srgb, var(--primary-color), transparent 90%);
  color: var(--primary-color);
}

.action-item:not(:last-child) {
  border-bottom: 1px solid color-mix(in srgb, var(--primary-color), transparent 85%);
}

.action-icon {
  font-size: var(--font-size-base);
  width: 16px;
  text-align: center;
}

.action-label {
  flex: 1;
}

/* Asegurar que solo se muestre en móvil cuando sea necesario */
@media (min-width: 769px) {
  .mobile-only .mobile-actions {
    display: none;
  }
}

@media (max-width: 768px) {
  .mobile-only .desktop-actions {
    display: none;
  }
}
</style>