import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MetricCard from '@/components/metrics/MetricCard.vue'

const mockItem = {
  id: '1',
  label: '总用户量',
  value: 128591,
  prefix: undefined,
  suffix: '',
  change: 2.4,
}

describe('MetricCard', () => {
  it('renders label correctly', () => {
    const wrapper = mount(MetricCard, { props: { item: mockItem } })
    expect(wrapper.text()).toContain('总用户量')
  })

  it('shows positive change in green', () => {
    const wrapper = mount(MetricCard, { props: { item: mockItem } })
    expect(wrapper.find('.change-up').exists()).toBe(true)
  })

  it('shows negative change in red', () => {
    const negItem = { ...mockItem, change: -1.5 }
    const wrapper = mount(MetricCard, { props: { item: negItem } })
    expect(wrapper.find('.change-down').exists()).toBe(true)
  })

  it('formats currency values with prefix', () => {
    const currencyItem = { ...mockItem, value: 8392410, prefix: '¥' }
    const wrapper = mount(MetricCard, { props: { item: currencyItem } })
    expect(wrapper.text()).toContain('¥')
  })
})
