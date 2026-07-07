export interface MetricItem {
  id: string
  label: string
  value: number
  prefix?: string
  suffix?: string
  change: number // 百分比，正数涨负数跌
}

export interface TrendPoint {
  date: string
  online: number
  offline: number
}

export interface RegionSale {
  region: string
  value: number
}

export interface CategoryItem {
  name: string
  value: number
  percent: number
}

export interface ProgressItem {
  label: string
  percent: number
}

export interface RankingItem {
  rank: number
  name: string
  sales: number
  change: number
}

export interface DashboardData {
  metrics: MetricItem[]
  trend: TrendPoint[]
  regionSales: RegionSale[]
  categories: CategoryItem[]
  progress: ProgressItem[]
  ranking: RankingItem[]
}

export type DataStatus = 'loading' | 'success' | 'error' | 'empty'
