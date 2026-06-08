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

<div class="diagram">
<svg viewBox="0 0 430 180" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <g fill="var(--dia-bg-card)" stroke="var(--dia-accent)">
    <polygon points="70,15 130,38 70,61 10,38"/>
    <polygon points="70,75 130,98 70,121 10,98"/>
    <polygon points="70,135 130,158 70,181 10,158"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-accent)">
    <text x="70" y="42">≥90?</text><text x="70" y="102">≥80?</text><text x="70" y="162">≥60?</text>
  </g>
  <!-- true branches -->
  <g fill="var(--dia-bg-card)" stroke="var(--dia-green)">
    <rect x="170" y="22" width="60" height="32" rx="4"/>
    <rect x="170" y="82" width="60" height="32" rx="4"/>
    <rect x="170" y="142" width="60" height="32" rx="4"/>
    <rect x="320" y="142" width="60" height="32" rx="4"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-green)">
    <text x="200" y="42">"A"</text><text x="200" y="102">"B"</text><text x="200" y="162">"C"</text><text x="350" y="162">"F"</text>
  </g>
  <g stroke="var(--dia-green)" marker-end="url(#it)">
    <line x1="130" y1="38" x2="168" y2="38"/><line x1="130" y1="98" x2="168" y2="98"/><line x1="130" y1="158" x2="168" y2="158"/>
  </g>
  <g stroke="var(--dia-stroke-soft)" marker-end="url(#if2)">
    <line x1="70" y1="61" x2="70" y2="75"/><line x1="70" y1="121" x2="70" y2="135"/><line x1="130" y1="158" x2="318" y2="158"/>
  </g>
  <text x="80" y="73" fill="var(--dia-stroke-soft)" font-size="9">false↓</text>
  <text x="240" y="153" fill="var(--dia-stroke-soft)" font-size="9">都 false → else</text>
  <defs>
    <marker id="it" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-green)"/></marker>
    <marker id="if2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L5,3 L0,6" fill="var(--dia-stroke-soft)"/></marker>
  </defs>
</svg>
<p class="figure-caption">if-else-if 链自上而下逐个判断，命中第一个 true 即执行对应分支并跳出；全 false 才走 else。</p>
</div>

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
