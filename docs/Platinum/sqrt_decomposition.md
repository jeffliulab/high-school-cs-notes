# 分块

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[前缀和入门](../Silver/prefix_sums.md)

分块（Sqrt Decomposition）把序列分成约 $\sqrt n$ 个块，每块维护汇总信息。它牺牲一点复杂度（$O(\sqrt n)$ 而非 $O(\log n)$）换取**极强的通用性**——许多线段树难维护的操作，分块都能暴力支持。

## 核心思想

把长度 $n$ 的数组分成大小约 $\sqrt n$ 的块。一次区间操作：

- **整块**：直接用块的汇总值/懒标记，$O(1)$ 每块，共 $O(\sqrt n)$ 块。
- **零散两端**：暴力逐元素处理，每端最多 $\sqrt n$ 个。

总复杂度每次操作 $O(\sqrt n)$。

```cpp
int block;                      // 块大小 ≈ sqrt(n)
int belong[N];                  // belong[i] = i 所在块编号
long long blockSum[N], lazy[N]; // 每块的和、懒加标记

void rangeAdd(int l, int r, long long v) {
    int bl = belong[l], br = belong[r];
    if (bl == br) {                         // 同块，暴力
        for (int i = l; i <= r; i++) a[i] += v, blockSum[bl] += v;
        return;
    }
    for (int i = l; belong[i] == bl; i++) a[i] += v, blockSum[bl] += v;   // 左零散
    for (int i = r; belong[i] == br; i--) a[i] += v, blockSum[br] += v;   // 右零散
    for (int b = bl + 1; b < br; b++) lazy[b] += v;                       // 整块打标记
}

long long rangeSum(int l, int r) {
    int bl = belong[l], br = belong[r];
    long long s = 0;
    if (bl == br) {
        for (int i = l; i <= r; i++) s += a[i] + lazy[bl];
        return s;
    }
    for (int i = l; belong[i] == bl; i++) s += a[i] + lazy[bl];
    for (int i = r; belong[i] == br; i--) s += a[i] + lazy[br];
    for (int b = bl + 1; b < br; b++) s += blockSum[b] + lazy[b] * block;
    return s;
}
```

## 为什么块大小取 √n

设块大小 $B$，则块数 $n/B$。一次操作代价 $O(B + n/B)$（零散 + 整块），由均值不等式，$B=\sqrt n$ 时取最小 $O(\sqrt n)$。

## 分块的威力：维护复杂信息

线段树要求信息可「快速合并」；分块不需要——每块可维护**排序后的副本、众数、出现次数表**等任意结构，整块查询直接在块内二分/查表。例如：

- 「区间内 ≤ x 的元素个数」：每块存排序副本，整块二分。
- 「区间众数」「区间第 K 大」等线段树难做的，分块都能上。

## 莫队算法（分块的近亲）

[莫队](dc_static_range.md) 把**查询**按块排序，使两个指针移动总量 $O((n+q)\sqrt n)$，是处理静态区间查询的另一利器。

## 易错提醒

- 块大小取 $\sqrt n$ 附近；可微调以优化常数。
- 零散端和整块的处理别重叠或遗漏（`bl == br` 要特判）。
- 整块的懒标记别忘了在零散查询时也加上。
- 复杂度 $O(\sqrt n)$ 比线段树大，$n$ 很大时注意是否够快。

## 小结

- 分块把数组分成 $\sqrt n$ 块，整块 $O(1)$ + 零散暴力，每次操作 $O(\sqrt n)$。
- 块大小取 $\sqrt n$ 使总代价最小。
- 通用性强——能维护线段树难处理的信息；莫队是其查询版近亲。
