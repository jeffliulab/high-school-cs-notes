# 图论入门

> **难度**：⭐⭐☆☆☆
> **前置知识**：[数据结构入门](intro_data_structures.md)、递归

图由**点（顶点）**和**边**组成，能建模道路、关系、网格等。铜级的图论主要是「表示图」和「找连通块」（用 DFS/BFS 或 flood fill 的思想）。

## 图的基本概念

- **顶点（vertex）**、**边（edge）**。
- **无向图**：边双向；**有向图**：边单向。
- **连通块（连通分量）**：互相可达的顶点构成的一组。
- **度**：一个顶点连了几条边。

## 图的表示：邻接表

最常用，用 `vector` 数组存每个点的邻居：

```cpp
vector<int> adj[100005];     // adj[u] 存 u 的所有邻居
// 读入无向边 (u, v)
adj[u].push_back(v);
adj[v].push_back(u);         // 无向图两个方向都加
```

邻接矩阵 `bool g[N][N]` 仅适合点数很小（$N \le 1000$）的情形。

## DFS：深度优先遍历

沿一条路走到底再回头，常用递归实现：

```cpp
bool vis[100005];
void dfs(int u) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) dfs(v);
    }
}
```

## BFS：广度优先遍历

一层层向外扩展，用队列：

```cpp
#include <queue>
void bfs(int start) {
    queue<int> q;
    q.push(start);
    vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!vis[v]) {
                vis[v] = true;
                q.push(v);
            }
        }
    }
}
```

## 数连通块个数（铜级招牌题）

对每个未访问的点发起一次遍历，遍历几次就有几个连通块：

```cpp
int components = 0;
for (int i = 1; i <= n; i++) {
    if (!vis[i]) {
        components++;
        dfs(i);              // 把整个连通块标记掉
    }
}
cout << components << "\n";
```

## 网格也是图

网格题里每个格子是一个点，上下左右相邻即有边——用 [洪水填充](../Silver/flood_fill.md) 思想 DFS/BFS 即可（铜级常考「数岛屿/区域个数」）。

```cpp
int dx[] = {-1,1,0,0}, dy[] = {0,0,-1,1};
void floodfill(int r, int c) {
    vis[r][c] = true;
    for (int d = 0; d < 4; d++) {
        int nr = r+dx[d], nc = c+dy[d];
        if (nr>=0 && nr<R && nc>=0 && nc<C && !vis[nr][nc] && grid[nr][nc]=='#')
            floodfill(nr, nc);
    }
}
```

## 易错提醒

- 无向图加边要加**两个方向**。
- 别忘 `vis[]` 标记，否则无限循环/重复访问。
- DFS 递归过深（点数 $10^5$ 且链状）可能栈溢出，必要时改 BFS。
- 顶点编号从 0 还是 1 开始要与读入一致。

## 小结

- 图 = 点 + 边；用**邻接表** `vector<int> adj[]` 存储。
- **DFS（递归）/ BFS（队列）** 遍历图，靠 `vis[]` 防重复。
- 铜级核心应用：**数连通块**、网格区域计数（flood fill）。
