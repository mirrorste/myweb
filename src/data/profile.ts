import type { Profile } from "@/types";

export const profile: Profile = {
  name: "STEMirror",
  title: "通信设备软件开发工程师 & 系统编程爱好者",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=STEMirror&backgroundColor=0d1117",
  bio: "通信设备软件开发工程师，专注于网络通信与系统编程。从底层驱动到上层应用，在通信设备、网络协议、汇聚分流领域深耕多年。热爱 C 语言与 Linux 内核，也享受用技术解决实际问题的过程。代码即武器，网络即战场。",
  social: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    email: "hello@stemirror.dev",
    linkedin: "https://linkedin.com",
  },
  skills: [
    { name: "C 语言", level: 95, category: "网络通信" },
    { name: "网络协议", level: 92, category: "网络通信" },
    { name: "TCP/IP", level: 90, category: "网络通信" },
    { name: "Linux", level: 90, category: "系统编程" },
    { name: "操作系统", level: 82, category: "系统编程" },
    { name: "数据结构与算法", level: 88, category: "系统编程" },
    { name: "React", level: 85, category: "前端" },
    { name: "TypeScript", level: 80, category: "前端" },
    { name: "Go", level: 78, category: "后端" },
    { name: "Python", level: 75, category: "后端" },
    { name: "Docker", level: 72, category: "DevOps" },
    { name: "Git", level: 85, category: "DevOps" },
  ],
  experiences: [
    {
      company: "某通信设备公司",
      position: "高级软件开发工程师",
      period: "2021 - 至今",
      description:
        "负责通信设备核心软件的开发与优化，深耕汇聚分流设备、网络协议栈、高性能数据包处理领域。主导多个关键项目的架构设计与性能优化，显著提升设备吞吐量与稳定性。",
    },
    {
      company: "某网络科技公司",
      position: "网络软件开发工程师",
      period: "2019 - 2021",
      description:
        "参与网络安全产品开发，负责协议解析引擎和流量分析模块的设计与实现。深入研究 TCP/IP 协议栈，优化数据包处理性能，支撑万兆线速转发。",
    },
    {
      company: "某创业公司",
      position: "嵌入式开发工程师",
      period: "2017 - 2019",
      description:
        "负责嵌入式网络设备的软件开发，涉及驱动开发、协议栈移植和应用层功能实现。在资源受限环境下实现高效的网络通信功能，积累了丰富的底层开发经验。",
    },
  ],
};
