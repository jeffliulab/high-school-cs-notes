# 算法与非正式运行时分析

「算法」是解决问题的明确步骤序列。AP CSA 要求**非正式地**比较算法效率——通过统计语句执行的次数，而非严格的大 O 证明。

## 什么是算法

**算法（algorithm）** 是一组**有限、明确、有序**的步骤，用来解决某类问题。同一个问题往往有多种算法，效率可能差别巨大。算法的性质：

- 有限性：必定在有限步后结束。
- 明确性：每步都无歧义。
- 有输入和输出。

## 非正式运行时分析

AP 不考严格的大 O 记号，但要求你能**数出某段代码大约执行了多少次关键操作**，并据此比较两个算法谁更快。

### 单层循环：执行 n 次

```java
for (int i = 0; i < n; i++) {
    sum += arr[i];        // 执行 n 次
}
```

数据规模翻倍，工作量也翻倍——**线性增长**。

### 双层嵌套：执行 n² 次

```java
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // 执行 n × n 次
    }
}
```

数据规模翻倍，工作量变 **4 倍**——增长快得多。

### 折半：执行约 log₂n 次

每次把规模减半（如二分查找）：

```java
int x = n;
while (x > 1) {
    x = x / 2;            // n=1000 时只约 10 次
}
```

增长极慢——非常高效。

## 增长速度直观对比

| 模式 | n=10 | n=1000 | n=100万 |
| --- | --- | --- | --- |
| `log n`（折半） | ~3 | ~10 | ~20 |
| `n`（单层） | 10 | 1000 | 100万 |
| `n²`（双层） | 100 | 100万 | 1万亿 |

> 当 `n` 很大时，`n²` 算法可能慢到无法接受，而 `log n` / `n` 算法依然飞快。**选对算法比优化常数更重要**。

<div class="diagram">
<svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <!-- axes -->
  <line x1="45" y1="200" x2="350" y2="200" stroke="var(--dia-stroke)"/>
  <line x1="45" y1="200" x2="45" y2="20" stroke="var(--dia-stroke)"/>
  <text x="195" y="222" text-anchor="middle" fill="var(--dia-stroke-soft)">输入规模 n →</text>
  <text x="18" y="110" fill="var(--dia-stroke-soft)" transform="rotate(-90 18 110)">运算次数 →</text>
  <!-- curves -->
  <path d="M45,195 Q200,188 350,178" fill="none" stroke="var(--dia-green)" stroke-width="2"/>
  <text x="300" y="172" fill="var(--dia-green)">O(log n)</text>
  <path d="M45,200 L350,120" fill="none" stroke="var(--dia-blue)" stroke-width="2"/>
  <text x="300" y="112" fill="var(--dia-blue)">O(n)</text>
  <path d="M45,200 Q260,170 330,40" fill="none" stroke="var(--dia-gold)" stroke-width="2"/>
  <text x="285" y="60" fill="var(--dia-gold)">O(n²)</text>
  <path d="M45,200 Q120,180 110,25" fill="none" stroke="var(--dia-accent)" stroke-width="2"/>
  <text x="120" y="30" fill="var(--dia-accent)">O(2ⁿ)</text>
</svg>
<p class="figure-caption">复杂度增长对比：O(2ⁿ) 与 O(n²) 随 n 急剧爆炸，O(n)、O(log n) 平缓——数据一大，量级差异碾压一切常数优化。</p>
</div>

## 如何比较两个算法

数出各自的关键操作次数，看哪个随 `n` 增长更慢：

```java
// 算法 A：找最大值，遍历一次 → 约 n 次比较
// 算法 B：先全排序再取末尾 → 约 n² 或 n log n 次
// 只为找最大值，A 更优
```

## 易错提醒

- 嵌套循环的总次数是**相乘**，不是相加。
- 「内层次数依赖外层」时（如 `j <= i`）总次数约为 $n^2/2$，量级仍是 $n^2$。
- 别被「代码行数少」迷惑——少的代码不一定执行次数少。

## 小结

- 算法是有限、明确、有序的解题步骤。
- 通过**数执行次数**非正式地比较效率：单层 ~`n`、双层 ~`n²`、折半 ~`log n`。
- 数据大时，增长**量级**决定快慢，选对算法是关键。
