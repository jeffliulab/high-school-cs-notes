# 类的结构

本页俯瞰一个 Java 类由哪些部分组成：实例变量、构造方法、方法。后续各页再逐一深入。

## 一个完整的类示例

```java
public class Student {
    // 1) 实例变量（字段）—— 对象的状态
    private String name;
    private int score;

    // 2) 构造方法 —— 创建对象时初始化状态
    public Student(String n, int s) {
        name = n;
        score = s;
    }

    // 3) 方法 —— 对象的行为
    public int getScore() {
        return score;
    }

    public void addPoints(int p) {
        score += p;
    }
}
```

## 三大组成部分

### 实例变量（instance variable）

也叫**字段（field）**，描述对象的**状态**。每个对象有自己**独立的一份**：

```java
private String name;
private int score;
```

习惯用 `private` 修饰（封装，见 [作用域与访问控制](scope_access.md)）。

### 构造方法（constructor）

与类同名、**无返回类型**，在 `new` 时被调用，负责初始化实例变量。详见 [构造方法与 new 运算符](constructors.md)。

### 方法（method）

定义对象能做什么。分为：

- **访问器（accessor）**：返回状态信息，如 `getScore()`。
- **修改器（mutator）**：改变对象状态，如 `addPoints()`。

详见 [访问器与修改器方法](accessor_mutator.md)。

## 使用这个类

```java
Student a = new Student("Ann", 80);
a.addPoints(15);
System.out.println(a.getName());   // 假设有 getName()
System.out.println(a.getScore());  // 95
```

外部代码通过 `public` 方法与对象交互，**看不到也不直接碰** `private` 的实例变量。

## 类的设计思路

写一个类时，按顺序问自己：

1. 这个对象要记录哪些**数据**？→ 决定实例变量。
2. 创建时需要哪些**初始值**？→ 决定构造方法的参数。
3. 外部需要对它做哪些**操作**？→ 决定 public 方法。

## 易错提醒

- 实例变量声明在**方法之外、类之内**；写在方法内的是局部变量。
- 构造方法**没有返回类型**（连 `void` 都不写）。
- 实例变量默认值：数值 `0`、`boolean` `false`、对象引用 `null`（但局部变量没有默认值）。

## 小结

- 类 = **实例变量（状态）+ 构造方法（初始化）+ 方法（行为）**。
- 实例变量每个对象各有一份，通常 `private`。
- 设计类从「记什么数据、如何初始化、提供哪些操作」三问入手。
