import { CanvasTexture, Sprite, SpriteMaterial } from 'three'

// Entrada de caché para evitar recrear texturas de texto
interface CacheEntry {
  /** Textura nítida utilizada cuando el sprite está en primer plano */
  texture: CanvasTexture
  /** Versión suavemente desenfocada para sprites lejanos; ayuda a dar
   *  sensación de profundidad sin eliminarlos por completo. */
  blurTexture: CanvasTexture
  width: number
  height: number
}

// Caché en memoria para reutilizar texturas de etiquetas y evitar
// recrearlas en cada frame. Se indexa por el texto de la etiqueta.
const cache = new Map<string, CacheEntry>()

function toPx(value: string): number {
  const trimmed = value.trim()
  const rootFont = parseFloat(
    getComputedStyle(document.documentElement).fontSize || '16px'
  )
  if (trimmed.endsWith('rem')) return parseFloat(trimmed) * rootFont
  return parseFloat(trimmed)
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const bigint = parseInt(h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r},${g},${b},${alpha})`
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

/**
 * Creates a Three.js Sprite containing the given text rendered on a canvas.
 * Styles mirror the TechBadge component so DOM and 3D labels look identical.
 */
export function createTextSprite(text: string): Sprite {
  const dpr = window.devicePixelRatio || 1
  const cacheKey = text
  let entry = cache.get(cacheKey)
  if (!entry) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const root = getComputedStyle(document.documentElement)

    // Se reutilizan los mismos tokens que el componente TechBadge de la UI
    // para garantizar coherencia cromática entre la versión DOM y el sprite.
    const fontFamily =
      root.getPropertyValue('font-family').trim() ||
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    const fontSize = toPx(root.getPropertyValue('--font-size-xs')) || 12
    const paddingX = toPx(root.getPropertyValue('--spacing-sm')) || 16
    const paddingY = toPx(root.getPropertyValue('--spacing-xs')) || 8
    const radius = toPx(root.getPropertyValue('--border-radius-md')) || 8
    const textColor = root.getPropertyValue('--primary-dark').trim() || '#2E7D32'
    const baseColor = root.getPropertyValue('--primary-color').trim() || '#4CAF50'

    ctx.font = `${fontSize}px ${fontFamily}`
    const textWidth = ctx.measureText(text).width
    const width = textWidth + paddingX * 2
    const height = fontSize + paddingY * 2

    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Fondo translúcido y borde suave para separar la etiqueta del fondo.
    ctx.fillStyle = hexToRgba(baseColor, 0.15)
    ctx.strokeStyle = hexToRgba(baseColor, 0.4)
    ctx.lineWidth = 1
    drawRoundedRect(ctx, 0.5, 0.5, width - 1, height - 1, radius)

    // Halo de contraste que mejora la lectura sobre fondos cambiantes.
    ctx.shadowColor = hexToRgba(baseColor, 0.4)
    ctx.shadowBlur = 4

    ctx.fillStyle = textColor
    ctx.fillText(text, width / 2, height / 2)

    // Textura principal
    const texture = new CanvasTexture(canvas)

    // Versión ligeramente desenfocada para sprites lejanos; se genera a
    // partir del canvas original aplicando un filtro CSS.
    const blurCanvas = document.createElement('canvas')
    blurCanvas.width = canvas.width
    blurCanvas.height = canvas.height
    const bctx = blurCanvas.getContext('2d')!
    bctx.filter = 'blur(2px)'
    bctx.drawImage(canvas, 0, 0)
    const blurTexture = new CanvasTexture(blurCanvas)

    entry = { texture, blurTexture, width, height }
    cache.set(cacheKey, entry)
  }

  const material = new SpriteMaterial({ map: entry.texture, transparent: true })
  const sprite = new Sprite(material)
  // Se almacenan ambas texturas para poder alternar según profundidad.
  sprite.userData.normalMap = entry.texture
  sprite.userData.blurMap = entry.blurTexture
  sprite.userData.text = text
  sprite.scale.set(entry.width / 100, entry.height / 100, 1)
  return sprite
}

/** Clears cached textures to free GPU memory. */
export function disposeTextSpriteCache() {
  // Se liberan ambas texturas para evitar fugas de memoria en la GPU.
  cache.forEach(e => {
    e.texture.dispose()
    e.blurTexture.dispose()
  })
  cache.clear()
}
