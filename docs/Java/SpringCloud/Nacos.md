## 简介

官网：[Nacos](https://nacos.io/zh-cn/)

一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台（注册中心+配置中心+服务管理）

## 术语

健康保护阈值：一个0~1的数，如果 `健康实例数 / 总实例数 < 健康保护阈值`，健康实例过少，会把不健康的实例也返回给客户端，防止雪崩

配置集ID：配置的唯一标识，Data ID 通常采用类 Java 包（如 com.taobao.tc.refund.log.level）的命名规则保证全局唯一性。此命名规则非强制。

### 功能

注册中心：管理微服务，解决微服务之间调用错综复杂、难以维护问题。通过心跳机制维护可用服务，让客户端进行负载均衡

配置中心：提供 key-value 存储

服务管理：提供 Dashboard，支持服务实例下线



### 特性

Nacos 的关键特性：

+ 服务发现和健康检测
+ 动态配置服务
+ 动态DNS服务
+ 服务及其元数据管理

### 生态

支持主流服务的发现、配置、管理：

+ [Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/)
+ [gRPC](https://grpc.io/docs/guides/concepts.html#service-definition) & [Dubbo RPC Service](https://dubbo.apache.org/)
+ [Spring Cloud RESTful Service](https://spring.io/projects/spring-cloud)

### 横向对比

CAP：一致性、可用性、分区容错性

|                 | Nacos                                      | Eureka      | Consul            | CoreDNS    | Zookeeper  |
| --------------- | ------------------------------------------ | ----------- | ----------------- | ---------- | ---------- |
| 一致性协议      | CP/AP（默认AP）                            | AP          | CP                |            | CP         |
| 健康检查        | TCP/HTTP/MYSQL/Client Beat                 | Client Beat | TCP/HTTP/gRPC/Cmd |            | Keep Alive |
| 负载均衡策略    | 权重/metadata/Selector<br/>默认集成 Ribbon | Ribbon      | Fabio             | RoundRobin |            |
| 雪崩保护        | √                                          | √           | ×                 | ×          | ×          |
| 自动注销实例    | √                                          | √           | √                 | ×          | √          |
| 访问协议        | HTTP/DNS                                   | HTTP        | HTTP/DNS          | DNS        | TCP        |
| 监听支持        | √                                          | √           | √                 | ×          | √          |
| 多数据中心      | √                                          | √           | √                 | ×          | ×          |
| 跨注册中心同步  | √                                          | ×           | √                 | ×          | ×          |
| SpringCloud集成 | √                                          | √           | √                 | ×          | √          |
| Dubbo集成       | √                                          | ×           | √                 | ×          | √          |
| K8S集成         | √                                          | ×           | √                 | √          | ×          |



## 快速开始

本文服务端使用 Nacos2.1.0

### 环境

源码或二进制运行依赖 JDK1.8+环境

### 安装

二进制下载：[Releases · alibaba/nacos (github.com)](https://github.com/alibaba/nacos/releases)

Docker参考：[Nacos Docker](https://nacos.io/zh-cn/docs/v2/quickstart/quick-start-docker.html)

K8S参考：[Kubernetes Nacos](https://nacos.io/zh-cn/docs/v2/quickstart/quick-start-kubernetes.html)

### 运行

Windows单节点启动：

```powershell
startup.cmd -m standalone
```



Linux单节点启动：

```sh
sh startup.sh -m standalone
```



Web管理端默认账号密码为：nacos/nacos

### 版本依赖表

SpringCloud组件各个版本：[版本说明 · alibaba/spring-cloud-alibaba Wiki (github.com)](https://github.com/alibaba/spring-cloud-alibaba/wiki/版本说明)

## SpringCloud中使用

### 服务注册发现 Demo

#### 新建Hello服务

首先建一个微服务，服务名为 `hello-service`，调用 `/hello/sayHello` 地址，能够告诉我们服务的端口

1. 新建一个 SpringBoot Web项目，引入依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--nacos服务注册发现-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
</dependencies>
```

2. 新建 `HelloController.java`，代码如下：

```java
@RestController
@RequestMapping("/hello")
public class HelloController {
    @Autowired
    ServerProperties serverProperties;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return "hello,this service port: " + serverProperties.getPort();
    }
}

```

3. 新建 `application.yml` 文件，如下

```yaml
server:
  port: ${random.int(10000,10010)}
spring:
  application:
    name: "hello-service" # 应用名称，nacos会使用这个当服务名
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848 # nacos 服务端地址
      discovery:
        username: nacos # 登陆账号
        password: nacos # 登陆密码
        namespace: public # 命名空间
        group: DEFAULT_GROUP #分组
```

4. 启动服务

#### 调用Hello服务

你需要新建一个消费 `hello-service`的服务，它向 nacos 询问 `hello-service` 这个服务有哪些可用地址，并向其中一个地址发送调用请求

1. 新建新建一个 SpringBoot Web项目，引入依赖

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-commons</artifactId>
        </dependency>

    </dependencies>
```

2. 往Spring环境里注入 RestTemplate Bean，并使用 `@LoadBalanced` 让它支持负载均衡

```java
@SpringBootApplication
public class AppServiceHelloConsumer {
    public static void main(String[] args) {
        SpringApplication.run(AppServiceHelloConsumer.class,args);
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(RestTemplateBuilder builder){
        RestTemplate restTemplate = builder.build();
        return restTemplate;
    }
}
```

3. 新建 `HelloConsumerController.java`，消费 `hello-service` 这个服务

```java
@RestController
@RequestMapping("/hello")
public class HelloConsumerController {

    @Autowired
    RestTemplate restTemplate;

    @RequestMapping("/consumeHello")
    public String consumerHello(){
        // 负载均衡访问 hello-service 这个服务
        String restResult = restTemplate.getForObject("http://hello-service/hello/sayHello", String.class);
        String result = "consumer hello service,body: " + restResult;
        return result;
    }
}

```

4. 新建 `application.yml`，如下

```yaml
server:
  port: 20000
spring:
  application:
    name: "service-consumer-hello"
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848 # nacos 服务端地址
      discovery:
        username: nacos # 登陆账号
        password: nacos # 登陆密码
        namespace: public # 命名空间
        group: DEFAULT_GROUP
        register-enabled: false # 不注册自己，仅使用发现服务功能
```

5. 访问 `http://127.0.0.1:20000/hello/consumeHello`，如果 `hello-service` 启动了多个并向nacos注册自己，刷新页面可以看到调用了不同的 `hello-service`服务的实例

### 配置中心 Demo

1. 在 Nacos Web端添加配置文件，配置集 ID 为 `org.example.AppConfig`，类型为 `Properties`

```properties
user.name=aa
user.age=aa
```

2. 新建一个 SpringBoot Web 项目，添加依赖如下

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

3. 给项目添加 nacos 的配置文件 `bootstrap.yml`。如下配置，默认会读取 配置集ID为`spring.application.name`，拓展名为 `.properties` 的文件

```yaml
spring:
  application:
    name: org.example.AppConfig # 当app name和配置中心中配置集 ID 相同时候，自动使用配置
  cloud:
    nacos:
      server-addr: 127.0.0.1:8848
      discovery:
        username: nacos # 登陆账号
        password: nacos # 登陆密码
        namespace: public # 命名空间
        group: DEFAULT_GROUP
        register-enabled: false # 不注册自己，仅使用发现服务
```

4. 在上下文 ApplicationContext 中获取环境属性。这里起了两个死循环的线程，监控打印环境变量`user.name` 和 `user.age`，如果在配置中心修改了配置，能在控制台打印变化

```java
@SpringBootApplication
public class AppConfig {
    public static void main(String[] args) {
        ConfigurableApplicationContext app = SpringApplication.run(AppConfig.class, args);
        new Thread(watchKeyTask(app,"user.name")).start();
        new Thread(watchKeyTask(app,"user.age")).start();
    }
    private static Runnable watchKeyTask(ApplicationContext applicationContext, String key){
        return () -> {
            String curValue = applicationContext.getEnvironment().getProperty(key);
            String newValue = curValue;
            while(true){
                newValue = applicationContext.getEnvironment().getProperty(key);
                if(!Objects.equals(curValue,newValue)){
                    System.out.println("changeEvent,key:"+key+",old value:"+curValue+",new value:"+newValue);
                    curValue = newValue;
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        };
    }
}
```

### 配置中心配置

#### 优先级

本地和远程的优先级：

```yaml
spring:
  cloud:
    config:
      # 如果想要本地配置优先级高，那么 override-none 设置为 true，包括系统环境变量、本地配置文件等配置
      override-none: true
      # 如果想要远程配置优先级高，那么 allow-override 设置为 false，如果想要本地配置优先级高那么 allow-override 设置为 true
      allow-override: true
      # 只有系统环境变量或者系统属性才能覆盖远程配置文件的配置，本地配置文件中配置优先级低于远程配置；注意本地配置文件不是系统属性
      override-system-properties: false
```

配置文件格式优先级： properties > yaml > json



#### 配置

**指定其他格式配置文件**

```yaml
spring:
  cloud:
      config:
        file-extension: yaml # 使用 yaml 格式的配置
```



**关闭自动配置文件自动更新**

```yaml
spring:
  cloud:
      config:
		refresh-enabled: false
```



**配置使用的数据集ID**

如下使用了两个配置集，并且后一个配置集会覆盖前一个

```yaml
spring:
  cloud:
    nacos:
      config:
        extension-configs:
          - data-id: test.config1
            file-extension: "properties"
            refresh: true
          - data-id: test.config2 # 配置 id
            file-extension: "properties" # 扩展名
            refresh: true
```

#### 注入到Bean中的配置

要想要动态改变 Bean 中注入的属性，需要使用 `@RefreshScope` 注解

```java
@RestController
@RefreshScope
public class AppConfigController {


    @Value("${user.name}")
    String username;

    @RequestMapping("/username")
    @ResponseBody
    public String username(){
        return username;
    }
  
}
```

如果在配置中心改变了 `user.name` 的值，访问 `/username` 接口，也可以看到值的改变

## 集群

推荐直接看官网：[集群部署说明 (nacos.io)](https://nacos.io/zh-cn/docs/v2/guide/admin/cluster-mode-quick-start.html)

![deployDnsVipMode.jpg](./assets/deployDnsVipMode.jpg)

## 参考

https://www.bilibili.com/video/BV1EM4y1X7tB

[home (nacos.io)](https://nacos.io/zh-cn/)