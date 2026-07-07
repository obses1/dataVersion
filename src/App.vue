<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useSettingsStore } from '@/stores/settings'
import { useAutoRefresh } from '@/composables/useAutoRefresh'
import DashboardHeader from '@/components/layout/DashboardHeader.vue'
import DashboardGrid from '@/components/layout/DashboardGrid.vue'
import MetricCard from '@/components/metrics/MetricCard.vue'
import DataPanel from '@/components/common/DataPanel.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import TrendChart from '@/components/charts/TrendChart.vue'
import RegionBarChart from '@/components/charts/RegionBarChart.vue'
import CategoryPieChart from '@/components/charts/CategoryPieChart.vue'
import ProgressGroup from '@/components/charts/ProgressGroup.vue'
import logger from '@/utils/logger'

const dashboard = useDashboardStore()
const settings = useSettingsStore()

onMounted(async () => {
  logger.info('Dashboard initializing...')
  await dashboard.fetchAll()
})

useAutoRefresh(() => dashboard.fetchAll(), settings.refreshInterval)
</script>

<template>
  <div class="dashboard-app">
    <div class="header-area">
      <DashboardHeader />
    </div>
    <div class="main-area">
      <DashboardGrid>
        <!-- Metrics row -->
        <div class="metrics-row" style="grid-area: metrics">
          <template v-if="settings.dataStatus === 'loading'">
            <LoadingSkeleton v-for="i in 4" :key="i" :rows="2" />
          </template>
          <MetricCard
            v-for="item in dashboard.metrics"
            v-else
            :key="item.id"
            :item="item"
          />
        </div>

        <!-- Region bar chart -->
        <div style="grid-area: region">
          <DataPanel title="区域销售">
            <template v-if="settings.dataStatus === 'loading'">
              <LoadingSkeleton :rows="5" />
            </template>
            <RegionBarChart v-else :data="dashboard.regionSales" />
          </DataPanel>
        </div>

        <!-- Trend chart -->
        <div style="grid-area: trend">
          <DataPanel title="近30天销售趋势">
            <template v-if="settings.dataStatus === 'loading'">
              <LoadingSkeleton :rows="4" />
            </template>
            <TrendChart v-else :data="dashboard.trend" />
          </DataPanel>
        </div>

        <!-- Right column: pie + progress -->
        <div style="grid-area: right; display: flex; flex-direction: column; gap: 0;">
          <DataPanel title="品类占比" style="flex: 1; min-height: 0;">
            <template v-if="settings.dataStatus === 'loading'">
              <LoadingSkeleton :rows="4" />
            </template>
            <CategoryPieChart v-else :data="dashboard.categories" />
          </DataPanel>
          <DataPanel title="目标完成率" style="flex: 1; min-height: 0;">
            <template v-if="settings.dataStatus === 'loading'">
              <LoadingSkeleton :rows="4" />
            </template>
            <ProgressGroup v-else :data="dashboard.progress" />
          </DataPanel>
        </div>

      </DashboardGrid>
    </div>
  </div>
</template>

<style scoped>
.dashboard-app {
  width: 100vw;
  height: 100vh;
  background: #0a0e27;
  background-image:
    linear-gradient(rgba(0, 163, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 163, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header-area {
  height: 8%;
  flex-shrink: 0;
}
.main-area {
  flex: 1;
  min-height: 0;
}
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
