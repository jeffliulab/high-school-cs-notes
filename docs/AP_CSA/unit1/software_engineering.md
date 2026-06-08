# 程序与软件工程导论

理解「程序是什么、Java 代码如何从文本变成运行结果」，并认识三类错误。这是写第一个 Java 程序前的概念地基。

## 程序与编程语言

**程序（program）** 是一系列指令，告诉计算机一步步做什么。计算机只懂二进制机器码，而人用**高级语言**（如 Java）书写更易读的源代码，再由工具翻译成机器能执行的形式。

Java 采用「**先编译、后运行**」的两步模型：

1. **编译（compile）**：`javac` 把源文件 `.java` 编译成**字节码** `.class`（一种与平台无关的中间码）。
2. **运行（run）**：`java` 启动 **JVM（Java 虚拟机）**，由它解释/执行字节码。

```
Hello.java  ──javac──▶  Hello.class  ──java(JVM)──▶  程序输出
 (源代码)               (字节码)                     (运行结果)
```

「一次编译，到处运行」正是来自字节码 + JVM 这一层抽象。

## 第一个 Java 程序

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, AP CSA!");
    }
}
```

- 文件名必须与 `public` 类名一致：`Hello.java`。
- `main` 方法是程序的**入口**，JVM 从这里开始执行。
- `System.out.println(...)` 向控制台输出一行并换行；`System.out.print` 则不换行。

## 开发工具

- **JDK（Java Development Kit）**：含 `javac`（编译器）、`java`（运行）、`javadoc`（文档生成）等。
- **IDE（集成开发环境）**：如 IntelliJ IDEA、Eclipse、BlueJ，集编辑、编译、运行、调试于一体。

## 三类错误

| 类型 | 何时发生 | 例子 |
| --- | --- | --- |
| **语法错误 (syntax error)** | 编译时，代码不符合 Java 语法 | 漏掉分号 `;`、括号不匹配 |
| **运行时错误 (run-time error)** | 程序运行中崩溃，抛出异常 | 除以零、数组越界、空指针 |
| **逻辑错误 (logic error)** | 程序能运行但结果不对 | 把 `+` 写成 `-`、循环边界写错 |

语法错误最容易发现（编译器会指出）；**逻辑错误最隐蔽**，需要靠测试和调试。

## 负责任地使用计算机

考纲强调伦理与安全：尊重知识产权与隐私、不传播恶意代码、对生成式 AI 的使用保持透明与诚信。这部分会在多选题中以情境题形式出现。

## 小结

- Java 程序经 **编译（javac → 字节码）→ 运行（JVM）** 两步执行。
- `main` 是入口，`System.out.println` 输出。
- 牢记**语法 / 运行时 / 逻辑**三类错误的区别——这是 MCQ 常考点。
