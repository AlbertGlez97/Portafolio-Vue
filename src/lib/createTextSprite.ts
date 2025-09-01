import { CanvasTexture, Sprite, SpriteMaterial } from 'three'

interface CacheEntry {
  texture: CanvasTexture
  width: number
  height: number
}

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

    const fontFamily = root.getPropertyValue('font-family').trim() ||
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

    ctx.fillStyle = hexToRgba(baseColor, 0.1)
    ctx.strokeStyle = hexToRgba(baseColor, 0.3)
    ctx.lineWidth = 1
    drawRoundedRect(ctx, 0.5, 0.5, width - 1, height - 1, radius)

    ctx.fillStyle = textColor
    ctx.fillText(text, width / 2, height / 2)

    const texture = new CanvasTexture(canvas)
    entry = { texture, width, height }
    cache.set(cacheKey, entry)
  }

  const material = new SpriteMaterial({ map: entry.texture, transparent: true })
  const sprite = new Sprite(material)
  sprite.scale.set(entry.width / 100, entry.height / 100, 1)
  sprite.userData.text = text
  return sprite
}

/** Clears cached textures to free GPU memory. */
export function disposeTextSpriteCache() {
  cache.forEach(e => e.texture.dispose())
  cache.clear()
}
