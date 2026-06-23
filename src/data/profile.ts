import type { Profile } from "@/types";

export const profile: Profile = {
  name: "STEMirror",
  title: "全栈开发工程师 & 系统编程爱好者",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=STEMirror&backgroundColor=0d1117",
  bio: "热爱技术的全栈开发者，穿梭于 Web 应用与系统编程之间。从前端交互到底层内核，都有我的探索足迹。喜欢研究 Linux 内核、编译器原理和高性能架构，也享受用 React 打造精致的用户界面。代码是诗，系统是画。",
  social: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    email: "hello@stemirror.dev",
    linkedin: "https://linkedin.com",
  },
  skills: [
    { name: "React", level: 95, category: "前端" },
    { name: "TypeScript", level: 90, category: "前端" },
    { name: "Vue.js", level: 85, category: "前端" },
    { name: "Next.js", level: 88, category: "前端" },
    { name: "Node.js", level: 85, category: "后端" },
    { name: "Go", level: 75, category: "后端" },
    { name: "PostgreSQL", level: 80, category: "数据库" },
    { name: "Redis", level: 75, category: "数据库" },
    { name: "C 语言", level: 88, category: "系统编程" },
    { name: "Linux", level: 90, category: "系统编程" },
    { name: "操作系统", level: 80, category: "系统编程" },
    { name: "Docker", level: 82, category: "DevOps" },
    { name: "Kubernetes", level: 70, category: "DevOps" },
  ],
  experiences: [
    {
      company: "某科技公司",
      position: "高级全栈工程师",
      period: "2022 - 至今",
      description:
        "负责公司核心产品的前后端架构设计与开发，主导技术选型和代码规范制定。同时参与底层基础设施优化，用 C 语言实现高性能网络库，显著提升系统吞吐量。",
    },
    {
      company: "某互联网公司",
      position: "全栈开发工程师",
      period: "2020 - 2022",
      description:
        "参与多个 B 端和 C 端产品的全栈开发，负责微服务架构设计和 Linux 服务器运维。用 Go 重构核心服务，性能提升 300%。",
    },
    {
      company: "某创业公司",
      position: "前端开发工程师",
      period: "2018 - 2020",
      description:
        "负责公司官网和管理后台的前端开发，参与产品迭代和技术优化。业余时间研究 Linux 内核和系统编程，开启了底层技术探索之路。",
    },
  ],
};
