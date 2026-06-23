import type { Profile } from "@/types";

export const profile: Profile = {
  name: "张小明",
  title: "全栈开发工程师",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=developer&backgroundColor=0d1117",
  bio: "热爱编程的全栈开发者，专注于 Web 技术栈。喜欢分享技术心得，相信好的代码应该像诗一样优雅。业余时间喜欢折腾各种开源项目，享受从零到一构建产品的过程。",
  social: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    email: "hello@example.com",
    linkedin: "https://linkedin.com",
  },
  skills: [
    { name: "React", level: 95, category: "前端" },
    { name: "TypeScript", level: 90, category: "前端" },
    { name: "Vue.js", level: 85, category: "前端" },
    { name: "Next.js", level: 88, category: "前端" },
    { name: "Node.js", level: 85, category: "后端" },
    { name: "Go", level: 70, category: "后端" },
    { name: "PostgreSQL", level: 80, category: "数据库" },
    { name: "Redis", level: 75, category: "数据库" },
    { name: "Docker", level: 82, category: "DevOps" },
    { name: "Kubernetes", level: 70, category: "DevOps" },
  ],
  experiences: [
    {
      company: "某科技公司",
      position: "高级前端工程师",
      period: "2022 - 至今",
      description:
        "负责公司核心产品的前端架构设计与开发，主导技术选型和代码规范制定，带领团队完成多个重要项目。",
    },
    {
      company: "某互联网公司",
      position: "全栈开发工程师",
      period: "2020 - 2022",
      description:
        "参与多个 B 端和 C 端产品的全栈开发，包括需求分析、架构设计、编码实现和上线部署。",
    },
    {
      company: "某创业公司",
      position: "前端开发工程师",
      period: "2018 - 2020",
      description:
        "负责公司官网和管理后台的前端开发，参与产品迭代和技术优化，推动前端工程化建设。",
    },
  ],
};
