<script setup lang="ts">
</script>

<template>
  <div class="dashboard-grid">
    <slot />
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  height: 100%;
  padding: 0 16px 12px;
  gap: 10px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 0.7fr 1.8fr 1.8fr 1.3fr;
  grid-template-areas:
    "metrics metrics metrics"
    "region  trend   category"
    "region  trend   category"
    ".        .        progress";
}
</style>
