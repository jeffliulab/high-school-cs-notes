# 第四单元：数据集合

> **考试权重**：30–40%（多选题，全卷占比最高）

本单元是 AP CSA 权重最大的部分，讲如何**存储和处理一组数据**：数组、`ArrayList`、二维数组，以及作用其上的**查找、排序、递归**算法。FRQ Q3（ArrayList）与 Q4（二维数组）直接考查本单元。

## 本单元内容

1. [一维数组](arrays.md) —— 声明、初始化、索引、`length`、越界异常。
2. [数组遍历与 for-each](array_traversal.md) —— 索引循环 vs 增强 for 循环。
3. [数组标准算法](array_algorithms.md) —— 求最值、求和、计数、查找、移动元素。
4. [ArrayList](arraylist.md) —— `add/get/set/remove/size`、与数组的取舍。
5. [ArrayList 标准算法](arraylist_algorithms.md) —— 遍历删除的陷阱、插入、统计。
6. [二维数组](array_2d.md) —— 行列结构、声明与初始化。
7. [二维数组遍历](array_2d_traversal.md) —— 嵌套循环、行优先/列优先、嵌套 for-each。
8. [文本文件与 Scanner](text_files_scanner.md) —— **新增考点**：用 `Scanner` 读文件与数据集。
9. [顺序查找与二分查找](searching.md) —— 线性查找、二分查找及其前提。
10. [排序算法](sorting.md) —— 选择排序、插入排序、归并排序及效率比较。
11. [递归](recursion.md) —— 基准情形、递归调用、Tower of Hanoi、二分递归。

## 学习目标

- 在数组与 `ArrayList` 之间根据是否需要动态增删做出选择。
- 熟练写出各种**标准算法**（求最值、统计、就地修改）。
- 正确遍历二维数组（注意 `arr.length` 是行数，`arr[0].length` 是列数）。
- 理解二分查找的前提（已排序）与三种排序算法的效率差异。
- 读懂并写出简单递归方法，识别基准情形。

## 易错提醒

- 数组越界 `ArrayIndexOutOfBoundsException`：索引范围是 `0 .. length-1`。
- 遍历 `ArrayList` 时直接 `remove` 会跳过元素——应倒序遍历或用迭代器。
- 增强 for 循环**不能修改**数组元素本身，也拿不到索引。
- 二分查找的数组**必须有序**，否则结果未定义。
