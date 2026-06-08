# 第三单元：类的创建

> **考试权重**：10–18%（多选题）

第一单元学会了**使用**别人写好的类，本单元学习**自己设计并实现类**——这是面向对象编程的核心，也是 FRQ Q2 的考点。

## 本单元内容

1. [类的结构](class_anatomy.md) —— 实例变量、方法、`public`/`private` 概览。
2. [构造方法与 new 运算符](constructors.md) —— 默认构造、带参构造、对象创建过程。
3. [访问器与修改器方法](accessor_mutator.md) —— getter/setter、返回值与状态修改。
4. [this 关键字与参数传递](this_parameters.md) —— `this` 的含义、形参与实参、按值传递。
5. [静态变量与静态方法](static_members.md) —— `static` 的语义、类变量 vs 实例变量。
6. [作用域与访问控制](scope_access.md) —— 局部/实例作用域、`public`/`private` 封装。
7. [封装与 javadoc 设计](encapsulation_javadoc.md) —— 封装原则、precondition/postcondition、注释规范。

## 学习目标

- 从需求出发设计一个类：确定实例变量、构造方法与方法。
- 理解封装：用 `private` 保护数据，用 `public` 方法提供接口。
- 正确使用 `this` 区分实例变量与参数。
- 区分实例成员与静态成员的存储与访问方式。

## 易错提醒

- 忘记在构造方法中初始化实例变量，导致引用型变量为 `null`。
- 在静态方法中错误地访问实例变量（`static` 上下文没有 `this`）。
- 修改器方法应改变对象状态，访问器方法不应有副作用。
