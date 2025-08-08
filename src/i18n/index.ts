import { createI18n } from 'vue-i18n'
import en from './en.json'
import es from './es.json'

export const messages = { en, es }

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages
})

export default i18n
