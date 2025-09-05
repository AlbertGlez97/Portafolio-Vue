import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useMainStore } from '../stores/main'
import { useAuthStore } from '../stores/auth'

// Router principal con lazy loading para optimizar el bundle.
// La vista Home se importa de forma directa al ser crítica.
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

// Definición de rutas con tipado estricto.
// Cada ruta declara metadatos para navegación y SEO.
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
    path: '/educacion',
    name: 'education',
    component: () => import('../views/Education.vue'),
    meta: {
      title: 'Educación',
      description: 'Formación académica y certificaciones profesionales',
      showInNav: true,
      icon: 'graduation-cap',
      order: 3
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
      order: 4
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
      order: 5
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
      order: 6
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: {
      title: 'Admin',
      requiresAuth: true,
      showInNav: false
    }
  },
  // Rutas de redirección para compatibilidad con URLs en inglés
  {
    path: '/about',
    redirect: '/sobre-mi'
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
    // Controla la posición de scroll al navegar entre rutas.
    // Si hay una posición guardada (botones del navegador)
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
  const authStore = useAuthStore()
  
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
  
  // Verificar autenticación si es requerida
  if (to.meta.requiresAuth) {
    if (authStore.isAdmin) {
      next()
    } else {
      next('/')
    }
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

// Manejo de errores de navegación para chunks dinámicos
router.onError((error) => {
  console.error('Error de navegación:', error)
  
  // Redirigir a página de error si es necesario
  if (error.message.includes('Loading chunk')) {
    window.location.reload()
  }
})

export default router

// Utilidad que devuelve las rutas visibles en la barra de navegación
export const getNavigationRoutes = () => {
  return routes
    .filter(route => route.meta?.showInNav)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
}
// Obtiene la ruta actual reactiva
export const getCurrentRoute = () => router.currentRoute.value
