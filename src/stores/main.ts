import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '../i18n'
import es from '../i18n/es.json'
import en from '../i18n/en.json'

// Diccionario de traducciones cargado desde JSON.
const translations = { es, en }

/**
 * Store global de la aplicación.
 * Maneja idioma, tema y estado del menú.
 */
export const useMainStore = defineStore('main', () => {

  // --- State ---
  // Idioma actual de la interfaz
  const currentLanguage = ref<'es' | 'en'>('es')
  // Preferencia de modo oscuro
  const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
  // Visibilidad del menú móvil
  const isMenuOpen = ref(false)

  // --- Getters ---
  // Acceso rápido a las cadenas traducidas
  const t = computed(() => translations[currentLanguage.value])

  // --- Helpers ---
  // Devuelve texto traducido a partir de un objeto {es, en}
  const getTranslatedText = (textObj: any) => {
    if (typeof textObj === 'string') return textObj
    return textObj[currentLanguage.value] || textObj.es || textObj.en || ''
  }

  // --- Actions ---
  // Alterna entre español e inglés y actualiza i18n
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es'
    i18n.global.locale.value = currentLanguage.value
  }

  // Fija un idioma específico
  const setLanguage = (lang: 'es' | 'en') => {
    currentLanguage.value = lang
    i18n.global.locale.value = lang
  }

  // Cambia modo oscuro/claro y actualiza clase del DOM
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  // Establece modo oscuro explícitamente
  const setDarkMode = (dark: boolean) => {
    isDarkMode.value = dark
    document.documentElement.classList.toggle('dark', dark)
  }

  // Abre o cierra menú móvil
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  // Cierra menú móvil
  const closeMenu = () => {
    isMenuOpen.value = false
  }

  // Exponemos estado y métodos
  return {
    // State
    currentLanguage,
    isDarkMode,
    isMenuOpen,

    // Getters
    t,

    // Helpers
    getTranslatedText,

    // Actions
    toggleLanguage,
    setLanguage,
    toggleDarkMode,
    setDarkMode,
    toggleMenu,
    closeMenu
  }
})
