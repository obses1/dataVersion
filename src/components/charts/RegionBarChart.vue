<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Chart } from '@antv/g2'
import type { RegionSale } from '@/types/dashboard'
import { CHART_COLORS } from '@/utils/chart-theme'

const props = defineProps<{ data: RegionSale[] }>()
const container = ref<HTMLDivElement | null>(null)
let chart: Chart | null = null

function render() {
  if (!container.value || !props.data.length) return
  if (chart) { chart.destroy(); chart = null }
  chart = new Chart({ container: container.value, autoFit: true })
  chart.theme('dark')
  chart.style({ viewFill: 'transparent' })

  chart.data(props.data)
  chart.encode('x', 'region')
  chart.encode('y', 'value')
  chart.encode('color', 'region')
  chart.scale('color', { range: CHART_COLORS })
  chart.axis('x', { labelFill: '#8b9dc3', grid: false })
  chart.axis('y', { labelFill: '#8b9dc3', gridStroke: 'rgba(255,255,255,0.06)' })
  chart.legend(false)

  chart.interval().style('radius', 4).encode('size', 24)
  chart.interaction('tooltip', {})

  chart.render()
}

onMounted(render)
watch(() => props.data, render, { deep: true })
onUnmounted(() => { chart?.destroy() })
</script>

<template>
  <div v-if="!data.length" class="chart-empty">暂无数据</div>
  <div ref="container" class="chart-container" />
</template>

<style scoped>
.chart-container { flex: 1; min-height: 0; width: 100%; }
.chart-empty {
  flex: 1; display: flex; align-items: center; justify-content: center;
  color: #8b9dc3; font-size: 14px;
}
</style>
