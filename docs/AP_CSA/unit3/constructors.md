# 构造方法与 new 运算符

构造方法负责在对象诞生时初始化它的实例变量。`new` 运算符创建对象并调用构造方法。

## 构造方法的形态

构造方法**与类同名**，且**没有返回类型**（连 `void` 都不写）：

```java
public class Point {
    private int x;
    private int y;

    public Point(int initX, int initY) {   // 构造方法
        x = initX;
        y = initY;
    }
}
```

## new 做了什么

```java
Point p = new Point(3, 4);
```

1. `new` 在内存中**分配一个新 Point 对象**。
2. 调用构造方法 `Point(3, 4)`，把 `x` 设为 3、`y` 设为 4。
3. 返回新对象的**引用**，存入变量 `p`。

## 默认构造方法

若你**不写任何构造方法**，Java 自动提供一个**无参默认构造方法**，把实例变量设为默认值（数值 0、`boolean` false、引用 `null`）：

```java
public class Dog { private String name; }   // 没写构造方法
Dog d = new Dog();                            // 仍可创建，name == null
```

> **一旦你自己写了任意构造方法，默认无参构造方法就不再自动提供**。此时 `new Dog()` 会编译错误，除非你也显式定义无参构造方法。

## 重载构造方法（多个构造方法）

同一个类可有多个构造方法，**参数列表不同**即可（重载）：

```java
public class Point {
    private int x, y;

    public Point() {            // 无参：默认到原点
        x = 0;
        y = 0;
    }

    public Point(int initX, int initY) {  // 带参
        x = initX;
        y = initY;
    }
}

Point a = new Point();        // (0, 0)
Point b = new Point(3, 4);    // (3, 4)
```

调用 `new` 时，Java 根据**实参的个数和类型**自动选择匹配的构造方法。

## 初始化所有实例变量

好的构造方法应给**每个**实例变量赋初值，否则引用型字段会是 `null`，后续使用易抛 `NullPointerException`：

```java
public Student(String n) {
    name = n;
    score = 0;          // 别忘了给 score 也初始化
    courses = new ArrayList<String>();   // 引用型字段记得 new
}
```

## 易错提醒

- 构造方法**不能有返回类型**——写了 `void` 就变成普通方法，`new` 会调到默认构造（或报错）。
- 自定义了带参构造后，`new 类名()` 不再可用，除非另写无参构造。
- 忘记初始化引用型实例变量 → 后续 `null` 崩溃。

## 小结

- 构造方法**同名、无返回类型**，在 `new` 时初始化对象。
- 不写构造方法时有默认无参构造；写了带参的就得自己补无参的。
- 可重载多个构造方法；务必初始化全部实例变量。
