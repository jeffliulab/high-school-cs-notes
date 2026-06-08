# 二维数组

二维数组是「数组的数组」，用来表示**表格、矩阵、网格**等行列结构。FRQ 第 4 题专门考查。

## 声明与创建

```java
int[][] grid = new int[3][4];   // 3 行 4 列，全为 0
```

把它想象成 3 行、每行 4 个元素的表格：

```
列→   0   1   2   3
行0 [  0   0   0   0 ]
行1 [  0   0   0   0 ]
行2 [  0   0   0   0 ]
```

## 初始化列表

```java
int[][] m = {
    {1, 2, 3},
    {4, 5, 6}
};      // 2 行 3 列
```

## 访问元素：[行][列]

```java
int[][] m = {{1, 2, 3}, {4, 5, 6}};
System.out.println(m[0][2]);   // 3（第0行第2列）
System.out.println(m[1][0]);   // 4（第1行第0列）
m[1][2] = 99;                  // 修改
```

**先行后列**：`m[r][c]` 表示第 `r` 行、第 `c` 列。

## 行数与列数

```java
int rows = m.length;        // 行数 = 2
int cols = m[0].length;     // 列数 = 3（第0行的长度）
```

- `m.length` 是**行数**。
- `m[r].length` 是第 `r` 行的**列数**。

> AP 考试中的二维数组都是**矩形**（每行列数相同），所以 `m[0].length` 即为列数。

## 二维数组是「数组的数组」

`m` 的每个元素 `m[r]` 本身是一个一维数组（一整行）：

```java
int[][] m = {{1, 2, 3}, {4, 5, 6}};
int[] firstRow = m[0];        // {1, 2, 3}
System.out.println(firstRow.length);   // 3
```

<div class="diagram">
<svg viewBox="0 0 380 130" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <rect x="20" y="20" width="40" height="26" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="40" y="38" text-anchor="middle" fill="var(--dia-stroke)">m[0]</text>
  <rect x="20" y="60" width="40" height="26" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="40" y="78" text-anchor="middle" fill="var(--dia-stroke)">m[1]</text>
  <g fill="var(--dia-bg-card)" stroke="var(--dia-accent)">
    <rect x="160" y="18" width="30" height="26"/><rect x="190" y="18" width="30" height="26"/><rect x="220" y="18" width="30" height="26"/>
    <rect x="160" y="60" width="30" height="26"/><rect x="190" y="60" width="30" height="26"/><rect x="220" y="60" width="30" height="26"/>
  </g>
  <g fill="var(--dia-accent)" text-anchor="middle">
    <text x="175" y="36">1</text><text x="205" y="36">2</text><text x="235" y="36">3</text>
    <text x="175" y="78">4</text><text x="205" y="78">5</text><text x="235" y="78">6</text>
  </g>
  <line x1="60" y1="33" x2="160" y2="31" stroke="var(--dia-stroke)" marker-end="url(#a3)"/>
  <line x1="60" y1="73" x2="160" y2="73" stroke="var(--dia-stroke)" marker-end="url(#a3)"/>
  <defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-stroke)"/></marker></defs>
</svg>
<p class="figure-caption">二维数组是「数组的数组」：m 的每个元素指向一行（一维数组）。</p>
</div>

## 易错提醒

- 顺序是 **`[行][列]`**，别写反。
- `m.length` 是行数，`m[0].length` 才是列数。
- 创建 `new int[3][4]` 是 3 行 4 列；别把行列数记反。
- 访问越界（行或列任一越界）都会抛 `ArrayIndexOutOfBoundsException`。

## 小结

- 二维数组表示行列网格，`m[r][c]` 先行后列。
- 行数 `m.length`，列数 `m[0].length`。
- 它本质是「数组的数组」，每行是一个一维数组。
