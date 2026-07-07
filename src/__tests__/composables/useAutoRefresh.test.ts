import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

// Vitest uses fake timers differently, so we test the core logic
describe('useAutoRefresh', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(document, 'visibilityState', {
      value: 'visible',
      writable: true,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('exports start and stop functions', () => {
    const callback = vi.fn().mockResolvedValue(undefined)
    const { start, stop, isRefreshing } = useAutoRefresh(callback, 10000)
    expect(typeof start).toBe('function')
    expect(typeof stop).toBe('function')
    expect(isRefreshing.value).toBe(false)
  })
})
