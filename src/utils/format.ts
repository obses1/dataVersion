export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toLocaleString('zh-CN')
}

export function formatCurrency(num: number): string {
  if (num >= 10000) {
    return '¥' + (num / 10000).toFixed(0) + '万'
  }
  return '¥' + num.toLocaleString('zh-CN')
}

export function formatPercent(num: number): string {
  const sign = num > 0 ? '+' : ''
  return `${sign}${num.toFixed(1)}%`
}

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}
