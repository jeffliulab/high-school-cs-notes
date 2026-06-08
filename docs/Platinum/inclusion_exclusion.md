# 容斥原理

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[组合数学](../Gold/combinatorics.md)

容斥原理（Inclusion-Exclusion）精确计数「至少满足一个条件」的对象：加上单个集合，减去两两交集，加回三三交集……交替进行。

## 基本公式

两个集合：

$$|A \cup B| = |A| + |B| - |A \cap B|$$

三个集合：

$$|A\cup B\cup C| = |A|+|B|+|C| - |A\cap B|-|A\cap C|-|B\cap C| + |A\cap B\cap C|$$

一般地（$n$ 个集合）：

$$\Big|\bigcup_{i} A_i\Big| = \sum_{\emptyset \ne S \subseteq \{1..n\}} (-1)^{|S|+1} \Big|\bigcap_{i\in S} A_i\Big|$$

**奇数个集合的交加，偶数个减。**

## 实现：枚举子集

当条件数 $n$ 较小（$\le 20$）时，枚举所有 $2^n$ 个子集，按子集大小的奇偶决定加减：

```cpp
long long ans = 0;
for (int S = 1; S < (1 << n); S++) {
    int bits = __builtin_popcount(S);
    long long inter = sizeOfIntersection(S);   // 子集 S 对应条件交集的大小
    if (bits & 1) ans += inter;                // 奇数个 → 加
    else ans -= inter;                         // 偶数个 → 减
}
```

## 经典例：不被任何给定质数整除的数

> 求 $[1, N]$ 中不被 $p_1, \dots, p_k$ 任一整除的数的个数。

「被 $p_i$ 整除」的个数 = $\lfloor N/p_i \rfloor$，交集是「被乘积整除」。用容斥求「被至少一个整除」，再用 $N$ 减：

```cpp
long long bad = 0;
for (int S = 1; S < (1 << k); S++) {
    long long prod = 1; int bits = 0;
    for (int i = 0; i < k; i++)
        if ((S >> i) & 1) { prod *= p[i]; bits++; }
    if (bits & 1) bad += N / prod;
    else bad -= N / prod;
}
cout << N - bad;     // 不被任何整除的个数
```

## 补集思想

容斥常与「正难则反」结合：直接求「满足所有限制」难，就求「违反至少一个」用容斥，再用总数减。

## 错位排列 / 欧拉函数等

- **错位排列**（无人对号入座）：$D_n = n!\sum_{k=0}^n \frac{(-1)^k}{k!}$，由容斥推出。
- **欧拉函数** $\varphi(n)$（$\le n$ 且与 $n$ 互质的数）正是对 $n$ 的质因子做容斥。

## 易错提醒

- 加减符号由交集涉及的集合个数奇偶决定（奇加偶减）。
- 子集枚举 $O(2^n)$，仅 $n$ 小时可行；条件多需其他方法（如莫比乌斯反演）。
- 交集大小要正确计算（如整除题里是 $N / \text{lcm}$，互质时 lcm = 乘积）。
- 乘积可能溢出，注意范围。

## 小结

- 容斥：$|\bigcup A_i| = \sum (-1)^{|S|+1}|\bigcap_{i\in S}A_i|$，奇加偶减。
- $n$ 小时枚举 $2^n$ 子集，按 popcount 奇偶加减。
- 常配「正难则反」；衍生错位排列、欧拉函数等。
