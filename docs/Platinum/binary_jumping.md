# 倍增

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[树算法入门](../Silver/intro_trees.md)、[位运算入门](../Silver/bitwise.md)

倍增（Binary Lifting）预处理「每个点向上跳 $2^k$ 步到哪」，从而 $O(\log n)$ 求**第 $k$ 个祖先**和**最近公共祖先（LCA）**。

## 核心思想

预处理 `up[k][v]` = 从 $v$ 向上跳 $2^k$ 步到达的节点。利用二进制拆分，任意步数都能用若干个 $2^k$ 跳跃拼出。

递推关系：跳 $2^k$ 步 = 先跳 $2^{k-1}$ 步，再跳 $2^{k-1}$ 步：

$$up[k][v] = up[k-1][\,up[k-1][v]\,]$$

## 预处理

```cpp
const int LOG = 20;          // 2^20 > 10^6
int up[LOG][N], depth[N];

void dfs(int u, int p) {
    up[0][u] = p;            // 父亲 = 跳 1 步
    for (int k = 1; k < LOG; k++)
        up[k][u] = up[k-1][ up[k-1][u] ];
    for (int v : adj[u])
        if (v != p) { depth[v] = depth[u] + 1; dfs(v, u); }
}
// 根的父亲设为 0（虚拟节点）或自身
```

## 求第 k 个祖先

把 $k$ 按二进制拆，逐位跳：

```cpp
int kthAncestor(int v, int k) {
    for (int i = 0; i < LOG; i++)
        if ((k >> i) & 1)
            v = up[i][v];
    return v;     // 若跳出根则为 0
}
```

## 求 LCA

1. 先把较深的点跳到与另一点**同一深度**。
2. 若此时两点相同，即为 LCA。
3. 否则两点**一起向上跳**：从大到小尝试每个 $2^k$，若跳后两点仍不同就跳（保证不跳过 LCA），最后 LCA 是它们的父亲。

```cpp
int lca(int a, int b) {
    if (depth[a] < depth[b]) swap(a, b);
    // 1) 提到同深度
    int diff = depth[a] - depth[b];
    for (int i = 0; i < LOG; i++)
        if ((diff >> i) & 1) a = up[i][a];
    if (a == b) return a;
    // 2) 一起往上跳
    for (int i = LOG - 1; i >= 0; i--)
        if (up[i][a] != up[i][b]) { a = up[i][a]; b = up[i][b]; }
    return up[0][a];      // 父亲即 LCA
}
```

## 应用

- **LCA**：树上路径、距离 `dist(a,b)=depth[a]+depth[b]-2*depth[lca]`。
- **第 k 祖先**、路径上跳跃。
- **函数图**上走 $k$ 步（见 [函数图](../Silver/functional_graphs.md)）——同样用倍增。
- 配合维护「路径最大边/和」等可合并信息：`up` 同时记录跳跃段的聚合值。

## 复杂度

预处理 $O(n\log n)$，每次查询 $O(\log n)$，空间 $O(n\log n)$。

## 易错提醒

- `LOG` 要取到 $\ge \log_2 n$（如 $n=10^5$ 用 20）。
- 预处理顺序：先 `up[0]`（父亲），再按 $k$ 递推。
- LCA 第二步从**大到小**枚举 $k$，且条件是「跳后仍不同才跳」。
- 根的父亲设虚拟节点 0，跳出树时返回 0。

## 小结

- 倍增预处理 `up[k][v]`（跳 $2^k$ 步），$O(n\log n)$。
- $O(\log n)$ 求第 k 祖先（二进制拆步）与 LCA（同深 + 齐跳）。
- 可扩展到路径聚合、函数图走 k 步。
