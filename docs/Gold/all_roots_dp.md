# 换根 DP

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[树形 DP 入门](dp_on_trees.md)

换根 DP（二次扫描 / rerooting）求解「**以每个节点为根**时的答案」。朴素地对每个根各做一次 DFS 是 $O(n^2)$；换根 DP 用两次 DFS 做到 $O(n)$。

## 问题特征

形如「对每个节点 $u$，求以 $u$ 为根时的某个量」——例如每个点到所有其他点的距离之和、每个点为根时的最大深度等。

## 两次 DFS 框架

**第一次 DFS（自底向上）**：固定根（如 0 号），算出每个节点的**子树内**信息 `down[u]`。

**第二次 DFS（自顶向下）**：从根往下，把**父节点方向**的信息 `up[u]` 传给子节点，合并得到每个点的全局答案。

```cpp
// 例：求每个点到所有点的距离之和
long long sub[N];     // 子树内距离和
int sz[N];            // 子树大小
long long ans[N];     // 每个点为根的答案

void dfs1(int u, int p) {
    sz[u] = 1; sub[u] = 0;
    for (int v : adj[u]) if (v != p) {
        dfs1(v, u);
        sz[u] += sz[v];
        sub[u] += sub[v] + sz[v];     // v 子树每个点到 u 多走 1
    }
}

void dfs2(int u, int p) {
    for (int v : adj[u]) if (v != p) {
        // 换根公式：从 u 换到 v
        // 距离和 = ans[u] - sz[v]（靠近 v 的点近 1） + (n - sz[v])（远离的点远 1）
        ans[v] = ans[u] - sz[v] + (n - sz[v]);
        dfs2(v, u);
    }
}

// 主程序
dfs1(0, -1);
ans[0] = sub[0];          // 根的答案 = 子树距离和（此时是全树）
dfs2(0, -1);
```

## 换根的核心：增量更新

从 $u$ 移到相邻的 $v$ 当根时，答案只发生**可 $O(1)$ 计算的变化**——这是换根 DP 高效的关键。推导换根公式时，想清楚「根从 u 变到 v，哪些点离根更近了、哪些更远了」。

<div class="diagram">
<svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <circle cx="80" cy="45" r="14" fill="var(--dia-bg-card)" stroke="var(--dia-accent)"/>
  <text x="80" y="49" text-anchor="middle" fill="var(--dia-accent)">u</text>
  <circle cx="180" cy="45" r="14" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="180" y="49" text-anchor="middle" fill="var(--dia-stroke)">v</text>
  <line x1="94" y1="45" x2="166" y2="45" stroke="var(--dia-stroke)"/>
  <text x="40" y="20" fill="var(--dia-stroke-soft)">远离的 n-sz[v] 个点</text>
  <text x="150" y="80" fill="var(--dia-green)">靠近的 sz[v] 个点</text>
</svg>
<p class="figure-caption">根从 u 换到 v：v 子树内 sz[v] 个点距离 -1，其余 n-sz[v] 个点距离 +1。</p>
</div>

## 适用问题

- 每个点到所有点的距离和。
- 每个点为根时树的高度 / 最大深度。
- 每个点为根时的某种计数或权值和。

## 易错提醒

- 第一次 DFS 求子树信息，第二次 DFS **传递父方向信息**，顺序不能反。
- 换根公式要正确刻画「哪些点变近、变远」，推错则全盘皆错。
- `dfs2` 中先用父节点 `ans[u]` 算出 `ans[v]`，再递归 `v`。
- 注意根节点答案的初始化。

## 小结

- 换根 DP 求「每个点为根」的答案，两次 DFS $O(n)$。
- DFS1 算子树信息，DFS2 自顶向下传父方向信息并增量换根。
- 核心是推出 $O(1)$ 的换根公式（谁变近、谁变远）。
