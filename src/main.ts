import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { worker } from '@/mocks/browser'
import App from '@/App.vue'
import logger from '@/utils/logger'
import 'virtual:uno.css'

async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)

  if (import.meta.env.VITE_USE_MOCK !== 'false') {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass',
      })
      logger.info('MSW worker started - using mock data')
    } catch (e) {
      logger.warn(`MSW start failed, falling back to API: ${(e as Error).message}`)
    }
  }

  app.mount('#app')
  logger.info('App mounted')
}

bootstrap()
