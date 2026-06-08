# 方法调用

方法是对象能执行的「动作」。本页讲如何调用对象的方法、传递实参，以及 `void` 方法。

## 什么是方法

**方法（method）** 是类中定义的一段可复用代码，代表对象的一种行为。调用方法的语法：

```java
接收者.方法名(实参列表)
```

```java
String s = "Hello";
int n = s.length();          // 在对象 s 上调用 length()，返回 5
String up = s.toUpperCase(); // 返回 "HELLO"
```

- **接收者（receiver）**：点号前的对象，方法作用在它身上。
- **实参（argument）**：传给方法的具体值。

## 参数传递

方法可以接收**参数**。调用时提供的值（实参）按顺序、按类型对应到方法的**形参**：

```java
String s = "programming";
String sub = s.substring(0, 4);   // "prog"，传入起止索引
int idx = s.indexOf("gram");      // 3，传入要查找的子串
```

实参的**类型和个数必须匹配**方法签名，否则编译错误。

## void 方法

返回类型为 **`void`** 的方法**不返回值**，只产生「副作用」（如打印、修改对象状态）：

```java
System.out.println("hi");   // println 是 void 方法
```

`void` 方法不能用在需要值的地方：

```java
int x = System.out.println("a");  // 编译错误：void 不能赋给 int
```

## 按值传递（Java 的传参机制）

Java **总是按值传递**：传给方法的是实参的「副本」。

- 对**基本类型**：方法内修改参数不影响外部变量。
- 对**引用类型**：传的是引用的副本，方法内通过该引用**修改对象状态会影响外部**（因为指向同一对象），但**重新赋值**参数不影响外部。

```java
// 基本类型：外部不变
void addOne(int n) { n = n + 1; }   // 调用后外部变量原值不变

// 引用类型：可改对象内容
void clear(ArrayList<Integer> list) { list.clear(); }  // 外部列表真被清空
```

## 静态方法 vs 实例方法（初步）

- **实例方法**：在对象上调用，`对象.方法()`，如 `s.length()`。
- **静态方法**：在类上调用，`类名.方法()`，如 `Math.sqrt(9)`、`Integer.parseInt("42")`。

详见 [Math 类](math_class.md) 与第三单元的 [静态成员](../unit3/static_members.md)。

## 易错提醒

- 对 `null` 接收者调用方法 → `NullPointerException`。
- 实参顺序/类型错会编译报错或得到错误结果（如 `substring` 的参数顺序）。
- `void` 方法没有返回值，别想着拿它赋值。

## 小结

- 方法调用语法：`接收者.方法(实参)`。
- Java **按值传递**：基本类型改不动外部；引用类型可改对象内容但换不掉外部引用。
- 区分实例方法（`对象.`）与静态方法（`类名.`）。
