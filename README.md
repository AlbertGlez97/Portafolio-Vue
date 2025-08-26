# 🚀 Portafolio Profesional de Albert González

Un portafolio web moderno y responsive desarrollado con Vue.js 3, TypeScript, Pinia y CSS puro, diseñado para mostrar la experiencia profesional de Albert González como Front-End Developer.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Arquitectura del Código](#-arquitectura-del-código)
- [Stores de Pinia](#-stores-de-pinia)
- [Componentes Principales](#-componentes-principales)
- [Rutas y Navegación](#-rutas-y-navegación)
- [Internacionalización](#-internacionalización)
- [Responsive Design](#-responsive-design)
- [Características Técnicas](#-características-técnicas)
- [Desarrollo](#-desarrollo)
- [Despliegue](#-despliegue)

## ✨ Características

- **🎨 Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones
- **📱 Responsive**: Adaptable a dispositivos móviles, tablets y desktop
- **🌐 Multiidioma**: Soporte para español e inglés
- **🌙 Modo Oscuro**: Alternancia entre tema claro y oscuro
- **⚡ Performance**: Optimizado para carga rápida y experiencia fluida
- **🎯 Timeline Interactivo**: Línea de tiempo visual para experiencia laboral
- **📧 Formulario de Contacto**: Sistema de contacto funcional
- **🔧 TypeScript**: Tipado estático para mayor robustez del código

## 🛠 Tecnologías Utilizadas

### Frontend Core
- **Vue.js 3** - Framework progresivo de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool y servidor de desarrollo
- **CSS Puro** - Estilos personalizados sin frameworks

### Gestión de Estado
- **Pinia** - Store de estado oficial para Vue.js

### Routing
- **Vue Router 4** - Enrutamiento oficial para Vue.js

### Herramientas de Desarrollo
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formateador de código

## 📁 Estructura del Proyecto

```
albert-portfolio/
├── public/                     # Archivos estáticos
├── src/
│   ├── components/            # Componentes reutilizables
│   │   ├── ExperienceCard.vue # Tarjeta de experiencia laboral
│   │   ├── Header.vue         # Navegación principal
│   │   └── Footer.vue         # Pie de página
│   ├── views/                 # Páginas principales
│   │   ├── Home.vue          # Página de inicio
│   │   ├── About.vue         # Sobre mí
│   │   ├── Experience.vue    # Experiencia laboral
│   │   ├── Education.vue     # Educación
│   │   ├── Skills.vue        # Habilidades técnicas
│   │   ├── Projects.vue      # Proyectos
│   │   └── Contact.vue       # Contacto
│   ├── stores/               # Stores de Pinia
│   │   ├── main.ts          # Store principal (idioma, tema)
│   │   ├── experience.ts    # Datos de experiencia
│   │   ├── education.ts     # Datos de educación
│   │   ├── skills.ts        # Datos de habilidades
│   │   ├── projects.ts      # Datos de proyectos
│   │   └── personal.ts      # Información personal
│   ├── interfaces/           # Definiciones de tipos TypeScript
│   ├── router/              # Configuración de rutas
│   ├── assets/              # Recursos estáticos
│   ├── styles/              # Estilos globales
│   ├── App.vue              # Componente raíz
│   └── main.ts              # Punto de entrada
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/albert-portfolio.git
cd albert-portfolio
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Construir para producción**
```bash
npm run build
# o
yarn build
```

5. **Previsualizar build de producción**
```bash
npm run preview
# o
yarn preview
```

6. **Ejecutar pruebas**
```bash
npm test
# o
yarn test
```

## 🏗 Arquitectura del Código

### Composition API
El proyecto utiliza la Composition API de Vue 3 con `<script setup>` para una mejor organización del código y mejor soporte de TypeScript.

```typescript
// Ejemplo de estructura típica
<script setup lang="ts">
// Importaciones
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main'

// Inicialización de stores
const mainStore = useMainStore()

// Extracción de datos reactivos
const { t, isDarkMode } = storeToRefs(mainStore)
</script>
```

### Separación de Responsabilidades
- **Views**: Páginas principales que combinan componentes
- **Components**: Elementos reutilizables con lógica específica
- **Stores**: Gestión centralizada del estado
- **Interfaces**: Definiciones de tipos para TypeScript

## 🗄 Stores de Pinia

### Store Principal (`main.ts`)
Maneja el estado global de la aplicación:
- **Idioma actual** (español/inglés)
- **Modo oscuro/claro**
- **Estado del menú móvil**
- **Traducciones dinámicas**

```typescript
export const useMainStore = defineStore('main', () => {
  const currentLanguage = ref<'es' | 'en'>('es')
  const isDarkMode = ref(false)
  const isMenuOpen = ref(false)
  
  // Computed para traducciones
  const t = computed(() => translations[currentLanguage.value])
  
  return { currentLanguage, isDarkMode, isMenuOpen, t }
})
```

### Stores Especializados
- **`experience.ts`**: Datos de experiencia laboral
- **`education.ts`**: Información educativa
- **`skills.ts`**: Habilidades técnicas y herramientas
- **`projects.ts`**: Proyectos destacados
- **`personal.ts`**: Información personal y contacto

## 🧩 Componentes Principales

### ExperienceCard.vue
Componente para mostrar tarjetas de experiencia laboral en el timeline:
- **Props tipadas** con TypeScript
- **Diseño responsive** adaptable
- **Animaciones CSS** suaves
- **Badges de tecnologías** dinámicos

### Header.vue
Navegación principal con:
- **Menú responsive** para móviles
- **Cambio de idioma** dinámico
- **Toggle de modo oscuro**
- **Navegación activa** con Vue Router

## 🛣 Rutas y Navegación

### Estructura del Router Profesional

```typescript
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

// Rutas principales con lazy loading
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home, // Carga directa para página crítica
    meta: {
      title: 'Inicio',
      description: 'Portafolio profesional de Albert González',
      showInNav: true,
      icon: 'home',
      order: 1
    }
  },
  {
    path: '/experiencia',
    name: 'experience',
    component: () => import('../views/Experience.vue'), // Lazy loading
    meta: {
      title: 'Experiencia',
      description: 'Trayectoria profesional en desarrollo',
      showInNav: true,
      icon: 'briefcase',
      order: 3
    }
  }
  // ... más rutas
]
```

### Características Avanzadas del Router

#### **Meta Fields Personalizados**
- **title**: Título dinámico de la página
- **description**: Meta description para SEO
- **showInNav**: Control de visibilidad en navegación
- **icon**: Icono asociado a la ruta
- **order**: Orden en el menú de navegación
- **requiresAuth**: Control de acceso (futuro)

#### **Lazy Loading Inteligente**
- **Página principal**: Carga directa para performance crítica
- **Otras páginas**: Lazy loading para optimización
- **Code splitting**: Automático por rutas

#### **Rutas de Redirección**
```typescript
// Compatibilidad con URLs en inglés
{ path: '/about', redirect: '/sobre-mi' },
{ path: '/experience', redirect: '/experiencia' },
{ path: '/contact', redirect: '/contacto' }
```

#### **Manejo de Errores 404**
```typescript
{
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('../views/NotFound.vue'),
  meta: {
    title: 'Página no encontrada',
    showInNav: false
  }
}
```

### Navigation Guards

#### **beforeEach Guard**
```typescript
router.beforeEach((to, from, next) => {
  // Actualización dinámica del título
  if (to.meta.title) {
    document.title = `${to.meta.title} | Albert González`
  }
  
  // Actualización de meta description
  if (to.meta.description) {
    updateMetaDescription(to.meta.description)
  }
  
  // Cierre automático del menú móvil
  if (mainStore.isMenuOpen) {
    mainStore.toggleMenu()
  }
  
  next()
})
```

#### **afterEach Guard**
```typescript
router.afterEach((to, from) => {
  // Tracking de Google Analytics
  if (window.gtag) {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: to.path
    })
  }
})
```

### Scroll Behavior Avanzado

```typescript
scrollBehavior(to, from, savedPosition) {
  // Restaurar posición del navegador
  if (savedPosition) {
    return savedPosition
  }
  
  // Navegación a anchors con offset
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
      top: 80 // Offset para header fijo
    }
  }
  
  // Scroll suave al inicio
  return { 
    top: 0,
    behavior: 'smooth'
  }
}
```

### Utilidades del Router

#### **getNavigationRoutes()**
```typescript
export const getNavigationRoutes = () => {
  return routes
    .filter(route => route.meta?.showInNav)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
}
```

#### **getCurrentRoute()**
```typescript
export const getCurrentRoute = () => router.currentRoute.value
```

### Navegación Dinámica
- **Rutas tipadas** con TypeScript estricto
- **Meta fields** para SEO y navegación
- **Guards de navegación** para control de acceso
- **Lazy loading** para optimización de performance
- **Manejo de errores** 404 personalizado
- **Scroll behavior** inteligente
- **Redirecciones** para compatibilidad

## 🌐 Internacionalización

### Sistema de Traducciones
Implementación personalizada sin librerías externas:

```typescript
const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      experience: 'Experiencia',
      // ...
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      experience: 'Experience',
      // ...
    }
  }
}
```

### Cambio de Idioma
- **Persistencia** en localStorage
- **Cambio dinámico** sin recarga
- **Traducciones reactivas** con computed properties

## 📱 Responsive Design

### Breakpoints
```css
/* Tablets */
@media (max-width: 768px) { /* ... */ }

/* Móviles */
@media (max-width: 480px) { /* ... */ }
```

### Características Responsive
- **Timeline adaptativo**: En móvil se convierte en lista vertical
- **Menú hamburguesa**: Navegación colapsable en dispositivos pequeños
- **Grid flexible**: Layouts que se adaptan al tamaño de pantalla
- **Tipografía escalable**: Tamaños de fuente responsivos

## ⚙ Características Técnicas

### Timeline de Experiencia
Implementación CSS pura con elementos pseudo:
- **Línea central** con `::before`
- **Puntos de conexión** posicionados precisamente
- **Alternancia automática** izquierda/derecha
- **Responsive** con colapso en móvil

```css
/* Línea central del timeline */
.timeline-container::before {
  content: '';
  position: absolute;
  left: 50%;
  width: 3px;
  background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
  transform: translateX(-50%);
}
```

### Variables CSS Personalizadas
```css
:root {
  --primary-color: #4CAF50;
  --accent-color: #FFC107;
  --text-primary: #333;
  --text-secondary: #666;
  --bg-primary: #ffffff;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

### Modo Oscuro
Implementación con CSS variables y clases dinámicas:
```css
[data-theme="dark"] {
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --bg-primary: #1a1a1a;
}
```

## 🔧 Desarrollo

### Scripts Disponibles
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```

### Lint y Formateo

```bash
# Ejecutar ESLint
npm run lint

# Formatear con Prettier
npx prettier . --write
```

### Convenciones de Código
- **Nombres de componentes**: PascalCase
- **Nombres de archivos**: kebab-case para vistas, PascalCase para componentes
- **Commits**: Conventional Commits
- **Tipado**: Estricto con TypeScript

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de errores
docs: documentación
style: formateo de código
refactor: refactorización
test: pruebas
chore: tareas de mantenimiento
```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Optimizaciones Incluidas
- **Tree shaking** automático
- **Minificación** de CSS y JS
- **Compresión** de assets
- **Code splitting** por rutas

### Plataformas Recomendadas
- **Vercel**: Despliegue automático desde Git
- **Netlify**: CI/CD integrado
- **GitHub Pages**: Para proyectos open source
- **Firebase Hosting**: Con funciones serverless

## 📊 Métricas de Performance

### Lighthouse Scores (Objetivo)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### Optimizaciones Implementadas
- **Lazy loading** de componentes
- **Imágenes optimizadas**
- **CSS crítico** inline
- **Preload** de recursos importantes

## 🤝 Contribución

### Proceso de Contribución
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- Seguir las convenciones de Vue.js
- Mantener cobertura de tipos TypeScript
- Documentar funciones complejas
- Escribir commits descriptivos

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Albert González**
- LinkedIn: [linkedin.com/in/albertglez97](https://www.linkedin.com/in/albertglez97)
- Email: [tu-email@ejemplo.com]
