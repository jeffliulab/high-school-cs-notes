# 区间修改区间查询

> **难度**：⭐⭐⭐⭐☆
> **前置知识**：[线段树进阶应用](segtree_applications.md)、[单点修改区间和](../Gold/point_update_range_sum.md)

同时支持「区间修改」和「区间查询」是线段树懒标记的标准能力，也可用**两个树状数组**巧妙实现。本页梳理两种主流做法。

## 做法一：懒标记线段树

最通用。懒标记线段树天然支持区间加 + 区间和（见 [线段树进阶应用](segtree_applications.md) 的 lazy 部分）。

要点回顾：

- 节点存区间聚合值 + 懒标记。
- 修改/查询遇到「部分覆盖」时先 `push_down` 懒标记给孩子。
- 区间加时，聚合值增量 = `add * 区间长度`。

支持的修改类型：

- **区间加**：lazy 累加。
- **区间赋值**：lazy 存赋值标记（注意与加标记的合并/覆盖优先级）。
- **区间加 + 区间乘**：需维护两个标记，下推顺序为「先乘后加」。

## 做法二：双树状数组（区间加 + 区间和）

仅针对**区间加、区间求和**，可用两个 BIT，常数更小、代码更短。

设差分数组 $d_i = a_i - a_{i-1}$，区间 $[l,r]$ 加 $v$ 即 $d_l \mathrel{+}= v$、$d_{r+1} \mathrel{-}= v$。前缀和：

$$\sum_{i=1}^{p} a_i = \sum_{i=1}^{p}\sum_{j=1}^{i} d_j = (p+1)\sum_{i=1}^{p} d_i - \sum_{i=1}^{p} i\cdot d_i$$

维护两个 BIT：一个存 $d_i$，一个存 $i \cdot d_i$。

```cpp
long long b1[N], b2[N];   // 分别维护 d_i 和 i*d_i 的树状数组
void upd(long long* b, int i, long long v){ for(; i<=n; i+=i&-i) b[i]+=v; }
long long qry(long long* b, int i){ long long s=0; for(; i>0; i-=i&-i) s+=b[i]; return s; }

void rangeAdd(int l, int r, long long v) {
    upd(b1, l, v);       upd(b1, r+1, -v);
    upd(b2, l, v*l);     upd(b2, r+1, -v*(r+1));
}
long long prefix(int p) {
    return (p + 1) * qry(b1, p) - qry(b2, p);
}
long long rangeSum(int l, int r) { return prefix(r) - prefix(l - 1); }
```

## 选哪种

| 需求 | 推荐 |
| --- | --- |
| 区间加 + 区间和 | 双 BIT（短、快）或懒线段树 |
| 区间赋值 / 区间最值 / 复杂标记 | 懒标记线段树 |
| 区间加 + 区间乘等多标记 | 懒标记线段树 |

## 易错提醒

- 双 BIT 公式的两项符号、$(p+1)$ 系数别写错。
- 懒标记多标记（加 + 乘）要定好**下推顺序**（先乘后加），并在合并标记时正确更新。
- 全程 `long long`。
- 区间赋值与区间加混用时，赋值会清空已有的加标记。

## 小结

- 区间改 + 区间查的通法是**懒标记线段树**，支持加/赋值/乘等。
- 仅「区间加 + 区间和」可用**双树状数组**，更短更快。
- 多标记注意下推顺序与合并规则。
