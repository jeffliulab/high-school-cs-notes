# 重链剖分

> **难度**：⭐⭐⭐⭐⭐
> **前置知识**：[线段树进阶应用](segtree_applications.md)、[欧拉序](../Gold/euler_tour.md)、[倍增](binary_jumping.md)

重链剖分（HLD）把树拆成若干条「重链」，使**任意一条树上路径**都能分解为 $O(\log n)$ 段连续区间，于是用线段树即可做**路径修改 / 路径查询**。

## 重儿子与重链

- **重儿子**：一个节点子树最大的那个孩子。
- **重边**：连向重儿子的边；**重链**：由重边连成的一条链。
- 每个节点到根的路径上，最多经过 $O(\log n)$ 条重链（每跳到一条新链，子树大小至少翻倍）。

## 两次 DFS

**DFS1**：算子树大小 `sz`、父亲 `fa`、深度 `dep`、重儿子 `son`。

**DFS2**：分配 DFS 序 `dfn`（同一条重链的 `dfn` 连续），记录每个点所在链的链顶 `top`。

```cpp
int sz[N], fa[N], dep[N], son[N];
int dfn[N], top[N], idx = 0;

void dfs1(int u, int p) {
    sz[u] = 1; fa[u] = p; son[u] = -1;
    for (int v : adj[u]) if (v != p) {
        dep[v] = dep[u] + 1;
        dfs1(v, u);
        sz[u] += sz[v];
        if (son[u] == -1 || sz[v] > sz[son[u]]) son[u] = v;  // 选重儿子
    }
}
void dfs2(int u, int t) {
    top[u] = t; dfn[u] = ++idx;
    if (son[u] != -1) dfs2(son[u], t);          // 重儿子延续当前链
    for (int v : adj[u])
        if (v != fa[u] && v != son[u]) dfs2(v, v);  // 轻儿子开新链
}
```

## 路径分解 + 线段树

把节点权按 `dfn` 放入线段树。处理路径 $(u, v)$ 时，反复把链顶更深的那个点跳到其链顶之上，每段 `[dfn[top[u]], dfn[u]]` 是线段树上的连续区间：

```cpp
long long pathQuery(int u, int v) {
    long long res = 0;
    while (top[u] != top[v]) {
        if (dep[top[u]] < dep[top[v]]) swap(u, v);
        res += seg.query(dfn[top[u]], dfn[u]);   // 当前链一段
        u = fa[top[u]];                          // 跳到上一条链
    }
    if (dep[u] > dep[v]) swap(u, v);
    res += seg.query(dfn[u], dfn[v]);            // 同链最后一段
    return res;
}
```

路径修改同理，把 `query` 换成区间 `update`。

## 支持的操作

- 路径上点权求和 / 最大值 / 区间加。
- 子树操作（子树对应 `[dfn[u], dfn[u]+sz[u]-1]` 一段连续区间，与欧拉序一致）。
- 求 LCA（路径分解的副产物：跳到同链后较浅者即 LCA）。

## 复杂度

每条路径分解为 $O(\log n)$ 段，每段线段树操作 $O(\log n)$，故路径操作 $O(\log^2 n)$。

## 易错提醒

- DFS2 必须**先递归重儿子**，才能保证重链 `dfn` 连续。
- 路径跳跃时每次把**链顶更深**的一端上移。
- 子树用 `[dfn[u], dfn[u]+sz[u]-1]`；路径用上面的分解。
- 注意点权 vs 边权（边权 HLD 把边权下放到深的端点，LCA 处不算）。

## 小结

- HLD 把树剖成重链，任意路径分解为 $O(\log n)$ 段连续 `dfn` 区间。
- 配线段树实现路径/子树的修改与查询，$O(\log^2 n)$。
- 两次 DFS：DFS1 求重儿子，DFS2 分配连续 `dfn` 与链顶 `top`。
