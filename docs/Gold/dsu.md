# 并查集

> **难度**：⭐⭐⭐☆☆
> **前置知识**：数组、[图论入门](../Bronze/intro_graphs.md)

并查集（DSU / Union-Find）维护「元素的分组」，支持两种近 $O(1)$ 操作：合并两组、查询两元素是否同组。是处理连通性、最小生成树（Kruskal）的核心。

## 核心操作

- `find(x)`：找 $x$ 所在集合的**代表元（根）**。
- `union(x, y)`：合并 $x$、$y$ 所在的两个集合。
- 判断同组：`find(x) == find(y)`。

## 实现（路径压缩 + 按秩合并）

```cpp
int parent[N], rnk[N];

void init(int n) {
    for (int i = 0; i < n; i++) { parent[i] = i; rnk[i] = 0; }
}

int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);     // 路径压缩：直接挂到根
    return parent[x];
}

void unite(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx == ry) return;
    if (rnk[rx] < rnk[ry]) swap(rx, ry);  // 按秩合并：矮树挂高树下
    parent[ry] = rx;
    if (rnk[rx] == rnk[ry]) rnk[rx]++;
}
```

两项优化合用后，每次操作均摊近 $O(\alpha(n))$（反阿克曼，实际可视为常数）。

## 应用：连通块数量 / 动态连通性

```cpp
int components = n;
for (each edge (u, v)) {
    if (find(u) != find(v)) {
        unite(u, v);
        components--;        // 每次有效合并减少一个连通块
    }
}
```

## 应用：判断加边是否成环

若一条边的两端**已在同一集合**，加入它会形成环——这正是 [最小生成树](mst.md) Kruskal 算法的判断依据。

## 维护额外信息

可在并查集上维护每个集合的**大小**、**元素和**等：

```cpp
int sz[N];      // init: sz[i]=1
void unite(int x, int y){
    int rx=find(x), ry=find(y);
    if(rx==ry) return;
    parent[ry]=rx;
    sz[rx]+=sz[ry];           // 合并大小
}
// 集合大小：sz[find(x)]
```

> 带权并查集（维护到根的关系，如距离/奇偶）是进阶用法，可处理「关系传递」类问题。

## 易错提醒

- 别忘 `init` 初始化 `parent[i]=i`。
- `find` 一定要带**路径压缩**，否则可能退化成链 $O(n)$。
- 合并/查询都要先 `find` 到根再操作，别直接比较 `parent`。
- 维护大小/和等附加信息时只在**根**上更新。

## 小结

- 并查集维护分组，`find`（找根）+ `unite`（合并），均摊近 $O(1)$。
- 路径压缩 + 按秩合并缺一不可（至少要路径压缩）。
- 应用：连通块计数、动态连通性、Kruskal 判环、维护集合大小/和。
