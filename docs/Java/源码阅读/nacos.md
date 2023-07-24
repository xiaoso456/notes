## 简介
nacos1.4.6 源码

## 源码启动
下载 nacos 1.4.6 源码
```shell
git clone -b 1.4.6 https://github.com/alibaba/nacos.git
```
源码启动入口为 `nacos-console` 模块，入口类为 `com.alibaba.nacos.Nacos.java`

源码启动前，需要先编译 `consistency` 模块，把 `.proto` 编译为 Java 类，再启动。

调试环境添加启动参数 `-Dnacos.standalone=true`，使用内嵌数据库

## 架构

![nacos_arch.jpg](./assets/1561217892717-1418fb9b-7faa-4324-87b9-f1740329f564.jpeg)

address：

api：

auth：认证权限模块

client：

cmdb：

common：

config：

consistency：

console：

console-ui：控制台前端

core：

distribution：

doc：

exmaple：

istio：

naming：

sys：

test：





## 用户权限模块

nacos的auth模块被设计为轻量级auth，只适用于微服务内部使用

:::info

- Nacos是一个内部微服务组件，需要在可信的内部网络中运行，不可暴露在公网环境，防止带来安全风险。
- Nacos提供简单的鉴权实现，为防止业务错用的弱鉴权体系，不是防止恶意攻击的强鉴权体系。
- 如果运行在不可信的网络环境或者有强鉴权诉求，请参考官方简单实现做替换增强。

:::

Nacos用户权限主要有两个管理模块：

+ 用户管理：解决用户管理，登录，SSO 等问题

+ 权限管理：解决身份识别，访问控制，角色管理等问题

### 结构

Auth模块：主要定义权限相关的类（ActionTypes），权限模型（Permission、Resource、User），以及相关注解，比较简单

Console模块：主要提供业务层Rest接口，无非内嵌数据库或者外部数据库的增删改查

## 参考

[Nacos 1.4.1源码启动流程_nacos 1.4.1 源码启动_苏州-DaniR的博客-CSDN博客](https://blog.csdn.net/chongbaozhong/article/details/116658595)

[Nacos 快速开始](https://nacos.io/zh-cn/docs/quick-start.html)

https://developer.aliyun.com/ebook/36