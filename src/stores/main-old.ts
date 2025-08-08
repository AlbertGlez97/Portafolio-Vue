import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Import data files
import skillsData from '../data/skills.json'
import experienceData from '../data/experience.json'
import educationData from '../data/education.json'
import projectsData from '../data/projects.json'
import personalData from '../data/personal.json'

export const useMainStore = defineStore('main', () => {
  // Estado reactivo
  const currentLanguage = ref<'es' | 'en'>('es')
  const isDarkMode = ref(false)
  const isMenuOpen = ref(false)

  // Data from JSON files
  const skills = ref(skillsData)
  const experience = ref(experienceData)
  const education = ref(educationData)
  const projects = ref(projectsData)
  const personal = ref(personalData)

  // Traducciones
  const translations = {
    es: {
      nav: {
        home: 'Inicio',
        about: 'Sobre Mí',
        experience: 'Experiencia',
        education: 'Educación',
        skills: 'Habilidades',
        projects: 'Proyectos',
        contact: 'Contacto'
      },
      hero: {
        greeting: 'Hola, soy',
        position: 'Front-End Developer',
        description: 'Desarrollador Front-End con más de 3 años de experiencia en la construcción de sistemas empresariales complejos. Especializado en Vue.js, TypeScript y tecnologías modernas.',
        downloadCV: 'Descargar CV',
        contactMe: 'Contáctame'
      },
      about: {
        title: 'Sobre Mí',
        description: 'Desarrollador Front-End con más de 3 años de experiencia en la construcción de sistemas empresariales complejos para instituciones públicas y privadas. Dominio en tecnologías modernas como Svelte, Vue.js y TypeScript. Reconocido por la entrega constante de módulos funcionales, colaborativos y escalables.',
        goals: {
          shortTerm: 'Corto Plazo: Avanzar de nivel semi-senior a senior, fortalecer mi inglés técnico y aportar valor en proyectos con impacto.',
          longTerm: 'Largo Plazo: Trabajar en el extranjero, dominar tecnologías emergentes como inteligencia artificial y especializarme en microservicios backend.'
        }
      },
      contact: {
        title: 'Contacto',
        subtitle: 'Hablemos sobre tu próximo proyecto',
        info: 'Información de Contacto',
        form: 'Envíame un mensaje',
        name: 'Nombre',
        email: 'Correo Electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        send: 'Enviar Mensaje'
      },
      footer: {
        rights: 'Todos los derechos reservados',
        madeWith: 'Hecho con',
        by: 'por Albert González'
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        greeting: 'Hi, I\'m',
        position: 'Front-End Developer',
        description: 'Front-End Developer with over 3 years of experience building complex enterprise systems. Specialized in Vue.js, TypeScript and modern technologies.',
        downloadCV: 'Download CV',
        contactMe: 'Contact Me'
      },
      about: {
        title: 'About Me',
        description: 'Front-End Developer with over 3 years of experience building complex enterprise systems for public and private institutions. Expertise in modern technologies like Svelte, Vue.js and TypeScript. Recognized for consistently delivering functional, collaborative and scalable modules.',
        goals: {
          shortTerm: 'Short Term: Advance from semi-senior to senior level, strengthen my technical English and add value to impactful projects.',
          longTerm: 'Long Term: Work abroad, master emerging technologies like artificial intelligence and specialize in backend microservices.'
        }
      },
      contact: {
        title: 'Contact',
        subtitle: 'Let\'s talk about your next project',
        info: 'Contact Information',
        form: 'Send me a message',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      },
      footer: {
        rights: 'All rights reserved',
        madeWith: 'Made with',
        by: 'by Albert González'
      }
    }
  }

  // Getters computados
  const t = computed(() => translations[currentLanguage.value])

  // Getters for data
  const getSkills = computed(() => skills.value)
  const getExperience = computed(() => experience.value)
  const getEducation = computed(() => education.value)
  const getProjects = computed(() => projects.value)
  const getPersonal = computed(() => personal.value)

  // Helper functions
  const getTranslatedText = (textObj: any) => {
    if (typeof textObj === 'string') return textObj
    return textObj[currentLanguage.value] || textObj.es || textObj.en || ''
  }

  // Acciones
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es'
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const setLanguage = (lang: 'es' | 'en') => {
    currentLanguage.value = lang
  }

  return {
    currentLanguage,
    isDarkMode,
    isMenuOpen,
    t,
    skills,
    experience,
    education,
    projects,
    personal,
    getSkills,
    getExperience,
    getEducation,
    getProjects,
    getPersonal,
    getTranslatedText,
    toggleLanguage,
    toggleDarkMode,
    toggleMenu,
    closeMenu,
    setLanguage
  }
})
