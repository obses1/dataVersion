import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import logger from '@/utils/logger'

export function useApi() {
  const settingsStore = useSettingsStore()
  const useMock = ref(settingsStore.useMock)

  async function toggleMock() {
    settingsStore.toggleMock()
    useMock.value = settingsStore.useMock
    logger.info(`Mock 模式已${useMock.value ? '开启' : '关闭'}`)
    window.location.reload()
  }

  return { useMock, toggleMock }
}
