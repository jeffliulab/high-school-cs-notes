# 集合与映射

> **难度**：⭐⭐☆☆☆
> **前置知识**：[数据结构入门](intro_data_structures.md)

`set`（集合）和 `map`（映射）是处理**去重、查找、计数**的利器。它们让「这个元素出现过吗」「这个键对应什么值」变成一行代码。

## set：自动去重 + 有序

`set` 存**不重复**的元素，并自动保持**升序**：

```cpp
#include <set>
set<int> s;
s.insert(3);
s.insert(1);
s.insert(3);             // 重复，无效
cout << s.size();        // 2（{1, 3}）
if (s.count(1)) ...      // 查找：count 返回 0 或 1
s.erase(1);              // 删除
for (int x : s) ...      // 升序遍历
```

常见用途：去重、记录「见过哪些值」、维护有序集合。

## map：键 → 值的映射

`map` 把**键**映射到**值**，键唯一且有序：

```cpp
#include <map>
map<string, int> cnt;
cnt["apple"] = 5;
cnt["banana"]++;          // 不存在的键自动初始化为 0，再 +1
cout << cnt["apple"];     // 5
if (cnt.count("pear")) ...// 判断键是否存在
for (auto& p : cnt) {
    cout << p.first << " " << p.second << "\n";   // 键 值
}
```

## 经典应用：频次统计

「数每个元素出现多少次」是 `map` 的招牌用法：

```cpp
map<int, int> freq;
for (int i = 0; i < n; i++) freq[a[i]]++;
// freq[x] 就是 x 出现的次数
```

字符串、大数值（无法用数组下标）都能当键，非常灵活。

## unordered 版本（更快）

`unordered_set` / `unordered_map` 基于哈希，平均 $O(1)$（`set/map` 是 $O(\log n)$），但**无序**：

```cpp
#include <unordered_map>
unordered_map<int, int> cnt;   // 不需要有序时更快
```

铜级数据量小，两者皆可；需要有序遍历时用 `map`。

## 复杂度

| 操作 | set/map | unordered |
| --- | --- | --- |
| 插入/查找/删除 | $O(\log n)$ | 平均 $O(1)$ |
| 有序遍历 | ✔ | ✗ |

## 小技巧：判断重复

```cpp
set<int> seen;
for (int i = 0; i < n; i++) {
    if (seen.count(a[i])) { /* a[i] 重复出现 */ }
    seen.insert(a[i]);
}
```

## 易错提醒

- `set/map` 的 `count` 返回 0/1（map 是键是否存在），不是出现次数；计数要用 `map<,int>` 的值。
- 访问 `map[key]` 会**自动插入**该键（值为默认 0）——只想查询是否存在时用 `.count()` 或 `.find()`。
- `unordered_map` 无序，需要排序输出时改用 `map`。

## 小结

- `set`：自动去重 + 有序，用于「是否出现过」。
- `map`：键→值映射，招牌用法是**频次统计** `freq[x]++`。
- 需 $O(1)$ 且不要求有序时用 `unordered_` 版本。
