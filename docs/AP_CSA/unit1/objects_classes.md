# 对象与类的概念

面向对象编程的两个核心概念：**类是模板，对象是实例**。本单元只学「使用」对象，自己「写」类在第三单元。

## 类与对象

- **类（class）** 是一张「设计图」，定义了一类事物有哪些属性和行为。
- **对象（object）** 是按图造出的「实物」，是类的一个**实例（instance）**。

> 类 `String` 是设计图；`"hello"`、`"world"` 是两个具体的 `String` 对象。

## 创建对象：new 运算符

用 `new` 调用类的**构造方法（constructor）** 来创建对象：

```java
// 类型 变量名 = new 构造方法(参数);
Rectangle r = new Rectangle(3, 4);
String s = new String("hi");   // 字符串也可直接写字面量 "hi"
```

`new` 在内存中分配一个新对象，并返回指向它的**引用**。

## 引用类型与 null

对象变量存的是**引用**（指向对象的「地址」），不是对象本身：

```java
Rectangle a = new Rectangle(3, 4);
Rectangle b = a;     // b 和 a 指向同一个对象！
```

<div class="diagram">
<svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="13">
  <rect x="20" y="20" width="60" height="30" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="50" y="40" text-anchor="middle" fill="var(--dia-stroke)">a</text>
  <rect x="20" y="70" width="60" height="30" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="50" y="90" text-anchor="middle" fill="var(--dia-stroke)">b</text>
  <rect x="280" y="45" width="120" height="34" fill="var(--dia-bg-card)" stroke="var(--dia-accent)"/>
  <text x="340" y="66" text-anchor="middle" fill="var(--dia-accent)">Rectangle(3,4)</text>
  <line x1="80" y1="35" x2="280" y2="58" stroke="var(--dia-stroke)" marker-end="url(#ar)"/>
  <line x1="80" y1="85" x2="280" y2="64" stroke="var(--dia-stroke)" marker-end="url(#ar)"/>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-stroke)"/></marker></defs>
</svg>
<p class="figure-caption">两个引用变量指向同一个对象——修改其一会影响另一个。</p>
</div>

特殊值 **`null`** 表示「不指向任何对象」。对 `null` 调用方法会抛出 `NullPointerException`：

```java
String t = null;
System.out.println(t.length());  // 运行时错误！
```

## == 与 .equals() 的区别（极其重要）

- `==` 比较两个**引用是否指向同一对象**（同一块内存）。
- `.equals()` 比较两个对象的**内容是否相等**。

```java
String x = new String("hi");
String y = new String("hi");
System.out.println(x == y);        // false（两个不同对象）
System.out.println(x.equals(y));   // true （内容相同）
```

**比较字符串内容永远用 `.equals()`**，不要用 `==`。

## 基本类型 vs 引用类型对照

| | 基本类型 | 引用类型 |
| --- | --- | --- |
| 变量存的是 | 值本身 | 对象的引用 |
| 例子 | `int`、`double`、`boolean` | `String`、数组、对象 |
| 比较相等 | `==` | `.equals()` |
| 可能为 null | 否 | 是 |

## 小结

- **类是模板、对象是实例**；用 `new 构造方法(...)` 创建对象。
- 对象变量存的是**引用**；多个变量可指向同一对象。
- `null` 不指向对象，对其调用方法会崩溃。
- 内容相等用 `.equals()`，引用相同用 `==`。
