import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useMainStore } from '../stores/main'

// Importación directa solo para la página principal (crítica)
import Home from '../views/Home.vue'

// Definición de tipos para meta fields
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    requiresAuth?: boolean
    showInNav?: boolean
    icon?: string
    order?: number
  }
}

// Definición de rutas con tipado estricto
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Inicio',
      description: 'Portafolio profesional de Albert González - Front-End Developer',
      showInNav: true,
      icon: 'home',
      order: 1
    }
  },
  {
    path: '/sobre-mi',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: 'Sobre Mí',
      description: 'Conoce más sobre Albert González, su trayectoria y pasiones',
      showInNav: true,
      icon: 'user',
      order: 2
    }
  },
  {
    path: '/experiencia',
    name: 'experience',
    component: () => import('../views/Experience.vue'),
    meta: {
      title: 'Experiencia',
      description: 'Trayectoria profesional en desarrollo Front-End y Full-Stack',
      showInNav: true,
      icon: 'briefcase',
      order: 3
    }
  },
  {
    path: '/educacion',
    name: 'education',
    component: () => import('../views/Education.vue'),
    meta: {
      title: 'Educación',
      description: 'Formación académica y certificaciones profesionales',
      showInNav: true,
      icon: 'graduation-cap',
      order: 4
    }
  },
  {
    path: '/habilidades',
    name: 'skills',
    component: () => import('../views/Skills.vue'),
    meta: {
      title: 'Habilidades',
      description: 'Tecnologías, herramientas y competencias técnicas',
      showInNav: true,
      icon: 'code',
      order: 5
    }
  },
  {
    path: '/proyectos',
    name: 'projects',
    component: () => import('../views/Projects.vue'),
    meta: {
      title: 'Proyectos',
      description: 'Portfolio de proyectos destacados y trabajos realizados',
      showInNav: true,
      icon: 'folder',
      order: 6
    }
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: 'Contacto',
      description: 'Ponte en contacto para colaboraciones y oportunidades',
      showInNav: true,
      icon: 'mail',
      order: 7
    }
  },
  // Rutas de redirección para compatibilidad con URLs en inglés
  {
    path: '/about',
    redirect: '/sobre-mi'
  },
  {
    path: '/experience',
    redirect: '/experiencia'
  },
  {
    path: '/education',
    redirect: '/educacion'
  },
  {
    path: '/skills',
    redirect: '/habilidades'
  },
  {
    path: '/projects',
    redirect: '/proyectos'
  },
  {
    path: '/contact',
    redirect: '/contacto'
  },
  // Ruta 404 - debe ir al final
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Página no encontrada',
      description: 'La página que buscas no existe',
      showInNav: false
    }
  }
]

// Creación del router con configuración avanzada
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Comportamiento de scroll mejorado
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (navegación con botones del navegador)
    if (savedPosition) {
      return savedPosition
    }
    
    // Si hay un hash en la URL, navegar al elemento
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset para el header fijo
      }
    }
    
    // Por defecto, ir al inicio de la página
    return { 
      top: 0,
      behavior: 'smooth'
    }
  }
})

// Guard global antes de cada navegación
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore()
  
  // Actualizar el título de la página
  if (to.meta.title) {
    const baseTitle = 'Albert González - Front-End Developer'
    document.title = `${to.meta.title} | ${baseTitle}`
  }
  
  // Actualizar meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }
  
  // Cerrar menú móvil si está abierto
  if (mainStore.isMenuOpen) {
    mainStore.toggleMenu()
  }
  
  // Verificar autenticación si es requerida (para futuras funcionalidades)
  if (to.meta.requiresAuth) {
    // Aquí se podría implementar lógica de autenticación
    // Por ahora, permitir el acceso
    next()
  } else {
    next()
  }
})

// Guard después de cada navegación
router.afterEach((to, from) => {
  // Analytics o tracking (si se implementa en el futuro)
  // Ejemplo: Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: to.path
    })
  }
})

// Manejo de errores de navegación
router.onError((error) => {
  console.error('Error de navegación:', error)
  
  // Redirigir a página de error si es necesario
  if (error.message.includes('Loading chunk')) {
    window.location.reload()
  }
})

export default router

// Exportar utilidades para usar en componentes
export const getNavigationRoutes = () => {
  return routes
    .filter(route => route.meta?.showInNav)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
}

export const getCurrentRoute = () => router.currentRoute.value
