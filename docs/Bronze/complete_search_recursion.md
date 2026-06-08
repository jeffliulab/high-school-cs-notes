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
