import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n, { messages } from '../i18n'

// Diccionario de traducciones cargado desde la nueva estructura por páginas
const translations = messages

/**
 * Store global de la aplicación.
 * Maneja idioma, tema y estado del menú.
 */
export const useMainStore = defineStore('main', () => {

  // --- Helpers para localStorage ---
  const getStoredLanguage = (): 'es' | 'en' => {
    const stored = localStorage.getItem('portfolio-language')
    return stored === 'en' || stored === 'es' ? stored : 'es'
  }

  const saveLanguage = (lang: 'es' | 'en') => {
    localStorage.setItem('portfolio-language', lang)
  }

  // --- State ---
  // Idioma actual de la interfaz (inicializado desde localStorage)
  const currentLanguage = ref<'es' | 'en'>(getStoredLanguage())
  // Preferencia de modo oscuro
  const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
  // Visibilidad del menú móvil
  const isMenuOpen = ref(false)

  // Inicializar i18n con el idioma guardado
  i18n.global.locale.value = currentLanguage.value

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
    saveLanguage(currentLanguage.value)
  }

  // Fija un idioma específico
  const setLanguage = (lang: 'es' | 'en') => {
    currentLanguage.value = lang
    i18n.global.locale.value = lang
    saveLanguage(lang)
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
