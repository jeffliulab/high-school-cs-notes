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

<div class="diagram">
<svg viewBox="0 0 420 130" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <text x="20" y="30" fill="var(--dia-stroke)">for (</text>
  <rect x="62" y="14" width="78" height="24" rx="3" fill="var(--dia-green-soft)" fill-opacity="0.3" stroke="var(--dia-green)"/>
  <text x="101" y="30" text-anchor="middle" fill="var(--dia-green)">int i=0</text>
  <text x="143" y="30" fill="var(--dia-stroke)">;</text>
  <rect x="152" y="14" width="60" height="24" rx="3" fill="var(--dia-blue)" fill-opacity="0.15" stroke="var(--dia-blue)"/>
  <text x="182" y="30" text-anchor="middle" fill="var(--dia-blue)">i&lt;5</text>
  <text x="215" y="30" fill="var(--dia-stroke)">;</text>
  <rect x="224" y="14" width="50" height="24" rx="3" fill="var(--dia-accent-soft)" stroke="var(--dia-accent)"/>
  <text x="249" y="30" text-anchor="middle" fill="var(--dia-accent)">i++</text>
  <text x="278" y="30" fill="var(--dia-stroke)">) { ... }</text>
  <!-- order labels -->
  <text x="101" y="58" text-anchor="middle" fill="var(--dia-green)" font-size="10">① 初始化(仅一次)</text>
  <text x="182" y="76" text-anchor="middle" fill="var(--dia-blue)" font-size="10">② 判断条件</text>
  <text x="340" y="58" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="10">③ 循环体</text>
  <text x="249" y="94" text-anchor="middle" fill="var(--dia-accent)" font-size="10">④ 更新</text>
  <path d="M249,100 C200,118 182,100 182,82" fill="none" stroke="var(--dia-stroke-soft)" stroke-dasharray="3 3" marker-end="url(#fo)"/>
  <text x="150" y="118" fill="var(--dia-stroke-soft)" font-size="10">④后回到②</text>
  <defs><marker id="fo" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-stroke-soft)"/></marker></defs>
</svg>
<p class="figure-caption">for 头部三段的执行次序：① 初始化只跑一次，之后 ②判断 → ③循环体 → ④更新 循环往复，直到条件为 false。</p>
</div>

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
