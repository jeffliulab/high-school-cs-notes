# 作用域与访问控制

变量的「作用域」决定它在哪里可见；`public`/`private` 决定类的成员对外是否可访问。两者共同支撑**封装**。

## 变量作用域

**作用域（scope）** 是变量可被访问的代码范围。Java 中变量在声明它的 `{}` 块内有效，块结束即失效。

### 局部变量

声明在方法或代码块内，**只在该块内可见**：

```java
public void demo() {
    int a = 5;              // a 的作用域：整个方法
    if (a > 0) {
        int b = 10;         // b 的作用域：仅这个 if 块
    }
    // 这里不能用 b
}
```

`for (int i = ...)` 里的 `i` 只在循环内有效。

### 实例变量

声明在类中、方法外，**整个类的所有实例方法都能访问**，生命周期与对象相同：

```java
public class Box {
    private int size;              // 实例变量，全类方法可用
    public void grow() { size++; } // 能访问 size
    public int get() { return size; }
}
```

### 局部变量遮蔽

当局部变量/参数与实例变量同名，局部的会「遮蔽」实例变量，需用 `this` 区分（见 [this 关键字与参数传递](this_parameters.md)）。

## 访问修饰符

| 修饰符 | 含义 |
| --- | --- |
| `public` | 任何类都能访问 |
| `private` | 只有**本类内部**能访问 |

```java
public class Account {
    private double balance;          // 外部无法直接访问

    public double getBalance() {     // 外部通过 public 方法访问
        return balance;
    }
}
```

```java
Account a = new Account();
// a.balance = 100;        // 编译错误：balance 是 private
a.getBalance();            // ✔ 通过公开接口
```

## 封装（Encapsulation）

封装 = **把数据藏起来（`private` 字段），只暴露受控的接口（`public` 方法）**。好处：

- **保护数据**：外界不能绕过校验乱改（见 [访问器与修改器方法](accessor_mutator.md) 的 `withdraw` 校验）。
- **隐藏实现**：内部怎么存数据可随时改，只要 public 方法签名不变，外部代码不受影响。

标准做法：**实例变量 `private`，方法按需 `public`**。

## 易错提醒

- 在块外使用块内声明的局部变量 → 编译错误（作用域已结束）。
- 把实例变量写成 `public` 破坏封装，应保持 `private` + getter/setter。
- 局部变量没有默认值，使用前必须初始化；实例变量有默认值（0/false/null）。

## 小结

- 局部变量限于声明它的 `{}` 块；实例变量全类可见、随对象存活。
- `private` 仅本类可访问，`public` 对外开放。
- **封装**：`private` 字段 + `public` 方法，保护数据、隐藏实现。
