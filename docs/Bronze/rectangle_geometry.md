# 矩形几何

> **难度**：⭐⭐☆☆☆
> **前置知识**：基本数学、[分类讨论](casework.md)

铜级几何几乎只考**轴对齐矩形**（边平行于坐标轴）：求面积、判断相交、计算重叠区域。套路固定，记住公式即可。

## 表示矩形

通常用两个对角点表示：左下 $(x_1, y_1)$、右上 $(x_2, y_2)$，满足 $x_1 < x_2$、$y_1 < y_2$。

```cpp
struct Rect { int x1, y1, x2, y2; };
int area(Rect r) {
    return (r.x2 - r.x1) * (r.y2 - r.y1);
}
```

## 两矩形的重叠区域

重叠也是一个矩形，其边界由「**较大的左/下边界**」和「**较小的右/上边界**」决定：

```cpp
int ox1 = max(a.x1, b.x1);
int oy1 = max(a.y1, b.y1);
int ox2 = min(a.x2, b.x2);
int oy2 = min(a.y2, b.y2);

int ow = ox2 - ox1;     // 重叠宽度
int oh = oy2 - oy1;     // 重叠高度
int overlap = 0;
if (ow > 0 && oh > 0) overlap = ow * oh;   // 只有都为正才真正重叠
```

> **核心公式**：重叠宽 = `min(右) - max(左)`，高同理。若任一为 $\le 0$，则不重叠，重叠面积为 0。

<div class="diagram">
<svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="11">
  <rect x="30" y="40" width="110" height="80" fill="none" stroke="var(--dia-blue)" stroke-width="2"/>
  <rect x="90" y="20" width="120" height="70" fill="none" stroke="var(--dia-gold)" stroke-width="2"/>
  <rect x="90" y="40" width="50" height="50" fill="var(--dia-accent)" fill-opacity="0.25" stroke="var(--dia-accent)"/>
  <text x="45" y="115" fill="var(--dia-blue)">A</text>
  <text x="195" y="35" fill="var(--dia-gold)">B</text>
  <text x="100" y="70" fill="var(--dia-accent)">重叠</text>
</svg>
<p class="figure-caption">两矩形重叠区仍是矩形：左/下取 max，右/上取 min。</p>
</div>

## 判断是否相交

```cpp
bool intersect(Rect a, Rect b) {
    return max(a.x1, b.x1) < min(a.x2, b.x2)    // x 方向有交叠
        && max(a.y1, b.y1) < min(a.y2, b.y2);   // y 方向有交叠
}
```

边界相接算不算相交，看题目定义（用 `<` 还是 `<=`）。

## 两矩形并集面积（容斥）

$$\text{面积}(A \cup B) = \text{面积}(A) + \text{面积}(B) - \text{面积}(A \cap B)$$

```cpp
int unionArea = area(a) + area(b) - overlap;   // 减去重复计算的重叠部分
```

## 点是否在矩形内

```cpp
bool inside(Rect r, int px, int py) {
    return r.x1 <= px && px <= r.x2 && r.y1 <= py && py <= r.y2;
}
```

## 易错提醒

- 重叠宽/高**可能为负**，必须判 `> 0` 才计入面积。
- 注意边界是否算「相交/包含」（`<` vs `<=`），按题意定。
- 并集面积别忘减去重叠（容斥），否则重复计算。
- 坐标范围大时面积用 `long long` 防溢出。

## 小结

- 轴对齐矩形：面积 = 宽 × 高。
- **重叠区**：宽 `min(右)-max(左)`、高同理，需都 > 0。
- 并集用**容斥** $A+B-A\cap B$；判相交看两轴是否都交叠。
