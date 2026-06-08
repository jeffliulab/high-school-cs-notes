# 分治优化 DP

> **难度**：⭐⭐⭐⭐⭐
> **前置知识**：[DP 入门](../Gold/intro_dp.md)、分治

分治优化 DP（Divide and Conquer Optimization）利用决策点的**单调性**，把形如 $dp[i][j]=\min_k(dp[i-1][k]+\text{cost}(k,j))$ 的转移从 $O(n^2)$ 降到 $O(n\log n)$（每层）。

## 适用的 DP 形式

分层 DP：

$$dp[i][j] = \min_{k < j}\big(dp[i-1][k] + C(k, j)\big)$$

设 $opt(i, j)$ 为使 $dp[i][j]$ 取最优的决策点 $k$。若满足**决策单调性**：

$$opt(i, j) \le opt(i, j+1)$$

即「$j$ 越大，最优决策点也不减」，就能用分治加速。

## 决策单调性来自哪里

当代价函数 $C$ 满足**四边形不等式**（quadrangle inequality）时，决策单调性成立：

$$C(a,c)+C(b,d) \le C(a,d)+C(b,c), \quad a\le b\le c\le d$$

许多自然的代价（如区间方差、$(\text{sum})^2$ 类）满足它。竞赛中常**先打表验证**决策单调性，再放心用。

## 分治求解一层

固定层 $i$，要算所有 $dp[i][j]$。分治函数 `solve(jl, jr, kl, kr)` 表示：$j \in [jl, jr]$ 的最优决策点都落在 $[kl, kr]$ 内。

```cpp
// 计算第 i 层；prev[] 是上一层 dp 值
void solve(int jl, int jr, int kl, int kr) {
    if (jl > jr) return;
    int jm = (jl + jr) / 2;
    int bestK = kl;
    long long best = LLONG_MAX;
    for (int k = kl; k <= min(jm, kr); k++) {       // 在允许范围内找最优决策
        long long val = prev[k] + cost(k, jm);
        if (val < best) { best = val; bestK = k; }
    }
    cur[jm] = best;
    // 由单调性：左半决策点 <= bestK，右半 >= bestK
    solve(jl, jm - 1, kl, bestK);
    solve(jm + 1, jr, bestK, kr);
}
```

每层分治深度 $O(\log n)$，每层所有区间的决策枚举总量 $O(n\log n)$，故每层 $O(n\log n)$。$m$ 层共 $O(mn\log n)$。

## 例：把序列分成 m 段最小化代价

> 把数组分成 $m$ 段，每段有代价 $C(l,r)$（如方差、距离和），最小化总代价。

外层枚举段数 $i$（DP 的第一维），内层用分治优化求 $dp[i][\cdot]$。

## 其他 DP 优化对比

| 优化 | 适用转移 | 复杂度 |
| --- | --- | --- |
| 分治优化 | 决策单调性 | $O(mn\log n)$ |
| [斜率优化](convex_hull_trick.md) | 直线最值形式 | $O(n)$/$O(n\log n)$ |
| 单调队列 | 固定窗口最值 | $O(n)$ |
| Knuth 优化 | 区间 DP + 四边形不等式 | $O(n^2)$ |

## 易错提醒

- 必须先确认**决策单调性**（四边形不等式或打表验证），否则结果错。
- 分治时决策区间 `[kl, kr]` 的传递（左半收上界、右半收下界）别写反。
- `cost(k, j)` 要能 $O(1)$ 或 $O(\log)$ 求出（常用前缀和）。
- 代价/DP 值用 `long long`。

## 小结

- 分治优化 DP 利用**决策单调性** $opt(i,j)\le opt(i,j+1)$，每层 $O(n\log n)$。
- 单调性来自代价的**四边形不等式**；不确定时打表验证。
- 分治时按「左半决策 ≤ 中点决策 ≤ 右半决策」缩小搜索范围。
