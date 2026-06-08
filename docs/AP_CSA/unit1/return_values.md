# 带返回值的方法

很多方法会「算出一个结果交还给你」——这就是返回值。学会接收、使用和链式调用返回值。

## 返回值是什么

方法的**返回类型**写在方法名前。非 `void` 方法执行到 `return` 时，把一个值交还给调用处：

```java
String s = "Hello";
int len = s.length();    // length() 返回 int，存入 len
```

`s.length()` 这个**方法调用表达式**本身就「等于」它的返回值，可以像普通值一样使用。

## 使用返回值的三种方式

```java
String s = "programming";

// 1) 存入变量
int n = s.length();

// 2) 直接用在更大的表达式 / 输出中
System.out.println(s.length() + 1);   // 12

// 3) 作为另一个方法的实参
System.out.println(s.substring(0, s.length() - 4));  // "program"
```

## 链式调用

由于方法调用表达式「等于」其返回值，若返回的是对象，可继续在其上调用方法：

```java
String s = "  Hello  ";
String r = s.trim().toUpperCase();   // 先 trim → "Hello"，再大写 → "HELLO"
int c = "banana".indexOf("a");       // 1
```

从左到右依次求值：`s.trim()` 先返回新串，再在该串上调用 `toUpperCase()`。

## 返回值类型要匹配

接收返回值的变量类型必须兼容：

```java
double r = Math.sqrt(2);    // sqrt 返回 double ✔
int bad = Math.sqrt(2);     // 编译错误：double 不能直接给 int
int ok = (int) Math.sqrt(2);// 需要强制转换
```

## 常见返回值方法速查

| 调用 | 返回类型 | 返回值 |
| --- | --- | --- |
| `"abc".length()` | `int` | `3` |
| `"abc".substring(1)` | `String` | `"bc"` |
| `"abc".indexOf("c")` | `int` | `2` |
| `"abc".equals("abc")` | `boolean` | `true` |
| `Math.max(3, 7)` | `int` | `7` |
| `Math.sqrt(9)` | `double` | `3.0` |

## 易错提醒

- 别忘了「**接住**」返回值——`s.trim();` 单独一行不会改变 `s`（`String` 不可变，trim 返回新串你没接）。
- 返回类型不匹配会编译错误，必要时强制转换。
- 链式调用从左到右逐步求值，每一步都产生中间结果。

## 小结

- 方法调用表达式 = 它的返回值，可赋值、可参与运算、可作实参。
- 返回对象时可**链式调用**。
- 注意接住返回值，尤其对**不可变**的 `String`。
