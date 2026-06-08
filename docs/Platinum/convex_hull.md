# 凸包

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[几何基础](geometry_primitives.md)、排序

凸包是包含所有给定点的**最小凸多边形**。Andrew 单调链算法用排序 + 叉积在 $O(n\log n)$ 求出凸包。

## 什么是凸包

想象把所有点钉在板上，用一根橡皮筋套住——松手后橡皮筋的形状就是凸包。它是包含全部点的最小凸多边形，顶点是「最外围」的点。

<div class="diagram">
<svg viewBox="0 0 180 110" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="10">
  <polygon points="25,80 60,20 130,30 150,75 90,95" fill="var(--dia-blue)" fill-opacity="0.12" stroke="var(--dia-accent)" stroke-width="1.5"/>
  <g fill="var(--dia-stroke)">
    <circle cx="25" cy="80" r="2.5"/><circle cx="60" cy="20" r="2.5"/><circle cx="130" cy="30" r="2.5"/>
    <circle cx="150" cy="75" r="2.5"/><circle cx="90" cy="95" r="2.5"/>
    <circle cx="80" cy="55" r="2.5"/><circle cx="100" cy="60" r="2.5"/><circle cx="70" cy="70" r="2.5"/>
  </g>
</svg>
<p class="figure-caption">凸包：包住所有点的最小凸多边形，内部点不是顶点。</p>
</div>

## Andrew 单调链算法

1. 把点按 $(x, y)$ **排序**。
2. 从左到右构建**下凸包**，从右到左构建**上凸包**。
3. 用叉积保证每次只向一个方向转（凸性）：遇到「非左转」就弹出栈顶。

```cpp
vector<P> convexHull(vector<P> p) {
    sort(p.begin(), p.end(), [](P a, P b){
        return a.x != b.x ? a.x < b.x : a.y < b.y;
    });
    int n = p.size(), k = 0;
    vector<P> h(2 * n);
    // 下凸包
    for (int i = 0; i < n; i++) {
        while (k >= 2 && cross(h[k-2], h[k-1], p[i]) <= 0) k--;
        h[k++] = p[i];
    }
    // 上凸包
    for (int i = n - 2, t = k + 1; i >= 0; i--) {
        while (k >= t && cross(h[k-2], h[k-1], p[i]) <= 0) k--;
        h[k++] = p[i];
    }
    h.resize(k - 1);     // 去掉重复的起点
    return h;
}
```

`cross(...) <= 0` 弹栈：保留严格左转，得到逆时针凸包。用 `< 0` 则保留共线点。

## 复杂度

排序 $O(n\log n)$ 主导；构建凸包每个点进出栈各一次，$O(n)$。

## 应用

- **最远点对（凸包直径）**：最远两点必在凸包上，用旋转卡壳 $O(n)$。
- **最小外接矩形 / 周长 / 面积**。
- **点是否在凸包内**：$O(\log n)$ 二分。
- 凸包是许多几何优化（如 [斜率优化](convex_hull_trick.md)）的几何直观来源。

## 易错提醒

- 叉积比较 `<=0` 还是 `<0` 决定是否保留共线点，按题意选。
- 整数坐标用 `long long`，叉积防溢出。
- 所有点共线 / 重合等退化情形要测试。
- 凸包顶点顺序（顺/逆时针）依实现而定，后续算法注意一致。

## 小结

- 凸包 = 包住所有点的最小凸多边形，Andrew 单调链 $O(n\log n)$。
- 排序后用**叉积**分别建上、下凸包，非左转就弹栈。
- 应用：最远点对、外接形、点定位；是斜率优化的几何背景。
