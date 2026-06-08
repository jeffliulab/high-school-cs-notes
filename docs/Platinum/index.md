# USACO Platinum 考纲总览

白金级（Platinum）是 USACO 的最高级别，面向有志冲击 **USACO 营队（USACO Camp）** 与 IOI 方向的选手。题目需要**高级数据结构**、**精巧的算法设计**与**扎实的实现功底**。

## 白金级定位

白金级常考：

- **高级区间数据结构**：线段树进阶（区间修改、动态开点、二维）、分块、扫描线。
- **高级树上算法**：倍增、重链剖分（HLD）、点分治、虚树、启发式合并。
- **计算几何**：几何基础、凸包、扫描线、斜率优化。
- **高级 DP 与技巧**：矩阵快速幂、分治优化 DP、SOS DP、容斥。

题目往往是多个算法的**组合**，且对常数与实现细节要求高。

## 本级别内容

**区间查询**

- [线段树进阶应用](segtree_applications.md)、[扫描线区间查询](sweep_line_range.md)、[区间修改区间查询](range_update_range_query.md)、[动态开点线段树](sparse_segtree.md)、[二维区间查询](range_queries_2d.md)、[分治求静态区间查询](dc_static_range.md)、[分块](sqrt_decomposition.md)

**树**

- [倍增](binary_jumping.md)、[启发式合并](small_to_large.md)、[重链剖分](hld.md)、[点分治](centroid_decomposition.md)、[虚树](virtual_tree.md)、[Kruskal 重构树](kruskal_reconstruction.md)

**几何**

- [几何基础](geometry_primitives.md)、[扫描线](sweep_line.md)、[凸包](convex_hull.md)、[斜率优化](convex_hull_trick.md)

**杂项**

- [容斥原理](inclusion_exclusion.md)、[矩阵快速幂](matrix_exponentiation.md)、[bitset](bitsets.md)、[分治优化 DP](dc_dp.md)、[子集和 DP](sos_dp.md)

## 学习建议

- 先把线段树及其各类变体彻底吃透——它是白金级的「主力武器」。
- 树上算法按 倍增 → HLD → 点分治 的顺序攻克。
- 多做综合题，训练「拆解 → 选择数据结构 → 拼装」的能力，并重视实现的正确性与效率。

> 练习平台：[USACO Guide Platinum](https://usaco.guide/plat) 各模块题单 + USACO 往届白金级题。
