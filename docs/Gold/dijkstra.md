# 非负权最短路

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[优先队列](../Silver/priority_queues.md)、[图的遍历](../Silver/graph_traversal.md)

Dijkstra 算法求**边权非负**图的单源最短路。用优先队列实现，复杂度 $O((V+E)\log V)$。

## 算法思想

从起点开始，每次取出**当前距离最小**的未确定点，用它去「松弛」邻居（尝试更新更短距离）。因为权非负，一旦一个点被取出，它的距离就已最终确定。

<div class="diagram">
<svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- edges with weights -->
  <g stroke="var(--dia-stroke)">
    <line x1="55" y1="80" x2="180" y2="40"/><line x1="55" y1="80" x2="180" y2="120"/>
    <line x1="180" y1="40" x2="180" y2="120"/><line x1="180" y1="40" x2="330" y2="80"/><line x1="180" y1="120" x2="330" y2="80"/>
  </g>
  <g fill="var(--dia-stroke-soft)" font-size="10">
    <text x="105" y="50">2</text><text x="105" y="115">5</text><text x="188" y="83">1</text><text x="265" y="50">3</text><text x="265" y="115">2</text>
  </g>
  <!-- nodes with dist -->
  <circle cx="55" cy="80" r="17" fill="var(--dia-accent)" fill-opacity="0.25" stroke="var(--dia-accent)"/>
  <g fill="var(--dia-blue)" fill-opacity="0.15" stroke="var(--dia-blue)"><circle cx="180" cy="40" r="17"/><circle cx="180" cy="120" r="17"/><circle cx="330" cy="80" r="17"/></g>
  <text x="55" y="84" text-anchor="middle" fill="var(--dia-accent)">S:0</text>
  <g text-anchor="middle" fill="var(--dia-blue)"><text x="180" y="44">A:2</text><text x="180" y="124">B:3</text><text x="330" y="84">C:5</text></g>
  <text x="210" y="150" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="10">B 经 A 松弛：min(5, 2+1)=3；C 经 A：2+3=5</text>
</svg>
<p class="figure-caption">Dijkstra 逐点确定最短距离：从 S(0) 松弛得 A=2、B=5，再用已定的 A 松弛 B 为 2+1=3、C 为 2+3=5——每次取最小未定点扩展。</p>
</div>

## 优先队列实现

```cpp
vector<pair<int,int>> adj[N];     // adj[u] = {(邻居, 边权)}
long long dist[N];

void dijkstra(int s, int n) {
    fill(dist, dist + n + 1, LLONG_MAX);
    priority_queue<pair<long long,int>,
                   vector<pair<long long,int>>,
                   greater<>> pq;          // 小根堆 (距离, 点)
    dist[s] = 0;
    pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;          // 过期项，跳过
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {     // 松弛
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}
```

## 关键细节：跳过过期项

同一个点可能多次入队（每次更新都入队一份）。取出时若 `d > dist[u]`，说明这是旧的、已被更优值取代的项，直接跳过。这保证复杂度正确。

## 为什么要求非负权

Dijkstra 依赖「取出的点距离已最终确定」这一性质。若存在负权边，一个已确定的点可能后来被更短路径更新，性质被破坏，结果错误。**有负权边需用 Bellman-Ford / SPFA**。

## 路径还原

记录每个点的前驱 `pre[v] = u`，从终点沿 `pre` 回溯即得路径。

```cpp
if (dist[u] + w < dist[v]) {
    dist[v] = dist[u] + w;
    pre[v] = u;
    pq.push({dist[v], v});
}
```

## 变体

- **多源最短路**：所有源点距离 0 一起入队。
- **分层图 / 状态最短路**：把「点 + 额外状态」作为新图的点（如「在点 u 且已用 k 次免费券」）。
- **次短路**：维护每个点的最短和次短距离。

## 易错提醒

- 仅适用**非负权**；有负权改用其他算法。
- 用小根堆，并**跳过过期项**（`d > dist[u]`）。
- `dist` 用 `long long`（边权累加可能很大）。
- 邻接表存 `{邻居, 权}`，无向图加两条边。

## 小结

- Dijkstra：非负权单源最短路，优先队列实现 $O((V+E)\log V)$。
- 每次取距离最小点松弛邻居；跳过过期堆项。
- 负权不可用；可扩展到多源、分层图、次短路。
