import { createI18n } from 'vue-i18n'
import en from './en.json'
import es from './es.json'

// Diccionario de traducciones divididas por idioma
export const messages = { en, es }

// Configuración de i18n en modo Composition API
const i18n = createI18n({
  legacy: false,
  locale: 'es', // idioma por defecto
  fallbackLocale: 'en',
  messages
})

export default i18n
