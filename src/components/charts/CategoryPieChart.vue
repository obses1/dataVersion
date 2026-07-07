<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryItem } from '@/types/dashboard'
import { CHART_COLORS } from '@/utils/chart-theme'

const props = defineProps<{ data: CategoryItem[] }>()

const total = computed(() => props.data.reduce((s, d) => s + d.value, 0))

interface ArcData {
  startX: number; startY: number
  endX: number; endY: number
  largeArc: number
  color: string
}

function describeArc(startAngle: number, endAngle: number, r: number): string {
  const startRad = ((startAngle - 90) * Math.PI) / 180
  const endRad = ((endAngle - 90) * Math.PI) / 180
  const x1 = 50 + r * Math.cos(startRad)
  const y1 = 50 + r * Math.sin(startRad)
  const x2 = 50 + r * Math.cos(endRad)
  const y2 = 50 + r * Math.sin(endRad)
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M 50 50 L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
}

const slices = computed(() => {
  let cumulative = 0
  return props.data.map((d, i) => {
    const startAngle = cumulative
    const sliceAngle = (d.value / total.value) * 360
    cumulative += sliceAngle
    return {
      path: describeArc(startAngle, cumulative, 42),
      color: CHART_COLORS[i % CHART_COLORS.length],
    }
  })
})
</script>

<template>
  <div class="pie-wrapper">
    <div v-if="!data.length" class="chart-empty">暂无数据</div>
    <template v-else>
      <div class="chart-area">
        <svg viewBox="0 0 100 100" class="pie-svg">
          <path
            v-for="(slice, i) in slices"
            :key="i"
            :d="slice.path"
            :fill="slice.color"
            stroke="rgba(6,30,93,0.8)"
            stroke-width="1"
          />
          <circle cx="50" cy="50" r="26" fill="#0a0e27" />
        </svg>
      </div>
      <div class="pie-legend">
        <span
          v-for="(d, i) in data"
          :key="d.name"
          class="legend-item"
        >
          <span class="legend-dot" :style="{ background: CHART_COLORS[i] }" />
          {{ d.name }} {{ d.percent }}%
        </span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.pie-wrapper {
  display: flex;
  flex: 1;
  min-height: 0;
  width: 100%;
}
.chart-area {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pie-svg {
  width: 100%;
  height: 100%;
  max-height: 200px;
}
.chart-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b9dc3;
  font-size: 14px;
}
.pie-legend {
  width: 100px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #8b9dc3;
  margin: 3px 0;
}
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}
</style>
