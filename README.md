# dataVersion

企业数据监控大屏 —— 基于 Vue 3 + AntV G2 的数据可视化解决方案。

## 预览

深蓝科技风设计，16:9 全屏铺满，包含指标卡片、趋势折线图、区域柱状图、品类环图、目标完成率进度条，支持 Mock 数据驱动，一键切换真实 API。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3 Composition API + TypeScript |
| 构建 | Vite 6 |
| 图表 | AntV G2 5 |
| 状态管理 | Pinia 2 |
| HTTP | axios |
| Mock | MSW (Mock Service Worker) 2 |
| 日志 | loglevel |
| CSS | UnoCSS (原子化) |
| 测试 | Vitest + Vue Test Utils |
| 代码质量 | ESLint + Prettier |

## 项目结构

```
src/
├── main.ts                     # 入口：注册 MSW → 挂载 App
├── App.vue                     # 根组件：大屏布局容器
├── env.d.ts                    # TS 环境声明
├── api/                        # HTTP 层
│   ├── request.ts              # axios 实例 + 拦截器
│   ├── useApi.ts               # Mock/API 切换
│   └── modules/                # 按模块拆分接口
├── mocks/                      # MSW 配置
│   ├── handlers.ts             # 请求拦截聚合
│   ├── browser.ts              # 浏览器 worker
│   ├── server.ts               # Node 测试 Server
│   └── data/                   # Mock 数据生成
├── stores/                     # Pinia
│   ├── dashboard.ts            # 大屏数据 store
│   └── settings.ts             # 设置 store
├── components/
│   ├── layout/                 # 布局组件
│   ├── metrics/                # 指标卡片
│   ├── charts/                 # 图表组件
│   └── common/                 # 通用组件
├── composables/                # 组合式函数
├── utils/                      # 工具函数
├── types/                      # TS 类型定义
└── __tests__/                  # 测试文件
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（Mock 模式）
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test

# 代码检查
npm run lint
```

## Mock / API 切换

项目默认使用 MSW 拦截请求返回 Mock 数据。切换方式：

- **页面切换**：点击 Header 右侧 `[Mock 模式]` 按钮
- **环境变量**：修改 `.env` 中 `VITE_USE_MOCK=false`

切换到 API 模式后，请求将发送到 Vite 代理的 `/api` 路径，可在 `vite.config.ts` 中配置后端地址。

## 功能特性

- **指标卡片**：4 个核心指标，数字滚动递增动画，涨跌绿红色区分
- **近30天销售趋势**：双线平滑折线图 + 面积渐变
- **区域销售**：6 地区降序柱状图
- **品类占比**：纯 SVG 环图 + 自定义图例
- **目标完成率**：5 项指标进度条，红黄绿渐变
- **自动刷新**：30 秒轮询，页面不可见时自动暂停
- **骨架屏**：首次加载脉冲动画骨架屏
- **错误兜底**：ErrorBoundary + 重试按钮
- **日志系统**：`[DataVue][LEVEL]` 格式分级输出

## 开发规范

- 组件职责单一：数据获取在 store，渲染在组件
- 图表组件为纯展示组件，通过 props 接收数据
- TypeScript 严格模式，所有函数参数和返回值必须有类型
- 日志输出统一走 `src/utils/logger.ts`，禁止裸 `console.log`

## 开源协议

本项目基于 [MIT License](LICENSE) 开源。
