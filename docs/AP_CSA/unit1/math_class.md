# Math 类

`Math` 是一个全是**静态方法**的工具类，提供常用数学运算。AP 考试只考查其中很少几个方法。

## 静态方法的调用方式

`Math` 的方法都是 **静态方法**，直接用「类名.方法()」调用，**不需要创建对象**：

```java
double r = Math.sqrt(16);   // 4.0，无需 new Math()
```

## AP Java 子集中的 Math 方法

只需熟练这五个：

| 方法 | 返回类型 | 说明 | 例 |
| --- | --- | --- | --- |
| `Math.abs(x)` | 同参数类型 | 绝对值 | `Math.abs(-5)` → `5` |
| `Math.pow(b, e)` | `double` | $b^{e}$ | `Math.pow(2, 10)` → `1024.0` |
| `Math.sqrt(x)` | `double` | 平方根 | `Math.sqrt(2)` → `1.414...` |
| `Math.random()` | `double` | $[0.0, 1.0)$ 的随机数 | `0.0 ≤ r < 1.0` |
| `Math.max / Math.min` | 同参数类型 | 两数最大/最小 | `Math.max(3, 7)` → `7` |

> 注意 `Math.pow` 和 `Math.sqrt` 总是返回 `double`，即使结果看起来是整数（`Math.pow(2,3)` 是 `8.0`）。需要 `int` 时要强制转换：`int p = (int) Math.pow(2, 3);`。

## Math.random() 与生成随机整数

`Math.random()` 返回 $[0.0, 1.0)$ 的 `double`。生成指定范围的**随机整数**是必考套路：

**生成 `[0, n)` 的整数**（即 `0` 到 `n-1`）：

```java
int r = (int)(Math.random() * n);
```

**生成 `[min, max]` 的整数**（含两端）：

```java
int r = (int)(Math.random() * (max - min + 1)) + min;
```

例如生成骰子点数 `[1, 6]`：

```java
int dice = (int)(Math.random() * 6) + 1;
```

### 推导

- `Math.random() * 6` 落在 $[0.0, 6.0)$。
- `(int)` 截断后得到 `0,1,2,3,4,5`（即 `[0, 6)`）。
- `+ 1` 平移到 `1,2,3,4,5,6`。

<div class="diagram">
<svg viewBox="0 0 460 150" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- step 1 -->
  <text x="10" y="30" fill="var(--dia-stroke-soft)">random()</text>
  <line x1="120" y1="25" x2="300" y2="25" stroke="var(--dia-stroke)"/>
  <line x1="120" y1="20" x2="120" y2="30" stroke="var(--dia-stroke)"/>
  <line x1="300" y1="20" x2="300" y2="30" stroke="var(--dia-stroke)"/>
  <text x="118" y="44" text-anchor="middle" fill="var(--dia-stroke)">0.0</text>
  <text x="300" y="44" text-anchor="middle" fill="var(--dia-stroke-tertiary)">1.0)</text>
  <!-- step 2 ×6 -->
  <text x="10" y="78" fill="var(--dia-stroke-soft)">× 6</text>
  <line x1="120" y1="73" x2="420" y2="73" stroke="var(--dia-blue)"/>
  <line x1="120" y1="68" x2="120" y2="78" stroke="var(--dia-blue)"/>
  <line x1="420" y1="68" x2="420" y2="78" stroke="var(--dia-blue)"/>
  <text x="118" y="92" text-anchor="middle" fill="var(--dia-blue)">0.0</text>
  <text x="420" y="92" text-anchor="middle" fill="var(--dia-stroke-tertiary)">6.0)</text>
  <!-- step 3 (int) buckets -->
  <text x="10" y="126" fill="var(--dia-stroke-soft)">(int)</text>
  <g fill="var(--dia-accent-soft)" stroke="var(--dia-accent)">
    <rect x="120" y="110" width="50" height="26"/><rect x="170" y="110" width="50" height="26"/><rect x="220" y="110" width="50" height="26"/>
    <rect x="270" y="110" width="50" height="26"/><rect x="320" y="110" width="50" height="26"/><rect x="370" y="110" width="50" height="26"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-accent)">
    <text x="145" y="128">0</text><text x="195" y="128">1</text><text x="245" y="128">2</text>
    <text x="295" y="128">3</text><text x="345" y="128">4</text><text x="395" y="128">5</text>
  </g>
</svg>
<p class="figure-caption">乘 6 把 [0,1) 拉伸到 [0,6)，(int) 截断成 6 个等宽「桶」0–5；再 +1 即骰子点数 1–6。</p>
</div>

## 易错提醒

- `Math.pow` / `Math.sqrt` 返回 **`double`**，赋给 `int` 需 `(int)`。
- 随机整数公式里区间长度是 `max - min + 1`（含两端别忘 `+1`）。
- `Math.random()` **取不到 1.0**（右开区间），但能取到 0.0。
- `Math` 不能 `new`——它没有可用的公开构造方法，全部静态调用。

## 小结

- `Math` 全是静态方法，`Math.方法()` 直接用。
- 熟记 `abs / pow / sqrt / random / max / min`。
- **随机整数公式** `(int)(Math.random()*(max-min+1))+min` 必须背熟。
