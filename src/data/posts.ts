import type { Post } from "@/types";

export const posts: Post[] = [
  {
    slug: "building-modern-react-apps",
    title: "构建现代 React 应用的最佳实践",
    description:
      "探索 React 18 时代的开发模式，从组件设计到状态管理，从性能优化到测试策略，全面提升你的 React 开发技能。",
    date: "2024-01-15",
    readTime: 12,
    tags: ["React", "TypeScript", "前端架构"],
    category: "前端开发",
    content: `## 引言

在 React 18 发布之后，React 生态系统发生了显著的变化。本文将探讨如何在现代 React 应用中遵循最佳实践。

## 组件设计原则

### 单一职责原则

每个组件应该只负责一件事。当一个组件变得过于复杂时，考虑将其拆分为更小的子组件。

\`\`\`tsx
// 好的实践：拆分复杂组件
function UserProfile({ user }) {
  return (
    <div className="profile">
      <Avatar user={user} />
      <UserInfo user={user} />
      <UserStats user={user} />
    </div>
  );
}
\`\`\`

### 组合优于继承

React 推崇组合模式，通过 props 传递 UI 元素，而不是使用继承。

## 状态管理策略

### 本地状态优先

尽可能使用 \`useState\` 和 \`useReducer\` 管理本地状态。只有当状态需要在多个组件间共享时，才考虑使用 Context 或全局状态管理库。

\`\`\`tsx
// 本地状态
const [count, setCount] = useState(0);

// 复杂状态
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

### 服务端状态与客户端状态分离

使用 React Query 或 SWR 管理服务端状态，保持客户端状态的简洁。

## 性能优化技巧

1. **使用 React.memo** - 避免不必要的重渲染
2. **使用 useMemo 和 useCallback** - 缓存计算结果和函数
3. **代码分割** - 使用 React.lazy 和 Suspense
4. **虚拟列表** - 处理大量数据时使用

## 测试策略

- 单元测试：测试工具函数和 hooks
- 组件测试：测试组件渲染和交互
- 集成测试：测试用户流程
- E2E 测试：测试完整的用户场景

## 总结

现代 React 开发需要我们在组件设计、状态管理、性能优化和测试等方面都保持高标准。遵循这些最佳实践可以帮助你构建更加健壮、可维护的应用。`,
  },
  {
    slug: "typescript-advanced-patterns",
    title: "TypeScript 高级类型模式实战",
    description:
      "深入理解 TypeScript 的类型系统，掌握条件类型、映射类型、模板字面量类型等高级特性的实际应用场景。",
    date: "2024-01-08",
    readTime: 15,
    tags: ["TypeScript", "类型系统", "前端进阶"],
    category: "前端开发",
    content: `## 为什么需要高级类型

TypeScript 的类型系统非常强大，掌握高级类型可以让你写出更安全、更具表达力的代码。

## 条件类型

条件类型允许我们根据条件选择不同的类型：

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<123>;     // false
\`\`\`

## 映射类型

映射类型可以基于现有类型创建新类型：

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型让字符串操作变得更加强大：

\`\`\`typescript
type Greeting = \`Hello, \${string}!\`;

type HelloWorld = \`Hello, World!\` extends Greeting ? true : false;
\`\`\`

## 实用工具类型

- \`Pick<T, K>\` - 选择 T 的部分属性
- \`Omit<T, K>\` - 排除 T 的部分属性
- \`Extract<T, U>\` - 提取 T 中可以赋值给 U 的类型
- \`Exclude<T, U>\` - 排除 T 中可以赋值给 U 的类型

## 实战案例

### 类型安全的事件处理器

\`\`\`typescript
type EventHandlerMap = {
  click: MouseEvent;
  input: InputEvent;
  submit: SubmitEvent;
};

type EventHandler<K extends keyof EventHandlerMap> = 
  (event: EventHandlerMap[K]) => void;

function on<K extends keyof EventHandlerMap>(
  event: K,
  handler: EventHandler<K>
) {
  // ...
}
\`\`\`

## 总结

高级类型是 TypeScript 的精髓所在，掌握它们可以显著提升代码质量和开发体验。`,
  },
  {
    slug: "nodejs-performance-tuning",
    title: "Node.js 性能调优完全指南",
    description:
      "从事件循环原理到内存管理，从集群部署到缓存策略，全面掌握 Node.js 应用的性能优化技巧。",
    date: "2024-01-02",
    readTime: 18,
    tags: ["Node.js", "性能优化", "后端开发"],
    category: "后端开发",
    content: `## 性能优化概述

Node.js 应用的性能优化是一个系统性工程，需要从多个维度入手。

## 理解事件循环

Node.js 使用单线程事件循环模型，理解其工作原理是优化的基础。

### 事件循环阶段

1. timers - 执行 setTimeout 和 setInterval 的回调
2. pending callbacks - 执行延迟的 I/O 回调
3. idle, prepare - 内部使用
4. poll - 轮询新的 I/O 事件
5. check - setImmediate 回调
6. close callbacks - 关闭回调

## 内存管理

### 避免内存泄漏

\`\`\`javascript
// 错误：全局变量导致内存泄漏
const cache = {};
function addToCache(key, value) {
  cache[key] = value;
}

// 正确：使用 LRU 缓存
const LRU = require('lru-cache');
const cache = new LRU({ max: 500 });
\`\`\`

## 集群模式

利用多核 CPU：

\`\`\`javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // worker 进程
  require('./server');
}
\`\`\`

## 缓存策略

- 内存缓存（LRU）
- Redis 缓存
- CDN 缓存静态资源

## 数据库优化

- 使用连接池
- 优化查询语句
- 添加适当的索引
- 使用读写分离

## 性能监控

- 使用 --prof 参数分析性能
- 使用 clinic.js 进行诊断
- 集成 APM 工具

## 总结

性能优化是一个持续的过程，需要结合监控数据不断迭代改进。`,
  },
  {
    slug: "docker-kubernetes-deploy",
    title: "Docker 与 Kubernetes 部署实战",
    description:
      "从容器化基础到 Kubernetes 编排，学习如何构建可扩展、高可用的微服务部署架构。",
    date: "2023-12-28",
    readTime: 20,
    tags: ["Docker", "Kubernetes", "DevOps"],
    category: "DevOps",
    content: `## 容器化基础

Docker 改变了我们构建、分发和运行应用的方式。

## Dockerfile 最佳实践

\`\`\`dockerfile
# 多阶段构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production
CMD ["node", "dist/server.js"]
\`\`\`

## Kubernetes 核心概念

### Pod

Pod 是 Kubernetes 中最小的部署单元。

### Service

Service 提供了访问 Pod 的稳定网络端点。

### Deployment

Deployment 管理 Pod 的声明式更新。

## Helm 包管理

使用 Helm 简化应用部署：

\`\`\`yaml
apiVersion: v2
name: my-app
description: A Helm chart for My App
type: application
version: 0.1.0
appVersion: "1.0.0"
\`\`\`

## 高可用部署策略

- 多副本部署
- 滚动更新
- 健康检查
- 自动扩缩容

## 监控与日志

- Prometheus + Grafana
- ELK Stack
- 分布式追踪

## 总结

Kubernetes 是容器编排的事实标准，掌握它对于现代 DevOps 至关重要。`,
  },
  {
    slug: "css-grid-layout-mastery",
    title: "CSS Grid 布局完全掌握",
    description:
      "系统学习 CSS Grid 布局，从基础概念到高级技巧，打造复杂的响应式布局从未如此简单。",
    date: "2023-12-20",
    readTime: 10,
    tags: ["CSS", "布局", "前端基础"],
    category: "前端开发",
    content: `## CSS Grid 简介

CSS Grid 是一个强大的二维布局系统，可以同时处理行和列。

## 基础概念

### Grid Container

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
\`\`\`

### Grid Item

\`\`\`css
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
\`\`\`

## 常用函数

### repeat()

重复定义轨道：

\`\`\`css
grid-template-columns: repeat(4, 1fr);
\`\`\`

### minmax()

定义最小和最大尺寸：

\`\`\`css
grid-template-columns: minmax(200px, 1fr) 2fr;
\`\`\`

## 响应式布局

使用 auto-fit 和 auto-fill：

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## 实战案例

### 仪表盘布局

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  min-height: 100vh;
}
\`\`\`

## 总结

CSS Grid 是现代 CSS 布局的基石，配合 Flexbox 可以应对绝大多数布局场景。`,
  },
  {
    slug: "graphql-api-design",
    title: "GraphQL API 设计最佳实践",
    description:
      "深入探讨 GraphQL  schema 设计、查询优化、错误处理和安全策略，构建优雅的 API 层。",
    date: "2023-12-15",
    readTime: 14,
    tags: ["GraphQL", "API设计", "后端架构"],
    category: "后端开发",
    content: `## GraphQL 简介

GraphQL 是一种用于 API 的查询语言，提供了比 REST 更灵活的数据获取方式。

## Schema 设计原则

### 清晰的类型定义

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}
\`\`\`

### 分页设计

推荐使用游标分页：

\`\`\`graphql
type PostConnection {
  edges: [PostEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type PostEdge {
  node: Post!
  cursor: String!
}
\`\`\`

## 查询优化

### DataLoader

使用 DataLoader 解决 N+1 查询问题：

\`\`\`javascript
const userLoader = new DataLoader(async (ids) => {
  const users = await User.findByIds(ids);
  return ids.map(id => users.find(u => u.id === id));
});
\`\`\`

## 错误处理

### 统一错误格式

\`\`\`graphql
type Error {
  message: String!
  code: String!
  field: String
}
\`\`\`

## 安全策略

- 认证与授权
- 查询复杂度限制
- 速率限制
- 输入验证

## 性能优化

- 查询缓存
-  persisted queries
- 批量加载
- 字段级别的解析器优化

## 总结

好的 GraphQL API 设计需要在灵活性和性能之间找到平衡。`,
  },
];
