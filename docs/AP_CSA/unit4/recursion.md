# 递归

递归是「方法调用自己」来解决问题：把大问题拆成同类的小问题，直到触及最简单的**基准情形**。

## 递归的两个要素

1. **基准情形（base case）**：最简单、可直接给出答案、**不再递归**的情形。它是递归的「刹车」。
2. **递归情形（recursive case）**：把问题缩小一步，调用自身解决更小的子问题。

缺少基准情形，或递归没把问题变小，会**无限递归**直到 `StackOverflowError`。

## 经典例子：阶乘

$n! = n \times (n-1)!$，且 $0! = 1$。

```java
public static int factorial(int n) {
    if (n == 0) {           // 基准情形
        return 1;
    }
    return n * factorial(n - 1);   // 递归情形（问题缩小）
}
```

调用 `factorial(3)` 的展开：

```
factorial(3) = 3 * factorial(2)
             = 3 * (2 * factorial(1))
             = 3 * (2 * (1 * factorial(0)))
             = 3 * (2 * (1 * 1)) = 6
```

调用层层「压栈」深入到基准情形，再层层「返回」带着结果回升：

<div class="diagram">
<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- descend (left) -->
  <text x="95" y="18" text-anchor="middle" fill="var(--dia-blue)" font-size="11">调用下降（压栈）</text>
  <g fill="var(--dia-bg-card)" stroke="var(--dia-blue)">
    <rect x="30" y="28" width="130" height="26"/><rect x="45" y="66" width="115" height="26"/>
    <rect x="60" y="104" width="100" height="26"/><rect x="75" y="142" width="85" height="26"/>
  </g>
  <g fill="var(--dia-blue)"><text x="40" y="46">factorial(3)</text><text x="55" y="84">factorial(2)</text><text x="70" y="122">factorial(1)</text><text x="85" y="160">factorial(0)</text></g>
  <line x1="95" y1="54" x2="103" y2="66" stroke="var(--dia-blue)" marker-end="url(#rd)"/>
  <line x1="103" y1="92" x2="110" y2="104" stroke="var(--dia-blue)" marker-end="url(#rd)"/>
  <line x1="110" y1="130" x2="118" y2="142" stroke="var(--dia-blue)" marker-end="url(#rd)"/>
  <text x="120" y="186" text-anchor="middle" fill="var(--dia-green)" font-size="10">基准 → 返回 1</text>
  <!-- ascend (right) -->
  <text x="340" y="18" text-anchor="middle" fill="var(--dia-accent)" font-size="11">结果回升（返回）</text>
  <g fill="var(--dia-accent)" text-anchor="end">
    <text x="410" y="160">0! → 1</text><text x="410" y="122">1·1 = 1</text><text x="410" y="84">2·1 = 2</text><text x="410" y="46">3·2 = 6</text>
  </g>
  <g stroke="var(--dia-accent)" marker-end="url(#ru)">
    <line x1="360" y1="150" x2="360" y2="130"/><line x1="360" y1="112" x2="360" y2="92"/><line x1="360" y1="74" x2="360" y2="54"/>
  </g>
  <defs>
    <marker id="rd" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-blue)"/></marker>
    <marker id="ru" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-accent)"/></marker>
  </defs>
</svg>
<p class="figure-caption">递归调用栈：先一路调用到基准情形 factorial(0)=1，再逐层把结果相乘返回，最终得到 6。</p>
</div>

## 求和示例

```java
public static int sum(int n) {        // 1+2+...+n
    if (n <= 0) return 0;             // 基准
    return n + sum(n - 1);            // 递归
}
```

## 在数组/字符串上递归

**数组求和**（按索引递归）：

```java
public static int arraySum(int[] arr, int i) {
    if (i == arr.length) return 0;        // 越过末尾 → 0
    return arr[i] + arraySum(arr, i + 1); // 当前元素 + 余下之和
}
```

**反转字符串**：

```java
public static String reverse(String s) {
    if (s.length() <= 1) return s;                    // 基准
    return reverse(s.substring(1)) + s.substring(0, 1);
}
```

## 递归追踪（考试重点）

MCQ 常给一段递归代码，问「调用某值时返回什么 / 打印什么 / 调用了多少次」。方法是**手动展开**：从基准情形向上逐层代回。注意打印语句在递归调用**之前**还是**之后**会影响输出顺序。

```java
public static void countDown(int n) {
    if (n == 0) return;
    System.out.print(n + " ");   // 先打印
    countDown(n - 1);
}   // countDown(3) → "3 2 1"

public static void countUp(int n) {
    if (n == 0) return;
    countUp(n - 1);
    System.out.print(n + " ");   // 后打印
}   // countUp(3) → "1 2 3"
```

## 递归 vs 迭代

任何递归都能改写成循环，反之亦然。递归代码往往更简洁地表达「分治」结构（如 [归并排序](sorting.md)、二分查找），但有调用开销。Tower of Hanoi、分治排序是递归的典型用武之地。

## 易错提醒

- **必须有基准情形**，且每次递归要让问题**真正变小**，否则栈溢出。
- 打印/操作在递归调用前还是后，决定了顺序——追踪题的关键。
- 别忘了把递归调用的**返回值用起来**（`return n * factorial(n-1)` 而非只调用不返回）。

## 小结

- 递归 = **基准情形 + 缩小问题的递归情形**。
- 通过手动展开来追踪返回值与输出顺序（注意打印在递归前/后）。
- 递归擅长表达分治；与迭代可互相转换。
