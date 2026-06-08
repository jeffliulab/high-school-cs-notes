# 状压 DP

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[DP 入门](intro_dp.md)、[位运算入门](../Silver/bitwise.md)

状态压缩 DP 用一个整数的二进制位表示「一个集合的状态」，适合元素个数很小（$n \le 20$）但需要记录「哪些已用」的问题。

## 核心思想

当 DP 状态需要记录「一个子集」（如哪些点已访问、哪些任务已完成），用整数 $S$ 的第 $i$ 位表示元素 $i$ 是否在集合中。状态数 $2^n$，故 $n$ 必须小。

## 经典：旅行商问题（TSP）

> $n$ 个城市，求经过所有城市恰好一次的最短路径（$n \le 18$）。

- 状态：`dp[S][i]` = 已访问集合为 $S$、当前在城市 $i$ 的最短路径。
- 转移：从 $i$ 走到未访问的 $j$：

```cpp
int dp[1<<18][18];
memset(dp, 0x3f, sizeof(dp));
dp[1][0] = 0;                       // 从城市 0 出发，只访问了 {0}
for (int S = 1; S < (1 << n); S++)
    for (int i = 0; i < n; i++) {
        if (!((S >> i) & 1)) continue;     // i 必须在 S 中
        if (dp[S][i] == INF) continue;
        for (int j = 0; j < n; j++) {
            if ((S >> j) & 1) continue;     // j 还没访问
            int nS = S | (1 << j);
            dp[nS][j] = min(dp[nS][j], dp[S][i] + dist[i][j]);
        }
    }
// 答案：min over i of dp[full][i] (+ 回到起点)
```

复杂度 $O(2^n \cdot n^2)$。

## 例：集合划分 / 完美匹配

> 把 $n$ 个人分配到 $n$ 个任务（一一对应），求最小代价。

- 状态：`dp[S]` = 已分配的任务集合为 $S$ 时的最小代价；处理第 `popcount(S)` 个人。
- 转移：第 $k=\text{popcount}(S)$ 个人选一个未用任务 $j$：

```cpp
int dp[1 << 20];
memset(dp, 0x3f, sizeof(dp));
dp[0] = 0;
for (int S = 0; S < (1 << n); S++) {
    int k = __builtin_popcount(S);          // 当前处理第 k 个人
    if (k >= n) continue;
    for (int j = 0; j < n; j++) {
        if (!((S >> j) & 1)) {              // 任务 j 未用
            int nS = S | (1 << j);
            dp[nS] = min(dp[nS], dp[S] + cost[k][j]);
        }
    }
}
cout << dp[(1 << n) - 1];
```

复杂度 $O(2^n \cdot n)$。

## 遍历子集的子集（进阶）

某些状压 DP 需枚举 $S$ 的所有子集 $T$，总复杂度 $O(3^n)$：

```cpp
for (int S = 0; S < (1 << n); S++)
    for (int T = S; T > 0; T = (T - 1) & S) {
        // T 是 S 的非空子集
    }
```

## 易错提醒

- $n$ 必须很小（$2^n$：$n\le20$ 左右，$n\le18$ 更安全）。
- `dp` 数组第一维 $2^n$ 可能很大，注意内存（$2^{20}\approx10^6$）。
- 位操作优先级低，`(S>>i)&1` 要加括号。
- 初始化 INF 用 `memset(.., 0x3f, ..)`，相加不溢出。

## 小结

- 状压 DP 用整数二进制表示「集合状态」，$n \le 20$ 适用。
- 经典模型：TSP（`dp[S][i]`）、任务分配（`dp[S]` + popcount 定人）。
- 子集枚举 $O(3^n)$；注意内存与初始化。
