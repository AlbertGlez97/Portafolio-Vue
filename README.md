# Portafolio-Vue

Portafolio personal construido con **Vue 3**, **TypeScript** y **Vite**. Incluye gestión de estado con **Pinia**, soporte multilenguaje con **i18n** y una galaxia 3D de tecnologías.

## Características principales
- Diseño moderno y responsive con modo claro/oscuro.
- Galaxia 3D de tecnologías generada con **Three.js** y `CanvasTexture`.
- Badges accesibles de texto para representar tecnologías.
- Sección *Sobre mí* con línea de tiempo "Mi Trayectoria Profesional".
- Traducciones completas en español e inglés.
- Scripts de build y linting para automatizar tareas.

## Instalación y uso
```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción
```

## Dependencias clave
- Vue 3
- TypeScript
- Vite
- Pinia
- Three.js y OrbitControls
- Vue I18n

## Estructura del proyecto
```
src/
├── components    # componentes reutilizables
├── views         # páginas de la aplicación
├── stores        # estado global con Pinia
├── data          # archivos JSON con contenido
├── i18n          # traducciones
└── lib           # utilidades compartidas
```

## Cómo funciona la galaxia
Los nombres de tecnologías se convierten en sprites de texto sobre una esfera. Los controles de órbita permiten rotar la escena y el auto-rotate mantiene la animación. La escala y opacidad de cada sprite varían según la distancia a la cámara para simular profundidad.

## Cómo contribuir / modificar
1. Agrega tu proyecto o skill en los archivos JSON de `src/data`.
2. Incluye la traducción correspondiente en `src/i18n/en.json` y `es.json`.
3. Ejecuta `npm test` para verificar que todo funciona.

## Licencia
MIT (si aplica).
