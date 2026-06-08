# 动态开点线段树

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[线段树进阶应用](segtree_applications.md)

当**值域极大**（如 $10^9$）但实际操作很少时，普通线段树开 $4\times10^9$ 节点不可行。动态开点线段树**只在需要时才创建节点**，空间随操作数增长。

## 何时需要

- 值域到 $10^9$ 甚至 $10^{18}$，但只有 $\le 10^5$ 次操作。
- 不方便/不能离线离散化（如强制在线）。

朴素线段树空间正比于值域；动态开点空间 $O(q \log V)$，与值域无关。

## 实现：按需创建孩子

节点不再用 `2*node` 的隐式编号，而是显式存左右孩子指针（下标）：

```cpp
struct Node { int lc = 0, rc = 0; long long sum = 0; };
Node t[40 * Q];      // 每次操作约新建 log V 个节点
int cnt = 1;         // 1 为根，0 表示空

void update(int& node, long long l, long long r, long long pos, long long val) {
    if (!node) node = ++cnt;           // 按需创建
    if (l == r) { t[node].sum += val; return; }
    long long mid = (l + r) / 2;
    if (pos <= mid) update(t[node].lc, l, mid, pos, val);
    else update(t[node].rc, mid + 1, r, pos, val);
    t[node].sum = t[t[node].lc].sum + t[t[node].rc].sum;
}

long long query(int node, long long l, long long r, long long ql, long long qr) {
    if (!node || qr < l || r < ql) return 0;     // 空节点贡献 0
    if (ql <= l && r <= qr) return t[node].sum;
    long long mid = (l + r) / 2;
    return query(t[node].lc, l, mid, ql, qr)
         + query(t[node].rc, mid + 1, r, ql, qr);
}
```

调用时 `l, r` 是整个值域 $[1, V]$。空节点（编号 0）天然表示「全 0 区间」，查询直接返回 0。

## 空间估计

每次单点修改最多新建 $O(\log V)$ 个节点。$q$ 次操作总节点数约 $q\log V$，数组开 `40 * Q` 左右（$\log_2 10^9 \approx 30$，留余量）。

## 关联结构

- **权值线段树**用动态开点处理大值域的第 K 小、排名。
- **线段树合并**：两棵动态开点线段树可 $O(节点数)$ 合并，是树上数颜色等问题的利器。
- **可持久化线段树（主席树）**：每次修改新建 $O(\log)$ 个节点，保留历史版本。

## 动态开点 vs 离散化

若所有操作可**离线**拿到，**离散化 + 普通线段树**通常更简单、常数更小。动态开点的价值在于**在线**或离散化困难时。

## 易错提醒

- 节点数组要开够（约 $q \times \log V$），否则越界。
- 用引用传 `int& node` 才能在递归中创建并回写孩子编号。
- 空节点（0）查询返回恒等元；别误访问 `t[0]` 的真实数据。
- 值域用 `long long`（可能超 int）。

## 小结

- 动态开点线段树**按需建节点**，空间 $O(q\log V)$，与值域无关。
- 适合大值域 + 少操作 + 在线/难离散化的场景。
- 是权值线段树、线段树合并、主席树的基础。
