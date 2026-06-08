# USACO Silver 考纲总览

银级（Silver）是从「会写代码」迈向「会用算法」的关键一步。题目数据范围变大，**朴素暴力开始超时**，需要掌握一批经典算法技巧与基础图论。

## 银级定位

相比铜级，银级要求：

- 用 **前缀和、双指针、二分** 等技巧把复杂度从 $O(N^2)$ 降到 $O(N\log N)$ 或 $O(N)$。
- 掌握**图的遍历**（DFS / BFS）与**洪水填充**，处理连通性问题。
- 会用**排序 + 贪心**、**自定义比较器**解决组合优化问题。

数据范围常见 $N \le 10^5$，因此目标复杂度多为 $O(N\log N)$。

## 本级别内容

**前缀和**

- [前缀和入门](prefix_sums.md) —— $O(1)$ 查询区间和。
- [前缀和进阶](prefix_sums_advanced.md) —— 二维前缀和、差分。

**排序与查找**

- [双指针](two_pointers.md) —— 滑动区间、对撞指针。
- [有序数组二分](binary_search_sorted.md) —— `lower_bound` / `upper_bound`。
- [二分答案](binary_search.md) —— 对答案二分 + 判定函数。
- [自定义比较器与坐标压缩](custom_comparators.md) —— 多关键字排序、离散化。
- [排序贪心](greedy_sorting.md) —— 先排序再贪心。
- [优先队列](priority_queues.md) —— 堆，动态取最值。

**图论**

- [图的遍历](graph_traversal.md) —— DFS / BFS、邻接表。
- [洪水填充](flood_fill.md) —— 网格连通块。
- [树算法入门](intro_trees.md) —— 树的遍历、子树性质。
- [函数图](functional_graphs.md) —— 每点出度为 1 的图、找环。

**其他专题**

- [位运算入门](bitwise.md) —— `& | ^ << >>`、状态用二进制表示。

## 学习建议

- **二分**与**前缀和**是银级出现频率最高的技巧，务必熟练。
- 把 **DFS/BFS/洪水填充** 写成可复用的模板。
- 训练「看到数据范围 → 推目标复杂度 → 选算法」的思维。

> 练习平台：[USACO Guide Silver](https://usaco.guide/silver) 各模块题单 + USACO 往届银级题。
