# USACO Gold 考纲总览

金级（Gold）是难度的显著跃升，核心是**动态规划（DP）**与**图论算法**。几乎每场金级比赛都至少有一道 DP 题、一道图论题。

## 金级定位

金级要求系统掌握：

- **动态规划**：背包、网格路径、最长上升子序列、状压、区间、数位等经典模型。
- **图论**：最短路（BFS / Dijkstra）、并查集、拓扑排序、最小生成树。
- **基础数据结构**：树状数组（BIT）、单调栈、滑动窗口、有序集合进阶操作。
- **树上问题**：欧拉序、树形 DP、换根 DP。

数据范围常见 $N \le 2\times10^5$，需要 $O(N\log N)$ 乃至更精细的设计。

## 本级别内容

**数学**

- [整除](divisibility.md)、[模运算](modular_arithmetic.md)、[组合数学](combinatorics.md)

**动态规划**

- [DP 入门](intro_dp.md)、[背包](knapsack.md)、[网格路径](grid_paths.md)、[最长上升子序列](lis.md)、[状压 DP](bitmask_dp.md)、[区间 DP](range_dp.md)、[数位 DP](digit_dp.md)

**图论**

- [无权最短路](unweighted_shortest_path.md)、[并查集](dsu.md)、[拓扑排序](topological_sort.md)、[非负权最短路](dijkstra.md)、[最小生成树](mst.md)

**数据结构**

- [有序集合进阶](sorted_sets.md)、[栈](stacks.md)、[滑动窗口](sliding_window.md)、[单点修改区间和](point_update_range_sum.md)

**树**

- [欧拉序](euler_tour.md)、[树形 DP 入门](dp_on_trees.md)、[换根 DP](all_roots_dp.md)

**其他专题**

- [哈希](hashing.md)、[折半搜索](meet_in_middle.md)、[单峰函数三分](ternary_search.md)

## 学习建议

- DP 要建立「**状态定义 → 转移方程 → 边界 → 顺序**」的固定思考流程。
- 把 Dijkstra、并查集、拓扑排序、BIT 写成熟练的板子。
- 树上问题先掌握 DFS 序与树形 DP 两大武器。

> 练习平台：[USACO Guide Gold](https://usaco.guide/gold) 各模块题单 + USACO 往届金级题。
