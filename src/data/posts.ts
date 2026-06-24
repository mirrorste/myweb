import type { Post } from "@/types";

export const posts: Post[] = [
  {
    slug: "network-aggregation-diversion-deep-dive",
    title: "汇聚分流设备核心技术深度解析",
    description:
      "深入探讨通信网络中汇聚分流设备的工作原理、关键技术与实现方案，从硬件架构到软件设计，全面剖析高性能数据包处理的奥秘。",
    date: "2026-05-15",
    readTime: 25,
    tags: ["汇聚分流", "网络通信", "数据包处理"],
    category: "网络通信",
    content: `## 什么是汇聚分流设备

在现代通信网络中，汇聚分流设备（Aggregation & Diversion Device）扮演着至关重要的角色。它处于网络的关键节点，负责将海量网络流量进行汇聚、识别和分发。

## 核心功能

### 流量汇聚

将多条链路的流量汇聚到一起进行统一处理：

\`\`\`
                      ┌─────────────┐
  链路1 ─────────────▶             │
  链路2 ─────────────▶  汇聚分流设备  ├─────▶ 分析/处理
  链路3 ─────────────▶             │
  ...                └─────────────┘
\`\`\`

### 流量分流

根据五元组（源IP、目的IP、源端口、目的端口、协议）或应用特征将流量分发到不同的处理通道。

## 硬件架构

### 多核处理器架构

现代汇聚分流设备通常采用多核网络处理器（NP）或多核CPU + 智能网卡的架构：

| 组件 | 作用 |
|------|------|
| 物理接口 | 10G/40G/100G 以太网接口 |
| 包处理引擎 | 高速数据包解析与转发 |
| TCAM | 快速路由查找与匹配 |
| DDR4 | 大容量流表存储 |

### DPDK 加速

使用 DPDK（Data Plane Development Kit）绕过内核协议栈，实现用户态高性能数据包处理：

\`\`\`c
// DPDK 收包处理循环
while (1) {
    struct rte_mbuf *bufs[BURST_SIZE];
    const uint16_t nb_rx = rte_eth_rx_burst(port, 0, bufs, BURST_SIZE);
    
    if (unlikely(nb_rx == 0))
        continue;
    
    // 处理数据包
    for (int i = 0; i < nb_rx; i++) {
        process_packet(bufs[i]);
    }
    
    // 发送
    rte_eth_tx_burst(out_port, 0, bufs, nb_rx);
}
\`\`\`

## 关键技术

### 1. 五元组匹配

基于哈希表的快速流表查找，支持百万级并发流：

\`\`\`c
struct flow_key {
    uint32_t src_ip;
    uint32_t dst_ip;
    uint16_t src_port;
    uint16_t dst_port;
    uint8_t  protocol;
};

// 流表查找
struct flow_entry *flow_lookup(struct flow_key *key) {
    uint32_t hash = jhash(key, sizeof(*key), 0);
    return flow_table[hash % FLOW_TABLE_SIZE];
}
\`\`\`

### 2. 负载均衡

基于对称哈希（Symmetric Hash）确保同一条流的双向数据包进入同一处理核，避免乱序问题。

### 3. 零拷贝技术

通过内存池和指针传递，避免数据包在处理过程中的内存拷贝，大幅提升性能。

## 性能指标

| 指标 | 说明 | 典型值 |
|------|------|--------|
| 吞吐量 | 设备处理能力 | 100Gbps+ |
| 包转发率 | 每秒处理包数 | 148Mpps（64字节包） |
| 延迟 | 数据包经过设备的时间 | < 10μs |
| 并发流数 | 同时维护的流表数量 | 千万级 |

## 典型应用场景

- **运营商网络**：移动核心网、宽带接入网
- **数据中心**：流量镜像、安全防护
- **企业网络**：上网行为管理、流量监控
- **安全领域**：入侵检测、DDoS 防护

## 小结

汇聚分流设备是现代通信网络的重要基础设施。掌握其核心技术，不仅能提升系统编程能力，更能深入理解网络世界的运行机制。在后续文章中，我们将继续深入探讨更多具体实现细节。
`,
  },
  {
    slug: "tcp-ip-protocol-stack-practice",
    title: "TCP/IP 协议栈深度剖析与实践",
    description:
      "从底层原理到实现细节，全面拆解 TCP/IP 协议栈。结合通信设备开发实践，深入理解三次握手、拥塞控制、滑动窗口等核心机制。",
    date: "2026-04-28",
    readTime: 28,
    tags: ["TCP/IP", "网络协议", "协议栈"],
    category: "网络通信",
    content: `## 前言

TCP/IP 协议栈是互联网的基石。作为通信设备开发者，深入理解协议栈原理不仅是基本功，更是性能调优和问题排查的关键。

## TCP/IP 模型回顾

\`\`\`
┌─────────────────────────────────┐
│  应用层  HTTP FTP DNS Telnet...  │
├─────────────────────────────────┤
│  传输层  TCP  UDP                │
├─────────────────────────────────┤
│  网络层  IP  ICMP  ARP           │
├─────────────────────────────────┤
│  链路层  Ethernet  PPP ...        │
└─────────────────────────────────┘
\`\`\`

## TCP 核心机制深度解析

### 三次握手

\`\`\`
客户端                           服务端
   │          SYN (seq=x)          │
   ├──────────────────────────────▶│
   │                               │
   │     SYN+ACK (seq=y, ack=x+1)  │
   │◀──────────────────────────────┤
   │                               │
   │     ACK (ack=y+1)             │
   ├──────────────────────────────▶│
   │                               │
\`\`\`

**为什么是三次？** 因为要确认双方的发送和接收能力都正常：
- 第一次：客户端发送 → 服务端知道客户端能发
- 第二次：服务端回 → 客户端知道服务端能收能发
- 第三次：客户端回 → 服务端知道客户端能收

### 四次挥手

\`\`\`
客户端                           服务端
   │          FIN (seq=u)          │
   ├──────────────────────────────▶│
   │         ACK (ack=u+1)         │
   │◀──────────────────────────────┤
   │                               │
   │          FIN (seq=w)          │
   │◀──────────────────────────────┤
   │                               │
   │         ACK (ack=w+1)         │
   ├──────────────────────────────▶│
   │                               │
\`\`\`

### 滑动窗口

滑动窗口是 TCP 实现流量控制和可靠传输的核心机制：

\`\`\`
发送缓冲区：
┌───────────────────────────────────────┐
│ 已发送  │ 已发送  │      可发送       │ 不能发送
│ 已确认  │ 未确认  │                    │
└───────────────────────────────────────┘
         ↑         ↑                    ↑
        SND.UNA  SND.NXT          SND.UNA+SND.WND
\`\`\`

### 拥塞控制

TCP 拥塞控制包含四个核心算法：

1. **慢启动**（Slow Start）：指数增长
2. **拥塞避免**（Congestion Avoidance）：线性增长
3. **快重传**（Fast Retransmit）：收到3个重复ACK立即重传
4. **快恢复**（Fast Recovery）：避免慢启动导致的骤降

\`\`\`
cwnd
  │    慢启动           拥塞避免
  │    /                /
  │   /                /
  │  /                /
  │ /                /
  │/________________/
  │        ssthresh
  └──────────────────── 时间
\`\`\`

## UDP 协议

UDP 虽然简单，但在很多场景下不可或缺：

| 特性 | TCP | UDP |
|------|-----|-----|
| 连接 | 面向连接 | 无连接 |
| 可靠性 | 可靠 | 不可靠 |
| 顺序 | 保证顺序 | 不保证 |
| 流量控制 | 有 | 无 |
| 拥塞控制 | 有 | 无 |
| 头部开销 | 20-60 字节 | 8 字节 |
| 适用场景 | 文件传输、Web | 实时音视频、游戏 |

## 在通信设备中的实践

### 协议解析加速

在高性能网络设备中，协议解析通常用有限状态机（FSM）实现：

\`\`\`c
enum parse_state {
    PARSE_ETH,
    PARSE_IPV4,
    PARSE_IPV6,
    PARSE_TCP,
    PARSE_UDP,
    PARSE_PAYLOAD,
    PARSE_DONE,
    PARSE_ERROR
};

int parse_packet(struct packet *pkt) {
    enum parse_state state = PARSE_ETH;
    uint8_t *ptr = pkt->data;
    int len = pkt->len;
    
    while (state != PARSE_DONE && state != PARSE_ERROR) {
        switch (state) {
        case PARSE_ETH:
            state = parse_eth_hdr(&ptr, &len, pkt);
            break;
        case PARSE_IPV4:
            state = parse_ipv4_hdr(&ptr, &len, pkt);
            break;
        // ...更多协议
        }
    }
    return state == PARSE_DONE ? 0 : -1;
}
\`\`\`

### TCP 状态跟踪

在汇聚分流设备中，经常需要跟踪 TCP 连接状态来做深度包检测（DPI）。

## 常见问题排查

### 连接建立失败
- 检查 SYN 包是否到达
- 确认防火墙规则
- 查看 backlog 是否满

### 性能瓶颈
- 滑动窗口是否太小
- 是否有丢包导致重传
- 拥塞控制算法是否适配

### 连接异常断开
- 抓包看是否有 RST
- 检查 keepalive 配置
- 查看是否超时

## 小结

TCP/IP 协议栈博大精深。只有深入理解每一个细节，才能在通信设备开发中游刃有余。在实际工作中，建议多抓包、多分析，将理论与实践结合起来。
`,
  },
  {
    slug: "high-performance-packet-processing",
    title: "高性能数据包处理：从内核到DPDK",
    description:
      "从传统的内核协议栈到 DPDK 用户态驱动，探索高性能数据包处理的演进之路。结合通信设备开发经验，分享性能调优的实用技巧。",
    date: "2026-03-20",
    readTime: 22,
    tags: ["DPDK", "性能优化", "数据包处理", "C语言"],
    category: "网络通信",
    content: `## 为什么需要高性能数据包处理

随着网络带宽从 1G 发展到 10G、40G 甚至 100G，传统的内核协议栈已经难以满足线速处理的需求。

## 传统内核处理的瓶颈

\`\`\`
用户空间                    内核空间
    │                          │
    │   recv()/send()         │   系统调用开销
    │◀───────────────────────▶│
    │                          │
    │                          │   协议栈处理
    │                          │   （TCP/IP 栈）
    │                          │
    │                          │   网卡驱动
    │                          │◀────── 网卡中断
    └──────────────────────────┘
\`\`\`

### 主要开销

1. **系统调用**：用户态到内核态切换
2. **中断**：每个数据包触发一次中断
3. **内存拷贝**：内核态到用户态的拷贝
4. **协议栈**：通用协议栈的额外开销

## DPDK 核心思想

DPDK 通过以下技术实现高性能：

### 1. 用户态驱动

绕过内核，直接在用户态操作网卡寄存器：

\`\`\`
用户空间
    │
    ├── 应用程序
    │      │
    │      ▼
    └── DPDK PMD（Poll Mode Driver）
           │
           ▼
        网卡硬件
\`\`\`

### 2. 轮询模式

用轮询替代中断，避免中断上下文切换开销：

\`\`\`c
// 传统中断方式：等待中断触发
// DPDK 轮询方式：不断查询
while (1) {
    uint16_t nb_rx = rte_eth_rx_burst(port, q, bufs, BURST_SIZE);
    if (nb_rx > 0) {
        process_burst(bufs, nb_rx);
    }
}
\`\`\`

### 3. 大页内存

使用 HugePage 减少 TLB miss：

| 页面大小 | TLB 覆盖范围（512项） |
|----------|----------------------|
| 4KB      | 2MB                  |
| 2MB      | 1GB                  |
| 1GB      | 512GB                |

### 4. 内存池

预分配内存池，避免频繁的 malloc/free：

\`\`\`c
// 创建内存池
struct rte_mempool *mbuf_pool = rte_pktmbuf_pool_create(
    "mbuf_pool",
    NB_MBUF,          // 元素数量
    MEMPOOL_CACHE_SIZE, // 每核缓存大小
    0,
    RTE_MBUF_DEFAULT_BUF_SIZE,
    rte_socket_id()
);

// 从池中分配
struct rte_mbuf *m = rte_pktmbuf_alloc(mbuf_pool);

// 归还到池中
rte_pktmbuf_free(m);
\`\`\`

## 性能优化技巧

### 1. CPU 亲和性

将收发包线程绑定到特定 CPU 核，避免调度开销：

\`\`\`c
// 设置 CPU 亲和性
cpu_set_t cpuset;
CPU_ZERO(&cpuset);
CPU_SET(core_id, &cpuset);
pthread_setaffinity_np(pthread_self(), sizeof(cpu_set_t), &cpuset);
\`\`\`

### 2. 批量处理

尽可能批量收发包，摊平函数调用开销：

\`\`\`c
// 推荐：批量处理
#define BURST_SIZE 32

while (1) {
    struct rte_mbuf *bufs[BURST_SIZE];
    uint16_t nb_rx = rte_eth_rx_burst(port, q, bufs, BURST_SIZE);
    
    // 批量处理
    process_packets(bufs, nb_rx);
    
    // 批量发送
    rte_eth_tx_burst(out_port, q, bufs, nb_rx);
}
\`\`\`

### 3. 无锁队列

使用 DPDK 的无锁环形队列（rte_ring）进行核间通信：

\`\`\`c
// 创建无锁环形队列
struct rte_ring *ring = rte_ring_create(
    "packet_ring",
    RING_SIZE,
    rte_socket_id(),
    RING_F_SP_ENQ | RING_F_SC_DEQ  // 单生产者单消费者
);

// 入队
rte_ring_enqueue_burst(ring, (void **)bufs, nb_rx, NULL);

// 出队
uint16_t nb_deq = rte_ring_dequeue_burst(ring, (void **)bufs, BURST_SIZE, NULL);
\`\`\`

### 4. Cache 优化

- 合理布局数据结构，减少 cache miss
- 避免伪共享（False Sharing）：每个核的数据放不同 cache line

\`\`\`c
// 避免伪共享：每个统计变量占一个 cache line
struct per_core_stats {
    uint64_t rx_packets;
    uint64_t tx_packets;
    uint64_t rx_bytes;
    uint64_t tx_bytes;
    char padding[64 - 4 * sizeof(uint64_t)]; // 填充到64字节
} __rte_cache_aligned;
\`\`\`

## 典型架构

### 多核流水线架构

\`\`\`
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ RX  │───▶│ 解析 │───▶│ 处理 │───▶│ TX  │
│ 核  │    │ 核  │    │ 核  │    │ 核  │
└─────┘    └─────┘    └─────┘    └─────┘
             无锁队列      无锁队列
\`\`\`

### Run-to-Completion 架构

每个核处理完整的数据包生命周期：

\`\`\`
  核0: RX → 解析 → 处理 → TX
  核1: RX → 解析 → 处理 → TX
  核2: RX → 解析 → 处理 → TX
  ...
\`\`\`

## 性能测试方法

### 关键指标

- **吞吐量**（Throughput）：bps 或 pps
- **延迟**（Latency）：数据包处理时间
- **丢包率**（Drop Rate）：过载时的丢包比例
- **CPU 利用率**（CPU Utilization）

### 常用工具

- **TRex**：DPDK 性能测试工具
- **pktgen-dpdk**：DPDK 官方发包工具
- **iperf**：TCP/UDP 性能测试
- **tcpdump**：抓包分析

## 小结

高性能数据包处理是通信设备开发的核心技能。从理解内核协议栈的瓶颈，到掌握 DPDK 的优化技巧，需要持续的学习和实践。希望这篇文章能为你打开一扇新的大门。
`,
  },
  {
    slug: "linux-kernel-introduction",
    title: "Linux 内核初探：从用户空间到内核空间",
    description:
      "带你深入理解 Linux 内核的基本架构，学习系统调用、进程管理、内存管理等核心概念，建立操作系统的全局视野。",
    date: "2024-01-20",
    readTime: 22,
    tags: ["Linux", "内核", "操作系统"],
    category: "系统编程",
    content: `## 为什么要学习 Linux 内核

作为开发者，我们每天都在与 Linux 打交道。但你是否真正理解操作系统内核是如何工作的？本文将带你一探 Linux 内核的奥秘。

## Linux 内核架构概览

Linux 内核采用宏内核架构，主要由以下子系统组成：

- **进程调度**（Process Scheduler）
- **内存管理**（Memory Management）
- **虚拟文件系统**（Virtual File System）
- **网络栈**（Network Stack）
- **设备驱动**（Device Drivers）

### 用户空间与内核空间

\`\`\`
┌─────────────────────────────────────────┐
│              用户空间 (User Space)        │
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │ 应用  │  │ 库   │  │ Shell │          │
│  └───┬──┘  └───┬──┘  └───┬──┘          │
└──────┼─────────┼─────────┼──────────────┘
       │         │         │ 系统调用 (syscall)
┌──────▼─────────▼─────────▼──────────────┐
│              内核空间 (Kernel Space)      │
│  ┌──────────────────────────────────┐   │
│  │          Linux 内核               │   │
│  │  进程管理 │ 内存管理 │ 文件系统    │   │
│  │  网络栈  │ 设备驱动 │ ...        │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
          硬件 (Hardware)
\`\`\`

## 系统调用深入解析

系统调用是用户空间与内核空间交互的桥梁。

### 常用系统调用

\`\`\`c
#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>

int main() {
    // open 系统调用 - 打开文件
    int fd = open("example.txt", O_RDONLY);
    if (fd == -1) {
        perror("open failed");
        return 1;
    }

    // read 系统调用 - 读取文件
    char buf[1024];
    ssize_t n = read(fd, buf, sizeof(buf));
    if (n == -1) {
        perror("read failed");
        close(fd);
        return 1;
    }

    // write 系统调用 - 写入标准输出
    write(STDOUT_FILENO, buf, n);

    // close 系统调用 - 关闭文件
    close(fd);
    return 0;
}
\`\`\`

## 进程管理

### 进程描述符 task_struct

Linux 用 task_struct 结构体描述一个进程：

\`\`\`c
struct task_struct {
    volatile long state;    /* 进程状态 */
    void *stack;            /* 进程栈 */
    pid_t pid;              /* 进程 ID */
    pid_t tgid;             /* 线程组 ID */
    struct mm_struct *mm;   /* 内存管理 */
    struct files_struct *files; /* 打开的文件 */
    struct task_struct *parent; /* 父进程 */
    /* ... 还有很多字段 ... */
};
\`\`\`

### 进程状态

- **TASK_RUNNING** - 运行或就绪
- **TASK_INTERRUPTIBLE** - 可中断睡眠
- **TASK_UNINTERRUPTIBLE** - 不可中断睡眠
- **TASK_STOPPED** - 停止
- **TASK_ZOMBIE** - 僵尸进程

## 内存管理

### 虚拟内存机制

Linux 使用虚拟内存机制，每个进程都有独立的地址空间：

\`\`\`
进程地址空间布局 (x86_64):

0xFFFFFFFFFFFFFFFF  ──┐
                      │  内核空间 (128TB)
0xFFFF800000000000  ──┘
                      │
                      │  ...
                      │
0x00007FFFFFFFFFFF  ──┐
                      │  用户空间 (128TB)
                      │  - 栈 (向下增长)
                      │  - mmap 区域
                      │  - 堆 (向上增长)
                      │  - BSS 段
                      │  - 数据段
                      │  - 代码段
0x0000000000400000  ──┤  程序起始地址
0x0000000000000000  ──┘
\`\`\`

## 实验：追踪系统调用

使用 strace 工具追踪程序的系统调用：

\`\`\`bash
# 追踪 ls 命令的系统调用
strace ls -l

# 统计系统调用次数
strace -c ls -l

# 只追踪 open 系统调用
strace -e open ls -l
\`\`\`

## 总结

Linux 内核是一个庞大而精密的系统。理解内核工作原理可以帮助我们：

1. 写出更高性能的应用程序
2. 更快地定位和解决问题
3. 深入理解操作系统的设计思想

后续文章将继续深入各个子系统的实现细节。`,
  },
  {
    slug: "c-pointer-memory-management",
    title: "C 语言指针与内存管理深度解析",
    description:
      "从指针基础到内存模型，从栈与堆的区别到内存泄漏排查，全面掌握 C 语言的核心精髓。",
    date: "2024-01-18",
    readTime: 18,
    tags: ["C语言", "指针", "内存管理"],
    category: "系统编程",
    content: `## 指针：C 语言的灵魂

指针是 C 语言最强大也最危险的特性。理解指针，才能真正理解 C 语言。

## 指针基础

### 什么是指针

指针是一个变量，它存储的是另一个变量的内存地址。

\`\`\`c
#include <stdio.h>

int main() {
    int x = 42;
    int *p = &x;  // p 指向 x 的地址

    printf("x 的值: %d\\n", x);
    printf("x 的地址: %p\\n", (void*)&x);
    printf("p 的值: %p\\n", (void*)p);
    printf("p 指向的值: %d\\n", *p);

    *p = 100;  // 通过指针修改 x 的值
    printf("修改后 x 的值: %d\\n", x);

    return 0;
}
\`\`\`

输出：
\`\`\`
x 的值: 42
x 的地址: 0x7ffdabc123456
p 的值: 0x7ffdabc123456
p 指向的值: 42
修改后 x 的值: 100
\`\`\`

## 指针与数组

### 数组名退化为指针

在大多数情况下，数组名会隐式转换为指向数组首元素的指针：

\`\`\`c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};

    // 以下两种写法等价
    printf("arr[2] = %d\\n", arr[2]);
    printf("*(arr + 2) = %d\\n", *(arr + 2));

    // 指针运算
    int *p = arr;
    printf("*p = %d\\n", *p);      // 1
    printf("*(p+1) = %d\\n", *(p+1));  // 2
    printf("p[2] = %d\\n", p[2]);    // 3

    return 0;
}
\`\`\`

### 二维数组与指针

\`\`\`c
int matrix[3][4];  // 3 行 4 列的二维数组

// matrix 是指向包含 4 个 int 的数组的指针
int (*row)[4] = matrix;

// 访问第 i 行第 j 列
// 等价写法：matrix[i][j] = *(*(matrix + i) + j)
\`\`\`

## 内存模型

### 程序内存布局

\`\`\`
高地址  ┌──────────────────────────┐
        │       命令行参数/环境      │
        ├──────────────────────────┤
        │         栈 (Stack)        │  ←─ 向下增长
        │            ↓             │
        │                           │
        │                           │
        │            ↑             │
        │         堆 (Heap)         │  ←─ 向上增长
        ├──────────────────────────┤
        │    BSS 段 (未初始化数据)    │
        ├──────────────────────────┤
        │    数据段 (已初始化数据)    │
        ├──────────────────────────┤
        │    代码段 (Text)          │
低地址  └──────────────────────────┘
\`\`\`

### 栈内存

栈内存由编译器自动管理，用于存储局部变量和函数调用信息：

\`\`\`c
#include <stdio.h>

void func(int n) {
    int local = n * 2;  // 局部变量在栈上
    printf("local = %d\\n", local);
}  // func 返回时，local 自动释放

int main() {
    func(42);
    return 0;
}
\`\`\`

### 堆内存

堆内存需要手动管理，通过 malloc/free 分配和释放：

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // 分配内存
    char *str = (char*)malloc(100 * sizeof(char));
    if (str == NULL) {
        perror("malloc failed");
        return 1;
    }

    // 使用内存
    strcpy(str, "Hello, Memory!");
    printf("%s\\n", str);

    // 重新分配内存
    char *new_str = (char*)realloc(str, 200 * sizeof(char));
    if (new_str == NULL) {
        free(str);  // 注意：realloc 失败时原指针仍然有效
        perror("realloc failed");
        return 1;
    }
    str = new_str;

    // 释放内存
    free(str);
    str = NULL;  // 避免悬空指针

    return 0;
}
\`\`\`

## 常见内存问题

### 内存泄漏

分配了内存但没有释放：

\`\`\`c
// 错误示例：内存泄漏
void leak_memory() {
    int *p = (int*)malloc(sizeof(int));
    *p = 42;
    // 函数返回时 p 被销毁，但内存没有释放
}
\`\`\`

### 悬空指针

指向已释放内存的指针：

\`\`\`c
// 错误示例：悬空指针
int *dangling() {
    int local = 42;
    return &local;  // 返回局部变量地址！
}  // local 已经被销毁
\`\`\`

### 重复释放

\`\`\`c
// 错误示例：double free
int *p = (int*)malloc(sizeof(int));
free(p);
free(p);  // 错误！重复释放
\`\`\`

### 越界访问

\`\`\`c
// 错误示例：缓冲区溢出
char buf[10];
buf[10] = 'a';  // 越界！
\`\`\`

## 调试工具

### Valgrind

使用 Valgrind 检测内存问题：

\`\`\`bash
# 编译时加上调试信息
gcc -g program.c -o program

# 使用 valgrind 检测内存泄漏
valgrind --leak-check=full ./program
\`\`\`

### AddressSanitizer

使用 GCC/Clang 的 AddressSanitizer：

\`\`\`bash
# 编译时启用 ASan
gcc -fsanitize=address -g program.c -o program

# 运行程序，会自动检测内存问题
./program
\`\`\`

## 总结

指针和内存管理是 C 语言的核心难点，也是 C 语言强大性能的来源。掌握它们需要：

1. 理解内存模型和地址空间
2. 养成良好的编程习惯
3. 善用调试工具
4. 多写多练，积累经验`,
  },
  {
    slug: "linux-performance-tuning",
    title: "Linux 性能调优实战指南",
    description:
      "从 CPU、内存、磁盘 I/O 到网络，全面掌握 Linux 系统性能分析与优化方法论，打造高性能服务器。",
    date: "2024-01-16",
    readTime: 20,
    tags: ["Linux", "性能优化", "运维"],
    category: "系统编程",
    content: `## 性能调优方法论

性能优化是一个系统性工程，需要科学的方法论指导，而不是盲目猜测。

### 性能优化步骤

1. **测量** - 使用工具量化性能瓶颈
2. **分析** - 定位性能瓶颈所在
3. **假设** - 提出优化方案
4. **验证** - 测试优化效果
5. **迭代** - 重复以上步骤

## CPU 性能分析

### 查看 CPU 使用率

\`\`\`bash
# top - 实时查看 CPU 使用情况
top

# mpstat - 查看每个 CPU 核心的使用情况
mpstat -P ALL 1

# pidstat - 查看每个进程的 CPU 使用
pidstat -u 1
\`\`\`

### CPU 性能指标

- **us** - 用户态 CPU 时间
- **sy** - 内核态 CPU 时间
- **wa** - I/O 等待时间
- **id** - 空闲时间

### CPU 密集型优化

如果 us 很高，说明 CPU 瓶颈在用户程序：

\`\`\`bash
# 使用 perf 分析 CPU 性能
perf record -g ./program
perf report

# 使用火焰图
git clone https://github.com/brendangregg/FlameGraph
perf record -F 99 -ag -- sleep 10
perf script | stackcollapse-perf.pl | flamegraph.pl > flame.svg
\`\`\`

## 内存性能分析

### 查看内存使用

\`\`\`bash
# free - 查看内存总量和使用情况
free -h

# vmstat - 虚拟内存统计
vmstat 1

# sar - 系统活动报告
sar -r 1
\`\`\`

### 内存性能指标

- **MemTotal / MemAvailable** - 总内存/可用内存
- **buff/cache** - 缓冲区缓存
- **swap** - 交换分区使用量

### 进程内存分析

\`\`\`bash
# pmap - 查看进程内存映射
pmap -x <pid>

# smem - 更准确的内存统计
smem -t -k -u

# 查看 OOM Killer 日志
dmesg | grep -i "out of memory"
\`\`\`

### 内存优化策略

1. **减少内存分配** - 复用对象，使用内存池
2. **避免内存碎片** - 使用 slab 分配器
3. **调整 swappiness** - 控制 swap 使用倾向
4. **使用大页内存** - 减少 TLB miss

\`\`\`bash
# 调整 swappiness (0-100，越小越不使用 swap)
echo 10 > /proc/sys/vm/swappiness

# 启用大页
echo 1024 > /proc/sys/vm/nr_hugepages
\`\`\`

## 磁盘 I/O 性能分析

### I/O 性能监控

\`\`\`bash
# iostat - 查看磁盘 I/O 统计
iostat -xz 1

# iotop - 查看进程 I/O 使用
iotop -o

# df - 查看磁盘空间
df -h

# du - 查看目录大小
du -sh /path/to/dir
\`\`\`

### I/O 性能指标

- **r/s, w/s** - 每秒读/写次数
- **rkB/s, wkB/s** - 每秒读/写数据量
- **await** - 平均 I/O 等待时间
- **%util** - 磁盘使用率

### 文件系统优化

\`\`\`bash
# 使用 noatime 减少元数据写入
mount -o remount,noatime /

# 选择合适的文件系统
# ext4 - 通用场景
# xfs - 大文件、高并发
# btrfs - 高级特性（快照、校验和）

# 调整 I/O 调度器
# deadline - SSD 推荐
# cfq - 机械硬盘
echo deadline > /sys/block/sda/queue/scheduler
\`\`\`

## 网络性能分析

### 网络监控工具

\`\`\`bash
# ss - 查看网络连接
ss -tlnp

# netstat - 网络统计
netstat -s

# sar - 网络接口统计
sar -n DEV 1

# iftop - 实时网络流量
iftop

# tcpdump - 抓包分析
tcpdump -i eth0 -w capture.pcap
\`\`\`

### 网络性能调优

\`\`\`bash
# 增加文件描述符限制
ulimit -n 65535

# 调整 TCP 缓冲区
echo 'net.core.rmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_rmem = 4096 87380 16777216' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_wmem = 4096 65536 16777216' >> /etc/sysctl.conf

# 启用 TCP BBR
echo 'net.core.default_qdisc = fq' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_congestion_control = bbr' >> /etc/sysctl.conf

# TIME_WAIT 优化
echo 'net.ipv4.tcp_tw_reuse = 1' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_fin_timeout = 30' >> /etc/sysctl.conf

# 应用配置
sysctl -p
\`\`\`

## 性能分析工具清单

### Brendan Gregg 的工具图

\`\`\`
工具          功能
────────────────────────────────
uptime        系统运行时间和负载
dmesg         内核日志
vmstat        虚拟内存统计
mpstat        CPU 统计
iostat        磁盘 I/O 统计
sar           系统活动报告
top/htop      进程监控
pidstat       进程统计
strace        系统调用追踪
ltrace        库调用追踪
perf          CPU 性能分析
valgrind      内存错误检测
tcpdump       网络抓包
ss            套接字统计
iptables      防火墙/统计
\`\`\`

## 总结

Linux 性能调优是一门艺术，需要：

1. **建立全局视野** - 理解系统各组件的关系
2. **数据驱动决策** - 用工具测量，不凭感觉
3. **理解原理** - 知道为什么优化有效
4. **持续监控** - 性能优化是持续的过程

记住：过早优化是万恶之源。先测量，再优化！`,
  },
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
