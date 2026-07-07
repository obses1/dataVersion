import axios from 'axios'
import logger from '@/utils/logger'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.request.use(
  (config) => {
    logger.debug(`[REQ] ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    logger.error(`[REQ] Request error: ${error.message}`)
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config._startTime as number)
    logger.debug(`[RES] ${response.status} ${response.config.url} (${duration}ms)`)
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      logger.error('[RES] Request timeout')
    } else if (!error.response) {
      logger.error('[RES] Network error')
    } else {
      logger.error(`[RES] ${error.response.status} ${error.config?.url}`)
    }
    return Promise.reject(error)
  },
)

// Attach start time
request.interceptors.request.use((config) => {
  config._startTime = Date.now()
  return config
})

export default request
