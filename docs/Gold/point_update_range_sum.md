# 单点修改区间和

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[前缀和入门](../Silver/prefix_sums.md)、[位运算入门](../Silver/bitwise.md)

当数组**既要单点修改、又要区间求和**时，前缀和失效（每次修改要 $O(n)$ 重算）。**树状数组（BIT / Fenwick Tree）** 让两种操作都是 $O(\log n)$。

## 为什么需要 BIT

| | 前缀和 | 树状数组 |
| --- | --- | --- |
| 区间求和 | $O(1)$ | $O(\log n)$ |
| 单点修改 | $O(n)$ ✗ | $O(\log n)$ ✔ |

有修改的场景，树状数组是首选的轻量结构。

## 树状数组实现

核心是 `lowbit(x) = x & (-x)`（取最低位的 1）。下标**从 1 开始**：

```cpp
int tree[N], n;

void update(int i, int delta) {        // 第 i 个元素 += delta
    for (; i <= n; i += i & (-i))
        tree[i] += delta;
}

long long query(int i) {               // 前 i 个元素之和 [1, i]
    long long s = 0;
    for (; i > 0; i -= i & (-i))
        s += tree[i];
    return s;
}

long long rangeSum(int l, int r) {     // 区间 [l, r]
    return query(r) - query(l - 1);
}
```

每次操作沿 `lowbit` 跳跃，至多 $O(\log n)$ 步。

## 建树

逐个 `update` 即 $O(n\log n)$；要 $O(n)$ 建树可用专门方法，但前者通常够用。

```cpp
for (int i = 1; i <= n; i++) update(i, a[i]);
```

## 应用：统计逆序对

> 求 $i < j$ 且 $a_i > a_j$ 的对数。

从左到右，对每个 $a_i$ 查询「已出现的、比它大的元素个数」。值域大时先 [坐标压缩](../Silver/custom_comparators.md)：

```cpp
long long inv = 0;
for (int i = 0; i < n; i++) {
    int v = compressed[i];                 // 1..n
    inv += query(n) - query(v);            // 已出现且 > v 的个数
    update(v, 1);
}
```

## 应用：动态前缀计数 / 第 K 小

BIT 上可二分求「第 K 小」（值域 BIT），处理动态排名问题。

## BIT vs 线段树

树状数组代码短、常数小，适合**前缀和/单点改**这类问题；更复杂的区间操作（区间改、区间最值）用[线段树](../Platinum/segtree_applications.md)。区间修改 + 区间和也可用两个 BIT 实现。

## 易错提醒

- 树状数组下标**从 1 开始**，0 是终止条件。
- 值域大必须先离散化再用作下标。
- 区间和 `query(r) - query(l-1)`，注意 `l-1` 可能为 0（返回 0，正确）。
- 求和用 `long long`。

## 小结

- 树状数组：单点改 + 区间和，均 $O(\log n)$，靠 `lowbit` 跳跃。
- 下标从 1 起；区间和用两次前缀相减。
- 经典应用：逆序对、动态前缀计数、第 K 小（配合离散化）。
