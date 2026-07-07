import { onMounted, onUnmounted, ref } from 'vue'
import logger from '@/utils/logger'

export function useAutoRefresh(callback: () => Promise<void>, intervalMs: number) {
  const isRefreshing = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  function start() {
    if (timer) return
    timer = setInterval(async () => {
      if (document.visibilityState === 'hidden') return
      isRefreshing.value = true
      logger.debug('Auto-refreshing dashboard data...')
      await callback()
      isRefreshing.value = false
    }, intervalMs)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function handleVisibility() {
    if (document.visibilityState === 'visible') {
      start()
    } else {
      stop()
    }
  }

  onMounted(() => {
    start()
    document.addEventListener('visibilitychange', handleVisibility)
  })

  onUnmounted(() => {
    stop()
    document.removeEventListener('visibilitychange', handleVisibility)
  })

  return { isRefreshing, start, stop }
}
