# 排序入门

> **难度**：⭐☆☆☆☆
> **前置知识**：[数据结构入门](intro_data_structures.md)

排序是把数据按顺序排列。竞赛中**几乎不手写排序**——直接用 C++ STL 的 `sort`（$O(n\log n)$）。重点是会用、会自定义排序规则。

## std::sort 基础

```cpp
#include <algorithm>
int a[5] = {3, 1, 4, 1, 5};
sort(a, a + 5);                  // 升序：1 1 3 4 5

vector<int> v = {3, 1, 4};
sort(v.begin(), v.end());        // 升序
```

## 降序排序

```cpp
sort(v.begin(), v.end(), greater<int>());   // 降序
// 或对升序结果 reverse
sort(v.begin(), v.end());
reverse(v.begin(), v.end());
```

## 自定义比较函数

传一个返回 `bool` 的比较器，约定「a 应排在 b 前面时返回 true」：

```cpp
bool cmp(int x, int y) {
    return x > y;                // 降序
}
sort(v.begin(), v.end(), cmp);
```

## 对结构体 / pair 排序

按结构体的某个字段排序是铜级常见需求：

```cpp
struct Cow { int height, weight; };
Cow c[100];

// 按身高升序；身高相同按体重升序
bool cmp(const Cow& a, const Cow& b) {
    if (a.height != b.height) return a.height < b.height;
    return a.weight < b.weight;
}
sort(c, c + n, cmp);
```

`pair` 默认先按 `first`、再按 `second` 升序，无需写比较器：

```cpp
vector<pair<int,int>> p;
sort(p.begin(), p.end());        // 先 first 后 second
```

## 排序后能做什么

排序常是其他技巧的**前置步骤**：

- **去重**：排序后相邻相同 → 配合 `unique` 或直接扫一遍。
- **找中位数/极值**：排序后取特定位置。
- **贪心**：先排序再按顺序取（见 [贪心入门](intro_greedy.md)）。
- **二分查找**：要求有序。

```cpp
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());   // 去重
```

## 易错提醒

- 比较器要满足「严格弱序」：相等元素应返回 `false`（用 `<` 而非 `<=`），否则可能崩溃。
- `sort(a, a+n)` 的区间是**左闭右开** `[a, a+n)`。
- 对 `vector` 用 `v.begin(), v.end()`，对数组用 `a, a+n`。

## 小结

- 直接用 `sort`（$O(n\log n)$），别手写排序。
- 自定义比较器实现多关键字、降序排序；`pair` 自带字典序。
- 排序常作为去重、贪心、二分的前置步骤。
