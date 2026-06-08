# 背包

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[DP 入门](intro_dp.md)

背包问题是最经典的 DP 模型：在容量限制下选物品使价值最大。0/1 背包和完全背包的状态设计与滚动优化是必会内容。

## 0/1 背包

> $n$ 个物品，每个**至多取一次**，重量 $w_i$、价值 $v_i$，背包容量 $W$，求最大价值。

- 状态：`dp[i][j]` = 前 $i$ 个物品、容量 $j$ 时的最大价值。
- 转移：第 $i$ 个物品**不取**或**取**：

$$dp[i][j] = \max(dp[i-1][j],\; dp[i-1][j-w_i] + v_i)$$

```cpp
for (int i = 1; i <= n; i++)
    for (int j = 0; j <= W; j++) {
        dp[i][j] = dp[i-1][j];
        if (j >= w[i])
            dp[i][j] = max(dp[i][j], dp[i-1][j-w[i]] + v[i]);
    }
cout << dp[n][W];
```

每个 `dp[i][j]` 由**正上方**（不取第 i 个）和**左上方 `dp[i-1][j-w_i]`**（取第 i 个）两格转移而来：

<div class="diagram">
<svg viewBox="0 0 430 180" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <!-- column headers (capacity j) -->
  <g text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="10">
    <text x="95" y="22">j=0</text><text x="145" y="22">1</text><text x="195" y="22">2</text><text x="245" y="22">3</text><text x="295" y="22">4</text><text x="345" y="22">5</text>
  </g>
  <!-- grid -->
  <g fill="var(--dia-bg-card)" stroke="var(--dia-rule)">
    <rect x="70" y="30" width="50" height="30"/><rect x="120" y="30" width="50" height="30"/><rect x="170" y="30" width="50" height="30"/><rect x="220" y="30" width="50" height="30"/><rect x="270" y="30" width="50" height="30"/><rect x="320" y="30" width="50" height="30"/>
    <rect x="70" y="60" width="50" height="30"/><rect x="120" y="60" width="50" height="30"/><rect x="170" y="60" width="50" height="30"/><rect x="220" y="60" width="50" height="30"/><rect x="270" y="60" width="50" height="30"/><rect x="320" y="60" width="50" height="30"/>
  </g>
  <!-- highlighted source cells row i-1 -->
  <rect x="170" y="30" width="50" height="30" fill="var(--dia-blue)" fill-opacity="0.2" stroke="var(--dia-blue)"/>
  <rect x="270" y="30" width="50" height="30" fill="var(--dia-green)" fill-opacity="0.2" stroke="var(--dia-green)"/>
  <!-- target cell row i -->
  <rect x="320" y="60" width="50" height="30" fill="var(--dia-accent-soft)" stroke="var(--dia-accent)" stroke-width="2"/>
  <text x="40" y="50" fill="var(--dia-stroke-soft)" font-size="10">i−1</text>
  <text x="48" y="80" fill="var(--dia-stroke-soft)" font-size="10">i</text>
  <!-- arrows -->
  <line x1="320" y1="62" x2="300" y2="60" stroke="var(--dia-green)" marker-end="url(#k1)"/>
  <line x1="335" y1="60" x2="200" y2="60" stroke="var(--dia-blue)" marker-end="url(#k2)" opacity="0"/>
  <path d="M325,62 C260,55 220,55 200,60" fill="none" stroke="var(--dia-blue)" marker-end="url(#k2)"/>
  <text x="180" y="120" fill="var(--dia-stroke)" font-size="10">dp[i][5] = max( <tspan fill="var(--dia-green)">dp[i−1][5]</tspan> 不取,</text>
  <text x="200" y="138" fill="var(--dia-stroke)" font-size="10"><tspan fill="var(--dia-blue)">dp[i−1][5−wᵢ]</tspan> + vᵢ 取 )</text>
  <defs>
    <marker id="k1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-green)"/></marker>
    <marker id="k2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-blue)"/></marker>
  </defs>
</svg>
<p class="figure-caption">0/1 背包 DP 表：dp[i][j] 取「正上方（不选物品 i）」与「左移 wᵢ 列的上一行 + vᵢ（选物品 i）」的较大者。</p>
</div>

## 滚动数组优化（一维）

只依赖上一行，可压成一维。**0/1 背包必须逆序遍历容量**，保证每个物品只用一次：

```cpp
for (int i = 1; i <= n; i++)
    for (int j = W; j >= w[i]; j--)        // 逆序！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
```

> 为什么逆序：正序会用到本轮已更新的 `dp[j-w[i]]`，相当于物品取了多次（那是完全背包）。

## 完全背包

> 每个物品可取**无限次**。一维时**正序**遍历容量：

```cpp
for (int i = 1; i <= n; i++)
    for (int j = w[i]; j <= W; j++)        // 正序！
        dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
```

正序使得 `dp[j-w[i]]` 可能已包含物品 $i$，从而允许重复取。

## 恰好装满 / 方案数变体

- **恰好装满**：初始化 `dp[0]=0`，其余 `dp[j]=-INF`，最后看 `dp[W]`。
- **方案数**：转移改为 `dp[j] += dp[j-w[i]]`（求填满容量的方案数，常取模）。

```cpp
// 凑出总和 j 的方案数（每个数用一次 → 逆序）
dp[0] = 1;
for (int i = 0; i < n; i++)
    for (int j = W; j >= a[i]; j--)
        dp[j] = (dp[j] + dp[j - a[i]]) % MOD;
```

## 复杂度

时间 $O(nW)$，空间（一维）$O(W)$。当 $W$ 很大（如 $10^9$）时背包不适用，需换思路。

## 易错提醒

- **0/1 背包逆序、完全背包正序**——这是最易错点。
- 一维数组初始化按「求最大值」还是「恰好装满」区分（0 还是 -INF）。
- 容量循环下界是 `w[i]`，避免负下标。
- 价值/方案数大时用 `long long` / 取模。

## 小结

- 0/1 背包：每物一次，二维转移 `max(不取, 取)`；一维**逆序**。
- 完全背包：每物无限次，一维**正序**。
- 变体：恰好装满（-INF 初始化）、方案数（`+=`）。复杂度 $O(nW)$。
