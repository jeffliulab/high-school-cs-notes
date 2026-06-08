# 递归完全搜索

> **难度**：⭐⭐☆☆☆
> **前置知识**：[基础完全搜索](complete_search_basic.md)、递归

当要枚举的不是固定几层（而是「所有子集」「所有排列」「所有选法」）时，用**递归**来生成全部可能。这是回溯法的雏形。

## 何时需要递归枚举

固定层数的枚举用嵌套循环即可；但「每个元素选或不选」「全排列」这类，层数等于 $n$、事先不定，就要靠递归：

- 所有**子集**：$2^n$ 种（每个元素选/不选）。
- 所有**排列**：$n!$ 种。
- 从 $n$ 个里**选 $k$ 个**的组合。

因为是指数级，**只在 $n$ 很小（$n \le 20$ 左右）时可用**。

## 枚举所有子集

对每个元素「选」或「不选」，递归到底时处理这个子集：

```cpp
int n;
int chosen[25];            // chosen[i] = 1 表示选了第 i 个
void rec(int i) {
    if (i == n) {          // 基准：决定完所有元素
        // 处理当前子集（求和、判断等）
        return;
    }
    chosen[i] = 0; rec(i + 1);   // 不选第 i 个
    chosen[i] = 1; rec(i + 1);   // 选第 i 个
}
// 调用 rec(0)，共 2^n 个叶子
```

每个元素分出「选 / 不选」两条分支，整个搜索过程是一棵**二叉决策树**，叶子恰好对应全部 $2^n$ 个子集：

<div class="diagram">
<svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <!-- nodes -->
  <g fill="var(--dia-bg-card)" stroke="var(--dia-stroke)">
    <circle cx="210" cy="25" r="14"/>
    <circle cx="110" cy="80" r="14"/><circle cx="310" cy="80" r="14"/>
  </g>
  <g fill="var(--dia-accent)" fill-opacity="0.15" stroke="var(--dia-accent)">
    <circle cx="55" cy="140" r="13"/><circle cx="165" cy="140" r="13"/><circle cx="255" cy="140" r="13"/><circle cx="365" cy="140" r="13"/>
  </g>
  <text x="210" y="29" text-anchor="middle" fill="var(--dia-stroke)" font-size="10">a₀?</text>
  <text x="110" y="84" text-anchor="middle" fill="var(--dia-stroke)" font-size="10">a₁?</text>
  <text x="310" y="84" text-anchor="middle" fill="var(--dia-stroke)" font-size="10">a₁?</text>
  <g text-anchor="middle" fill="var(--dia-accent)" font-size="9"><text x="55" y="143">{}</text><text x="165" y="143">{a₁}</text><text x="255" y="143">{a₀}</text><text x="365" y="143">{a₀a₁}</text></g>
  <!-- edges with labels -->
  <g stroke="var(--dia-stroke-soft)">
    <line x1="198" y1="34" x2="122" y2="70"/><line x1="222" y1="34" x2="298" y2="70"/>
    <line x1="100" y1="91" x2="63" y2="128"/><line x1="120" y1="91" x2="158" y2="128"/>
    <line x1="300" y1="91" x2="263" y2="128"/><line x1="320" y1="91" x2="358" y2="128"/>
  </g>
  <text x="150" y="52" fill="var(--dia-stroke-tertiary)" font-size="9">不选</text>
  <text x="258" y="52" fill="var(--dia-stroke-tertiary)" font-size="9">选</text>
</svg>
<p class="figure-caption">枚举 2 个元素子集的决策树：每层一个元素分「选/不选」，4 个叶子对应全部 2²=4 个子集。元素越多树越深，故仅 n≤20 左右可行。</p>
</div>

## 用 vector 收集当前选择（更通用）

```cpp
vector<int> cur;
void rec(int i) {
    if (i == n) { /* 用 cur */ return; }
    rec(i + 1);                 // 不选
    cur.push_back(a[i]);        // 选
    rec(i + 1);
    cur.pop_back();             // 回溯：撤销选择
}
```

> **回溯**的关键：进入分支前做选择（`push_back`），返回后**撤销**（`pop_back`），保证状态干净。

## 枚举全排列

C++ 可直接用 `next_permutation`（更简单）：

```cpp
#include <algorithm>
vector<int> p = {0, 1, 2, 3};
sort(p.begin(), p.end());
do {
    // 处理排列 p
} while (next_permutation(p.begin(), p.end()));
```

或手写递归：标记已用元素，逐位放置，放完一位递归下一位，回溯时取消标记。

## 例：选若干物品使重量恰为 W

```cpp
bool ok = false;
void rec(int i, int sum) {
    if (sum == W) { ok = true; return; }
    if (i == n || sum > W) return;     // 剪枝：超了就停
    rec(i + 1, sum + w[i]);            // 选
    rec(i + 1, sum);                   // 不选
}
```

`sum > W` 的提前返回是**剪枝**，能大幅减少无效搜索。

## 易错提醒

- 指数级复杂度，务必确认 $n$ 足够小（$2^n$：$n\le20$；$n!$：$n\le10$）。
- 回溯时**记得撤销**选择，否则状态串味。
- 加剪枝（如和已超标就返回）能显著加速。

## 小结

- 递归完全搜索枚举子集（$2^n$）、排列（$n!$）、组合等不定层数的情况。
- 模板：每层「选/不选」二分支，到底处理；用回溯维护当前状态。
- 全排列优先用 `next_permutation`；善用剪枝避免超时。
