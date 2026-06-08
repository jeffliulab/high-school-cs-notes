# 矩阵快速幂

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[模运算](../Gold/modular_arithmetic.md)（快速幂）、矩阵乘法

矩阵快速幂把**线性递推**的第 $n$ 项从 $O(n)$ 加速到 $O(k^3 \log n)$（$k$ 为矩阵阶数）。当 $n$ 大到 $10^{18}$ 时，这是唯一可行的做法。

## 矩阵乘法

$C = A \times B$，其中 $C_{ij} = \sum_k A_{ik} B_{kj}$：

```cpp
const int K = 2;
const long long MOD = 1e9 + 7;
struct Mat { long long a[K][K]; };

Mat mul(const Mat& A, const Mat& B) {
    Mat C = {};
    for (int i = 0; i < K; i++)
        for (int k = 0; k < K; k++) if (A.a[i][k])
            for (int j = 0; j < K; j++)
                C.a[i][j] = (C.a[i][j] + A.a[i][k] * B.a[k][j]) % MOD;
    return C;
}
```

矩阵乘法 $O(k^3)$。

## 矩阵快速幂

和数的快速幂完全一样，把「乘」换成矩阵乘、「1」换成单位矩阵：

```cpp
Mat matpow(Mat base, long long n) {
    Mat res = {};
    for (int i = 0; i < K; i++) res.a[i][i] = 1;   // 单位矩阵
    while (n > 0) {
        if (n & 1) res = mul(res, base);
        base = mul(base, base);
        n >>= 1;
    }
    return res;
}
```

$O(k^3 \log n)$。

## 经典例：斐波那契第 n 项

递推 $F_n = F_{n-1} + F_{n-2}$ 写成矩阵：

$$\begin{pmatrix} F_n \\ F_{n-1}\end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0\end{pmatrix}\begin{pmatrix} F_{n-1} \\ F_{n-2}\end{pmatrix}$$

所以 $\begin{pmatrix}F_n\\F_{n-1}\end{pmatrix} = \begin{pmatrix}1&1\\1&0\end{pmatrix}^{n-1}\begin{pmatrix}F_1\\F_0\end{pmatrix}$。

```cpp
Mat base = {{{1,1},{1,0}}};
Mat r = matpow(base, n - 1);
long long Fn = r.a[0][0];      // 乘上初始向量 (F1=1, F0=0)
```

## 如何构造转移矩阵

把递推 $f_n = c_1 f_{n-1} + c_2 f_{n-2} + \dots + c_k f_{n-k}$ 的状态向量取 $(f_{n-1}, \dots, f_{n-k})^T$，转移矩阵第一行是系数 $(c_1, \dots, c_k)$，其余是「下移」的单位结构。

## 应用

- 大 $n$ 的线性递推求值。
- **路径计数**：邻接矩阵 $A$ 的 $A^L$ 第 $(i,j)$ 项 = $i$ 到 $j$ 长度恰为 $L$ 的路径数。
- 含转移的计数 DP，状态数小但步数极大时。

## 易错提醒

- 矩阵乘法不满足交换律，顺序别乱。
- 全程取模、用 `long long`。
- 转移矩阵的指数是 $n-1$ 还是 $n$，取决于初始向量定义，仔细核对。
- 阶数 $k$ 大时 $O(k^3\log n)$ 可能偏慢，注意 $k$ 不要太大。

## 小结

- 矩阵快速幂：线性递推/路径计数从 $O(n)$ 加速到 $O(k^3\log n)$。
- 把递推写成「状态向量 = 转移矩阵 × 上一状态」，再对矩阵快速幂。
- 邻接矩阵幂 = 定长路径计数；注意取模与乘法顺序。
