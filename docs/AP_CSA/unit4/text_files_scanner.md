# 文本文件与 Scanner

这是 **2025 秋季新版考纲新增的考点**：用 `Scanner` 类读取文本文件和数据集。

## Scanner 简介

`Scanner` 能从多种来源**逐项读取**数据。两种常见来源：

```java
import java.util.Scanner;
import java.io.File;

Scanner kb = new Scanner(System.in);       // 从键盘读
Scanner fileIn = new Scanner(new File("data.txt"));  // 从文件读
```

从文件读取时，方法需要声明 `throws Exception`（处理「文件可能不存在」的受检异常）：

```java
public static void readData() throws Exception {
    Scanner in = new Scanner(new File("data.txt"));
    // ...
    in.close();    // 用完关闭
}
```

## 核心读取方法

| 方法 | 作用 |
| --- | --- |
| `next()` | 读下一个**单词**（以空白分隔） |
| `nextInt()` | 读下一个 `int` |
| `nextDouble()` | 读下一个 `double` |
| `nextLine()` | 读**一整行**（到换行） |
| `hasNext()` | 是否还有下一项（单词） |
| `hasNextInt()` | 下一项是否为 int |
| `hasNextLine()` | 是否还有下一行 |

## 逐行读取整个文件

`while (hasNextLine())` 是最常用的模式：

```java
Scanner in = new Scanner(new File("names.txt"));
while (in.hasNextLine()) {
    String line = in.nextLine();
    System.out.println(line);
}
in.close();
```

## 逐项读取数字并处理

读入一串数字求和/求平均（数据集分析）：

```java
Scanner in = new Scanner(new File("scores.txt"));
int sum = 0, count = 0;
while (in.hasNextInt()) {
    int score = in.nextInt();
    sum += score;
    count++;
}
in.close();
double avg = (double) sum / count;
```

## 把文件内容读进 ArrayList

读文件构建数据集，再用 [ArrayList 标准算法](arraylist_algorithms.md) 处理：

```java
ArrayList<String> words = new ArrayList<String>();
Scanner in = new Scanner(new File("words.txt"));
while (in.hasNext()) {
    words.add(in.next());
}
in.close();
System.out.println("共 " + words.size() + " 个单词");
```

## 解析一行中的多个字段

先 `nextLine()` 取整行，再用 `String` 方法或新建 `Scanner` 拆分：

```java
String line = in.nextLine();           // "Ann 95 88"
Scanner lineScan = new Scanner(line);
String name = lineScan.next();         // "Ann"
int s1 = lineScan.nextInt();           // 95
int s2 = lineScan.nextInt();           // 88
```

## 易错提醒

- 文件读取的方法要 `throws Exception`（或在 AP 中按题目给定的方式声明）。
- **`nextInt()` 不消费行末换行**：混用 `nextInt()` 和 `nextLine()` 时，`nextInt()` 后紧跟的 `nextLine()` 可能读到空串——需要时先额外 `nextLine()` 吃掉换行。
- 读取前用 `hasNextXxx()` 判断，避免读到末尾抛 `NoSuchElementException`。
- 用完 `in.close()`。

## 小结

- 新考点：用 `Scanner(new File(...))` 读文本文件。
- `hasNextLine()/nextLine()` 逐行、`hasNextInt()/nextInt()` 逐数，是两大主力模式。
- 注意 `nextInt()` 与 `nextLine()` 混用时的换行残留陷阱。
