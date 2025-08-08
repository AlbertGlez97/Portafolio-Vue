import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '../i18n'
import es from '../i18n/es.json'
import en from '../i18n/en.json'

// Translations
const translations = { es, en }

export const useMainStore = defineStore('main', () => {
  
  // State
  const currentLanguage = ref<'es' | 'en'>('es')
  const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
  const isMenuOpen = ref(false)

  // Getters
  const t = computed(() => translations[currentLanguage.value])

  // Helper functions
  const getTranslatedText = (textObj: any) => {
    if (typeof textObj === 'string') return textObj
    return textObj[currentLanguage.value] || textObj.es || textObj.en || ''
  }

  // Actions
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es'
    i18n.global.locale.value = currentLanguage.value
  }

  const setLanguage = (lang: 'es' | 'en') => {
    currentLanguage.value = lang
    i18n.global.locale.value = lang
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  const setDarkMode = (dark: boolean) => {
    isDarkMode.value = dark
    document.documentElement.classList.toggle('dark', dark)
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

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
