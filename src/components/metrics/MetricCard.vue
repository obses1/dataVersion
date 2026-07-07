<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import type { MetricItem } from '@/types/dashboard'
import { formatCurrency, formatNumber, formatPercent } from '@/utils/format'

const props = defineProps<{ item: MetricItem }>()

const displayValue = ref(0)
let animFrame = 0

function formatValue(v: number): string {
  if (props.item.prefix === '¥') return formatCurrency(v)
  return formatNumber(v)
}

const isUp = computed(() => props.item.change >= 0)
const changeClass = computed(() => isUp.value ? 'change-up' : 'change-down')
const changeText = computed(() => formatPercent(props.item.change))

onMounted(() => {
  const target = props.item.value
  const duration = 800
  const start = performance.now()

  function animate(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
    displayValue.value = Math.round(target * eased)
    if (progress < 1) {
      animFrame = requestAnimationFrame(animate)
    }
  }
  animFrame = requestAnimationFrame(animate)
})

watch(() => props.item.value, (newVal) => {
  displayValue.value = newVal
})
</script>

<template>
  <div :class="['metric-card', changeClass]">
    <div class="metric-label">{{ item.label }}</div>
    <div class="metric-value">
      <span v-if="item.prefix" class="metric-prefix">{{ item.prefix }}</span>
      <span class="metric-number">{{ formatValue(displayValue) }}</span>
      <span v-if="item.suffix" class="metric-suffix">{{ item.suffix }}</span>
    </div>
    <div class="metric-change">
      <span class="change-arrow">{{ isUp ? '↑' : '↓' }}</span>
      <span>较昨日 {{ changeText }}</span>
    </div>
  </div>
</template>

<style scoped>
.metric-card {
  background: rgba(6, 30, 93, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 163, 255, 0.3);
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}
.metric-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
}
.metric-card.change-up::before { background: #00ff88; }
.metric-card.change-down::before { background: #ff4444; }

.metric-label {
  font-size: 13px;
  color: #8b9dc3;
  margin-bottom: 8px;
}
.metric-value {
  font-family: 'DIN Alternate', 'Consolas', monospace;
  font-size: 36px;
  font-weight: 700;
  color: #e0e6f0;
  margin-bottom: 6px;
  white-space: nowrap;
}
.metric-prefix { font-size: 24px; color: #ffd700; margin-right: 2px; }
.metric-number { letter-spacing: 1px; }
.metric-suffix { font-size: 18px; color: #8b9dc3; margin-left: 4px; }

.metric-change {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.change-arrow { font-size: 14px; }
.change-up .metric-change { color: #00ff88; }
.change-down .metric-change { color: #ff4444; }
</style>
