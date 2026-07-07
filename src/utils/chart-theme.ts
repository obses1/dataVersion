import type { Chart } from '@antv/g2'

export const CHART_COLORS = ['#00a3ff', '#00ff88', '#ffd700', '#ff6b6b', '#a78bfa', '#f59e0b']

export const CHART_THEME_OPTIONS = {
  theme: 'dark',
  background: 'transparent',
  color: CHART_COLORS,
  area: {
    style: {
      fillOpacity: 0.15,
    },
  },
  line: {
    style: {
      lineWidth: 2,
    },
  },
  axis: {
    labelFill: '#8b9dc3',
    gridStroke: 'rgba(255,255,255,0.06)',
    titleFill: '#8b9dc3',
  },
  legend: {
    labelFill: '#8b9dc3',
  },
  label: {
    fill: '#8b9dc3',
  },
}

export function applyChartTheme(chart: Chart): void {
  chart.theme(CHART_THEME_OPTIONS)
  chart.style({
    viewFill: 'transparent',
  })
}
