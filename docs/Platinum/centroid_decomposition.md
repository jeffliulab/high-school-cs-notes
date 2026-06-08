# 点分治

> **难度**：⭐⭐⭐⭐⭐
> **前置知识**：[树算法入门](../Silver/intro_trees.md)、分治

点分治（Centroid Decomposition）是处理**树上路径统计**的分治框架：每次找树的**重心**为根，统计「经过重心」的路径，再递归各子树。总复杂度 $O(n\log n)$。

## 树的重心

树的**重心**是这样一个点：删去它后，最大的剩余子树尽可能小（$\le n/2$）。以重心为分治中心，保证递归深度 $O(\log n)$。

```cpp
int sz[N], maxSub[N], centroid;
bool removed[N];          // 已作为分治中心移除

void calcSize(int u, int p) {
    sz[u] = 1;
    for (int v : adj[u]) if (v != p && !removed[v]) {
        calcSize(v, u); sz[u] += sz[v];
    }
}
void findCentroid(int u, int p, int total) {
    maxSub[u] = 0; sz[u] = 1;
    for (int v : adj[u]) if (v != p && !removed[v]) {
        findCentroid(v, u, total);
        sz[u] += sz[v];
        maxSub[u] = max(maxSub[u], sz[v]);
    }
    maxSub[u] = max(maxSub[u], total - sz[u]);
    if (maxSub[u] <= total / 2) centroid = u;       // 重心
}
```

## 分治框架

```cpp
void solve(int entry) {
    calcSize(entry, -1);
    findCentroid(entry, -1, sz[entry]);
    int c = centroid;
    removed[c] = true;

    // 1) 统计所有「经过 c」的路径（核心计算）
    countPathsThrough(c);

    // 2) 递归每个子树（c 已移除，子树独立）
    for (int v : adj[c])
        if (!removed[v]) solve(v);
}
```

## 统计经过重心的路径

以重心 $c$ 为根，每条「经过 $c$」的路径要么从某子树下到 $c$ 再上到另一子树，要么一端就是 $c$。常见做法：DFS 收集各点到 $c$ 的距离，统计满足条件的配对（如「距离和 = K」用桶/双指针），并用**容斥**减去「同一子树内」的非法配对。

```cpp
// 例：统计距离 == K 的点对数
// 对 c 的每个子树，先减去子树内部贡献（容斥），再加入全局桶
```

## 为什么是 O(n log n)

每次以重心分治，子树规模减半，递归 $O(\log n)$ 层；每层所有 `countPaths` 总共扫描 $O(n)$ 个点。故 $O(n\log n)$（或带一个 $\log$ 的统计结构则 $O(n\log^2 n)$）。

## 应用

- 统计树上距离 = K / ≤ K 的点对数。
- 树上路径满足某性质的计数。
- **点分树**（centroid tree）：把分治结构建成一棵树，支持带修改的树上邻域查询。

## 易错提醒

- 每次分治都要在**当前连通块内**重新找重心（用 `removed` 标记隔离）。
- 统计经过重心的路径要**容斥**掉「同子树内」的非法配对。
- `removed` 标记后递归子树，别再跨过已移除点。
- 距离/计数用合适类型防溢出。

## 小结

- 点分治：反复以**重心**为中心，统计经过重心的路径，再递归子树。
- 重心保证规模减半，$O(\log n)$ 层，总 $O(n\log n)$。
- 核心是「统计经过重心的路径」+ 容斥去重；进阶有点分树。
