# 优先队列

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[数据结构入门](../Bronze/intro_data_structures.md)

优先队列（堆）能在 $O(\log n)$ 内**插入元素**并**取出当前最值**。它是许多贪心算法和 Dijkstra 的核心数据结构。

## C++ priority_queue

默认是**大根堆**（`top()` 是最大值）：

```cpp
#include <queue>
priority_queue<int> pq;
pq.push(3);
pq.push(7);
pq.push(1);
cout << pq.top();    // 7（最大）
pq.pop();            // 移除最大
cout << pq.size();
```

## 小根堆（取最小值）

最常用的是小根堆——加 `greater` 模板参数：

```cpp
priority_queue<int, vector<int>, greater<int>> pq;
pq.push(3); pq.push(7); pq.push(1);
cout << pq.top();    // 1（最小）
```

或对所有值取负塞进大根堆（小技巧）。

## 操作复杂度

| 操作 | 复杂度 |
| --- | --- |
| `push` | $O(\log n)$ |
| `pop` | $O(\log n)$ |
| `top` | $O(1)$ |

## 存 pair / 结构体

堆可存 `pair`（按 `first` 比较）或自定义结构体（需比较器）：

```cpp
// 小根堆按 pair.first
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
pq.push({dist, node});

// 自定义比较器
struct Cmp { bool operator()(const T&a, const T&b){ return a.cost > b.cost; } };
priority_queue<T, vector<T>, Cmp> pq2;   // cost 小的优先
```

## 例：合并 K 个有序序列 / 最小代价合并

> 反复取出两个最小的合并（哈夫曼思想）：每次弹出两个最小值，合并后压回。

```cpp
priority_queue<long long, vector<long long>, greater<>> pq;
for (int i = 0; i < n; i++) pq.push(a[i]);
long long cost = 0;
while (pq.size() > 1) {
    long long x = pq.top(); pq.pop();
    long long y = pq.top(); pq.pop();
    cost += x + y;
    pq.push(x + y);
}
cout << cost << "\n";
```

## 例：动态维护第 K 大

用**大小为 K 的小根堆**：始终保留最大的 K 个，堆顶即第 K 大。

```cpp
priority_queue<int, vector<int>, greater<>> pq;
for (int x : a) {
    pq.push(x);
    if (pq.size() > K) pq.pop();   // 弹掉最小的，保留前 K 大
}
// pq.top() 是第 K 大
```

## 易错提醒

- 默认是**大根堆**；要小根堆必须显式写 `greater<>`。
- `top()` 前要确保非空。
- 自定义比较器的方向与 `sort` 相反——优先队列里「返回 true 表示优先级更低」。
- 存大数值用 `long long`。

## 小结

- 优先队列（堆）：$O(\log n)$ 插入、取最值，$O(1)$ 看堆顶。
- 默认大根堆，`greater<>` 得小根堆。
- 典型应用：哈夫曼式合并、维护第 K 大、Dijkstra（Gold）。
