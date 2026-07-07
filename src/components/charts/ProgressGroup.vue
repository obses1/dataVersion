<script setup lang="ts">
import type { ProgressItem } from '@/types/dashboard'

defineProps<{ data: ProgressItem[] }>()

function barColor(pct: number): string {
  if (pct >= 90) return 'linear-gradient(90deg, #00a3ff, #00ff88)'
  if (pct >= 70) return 'linear-gradient(90deg, #ffd700, #00ff88)'
  return 'linear-gradient(90deg, #ff6b6b, #ffd700)'
}
</script>

<template>
  <div v-if="!data.length" class="progress-empty">暂无数据</div>
  <div v-else class="progress-list">
    <div v-for="item in data" :key="item.label" class="progress-item">
      <div class="progress-header">
        <span class="progress-label">{{ item.label }}</span>
        <span class="progress-pct">{{ item.percent }}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: item.percent + '%', background: barColor(item.percent) }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-list { display: flex; flex-direction: column; gap: 6px; padding: 2px 0; overflow-y: auto; flex: 1; min-height: 0; }
.progress-list::-webkit-scrollbar { width: 4px; }
.progress-list::-webkit-scrollbar-thumb { background: rgba(0,163,255,0.3); border-radius: 2px; }
.progress-empty {
  flex: 1; display: flex; align-items: center; justify-content: center;
  color: #8b9dc3; font-size: 14px;
}
.progress-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.progress-label { color: #c0c8d8; font-size: 13px; }
.progress-pct { color: #ffd700; font-size: 13px; font-family: 'DIN Alternate','Consolas',monospace; }
.progress-track {
  height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden;
}
.progress-fill {
  height: 100%; border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
