# 封装与 javadoc 设计

把封装思想落到类的设计上，并用 javadoc 注释、前置/后置条件清楚地记录方法契约——这是 FRQ 评分关注的「文档化」技能。

## 封装的设计原则

设计一个类时遵循：

1. **实例变量全部 `private`**，绝不让外部直接读写。
2. 只暴露**必要**的 `public` 方法作为接口。
3. 修改器中加入**校验**，维护对象的「合法状态」（不变量）。

```java
public class Time {
    private int hours;     // 0~23
    private int minutes;   // 0~59

    public Time(int h, int m) {
        hours = h;
        minutes = m;
    }

    /** 返回从当天 0 点起的总分钟数。 */
    public int toMinutes() {
        return hours * 60 + minutes;
    }

    /** @return 本时刻是否早于 other */
    public boolean lessThan(Time other) {
        return this.toMinutes() < other.toMinutes();
    }
}
```

## javadoc 注释

javadoc 用 `/** ... */` 写在方法/类**上方**，可由 `javadoc` 工具生成 HTML 文档。常用标签：

| 标签 | 含义 |
| --- | --- |
| `@param 名 说明` | 描述一个参数 |
| `@return 说明` | 描述返回值 |

```java
/**
 * 计算从本时刻到 t 经过的分钟数（假设 t 在 24 小时内之后）。
 * @param t 目标时刻
 * @return 间隔的分钟数
 */
public int elapsedTime(Time t) {
    return t.toMinutes() - this.toMinutes();
}
```

## 前置条件与后置条件

- **前置条件（precondition）**：方法被正确调用前**必须成立**的假设。调用者负责满足。
- **后置条件（postcondition）**：方法**正确执行后**保证成立的结果。

```java
/**
 * 取数组前 n 个元素之和。
 * 前置条件：0 <= n <= arr.length
 * 后置条件：返回 arr[0]+...+arr[n-1]；数组不被修改
 */
public int sumFirst(int[] arr, int n) { ... }
```

在 FRQ 中，题目常给出方法的前置条件，**你可以默认它成立**，不必额外检查（除非题目要求）。

## 不变量（class invariant）

类不变量是「对象在任何时刻都应满足的性质」，由构造方法建立、由所有方法维护。例如 `Time` 的 `0 <= minutes < 60`。良好封装让不变量不会被外部破坏。

## 设计一个类的完整流程（FRQ 视角）

1. 读题确定**实例变量**（对象要记什么）。
2. 写**构造方法**初始化所有字段。
3. 按题目要求实现**方法**，注意返回类型与参数。
4. 用 `private` 字段 + `public` 方法保证封装。
5. 遵守题目给的**前置条件**，达成**后置条件**。

## 易错提醒

- FRQ 中实例变量忘记声明为 `private` 可能丢「封装分」。
- 别在方法里重复检查已由前置条件保证的情况（题目没要求时）。
- javadoc 写在方法**上方**，不是方法内部。

## 小结

- 封装 = `private` 字段 + 受控 `public` 接口 + 修改器校验，维护类**不变量**。
- 用 javadoc（`@param`/`@return`）和**前置/后置条件**记录方法契约。
- 这是 FRQ「Class」题的标准设计套路与得分点。
