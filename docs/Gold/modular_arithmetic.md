# 模运算

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[整除](divisibility.md)

答案很大时题目常要求「对 $10^9+7$ 取模」。模运算保证中间结果不溢出。掌握取模的规则、快速幂、模逆元。

## 取模的基本规则

模运算对加、减、乘**可分配**：

$$(a+b)\bmod m = ((a\bmod m)+(b\bmod m))\bmod m$$
$$(a\times b)\bmod m = ((a\bmod m)\times(b\bmod m))\bmod m$$

```cpp
const long long MOD = 1e9 + 7;
long long add(long long a, long long b){ return (a + b) % MOD; }
long long mul(long long a, long long b){ return a % MOD * (b % MOD) % MOD; }
```

## 处理负数取模

减法可能为负，需 `+ MOD` 再取模：

```cpp
long long sub(long long a, long long b){ return ((a - b) % MOD + MOD) % MOD; }
```

## 快速幂

求 $a^b \bmod m$，$O(\log b)$：

```cpp
long long power(long long a, long long b, long long m) {
    long long res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = res * a % m;   // 当前位为 1，乘上
        a = a * a % m;                  // 底数平方
        b >>= 1;
    }
    return res;
}
```

原理：把指数按二进制拆分，$a^{13}=a^{8}\cdot a^{4}\cdot a^{1}$。

## 模逆元（除法取模）

模运算下不能直接除。$a/b \bmod m$ 要乘 $b$ 的**逆元** $b^{-1}$。当 $m$ 为质数时，由费马小定理：

$$b^{-1} \equiv b^{m-2} \pmod m$$

```cpp
long long inv(long long b) {
    return power(b, MOD - 2, MOD);     // m 为质数时
}
long long divide(long long a, long long b) {
    return a % MOD * inv(b) % MOD;
}
```

## 组合数取模（预处理阶乘）

配合逆元，$O(1)$ 查询 $\binom{n}{k} \bmod p$（详见 [组合数学](combinatorics.md)）：

```cpp
long long fact[N], invFact[N];
// fact[i]=i!, invFact[i]=(i!)^{-1}
long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invFact[k] % MOD * invFact[n - k] % MOD;
}
```

## 易错提醒

- 乘法前后都要取模，且用 `long long`（两个 $10^9$ 相乘达 $10^{18}$）。
- 减法结果可能为负，务必 `+ MOD` 再 `% MOD`。
- 费马小定理求逆元**要求模数为质数**且 $b$ 不是 $m$ 的倍数。
- 快速幂里底数先 `a %= m`。

## 小结

- 加减乘可逐步取模；减法防负要 `+MOD`。
- **快速幂** $O(\log b)$ 求幂；除法用**模逆元**（质数模下 $b^{m-2}$）。
- 组合数取模 = 预处理阶乘 + 逆元，$O(1)$ 查询。
