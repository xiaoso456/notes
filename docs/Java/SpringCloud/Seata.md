## 简介

Seata 是一款开源的分布式事务解决方案，它能够帮助用户解决分布式系统中的数据一致性问题，并提供 AT（首推）、TCC、SAGA、XA
等多种事务模式支持。

## 术语

事务：一组原子操作，它们要么全部完成，要么都不能完成。

事务 ACID 特性：原子性（A）、一致性（C）、隔离性（I）、持久性（D）

TC (Transaction Coordinator) - 事务协调者：维护全局和分支事务的状态，驱动全局事务提交或回滚。

TM (Transaction Manager) - 事务管理器：定义全局事务的范围，开始全局事务、提交或回滚全局事务。

RM (Resource Manager) - 资源管理器：管理分支事务处理的资源，与 TC 交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

2PC：二阶段提交，分为准备阶段和提交阶段

## 分布式事务实现

### AT

AT（auto transaction）是阿里 seata 框架实现的，无侵入的分布式事务解决方案

使用前提：

+ 基于支持本地 ACID 事务的关系型数据库
+ Java 应用，通过 JDBC 访问数据库

### TCC

使用前提：

+ 需要每个事务都具备自己的：一阶段 prepare 行为、二阶段 commit 或 rollback 行为

TCC 模式，不依赖于底层数据资源的事务支持：

- 一阶段 prepare 行为：调用 ** 自定义 ** 的 prepare 逻辑。
- 二阶段 commit 行为：调用 ** 自定义 ** 的 commit 逻辑。
- 二阶段 rollback 行为：调用 ** 自定义 ** 的 rollback 逻辑。

### Sage 模式

Saga 模式是 SEATA 提供的长事务解决方案

### XA 模式

使用前提：

- 支持 XA 事务的数据库。（也就是组件需要支持 XA 协议）
- Java 应用，通过 JDBC 访问数据库。

## 参考

[官网]([Seata 是什么](https://seata.io/zh-cn/docs/overview/what-is-seata.html))

## TODO

- [ ] 优化分布式事务实现介绍