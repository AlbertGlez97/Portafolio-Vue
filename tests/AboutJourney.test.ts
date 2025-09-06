import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import About from '@/views/About.vue'

describe('About.vue journey items', () => {
  it('shows empty state when no experience data', async () => {
    const pinia = createPinia()
    // jsdom lacks matchMedia; provide a stub
    window.matchMedia = window.matchMedia || ((query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {}
    }))
    localStorage.setItem('app', JSON.stringify({ experience: [] }))
    const wrapper = mount(About, {
      global: { plugins: [pinia] }
    })
    await flushPromises()
    expect(wrapper.text()).toContain('No hay experiencias registradas')
  })
})

