import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TechIcon from '@/components/TechIcon.vue'

describe('TechIcon', () => {
  it('renders tech name', () => {
    const wrapper = mount(TechIcon, {
      props: {
        techData: { name: 'Vue', svg: '', color: '#42b883' }
      }
    })
    expect(wrapper.find('.tech-name').text()).toBe('Vue')
  })
})
