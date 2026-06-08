# 几何基础

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：向量、坐标

计算几何的地基：点与向量的表示、点积、叉积。**叉积**是判断方向、求面积、判线段相交的万能工具。

## 点与向量

用结构体表示二维点/向量：

```cpp
struct P {
    long long x, y;
    P operator-(const P& o) const { return {x - o.x, y - o.y}; }
    P operator+(const P& o) const { return {x + o.x, y + o.y}; }
};
```

竞赛中坐标常用整数，避免浮点误差。

## 叉积（最重要）

二维叉积 $\vec a \times \vec b = a_x b_y - a_y b_x$，是一个标量：

```cpp
long long cross(P a, P b) { return a.x * b.y - a.y * b.x; }
// 三点 O->A, O->B 的叉积
long long cross(P o, P a, P b) {
    return (a.x-o.x)*(b.y-o.y) - (a.y-o.y)*(b.x-o.x);
}
```

**几何意义**：

- 符号表示**转向**：`cross(O,A,B) > 0` 表示 $O\to A\to B$ 是**逆时针（左转）**，`< 0` 顺时针（右转），`= 0` 三点**共线**。
- 绝对值 = 以 $\vec{OA}$、$\vec{OB}$ 为邻边的**平行四边形面积**。

## 点积

$\vec a \cdot \vec b = a_x b_x + a_y b_y$：

```cpp
long long dot(P a, P b) { return a.x * b.x + a.y * b.y; }
```

符号表示夹角：`> 0` 锐角，`= 0` 垂直，`< 0` 钝角。

## 三角形 / 多边形面积

三角形面积 = $\frac12 |\text{cross}|$：

```cpp
double triArea(P a, P b, P c) {
    return abs(cross(a, b, c)) / 2.0;
}
```

**多边形面积（鞋带公式）**：

```cpp
long long shoelace(vector<P>& poly) {
    long long s = 0;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        P a = poly[i], b = poly[(i+1) % n];
        s += a.x * b.y - a.y * b.x;        // 叉积累加
    }
    return abs(s);    // 实际面积 = s / 2
}
```

## 判断线段相交

利用叉积判断两线段是否跨立（互相把对方两端点分在两侧）：

```cpp
// 段 AB 与段 CD 是否规范相交
bool segIntersect(P a, P b, P c, P d) {
    long long d1 = cross(a, b, c), d2 = cross(a, b, d);
    long long d3 = cross(c, d, a), d4 = cross(c, d, b);
    return ((d1>0)!=(d2>0)) && ((d3>0)!=(d4>0));   // 各自异侧
    // 共线/端点重合需额外特判
}
```

## 点是否在多边形内

射线法或叉积法（凸多边形可用「对每条边叉积同号」）。

## 易错提醒

- 整数坐标用 `long long`，叉积可能溢出（坐标 $10^9$ 时乘积 $10^{18}$）。
- 面积是叉积绝对值的一半，鞋带公式结果要除以 2。
- 判相交注意共线、端点接触等退化情形。
- 浮点比较用 eps，但能用整数就别用浮点。

## 小结

- 点/向量用结构体；**叉积** `cross` 判转向（逆/顺/共线）、求面积。
- 点积判夹角；多边形面积用**鞋带公式**。
- 叉积是线段相交、凸包、点在多边形内的核心工具；整数坐标防溢出用 `long long`。
