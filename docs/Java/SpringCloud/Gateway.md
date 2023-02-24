## 介绍

Spring Cloud Gateway 是微服务网关组件，可以实现路由转发、认证、鉴权、监控等功能



功能：

+ 动态路由
+ 路径重写
+ 集成Spring Cloud 服务发现功能（Nacos、Eruka）
+ 可集成流控降级功能（Sentinel、Hystrix）
+ 可对路由指定 Predicate（断言）和 Filter（过滤器）

## 术语



## 快速开始

1. 新建 SpringBoot项目（不是Web），引入依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

2. 新建配置文件 `application.yml`，编写路由规则如下，作用是访问 `127.0.0.1:40000/hello-service/*` 时，会把请求转发到 `127.0.0.1:10007/*`

```yaml
server:
  port: 40000
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: hello-service-route # 路由唯一标识，一般用服务名
          uri: http://127.0.0.1:10007 # 需要转发到的地址
          # 断言规则，什么的请求会被转发到这个地址
          predicates:
            - Path=/hello-service/**
          # 过滤器，转发前去掉第一级路径 /hello-service
          filters:
            - StripPrefix=1
```

3. 启动服务访问即可看到效果

## 使用

### 断言

#### 内置断言工厂

TODO

#### 自定义断言工厂

TODO

### 过滤器

TODO

### 日志记录

TODO

### 跨域处理

TODO

## 与其他框架集成

### 集成 nacos

集成 nacos 可以根据服务名进行转发，进行负载均衡

#### 手动配置规则

1. 引入依赖

```xml
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
```

2. 新建 `application.yml`，配置 nacos 服务地址，把 uri 修改服务名

```yaml
server:
  port: 40000
spring:
  application:
    name: api-gateway-nacos
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      discovery:
        username: nacos
        password: nacos
    gateway:
      routes:
        - id: hello-service-route # 路由唯一标识，一般用服务名
          uri: lb://hello-service # lb://<服务名>，使用nacos负载均衡策略
          # 断言规则，什么的请求会被转发到这个地址
          predicates:
            - Path=/hello-service/**
          # 过滤器，转发前去掉第一级路径 /hello-service
          filters:
            - StripPrefix=1
```

3. 访问 `127.0.0.1:40000/hello-service/*` 即可自动负载均衡到服务

#### 使用约定配置

使用约定配置，可以省去配置服务名的麻烦，修改手动配置章节中的 `application.yml`

```yaml
server:
  port: 40000
spring:
  application:
    name: api-gateway-nacos
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      discovery:
        username: nacos
        password: nacos
    gateway:
      discovery:
        locator:
          enabled: true
```

现在访问 `127.0.0.1:40000/<服务名>/*` 会自动访问对应服务的服务

::: tip

约定配置不使用断言和过滤器，阅读性不太好，更建议手动配置

:::

## 参考