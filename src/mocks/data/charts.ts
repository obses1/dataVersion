import type { TrendPoint, RegionSale, CategoryItem } from '@/types/dashboard'

export function generateTrend(): TrendPoint[] {
  const data: TrendPoint[] = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    data.push({
      date: `${mm}-${dd}`,
      online: +(20 + Math.random() * 30).toFixed(1),
      offline: +(25 + Math.random() * 25).toFixed(1),
    })
  }
  return data
}

export function generateRegionSales(): RegionSale[] {
  const regions = ['华东', '华南', '华北', '华中', '西南', '西北']
  return regions
    .map((region) => ({
      region,
      value: +(80 + Math.random() * 120).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)
}

export function generateCategories(): CategoryItem[] {
  return [
    { name: '电子产品', value: 35, percent: 35 },
    { name: '服装', value: 26, percent: 26 },
    { name: '食品', value: 19, percent: 19 },
    { name: '家居', value: 13, percent: 13 },
    { name: '其他', value: 7, percent: 7 },
  ]
}
