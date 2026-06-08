# 最长上升子序列

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[DP 入门](intro_dp.md)、[有序数组二分](../Silver/binary_search_sorted.md)

最长上升子序列（LIS）是经典 DP，有 $O(n^2)$ 和 $O(n\log n)$ 两种解法。后者的二分技巧应用广泛。

## 问题定义

给定序列，求最长的**严格递增子序列**（不要求连续）的长度。例如 `[3,1,4,1,5,9,2,6]` 的 LIS 是 `[1,4,5,9]` 或 `[1,4,5,6]`，长度 4。

## O(n²) DP

- 状态：`dp[i]` = 以 $a_i$ **结尾**的 LIS 长度。
- 转移：`dp[i] = 1 + max(dp[j])`，其中 $j < i$ 且 $a_j < a_i$。

```cpp
int ans = 0;
for (int i = 0; i < n; i++) {
    dp[i] = 1;
    for (int j = 0; j < i; j++)
        if (a[j] < a[i])
            dp[i] = max(dp[i], dp[j] + 1);
    ans = max(ans, dp[i]);
}
```

适用于 $n \le 5000$。

## O(n log n) 解法（二分）

维护数组 `tails`，`tails[k]` = 长度为 $k+1$ 的上升子序列的**最小可能结尾**。对每个元素，用二分找到它能更新的位置：

```cpp
vector<int> tails;
for (int x : a) {
    // 找第一个 >= x 的位置（严格递增用 lower_bound）
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) tails.push_back(x);   // 接到末尾，LIS 变长
    else *it = x;                                 // 替换，保持结尾尽量小
}
cout << tails.size();    // tails 长度即 LIS 长度
```

> `tails` 本身**不是** LIS，但它的**长度**就是 LIS 长度。核心思想：让每个长度的子序列结尾尽量小，给后续更多机会。

## 严格 vs 非严格

- **严格递增**（$a_j < a_i$）：用 `lower_bound`（找 ≥x）。
- **非严格**（允许相等，$\le$）：用 `upper_bound`（找 >x）。

## 常见变体

- **最长不下降子序列**：改用 `upper_bound`。
- **最长下降子序列**：把序列取反或反向。
- **二维偏序（如俄罗斯套娃）**：先按一维排序（相等时第二维降序处理），再对另一维求 LIS。

## 易错提醒

- $O(n\log n)$ 中 `tails` 是辅助数组，别误以为它是真正的 LIS 序列。
- 严格/非严格对应 `lower_bound`/`upper_bound`，别用反。
- 二维问题排序时，第一维相等的处理（第二维降序）能避免同一维被重复计入。

## 小结

- LIS：$O(n^2)$ DP（`dp[i]`=以 i 结尾）或 $O(n\log n)$ 二分（维护 `tails`）。
- 二分法：`tails[k]` 是长度 k+1 的最小结尾，长度即答案。
- 严格用 `lower_bound`、非严格用 `upper_bound`；二维问题先排序降一维。
