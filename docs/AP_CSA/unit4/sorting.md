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
