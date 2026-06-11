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

## 学习资源

- 📘 **本站笔记**（[高中计算机笔记](https://jeffliulab.github.io/high-school-cs-notes/)）：系统中文讲解 + 配图，覆盖 Bronze→Platinum 全部模块。
- 🧭 **[USACO Guide](https://usaco.guide)**：最成熟的英文课程，按级别/模块组织，附海量题单。
- 🗂️ **[官方往届题](http://www.usaco.org/index.php?page=contests)**：历年真题与数据，限时模拟必备。
- ⚔️ **Codeforces / AtCoder**：日常刷题，练手速与思维广度。

## 如何开始

1. 到 [usaco.org](http://www.usaco.org) 注册账号（免费）。
2. 下个赛季任选一场比赛，从 **Bronze** 开始。
3. 赛前用往届 Bronze 题**限时模拟** 2–3 套，熟悉读题与提交流程。
4. 别等「准备好」——先打一场，你会立刻知道差距在哪。

## 小结

- USACO 是**免费在线**的中学算法竞赛，**Bronze→Silver→Gold→Platinum** 逐级晋升。
- 各级别考点清晰：暴力 → 经典技巧 → DP/图论 → 高级数据结构。
- 核心功底：**复杂度分析 + 算法选择 + 干净实现**。
- 路线：学 C++ → 按模块系统学 → 限时刷真题 → 逐级进阶；善用部分分，先打一场再说。
