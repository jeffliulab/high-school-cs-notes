# 变量与基本数据类型

变量是「带名字的存储格」，类型决定它能存什么、占多大、能做什么运算。AP CSA 只考查三种基本类型。

## 变量

**变量（variable）** 在使用前必须**声明类型**：

```java
int age;          // 声明
age = 17;         // 赋值
int score = 95;   // 声明并初始化（推荐）
```

- 变量名遵循驼峰命名（`myScore`），区分大小写，不能以数字开头，不能用保留字。
- 使用未初始化的局部变量会**编译错误**。

## 三种基本类型（AP Java 子集）

| 类型 | 含义 | 例子 | 取值范围 |
| --- | --- | --- | --- |
| `int` | 整数 | `42`、`-7`、`0` | $-2^{31} \sim 2^{31}-1$（约 ±21 亿） |
| `double` | 双精度小数 | `3.14`、`-0.5`、`2.0` | 很大，但有精度限制 |
| `boolean` | 真假 | `true`、`false` | 仅两个值 |

> 考纲只要求这三种。`char`、`long` 等不在 AP Java 子集内（部分教材会顺带提到 `char`）。

## 基本类型 vs 引用类型

- **基本类型（primitive）**：`int`、`double`、`boolean`，变量**直接存储值**本身。
- **引用类型（reference）**：如 `String`、数组、对象，变量存储的是**指向对象的引用（地址）**，对象本身另存于堆中。

<div class="diagram">
<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="13">
  <text x="120" y="22" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="12">基本类型：格子里直接放值</text>
  <text x="340" y="22" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="12">引用类型：格子里放地址</text>
  <line x1="230" y1="35" x2="230" y2="185" stroke="var(--dia-rule)" stroke-dasharray="4 4"/>
  <!-- primitive -->
  <rect x="40" y="50" width="150" height="34" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="55" y="72" fill="var(--dia-stroke-soft)" font-size="11">age</text>
  <text x="150" y="72" text-anchor="middle" fill="var(--dia-accent)">17</text>
  <rect x="40" y="100" width="150" height="34" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="55" y="122" fill="var(--dia-stroke-soft)" font-size="11">pi</text>
  <text x="150" y="122" text-anchor="middle" fill="var(--dia-accent)">3.14</text>
  <!-- reference -->
  <rect x="250" y="50" width="120" height="34" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="263" y="72" fill="var(--dia-stroke-soft)" font-size="11">s</text>
  <circle cx="350" cy="67" r="4" fill="var(--dia-blue)"/>
  <rect x="250" y="100" width="120" height="34" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="263" y="122" fill="var(--dia-stroke-soft)" font-size="11">t</text>
  <text x="340" y="122" text-anchor="middle" fill="var(--dia-stroke-tertiary)">null</text>
  <!-- heap object -->
  <rect x="360" y="150" width="90" height="30" rx="4" fill="var(--dia-bg-card)" stroke="var(--dia-blue)"/>
  <text x="405" y="170" text-anchor="middle" fill="var(--dia-blue)" font-size="12">"hi"</text>
  <path d="M350,71 C350,120 405,125 405,150" fill="none" stroke="var(--dia-blue)" marker-end="url(#vr)"/>
  <text x="408" y="142" fill="var(--dia-stroke-soft)" font-size="10">堆中对象</text>
  <defs><marker id="vr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-blue)"/></marker></defs>
</svg>
<p class="figure-caption">基本类型变量直接装着值；引用类型变量装的是指向堆中对象的「地址」，<code>null</code> 表示不指向任何对象。</p>
</div>

这一区别在后面「[对象与类](objects_classes.md)」「[参数传递](method_calls.md)」中至关重要：基本类型赋值是**拷贝值**，引用类型赋值是**拷贝地址**（两个变量指向同一对象）。

## int 与 double 的关键差异

```java
int a = 7, b = 2;
System.out.println(a / b);     // 3   —— 整数除法，向零截断
System.out.println(7.0 / 2);   // 3.5 —— 有一个 double 即按浮点运算
```

- `int / int` 结果仍是 `int`，**小数部分被丢弃**（不是四舍五入）。
- `double` 存在精度误差，例如 `0.1 + 0.2` 不精确等于 `0.3`，**不要用 `==` 比较浮点数**。

## 常量

用 `final` 声明的变量是**常量**，赋值后不可更改：

```java
final double PI = 3.14159;
// PI = 3; // 编译错误
```

常量名习惯全大写。

## 易错提醒

- 把整数运算结果赋给 `double` 不会自动恢复精度：`double x = 7 / 2;` 得到 `3.0`，而非 `3.5`（除法在赋值前已按 int 完成）。
- `int` 溢出会「绕回」到负数，不会报错。

## 小结

- 变量先声明类型、再使用；局部变量必须初始化。
- 记牢三类型 `int / double / boolean` 与 `int` 的取值范围。
- **整数除法截断**与**浮点不精确**是 MCQ 的高频陷阱。
