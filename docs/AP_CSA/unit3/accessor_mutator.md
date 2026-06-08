# 访问器与修改器方法

对象的实例变量通常是 `private`，外界通过**访问器**读取、通过**修改器**改变它的状态。

## 访问器方法（Accessor / getter）

**返回**对象的某项状态信息，**不改变**对象。返回类型与所读字段一致：

```java
public class BankAccount {
    private double balance;

    public double getBalance() {    // 访问器
        return balance;
    }
}
```

命名习惯：`getXxx()`；返回 `boolean` 时常用 `isXxx()`：

```java
public boolean isEmpty() {
    return size == 0;
}
```

访问器**不应有副作用**（不修改状态、不打印）。

## 修改器方法（Mutator / setter）

**改变**对象的状态，通常返回类型为 `void`：

```java
public void deposit(double amount) {    // 修改器
    balance += amount;
}

public void setBalance(double b) {
    balance = b;
}
```

修改器是封装的好处所在——可以在改值时**加校验**：

```java
public void withdraw(double amount) {
    if (amount > 0 && amount <= balance) {   // 防止透支
        balance -= amount;
    }
}
```

外界无法绕过这层校验直接乱改 `balance`（因为它是 `private`）。

## 计算型访问器

访问器返回的值不一定直接对应某个字段，可以**现场计算**：

```java
public class Rectangle {
    private int width, height;

    public int getArea() {        // 由两个字段算出
        return width * height;
    }
}
```

## 返回引用型字段的注意点

若访问器返回的是**可变对象**（如数组、`ArrayList`），直接返回引用会让外界能改内部数据——这是「逃逸」问题。AP 层面了解即可：必要时返回副本。

```java
public ArrayList<String> getItems() {
    return new ArrayList<String>(items);   // 返回副本，保护内部
}
```

## 访问器 vs 修改器对照

| | 访问器 (getter) | 修改器 (setter) |
| --- | --- | --- |
| 作用 | 读取状态 | 改变状态 |
| 返回类型 | 字段类型（非 void） | 通常 `void` |
| 改变对象？ | 否 | 是 |
| 典型名 | `getX()`、`isY()` | `setX()`、`addX()` |

## 易错提醒

- 访问器要 `return`，且返回类型不能是 `void`。
- 修改器改的是**实例变量**，注意别误改成了局部变量（参数同名时需 `this`，见 [this 关键字与参数传递](this_parameters.md)）。
- 访问器不应修改状态或产生副作用。

## 小结

- **访问器**读状态、有返回值、不改对象；**修改器**改状态、常返回 `void`。
- 通过修改器加校验，是封装带来的安全保障。
- 访问器可现场计算派生值，也要注意可变对象的引用逃逸。
