# 数位 DP

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[DP 入门](intro_dp.md)、记忆化搜索

数位 DP 用来统计「区间 $[L, R]$ 内满足某种数位性质的数的个数」，按数字的**每一位**逐位决策，配合记忆化。

## 适用场景

题目形如「求 $[L, R]$ 中**不含数字 4** / **各位和为 k** / **相邻位不同** 的数有几个」。直接枚举到 $R$（可能 $10^{18}$）不可行，数位 DP 把它降到 $O(\text{位数} \times \text{状态})$。

## 差分技巧

$$\text{count}(L, R) = f(R) - f(L-1)$$

其中 $f(x)$ = $[0, x]$ 内满足条件的个数。只需实现 $f(x)$。

## 记忆化搜索框架

逐位填数字，维护两个关键标志：

- **pos**：当前填到第几位。
- **tight（限界）**：前面各位是否都贴着上界 $x$ 的对应位。若是，本位不能超过 $x$ 的这一位。
- **其他状态**：题目相关（如已填数位和、上一位数字等）。

```cpp
int digits[20], len;
long long memo[20][STATE];          // 仅 tight=false 时缓存
bool vis[20][STATE];

long long dfs(int pos, int state, bool tight) {
    if (pos == len) return /* 是否满足条件 ? 1 : 0 */;
    if (!tight && vis[pos][state]) return memo[pos][state];

    int up = tight ? digits[pos] : 9;   // 本位上界
    long long res = 0;
    for (int d = 0; d <= up; d++) {
        int nstate = /* 由 state 和 d 更新 */;
        if (/* d 合法 */)
            res += dfs(pos + 1, nstate, tight && (d == up));
    }
    if (!tight) { vis[pos][state] = true; memo[pos][state] = res; }
    return res;
}

long long f(long long x) {
    if (x < 0) return 0;
    len = 0;
    while (x > 0) { digits[len++] = x % 10; x /= 10; }
    reverse(digits, digits + len);      // 高位在前
    memset(vis, 0, sizeof(vis));
    return dfs(0, INITSTATE, true);
}
```

## 为什么只在 !tight 时缓存

当 `tight=true` 时，本位上界依赖具体的 $x$，状态不通用，不能缓存。`tight=false` 时后续完全自由，相同 `(pos, state)` 的结果可复用。

## 例：统计不含数字 7 的数

```cpp
// 转移里跳过 d == 7 即可，无需额外 state
for (int d = 0; d <= up; d++) {
    if (d == 7) continue;
    res += dfs(pos + 1, 0, tight && d == up);
}
```

## 前导零处理

若条件涉及「数的实际长度」或「首位」，需额外一个 `lead`（是否仍是前导零）标志，避免把前导 0 当作有效数位。

## 易错提醒

- 只在 `!tight`（且通常 `!lead`）时读写记忆化数组。
- 数位要按**高位到低位**处理（记得 reverse）。
- 区间用 $f(R) - f(L-1)$，注意 $L=0$ 的边界。
- 涉及长度/首位的题要加 `lead` 标志。

## 小结

- 数位 DP 统计 $[L,R]$ 内满足数位性质的数，用 $f(R)-f(L-1)$。
- 逐位 DFS + 记忆化，关键标志 **tight（限界）**，仅非限界时缓存。
- 视题目加 `lead`（前导零）等附加状态。
