## 简介

[官方文档](https://sentinelguard.io/zh-cn/docs/introduction.html)

Sentinel提供流量控制、熔断降级、系统负载保护等，可用于监控、限流、熔断等操作。



功能：流量控制、熔断降级、系统负载保护



Sentinel 和 Hystrix 对比

| Sentinel       | Hystrix                                        |                               |
| -------------- | ---------------------------------------------- | ----------------------------- |
| 隔离策略       | 信号量隔离                                     | 线程池隔离/信号量隔离         |
| 熔断降级策略   | 基于响应时间或失败比率                         | 基于失败比率                  |
| 实时指标实现   | 滑动窗口                                       | 滑动窗口（基于 RxJava）       |
| 规则配置       | 支持多种数据源                                 | 支持多种数据源                |
| 扩展性         | 多个扩展点                                     | 插件的形式                    |
| 基于注解的支持 | 支持                                           | 支持                          |
| 限流           | 基于 QPS，支持基于调用关系的限流               | 有限的支持                    |
| 流量整形       | 支持慢启动、匀速器模式                         | 不支持                        |
| 系统负载保护   | 支持                                           | 不支持                        |
| 控制台         | 开箱即用，可配置规则、查看秒级监控、机器发现等 | 不完善                        |
| 常见框架的适配 | Servlet、Spring Cloud、Dubbo、gRPC 等          | Servlet、Spring Cloud Netflix |

## 术语

限流：对系统中的请求或者流量进行限制，以便在短时间内不被某些请求或者流量攻击所淹没。

熔断：在系统负载过高时自动关闭服务，以避免服务器被更多的请求压垮。

降级：发生异常情况（如网络或服务器宕机等）时，系统能够提供不完全的服务，并以提供可用的替代服务来保证系统的可用性。例如，当系统出现故障时，可以降级到提供简单的查询功能或者缺省值，而不提供更复杂的操作。

## 快速开始

1. 添加依赖

```xml
<!-- replace here with the latest version -->
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-core</artifactId>
    <version>1.8.6</version>
</dependency>
```



1. 定义资源 `HelloWorld`

```java
public static String getHello(){
    try (Entry entry = SphU.entry("HelloWorld")) {
        return "hello";
    } catch (BlockException e) {
        // Handle rejected request.
        e.printStackTrace();
    }
}
```

2. 定义资源 `HelloWorld` 所使用的规则。以下规则会限制 `HelloWorld` 这个资源每秒被调用一次

```java
public static void initRule(){
    List<FlowRule> rules = new ArrayList<>();
    FlowRule rule = new FlowRule();
    rule.setResource("HelloWorld");
    rule.setCount(1);
    rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
    rules.add(rule);
    FlowRuleManager.loadRules(rules);
}
```

3. 每500ms调用一次 HelloWorld 资源，观察输出

```java
    public static void main(String[] args) throws InterruptedException {
        initRule();
        for(int i=0;i<100;i++){
            System.out.println("get:"+getHello());
            Thread.sleep(500);
        }
    }
```

```
get:hello
com.alibaba.csp.sentinel.slots.block.flow.FlowException
get:hello
com.alibaba.csp.sentinel.slots.block.flow.FlowException
get:hello
com.alibaba.csp.sentinel.slots.block.flow.FlowException
```



## 使用

建议直接参考：[quick-start | Sentinel (sentinelguard.io)](https://sentinelguard.io/zh-cn/docs/quick-start.html)

## 参考

[官方文档](https://sentinelguard.io/zh-cn/docs/introduction.html)

## TODO

- [ ] 完善常见使用
- [ ] 完善控制台使用