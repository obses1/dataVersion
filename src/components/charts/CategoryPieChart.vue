<script setup lang="ts">
import { computed } from 'vue'
import type { CategoryItem } from '@/types/dashboard'
import { CHART_COLORS } from '@/utils/chart-theme'

const props = defineProps<{ data: CategoryItem[] }>()

const total = computed(() => props.data.reduce((s, d) => s + d.value, 0))

const R = 36
const CX = 50
const CY = 55

function toRad(angle: number) {
  return ((angle - 90) * Math.PI) / 180
}

const slices = computed(() => {
  let cumulative = 0
  return props.data.map((d, i) => {
    const startAngle = cumulative
    const sliceAngle = (d.value / total.value) * 360
    cumulative += sliceAngle
    const midAngle = startAngle + sliceAngle / 2

    // Arc path
    const sRad = toRad(startAngle)
    const eRad = toRad(cumulative)
    const x1 = CX + R * Math.cos(sRad)
    const y1 = CY + R * Math.sin(sRad)
    const x2 = CX + R * Math.cos(eRad)
    const y2 = CY + R * Math.sin(eRad)
    const large = sliceAngle > 180 ? 1 : 0
    const path = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`

    // Guide line + label position
    const mRad = toRad(midAngle)
    const cosA = Math.cos(mRad)
    const sinA = Math.sin(mRad)
    const lx1 = CX + R * cosA
    const ly1 = CY + R * sinA
    const lx2 = CX + (R + 4) * cosA
    const ly2 = CY + (R + 4) * sinA
    const lx3 = CX + (R + 6) * cosA
    const ly3 = CY + (R + 6) * sinA

    const isRight = cosA > 0.1
    const isLeft = cosA < -0.1
    const anchor = isRight ? 'start' : isLeft ? 'end' : 'middle'

    return {
      path,
      color: CHART_COLORS[i % CHART_COLORS.length],
      lx1, ly1, lx2, ly2, lx3, ly3,
      anchor,
      name: d.name,
      percent: d.percent,
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
            v-for="(s, i) in slices"
            :key="i"
            :d="s.path"
            :fill="s.color"
            stroke="rgba(6,30,93,0.8)"
            stroke-width="1"
          />
          <circle :cx="CX" :cy="CY" :r="22" fill="#0a0e27" />

          <!-- Guide lines -->
          <polyline
            v-for="(s, i) in slices"
            :key="'g' + i"
            :points="`${s.lx1},${s.ly1} ${s.lx2},${s.ly2} ${s.lx3},${s.ly3}`"
            fill="none"
            stroke="#7ec8e3"
            stroke-width="0.4"
            opacity="0.7"
          />

          <!-- Labels -->
          <text
            v-for="(s, i) in slices"
            :key="'t' + i"
            :x="s.lx3 + (s.anchor === 'start' ? 1 : s.anchor === 'end' ? -1 : 0)"
            :y="s.ly3 + 1"
            :text-anchor="s.anchor"
            fill="#c8e6f5"
            font-size="1.8"
          >{{ s.name }} {{ s.percent }}%</text>
        </svg>
      </div>

      <!-- Bottom legend -->
      <div class="legend-bottom">
        <span v-for="(d, i) in data" :key="d.name" class="legend-tag">
          <span class="legend-dot" :style="{ background: CHART_COLORS[i] }" />
          {{ d.name }}
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
  position: relative;
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
  max-height: 160px;
}
.chart-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b9dc3;
  font-size: 14px;
}
.legend-bottom {
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}
.legend-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 8px;
  color: #a0b8d0;
}
.legend-dot {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  flex-shrink: 0;
}
</style>
