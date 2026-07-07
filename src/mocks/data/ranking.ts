import type { ProgressItem, RankingItem } from '@/types/dashboard'

export function generateProgress(): ProgressItem[] {
  return [
    { label: '销售额完成', percent: 87 },
    { label: '利润完成', percent: 72 },
    { label: '回款率', percent: 94 },
    { label: '新客拓展', percent: 65 },
    { label: '客户满意度', percent: 91 },
  ]
}

export function generateRanking(): RankingItem[] {
  const items = [
    { name: 'AI智能音箱 Pro Max', sales: 12893, change: 12.5 },
    { name: '折叠屏手机 Mate X', sales: 10245, change: -3.2 },
    { name: '无线降噪耳机 Air', sales: 8932, change: 8.7 },
    { name: '智能手表 Ultra 2', sales: 7654, change: 15.3 },
    { name: '超薄笔记本 Air 15', sales: 6543, change: -1.8 },
    { name: '4K显示器 27寸', sales: 5432, change: 6.1 },
    { name: '机械键盘 RGB', sales: 4321, change: -5.4 },
    { name: '云台相机 Pocket 3', sales: 3892, change: 22.1 },
  ]
  return items.map((item, index) => ({
    ...item,
    rank: index + 1,
  }))
}
