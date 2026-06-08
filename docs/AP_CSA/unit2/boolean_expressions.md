# 布尔表达式与关系运算

布尔表达式求值为 `true` 或 `false`，是一切条件判断与循环控制的基础。

## boolean 类型

`boolean` 是基本类型，只有两个值：`true`、`false`。

```java
boolean isAdult = true;
boolean passed = score >= 60;   // 用关系运算的结果赋值
```

## 关系运算符

它们比较两个值，结果是 `boolean`：

| 运算符 | 含义 | 例 | 结果 |
| --- | --- | --- | --- |
| `==` | 相等 | `3 == 3` | `true` |
| `!=` | 不相等 | `3 != 4` | `true` |
| `<` | 小于 | `3 < 4` | `true` |
| `>` | 大于 | `3 > 4` | `false` |
| `<=` | 小于等于 | `3 <= 3` | `true` |
| `>=` | 大于等于 | `4 >= 5` | `false` |

```java
int age = 17;
boolean canVote = age >= 18;    // false
boolean isTeen = age >= 13 && age <= 19;  // true（配合逻辑运算符）
```

## 比较的两类陷阱

### 1. `=` 与 `==` 混淆

`=` 是赋值，`==` 是比较。写错会编译错误或逻辑错误：

```java
if (x == 5) { ... }   // 正确：比较
// if (x = 5)         // 错误：把 5 赋给 x（boolean 上下文里直接编译报错）
```

### 2. 浮点数不要用 `==`

`double` 有精度误差，应判断「差值足够小」：

```java
double a = 0.1 + 0.2;          // 实际是 0.30000000000000004
System.out.println(a == 0.3);  // false！
boolean equal = Math.abs(a - 0.3) < 1e-9;  // 正确做法
```

### 3. 对象用 `.equals()`，不用 `==`

字符串等对象比较内容要用 `.equals()`：

```java
String s = "hi";
boolean same = s.equals("hi");   // 正确
```

## 布尔变量的直接使用

布尔变量本身就是条件，无需 `== true`：

```java
boolean done = false;
if (done) { ... }          // 推荐
if (done == true) { ... }  // 冗余，不推荐
if (!done) { ... }         // 「未完成」
```

## 易错提醒

- `=`（赋值）≠ `==`（比较）。
- 浮点相等用 `Math.abs(a-b) < 误差`，不用 `==`。
- 对象内容相等用 `.equals()`。
- `if (flag == true)` 啰嗦，直接写 `if (flag)`。

## 小结

- 关系运算符产生 `boolean`，是条件判断的原料。
- 三大比较陷阱：`=`/`==`、浮点 `==`、对象 `==`。
- 布尔变量可直接作为条件使用。
