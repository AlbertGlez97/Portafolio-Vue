import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TechBadge from '@/components/TechBadge.vue'

describe('TechBadge', () => {
  it('renders label', () => {
    const wrapper = mount(TechBadge, {
      props: { label: 'Vue.js' }
    })
    expect(wrapper.text()).toBe('Vue.js')
  })
})
