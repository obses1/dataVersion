import request from '../request'
import type { ProgressItem, RankingItem } from '@/types/dashboard'

export async function fetchProgress(): Promise<ProgressItem[]> {
  const res = await request.get('/ranking/progress')
  return res.data
}

export async function fetchRanking(): Promise<RankingItem[]> {
  const res = await request.get('/ranking/list')
  return res.data
}
