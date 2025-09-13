import { createI18n } from 'vue-i18n'

// Import page-specific translations
// Spanish translations
import commonEs from './pages/common.es.json'
import homeEs from './pages/home.es.json'
import aboutEs from './pages/about.es.json'
import contactEs from './pages/contact.es.json'
import educationEs from './pages/education.es.json'
import skillsEs from './pages/skills.es.json'
import projectsEs from './pages/projects.es.json'
import adminEs from './pages/admin.es.json'
import notFoundEs from './pages/notFound.es.json'

// English translations
import commonEn from './pages/common.en.json'
import homeEn from './pages/home.en.json'
import aboutEn from './pages/about.en.json'
import contactEn from './pages/contact.en.json'
import educationEn from './pages/education.en.json'
import skillsEn from './pages/skills.en.json'
import projectsEn from './pages/projects.en.json'
import adminEn from './pages/admin.en.json'
import notFoundEn from './pages/notFound.en.json'

// Combine all page translations
const es = {
  ...commonEs,
  ...homeEs,
  ...aboutEs,
  ...contactEs,
  ...educationEs,
  ...skillsEs,
  ...projectsEs,
  ...adminEs,
  ...notFoundEs
}

const en = {
  ...commonEn,
  ...homeEn,
  ...aboutEn,
  ...contactEn,
  ...educationEn,
  ...skillsEn,
  ...projectsEn,
  ...adminEn,
  ...notFoundEn
}

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
