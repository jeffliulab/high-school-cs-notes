# 排序算法

把数组按升序排列。AP 要求掌握三种：选择排序、插入排序（都是 $n^2$ 量级）和归并排序（$n\log n$，更快）。

## 选择排序（Selection Sort）

思想：每一轮从「未排序部分」选出**最小值**，放到已排序部分的末尾。

```java
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        // 把最小值换到位置 i
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}
```

每轮确定一个最终位置，比较次数约 $n^2/2$。

## 插入排序（Insertion Sort）

思想：像理扑克牌，把每个新元素**插入到前面已排好序的部分**的正确位置。

```java
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];   // 比 key 大的元素后移
            j--;
        }
        arr[j + 1] = key;          // 插入 key
    }
}
```

特点：对**接近有序**的数组很快（接近线性）；最坏（逆序）约 $n^2/2$。

## 归并排序（Merge Sort）

思想：**分治**——把数组对半分，递归排序两半，再**合并**两个有序数组。

```java
public static void mergeSort(int[] arr, int lo, int hi) {
    if (lo < hi) {                       // 基准情形：单元素天然有序
        int mid = (lo + hi) / 2;
        mergeSort(arr, lo, mid);         // 排左半
        mergeSort(arr, mid + 1, hi);     // 排右半
        merge(arr, lo, mid, hi);         // 合并
    }
}
```

合并时用双指针比较两半的当前元素，依次取较小者。归并排序的效率是 $n\log n$——比前两者快得多。

<div class="diagram">
<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <text x="60" y="14" fill="var(--dia-blue)" font-size="10">↓ 分（divide）</text>
  <text x="300" y="14" fill="var(--dia-accent)" font-size="10">↑ 合并（merge）</text>
  <!-- level 0 -->
  <rect x="150" y="22" width="140" height="24" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="220" y="39" text-anchor="middle" fill="var(--dia-stroke)">[5 2 4 1]</text>
  <!-- level 1 -->
  <rect x="80" y="74" width="80" height="24" fill="var(--dia-bg-card)" stroke="var(--dia-blue)"/>
  <text x="120" y="91" text-anchor="middle" fill="var(--dia-blue)">[5 2]</text>
  <rect x="280" y="74" width="80" height="24" fill="var(--dia-bg-card)" stroke="var(--dia-blue)"/>
  <text x="320" y="91" text-anchor="middle" fill="var(--dia-blue)">[4 1]</text>
  <!-- level 2 -->
  <g fill="var(--dia-bg-card)" stroke="var(--dia-stroke-soft)">
    <rect x="55" y="124" width="34" height="22"/><rect x="135" y="124" width="34" height="22"/>
    <rect x="255" y="124" width="34" height="22"/><rect x="335" y="124" width="34" height="22"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-stroke-soft)">
    <text x="72" y="140">5</text><text x="152" y="140">2</text><text x="272" y="140">4</text><text x="352" y="140">1</text>
  </g>
  <!-- merged results -->
  <text x="120" y="178" text-anchor="middle" fill="var(--dia-accent)">[2 5]</text>
  <text x="320" y="178" text-anchor="middle" fill="var(--dia-accent)">[1 4]</text>
  <text x="220" y="202" text-anchor="middle" fill="var(--dia-accent)" font-weight="500">[1 2 4 5]</text>
  <!-- divide lines -->
  <g stroke="var(--dia-blue)" opacity="0.6">
    <line x1="190" y1="46" x2="120" y2="74"/><line x1="250" y1="46" x2="320" y2="74"/>
    <line x1="105" y1="98" x2="72" y2="124"/><line x1="135" y1="98" x2="152" y2="124"/>
    <line x1="305" y1="98" x2="272" y2="124"/><line x1="335" y1="98" x2="352" y2="124"/>
  </g>
</svg>
<p class="figure-caption">归并排序：不断对半「分」到单元素（天然有序），再两两「合并」成有序段，自底向上拼出完整有序数组。树高 log n，每层合并共 n 次比较，故 O(n log n)。</p>
</div>

## 三种排序对比

| 算法 | 思想 | 最坏比较次数 | 备注 |
| --- | --- | --- | --- |
| 选择排序 | 每轮选最小 | ~$n^2$ | 交换次数少 |
| 插入排序 | 逐个插入 | ~$n^2$ | 近乎有序时很快 |
| 归并排序 | 分治合并 | ~$n\log n$ | 需要额外空间 |

> $n\log n$ 与 $n^2$ 的差距：`n=1000` 时约 1万 vs 100万——归并排序快约百倍。

## 比较次数题（高频 MCQ）

考试常问「某算法在给定数组上**第一趟/第 k 趟后**数组长什么样」或「共做多少次比较/交换」。复习时**手动模拟**几个小例子（如对 `{5,2,4,1}` 走选择/插入排序）非常有效。

## 易错提醒

- 选择/插入排序是 $n^2$，归并是 $n\log n$——别记反量级。
- 插入排序内层 `while` 边界 `j >= 0 && arr[j] > key`，缺一不可。
- 归并排序的基准情形是区间长度 ≤ 1（`lo < hi` 为 false 时返回）。
- 排序后才能用 [二分查找](searching.md)。

## 小结

- 三种排序：选择、插入（$n^2$）、归并（$n\log n$）。
- 插入排序对近乎有序的数据高效；归并靠分治达到 $n\log n$。
- 考试侧重**手动模拟某趟结果**与**比较效率**，多练小例子。
