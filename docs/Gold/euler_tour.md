# 欧拉序

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[树算法入门](../Silver/intro_trees.md)、[单点修改区间和](point_update_range_sum.md)

欧拉序（DFS 序）把树「拍平」成一个数组，使每棵**子树对应一段连续区间**。于是树上的子树操作就变成了数组上的区间操作，可配合树状数组/线段树。

## 核心思想

DFS 遍历树，记录每个点**进入时间** `tin[u]` 和**离开时间** `tout[u]`。子树 $u$ 的所有节点的 `tin` 恰好落在 $[tin[u], tout[u]]$ 这段连续区间内。

```cpp
int tin[N], tout[N], timer = 0;
int order[N];                 // order[t] = 第 t 个进入的点

void dfs(int u, int p) {
    tin[u] = ++timer;
    order[timer] = u;
    for (int v : adj[u])
        if (v != p) dfs(v, u);
    tout[u] = timer;          // 子树占据 [tin[u], tout[u]]
}
```

> 判断 $u$ 是否在 $v$ 的子树内：`tin[v] <= tin[u] && tin[u] <= tout[v]`。

## 应用：子树求和 / 子树修改

把节点权值按 `tin` 放到数组的对应位置，则：

- **子树求和** = 区间 $[tin[u], tout[u]]$ 求和。
- **单点修改节点 $u$** = 数组位置 `tin[u]` 修改。

用树状数组即可 $O(\log n)$ 完成：

```cpp
// 节点 u 权值改为新值
update(tin[u], delta);
// 子树 u 的权值和
long long s = rangeSum(tin[u], tout[u]);
```

## 应用：子树整体加（差分）

「给子树所有点加 $v$，单点查询」可用差分 BIT：在 `tin[u]` 加、`tout[u]+1` 减，单点查询即前缀和。

## 与 LCA / 路径问题的关系

欧拉序也是求最近公共祖先（LCA）的基础之一。更复杂的「路径」操作（非子树）需要 [重链剖分](../Platinum/hld.md)。欧拉序本身擅长的是**子树**类操作。

## 复杂度

DFS 建欧拉序 $O(n)$，之后每次子树操作 $O(\log n)$（配 BIT/线段树）。

## 易错提醒

- `tin`/`tout` 用同一个 `timer`；`tout[u]` 取子树 DFS 完成后的当前 timer。
- 子树区间是 $[tin[u], tout[u]]$（含两端）。
- 树 DFS 深度可达 $n$，链状树注意栈溢出。
- 别把「子树操作」和「路径操作」混淆——后者需要 HLD。

## 小结

- 欧拉序（DFS 序）用 `tin`/`tout` 把每棵子树映射成连续区间。
- 子树求和/修改 → 数组区间操作（配 BIT/线段树），$O(\log n)$。
- 是子树类问题与 LCA 的基础；路径问题需重链剖分。
