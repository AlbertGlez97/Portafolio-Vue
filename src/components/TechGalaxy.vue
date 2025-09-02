<template>
  <!-- Contenedor principal que aloja el canvas 3D o el fallback plano.
       El fondo estático se aplica sobre este wrapper para mantener el canvas
       libre de texturas adicionales y facilitar overlays. -->
  <div
    ref="container"
    class="tech-galaxy"
    :style="containerStyles"
  >
    <!-- Capa opcional que oscurece o aclara el fondo para mejorar contraste.
         pointer-events:none evita bloquear la interacción con OrbitControls. -->
    <div
      v-if="props.showBackground && props.overlayOpacity > 0"
      class="tech-galaxy__overlay"
      :style="{ opacity: props.overlayOpacity }"
    ></div>

    <!-- Canvas renderizado con Three.js; accesible vía aria-label -->
    <canvas
      v-if="show3D"
      ref="canvas"
      role="img"
      aria-label="Visualización 3D de tecnologías"
    ></canvas>
    <!-- Fallback accesible cuando WebGL no está disponible; mantiene el mismo fondo -->
    <div v-else class="tech-fallback">
      <TechBadge
        v-for="tech in technologies"
        :key="tech"
        :label="tech"
        size="sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  AmbientLight,
  BufferGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Raycaster,
  Scene,
  Sprite,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TechBadge from './TechBadge.vue'
import { createTextSprite, disposeTextSpriteCache } from '../lib/createTextSprite'

/**
 * TechGalaxy.vue
 * ---------------
 * Visualiza una galaxia 3D de etiquetas con Three.js.
 * El fondo estático por defecto se aplica al wrapper HTML (estrategia "wrapper"),
 * lo que mantiene el texto nítido y permite overlays ligeros sin coste extra
 * en la GPU. Como alternativa se puede usar la imagen como textura de escena
 * (estrategia "scene"), pero esto implica mayor consumo de memoria y menos
 * control sobre la superposición de capas.
 */

interface Props {
  technologies: string[] // lista de etiquetas a mostrar
  width?: number | string // ancho del canvas o contenedor
  height?: number | string // alto del canvas o contenedor
  autoRotate?: boolean // activa rotación automática de la esfera
  autoRotateSpeed?: number // velocidad de dicha rotación
  radius?: number // radio de la esfera que posiciona los sprites
  enableDamping?: boolean // suavizado de movimiento con OrbitControls
  dampingFactor?: number // intensidad del damping
  particleDensity?: number // cantidad de partículas de fondo
  showBackground?: boolean // activa/desactiva imagen de fondo
  overlayOpacity?: number // opacidad de la capa de contraste (0-1)
  backgroundStrategy?: 'wrapper' | 'scene' // dónde aplicar la imagen
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 480,
  autoRotate: true,
  autoRotateSpeed: 1,
  radius: 10,
  enableDamping: true,
  dampingFactor: 0.05,
  particleDensity: 500,
  showBackground: true,
  overlayOpacity: 0.35,
  backgroundStrategy: 'wrapper'
})

// Evento emitido al seleccionar un sprite
const emit = defineEmits<{ (e: 'select', tech: string): void }>()

// Referencias DOM y banderas de renderizado
const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const show3D = ref(true)

let renderer: WebGLRenderer
let scene: Scene
let camera: PerspectiveCamera
let controls: OrbitControls
let animationId = 0
const sprites: Sprite[] = [] // colección de etiquetas 3D
const raycaster = new Raycaster() // detección de interacción
const mouse = new Vector2()
let hovered: Sprite | null = null // sprite actualmente bajo el cursor
let sceneBgTexture: Texture | null = null // textura de fondo si se usa 'scene'

// Normaliza medidas numéricas a valores CSS
const resolvedWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
)
const resolvedHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)

// URL procesada por Vite para asegurar hashing y cache del asset.
// Se dispara una pre-carga manual para evitar parpadeos al montar la escena.
const backgroundUrl = new URL('../assets/img/codigoBinario.jpg', import.meta.url).href
const preloadImage = new Image()
preloadImage.src = backgroundUrl

// Estilos reactivos del contenedor: dimensiones + imagen de fondo si corresponde.
const containerStyles = computed(() => {
  const style: Record<string, string> = {
    width: resolvedWidth.value,
    height: resolvedHeight.value
  }
  if (props.showBackground && props.backgroundStrategy === 'wrapper') {
    style.backgroundImage = `url(${backgroundUrl})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }
  return style
})

// Verifica si el navegador soporta WebGL
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

// Respeta la preferencia de movimiento reducido del usuario
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// Inicializa escena Three.js al montar el componente
onMounted(() => {
  if (!isWebGLAvailable() || prefersReducedMotion) {
    show3D.value = false
    // El fondo CSS permanece visible en el modo de fallback
    return
  }
  init()
  animate()
  window.addEventListener('resize', onResize)
  container.value?.addEventListener('pointermove', onPointerMove)
  container.value?.addEventListener('click', onClick)
})

// Limpieza completa de recursos WebGL al destruir el componente
onBeforeUnmount(() => {
  if (!show3D.value) return
  cancelAnimationFrame(animationId)
  controls.dispose()
  renderer.dispose()
  scene.traverse(obj => {
    const anyObj = obj as any
    if (anyObj.geometry) anyObj.geometry.dispose()
    if (anyObj.material) {
      if (Array.isArray(anyObj.material)) {
        anyObj.material.forEach((m: any) => m.dispose())
      } else {
        anyObj.material.dispose()
      }
    }
  })
  window.removeEventListener('resize', onResize)
  container.value?.removeEventListener('pointermove', onPointerMove)
  container.value?.removeEventListener('click', onClick)
  disposeTextSpriteCache()
  // Libera la textura de fondo si se utilizó como background de la escena
  if (sceneBgTexture) sceneBgTexture.dispose()
})

function init() {
  // Configuración básica del renderer y cámara
  renderer = new WebGLRenderer({
    canvas: canvas.value!,
    antialias: true,
    alpha: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(container.value!.clientWidth, container.value!.clientHeight)

  scene = new Scene()
  camera = new PerspectiveCamera(
    50,
    container.value!.clientWidth / container.value!.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, props.radius * 3)

  // Si se decide aplicar el fondo como textura de la escena, se carga aquí.
  // Esta vía consume memoria de GPU y filtra la imagen, por lo que solo se
  // habilita si se escoge la estrategia "scene".
  if (props.showBackground && props.backgroundStrategy === 'scene') {
    const loader = new TextureLoader()
    sceneBgTexture = loader.load(backgroundUrl)
    scene.background = sceneBgTexture
  }

  // Controles de órbita con auto-rotación opcional; el fondo CSS permanece
  // fijo mientras solo la escena 3D responde a las interacciones.
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = props.enableDamping
  controls.dampingFactor = props.dampingFactor
  controls.autoRotate = props.autoRotate
  controls.autoRotateSpeed = props.autoRotateSpeed
  controls.minDistance = props.radius * 1.2
  controls.maxDistance = props.radius * 4

  // Iluminación suave y direccional
  const ambient = new AmbientLight(0xffffff, 0.6)
  const directional = new DirectionalLight(0xffffff, 0.5)
  directional.position.set(1, 1, 1)
  scene.add(ambient, directional)

  // Campo estelar como fondo
  const starGeometry = new BufferGeometry()
  const positions: number[] = []
  const distance = props.radius * 5
  for (let i = 0; i < props.particleDensity; i++) {
    positions.push(
      (Math.random() - 0.5) * distance * 2,
      (Math.random() - 0.5) * distance * 2,
      (Math.random() - 0.5) * distance * 2
    )
  }
  starGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  const starMaterial = new PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.5
  })
  const stars = new Points(starGeometry, starMaterial)
  scene.add(stars)

  // Sprites de texto distribuidos en esfera (método Fibonacci)
  const N = props.technologies.length
  const radius = props.radius
  for (let i = 0; i < N; i++) {
    const tech = props.technologies[i]
    const phi = Math.acos(1 - (2 * (i + 0.5)) / N)
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)
    const sprite = createTextSprite(tech)
    sprite.position.set(x, y, z)
    sprites.push(sprite)
    scene.add(sprite)
  }
}

function animate() {
  animationId = requestAnimationFrame(animate)
  // Ajusta escala y opacidad según distancia para simular profundidad
  sprites.forEach(sprite => {
    const dist = camera.position.distanceTo(sprite.position)
    const min = props.radius * 0.8
    const max = props.radius * 3
    const ratio = Math.min(Math.max((dist - min) / (max - min), 0), 1)
    const scale = 1.5 - ratio
    sprite.scale.setScalar(scale)
    const material = sprite.material as any
    material.opacity = 1 - ratio * 0.5
  })
  controls.update()
  renderer.render(scene, camera)
}

// Actualiza viewport al cambiar tamaño del contenedor
function onResize() {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

// Detecta sprites bajo el cursor y aplica efecto hover
function onPointerMove(event: PointerEvent) {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(sprites)
  if (intersects.length > 0) {
    const sprite = intersects[0].object as Sprite
    if (hovered !== sprite) {
      if (hovered) hovered.scale.divideScalar(1.2)
      hovered = sprite
      hovered.scale.multiplyScalar(1.2)
      if (canvas.value) canvas.value.title = sprite.userData.text || ''
    }
  } else if (hovered) {
    hovered.scale.divideScalar(1.2)
    hovered = null
    if (canvas.value) canvas.value.title = ''
  }
}

// Centra la cámara sobre el sprite seleccionado y emite evento
function onClick() {
  if (hovered) {
    controls.target.copy(hovered.position)
    emit('select', hovered.userData.text)
  }
}
</script>

<style scoped>
/**
 * Wrapper del canvas; se posiciona relativo para poder ubicar el overlay
 * y mantener el fondo estático detrás de la escena 3D.
 */
.tech-galaxy {
  position: relative;
}

/* Capa de ajuste de contraste, siempre debajo del canvas */
.tech-galaxy__overlay {
  position: absolute;
  inset: 0;
  background: #000;
  pointer-events: none;
  z-index: 0;
}

.tech-fallback {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
  position: relative;
  z-index: 1; /* sobre el overlay */
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  z-index: 1; /* sobre el overlay */
}
</style>
