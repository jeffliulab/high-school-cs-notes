# 包装类

包装类把基本类型 `int`、`double` 「包装」成对象，使它们能放进 `ArrayList` 等只接受对象的容器。

## 为什么需要包装类

`ArrayList` 等集合**只能存对象**，不能直接存基本类型。包装类提供对应的对象版本：

| 基本类型 | 包装类 |
| --- | --- |
| `int` | `Integer` |
| `double` | `Double` |

```java
ArrayList<Integer> nums = new ArrayList<>();  // 只能用 Integer，不能 int
```

## 自动装箱与拆箱

Java 会**自动**在基本类型与包装类之间转换：

- **自动装箱（autoboxing）**：`int` → `Integer`
- **自动拆箱（unboxing）**：`Integer` → `int`

```java
Integer obj = 42;        // 自动装箱：int 42 → Integer
int n = obj;             // 自动拆箱：Integer → int
ArrayList<Integer> a = new ArrayList<>();
a.add(5);                // 自动装箱，5 → Integer
int first = a.get(0);    // 自动拆箱
```

得益于此，多数时候你可以「像用 int 一样」使用 `Integer`。

## 常用静态字段与方法

| 成员 | 含义 |
| --- | --- |
| `Integer.MAX_VALUE` | `int` 最大值（2147483647） |
| `Integer.MIN_VALUE` | `int` 最小值（-2147483648） |
| `Integer.parseInt("42")` | 字符串转 `int` → `42` |
| `Double.parseDouble("3.14")` | 字符串转 `double` → `3.14` |

```java
int big = Integer.MAX_VALUE;
int x = Integer.parseInt("123") + 1;   // 124
```

`parseInt` / `parseDouble` 在读取用户输入或文件数据时非常有用（见 [文本文件与 Scanner](../unit4/text_files_scanner.md)）。

## 包装对象的比较陷阱

`Integer` 是对象，比较内容应使用 `.equals()` 或先拆箱比较，而非依赖 `==`：

```java
Integer a = 1000, b = 1000;
System.out.println(a == b);        // 可能 false（比较引用）
System.out.println(a.equals(b));   // true（比较内容）
System.out.println(a.intValue() == b.intValue()); // true（拆箱后比值）
```

> 在 AP 考试中，对包装对象一般通过自动拆箱用于算术，比较时优先拆箱或 `.equals()`。

## 易错提醒

- `ArrayList<int>` **不合法**，必须写 `ArrayList<Integer>`。
- 对值为 `null` 的 `Integer` 自动拆箱会抛 `NullPointerException`。
- 比较两个 `Integer` 对象时不要盲目用 `==`。

## 小结

- 包装类 `Integer` / `Double` 让基本类型能进集合。
- **自动装箱/拆箱**让你大多数时候无感转换。
- 记住 `Integer.MAX_VALUE`、`Integer.parseInt`、`Double.parseDouble`。
