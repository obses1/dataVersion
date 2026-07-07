<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <span class="panel-title">{{ title }}</span>
      <div class="panel-title-line" />
    </div>
    <div class="panel-body">
      <slot />
    </div>
    <span class="corner-bl" />
    <span class="corner-br" />
  </div>
</template>

<style scoped>
.panel {
  background: rgba(6, 30, 93, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 163, 255, 0.3);
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel::before,
.panel::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: #00a3ff;
  border-style: solid;
  z-index: 1;
  pointer-events: none;
}
.panel::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.panel::after { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.corner-bl,
.corner-br {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: #00a3ff;
  border-style: solid;
  z-index: 1;
  pointer-events: none;
}
.corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

.panel-header {
  padding: 12px 16px 0;
  flex-shrink: 0;
}
.panel-title {
  color: #e0e6f0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
}
.panel-title-line {
  height: 2px;
  width: 40px;
  margin-top: 6px;
  background: linear-gradient(90deg, #00a3ff, #00ff88);
  border-radius: 1px;
}
.panel-body {
  flex: 1;
  padding: 8px 12px 12px;
  overflow: hidden;
  min-height: 0;
}
</style>
