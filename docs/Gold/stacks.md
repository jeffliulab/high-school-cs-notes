# 栈

> **难度**：⭐⭐⭐☆☆
> **前置知识**：[数据结构入门](../Bronze/intro_data_structures.md)

栈是「后进先出（LIFO）」的结构。除了基本用法，**单调栈**能在 $O(n)$ 内求「下一个更大元素」类问题，是 Gold 高频技巧。

## 基本栈操作

```cpp
#include <stack>
stack<int> st;
st.push(3);
st.push(7);
cout << st.top();    // 7（栈顶）
st.pop();            // 弹出栈顶
cout << st.empty();
```

## 应用：括号匹配

```cpp
stack<char> st;
bool ok = true;
for (char c : s) {
    if (c == '(') st.push(c);
    else {
        if (st.empty()) { ok = false; break; }
        st.pop();
    }
}
if (!st.empty()) ok = false;     // 还有未匹配的左括号
```

## 单调栈

维护一个**单调（递增或递减）**的栈，常用于求每个元素的「下一个/上一个更大或更小元素」。

> **下一个更大元素**：对每个 $i$，求右边第一个比 $a_i$ 大的元素位置。

```cpp
vector<int> nextGreater(vector<int>& a) {
    int n = a.size();
    vector<int> res(n, -1);
    stack<int> st;                       // 存下标，栈中对应值递减
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            res[st.top()] = i;           // a[i] 是 st.top() 的下一个更大
            st.pop();
        }
        st.push(i);
    }
    return res;
}
```

每个下标进出栈各一次，$O(n)$。

## 为什么是 O(n)

虽有内层 `while`，但每个元素**最多入栈一次、出栈一次**，总操作数 $O(n)$（摊还分析）。

## 应用：柱状图最大矩形

> 直方图中能勾出的最大矩形面积——对每根柱子，用单调栈找它左右第一个更矮的柱子，确定它能扩展的宽度。

这是单调栈的经典应用，也是「最大全 1 子矩阵」的基础。

## 应用：表达式求值

用两个栈（操作数栈 + 运算符栈）实现中缀表达式求值，按优先级弹栈计算。

## 易错提醒

- 单调栈中常存**下标**而非值（便于算距离/宽度）。
- 想清楚维护递增还是递减栈，对应「更大」还是「更小」。
- `top()`/`pop()` 前先判 `empty()`。
- 弹栈时机：当前元素破坏单调性时弹出并结算。

## 小结

- 栈 LIFO，基础应用括号匹配、表达式求值。
- **单调栈** $O(n)$ 求下一个更大/更小元素、柱状图最大矩形。
- 栈存下标、按单调性弹出结算，是摊还 $O(n)$ 的关键。
