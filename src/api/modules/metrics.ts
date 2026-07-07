import request from '../request'
import type { MetricItem } from '@/types/dashboard'

export async function fetchMetrics(): Promise<MetricItem[]> {
  const res = await request.get('/metrics')
  return res.data
}
