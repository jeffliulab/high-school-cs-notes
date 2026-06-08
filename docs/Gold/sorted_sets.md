# 有序集合进阶

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[集合与映射](../Bronze/sets_maps.md)

`set`/`map` 不只是去重计数——它们维护**有序**结构，支持二分查找前驱/后继、动态插入删除，是许多 Gold 题的「现成数据结构」。

## set 的有序操作

`set` 始终保持升序，提供 $O(\log n)$ 的查找邻居操作：

```cpp
set<int> s;
auto it = s.lower_bound(x);    // 第一个 >= x 的元素
auto it2 = s.upper_bound(x);   // 第一个 > x 的元素
```

**注意**：要用成员函数 `s.lower_bound(x)`，而非 `std::lower_bound(s.begin(), s.end(), x)`（后者对 set 是 $O(n)$）。

## 找前驱与后继

```cpp
// 后继：第一个 >= x
auto succ = s.lower_bound(x);
if (succ != s.end()) { /* *succ 是后继 */ }

// 前驱：最后一个 < x
auto it = s.lower_bound(x);
if (it != s.begin()) {
    --it;                       // 退一步即前驱
    /* *it 是 < x 的最大元素 */
}
```

## 应用：动态维护 + 查询最近元素

> 不断插入数，每次插入后询问「与新数最接近的已有数」。

用 `set` 维护，每次插入前用 `lower_bound` 找前驱/后继，取差值最小：

```cpp
auto hi = s.lower_bound(x);
int best = INT_MAX;
if (hi != s.end()) best = min(best, *hi - x);
if (hi != s.begin()) { auto lo = prev(hi); best = min(best, x - *lo); }
s.insert(x);
```

## multiset（允许重复）

需要存重复元素时用 `multiset`：

```cpp
multiset<int> ms;
ms.insert(5); ms.insert(5);
ms.erase(ms.find(5));    // 只删一个 5（直接 erase(5) 会删全部！）
```

> 删除单个值务必 `erase(find(x))`，否则 `erase(x)` 删除所有等于 x 的元素。

## map 维护「键→聚合值」

`map` 同样有序，可按键范围遍历、找最近键：

```cpp
map<int,int> m;
auto it = m.lower_bound(k);   // 第一个键 >= k
```

## 复杂度

| 操作 | set/map |
| --- | --- |
| 插入/删除/查找 | $O(\log n)$ |
| lower/upper_bound | $O(\log n)$ |
| 遍历 | $O(n)$，有序 |

## 易错提醒

- 用**成员** `s.lower_bound`，不是全局 `std::lower_bound`（后者 set 上 $O(n)$）。
- 前驱：先 `lower_bound` 再 `--it`，注意 `it != begin()`。
- `multiset` 删单个用 `erase(find(x))`，别用 `erase(x)`。
- 解引用 `end()` 是未定义行为，先判边界。

## 小结

- `set`/`map` 维护有序结构，$O(\log n)$ 找前驱/后继。
- 用**成员版** `lower_bound`/`upper_bound`；前驱靠 `--it`。
- `multiset` 存重复；删单个用 `erase(find(x))`。
