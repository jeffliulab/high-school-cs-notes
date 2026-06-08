# 字符串对象与方法

`String` 是 AP CSA 最重要的库类之一，几乎每年 FRQ 都会用到。核心特性是**不可变**，核心技能是熟练使用它的方法。

## 创建字符串

```java
String a = "hello";              // 字面量（推荐）
String b = new String("hello");  // 用 new（很少这样写）
```

字符串是**对象**，属于引用类型。

## 不可变性（Immutability）

`String` 对象一旦创建，**内容不可更改**。所有「修改」方法其实都返回**一个新字符串**，原串不变：

```java
String s = "hello";
s.toUpperCase();              // 返回 "HELLO"，但没接住——s 仍是 "hello"！
s = s.toUpperCase();         // 正确：让 s 指向新串 "HELLO"
```

## 拼接（Concatenation）

`+` 用于字符串拼接；只要有一边是 `String`，另一边会自动转成字符串：

```java
String name = "Ann";
int age = 17;
String msg = name + " is " + age;   // "Ann is 17"
System.out.println("x = " + 1 + 2); // "x = 12"（从左到右：先拼 1，再拼 2）
System.out.println("x = " + (1+2)); // "x = 3"（括号先算）
```

## AP Java 子集中的核心 String 方法

设 `s` 为字符串，索引从 **0** 开始：

| 方法 | 说明 | 例（`s = "PROGRAM"`） |
| --- | --- | --- |
| `s.length()` | 长度 | `7` |
| `s.substring(i)` | 从索引 `i` 到末尾 | `s.substring(3)` → `"GRAM"` |
| `s.substring(i, j)` | `[i, j)`，含 i 不含 j | `s.substring(0, 3)` → `"PRO"` |
| `s.indexOf(str)` | 子串首次出现的索引，找不到返回 `-1` | `s.indexOf("GR")` → `3` |
| `s.equals(other)` | 内容是否相等（`boolean`） | `s.equals("PROGRAM")` → `true` |
| `s.compareTo(other)` | 字典序比较，返回负/零/正 | `"a".compareTo("b")` → 负数 |

> **`substring(i, j)` 的长度 = `j - i`**，这是计算子串的实用公式。

把索引想成字符**之间的「栅栏」**（fence post）会非常清晰——`substring(i, j)` 取的是第 `i` 道栅栏到第 `j` 道栅栏之间的字符：

<div class="diagram">
<svg viewBox="0 0 470 120" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="14">
  <!-- 7 chars PROGRAM -->
  <g>
    <rect x="50" y="40" width="50" height="40" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
    <rect x="100" y="40" width="50" height="40" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
    <rect x="150" y="40" width="50" height="40" fill="var(--dia-accent-soft)" stroke="var(--dia-accent)"/>
    <rect x="200" y="40" width="50" height="40" fill="var(--dia-accent-soft)" stroke="var(--dia-accent)"/>
    <rect x="250" y="40" width="50" height="40" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
    <rect x="300" y="40" width="50" height="40" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
    <rect x="350" y="40" width="50" height="40" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-stroke)">
    <text x="75" y="66">P</text><text x="125" y="66">R</text>
    <text x="175" y="66" fill="var(--dia-accent)">O</text><text x="225" y="66" fill="var(--dia-accent)">G</text>
    <text x="275" y="66">R</text><text x="325" y="66">A</text><text x="375" y="66">M</text>
  </g>
  <!-- fence indices 0..7 -->
  <g text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="11">
    <text x="50" y="98">0</text><text x="100" y="98">1</text>
    <text x="150" y="98" fill="var(--dia-accent)">2</text><text x="200" y="98">3</text>
    <text x="250" y="98" fill="var(--dia-accent)">4</text><text x="300" y="98">5</text>
    <text x="350" y="98">6</text><text x="400" y="98">7</text>
  </g>
  <text x="225" y="28" text-anchor="middle" fill="var(--dia-accent)" font-size="12">substring(2, 4) → "OG"</text>
</svg>
<p class="figure-caption">把索引看作字符之间的栅栏：substring(2,4) 取第 2 到第 4 道栅栏之间的字符 "OG"，长度 4−2=2。</p>
</div>

## 遍历字符串

```java
String s = "code";
for (int i = 0; i < s.length(); i++) {
    String ch = s.substring(i, i + 1);   // 取第 i 个字符（作为长度1的子串）
    System.out.println(ch);
}
```

## 比较字符串

- 内容相等：`s1.equals(s2)`（**不要用 `==`**，`==` 比的是引用）。
- 排序/字典序：`s1.compareTo(s2)`，结果 `<0` 表示 `s1` 在前，`0` 相等，`>0` 在后。

```java
if ("apple".compareTo("banana") < 0)  // true，apple 字典序在前
```

## 易错提醒

- **忘记接住返回值**：`s.replace(...)`、`s.substring(...)` 都返回新串。
- `substring(i, j)` 的 `j` 是**不包含**的；`j` 超过 `length()` 会抛 `StringIndexOutOfBoundsException`。
- 比较内容必须 `.equals()`。
- 索引从 0 到 `length()-1`。

## 小结

- `String` **不可变**——「修改」方法都返回新串，记得接住。
- 熟记 `length / substring / indexOf / equals / compareTo`。
- `substring(i, j)` 取 `[i, j)`，长度 `j - i`。
