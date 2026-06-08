# 顺序查找与二分查找

在数组中「找一个值」有两种经典算法：顺序查找（线性）和二分查找。二分查找快得多，但要求数组**已排序**。

## 顺序查找（Sequential / Linear Search）

从头到尾逐个比较，找到即返回位置：

```java
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;     // 未找到
}
```

- 适用于**任意**数组（无需排序）。
- 最坏情况要看完所有 `n` 个元素 → 约 `n` 次比较（线性）。

## 二分查找（Binary Search）

前提：数组**必须已按升序排序**。每次和**中间元素**比较，排除一半范围：

```java
public static int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        if (arr[mid] == target) {
            return mid;                 // 找到
        } else if (arr[mid] < target) {
            lo = mid + 1;               // 目标在右半
        } else {
            hi = mid - 1;               // 目标在左半
        }
    }
    return -1;                          // 未找到
}
```

### 执行过程示例

在 `{2, 5, 8, 12, 16, 23, 38}` 中找 `23`：

| 步骤 | lo | hi | mid | arr[mid] | 动作 |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 6 | 3 | 12 | 12<23，去右半 `lo=4` |
| 2 | 4 | 6 | 5 | 23 | 命中，返回 5 |

只用 2 步就找到，而线性查找要 6 步。

<div class="diagram">
<svg viewBox="0 0 430 170" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="12">
  <!-- values row -->
  <g fill="var(--dia-bg-card)" stroke="var(--dia-stroke)">
    <rect x="20" y="40" width="56" height="34"/><rect x="76" y="40" width="56" height="34"/><rect x="132" y="40" width="56" height="34"/>
    <rect x="188" y="40" width="56" height="34"/><rect x="244" y="40" width="56" height="34"/><rect x="300" y="40" width="56" height="34"/><rect x="356" y="40" width="56" height="34"/>
  </g>
  <g text-anchor="middle" fill="var(--dia-stroke)">
    <text x="48" y="62">2</text><text x="104" y="62">5</text><text x="160" y="62">8</text><text x="216" y="62">12</text><text x="272" y="62">16</text><text x="328" y="62">23</text><text x="384" y="62">38</text>
  </g>
  <g text-anchor="middle" fill="var(--dia-stroke-tertiary)" font-size="10">
    <text x="48" y="88">0</text><text x="104" y="88">1</text><text x="160" y="88">2</text><text x="216" y="88">3</text><text x="272" y="88">4</text><text x="328" y="88">5</text><text x="384" y="88">6</text>
  </g>
  <!-- step1: whole range, mid=3 -->
  <line x1="20" y1="106" x2="412" y2="106" stroke="var(--dia-blue)" stroke-width="3"/>
  <text x="216" y="120" text-anchor="middle" fill="var(--dia-blue)" font-size="10">① mid=3 (12) &lt; 23 → 弃左半</text>
  <!-- step2: right half, mid=5 -->
  <line x1="244" y1="134" x2="412" y2="134" stroke="var(--dia-accent)" stroke-width="3"/>
  <text x="328" y="148" text-anchor="middle" fill="var(--dia-accent)" font-size="10">② mid=5 (23) = 23 ✓ 命中</text>
  <text x="80" y="148" text-anchor="middle" fill="var(--dia-stroke-tertiary)" font-size="10">←已排除</text>
</svg>
<p class="figure-caption">二分查找每步比较中点：12&lt;23 排除左半，搜索范围从 7 个缩到 3 个再到命中——每次砍掉一半。</p>
</div>

## 效率对比

| | 顺序查找 | 二分查找 |
| --- | --- | --- |
| 前提 | 无 | 已排序 |
| 比较次数（n=1000） | 最多 ~1000 | 最多 ~10 |
| 增长 | 线性 `n` | 对数 `log₂n` |

每次折半，所以 `n` 个元素最多约 $\log_2 n$ 次比较——数据越大，优势越明显（见 [算法与非正式运行时分析](../unit2/informal_runtime.md)）。

## 二分查找为何要求有序

二分依靠「中间值与目标的大小关系」来判断目标在左还是右。若无序，这个判断不成立，结果错误。所以**未排序就只能用顺序查找**，或先排序再二分。

## 易错提醒

- 二分查找的数组**必须有序**，否则结果未定义。
- 循环条件是 `lo <= hi`（含等号），否则会漏掉单元素区间。
- 更新是 `mid + 1` / `mid - 1`，写成 `lo = mid` 可能死循环。
- `mid = (lo + hi) / 2` 用整数除法自动取下整。

## 小结

- **顺序查找**：逐个比较，适用任意数组，约 `n` 次。
- **二分查找**：折半排除，要求**有序**，约 `log₂n` 次，快得多。
- 记牢二分模板：`lo<=hi`、`mid`、三分支更新 `lo`/`hi`。
