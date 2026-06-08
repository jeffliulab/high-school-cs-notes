# 二维数组遍历

遍历二维数组用**嵌套循环**：外层走行、内层走列。这是 FRQ 第 4 题的基本功。

## 行优先遍历（最常用）

外层遍历行，内层遍历列：

```java
int[][] m = {{1, 2, 3}, {4, 5, 6}};
for (int r = 0; r < m.length; r++) {        // 行
    for (int c = 0; c < m[r].length; c++) { // 列
        System.out.print(m[r][c] + " ");
    }
    System.out.println();   // 每行后换行
}
```

输出：

```
1 2 3
4 5 6
```

## 嵌套 for-each

只读遍历且不需要行列索引时，可用嵌套增强 for——外层取出「每一行（一维数组）」，内层取出「行中每个元素」：

```java
for (int[] row : m) {        // row 是一整行
    for (int x : row) {      // x 是该行每个元素
        System.out.print(x + " ");
    }
    System.out.println();
}
```

> 与一维数组一样，for-each **改不动**元素本身；要修改请用索引嵌套循环。

## 列优先遍历

外层走列、内层走行（按列读取）：

```java
for (int c = 0; c < m[0].length; c++) {
    for (int r = 0; r < m.length; r++) {
        System.out.print(m[r][c] + " ");
    }
}
```

注意边界：列优先时外层用 `m[0].length`（列数），内层用 `m.length`（行数）。

## 常见二维算法

**求所有元素之和**：

```java
int sum = 0;
for (int r = 0; r < m.length; r++)
    for (int c = 0; c < m[r].length; c++)
        sum += m[r][c];
```

**求某一行 / 某一列的和**：

```java
// 第 k 行之和
int rowSum = 0;
for (int c = 0; c < m[k].length; c++) rowSum += m[k][c];

// 第 k 列之和
int colSum = 0;
for (int r = 0; r < m.length; r++) colSum += m[r][k];
```

**查找最大值及其位置**：

```java
int max = m[0][0], maxR = 0, maxC = 0;
for (int r = 0; r < m.length; r++)
    for (int c = 0; c < m[r].length; c++)
        if (m[r][c] > max) { max = m[r][c]; maxR = r; maxC = c; }
```

**主对角线之和**（方阵）：

```java
int diag = 0;
for (int i = 0; i < m.length; i++) diag += m[i][i];
```

## 易错提醒

- 内层循环边界用 `m[r].length`（列数），外层用 `m.length`（行数），别写反。
- 列优先遍历时外层边界是列数 `m[0].length`。
- for-each 嵌套无法修改元素、拿不到行列号。
- 访问 `m[r][c]` 前确保 `r`、`c` 都在范围内。

## 小结

- 标准遍历是**外行内列**的嵌套 for；用 `m.length` 行、`m[r].length` 列。
- 嵌套 for-each 适合只读；修改用索引嵌套循环。
- 行和、列和、对角线、找最值是常见二维算法模板。
