# 组合数学

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[模运算](modular_arithmetic.md)

计数问题的工具箱：排列、组合、二项式系数及其取模计算。Gold 计数题的核心。

## 基本计数原理

- **加法原理**：互斥的几类方案，总数相加。
- **乘法原理**：分步完成，每步方案数相乘。

## 排列与组合

- **排列** $P(n,k) = \dfrac{n!}{(n-k)!}$：从 $n$ 个中**有序**取 $k$ 个。
- **组合** $\binom{n}{k} = \dfrac{n!}{k!(n-k)!}$：从 $n$ 个中**无序**取 $k$ 个。

性质：

$$\binom{n}{k} = \binom{n}{n-k}, \quad \binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$$

## 帕斯卡三角（小范围打表）

$n$ 较小时用递推 $O(n^2)$ 预处理：

```cpp
long long C[2005][2005];
for (int i = 0; i <= n; i++) {
    C[i][0] = 1;
    for (int j = 1; j <= i; j++)
        C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
}
```

## 大范围组合数取模（阶乘 + 逆元）

$n$ 大（如 $10^6$）时，预处理阶乘与阶乘逆元，$O(1)$ 查询：

```cpp
const int N = 1e6 + 5;
long long fact[N], invFact[N];
void init() {
    fact[0] = 1;
    for (int i = 1; i < N; i++) fact[i] = fact[i-1] * i % MOD;
    invFact[N-1] = power(fact[N-1], MOD - 2, MOD);     // 费马逆元
    for (int i = N - 2; i >= 0; i--)
        invFact[i] = invFact[i+1] * (i+1) % MOD;        // 递推逆元
}
long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invFact[k] % MOD * invFact[n-k] % MOD;
}
```

## 常见计数模型

- **网格路径**：从 $(0,0)$ 到 $(a,b)$ 只能右/下走，方案数 $\binom{a+b}{a}$。
- **隔板法**：$n$ 个相同球放进 $k$ 个盒子（可空）方案 $\binom{n+k-1}{k-1}$。
- **二项式定理**：$(x+y)^n = \sum_k \binom{n}{k}x^k y^{n-k}$。

## 容斥原理（简述）

「至少满足一个」的计数 = 单个之和 − 两两交 + 三三交 − …（详见 [容斥原理](../Platinum/inclusion_exclusion.md)）。

## 易错提醒

- 阶乘逆元用「最后一个求逆 + 倒推」比逐个快速幂快得多。
- 组合数边界：`k < 0 || k > n` 时为 0。
- 全程 `long long` + 取模，乘法及时 `% MOD`。
- 区分有序（排列）与无序（组合）。

## 小结

- 加法/乘法原理 + 排列 $P(n,k)$、组合 $\binom{n}{k}$ 是基础。
- 小范围用帕斯卡递推；大范围用**阶乘 + 逆元** $O(1)$ 查询。
- 网格路径、隔板法是常见模型。
