# for 循环

`for` 循环把「初始化、条件、更新」三要素写在一行，特别适合**已知次数**的计数循环。

## 语法

```java
for (初始化; 条件; 更新) {
    // 循环体
}
```

三部分对应 [while 循环](while_loops.md) 的三要素：

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);   // 0 1 2 3 4
}
```

执行顺序：**初始化（一次）→ 判断条件 → 循环体 → 更新 → 判断条件 → ……**

## for 与 while 的等价关系

```java
// for
for (int i = 0; i < n; i++) { body; }

// 等价的 while
int i = 0;
while (i < n) { body; i++; }
```

`for` 把三要素集中在一处，**更不容易漏掉更新**，所以计数循环优先用 `for`。

## 常见循环模式

**正序遍历 `0 .. n-1`**（最常用，配合数组）：

```java
for (int i = 0; i < n; i++) { ... }
```

**倒序**：

```java
for (int i = n - 1; i >= 0; i--) { ... }
```

**步长不为 1**（例如只取偶数）：

```java
for (int i = 0; i <= 20; i += 2) { ... }   // 0,2,4,...,20
```

## 循环变量的作用域

在 `for (int i = ...)` 中声明的 `i` **只在循环内有效**，循环外不可访问：

```java
for (int i = 0; i < 3; i++) { ... }
// System.out.println(i);  // 编译错误：i 已超出作用域
```

若循环后还需用到该变量，应在循环外声明。

## 累乘示例（阶乘）

```java
int n = 5;
long fact = 1;
for (int i = 2; i <= n; i++) {
    fact *= i;
}   // fact = 120
```

## for 与 for-each

遍历数组/列表且**不需要索引**时，增强 for（for-each）更简洁：

```java
int[] arr = {3, 1, 4, 1, 5};
for (int x : arr) {
    System.out.println(x);
}
```

但 for-each **拿不到索引、不能修改数组元素本身**（详见 [数组遍历与 for-each](../unit4/array_traversal.md)）。

## 易错提醒

- `<` 与 `<=` 决定循环次数：`i < n` 跑 `n` 次，`i <= n` 跑 `n+1` 次。
- 在循环体内**不要**再手动改 `i`（除非有意），否则容易乱。
- 循环变量作用域仅限循环内。

## 小结

- `for` 把初始化/条件/更新三合一，适合**已知次数**的计数循环。
- 与 `while` 完全等价，但更不易漏更新。
- 不需要索引时用 for-each 更清爽。
