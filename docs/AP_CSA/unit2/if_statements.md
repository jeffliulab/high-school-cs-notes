# if 与 if-else 语句

`if` 语句让程序**根据条件选择**执行哪段代码，是控制流的第一块基石。

## 单分支 if

```java
if (条件) {
    // 条件为 true 时执行
}
```

```java
int score = 85;
if (score >= 60) {
    System.out.println("及格");
}
```

条件为 `false` 时，整个代码块被跳过。

## 双分支 if-else

```java
if (条件) {
    // true 时
} else {
    // false 时
}
```

```java
if (n % 2 == 0) {
    System.out.println("偶数");
} else {
    System.out.println("奇数");
}
```

`if` 与 `else` **必有且仅有一支**执行。

## 多分支 if-else-if

按顺序检查条件，**命中第一个为 true 的分支后立即结束**，其余不再判断：

```java
int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");   // 命中这里
} else if (score >= 60) {
    System.out.println("C");
} else {
    System.out.println("F");
}
```

> 顺序很重要：上例若把 `>= 60` 写在最前，则所有 ≥60 的分数都会进第一支。多分支判断区间时，**从最严格/最高的条件开始**。

## 大括号与作用域

省略大括号时，`if` 只控制**紧跟的一条语句**——这是常见 bug 来源：

```java
if (x > 0)
    System.out.println("正");
    System.out.println("总会执行！");  // 不受 if 控制（缩进骗人）
```

**始终使用大括号**，即使只有一行，能避免此类错误。

## 嵌套与「悬空 else」

`else` 与**最近的、尚未配对的 `if`** 结合：

```java
if (a > 0)
    if (b > 0)
        System.out.println("都正");
    else
        System.out.println("a正b非正");  // else 配对内层 if
```

加大括号可消除歧义（见 [嵌套条件与多分支](nested_conditionals.md)）。

## 易错提醒

- 不写大括号时 `if` 只管一条语句。
- 多分支条件**顺序**决定结果，注意区间从高到低。
- `else if` 链一旦命中就不再检查后续分支。

## 小结

- `if` / `if-else` / `if-else-if` 三种形态覆盖单、双、多分支选择。
- 多分支按顺序短路，第一个 true 即停。
- **永远加大括号**，避免缩进陷阱与悬空 else。
