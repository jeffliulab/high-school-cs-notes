# 折半搜索

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[递归完全搜索](../Bronze/complete_search_recursion.md)、[有序数组二分](../Silver/binary_search_sorted.md)

折半搜索（Meet in the Middle）把指数级搜索的规模**对半砍**：枚举 $2^{n/2}$ 而非 $2^n$。适合 $n \approx 40$ 这种「暴力嫌大、DP 没状态」的尴尬规模。

## 核心思想

把 $n$ 个元素分成两半，各 $n/2$ 个。分别枚举每一半的所有 $2^{n/2}$ 种组合，再把两半的结果**合并**（排序 + 二分，或哈希）。

复杂度从 $O(2^n)$ 降到 $O(2^{n/2} \cdot \frac{n}{2})$。例如 $n=40$：$2^{40}\approx10^{12}$ 不可行，$2^{20}\approx10^6$ 轻松。

## 经典例：子集和等于目标

> $n \le 40$ 个数，问有多少子集的和等于 $T$。

```cpp
// 1) 枚举左半所有子集和，存入 vector
vector<long long> left;
int h = n / 2;
for (int S = 0; S < (1 << h); S++) {
    long long sum = 0;
    for (int i = 0; i < h; i++) if ((S >> i) & 1) sum += a[i];
    left.push_back(sum);
}

// 2) 枚举右半所有子集和，对每个在左半中二分找 T - sum
sort(left.begin(), left.end());
long long cnt = 0;
int rest = n - h;
for (int S = 0; S < (1 << rest); S++) {
    long long sum = 0;
    for (int i = 0; i < rest; i++) if ((S >> i) & 1) sum += a[h + i];
    long long need = T - sum;
    // 统计 left 中等于 need 的个数
    cnt += upper_bound(left.begin(), left.end(), need)
         - lower_bound(left.begin(), left.end(), need);
}
cout << cnt;
```

## 合并的两种方式

- **排序 + 二分**：一半排序，另一半逐个二分查找互补值（如上）。可处理「等于/小于等于 $T$」。
- **哈希表**：把一半的结果存进 `unordered_map` 计数，另一半查询。适合「精确相等」。

## 适用信号

- $n$ 在 **30~45** 之间。
- 问题是「选子集满足某和/某条件」，且**无法用背包 DP**（如值域极大、无法做 $O(nW)$）。

## 变体

- 求**最接近 $T$ 的子集和**：合并时二分找最接近值。
- 限制「恰好选 $k$ 个」：按 popcount 分组后再合并。
- 四数之和等问题：把 4 个数组分成 2+2。

## 易错提醒

- 两半枚举的下标范围别搞错（左 `[0, h)`、右 `[h, n)`）。
- 和可能很大，用 `long long`。
- 合并用二分时数组要先排序。
- 只在 $n$ 适中（约 ≤ 45）时用，太大仍不可行。

## 小结

- 折半搜索把 $2^n$ 降到 $2^{n/2}$，适合 $n\approx40$。
- 分两半各枚举 $2^{n/2}$，再用**排序+二分**或**哈希**合并。
- 信号：子集和/选择类问题且 $n$ 在 30~45、无法背包 DP。
