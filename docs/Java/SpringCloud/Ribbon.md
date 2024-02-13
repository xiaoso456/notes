## 简介

提供微服务客户端负载均衡功能的工具

## 术语

客户端负载均衡：在客户端（服务消费端、服务调用端）中进行负载均衡

## 负载均衡策略

默认支持的负载均衡策略：

+ 轮询策略

+ 随机策略

+ 重试策略

  优先某个，失败一定次数后更换

+ 最小连接数

+ 过滤策略

  扩展了轮询策略，先轮询再去判断该 server 是否超时可用、当前连接数是否超限

+ 区域权衡策略

不支持的：

+ Hash

  根据源地址 Hash 后选取服务

+ 权重

## Ribbon 使用

主要有以下几种：

+ 原生 API
+ Ribbon + RestTemplate
+ Ribbon + Feign

## 参考

[【云原生】SpringCloud 系列之客户端负载均衡 Ribbon - 掘金 (juejin.cn)](https://juejin.cn/post/7126715811016179726)

https://www.bilibili.com/video/BV1EM4y1X7tB

## TODO

- [ ] 补充 Ribbon 使用
- [ ] 补充自定义负载均衡策略

