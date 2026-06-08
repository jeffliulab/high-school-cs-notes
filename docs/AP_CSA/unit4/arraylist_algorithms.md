# ArrayList 标准算法

`ArrayList` 上的常见算法与数组类似，但**遍历时增删**有个著名陷阱，必须掌握。FRQ Q3（数据分析）几乎必考。

## 标准遍历算法

与 [数组标准算法](array_algorithms.md) 对应，只是把 `[i]`/`length` 换成 `get(i)`/`size()`：

```java
// 求和
int sum = 0;
for (int x : list) sum += x;

// 计数
int count = 0;
for (int x : list) if (x > 60) count++;

// 找最大值
int max = list.get(0);
for (int x : list) if (x > max) max = x;
```

## 末尾追加构建列表

```java
ArrayList<Integer> evens = new ArrayList<Integer>();
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) evens.add(i);   // 收集偶数
}
```

## 遍历时删除的陷阱（重点）

删除元素后，后面的元素会**前移**，索引随之变化。若用普通索引 for 且删除后仍 `i++`，会**跳过**一个元素：

```java
// ✗ 错误：删除后跳过元素
for (int i = 0; i < list.size(); i++) {
    if (list.get(i) % 2 == 0) {
        list.remove(i);     // 删除后，原本 i+1 的元素移到了 i，但 i 还要 ++
    }
}
```

### 解决方案一：删除后不自增

```java
int i = 0;
while (i < list.size()) {
    if (list.get(i) % 2 == 0) {
        list.remove(i);     // 不动 i，下一个元素已移到当前位置
    } else {
        i++;
    }
}
```

### 解决方案二：从后往前遍历

倒序删除时，前移的是「已处理过」的部分，不影响未处理元素：

```java
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i) % 2 == 0) {
        list.remove(i);
    }
}
```

> **不要在 for-each 循环里调用 `add`/`remove`**——会抛 `ConcurrentModificationException`。要增删请用索引循环。

## 插入元素

在合适位置插入（如保持有序）：

```java
// 把 value 插到第一个比它大的元素前
int i = 0;
while (i < list.size() && list.get(i) < value) i++;
list.add(i, value);
```

## 统计 + 重建

有时「就地删除」不如「新建一个结果列表」清晰：

```java
ArrayList<Integer> kept = new ArrayList<Integer>();
for (int x : list) {
    if (x >= 60) kept.add(x);    // 只保留及格的
}
```

## 易错提醒

- 索引 for 删除后 `i++` 会跳元素——用「删则不自增」或「倒序」。
- for-each 中增删会抛 `ConcurrentModificationException`。
- 始终用 `size()` 作边界，且删除会使 `size()` 变小。

## 小结

- `ArrayList` 标准算法与数组一致，注意用 `get/size`。
- **遍历时删除**两法：删后不自增、或倒序遍历；for-each 中禁止增删。
- 逻辑复杂时，「重建新列表」往往比就地删除更清晰可靠。
