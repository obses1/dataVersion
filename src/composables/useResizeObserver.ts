import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useResizeObserver(elRef: Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)
  let observer: ResizeObserver | null = null

  onMounted(() => {
    if (!elRef.value) return
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect
        width.value = w
        height.value = h
      }
    })
    observer.observe(elRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { width, height }
}
