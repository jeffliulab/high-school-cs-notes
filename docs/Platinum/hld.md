# 重链剖分

> **难度**：⭐⭐⭐⭐⭐
> **前置知识**：[线段树进阶应用](segtree_applications.md)、[欧拉序](../Gold/euler_tour.md)、[倍增](binary_jumping.md)

重链剖分（HLD）把树拆成若干条「重链」，使**任意一条树上路径**都能分解为 $O(\log n)$ 段连续区间，于是用线段树即可做**路径修改 / 路径查询**。

## 重儿子与重链

- **重儿子**：一个节点子树最大的那个孩子。
- **重边**：连向重儿子的边；**重链**：由重边连成的一条链。
- 每个节点到根的路径上，最多经过 $O(\log n)$ 条重链（每跳到一条新链，子树大小至少翻倍）。

<div class="diagram">
<svg viewBox="0 0 400 185" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <!-- light edges (thin grey) -->
  <g stroke="var(--dia-stroke-soft)" stroke-dasharray="3 2">
    <line x1="200" y1="30" x2="120" y2="75"/><line x1="120" y1="80" x2="70" y2="125"/><line x1="200" y1="80" x2="290" y2="125"/>
  </g>
  <!-- heavy chains (thick colored) -->
  <g stroke-width="4" fill="none">
    <path d="M200,30 L200,80 L200,130 L200,170" stroke="var(--dia-accent)"/>
    <path d="M120,75 L120,125 L120,170" stroke="var(--dia-blue)"/>
    <path d="M290,125 L290,170" stroke="var(--dia-green)"/>
  </g>
  <!-- nodes -->
  <g fill="var(--dia-bg-card)" stroke="var(--dia-stroke)">
    <circle cx="200" cy="30" r="13"/><circle cx="200" cy="80" r="13"/><circle cx="200" cy="130" r="13"/><circle cx="200" cy="170" r="11"/>
    <circle cx="120" cy="75" r="13"/><circle cx="120" cy="125" r="13"/><circle cx="120" cy="170" r="11"/>
    <circle cx="70" cy="125" r="11"/><circle cx="290" cy="125" r="13"/><circle cx="290" cy="170" r="11"/>
  </g>
  <text x="245" y="34" fill="var(--dia-accent)" font-size="10">重链1</text>
  <text x="60" y="70" fill="var(--dia-blue)" font-size="10">重链2</text>
  <text x="305" y="120" fill="var(--dia-green)" font-size="10">重链3</text>
</svg>
<p class="figure-caption">重链剖分：粗实线是重链（连重儿子），细虚线是轻边。同一条重链的节点在 DFS 序中连续，于是树上路径被拆成 O(log n) 段连续区间，交给线段树处理。</p>
</div>

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
