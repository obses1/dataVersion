<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDate, formatTime } from '@/utils/format'
import { useApi } from '@/api/useApi'

const { useMock, toggleMock } = useApi()
const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <header class="dashboard-header">
    <div class="header-left">
      <h1 class="header-title">企业数据监控大屏</h1>
    </div>
    <div class="header-right">
      <button class="mock-toggle" @click="toggleMock">
        {{ useMock ? '[Mock 模式]' : '[API 模式]' }}
      </button>
      <span class="header-time">{{ formatDate(now) }} {{ formatTime(now) }}</span>
      <span class="live-dot" />
      <span class="live-text">实时</span>
    </div>
  </header>
</template>

<style scoped>
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 100%;
}
.header-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(90deg, #00a3ff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 4px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.mock-toggle {
  background: rgba(0,163,255,0.15);
  border: 1px solid rgba(0,163,255,0.4);
  color: #8b9dc3;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}
.mock-toggle:hover { background: rgba(0,163,255,0.3); color: #e0e6f0; }
.header-time {
  color: #e0e6f0;
  font-size: 16px;
  font-family: 'DIN Alternate', 'Consolas', monospace;
  letter-spacing: 2px;
}
.live-dot {
  width: 8px; height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: blink 1.5s ease-in-out infinite;
}
.live-text {
  color: #00ff88;
  font-size: 14px;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
