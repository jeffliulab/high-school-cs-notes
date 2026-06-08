# 复合赋值与类型转换

复合赋值运算符（`+=`、`++` 等）是简写；类型转换（casting）控制 `int` 与 `double` 之间的转换，是高频考点。

## 复合赋值运算符

| 写法 | 等价于 |
| --- | --- |
| `x += 3` | `x = x + 3` |
| `x -= 3` | `x = x - 3` |
| `x *= 2` | `x = x * 2` |
| `x /= 2` | `x = x / 2` |
| `x %= 5` | `x = x % 5` |

```java
int total = 0;
total += 10;   // total = 10
total *= 3;    // total = 30
```

## 自增与自减

```java
int i = 5;
i++;   // i = 6（自增，等价 i += 1）
i--;   // i = 5（自减）
```

`i++`（后缀）与 `++i`（前缀）单独成句时效果相同；AP 考试很少考它们在表达式中的取值差异，但要会读 `i++`。

## 类型转换（Casting）

### 自动转换（拓宽，int → double）

把 `int` 赋给 `double` 时自动、安全地转换：

```java
double d = 5;        // d = 5.0
double avg = 10 / 4; // 注意：先算 10/4=2（int），再转 d=2.0！
```

### 强制转换（缩窄，double → int）

把 `double` 转成 `int` 必须**显式**写 `(int)`，**直接截断小数部分**（不是四舍五入）：

```java
double price = 9.99;
int p = (int) price;        // 9
System.out.println((int) 3.99);  // 3
System.out.println((int) -3.99); // -3（向零截断）
```

### 求精确平均值的正确姿势

```java
int sum = 10, count = 4;
double avg = (double) sum / count;   // 2.5 ✔
double bad = (double) (sum / count); // 2.0 ✗ 括号位置错了
```

`(double) sum / count`：先把 `sum` 转成 `double`，再做浮点除法，得 `2.5`；而 `(double)(sum / count)` 是先做整数除法得 `2`，再转成 `2.0`。

### 四舍五入小技巧

对正数，加 `0.5` 再强制转 `int`：

```java
double x = 3.7;
int rounded = (int)(x + 0.5);   // 4
```

或使用 `Math.round`（返回 `long`，需再转）。

## 易错提醒

- `(int)` 是**截断**而非四舍五入：`(int) 3.99` 得 `3`。
- 转换的**括号优先级很高**：`(double) sum / count` ≠ `(double)(sum / count)`。
- 强制转换不改变原变量，只产生一个新值。

## 小结

- `+=`、`++` 等是简写，能让代码更紧凑。
- **拓宽自动、缩窄需 `(int)` 且截断**。
- 平均值、四舍五入是 casting 的经典应用，注意括号位置。
