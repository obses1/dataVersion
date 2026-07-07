<script setup lang="ts">
defineProps<{ rows?: number }>()
</script>

<template>
  <div class="skeleton">
    <div v-for="i in (rows ?? 3)" :key="i" class="skeleton-line" :style="{ animationDelay: `${i * 0.1}s` }" />
  </div>
</template>

<style scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
}
.skeleton-line {
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(0,163,255,0.1) 25%, rgba(0,163,255,0.3) 50%, rgba(0,163,255,0.1) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
.skeleton-line:last-child { width: 60%; }
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
