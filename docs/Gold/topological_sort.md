# 拓扑排序

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[图的遍历](../Silver/graph_traversal.md)

拓扑排序把**有向无环图（DAG）**的顶点排成一条线，使每条边都从前指向后。适合处理「依赖关系」「先后顺序」，也是 DAG 上 DP 的前提。

## 适用对象：DAG

拓扑排序仅对**有向无环图**存在。若图有环，则无法排序（环上的点互相依赖）。因此拓扑排序也可用来**判环**。

## Kahn 算法（BFS，基于入度）

1. 计算每个点的**入度**。
2. 把入度为 0 的点入队。
3. 反复取出队首加入结果，并把它的邻居入度减 1，减到 0 就入队。

```cpp
vector<int> adj[N];
int indeg[N];

vector<int> topoSort(int n) {
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (--indeg[v] == 0) q.push(v);
        }
    }
    return order;   // 若 order.size() < n，说明有环
}
```

> **判环**：若最终排进顺序的点数 `< n`，则图中有环。

## DFS 版（后序逆序）

DFS 完成一个点（其所有后继都处理完）时把它压栈，最后栈的逆序即拓扑序：

```cpp
bool vis[N];
vector<int> order;
void dfs(int u) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs(v);
    order.push_back(u);      // 后序加入
}
// 对所有未访问点 dfs，最后 reverse(order)
```

## 应用：DAG 上 DP

拓扑序保证「算一个点时其所有前驱已算好」，因此可在拓扑序上做 DP：

```cpp
// 求 DAG 最长路（每条边长 1）
vector<int> order = topoSort(n);
for (int u : order)
    for (int v : adj[u])
        dp[v] = max(dp[v], dp[u] + 1);
```

典型应用：求最长路径、统计路径数、课程安排、任务调度。

## 拓扑序不唯一

入度为 0 的点可能有多个，选取顺序不同得到不同的合法拓扑序。题目要求字典序最小时，把队列换成**优先队列**（小根堆）。

## 易错提醒

- 拓扑排序只适用 DAG；用「排出的点数 < n」来判环。
- Kahn 算法要先正确统计入度。
- DAG DP 必须在拓扑序上进行，否则前驱未就绪。
- 求字典序最小拓扑序用优先队列替代普通队列。

## 小结

- 拓扑排序：DAG 顶点线性化，边都从前指向后。
- **Kahn（入度 BFS）** 或 **DFS 后序逆序** 两种实现，均可判环。
- 是 DAG 上 DP（最长路、路径计数、调度）的前提。
