## 简介

OpenFeign 是开放声明式、模板化的HTTP客户端。Spring Cloud openfeign支持SpringMVC注解，整合了Ribbon和Nacos

使用 openfeign可以让使用HTTP请求远程调用服务时像调用本地方法一样，无需关注序列化和反序列化等操作。

## 术语

## 快速开始

1. 新建一个SpringBoot Web项目，配置服务注册发现中心并启动，用于提供远程服务，在注册中心中的服务名为`hello-service`，可参考[Nacos](/SpringCloud/Nacos.md#服务注册发现 Demo)

2. 新建一个SpringBoot Web项目，配置SpringCloud 注册发现中心
3. 在启动类下加入 `@EnableFeignClients` 注解

```java
@EnableFeignClients
@SpringBootApplication
public class AppFeign {
    public static void main(String[] args) {
        SpringApplication.run(AppFeign.class,args);
    }
}
```

4. 新建 `HelloFeignService.java` 代码如下，其中`hello-service`是远程服务名，接口地址和类型需要对应

```java
@FeignClient(name = "hello-service",path = "/hello")
public interface HelloFeignService {
    @RequestMapping("/sayHello")
    String sayHello();
}

```

5. 现在通过依赖注入，即可像使用本地服务一样调用远程服务，并且自带 Ribbon 负载均衡

```java
@RestController
@RequestMapping("/feign")
public class HelloFeignController {
    @Autowired
    HelloFeignService helloFeignService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return helloFeignService.sayHello();
    }
}

```



## 配置

日志级别有四种：

+ NONE：不记录
+ BASIC：记录请求方法、URL、状态码、执行时间
+ HEADERS：BASIC基础上，记录请求和响应的Header
+ FULL：HEADERS基础上，记录body、元数据

### 日志配置

#### 配置指定接口日志级别

新建 `FeignConfig.java` 类 

```java
public class FeignConfig {
    @Bean
    public feign.Logger.Level feignLoggerLevel(){
        return feign.Logger.Level.FULL;
    }
}

```

::: warn

不要使用`@Configuration` 让Spring管理该类，否则会变成全局配置

:::

在feign服务上指定使用该配置类 `FeignConfig.class`

```java
@FeignClient(name = "hello-service",path = "/hello",configuration = FeignConfig.class)
public interface HelloFeignService {

    @RequestMapping("/sayHello")
    String sayHello();

}
```



#### 全局配置日志级别

在 `application.yml` 添加

配置 SpringBoot 的日志输出级别

其中 `org.example.feign` 是 `org.example.feign.HelloFeignService.java` 所在的包

```yaml
 logging:
  level:
    org.example.feign: debug
```

feign 日志局部配置，`hello-service` 是远程服务

```yaml
feign:
  client:
    config:
      hello-service:
        loggerLevel: BASIC
```

### 原生注解

openFeign 支持使用 feign 原生的注解，而不是SpringMVC的注解，需要进行配置

```yaml
feign:
  client:
    config:
      hello-service:
        contract: feign.Contract.Default
```

:::warn

一般不会用，仅作介绍

:::

### 自定义拦截器

新建 `FeignInterceptorDemo.java` 实现 `RequestInterceptor` 接口，功能是打印请求信息

```java
public class FeignInterceptorDemo implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {
        System.out.println("hello,the feign request is:" + requestTemplate.request().toString());
    }
}

```

新建 `FeignConfig.java` 配置类，往容器中注入拦截器

```java
public class FeignConfig {
    @Bean
    public RequestInterceptor feignInterceptorDemo(){
        return new FeignInterceptorDemo();
    }
}

```

在feign服务上指定使用该配置类 `FeignConfig.class`

```java
@FeignClient(name = "hello-service",path = "/hello",configuration = FeignConfig.class)
public interface HelloFeignService {

    @RequestMapping("/sayHello")
    String sayHello();

}
```



## 参考

