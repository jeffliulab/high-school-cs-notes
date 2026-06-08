# 前缀和进阶

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[前缀和入门](prefix_sums.md)

把前缀和推广到**二维**（子矩阵和）和**差分**（区间批量加）。这两个技巧在银级网格题和区间修改题中频繁出现。

## 二维前缀和

定义 $\text{pre}[i][j]$ = 以 $(0,0)$ 为左上、$(i-1,j-1)$ 为右下的矩形内所有元素之和。

**预处理**（容斥）：

```cpp
for (int i = 1; i <= R; i++)
    for (int j = 1; j <= C; j++)
        pre[i][j] = a[i-1][j-1]
                  + pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1];
```

**查询子矩阵** $(r_1,c_1)$ 到 $(r_2,c_2)$（含端点，0 下标）之和：

```cpp
int sub = pre[r2+1][c2+1] - pre[r1][c2+1]
        - pre[r2+1][c1] + pre[r1][c1];
```

<div class="diagram">
<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="10">
  <rect x="20" y="20" width="120" height="100" fill="var(--dia-blue)" fill-opacity="0.12" stroke="var(--dia-stroke-soft)"/>
  <rect x="70" y="55" width="70" height="65" fill="var(--dia-accent)" fill-opacity="0.3" stroke="var(--dia-accent)"/>
  <text x="95" y="92" fill="var(--dia-accent)">目标</text>
  <text x="30" y="38" fill="var(--dia-stroke)">D-B-C+A</text>
</svg>
<p class="figure-caption">二维前缀和容斥：大矩形减去上、左两块，再补回多减的左上角。</p>
</div>

> 容斥口诀：**整块 − 上 − 左 + 左上**（左上被减了两次要加回）。

## 差分（区间批量加）

差分是前缀和的「逆运算」，用于**多次区间加、最后一次性求值**。

定义差分数组 $d$，对区间 $[l, r]$ 同时 $+v$ 只需两次单点操作：

```cpp
// 区间 [l, r] 每个元素 += v
d[l] += v;
d[r + 1] -= v;
```

所有区间加操作做完后，对 $d$ 求前缀和即得最终数组：

```cpp
int cur = 0;
for (int i = 0; i < n; i++) {
    cur += d[i];
    a[i] = cur;        // a[i] 即为所有区间加之后的值
}
```

这样 $m$ 次区间加 + 一次求值是 $O(n + m)$，而朴素地每次区间加是 $O(nm)$。

## 例：区间加后求最大值

> 给若干区间各加一个值，最后问数组最大值（如「最多重叠了多少个区间」）。

用差分 $O(n+m)$ 完成所有加法，再扫一遍求最大——经典「会议室/航班预订」类题。

## 易错提醒

- 二维前缀和数组要**多开一行一列**，下标从 1 开始最省心。
- 差分的 `d[r+1] -= v` 注意 `r+1` 可能越界，数组开大一点。
- 二维容斥的四项符号别写错（减两块、加回左上角）。
- 和都用 `long long`。

## 小结

- **二维前缀和**：容斥预处理，$O(1)$ 查子矩阵和（整块−上−左+左上）。
- **差分**：区间批量加用 `d[l]+=v; d[r+1]-=v;`，最后前缀和还原。
- 两者把「多次区间操作」从 $O(nm)$ 降到 $O(n+m)$。
