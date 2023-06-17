## 简介

Apache Dubbo 是一款易用的、提供高性能通信和服务治理能力的微服务开发框架，Dubbo 提供多种语言实现

文档官网：[Dubbo 文档 | Apache Dubbo](https://cn.dubbo.apache.org/zh-cn/overview/home/#)

## 开始之前

文本会使用 nacos2.1.0 作为注册中心，而不是内置的 embedded-zookeeper，减少官网使用低版本 zookeeper 造成的通信 bug

## 快速开始

本例由官方 dubbo-samples 项目 dubbo-samples-api 修改而来

1. 启动注册中心
2. 引入依赖

```xml
        <dependency>
            <groupId>com.alibaba.nacos</groupId>
            <artifactId>nacos-client</artifactId>
            <version>2.1.2</version>
        </dependency>
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo</artifactId>
            <version>3.2.0-beta.4</version>
        </dependency>


        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.36</version>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-reload4j</artifactId>
            <version>1.7.36</version>
        </dependency>

        <dependency>
            <groupId>ch.qos.reload4j</groupId>
            <artifactId>reload4j</artifactId>
            <version>1.2.24</version>
        </dependency>
```

3. 新建 log4j.properties 文件配置日志

   ```properties
   ###set log levels###
   log4j.rootLogger=info, stdout
   ###output to the console###
   log4j.appender.stdout=org.apache.log4j.ConsoleAppender
   log4j.appender.stdout.Target=System.out
   log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
   log4j.appender.stdout.layout.ConversionPattern=[%d{dd/MM/yy hh:mm:ss:sss z}] %t %5p %c{2}: %m%n
   ```

4. 新建接口 GreetingsService.java

```java
public interface GreetingsService {
    String sayHi(String name);
}
```

5. 新建 provider 包，表示服务提供者

新建 GreetingsServiceImpl.java 实现 GreetingsService 接口

```java
public class GreetingsServiceImpl implements GreetingsService {
    @Override
    public String sayHi(String name) {
        return "hi, " + name;
    }
}
```

新建 Application.java，向注册中心注册服务提供者

```java
public class Application {

    public static void main(String[] args) {
        // 服务配置
        ServiceConfig<GreetingsService> service = new ServiceConfig<>();
        service.setInterface(GreetingsService.class);
        service.setRef(new GreetingsServiceImpl());
        
        // 启动服务提供者实例
        DubboBootstrap.getInstance()
                .application("first-dubbo-provider")
                // 这里是注册中心地址
                .registry(new RegistryConfig("nacos://localhost:8848"))
                // 使用 dubbo 协议，随机端口
                .protocol(new ProtocolConfig("dubbo", -1))
                .service(service)
                .start()
                .await();
    }
}

```

6. 新建 client 包，作为服务消费者

新建 AlwaysApplication.java，持续通过 dubbo 调用远程服务

```java
public class AlwaysApplication {

    public static void main(String[] args){
        ReferenceConfig<GreetingsService> reference = new ReferenceConfig<>();
        reference.setInterface(GreetingsService.class);

        DubboBootstrap.getInstance()
                .application("first-dubbo-consumer")
                .registry(new RegistryConfig("nacos://localhost:8848"))
                .reference(reference)
                .start();

        GreetingsService service = reference.get();
        while (true) {
            try {
                String message = service.sayHi("dubbo");
                System.out.println(new Date() + " Receive result ======> " + message);
                Thread.sleep(1000);
            } catch (Throwable t) {
                t.printStackTrace();
            }
        }
    }

}
```

7. 依次启动

   + 服务提供者 provider/Application.java
   + 服务消费者 client/AlwaysApplication.java

8. 观察输出结果

   ```
   Sun Mar 05 19:07:11 CST 2023 Receive result ======> hi, dubbo
   Sun Mar 05 19:07:12 CST 2023 Receive result ======> hi, dubbo
   ```

## 使用

###  Dubbo + SpringBoot

建议直接clone项目 [dubbo-samples-nacos](https://github.com/xiaoso456/dubbo-samples-nacos/tree/master) 

```
git clone https://github.com/xiaoso456/dubbo-samples-nacos.git
```

查看 basic 模块 dubbo-samples-spring-boot，做了以下几件事

1. 新建普通 Maven 模块 dubbo-samples-spring-boot-interface，定义服务接口，需要使用 maven install 安装该模块到本地

```java
public interface DemoService {
    String sayHello(String name);
}
```

2. 新建 SpringBoot 模块 dubbo-samples-spring-boot-provider，**引用并实现 1 中模块接口**，自动向注册中心注册

```java
// 实现并注册 dubbo 服务
@DubboService
public class DemoServiceImpl implements DemoService {

    @Override
    public String sayHello(String name) {
        return "Hello " + name;
    }
}
```

```java
@SpringBootApplication
// 开启 dubbo
@EnableDubbo
public class ProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
}
```

3. 新建 SpringBoot 模块 dubbo-samples-spring-boot-consumer，从注册中心获取 dubbo 服务并使用

   如下代码，在 SpringBoot 启动后开启一个线程，每秒调用一次 DemoService 这个 dubbo 服务

```java
@Component
public class Task implements CommandLineRunner {
    // 注入 dubbo 服务
    @DubboReference
    private DemoService demoService;

    @Override
    public void run(String... args) throws Exception {
        String result = demoService.sayHello("world");
        System.out.println("Receive result ======> " + result);

        new Thread(()-> {
            while (true) {
                try {
                    Thread.sleep(1000);
                    System.out.println(new Date() + " Receive result ======> " + demoService.sayHello("world"));
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    Thread.currentThread().interrupt();
                }
            }
        }).start();
    }
}
```

```java
@SpringBootApplication
// 开启 dubbo 服务注册发现
@EnableDubbo
public class ConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }
}
```

然后，依次启动 provider、consumer 即可看到结果

## 参考

[Dubbo 文档 | Apache Dubbo](https://cn.dubbo.apache.org/zh-cn/overview/home/#)