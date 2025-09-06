import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router'

describe('router configuration', () => {
  it('provides a component for every non-redirect route', () => {
    router
      .getRoutes()
      .filter(r => !r.redirect)
      .forEach(r => {
        const comp = (r.components && r.components.default) || (r as any).component
        expect(comp).toBeTruthy()
      })
  })

  it('navigates to core routes without error', async () => {
    setActivePinia(createPinia())
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {}
    })) as any
    window.scrollTo = () => {}
    const paths = ['/', '/sobre-mi', '/educacion']
    for (const path of paths) {
      await router.push(path)
      await router.isReady()
      expect(router.currentRoute.value.path).toBe(path)
    }
  })
})

