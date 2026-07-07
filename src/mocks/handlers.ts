import { http, HttpResponse, delay } from 'msw'
import { getRefreshedMetrics } from './data/metrics'
import { generateTrend, generateRegionSales, generateCategories } from './data/charts'
import { generateProgress, generateRanking } from './data/ranking'

const MOCK_DELAY_MIN = 300
const MOCK_DELAY_MAX = 800

function randomDelay() {
  return delay(Math.floor(Math.random() * (MOCK_DELAY_MAX - MOCK_DELAY_MIN) + MOCK_DELAY_MIN))
}

export const handlers = [
  http.get('/api/metrics', async () => {
    await randomDelay()
    return HttpResponse.json(getRefreshedMetrics())
  }),

  http.get('/api/charts/trend', async () => {
    await randomDelay()
    return HttpResponse.json(generateTrend())
  }),

  http.get('/api/charts/region-sales', async () => {
    await randomDelay()
    return HttpResponse.json(generateRegionSales())
  }),

  http.get('/api/charts/categories', async () => {
    await randomDelay()
    return HttpResponse.json(generateCategories())
  }),

  http.get('/api/ranking/progress', async () => {
    await randomDelay()
    return HttpResponse.json(generateProgress())
  }),

  http.get('/api/ranking/list', async () => {
    await randomDelay()
    return HttpResponse.json(generateRanking())
  }),
]
