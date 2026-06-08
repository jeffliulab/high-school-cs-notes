# 无权最短路

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[图的遍历](../Silver/graph_traversal.md)

在边权都相同（无权）的图上，**BFS** 就能求最短路。本页深化 BFS 求最短路，并介绍 0-1 BFS 处理边权为 0/1 的情形。

## BFS 求最短路

无权图中，BFS 按「距起点的层数」逐层扩展，第一次到达某点时的层数就是最短距离：

```cpp
vector<int> adj[N];
int dist[N];

void bfs(int s) {
    fill(dist, dist + n + 1, -1);
    queue<int> q;
    dist[s] = 0; q.push(s);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {            // 第一次到达
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}
```

正确性：BFS 保证按距离递增顺序访问，先到的一定最短。

## 网格上的 BFS 最短路

迷宫「从起点到终点最少几步」：把每格当点，方向数组生成邻居：

```cpp
int dist[1005][1005];
int dx[]={-1,1,0,0}, dy[]={0,0,-1,1};
// BFS 从 (sr,sc)，dist 初始化 -1
queue<pair<int,int>> q;
dist[sr][sc]=0; q.push({sr,sc});
while(!q.empty()){
    auto [r,c]=q.front(); q.pop();
    for(int d=0;d<4;d++){
        int nr=r+dx[d], nc=c+dy[d];
        if(in_bounds && grid[nr][nc]!='#' && dist[nr][nc]==-1){
            dist[nr][nc]=dist[r][c]+1;
            q.push({nr,nc});
        }
    }
}
```

## 多源 BFS

多个起点同时出发（求每个点到「最近的某类点」的距离）：把所有源点**一起入队**，`dist` 设 0：

```cpp
for (auto& s : sources) { dist[s] = 0; q.push(s); }
// 之后照常 BFS
```

## 0-1 BFS

边权只有 0 或 1 时，用**双端队列**：权 0 的边从**队首**插入、权 1 的边从**队尾**插入，仍是 $O(V+E)$：

```cpp
deque<int> dq;
dist[s] = 0; dq.push_front(s);
while (!dq.empty()) {
    int u = dq.front(); dq.pop_front();
    for (auto [v, w] : adj[u]) {           // w 为 0 或 1
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            if (w == 0) dq.push_front(v);
            else dq.push_back(v);
        }
    }
}
```

## 何时用哪种

| 图 | 最短路算法 |
| --- | --- |
| 无权（等权） | **BFS** $O(V+E)$ |
| 边权 0/1 | **0-1 BFS**（双端队列） |
| 非负权 | [Dijkstra](dijkstra.md) |

## 易错提醒

- BFS 求最短路只对**无权/等权**成立；带权用 Dijkstra。
- `dist` 初始化为 -1 或 INF 表示未访问，第一次到达才赋值。
- 多源 BFS 要把所有源点先入队。
- 大网格 BFS 注意数组开够、用队列防栈溢出。

## 小结

- 无权图最短路用 **BFS**，层数即距离，$O(V+E)$。
- 多源问题把所有起点一起入队。
- 边权 0/1 用 **0-1 BFS**（双端队列）；非负权用 Dijkstra。
