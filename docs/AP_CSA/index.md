# AP CSA 考纲总览

AP Computer Science A（简称 **AP CSA**）是 College Board 提供的大学先修课程，相当于大学一年级的「计算机科学导论 / 面向对象程序设计」第一学期课程，使用 **Java** 语言。本笔记依据 **2025 秋季生效的最新版考纲（Course and Exam Description, Effective Fall 2025）** 编写，对应 **2026 年 5 月起** 的考试。

## 课程改版要点（2025 秋季）

旧考纲的 10 个单元被重组、精简为 **4 个单元**，主要变化：

- 取消独立的「继承（Inheritance）」单元，使课程更贴近大学入门课。
- 新增 **文本文件读取**：使用 `File` 与 `Scanner` 类读取文件与数据集（并入 Unit 4）。
- 自由作答题 Q3「数据分析」只考 `ArrayList`，不再涉及数组。

## 四个单元与考试权重

| 单元 | 名称 | 多选题权重 |
| --- | --- | --- |
| **Unit 1** | [使用对象与方法](unit1/) | 15–25% |
| **Unit 2** | [选择与迭代](unit2/) | 25–35% |
| **Unit 3** | [类的创建](unit3/) | 10–18% |
| **Unit 4** | [数据集合](unit4/) | 30–40% |

## 考试结构

考试为机考（Bluebook 数字考试），总时长 **3 小时**，两部分各占总分 **50%**：

- **第一部分：多项选择题（MCQ）** —— 40 题，90 分钟。覆盖全部四个单元，考查对概念与代码行为的理解。
- **第二部分：自由作答题（FRQ）** —— 4 题，90 分钟，全部为写 Java 代码：
  1. **Methods and Control Structures**：方法与控制结构。
  2. **Class**：设计并实现一个类。
  3. **Data Analysis（ArrayList）**：用 `ArrayList` 处理数据集。
  4. **2D Array**：二维数组的遍历与处理。

## 计算思维实践（Computational Thinking Practices）

考纲围绕 5 项技能组织教学与评分：

1. **Design Code（设计代码）**——理解需求、确定程序结构。
2. **Develop Code（编写代码）**——实现算法与数据抽象。
3. **Analyze Code（分析代码）**——追踪执行、判断行为与正确性。
4. **Document Code（文档化）**——注释、命名、precondition/postcondition。
5. **Use Computers Responsibly（负责任地使用计算机）**——伦理、安全与 AI 的合理使用。

## AP Java 子集

考试只考查 Java 语言的一个**子集**（AP Java Subset），并提供 **Java Quick Reference**（`String`、`Math`、`Integer`、`Double`、`Object`、`ArrayList` 等常用方法签名）。无需背诵方法签名，但要熟练使用。

## 学习建议

- 先打牢 **Unit 1–2**（语法、对象、控制流），它们是后续一切的基础。
- **Unit 4** 权重最高（30–40%），数组、`ArrayList`、二维数组、查找排序、递归务必熟练。
- 多做 **历年 FRQ**，按官方评分标准（rubric）自评。
- 用本笔记每页的「常见陷阱」对照自查易错点。

> 参考资料：College Board AP Central（官方 CED、Topic Questions、Progress Checks）、《Java Methods, 4th AP Edition》(Litvin)、CodingBat、Be Prepared for the AP CS Exam。
