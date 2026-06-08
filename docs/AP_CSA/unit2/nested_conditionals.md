# 嵌套条件与多分支

条件可以嵌套在另一个条件内部；`switch` 语句为「按一个变量的多个取值分支」提供更清晰的写法。

## 嵌套 if

一个 `if` 块里再放 `if`，用于先粗筛、再细分：

```java
if (loggedIn) {
    if (isAdmin) {
        System.out.println("管理员面板");
    } else {
        System.out.println("用户面板");
    }
} else {
    System.out.println("请登录");
}
```

**嵌套 vs 逻辑与**：单纯「两个条件都满足」用 `&&` 更简洁；当 false 分支处理逻辑不同（如上例两层各有 else）时用嵌套。

```java
// 这两种等价（只关心都为真的情形）
if (a > 0 && b > 0) { ... }
if (a > 0) { if (b > 0) { ... } }
```

## 用大括号消除歧义

嵌套时务必加大括号，避免「悬空 else」配对错误：

```java
if (score >= 60) {
    if (score >= 90) {
        grade = "A";
    } else {
        grade = "及格";
    }
} else {
    grade = "不及格";
}
```

## switch 语句

当对**同一个变量**做多值等值判断时，`switch` 比长 `if-else-if` 更清晰：

```java
int day = 3;
switch (day) {
    case 1:
        System.out.println("周一");
        break;
    case 2:
        System.out.println("周二");
        break;
    case 3:
        System.out.println("周三");
        break;
    default:
        System.out.println("其他");
}
```

要点：

- `case` 后是**常量**，与 `switch` 的值做等值匹配。
- **`break` 必不可少**：漏写会「贯穿（fall-through）」继续执行下一个 case。
- `default` 处理所有未匹配情形（可选）。

### 故意贯穿（多值共用一段）

```java
switch (month) {
    case 12: case 1: case 2:
        System.out.println("冬季");
        break;
    case 3: case 4: case 5:
        System.out.println("春季");
        break;
    // ...
}
```

> `switch` 适用于 `int`、`char`、`String` 等离散值；区间判断（如 `score >= 80`）仍需 `if-else-if`。

## 易错提醒

- 嵌套层级深时务必靠大括号 + 缩进保持清晰。
- `switch` 漏 `break` 会贯穿，导致多个分支被执行。
- `switch` 只能做**等值**匹配，做不了范围比较。

## 小结

- 嵌套 `if` 用于「先分大类再分小类」；只关心同时为真时优先用 `&&`。
- `switch` 让单变量多值分支更清晰，但**别忘 `break`**。
- 范围判断用 `if-else-if`，等值枚举用 `switch`。
