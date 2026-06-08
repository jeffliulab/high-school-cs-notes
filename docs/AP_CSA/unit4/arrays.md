# 一维数组

数组把**多个同类型元素**连续存放，用索引访问。它是存储「一组数据」的最基础结构。

## 声明与创建

```java
int[] scores = new int[5];      // 5 个 int，默认全为 0
double[] prices = new double[3];// 默认全为 0.0
String[] names = new String[4]; // 默认全为 null
```

`new int[5]` 创建长度为 5 的数组，元素被初始化为该类型的**默认值**。

## 初始化列表

已知初值时可直接列出，长度自动确定：

```java
int[] a = {3, 1, 4, 1, 5};      // 长度 5
String[] days = {"一", "二", "三"};
```

## 索引访问

数组**索引从 0 开始**，合法范围是 `0 .. length-1`：

```java
int[] a = {3, 1, 4, 1, 5};
System.out.println(a[0]);   // 3（第一个）
System.out.println(a[4]);   // 5（最后一个）
a[1] = 99;                  // 修改第二个元素
```

## length 字段

`数组.length` 给出元素个数（注意：是**字段没有括号**，区别于 `String.length()` 方法）：

```java
int[] a = {3, 1, 4};
System.out.println(a.length);      // 3
int last = a[a.length - 1];        // 最后一个元素
```

## 越界异常

访问 `0 .. length-1` 之外的索引会抛 `ArrayIndexOutOfBoundsException`：

```java
int[] a = new int[3];   // 合法索引 0,1,2
a[3] = 10;              // 运行时错误！
```

最常见的越界来自循环边界写成 `<=`：

```java
for (int i = 0; i <= a.length; i++)   // �’ 最后一次 i==length 越界
for (int i = 0; i < a.length; i++)    // ✔ 正确
```

## 数组是引用类型

数组变量存的是**引用**。把一个数组赋给另一个变量，二者指向同一数组：

```java
int[] a = {1, 2, 3};
int[] b = a;        // b 与 a 指向同一数组
b[0] = 99;
System.out.println(a[0]);   // 99（a 也变了！）
```

需要独立副本时要逐个复制，不能简单赋值。

## 数组长度固定

数组一旦创建，**长度不可改变**。需要动态增删时用 [ArrayList](arraylist.md)。

## 易错提醒

- 索引从 **0** 到 `length-1`；`a[length]` 越界。
- `数组.length`（字段，无括号）vs `字符串.length()`（方法，有括号）。
- 数组赋值是共享引用，不是拷贝。
- `new int[n]` 的元素默认 0；对象数组默认 `null`，使用前需逐个 `new`。

## 小结

- 数组连续存储同类型元素，索引 `0 .. length-1`。
- 用 `length` 取长度；越界抛异常，循环用 `<` 而非 `<=`。
- 数组是引用类型、长度固定；要动态增删用 `ArrayList`。
