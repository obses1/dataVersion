<script setup lang="ts">
import { ref } from 'vue'

const hasError = ref(false)
const errorMsg = ref('')

const retry = () => {
  hasError.value = false
  errorMsg.value = ''
}
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-icon">!</div>
    <p class="error-text">图表加载失败</p>
    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
    <button class="retry-btn" @click="retry">点击重试</button>
  </div>
  <slot v-else />
</template>

<style scoped>
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 120px;
  color: #8b9dc3;
}
.error-icon {
  width: 40px; height: 40px;
  border: 2px solid #ff6b6b;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #ff6b6b; font-size: 20px; font-weight: bold;
  margin-bottom: 10px;
}
.error-text { font-size: 14px; margin-bottom: 4px; }
.error-msg { font-size: 12px; color: #5a6d8a; margin-bottom: 10px; }
.retry-btn {
  background: rgba(0,163,255,0.2);
  border: 1px solid #00a3ff;
  color: #00a3ff;
  padding: 6px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.retry-btn:hover { background: rgba(0,163,255,0.4); }
</style>
