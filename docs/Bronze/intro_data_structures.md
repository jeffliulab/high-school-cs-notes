# 数据结构入门

> **难度**：⭐☆☆☆☆
> **前置知识**：[时间复杂度](time_complexity.md)

铜级需要熟练使用 C++ STL 的几种基础容器：数组、`vector`、`string`，以及配对用的 `pair`。它们是装数据的「容器」。

## 静态数组

固定大小，开在全局或函数内：

```cpp
int a[100005];           // 全局数组，自动清零
int n;
for (int i = 0; i < n; i++) cin >> a[i];
```

> 竞赛中常把数组开在全局并略大于上限（如上限 $10^5$ 开 $10^5+5$），既自动初始化为 0，又避免栈溢出。

## vector（动态数组）

长度可变，最常用：

```cpp
#include <vector>
vector<int> v;
v.push_back(3);          // 末尾添加 → {3}
v.push_back(5);          // {3, 5}
cout << v.size();        // 2
cout << v[0];            // 3
v.pop_back();            // 删末尾
for (int x : v) cout << x << " ";   // 遍历

vector<int> b(n, 0);     // n 个 0
vector<vector<int>> g(n);// 邻接表常用：n 个空 vector
```

## string

```cpp
#include <string>
string s = "hello";
cout << s.length();      // 5
cout << s[0];            // 'h'
s += " world";           // 拼接
string sub = s.substr(0, 5);   // "hello"，substr(起点, 长度)
for (char c : s) ...     // 遍历字符
```

注意 C++ 的 `substr(pos, len)` 第二参数是**长度**，与 Java 的 `substring(begin, end)` 不同。

## pair

把两个值绑在一起，常用于坐标、带权边：

```cpp
#include <utility>
pair<int, int> p = {3, 4};
cout << p.first << " " << p.second;   // 3 4
vector<pair<int,int>> pts;
pts.push_back({1, 2});
sort(pts.begin(), pts.end());   // 先按 first，再按 second 排序
```

## 输入输出加速

铜级数据量也可能较大，建议加上：

```cpp
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // ... 用 cin/cout 即可
}
```

或直接用 `scanf/printf`。

## 选择建议

| 需求 | 容器 |
| --- | --- |
| 定长、下标访问 | 数组 / `vector` |
| 长度不定、要 push | `vector` |
| 文本 | `string` |
| 绑定两个值 | `pair` |
| 去重 / 计数 / 查找 | `set` / `map`（见 [集合与映射](sets_maps.md)） |

## 易错提醒

- 局部开大数组（如 `int a[1000000]`）可能**栈溢出**，应开全局。
- `vector` 访问空容器的 `v[0]` 或 `v.front()` 是未定义行为。
- C++ `substr(pos, len)` 第二个参数是长度，别当成结束下标。

## 小结

- 铜级三大基础容器：定长**数组**、动态 **vector**、文本 **string**，外加 **pair**。
- 大数组开全局；`vector` 用 `push_back`/`size`/下标。
- 加 IO 加速，避免读入慢导致超时。
