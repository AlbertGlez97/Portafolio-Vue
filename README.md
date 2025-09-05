# Portafolio-Vue

Portafolio personal construido con **Vue 3**, **TypeScript** y **Vite**. Incluye gestión de estado con **Pinia**, soporte multilenguaje con **i18n** y una galaxia 3D de tecnologías.

## Características principales
- Diseño moderno y responsive con modo claro/oscuro.
- Galaxia 3D de tecnologías generada con **Three.js** y `CanvasTexture`.
- Fondo neutro adaptable al modo claro/oscuro con gradiente y overlay opcional.
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
Los nombres de tecnologías se convierten en sprites de texto sobre una esfera. Los controles de órbita permiten rotar la escena y el auto-rotate mantiene la animación. La escala y opacidad de cada sprite varían según la distancia a la cámara para simular profundidad. La rotación ahora es más pausada y puede desactivarse con un toggle (`allowPause`). Las etiquetas lejanas usan una textura ligeramente desenfocada para reforzar la profundidad.

## Fondo de la galaxia
La versión actual prescinde de la imagen `codigoBinario.jpg` porque restaba legibilidad. En su lugar se utiliza un gradiente neutro basado en las variables `--bg-primary` y `--bg-secondary`, que se adapta automáticamente al modo claro u oscuro. El componente incluye una capa opcional (`overlayOpacity`) para ajustar el contraste sin introducir colores nuevos.

En modo fallback (sin WebGL) se mantiene el mismo gradiente detrás de la lista de badges.

### Configuración
- `overlayOpacity`: controla la opacidad de la capa de contraste.
- `autoRotateSpeed`: velocidad de rotación automática (por defecto más lenta).
- `allowPause`: muestra un botón accesible para pausar o reanudar la animación.

## Tokens de estilo del modal de login
El modal de autenticación reutiliza los siguientes tokens del tema:

- `--overlay-bg` para el fondo del backdrop.
- `--bg-primary` y `--text-primary` para el contenedor.
- `--primary-color` y `--danger-color` en bordes, botones y estados de error.
- `--shadow-md` para la sombra del contenedor.
- `--border-radius-lg` y `--border-radius-md` para los bordes redondeados.
- `--spacing-2xl`, `--spacing-lg`, `--spacing-md` y `--spacing-sm` para el espaciado interno y externo.

## Cómo contribuir / modificar
1. Agrega tu proyecto o skill en los archivos JSON de `src/data`.
2. Incluye la traducción correspondiente en `src/i18n/en.json` y `es.json`.
3. Ejecuta `npm test` para verificar que todo funciona.

## Licencia
MIT (si aplica).
