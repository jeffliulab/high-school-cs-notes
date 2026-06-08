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
