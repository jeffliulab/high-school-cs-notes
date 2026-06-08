# 单峰函数三分

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[二分答案](../Silver/binary_search.md)

三分查找用于在**单峰（先增后减或先减后增）函数**上求极值。二分用于单调函数，三分用于单峰函数。

## 单峰函数

函数 $f$ 在区间内先单调上升再单调下降（**单峰**，求最大值），或先降后升（**单谷**，求最小值）。这类函数没有单调性，不能直接二分，但可以三分。

<div class="diagram">
<svg viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="10">
  <path d="M20,75 Q110,5 200,75" fill="none" stroke="var(--dia-accent)" stroke-width="2"/>
  <circle cx="110" cy="22" r="3" fill="var(--dia-gold)"/>
  <text x="100" y="16" fill="var(--dia-gold)">峰值</text>
  <line x1="20" y1="78" x2="200" y2="78" stroke="var(--dia-stroke-soft)"/>
</svg>
<p class="figure-caption">单峰函数：先增后减，唯一极大值，可用三分逼近。</p>
</div>

## 三分原理

取两个三分点 $m_1 < m_2$，比较 $f(m_1)$ 与 $f(m_2)$：

- 若 $f(m_1) < f(m_2)$：峰值在 $m_1$ **右侧**，丢弃 $[lo, m_1]$。
- 若 $f(m_1) > f(m_2)$：峰值在 $m_2$ **左侧**，丢弃 $[m_2, hi]$。

每次缩小区间，逼近峰值。

## 实数三分

```cpp
double lo = L, hi = R;
for (int iter = 0; iter < 200; iter++) {     // 固定次数保证精度
    double m1 = lo + (hi - lo) / 3;
    double m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) lo = m1;              // 求最大值
    else hi = m2;
}
double ans = f((lo + hi) / 2);
```

## 整数三分

整数域上当区间很小时直接暴力，否则：

```cpp
int lo = L, hi = R;
while (hi - lo > 2) {
    int m1 = lo + (hi - lo) / 3;
    int m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) lo = m1 + 1;
    else hi = m2 - 1;
}
// 在 [lo, hi] 内暴力取最优
int best = lo;
for (int i = lo; i <= hi; i++) if (f(i) > f(best)) best = i;
```

## 应用

- 物理/几何题：某点使代价最小（距离平方和等凸函数）。
- 参数最优化：答案关于某参数单峰。
- 嵌套：外层三分一个变量，内层再三分/计算另一个。

## 易错提醒

- 必须确认函数**严格单峰**，否则三分会错。
- 实数三分用固定迭代次数（如 100~200 次）比按精度判断更稳。
- 求最大还是最小，决定丢弃哪一侧，别写反。
- 整数三分收尾要暴力扫小区间，避免边界遗漏。

## 小结

- 三分查找在**单峰函数**上求极值，区间每次按比例缩小。
- 实数用固定迭代次数；整数收尾暴力扫剩余小区间。
- 前提是函数严格单峰；常用于几何/参数最优化。
