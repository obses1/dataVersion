import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MetricItem, TrendPoint, RegionSale, CategoryItem, ProgressItem, RankingItem } from '@/types/dashboard'
import { fetchMetrics } from '@/api/modules/metrics'
import { fetchTrend, fetchRegionSales, fetchCategories } from '@/api/modules/charts'
import { fetchProgress, fetchRanking } from '@/api/modules/ranking'
import { useSettingsStore } from './settings'
import logger from '@/utils/logger'

export const useDashboardStore = defineStore('dashboard', () => {
  const metrics = ref<MetricItem[]>([])
  const trend = ref<TrendPoint[]>([])
  const regionSales = ref<RegionSale[]>([])
  const categories = ref<CategoryItem[]>([])
  const progress = ref<ProgressItem[]>([])
  const ranking = ref<RankingItem[]>([])

  async function fetchAll() {
    const settings = useSettingsStore()
    try {
      settings.setDataStatus('loading')
      const [m, t, r, c, p, rk] = await Promise.all([
        fetchMetrics(),
        fetchTrend(),
        fetchRegionSales(),
        fetchCategories(),
        fetchProgress(),
        fetchRanking(),
      ])
      metrics.value = m
      trend.value = t
      regionSales.value = r
      categories.value = c
      progress.value = p
      ranking.value = rk
      settings.setDataStatus('success')
      logger.info('Dashboard data refreshed successfully')
    } catch (e) {
      settings.setDataStatus('error')
      logger.error(`Failed to fetch dashboard data: ${(e as Error).message}`)
    }
  }

  return { metrics, trend, regionSales, categories, progress, ranking, fetchAll }
})
