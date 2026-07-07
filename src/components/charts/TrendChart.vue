<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Chart } from '@antv/g2'
import type { TrendPoint } from '@/types/dashboard'
import { CHART_COLORS } from '@/utils/chart-theme'

const props = defineProps<{ data: TrendPoint[] }>()
const container = ref<HTMLDivElement | null>(null)
let chart: Chart | null = null

function render() {
  if (!container.value || !props.data.length) return
  if (chart) { chart.destroy(); chart = null }
  chart = new Chart({ container: container.value, autoFit: true })
  chart.theme('dark')
  chart.style({ viewFill: 'transparent' })

  const ds = props.data.map((d) => ({ date: d.date, value: d.online, category: '线上销售' }))
    .concat(props.data.map((d) => ({ date: d.date, value: d.offline, category: '线下销售' })))

  chart.data(ds)
  chart.encode('x', 'date')
  chart.encode('y', 'value')
  chart.encode('color', 'category')
  chart.scale('color', { range: [CHART_COLORS[0], CHART_COLORS[1]] })
  chart.axis('x', { labelFill: '#8b9dc3', grid: false })
  chart.axis('y', { labelFill: '#8b9dc3', gridStroke: 'rgba(255,255,255,0.06)' })
  chart.legend('color', { labelFill: '#8b9dc3' })

  chart.line().encode('shape', 'smooth')
  chart.area().encode('shape', 'smooth').style('fillOpacity', 0.1)
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
