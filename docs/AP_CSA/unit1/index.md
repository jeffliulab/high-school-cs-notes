# 第一单元：使用对象与方法

> **考试权重**：15–25%（多选题）

本单元是 AP CSA 的起点，目标是让你能**编写、运行第一个 Java 程序**，理解变量与基本数据类型，并学会**使用**已有的对象与方法（注意：本单元只「用」对象，自己「写」类放在第三单元）。

## 本单元内容

1. [程序与软件工程导论](software_engineering.md) —— 程序、编译/运行、JDK、IDE、错误类型。
2. [变量与基本数据类型](variables_types.md) —— `int`、`double`、`boolean`，声明与初始化。
3. [表达式与赋值](expressions_assignment.md) —— 算术表达式、运算优先级、整数除法与取模。
4. [复合赋值与类型转换](compound_casting.md) —— `+=`、`++`、强制类型转换、溢出。
5. [对象与类的概念](objects_classes.md) —— 类是模板、对象是实例、引用与 `null`。
6. [方法调用](method_calls.md) —— 调用对象方法、传参、`void` 方法。
7. [带返回值的方法](return_values.md) —— 返回值的使用与链式调用。
8. [字符串对象与方法](strings.md) —— `String` 的不可变性与常用方法。
9. [包装类](wrapper_classes.md) —— `Integer`、`Double`、自动装箱拆箱。
10. [Math 类](math_class.md) —— `Math.abs/sqrt/pow/random` 等。

## 学习目标

- 区分**基本类型（primitive）**与**引用类型（reference）**。
- 正确声明、初始化变量并理解其取值范围。
- 调用对象的方法，理解「接收者.方法(参数)」的语义。
- 熟练使用 `String` 与 `Math` 这两个最常用的库类。

## 易错提醒

- 整数除法 `7 / 2 == 3`（向零截断），与 `7.0 / 2` 不同。
- `String` 是**不可变**的，方法返回新串而非修改原串。
- 字符串相等用 `.equals()`，不要用 `==`。
