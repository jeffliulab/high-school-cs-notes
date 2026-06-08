# 函数图

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[图的遍历](graph_traversal.md)

函数图是**每个点恰好有一条出边**的有向图（即 $i \to f(i)$）。它的结构特殊——必然由若干「环 + 挂在环上的树」组成，常考找环、求路径长度。

## 结构特点

每个点出度为 1，从任一点出发不断走 `next`，由于点数有限，**最终必进入一个环**。整个图形如「$\rho$ 形」：一条尾巴接一个环。多个连通分量则是多个这样的结构。

<div class="diagram">
<svg viewBox="0 0 240 110" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <g fill="var(--dia-bg-card)" stroke="var(--dia-stroke)">
    <circle cx="30" cy="55" r="12"/><circle cx="80" cy="55" r="12"/>
    <circle cx="140" cy="30" r="12"/><circle cx="190" cy="55" r="12"/><circle cx="140" cy="85" r="12"/>
  </g>
  <g stroke="var(--dia-accent)" fill="none" marker-end="url(#fa)">
    <line x1="42" y1="55" x2="68" y2="55"/>
    <line x1="92" y1="52" x2="130" y2="36"/>
    <line x1="150" y1="33" x2="180" y2="49"/>
    <line x1="188" y1="66" x2="150" y2="80"/>
    <line x1="130" y1="80" x2="100" y2="62"/>
  </g>
  <text x="60" y="100" fill="var(--dia-stroke-soft)">尾巴</text>
  <text x="155" y="105" fill="var(--dia-accent)">环</text>
  <defs><marker id="fa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-accent)"/></marker></defs>
</svg>
<p class="figure-caption">函数图的每个分量是「ρ 形」：一条尾巴汇入一个环。</p>
</div>

## 找环：访问状态标记

用三态标记检测每个点是否在环上：

```cpp
int nxt[100005];           // 出边 nxt[i] = f(i)
int state[100005];         // 0 未访问, 1 访问中, 2 已完成
bool onCycle[100005];

// 从 u 走，标记环
void findCycle(int u) {
    vector<int> path;
    while (state[u] == 0) {
        state[u] = 1;
        path.push_back(u);
        u = nxt[u];
    }
    if (state[u] == 1) {           // 碰到「访问中」→ 找到环
        // 从 path 中 u 出现处到末尾都是环
        int i = path.size() - 1;
        while (path[i] != u) { onCycle[path[i]] = true; i--; }
        onCycle[u] = true;
    }
    for (int x : path) state[x] = 2;
}
```

## 快慢指针找环（Floyd 判圈）

另一种省内存的找环法：慢指针走一步、快指针走两步，相遇即在环内。

```cpp
int slow = start, fast = start;
do {
    slow = nxt[slow];
    fast = nxt[nxt[fast]];
} while (slow != fast);        // 相遇点在环上
```

## 反向建图求「树部分」

要统计「有多少点能到达某个环点」等，可在**反图**上从环点 DFS。

## 常见问题类型

- 判断每个点是否在环上、环长多少。
- 从某点出发走 $k$ 步到哪（$k$ 极大时用 [倍增](../Platinum/binary_jumping.md)）。
- 每个点走到环需要几步（尾巴长度）。

## 易错提醒

- 别用普通 `vis`（两态）找环——需要区分「访问中」与「已完成」。
- 可能有**多个**连通分量，每个都有自己的环，要对所有未访问点处理。
- 自环（$f(i)=i$）也是长度 1 的环。
- $k$ 步很大时不能硬走，用倍增跳。

## 小结

- 函数图：每点出度 1，每个分量是「尾巴 + 环」的 ρ 形。
- 找环用**三态标记**或**快慢指针（Floyd）**。
- 常考在环判定、环长、走 $k$ 步（配合倍增）。
