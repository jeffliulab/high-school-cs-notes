# 图的遍历

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[图论入门](../Bronze/intro_graphs.md)、队列/递归

银级深化图遍历：用 **DFS/BFS** 解决连通性、可达性、**最短步数（无权图 BFS）**等问题。模板务必写到熟练。

## 邻接表 + DFS

```cpp
vector<int> adj[100005];
bool vis[100005];

void dfs(int u) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) dfs(v);
    }
}
```

DFS 适合：判连通、找连通块、检测环、求树的子树信息。

## 邻接表 + BFS

```cpp
#include <queue>
int dist[100005];

void bfs(int s) {
    queue<int> q;
    fill(dist, dist + n + 1, -1);   // -1 表示未访问
    dist[s] = 0;
    q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;   // 层数 = 最短边数
                q.push(v);
            }
        }
    }
}
```

<div class="diagram">
<svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- layer separators -->
  <g stroke="var(--dia-rule)" stroke-dasharray="3 3"><line x1="110" y1="15" x2="110" y2="155"/><line x1="230" y1="15" x2="230" y2="155"/><line x1="350" y1="15" x2="350" y2="155"/></g>
  <g text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="10"><text x="55" y="28">dist 0</text><text x="170" y="28">dist 1</text><text x="290" y="28">dist 2</text></g>
  <!-- edges -->
  <g stroke="var(--dia-stroke)">
    <line x1="55" y1="85" x2="170" y2="55"/><line x1="55" y1="85" x2="170" y2="115"/>
    <line x1="170" y1="55" x2="290" y2="55"/><line x1="170" y1="115" x2="290" y2="120"/><line x1="170" y1="55" x2="290" y2="120"/>
  </g>
  <!-- nodes -->
  <circle cx="55" cy="85" r="16" fill="var(--dia-accent)" fill-opacity="0.25" stroke="var(--dia-accent)"/>
  <g fill="var(--dia-blue)" fill-opacity="0.15" stroke="var(--dia-blue)"><circle cx="170" cy="55" r="16"/><circle cx="170" cy="115" r="16"/></g>
  <g fill="var(--dia-green)" fill-opacity="0.15" stroke="var(--dia-green)"><circle cx="290" cy="55" r="16"/><circle cx="290" cy="120" r="16"/></g>
  <text x="55" y="89" text-anchor="middle" fill="var(--dia-accent)">S</text>
  <g text-anchor="middle" fill="var(--dia-blue)"><text x="170" y="59">1</text><text x="170" y="119">1</text></g>
  <g text-anchor="middle" fill="var(--dia-green)"><text x="290" y="59">2</text><text x="290" y="124">2</text></g>
</svg>
<p class="figure-caption">BFS 从起点 S 一层层向外扩展，dist 标注到 S 的最短边数：先访问所有 1 步可达点，再访问 2 步可达点。</p>
</div>

> **BFS 的核心价值**：在**无权图**上，从起点 BFS 得到的 `dist[v]` 就是到每个点的**最短边数**。DFS 做不到这点。

## 连通块计数

```cpp
int comp = 0;
for (int i = 1; i <= n; i++)
    if (!vis[i]) { comp++; dfs(i); }
```

## 给连通块染色 / 标号

遍历时给同一连通块的点打同一个标号，便于后续查询「两点是否连通」：

```cpp
int color[100005];
void dfs(int u, int c) {
    color[u] = c;
    for (int v : adj[u]) if (!color[v]) dfs(v, c);
}
// 主程序：对每个未染色点用新颜色 dfs
```

## 二分图判定（染色法）

相邻点染不同色，若冲突则非二分图：

```cpp
int col[100005];   // 0 未染, 1/2 两色
bool ok = true;
void dfs(int u, int c) {
    col[u] = c;
    for (int v : adj[u]) {
        if (!col[v]) dfs(v, 3 - c);     // 染相反色
        else if (col[v] == c) ok = false; // 同色相邻 → 矛盾
    }
}
```

## DFS vs BFS 选择

| 需求 | 用 |
| --- | --- |
| 无权图最短步数 | **BFS** |
| 连通块 / 可达性 | 都行 |
| 子树信息 / 递归结构 | DFS |
| 防止深递归栈溢出 | BFS |

## 易错提醒

- 无向图加边两个方向；`vis`/`dist` 标记别漏。
- 点数大、图呈链状时 DFS 递归可能**栈溢出**，改 BFS 或手动栈。
- BFS 求最短路只对**无权（或等权）**图成立；带权要用 Dijkstra（Gold）。
- 多组数据记得重置 `vis`、`dist`、`adj`。

## 小结

- DFS（递归）与 BFS（队列）是图遍历两大模板。
- **无权图最短步数用 BFS**：`dist[v]=dist[u]+1`。
- 应用：连通块计数、染色标号、二分图判定。
