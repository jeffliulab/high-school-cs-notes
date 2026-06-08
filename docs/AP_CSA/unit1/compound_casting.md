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

`int` 与 `double` 之间的转换有两个方向——「拓宽」自动安全，「缩窄」需手动且会丢精度：

<div class="diagram">
<svg viewBox="0 0 440 130" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="13">
  <rect x="40" y="50" width="120" height="44" rx="4" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="100" y="70" text-anchor="middle" fill="var(--dia-stroke)">int</text>
  <text x="100" y="86" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="10">5</text>
  <rect x="280" y="50" width="120" height="44" rx="4" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="340" y="70" text-anchor="middle" fill="var(--dia-stroke)">double</text>
  <text x="340" y="86" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="10">5.0</text>
  <!-- widening arrow (top, auto) -->
  <path d="M160,62 L280,62" fill="none" stroke="var(--dia-green)" stroke-width="2" marker-end="url(#cw)"/>
  <text x="220" y="40" text-anchor="middle" fill="var(--dia-green)" font-size="11">拓宽 · 自动 · 安全</text>
  <!-- narrowing arrow (bottom, manual) -->
  <path d="M280,82 L160,82" fill="none" stroke="var(--dia-accent)" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#cn)"/>
  <text x="220" y="116" text-anchor="middle" fill="var(--dia-accent)" font-size="11">缩窄 · 需 (int) · 截断丢精度</text>
  <defs>
    <marker id="cw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-green)"/></marker>
    <marker id="cn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-accent)"/></marker>
  </defs>
</svg>
<p class="figure-caption">int → double 自动拓宽（不丢信息）；double → int 必须写 (int) 强制缩窄，小数部分被直接截断。</p>
</div>

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
