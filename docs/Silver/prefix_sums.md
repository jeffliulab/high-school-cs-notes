# 前缀和入门

> **难度**：⭐⭐☆☆☆
> **前置知识**：[数组](../Bronze/intro_data_structures.md)

前缀和让你在 $O(1)$ 时间内查询任意**区间和**，代价是 $O(n)$ 预处理。它把「反复求区间和」从 $O(nq)$ 降到 $O(n+q)$，是银级最基础的优化技巧。

## 核心思想

定义前缀和数组 $\text{pre}[i]$ = 前 $i$ 个元素之和：

$$\text{pre}[i] = a[0] + a[1] + \dots + a[i-1]$$

则区间 $[l, r]$（含两端，0 下标）之和为：

$$\sum_{i=l}^{r} a[i] = \text{pre}[r+1] - \text{pre}[l]$$

<div class="diagram">
<svg viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- a -->
  <text x="12" y="42" fill="var(--dia-stroke-soft)" font-size="11">a</text>
  <g fill="var(--dia-bg-card)" stroke="var(--dia-stroke)">
    <rect x="40" y="26" width="48" height="30"/><rect x="88" y="26" width="48" height="30"/><rect x="136" y="26" width="48" height="30"/><rect x="184" y="26" width="48" height="30"/><rect x="232" y="26" width="48" height="30"/></g>
  <g text-anchor="middle" fill="var(--dia-stroke)"><text x="64" y="46">2</text><text x="112" y="46">4</text><text x="160" y="46">1</text><text x="208" y="46">5</text><text x="256" y="46">3</text></g>
  <!-- pre -->
  <text x="6" y="104" fill="var(--dia-stroke-soft)" font-size="11">pre</text>
  <g fill="var(--dia-bg-card)" stroke="var(--dia-blue)">
    <rect x="16" y="88" width="48" height="30"/><rect x="64" y="88" width="48" height="30"/><rect x="112" y="88" width="48" height="30"/><rect x="160" y="88" width="48" height="30"/><rect x="208" y="88" width="48" height="30"/><rect x="256" y="88" width="48" height="30"/></g>
  <g text-anchor="middle" fill="var(--dia-blue)"><text x="40" y="108">0</text><text x="88" y="108">2</text><text x="136" y="108">6</text><text x="184" y="108">7</text><text x="232" y="108">12</text><text x="280" y="108">15</text></g>
  <g text-anchor="middle" fill="var(--dia-stroke-tertiary)" font-size="9"><text x="40" y="132">0</text><text x="88" y="132">1</text><text x="136" y="132">2</text><text x="184" y="132">3</text><text x="232" y="132">4</text><text x="280" y="132">5</text></g>
  <!-- highlight query [1,3] = pre[4]-pre[1] = 12-2 = 10 -->
  <rect x="88" y="22" width="144" height="38" fill="none" stroke="var(--dia-accent)" stroke-width="2"/>
  <text x="330" y="44" fill="var(--dia-accent)" font-size="11">区间[1,3]和</text>
  <text x="330" y="104" fill="var(--dia-accent)" font-size="11">=pre[4]−pre[1]</text>
  <text x="330" y="120" fill="var(--dia-accent)" font-size="11">=12−2=10</text>
</svg>
<p class="figure-caption">pre[i] 是前 i 个元素之和（pre[0]=0）。区间 [1,3] 之和 = pre[4]−pre[1] = 12−2 = 10，一次减法 O(1) 完成。</p>
</div>

## 实现

```cpp
int a[100005], pre[100005];
// 预处理：pre[0]=0, pre[i]=pre[i-1]+a[i-1]
pre[0] = 0;
for (int i = 1; i <= n; i++)
    pre[i] = pre[i - 1] + a[i - 1];

// 查询区间 [l, r]（0 下标，含端点）之和
int sum = pre[r + 1] - pre[l];
```

> 用「`pre` 比 `a` 多一位、`pre[0]=0`」的写法可避免边界特判，区间 $[l,r]$ 和恒为 `pre[r+1]-pre[l]`。

## 为什么快

- 朴素地对每次查询累加是 $O(n)$，$q$ 次查询共 $O(nq)$。
- 前缀和预处理 $O(n)$，之后每次查询 $O(1)$，总 $O(n+q)$。

数据量大、查询多时差距巨大。

## 例：多次区间和查询

```cpp
for (int i = 1; i <= n; i++) pre[i] = pre[i-1] + a[i-1];
while (q--) {
    int l, r; cin >> l >> r;        // 假设输入是 0 下标
    cout << pre[r+1] - pre[l] << "\n";
}
```

## 应用：统计「区间和满足条件」

前缀和常配合 `map` 解决「有多少子数组和等于 $k$」：

```cpp
// 子数组和 == k 的个数
map<long long, int> cnt;
cnt[0] = 1;
long long s = 0; int ans = 0;
for (int i = 0; i < n; i++) {
    s += a[i];
    ans += cnt[s - k];      // 存在前缀 s-k，则该段和为 k
    cnt[s]++;
}
```

## 易错提醒

- 想清楚下标约定（0 还是 1 起、区间是否含端点），区间公式随之调整。
- 前缀和可能很大，用 **`long long`** 防溢出。
- 前缀和数组要比原数组**多开一位**并令 `pre[0]=0`。

## 小结

- 前缀和：$O(n)$ 预处理换 $O(1)$ 区间和查询。
- 公式 `pre[r+1] - pre[l]`（含端点、0 下标）。
- 配合 `map` 可解「子数组和等于 k 的个数」等问题；和用 `long long`。
