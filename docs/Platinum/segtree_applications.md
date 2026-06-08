# 线段树进阶应用

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[单点修改区间和](../Gold/point_update_range_sum.md)、递归

线段树是白金级的主力数据结构，支持**区间查询 + 区间/单点修改**，$O(\log n)$。本页是线段树的基础模板与常见变体（区间最值、懒标记区间加）。

## 线段树结构

把数组建成一棵二叉树，每个节点代表一个区间，存该区间的聚合值（和/最值）。叶子是单个元素，内部节点合并左右孩子。共 $O(n)$ 个节点。

<div class="diagram">
<svg viewBox="0 0 440 180" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="10">
  <!-- edges -->
  <g stroke="var(--dia-stroke-soft)">
    <line x1="220" y1="32" x2="120" y2="72"/><line x1="220" y1="32" x2="320" y2="72"/>
    <line x1="120" y1="92" x2="70" y2="132"/><line x1="120" y1="92" x2="170" y2="132"/>
    <line x1="320" y1="92" x2="270" y2="132"/><line x1="320" y1="92" x2="370" y2="132"/>
  </g>
  <!-- root -->
  <rect x="180" y="18" width="80" height="26" rx="3" fill="var(--dia-blue)" fill-opacity="0.15" stroke="var(--dia-blue)"/>
  <text x="220" y="35" text-anchor="middle" fill="var(--dia-blue)">[0,3]=15</text>
  <!-- level 1 -->
  <rect x="80" y="72" width="80" height="26" rx="3" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="120" y="89" text-anchor="middle" fill="var(--dia-stroke)">[0,1]=6</text>
  <rect x="280" y="72" width="80" height="26" rx="3" fill="var(--dia-accent-soft)" stroke="var(--dia-accent)"/>
  <text x="320" y="89" text-anchor="middle" fill="var(--dia-accent)">[2,3]=9</text>
  <!-- leaves -->
  <g fill="var(--dia-bg-card)" stroke="var(--dia-stroke)">
    <rect x="42" y="132" width="56" height="24" rx="3"/><rect x="142" y="132" width="56" height="24" rx="3"/>
    <rect x="242" y="132" width="56" height="24" rx="3"/><rect x="342" y="132" width="56" height="24" rx="3"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-stroke-soft)"><text x="70" y="148">[0]=2</text><text x="170" y="148">[1]=4</text><text x="270" y="148">[2]=5</text><text x="370" y="148">[3]=4</text></g>
  <text x="220" y="174" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="9">每个内部节点 = 左右孩子之和；查询/修改沿树高 O(log n) 条路径走</text>
</svg>
<p class="figure-caption">线段树：叶子是原数组元素，每个内部节点存其区间的聚合值（这里是和）。查询 [2,3] 直接读高亮节点；任意区间最多拆成 O(log n) 个节点。</p>
</div>

## 基础：单点修改 + 区间查询

以**区间和**为例（节点 1 为根，区间 $[l, r]$）：

```cpp
long long tree[4 * N];

void update(int node, int l, int r, int pos, long long val) {
    if (l == r) { tree[node] = val; return; }
    int mid = (l + r) / 2;
    if (pos <= mid) update(2*node, l, mid, pos, val);
    else update(2*node+1, mid+1, r, pos, val);
    tree[node] = tree[2*node] + tree[2*node+1];   // 上推
}

long long query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;               // 不相交
    if (ql <= l && r <= qr) return tree[node];     // 完全覆盖
    int mid = (l + r) / 2;
    return query(2*node, l, mid, ql, qr)
         + query(2*node+1, mid+1, r, ql, qr);
}
```

把 `+` 换成 `max`/`min`（不相交时返回 $-\infty$/$+\infty$）即得**区间最值**线段树。

## 懒标记：区间修改 + 区间查询

「区间整体加」需要**懒标记（lazy propagation）**——把修改暂存在节点上，下推时才作用到孩子：

```cpp
long long tree[4*N], lazy[4*N];

void push_down(int node, int l, int r) {
    if (lazy[node]) {
        int mid = (l + r) / 2;
        // 把懒标记下放给左右孩子
        apply(2*node, l, mid, lazy[node]);
        apply(2*node+1, mid+1, r, lazy[node]);
        lazy[node] = 0;
    }
}
void apply(int node, int l, int r, long long add) {
    tree[node] += add * (r - l + 1);   // 区间和：每个元素加 add
    lazy[node] += add;
}
void update(int node, int l, int r, int ql, int qr, long long add) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { apply(node, l, r, add); return; }
    push_down(node, l, r);
    int mid = (l + r) / 2;
    update(2*node, l, mid, ql, qr, add);
    update(2*node+1, mid+1, r, ql, qr, add);
    tree[node] = tree[2*node] + tree[2*node+1];
}
```

## 常见应用

- 区间和/最值/最大子段和（节点存更丰富的信息合并）。
- **区间赋值**（lazy 存「赋值」而非「加」）。
- 配合 [欧拉序](../Gold/euler_tour.md) 做子树操作、配合 [重链剖分](hld.md) 做路径操作。
- 权值线段树：在值域上建树，求第 K 小、区间排名。

## 易错提醒

- 数组开 **`4*N`**（线段树节点数上界）。
- 懒标记**查询和修改都要先 `push_down`**。
- 区间最值的「不相交返回值」要用恒等元（$-\infty$/$+\infty$/0）。
- 合并左右孩子的方式（和/max）要与查询一致。

## 小结

- 线段树：区间查询 + 修改，$O(\log n)$，节点数 $4n$。
- 单点改靠递归上推；**区间改靠懒标记**（修改/查询前 push_down）。
- 是 HLD、欧拉序、权值线段树等众多 Platinum 技巧的底座。
