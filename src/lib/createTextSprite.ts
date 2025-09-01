import { CanvasTexture, Sprite, SpriteMaterial } from 'three'

/**
 * Creates a Three.js Sprite containing the given text rendered on a canvas.
 * The sprite uses theme colors for contrast and a subtle background/border
 * to maintain legibility.
 */
export function createTextSprite(text: string): Sprite {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const padding = 16
  const maxWidth = 512
  const rootStyles = getComputedStyle(document.documentElement)
  const fontFamily = rootStyles.getPropertyValue('--font-family').trim() ||
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  let fontSize = 48

  ctx.font = `${fontSize}px ${fontFamily}`
  let textWidth = ctx.measureText(text).width

  if (textWidth + padding * 2 > maxWidth) {
    const scale = (maxWidth - padding * 2) / textWidth
    fontSize = Math.floor(fontSize * scale)
    ctx.font = `${fontSize}px ${fontFamily}`
    textWidth = ctx.measureText(text).width
  }

  canvas.width = textWidth + padding * 2
  canvas.height = fontSize + padding * 2

  ctx.font = `${fontSize}px ${fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const textColor = rootStyles.getPropertyValue('--text-primary').trim() || '#fff'
  const backgroundColor = 'rgba(0,0,0,0.4)'
  const borderColor = 'rgba(255,255,255,0.3)'

  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = borderColor
  ctx.lineWidth = 1
  ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1)
  ctx.fillStyle = textColor
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new CanvasTexture(canvas)
  const material = new SpriteMaterial({ map: texture, transparent: true })
  const sprite = new Sprite(material)
  sprite.scale.set(canvas.width / 100, canvas.height / 100, 1)
  sprite.userData.text = text
  return sprite
}
