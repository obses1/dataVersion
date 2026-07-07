import type { MetricItem } from '@/types/dashboard'

export function generateMetrics(): MetricItem[] {
  return [
    { id: '1', label: '总用户量', value: 128591, suffix: '', change: 2.4 },
    { id: '2', label: '活跃用户', value: 43892, suffix: '', change: 5.1 },
    { id: '3', label: '总营收', value: 8392410, prefix: '¥', change: -1.2 },
    { id: '4', label: '订单数', value: 6284, suffix: '', change: 3.7 },
  ]
}

// Simulate slight data changes on each refresh
let refreshCount = 0
export function getRefreshedMetrics(): MetricItem[] {
  refreshCount++
  const base = generateMetrics()
  return base.map((item) => ({
    ...item,
    change: +(item.change + (Math.random() - 0.5) * 0.5).toFixed(1),
    value: item.id !== '3'
      ? item.value + Math.floor((Math.random() - 0.5) * 20)
      : item.value + Math.floor((Math.random() - 0.5) * 1000),
  }))
}
