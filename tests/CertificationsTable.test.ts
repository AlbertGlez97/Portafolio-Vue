import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CertificationsTable from '@/components/admin/CertificationsTable.vue'
import { useCertificationStore } from '@/stores'

const matchMediaStub = () => ({
  matches: false,
  media: '',
  addEventListener: () => {},
  removeEventListener: () => {}
})

describe('CertificationsTable', () => {
  let pinia: ReturnType<typeof createPinia>
    beforeEach(() => {
      window.matchMedia = window.matchMedia || matchMediaStub
      pinia = createPinia()
      setActivePinia(pinia)
      const store = useCertificationStore()
      store.items = [
        {
          id: 1,
          title: { es: 'Cert', en: 'Cert' },
          provider: 'Prov',
          icon: 'icon',
          description: { es: 'd', en: 'd' },
          updatedAt: ''
        }
      ]
      store.ensureLoaded = async () => {}
    })

  it('emits table events', async () => {
    const wrapper = mount(CertificationsTable, { global: { plugins: [pinia] } })
    await wrapper.vm.$nextTick()

    await wrapper.find('.table-header .btn-primary').trigger('click')
    expect(wrapper.emitted('create')).toBeTruthy()

    const buttons = wrapper.findAll('tbody .btn.btn-secondary')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('edit')?.[0]).toEqual([1])

    await buttons[1].trigger('click')
    expect(wrapper.emitted('duplicate')?.[0]).toEqual([1])

    await buttons[2].trigger('click')
    expect(wrapper.emitted('delete')?.[0]).toEqual([1])
  })
})
