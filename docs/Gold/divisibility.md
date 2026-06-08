# 整除

> **难度**：⭐⭐☆☆☆
> **前置知识**：基本数学

整除、最大公约数、质因数分解是数论的基础。Gold 数学题常以它们为工具。

## 整除与因数

$a \mid b$ 表示 $a$ 整除 $b$（$b$ 是 $a$ 的倍数）。判断：`b % a == 0`。

**枚举一个数的所有因数**——只需枚举到 $\sqrt{n}$，成对出现：

```cpp
vector<int> divisors;
for (int i = 1; (long long)i * i <= n; i++) {
    if (n % i == 0) {
        divisors.push_back(i);
        if (i != n / i) divisors.push_back(n / i);   // 配对因数
    }
}   // O(sqrt(n))
```

## 最大公约数 GCD

欧几里得算法：$\gcd(a, b) = \gcd(b, a \bmod b)$。

```cpp
int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
// C++17 起有 std::__gcd 或 std::gcd
```

最小公倍数：$\text{lcm}(a,b) = \dfrac{a}{\gcd(a,b)} \times b$（先除后乘防溢出）。

```cpp
long long lcm(int a, int b) {
    return (long long)a / gcd(a, b) * b;
}
```

## 质数判定

```cpp
bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}   // O(sqrt(n))
```

## 埃氏筛（预处理范围内所有质数）

求 $1..N$ 内所有质数，$O(N\log\log N)$：

```cpp
bool composite[1000005];
for (int i = 2; i <= N; i++) {
    if (!composite[i]) {                  // i 是质数
        for (int j = 2 * i; j <= N; j += i)
            composite[j] = true;          // 标记倍数为合数
    }
}
```

## 质因数分解

```cpp
vector<pair<int,int>> factorize(long long n) {
    vector<pair<int,int>> f;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            int cnt = 0;
            while (n % p == 0) { n /= p; cnt++; }
            f.push_back({(int)p, cnt});
        }
    }
    if (n > 1) f.push_back({(int)n, 1});   // 剩下的大质因子
    return f;
}   // O(sqrt(n))
```

## 易错提醒

- 枚举因数/质因数只到 $\sqrt{n}$，但循环条件用 `i*i<=n` 注意溢出（转 `long long`）。
- LCM 先除后乘防溢出。
- 埃氏筛从 `2*i` 或 `i*i` 开始标记；数组开到 $N+5$。
- 分解后别忘处理剩余的大质因子（`n > 1` 那一步）。

## 小结

- 因数/质因数枚举只到 $\sqrt n$，成对出现。
- GCD 用欧几里得；LCM 先除后乘。
- 范围质数用**埃氏筛** $O(N\log\log N)$；单数判质 $O(\sqrt n)$。
