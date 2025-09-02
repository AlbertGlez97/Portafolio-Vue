<template>
  <!-- Contenedor principal que aloja el canvas 3D o el fallback plano.
       Se ha retirado la antigua imagen de fondo `codigoBinario.jpg` porque
       restaba legibilidad a las etiquetas. En su lugar se emplea un gradiente
       neutro basado en variables CSS que respeta automáticamente el modo
       oscuro o claro. -->
  <div ref="container" class="tech-galaxy" :style="containerStyles">
    <!-- Capa opcional que ajusta el contraste. Usa el color de fondo actual
         para no introducir nuevos tonos y mantiene pointer-events: none para
         no interferir con la interacción de OrbitControls. -->
    <div
      v-if="props.overlayOpacity > 0"
      class="tech-galaxy__overlay"
      :style="{ opacity: props.overlayOpacity }"
    ></div>
    <!-- Toggle accesible para pausar/reanudar la animación.
         Es relevante para usuarios con "reduced motion" y se podría
         conectar a una store global si se desea persistir la preferencia. -->
    <button
      v-if="props.allowPause"
      class="tech-galaxy__toggle"
      @click="toggleRotation"
      :aria-pressed="isRotating"
      :aria-label="isRotating ? 'Pausar rotación automática' : 'Reanudar rotación automática'"
    >
      {{ isRotating ? '⏸' : '▶' }}
    </button>

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
  Vector2,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import TechBadge from './TechBadge.vue'
import { createTextSprite, disposeTextSpriteCache } from '../lib/createTextSprite'

/**
 * TechGalaxy.vue
 * ---------------
 * Visualiza una galaxia 3D de etiquetas con Three.js. En versiones previas
 * se empleaba una imagen de fondo (codigoBinario.jpg) que, aunque vistosa,
 * dificultaba la lectura de las etiquetas. Ahora el componente utiliza un
 * gradiente neutro basado en los tokens `--bg-primary` y `--bg-secondary`,
 * garantizando coherencia cromática tanto en modo claro como oscuro sin
 * introducir colores nuevos. La configuración está pensada para ser extensible
 * y documentada para facilitar futuros ajustes (densidad, velocidad, etc.).
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
  overlayOpacity?: number // opacidad de la capa de contraste (0-1)
  allowPause?: boolean // muestra el botón para pausar/reanudar rotación
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 480,
  autoRotate: true,
  autoRotateSpeed: 0.3,
  radius: 10,
  enableDamping: true,
  dampingFactor: 0.05,
  particleDensity: 500,
  overlayOpacity: 0.15,
  allowPause: true
})

// Evento emitido al seleccionar un sprite
const emit = defineEmits<{ (e: 'select', tech: string): void }>()

// Referencias DOM y banderas de renderizado
const container = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const show3D = ref(true)
// Controla si la escena gira automáticamente; se inicia respetando la
// preferencia del usuario para "reduced motion".
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches
const isRotating = ref(props.autoRotate && !prefersReducedMotion)

let renderer: WebGLRenderer
let scene: Scene
let camera: PerspectiveCamera
let controls: OrbitControls
let animationId = 0
const sprites: Sprite[] = [] // colección de etiquetas 3D
const raycaster = new Raycaster() // detección de interacción
const mouse = new Vector2()
let hovered: Sprite | null = null // sprite actualmente bajo el cursor
// Ya no se utiliza textura de fondo; el gradiente se resuelve vía CSS.

// Normaliza medidas numéricas a valores CSS
const resolvedWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
)
const resolvedHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)

// Estilos reactivos del contenedor: solo dimensiones. El fondo se maneja con CSS.
const containerStyles = computed(() => ({
  width: resolvedWidth.value,
  height: resolvedHeight.value
}))

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

// Inicializa escena Three.js al montar el componente
onMounted(() => {
  if (!isWebGLAvailable()) {
    show3D.value = false
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
})

// Permite pausar o reanudar la rotación automática mediante el botón
// accesible del template. Se podría persistir en una store de Pinia si se
// desea que la preferencia se mantenga en toda la app.
function toggleRotation() {
  isRotating.value = !isRotating.value
  controls.autoRotate = isRotating.value
}

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

  // Controles de órbita con auto-rotación opcional. El fondo CSS permanece
  // estático mientras la escena se mueve, reforzando la legibilidad.
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = props.enableDamping
  controls.dampingFactor = props.dampingFactor
  controls.autoRotate = isRotating.value
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
  // Se generan partículas aleatorias alrededor de la esfera principal. El
  // número de partículas es configurable mediante `particleDensity` para poder
  // balancear rendimiento y sensación de profundidad.
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

  // Sprites de texto distribuidos mediante una esfera de Fibonacci. Este
  // algoritmo garantiza densidad uniforme, evitando clusters y huecos.
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

// Curva de animación principal. Se utiliza una función ease-in/ease-out para
// que la escala de las etiquetas cambie de forma gradual según su profundidad
// evitando saltos bruscos. Además se alterna entre texturas nítidas y
// desenfocadas para reforzar la sensación de distancia.
function animate() {
  animationId = requestAnimationFrame(animate)
  sprites.forEach(sprite => {
    const dist = camera.position.distanceTo(sprite.position)
    const min = props.radius * 0.8
    const max = props.radius * 3
    const t = Math.min(Math.max((dist - min) / (max - min), 0), 1)
    // easeInOutQuad: crecimiento suave que mejora la lectura
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    const maxScale = 1.2
    const minScale = 0.6 // nunca más pequeño para preservar legibilidad
    const scale = minScale + (maxScale - minScale) * (1 - eased)
    sprite.scale.setScalar(scale)
    const material = sprite.material as any
    material.opacity = 1 - t * 0.6
    const nextMap = t > 0.7 ? sprite.userData.blurMap : sprite.userData.normalMap
    if (material.map !== nextMap) {
      material.map = nextMap
      material.needsUpdate = true
    }
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
 * Wrapper del canvas. El fondo se genera con un gradiente radial basado en
 * `--bg-primary` y `--bg-secondary` para integrarse con la paleta del sitio
 * tanto en modo claro como oscuro. Un pseudo-elemento aporta un patrón muy
 * sutil que evita un vacío plano sin distraer.
 */
.tech-galaxy {
  position: relative;
  background: var(--bg-primary);
  background-image: radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 70%);
  overflow: hidden;
}
.tech-galaxy::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-radial-gradient(var(--bg-secondary) 0 1px, transparent 1px 2px);
  opacity: 0.05;
  filter: blur(1px);
  pointer-events: none;
  z-index: 0;
}

/* Capa de ajuste de contraste, siempre debajo del canvas */
.tech-galaxy__overlay {
  position: absolute;
  inset: 0;
  background: var(--bg-primary);
  pointer-events: none;
  z-index: 1;
}

/* Botón para pausar/reanudar la animación */
.tech-galaxy__toggle {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-full);
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  z-index: 3;
  transition: box-shadow var(--transition-fast);
}
.tech-galaxy__toggle:hover {
  box-shadow: var(--shadow-md);
}

.tech-fallback {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
  position: relative;
  z-index: 2; /* sobre el overlay */
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  z-index: 2; /* sobre el overlay */
}
</style>
