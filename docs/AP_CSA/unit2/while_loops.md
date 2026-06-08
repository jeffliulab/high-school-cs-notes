# while 循环

`while` 循环在条件为真时**反复执行**一段代码，适合「不知道要循环多少次、只知道何时停止」的场景。

## 语法与执行流程

```java
while (条件) {
    // 循环体
}
```

执行流程：判断条件 → 若 `true` 执行循环体 → 回到判断 → …… → 条件为 `false` 时退出。

<div class="diagram">
<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- condition diamond -->
  <polygon points="130,20 230,55 130,90 30,55" fill="var(--dia-bg-card)" stroke="var(--dia-accent)"/>
  <text x="130" y="59" text-anchor="middle" fill="var(--dia-accent)">条件?</text>
  <!-- body box -->
  <rect x="60" y="120" width="140" height="40" rx="4" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="130" y="144" text-anchor="middle" fill="var(--dia-stroke)">循环体 + 更新</text>
  <!-- exit -->
  <text x="270" y="59" fill="var(--dia-stroke-soft)">false → 退出</text>
  <!-- arrows -->
  <line x1="130" y1="90" x2="130" y2="120" stroke="var(--dia-green)" marker-end="url(#wt)"/>
  <text x="138" y="110" fill="var(--dia-green)">true</text>
  <line x1="230" y1="55" x2="258" y2="55" stroke="var(--dia-stroke)" marker-end="url(#we)"/>
  <!-- loop back -->
  <path d="M200,140 C300,140 300,55 232,55" fill="none" stroke="var(--dia-stroke-soft)" stroke-dasharray="4 3" marker-end="url(#wb)"/>
  <text x="250" y="120" fill="var(--dia-stroke-soft)" font-size="10">回到判断</text>
  <defs>
    <marker id="wt" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-green)"/></marker>
    <marker id="we" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-stroke)"/></marker>
    <marker id="wb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-stroke-soft)"/></marker>
  </defs>
</svg>
<p class="figure-caption">while 循环流程：条件为 true 才进入循环体；循环体内必须有「更新」使条件最终变 false，否则死循环。</p>
</div>

```java
int i = 1;
while (i <= 5) {
    System.out.println(i);
    i++;            // 别忘了更新！
}
// 输出 1 2 3 4 5
```

## 循环的三要素

任何正确的循环都需要：

1. **初始化**：循环前设置控制变量（`int i = 1;`）。
2. **条件**：决定是否继续（`i <= 5`）。
3. **更新**：循环体内推进控制变量（`i++`），使条件最终变 `false`。

漏掉**更新**就会**死循环（infinite loop）**：

```java
int i = 1;
while (i <= 5) {
    System.out.println(i);   // i 永远是 1，无限输出
}
```

## 典型应用

**累加求和**：

```java
int sum = 0, n = 1;
while (n <= 100) {
    sum += n;
    n++;
}   // sum = 5050
```

**按条件处理（次数未知）** —— 反复折半直到为 0：

```java
int x = 100;
int steps = 0;
while (x > 0) {
    x /= 2;
    steps++;
}
```

## break 与 continue

- `break`：立即**跳出**整个循环。
- `continue`：跳过本次剩余语句，直接进入**下一次**条件判断。

```java
int i = 0;
while (true) {           // 配合 break 的「无限循环」
    i++;
    if (i == 5) continue;   // 跳过 5
    if (i > 8) break;       // i>8 时退出
    System.out.println(i);  // 1 2 3 4 6 7 8
}
```

> 用 `continue` 时小心：若更新语句在 `continue` 之后，可能导致死循环。

## 循环不变量与边界

写循环时想清楚：循环结束时控制变量是什么值？条件是 `<` 还是 `<=`？这类**差一（off-by-one）**错误极常见，建议用小例子手动「走一遍」验证。

## 易错提醒

- 忘记更新控制变量 → 死循环。
- 边界用错 `<` / `<=` → 多算或少算一次。
- 在 `while(true)` 中必须有可达的 `break`，否则永不退出。

## 小结

- `while` 适合**循环次数未知**、靠条件停止的场景。
- 牢记**初始化 / 条件 / 更新**三要素，缺更新即死循环。
- `break` 跳出、`continue` 跳过本次；注意更新语句位置。
