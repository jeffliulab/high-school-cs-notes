# ArrayList

`ArrayList` 是**长度可变**的「动态数组」，能随时增删元素。它是 FRQ 第 3 题的核心。

## 为什么需要 ArrayList

普通数组长度固定；当元素个数事先未知、需要动态增删时，用 `ArrayList`：

```java
import java.util.ArrayList;     // 需要导入

ArrayList<String> names = new ArrayList<String>();
```

- `<String>` 是**泛型**，指定元素类型。
- 元素**只能是对象**，存基本类型要用包装类：`ArrayList<Integer>`、`ArrayList<Double>`（见 [包装类](../unit1/wrapper_classes.md)）。

## 核心方法（AP Java 子集）

设 `list` 为 `ArrayList<E>`：

| 方法 | 作用 | 返回 |
| --- | --- | --- |
| `list.size()` | 元素个数 | `int` |
| `list.add(x)` | 在**末尾**添加 | `boolean` |
| `list.add(i, x)` | 在索引 `i` **插入**，后面元素后移 | `void` |
| `list.get(i)` | 取索引 `i` 的元素 | `E` |
| `list.set(i, x)` | 把索引 `i` 替换为 `x`，返回原值 | `E` |
| `list.remove(i)` | 删除索引 `i`，后面元素前移，返回被删值 | `E` |

```java
ArrayList<Integer> nums = new ArrayList<Integer>();
nums.add(10);          // [10]
nums.add(20);          // [10, 20]
nums.add(1, 15);       // [10, 15, 20]（插入到索引1）
nums.set(0, 99);       // [99, 15, 20]
int x = nums.get(2);   // 20
nums.remove(1);        // [99, 20]，返回 15
System.out.println(nums.size());  // 2
```

## 遍历 ArrayList

**for-each（只读遍历，推荐）**：

```java
for (int x : nums) {       // 自动拆箱 Integer → int
    System.out.println(x);
}
```

**索引 for（需要索引或要增删时）**：

```java
for (int i = 0; i < nums.size(); i++) {
    System.out.println(nums.get(i));
}
```

> 注意是 `nums.size()`（方法），不是数组的 `length`。

## 自动装箱/拆箱

`ArrayList<Integer>` 配合自动装箱拆箱，多数时候可「当 int 用」：

```java
ArrayList<Integer> a = new ArrayList<Integer>();
a.add(5);              // int 5 自动装箱为 Integer
int first = a.get(0);  // 自动拆箱
```

## ArrayList vs 数组

| | 数组 | ArrayList |
| --- | --- | --- |
| 长度 | 固定 | 可变 |
| 取长度 | `arr.length` | `list.size()` |
| 访问 | `arr[i]` | `list.get(i)` |
| 赋值 | `arr[i] = x` | `list.set(i, x)` |
| 元素类型 | 任意（含基本类型） | 只能对象（用包装类） |
| 增删 | 不支持 | `add` / `remove` |

## 易错提醒

- 用 `size()` 不是 `length`；用 `get(i)`/`set(i,x)` 不是 `[i]`。
- 元素类型必须是对象：`ArrayList<int>` 非法。
- `add(i, x)` 是插入（元素后移），`set(i, x)` 是替换——别混。
- 索引越界抛 `IndexOutOfBoundsException`。

## 小结

- `ArrayList` 是可变长动态数组，元素须为对象（用包装类）。
- 核心方法：`size / add / add(i,x) / get / set / remove`。
- 与数组对照记忆：`length`↔`size()`、`[i]`↔`get/set`。
