# USACO Bronze 考纲总览

**USACO**（USA Computing Olympiad，美国计算机奥林匹克）是面向中学生的在线算法竞赛，分为 **Bronze（铜）→ Silver（银）→ Gold（金）→ Platinum（白金）** 四个级别，逐级晋升。本笔记的 USACO 部分依据成熟的 [USACO Guide](https://usaco.guide) 模块结构编写。

## 赛制简介

- 每个赛季（12 月、1 月、2 月各一场，外加 US Open）举行多场比赛，每场 **3 道题，约 4 小时**，在线评测。
- 在一场比赛中达到晋级分数线，即**当场晋级**到下一级别，可继续作答更高级别题目。
- 支持 **C++ / Java / Python / C**。竞赛主流使用 **C++**（本笔记 USACO 代码以 C++ 为主）。

## 铜级定位

铜级是入门级别，**不要求高级算法或数据结构**，重点考查：

- 读懂题意、正确处理输入输出（文件或标准 IO）。
- 把题目描述**直接翻译成代码**的能力（模拟、暴力枚举）。
- 基本的逻辑分类与边界处理。

绝大多数铜级题目用 $O(N^2)$ 甚至 $O(N^3)$ 的暴力即可通过，**数据范围通常很小**（$N \le 1000$ 或更小）。

## 本级别内容

**入门**

- [时间复杂度](time_complexity.md) —— 大 O 记号，估算暴力是否可行。
- [数据结构入门](intro_data_structures.md) —— 数组、`vector`、`string` 等基础容器。
- [模拟](simulation.md) —— 按题意一步步模拟过程。

**完全搜索**

- [基础完全搜索](complete_search_basic.md) —— 枚举所有可能（嵌套循环）。
- [递归完全搜索](complete_search_recursion.md) —— 用递归枚举子集/排列。

**排序与集合**

- [排序入门](intro_sorting.md) —— `sort`、自定义排序。
- [集合与映射](sets_maps.md) —— `set` / `map` 去重与计数。

**进阶专题**

- [分类讨论](casework.md) —— 把问题拆成若干情形分别处理。
- [贪心入门](intro_greedy.md) —— 每步取局部最优。
- [图论入门](intro_graphs.md) —— 图的表示、连通块（flood fill 思想）。
- [矩形几何](rectangle_geometry.md) —— 矩形相交、面积、重叠。
- [Ad Hoc 杂题](ad_hoc.md) —— 没有固定套路、靠观察的题。

## 学习建议

- 先掌握**时间复杂度**，学会判断「暴力会不会超时」。
- 大量练习**模拟**与**完全搜索**——铜级大半题目都属于这两类。
- 每道题先想清楚再写，注意**边界与读题陷阱**。

> 练习平台：[USACO 官方往届题](http://www.usaco.org/index.php?page=contests)、[USACO Guide](https://usaco.guide/bronze) 各模块附带题单。
