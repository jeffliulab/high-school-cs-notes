# 树形 DP 入门

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[树算法入门](../Silver/intro_trees.md)、[DP 入门](intro_dp.md)

树形 DP 在树上做动态规划：每个节点的答案由其**子节点**的答案合并而来。通过一次 DFS（后序）自底向上计算。

## 核心套路

- 状态：`dp[u][...]` = 以 $u$ 为根的子树的某种最优值/计数。
- 转移：在 DFS 中，先递归算完所有子节点，再用它们合并出 `dp[u]`（**后序**）。

```cpp
void dfs(int u, int p) {
    // 初始化 dp[u]（只含 u 自己）
    for (int v : adj[u]) {
        if (v != p) {
            dfs(v, u);                 // 先算子节点
            // 用 dp[v] 更新 dp[u]
        }
    }
}
```

## 经典例 1：树上最大独立集

> 选一些点，使没有两个相邻，最大化点权和（「没有上司的舞会」）。

每个点两种状态：选 or 不选。

- `dp[u][0]`：不选 $u$，子树最大权。
- `dp[u][1]`：选 $u$，子树最大权。

转移（子节点 $v$）：

$$dp[u][0] += \max(dp[v][0], dp[v][1]), \quad dp[u][1] += dp[v][0]$$

```cpp
long long dp[N][2];
void dfs(int u, int p) {
    dp[u][0] = 0;
    dp[u][1] = w[u];                   // 选 u 先加自身权值
    for (int v : adj[u]) {
        if (v != p) {
            dfs(v, u);
            dp[u][0] += max(dp[v][0], dp[v][1]);  // 不选 u，子节点随意
            dp[u][1] += dp[v][0];                 // 选 u，子节点必不选
        }
    }
}
// 答案：max(dp[root][0], dp[root][1])
```

## 经典例 2：子树大小 / 子树和

最简单的树形 DP：

```cpp
int sz[N];
void dfs(int u, int p) {
    sz[u] = 1;
    for (int v : adj[u])
        if (v != p) { dfs(v, u); sz[u] += sz[v]; }
}
```

## 经典例 3：树的直径（树形 DP 版）

每个点维护「向下最长链」`down[u]`，直径 = 经过某点的「最长 + 次长向下链」的最大值：

```cpp
long long ans = 0, down[N];
void dfs(int u, int p) {
    down[u] = 0;
    long long max1 = 0, max2 = 0;       // 最长、次长向下链
    for (int v : adj[u]) {
        if (v != p) {
            dfs(v, u);
            long long d = down[v] + 1;
            if (d > max1) { max2 = max1; max1 = d; }
            else if (d > max2) max2 = d;
        }
    }
    down[u] = max1;
    ans = max(ans, max1 + max2);         // 经过 u 的最长路径
}
```

## 易错提醒

- 必须**后序**（先递归子节点再合并），否则用到未算好的 `dp[v]`。
- 用 `parent` 参数防止 DFS 往回走。
- 注意状态初值（如选 $u$ 时先加自身权值）。
- 链状树递归深，注意栈溢出。

## 小结

- 树形 DP：`dp[u]` 由子节点 `dp[v]` 后序合并而成。
- 经典：最大独立集（选/不选两状态）、子树大小、树直径（最长+次长链）。
- 关键是想清状态定义与「从子到父」的合并方式。
