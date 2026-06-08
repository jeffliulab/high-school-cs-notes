# 有序数组二分

> **难度**：⭐⭐☆☆☆
> **前置知识**：[排序入门](../Bronze/intro_sorting.md)

在**有序**数组上二分查找，$O(\log n)$ 定位元素或边界。C++ 提供 `lower_bound`/`upper_bound`，无需手写。

## STL：lower_bound 与 upper_bound

对**升序**容器：

- `lower_bound(first, last, x)`：第一个 **≥ x** 的位置。
- `upper_bound(first, last, x)`：第一个 **> x** 的位置。

返回的是迭代器/指针，减去起点得下标：

```cpp
#include <algorithm>
int a[n];                          // 必须已升序
sort(a, a + n);

int pos = lower_bound(a, a + n, x) - a;   // 第一个 >= x 的下标
int pos2 = upper_bound(a, a + n, x) - a;  // 第一个 > x 的下标
```

对 `vector`：

```cpp
auto it = lower_bound(v.begin(), v.end(), x);
int idx = it - v.begin();
```

## 常见用途

**判断 x 是否存在**：

```cpp
int p = lower_bound(a, a+n, x) - a;
bool found = (p < n && a[p] == x);
```

**统计等于 x 的个数**：

```cpp
int cnt = upper_bound(a, a+n, x) - lower_bound(a, a+n, x);
```

**统计 < x、≤ x、在 [L,R] 内的个数**：

```cpp
int lessThan   = lower_bound(a, a+n, x) - a;        // < x
int atMost     = upper_bound(a, a+n, x) - a;        // <= x
int inRange    = upper_bound(a,a+n,R) - lower_bound(a,a+n,L);  // [L, R]
```

## 手写二分（理解原理）

```cpp
int lo = 0, hi = n - 1, ans = -1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] == x) { ans = mid; break; }
    else if (a[mid] < x) lo = mid + 1;
    else hi = mid - 1;
}
```

## 离散化的搭档

`lower_bound` 常用于**坐标压缩**：把大范围的值映射到它在排序去重数组中的下标（见 [自定义比较器与坐标压缩](custom_comparators.md)）。

```cpp
// vals 已排序去重
int id = lower_bound(vals.begin(), vals.end(), x) - vals.begin();
```

## 易错提醒

- `lower_bound`/`upper_bound` 要求容器**已排序**，否则结果错误。
- 返回值可能等于 `end()`（即下标 `n`），用前先判 `p < n`。
- 区分 `lower_bound`（≥）与 `upper_bound`（>）：统计「严格小于」用前者。
- 减起点得到的是下标，别忘了减。

## 小结

- 有序数组用 `lower_bound`（首个 ≥x）、`upper_bound`（首个 >x），$O(\log n)$。
- 组合二者可统计等于/小于/区间内元素个数。
- 是判断存在性与坐标压缩的核心工具。
