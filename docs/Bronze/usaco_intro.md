# USACO 竞赛介绍

USACO（美国计算机奥林匹克竞赛）是面向中学生的在线算法编程竞赛。本文带你从零认识它：是什么、怎么打、各级别考什么、以及如何规划自己的学习路线。如果你是第一次接触 USACO，从这里开始。

## USACO 是什么

- **USACO** = USA Computing Olympiad，美国计算机奥林匹克竞赛。
- 面向**中学生**的在线**算法编程**竞赛，全程免费、人人可参加、不限国籍。
- 一个赛季有多场比赛，是美国队选拔、并通往 **IOI**（国际信息学奥林匹克）的阶梯。
- 考查的是「**用算法解决问题**」的能力，而非死记语法。

> 官网：[usaco.org](http://www.usaco.org) ｜ 权威课程指南：[usaco.guide](https://usaco.guide)

## 为什么参加

- **真正的算法思维**：学会分析复杂度、设计算法、调试代码——计算机科学的核心功底。
- **升学含金量**：晋级 Gold / Platinum 是 CS 方向名校申请的有力背书。
- **通往 IOI**：白金级之上是训练营与国家队，对接国际奥赛。
- **零成本起步**：纯线上、免费、随时可练往届题，反馈即时。

即使只打到 Silver / Gold，算法能力的提升也非常实在。

## 比赛形式

- **赛季**：每年 12 月、1 月、2 月各一场，外加赛季收官的 **US Open**。
- **每场**：3 道题，约 **4 小时**，在自己电脑上作答、在线评测。
- **语言**：支持 C++ / Java / Python / C —— 竞赛主流是 **C++**（本站 USACO 代码以 C++ 为主）。
- **当场晋级**：达到该场分数线即**立即升级**，可在同一场继续作答更高级别的题目。
- 比赛在一个时间窗口内**自选 4 小时**开始，灵活方便。

## 四个级别：逐级晋升

USACO 分为 **Bronze（铜）→ Silver（银）→ Gold（金）→ Platinum（白金）** 四级，所有新选手都从 **Bronze** 起步，达标当场晋级，逐级攀升。

<div class="diagram">
<svg viewBox="0 0 720 290" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="15">
  <rect x="30"  y="220" width="150" height="50"  rx="6" fill="var(--dia-accent)" fill-opacity="0.18" stroke="var(--dia-accent)"/>
  <rect x="200" y="170" width="150" height="100" rx="6" fill="var(--dia-stroke-soft)" fill-opacity="0.18" stroke="var(--dia-stroke-soft)"/>
  <rect x="370" y="110" width="150" height="160" rx="6" fill="var(--dia-gold)" fill-opacity="0.2" stroke="var(--dia-gold)"/>
  <rect x="540" y="40"  width="150" height="230" rx="6" fill="var(--dia-blue)" fill-opacity="0.18" stroke="var(--dia-blue)"/>
  <g text-anchor="middle" font-weight="600">
    <text x="105" y="250" fill="var(--dia-accent)">Bronze 铜</text>
    <text x="275" y="205" fill="var(--dia-stroke-soft)">Silver 银</text>
    <text x="445" y="148" fill="var(--dia-gold)">Gold 金</text>
    <text x="615" y="80"  fill="var(--dia-blue)">Platinum 白金</text>
  </g>
  <g text-anchor="middle" font-size="11" fill="var(--dia-stroke-tertiary)">
    <text x="105" y="268">入门</text>
    <text x="275" y="223">经典技巧</text>
    <text x="445" y="166">DP + 图论</text>
    <text x="615" y="98">高级数据结构</text>
  </g>
  <path d="M105 215 L275 165 L445 105 L615 35" fill="none" stroke="var(--dia-accent)" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#uarr)"/>
  <defs><marker id="uarr" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6" fill="var(--dia-accent)"/></marker></defs>
</svg>
<p class="figure-caption">USACO 四级阶梯：人人从 Bronze 起步，达标当场晋级，逐级攀升到 Platinum。每升一级，所需算法与数据结构明显加深。</p>
</div>

各级别的核心考点（点击进入对应级别的完整笔记）：

| 级别 | 定位 | 核心考点 |
| --- | --- | --- |
| **[Bronze 铜](index.md)** | 入门，暴力可过（常 $N\le1000$） | 时间复杂度、完全搜索、模拟、排序、贪心入门、图论入门 |
| **[Silver 银](../Silver/index.md)** | 朴素暴力开始超时 | 前缀和、双指针、二分（含二分答案）、DFS/BFS、排序贪心 |
| **[Gold 金](../Gold/index.md)** | 难度跃升 | 动态规划、最短路/MST/拓扑、并查集、树状数组、树形 DP |
| **[Platinum 白金](../Platinum/index.md)** | 面向训练营/IOI | 线段树进阶、重链剖分、点分治、计算几何、高级 DP |

## 评分与应试策略

- **部分分**：每题由多个测试点组成，过几个得几分——**不必一次 AC**。想不出正解也可先用暴力拿小数据点的分。
- **先通读三题**，按难度与把握安排顺序，别在一题上耗死。
- **先看数据范围再定算法**（$N=10^5$ 别写 $O(N^2)$，参见 [时间复杂度](time_complexity.md)）。
- **对拍验证**：用暴力解 + 小数据检验贪心 / 复杂算法的正确性。
- 多写测试样例，尤其是**边界**（空、单元素、最大值）。

## 一道「铜级风格」例题

> **题意**：给 $N$ 个整数（$N\le1000$），求有多少对 $(i, j)$（$i<j$）满足 $a_i+a_j$ 是偶数。

**先别看代码，自己想三个问题**：① 最直接的做法是什么？② 一共要算多少次？③ 会超时吗？

由于 $N$ 很小，直接用 [完全搜索](complete_search_basic.md) 枚举每一对即可，$O(N^2)\approx10^6$，远在时限内：

```cpp
int n; cin >> n;
vector<int> a(n);
for (int i = 0; i < n; i++) cin >> a[i];

long long cnt = 0;
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)      // j 从 i+1 起，避免重复配对
        if ((a[i] + a[j]) % 2 == 0) cnt++;

cout << cnt << "\n";
```

**能更快吗？**（Silver 思维）偶数对 = 「两奇」或「两偶」，所以只需统计奇数个数 `odd`、偶数个数 `even`，答案 = $\binom{odd}{2}+\binom{even}{2}$，$O(N)$：

```cpp
long long odd = 0, even = 0;
for (int x : a) (x % 2 ? odd : even)++;
cout << odd*(odd-1)/2 + even*(even-1)/2 << "\n";
```

> 同一道题，Bronze 用暴力、Silver 用观察优化——这正是逐级进阶时思维的跨越。

## 学习路线

<div class="diagram">
<svg viewBox="0 0 720 120" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="13">
  <g fill="var(--dia-bg-card)" stroke="var(--dia-rule)">
    <rect x="10"  y="35" width="145" height="50" rx="6"/><rect x="190" y="35" width="145" height="50" rx="6"/>
    <rect x="370" y="35" width="145" height="50" rx="6"/><rect x="550" y="35" width="160" height="50" rx="6"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-stroke)">
    <text x="82"  y="58">① 学 C++</text><text x="262" y="58">② 刷模块</text><text x="442" y="58">③ 做往届题</text><text x="630" y="58">④ 逐级进阶</text>
  </g>
  <g text-anchor="middle" font-size="11" fill="var(--dia-stroke-soft)">
    <text x="82"  y="76">语法 + STL</text><text x="262" y="76">USACO Guide</text><text x="442" y="76">限时模拟</text><text x="630" y="76">Bronze→Plat</text>
  </g>
  <g stroke="var(--dia-accent)" stroke-width="2" marker-end="url(#urd)">
    <line x1="155" y1="60" x2="188" y2="60"/><line x1="335" y1="60" x2="368" y2="60"/><line x1="515" y1="60" x2="548" y2="60"/>
  </g>
  <defs><marker id="urd" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-accent)"/></marker></defs>
</svg>
<p class="figure-caption">备赛闭环：学语言 → 按模块系统学（学一个就练一个）→ 限时模拟真题 → 逐级进阶。</p>
</div>

1. 先用 **C++** 打牢语法与 STL（`vector` / `sort` / `set` / `map`，见 [数据结构入门](intro_data_structures.md)）。
2. 按 **USACO Guide** 的模块顺序系统学，每学一个模块就**立刻做配套题单**。
3. 限时模拟**往届真题**，按官方评分自评；薄弱处回到本站笔记复习。
4. 稳过 Bronze → 冲 Silver → 逐级向上，每月一次限时模拟检验进度。

## 参考网站与工具

**系统课程 / 教材**

| 资源 | 说明 |
| --- | --- |
| 📘 [本站笔记（高中计算机笔记）](https://jeffliulab.github.io/high-school-cs-notes/) | 系统**中文**讲解 + 配图，覆盖 Bronze→Platinum 全部模块 |
| 🧭 [USACO Guide](https://usaco.guide) | 最权威的英文路线（Benjamin Qi 等顶尖选手编写），按级别/模块组织，每模块附分级题单 |
| 📖 [An Introduction to USACO](https://darrenyao.com/usacobook/cpp.pdf)（Darren Yao） | 免费 PDF，Bronze/Silver 入门，C++ 与 Java 双版本 |
| 📚 [Competitive Programmer's Handbook](https://cses.fi/book/book.pdf)（Antti Laaksonen） | 免费经典算法竞赛教材，与 CSES 题库配套 |

**刷题平台**

| 平台 | 用途 |
| --- | --- |
| 🗂️ [USACO 官方往届题](http://www.usaco.org/index.php?page=contests) | **实战真题**与官方数据，限时模拟的核心 |
| 🧩 [CSES Problem Set](https://cses.fi/problemset/) | 300 道**标准算法题**，系统覆盖排序/DP/图/区间/树，模板必刷 |
| ⚔️ [Codeforces](https://codeforces.com/problemset) | 海量**分级**题 + 高频比赛，按 rating 精准选题 |
| 🎯 [AtCoder](https://atcoder.jp/)（含 [DP 专题赛](https://atcoder.jp/contests/dp)） | 题面干净、质量高；ABC 适合进阶，Educational DP Contest 练 DP 极佳 |
| 🀄 [洛谷 Luogu](https://www.luogu.com.cn/) | 中文平台，题解丰富，含 USACO 题搬运与题单 |

## 📘 自学操作指南：从零到白金

下面是一份可执行的「零基础 → Platinum」路线。**核心方法贯穿每个阶段**，再按级别给出学什么、在哪刷、刷多少、怎样算「过关」。

### 贯穿始终的学习方法

> **学一个模块 → 立刻做配套题 → 限时模拟整套真题 → upsolve 订正**，循环推进。

- **upsolving（赛后订正）最重要**：模拟/比赛后，把没做出的题**想透、看题解、合上题解自己重写一遍**。真正的提升发生在这里。
- **看题解的正确姿势**：先独立卡 **30–60 分钟**；想不出再看题解；看懂后**关掉题解默写实现**。秒抄题解等于没学。
- **限时训练**：定期模拟真实赛制（4 小时 3 题），练时间分配与心态——平时会做 ≠ 赛场能做出来。
- **每题复盘**：卡在哪？读题、想算法、写实现、还是复杂度？针对性补。

### 难度坐标：USACO 级别 ↔ Codeforces 评分

借助 Codeforces 的分级题库精准选题（仅供参考，两者风格不同）：

| USACO 级别 | 选手大致 CF 分 | 对应 CF 题目难度 | CF 大致位置 |
| --- | --- | --- | --- |
| **Bronze** | < 1300 | 900–1500 | Div2 A–C |
| **Silver** | 1200–1500 | 1200–1900 | Div2 C–E |
| **Gold** | 1500–1800 | 1500–2200 | Div1 A–C |
| **Platinum** | 1800+ | 1900+ | Div1 C+ |

> CF 偏重「短时间多题、手速」，USACO 偏重「长时间深思」。有人 USACO 强但 CF 弱，反之亦然——别被 rating 绑架，以**能否限时 AC 该级别真题**为准。

### 阶段 0 · 打基础（语言与 STL）

- **目标**：用 **C++** 流畅写循环/数组/函数/递归，熟练处理输入输出。
- **学什么**：基本语法、`vector`/`string`、`sort`、`set`/`map`、`pair`、结构体（见 [数据结构入门](intro_data_structures.md)）。
- **在哪练**：CSES「Introductory Problems」(19 题) + CF 800–1000 分题 + 洛谷入门。
- **刷多少**：约 **30–50** 道简单题建立手感。
- **耗时**：零基础约 **1–2 个月**（视投入）。
- **过关标志**：能独立写出排序、前缀和、简单模拟，不再卡语法。

### 阶段 1 · Bronze 铜级

- **学什么**：[时间复杂度](time_complexity.md)、[完全搜索](complete_search_basic.md)、[模拟](simulation.md)、[排序](intro_sorting.md)与[集合映射](sets_maps.md)、[贪心](intro_greedy.md)、[图论入门](intro_graphs.md)。
- **在哪刷**：USACO Guide **Bronze 模块题单** + **全部往届 Bronze 真题**。
- **刷多少**：Guide Bronze 题单 + 往届 Bronze 约 **30–50 套题**，累计 **60–80 题**。
- **限时**：每周 **1–2 套**往届 Bronze 模拟。
- **过关标志**：往届 Bronze 限时能稳定 **AC 2–3 题** / 达到晋级线。
- **耗时**：有语言基础约 **1–3 个月**。

### 阶段 2 · Silver 银级

- **学什么**：[前缀和](../Silver/prefix_sums.md)、[双指针](../Silver/two_pointers.md)、[二分（含二分答案）](../Silver/binary_search.md)、[DFS/BFS](../Silver/graph_traversal.md)/[洪水填充](../Silver/flood_fill.md)、[排序贪心](../Silver/greedy_sorting.md)、[自定义比较器](../Silver/custom_comparators.md)。
- **在哪刷**：USACO Guide Silver + 往届 Silver + **CSES「Sorting and Searching」**。
- **刷多少**：Guide Silver 题单 + 往届 Silver ~40 + CSES 相关 ~30，累计 **80–120 题**；CF 主攻 1200–1700 分。
- **过关标志**：往届 Silver 限时能过 **2/3 题**。
- **耗时**：约 **2–4 个月**。

### 阶段 3 · Gold 金级

- **学什么**：[动态规划](../Gold/intro_dp.md)（[背包](../Gold/knapsack.md)/[LIS](../Gold/lis.md)/[区间](../Gold/range_dp.md)/[状压](../Gold/bitmask_dp.md)）、[最短路](../Gold/dijkstra.md)/[MST](../Gold/mst.md)/[拓扑](../Gold/topological_sort.md)、[并查集](../Gold/dsu.md)、[树状数组](../Gold/point_update_range_sum.md)、[树形 DP](../Gold/dp_on_trees.md)。
- **在哪刷**：USACO Guide Gold + 往届 Gold + **CSES「Dynamic Programming」(全 19 题) / 「Graph」/「Tree」/「Range Queries」** + **AtCoder Educational DP Contest**。
- **刷多少**：Guide Gold + 往届 Gold ~40 + CSES DP/图/树 ~50，累计 **120–180 题**；CF 主攻 1500–2000 分（Div2 D/E）。
- **过关标志**：能独立设计中等难度的 DP 与图论解法并限时实现。
- **耗时**：约 **4–8 个月**。

### 阶段 4 · Platinum 白金级

- **学什么**：[线段树进阶](../Platinum/segtree_applications.md)、[重链剖分](../Platinum/hld.md)、[点分治](../Platinum/centroid_decomposition.md)、[倍增](../Platinum/binary_jumping.md)、[计算几何](../Platinum/geometry_primitives.md)/[凸包](../Platinum/convex_hull.md)、高级 DP（[数位](../Gold/digit_dp.md)/[SOS](../Platinum/sos_dp.md)/[分治优化](../Platinum/dc_dp.md)）。
- **在哪刷**：USACO Guide Platinum + **全部往届 Platinum** + CF **Div1** + 各专题题单。
- **刷多少**：Guide Platinum + 往届 Platinum 全部 + 大量 CF 1900+，**持续刷，数百题量级**。
- **过关标志**：能稳定打进白金，向训练营 / IOI 方向冲刺。
- **耗时**：通常 **1 年以上**，因人而异。

### 路线总览

| 级别 | 核心模块 | 主刷平台 | 建议累计题量 | 目标 CF 分 | 参考周期 |
| --- | --- | --- | --- | --- | --- |
| 阶段 0 | 语言 + STL | CSES 入门 / CF 800+ | 30–50 | — | 1–2 月 |
| Bronze | 暴力 / 模拟 / 贪心 | USACO 往届 + Guide | 60–80 | <1300 | 1–3 月 |
| Silver | 二分 / 前缀和 / DFS·BFS | + CSES Sorting | 80–120 | 1200–1500 | 2–4 月 |
| Gold | DP / 图论 / 数据结构 | + CSES DP·图 / AtCoder DP | 120–180 | 1500–1800 | 4–8 月 |
| Platinum | 线段树 / 树上 / 几何 | + CF Div1 | 数百+ | 1800+ | 1 年+ |

### 关于「刷多少题」的真相

- **质量 > 数量**：一道题想透 + 订正 + 举一反三，胜过十道看一眼。
- **总量级参考**：从零到 **Gold** 通常需解 **300–500+ 题**；到 **Platinum** 往往 **1000+ 题**、跨 1–2 年。
- 这些数字只是**参照**——真正的标准不是凑够数量，而是**每个模块都真正掌握、能限时 AC 对应级别真题**。
- 个体差异很大：投入时间、数学基础、有无教练 / 同伴都会显著影响进度。

### 常见误区

- ❌ 只看不写、看到题解就秒抄 → ✅ 先独立想，看完关掉默写。
- ❌ 基础不牢就跳级硬冲 Gold → ✅ 逐级打牢，欠下的债迟早要还。
- ❌ 只刷不复盘 → ✅ 每题问自己「错在读题/算法/实现/复杂度哪一环」。
- ❌ 从不限时、只慢慢做 → ✅ 定期 4 小时模拟，练时间分配与心态。
- ❌ 一题死磕一整天不看题解 → ✅ 卡 30–60 分钟后该看就看，效率优先。

## 如何报名参赛

1. 到 [usaco.org](http://www.usaco.org) 注册账号（免费）。
2. 赛季：每年 **12 月 / 1 月 / 2 月 + US Open**，在时间窗口内**自选 4 小时**开赛。
3. 所有人从 **Bronze** 开始；达标当场晋级。
4. 别等「准备好」——先打一场做诊断，目标和短板会立刻清晰。

## 小结

- USACO 是**免费在线**的中学算法竞赛，**Bronze→Silver→Gold→Platinum** 逐级晋升。
- 各级别考点清晰：暴力 → 经典技巧 → DP/图论 → 高级数据结构。
- 核心功底：**复杂度分析 + 算法选择 + 干净实现**。
- 自学闭环：**学模块 → 立刻刷题 → 限时模拟 → upsolve 订正**，配合 USACO Guide / CSES / Codeforces 逐级进阶。
- 善用部分分，**先打一场再说**——质量 > 数量，坚持比题量更重要。

