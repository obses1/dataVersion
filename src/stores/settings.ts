import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const useMock = ref(import.meta.env.VITE_USE_MOCK !== 'false')
  const refreshInterval = ref(30_000)
  const dataStatus = ref<'loading' | 'success' | 'error'>('loading')

  function toggleMock() {
    useMock.value = !useMock.value
  }

  function setDataStatus(status: 'loading' | 'success' | 'error') {
    dataStatus.value = status
  }

  return { useMock, refreshInterval, dataStatus, toggleMock, setDataStatus }
})
