# 洪水填充

> **难度**：⭐⭐☆☆☆
> **前置知识**：[图的遍历](graph_traversal.md)

洪水填充（Flood Fill）是在**网格**上做 DFS/BFS：从一个格子出发，蔓延到所有相连的同类格子。用于数连通区域、求区域大小、迷宫等。

## 网格即图

把每个格子看作顶点，**上下左右相邻**的同类格子之间有边。于是图遍历模板直接套用，只是「邻居」由方向数组生成。

## 方向数组

```cpp
int dx[] = {-1, 1, 0, 0};    // 上下左右
int dy[] = {0, 0, -1, 1};
```

需要八连通时再加四个对角方向。

## DFS 版洪水填充

```cpp
int R, C;
char grid[1005][1005];
bool vis[1005][1005];

void fill(int r, int c) {
    vis[r][c] = true;
    for (int d = 0; d < 4; d++) {
        int nr = r + dx[d], nc = c + dy[d];
        if (nr >= 0 && nr < R && nc >= 0 && nc < C
            && !vis[nr][nc] && grid[nr][nc] == '.') {   // 边界 + 未访问 + 同类
            fill(nr, nc);
        }
    }
}
```

## 数区域个数（招牌题）

对每个未访问的目标格发起一次填充：

```cpp
int regions = 0;
for (int i = 0; i < R; i++)
    for (int j = 0; j < C; j++)
        if (!vis[i][j] && grid[i][j] == '.') {
            regions++;
            fill(i, j);
        }
```

## 求每个区域的大小

让填充返回/累加格子数：

```cpp
int sz;
void fill(int r, int c) {
    vis[r][c] = true;
    sz++;                       // 计数
    for (int d = 0; d < 4; d++) { ... }
}
// 每次填充前 sz = 0，填完 sz 即区域大小，可取最大
```

## BFS 版（避免深递归栈溢出）

网格很大（如 $1000\times1000$）且区域呈长条时，DFS 递归可能爆栈，改用 BFS 队列：

```cpp
queue<pair<int,int>> q;
q.push({sr, sc}); vis[sr][sc] = true;
while (!q.empty()) {
    auto [r, c] = q.front(); q.pop();
    for (int d = 0; d < 4; d++) {
        int nr = r+dx[d], nc = c+dy[d];
        if (在界内 && !vis[nr][nc] && grid[nr][nc]=='.') {
            vis[nr][nc] = true;
            q.push({nr, nc});
        }
    }
}
```

## 易错提醒

- **边界检查**要在访问 `grid[nr][nc]` **之前**，否则越界。
- 标记 `vis` 要在入队/递归时就标，避免同一格重复入队。
- 区分四连通与八连通（题目要求）。
- 大网格优先 BFS 防栈溢出。

## 小结

- 洪水填充 = 网格上的 DFS/BFS，用方向数组生成邻居。
- 核心应用：数连通区域个数、求区域大小、迷宫可达。
- 大网格用 BFS 避免递归栈溢出；注意先判边界再访问。
