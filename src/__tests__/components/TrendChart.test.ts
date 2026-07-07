import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TrendChart from '@/components/charts/TrendChart.vue'

describe('TrendChart', () => {
  it('shows empty placeholder when no data', () => {
    const wrapper = mount(TrendChart, { props: { data: [] } })
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('renders empty view without crashing', () => {
    const wrapper = mount(TrendChart, { props: { data: [] } })
    expect(wrapper.find('.chart-empty').exists()).toBe(true)
  })
})
