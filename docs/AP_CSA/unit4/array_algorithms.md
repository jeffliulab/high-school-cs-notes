# 数组标准算法

一组在数组上反复出现的「套路」——求最值、求和均值、计数、查找、判断、移动元素。FRQ 与 MCQ 都高频考查。

## 求和与平均值

```java
int sum = 0;
for (int x : arr) sum += x;
double avg = (double) sum / arr.length;   // 注意转 double 求精确均值
```

## 求最大值 / 最小值

先假设第一个是最大，再逐个比较更新：

```java
int max = arr[0];
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}
```

若要**最大值的位置（索引）**：

```java
int maxIdx = 0;
for (int i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIdx]) maxIdx = i;
}
```

> 注意：数组可能为空时 `arr[0]` 会越界——题目通常保证非空（前置条件）。

## 计数（满足条件的元素个数）

```java
int count = 0;
for (int x : arr) {
    if (x % 2 == 0) count++;     // 统计偶数个数
}
```

## 查找（是否存在 / 第一个位置）

线性查找，找到即可提前返回：

```java
public static int indexOf(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;   // 返回首个位置
    }
    return -1;                            // 没找到约定返回 -1
}
```

## 判断「全部 / 存在」

```java
boolean allPositive = true;
for (int x : arr) {
    if (x <= 0) { allPositive = false; break; }   // 有一个反例即可断定
}

boolean hasNegative = false;
for (int x : arr) {
    if (x < 0) { hasNegative = true; break; }
}
```

> 「全部满足」初值设 `true`，遇反例改 `false`；「存在满足」初值设 `false`，遇命中改 `true`。

## 统计/计数数组（桶）

用一个数组记录每个值出现的次数：

```java
// 统计 0~9 的数字各出现多少次
int[] freq = new int[10];
for (int x : arr) {
    freq[x]++;       // 以值作为索引
}
```

## 移动 / 修改元素

**整体加倍**：

```java
for (int i = 0; i < arr.length; i++) arr[i] *= 2;
```

**反转数组**（对撞双指针）：

```java
int lo = 0, hi = arr.length - 1;
while (lo < hi) {
    int temp = arr[lo];
    arr[lo] = arr[hi];
    arr[hi] = temp;
    lo++; hi--;
}
```

## 易错提醒

- 求最值时循环从 `i = 1` 开始（`i = 0` 已作初值），且数组须非空。
- 求平均值记得 `(double)` 转换避免整数除法截断。
- 「全部/存在」判断的布尔初值和更新方向别搞反。
- 交换两元素需要临时变量 `temp`。

## 小结

- 标准算法：求和均值、最值（值/索引）、计数、线性查找、全/存在判断、桶计数、就地修改与反转。
- 这些是 FRQ 的基本积木，务必能默写。
