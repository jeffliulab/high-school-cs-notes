# this 关键字与参数传递

`this` 指代「当前对象」，用于区分实例变量与同名参数。本页也讲清 Java 的参数传递机制。

## this 是什么

在实例方法或构造方法内部，`this` 是一个**指向当前对象自身**的引用。最常见的用途是当**参数名与实例变量同名**时，用 `this.字段` 明确指代实例变量：

```java
public class Point {
    private int x;
    private int y;

    public Point(int x, int y) {   // 参数名与字段同名
        this.x = x;                // this.x 是字段，x 是参数
        this.y = y;
    }

    public void setX(int x) {
        this.x = x;
    }
}
```

若不写 `this`，`x = x` 只是把参数赋给它自己，**字段根本没被设置**（一个隐蔽 bug）。

## 不同名时可省略 this

参数名与字段不同名时，`this` 可省略（但写上也对）：

```java
public Point(int initX, int initY) {
    x = initX;     // 无歧义，x 即字段
    y = initY;
}
```

## 调用同一对象的其他方法

实例方法内调用本对象的另一个方法，`this` 可省略：

```java
public void reset() {
    setX(0);          // 等价于 this.setX(0)
    setY(0);
}
```

## 参数传递：Java 总是按值传递

调用方法时，传给形参的是实参的**副本**。

### 基本类型：方法内改不动外部

```java
public static void addOne(int n) {
    n = n + 1;        // 只改副本
}

int a = 5;
addOne(a);
System.out.println(a);   // 仍是 5
```

### 引用类型：可改对象内容，但换不掉外部引用

引用类型传的是「引用的副本」，它和外部变量**指向同一对象**，所以通过它**修改对象内容**会反映到外部：

```java
public static void grow(Rectangle r) {
    r.setWidth(100);     // 改的是同一个对象 → 外部可见
}
```

但给参数**重新赋值**（让它指向新对象）不影响外部：

```java
public static void replace(Rectangle r) {
    r = new Rectangle(1, 1);   // 只让局部副本改指向，外部不变
}
```

<div class="diagram">
<svg viewBox="0 0 440 110" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <rect x="20" y="40" width="70" height="28" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="55" y="58" text-anchor="middle" fill="var(--dia-stroke)">外部 r</text>
  <rect x="140" y="40" width="70" height="28" fill="var(--dia-bg-card)" stroke="var(--dia-stroke)"/>
  <text x="175" y="58" text-anchor="middle" fill="var(--dia-stroke)">参数 r(副本)</text>
  <rect x="320" y="35" width="100" height="38" fill="var(--dia-bg-card)" stroke="var(--dia-accent)"/>
  <text x="370" y="58" text-anchor="middle" fill="var(--dia-accent)">Rectangle</text>
  <line x1="90" y1="54" x2="320" y2="50" stroke="var(--dia-stroke)" marker-end="url(#a2)"/>
  <line x1="210" y1="54" x2="320" y2="58" stroke="var(--dia-stroke)" marker-end="url(#a2)"/>
  <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="var(--dia-stroke)"/></marker></defs>
</svg>
<p class="figure-caption">两个引用指向同一对象：改对象内容外部可见，改指向则不可见。</p>
</div>

## 易错提醒

- 参数与字段同名却忘写 `this`，导致字段未被赋值。
- 误以为「Java 对对象是按引用传递」——准确说是**按值传递引用**：能改内容，换不掉指向。
- 静态方法里**没有 `this`**（不属于任何对象，见 [静态变量与静态方法](static_members.md)）。

## 小结

- `this` 指当前对象，主要用于区分同名的字段与参数。
- Java **一律按值传递**：基本类型改副本不影响外部；引用类型可改对象内容但重赋值不影响外部。
