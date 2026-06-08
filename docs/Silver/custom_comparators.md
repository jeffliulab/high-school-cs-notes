# 自定义比较器与坐标压缩

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[排序入门](../Bronze/intro_sorting.md)、[有序数组二分](binary_search_sorted.md)

两个常配套使用的技巧：用**自定义比较器**按任意规则排序；用**坐标压缩**把大范围的值映射到小下标。

## 自定义比较器

排序时传入比较函数，约定「a 排在 b 前返回 true」。多关键字排序逐级比较：

```cpp
struct Item { int a, b; };
bool cmp(const Item& x, const Item& y) {
    if (x.a != y.a) return x.a < y.a;   // 先按 a 升序
    return x.b > y.b;                   // a 相同则按 b 降序
}
sort(v.begin(), v.end(), cmp);
```

### Lambda 写法

```cpp
sort(v.begin(), v.end(), [](const Item& x, const Item& y){
    return x.a < y.a;
});
```

### 给 set / priority_queue 用比较器

```cpp
struct Cmp {
    bool operator()(const Item& x, const Item& y) const {
        return x.a < y.a;
    }
};
set<Item, Cmp> s;
```

> 比较器必须是**严格弱序**：等价元素返回 `false`（用 `<` 不用 `<=`），否则运行时崩溃。

## 坐标压缩（离散化）

当数值**范围很大但个数不多**（如坐标到 $10^9$，但只有 $10^5$ 个），无法用值当数组下标。坐标压缩把它们映射到 $0..k-1$ 的连续下标，保持相对顺序：

```cpp
vector<int> vals(a, a + n);          // 拷贝所有值
sort(vals.begin(), vals.end());
vals.erase(unique(vals.begin(), vals.end()), vals.end());  // 排序 + 去重

// 把 x 映射到它的压缩下标
int id = lower_bound(vals.begin(), vals.end(), x) - vals.begin();
```

之后就能用 `id`（$0..k-1$）作为数组/树状数组的下标。

## 为什么需要离散化

很多数据结构（计数数组、树状数组、线段树）的下标空间正比于值域。值域 $10^9$ 时开数组爆内存；压缩到实际出现的 $k$ 个值后，空间降到 $O(k)$。

## 例：统计逆序对（配合离散化）

> 数组值可能很大，统计 $i<j$ 且 $a_i > a_j$ 的对数。

先离散化把值映射到小下标，再用树状数组（Gold）统计。银级常见前置步骤就是这个离散化。

## 易错提醒

- 比较器用严格 `<`，等价元素返回 false。
- 离散化三步缺一不可：**拷贝 → 排序 → unique 去重**。
- `unique` 只移除**相邻**重复，必须先排序。
- `lower_bound` 要求 `vals` 已排序（去重后仍有序）。

## 小结

- 自定义比较器实现多关键字、混合升降序排序；务必严格弱序。
- **坐标压缩**：排序 + 去重 + `lower_bound`，把大值域映射到小下标。
- 离散化是树状数组、线段树处理大值域问题的必备前置。
