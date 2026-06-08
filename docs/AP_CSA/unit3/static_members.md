# 静态变量与静态方法

`static` 成员属于**类本身**，而非某个对象。理解「类变量 vs 实例变量」是本单元的关键区分。

## 实例成员 vs 静态成员

- **实例变量/方法**：每个对象各有一份，用「对象.」访问。
- **静态变量/方法**：整个类**共享一份**，用「类名.」访问。

```java
public class Counter {
    private static int total = 0;   // 静态变量：所有对象共享
    private int id;                 // 实例变量：每个对象独立

    public Counter() {
        total++;                    // 每创建一个对象，共享的 total +1
        id = total;
    }
    public static int getTotal() {  // 静态方法
        return total;
    }
    public int getId() {            // 实例方法
        return id;
    }
}
```

```java
Counter a = new Counter();   // total=1, a.id=1
Counter b = new Counter();   // total=2, b.id=2
System.out.println(Counter.getTotal());  // 2（用类名调用静态方法）
System.out.println(b.getId());           // 2
```

<div class="diagram">
<svg viewBox="0 0 430 170" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- class-level static -->
  <rect x="140" y="20" width="150" height="40" rx="4" fill="var(--dia-gold)" fill-opacity="0.15" stroke="var(--dia-gold)"/>
  <text x="215" y="38" text-anchor="middle" fill="var(--dia-gold)" font-size="11">类 Counter（共享一份）</text>
  <text x="215" y="54" text-anchor="middle" fill="var(--dia-gold)">static total = 2</text>
  <!-- instance a -->
  <rect x="40" y="110" width="140" height="42" rx="4" fill="var(--dia-bg-card)" stroke="var(--dia-blue)"/>
  <text x="110" y="128" text-anchor="middle" fill="var(--dia-blue)" font-size="11">对象 a</text>
  <text x="110" y="144" text-anchor="middle" fill="var(--dia-stroke)">id = 1</text>
  <!-- instance b -->
  <rect x="250" y="110" width="140" height="42" rx="4" fill="var(--dia-bg-card)" stroke="var(--dia-blue)"/>
  <text x="320" y="128" text-anchor="middle" fill="var(--dia-blue)" font-size="11">对象 b</text>
  <text x="320" y="144" text-anchor="middle" fill="var(--dia-stroke)">id = 2</text>
  <!-- links -->
  <line x1="110" y1="110" x2="180" y2="60" stroke="var(--dia-stroke-soft)" stroke-dasharray="3 3"/>
  <line x1="320" y1="110" x2="250" y2="60" stroke="var(--dia-stroke-soft)" stroke-dasharray="3 3"/>
  <text x="215" y="92" text-anchor="middle" fill="var(--dia-stroke-soft)" font-size="10">两对象共享同一个 static total</text>
</svg>
<p class="figure-caption">实例变量 id 每个对象各有一份；静态变量 total 属于类本身、全体对象共享一份——任一对象创建都会让这唯一的 total 递增。</p>
</div>

## 静态变量（类变量）

`static` 字段在内存中**只有一份**，被该类所有对象共享。常用于：

- **计数**：记录创建了多少对象（如上例 `total`）。
- **常量**：`public static final double PI = 3.14159;`。

## 静态方法

`static` 方法属于类，**不依赖任何对象**即可调用：

```java
Math.sqrt(2);                 // Math 全是静态方法
Integer.parseInt("42");
Counter.getTotal();
```

### 静态方法的关键限制

静态方法内**没有 `this`**，因此**不能直接访问实例变量或调用实例方法**（因为不知道是哪个对象的）：

```java
public static int getTotal() {
    return total;     // ✔ total 是静态的
    // return id;     // �’ 错误：id 是实例变量，静态方法访问不到
}
```

反过来，**实例方法可以访问静态成员**（共享的总能用）。

## 何时用 static

| 用 static | 不用 static（用实例） |
| --- | --- |
| 数据属于「整个类」（计数、常量） | 数据属于「单个对象」（姓名、坐标） |
| 行为不依赖具体对象（工具函数） | 行为操作某个对象的状态 |

## 易错提醒

- 静态方法里访问实例变量/调用实例方法 → 编译错误。
- 用「对象.静态成员」虽能编译，但**建议用「类名.」**以表明它是类级别的。
- 静态变量被共享：一个对象改了，所有对象都「看到」新值。

## 小结

- `static` 成员属于**类**、全类共享一份；非静态成员属于**对象**、各有一份。
- 静态方法无 `this`，**不能访问实例成员**；实例方法可访问静态成员。
- 计数器、常量、工具函数适合用 `static`。
