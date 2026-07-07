import request from '../request'
import type { TrendPoint, RegionSale, CategoryItem } from '@/types/dashboard'

export async function fetchTrend(): Promise<TrendPoint[]> {
  const res = await request.get('/charts/trend')
  return res.data
}

export async function fetchRegionSales(): Promise<RegionSale[]> {
  const res = await request.get('/charts/region-sales')
  return res.data
}

export async function fetchCategories(): Promise<CategoryItem[]> {
  const res = await request.get('/charts/categories')
  return res.data
}
