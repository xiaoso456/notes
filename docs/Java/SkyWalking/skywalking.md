## 简介

skywalking 是 Java 编写的开源的 APM（应用性能监视）系统，用于监视和诊断分布式系统，并提供实时性能分析、告警和故障诊断等功能，可用于云原生架构中

skywalking 一大特点是提供无侵入或低侵入的方式监控

skywalking 主要提供功能如下：

+ 分布式跟踪
+ 堆栈代理
+ 支持成熟的遥测生态系统
+ 原生 APM 数据库
+ 一致的指标聚合
+ 日志管理管道
+ 警报和遥测管道

![image-20230625173736441](./assets/image-20230625173736441.png)

## 快速开始

### 运行 skywalking 后端以及 dashboard

下载 skywalking apm：[Downloads | Apache SkyWalking](https://skywalking.apache.org/downloads/)

解压后运行 bin/startup.bat

访问：127.0.0.1:8080 可以看到 UI 面板

![image-20230625195802893](./assets/image-20230625195802893.png)

### Jave agent

文档：[Setup java agent | Apache SkyWalking](https://skywalking.apache.org/docs/skywalking-java/v8.16.0/en/setup/service-agent/java-agent/readme/)

下载：

要监测大部分 Java 应用，只需要在运行 java 程序时，加上参数运行即可，默认支持大部分 Java 框架

```
-javaagent:/path/to/skywalking-package/agent/skywalking-agent.jar
```

启动了一个最简单的 SpringBoot 应用，可以看到如下

![image-20230625210531658](./assets/image-20230625210531658.png)

![image-20230625210610081](./assets/image-20230625210610081.png)

## 组件

### 基础组件

+ SkyWalking APM

  可观测性分析平台和应用程序性能管理系统

+ Rocketbot UI

  SkyWalking的主要UI

### 代理组件

代理组件主要提供各个语言项目的上报跟踪信息能力

主要一下语言和组件代理：

+ Java
+ Python
+ Go
+ NodeJs
+ Nginx LUA
+ Kong
+ ...

###  Operation

+ SkyWalking CLI

  SkyWalking CLI 是 SkyWalking 用户或 OPS 团队的命令交互工具。

+ Kubernates Helm

  在 k8s 环境的安装脚本

+ SkyWalking Cloud on Kubernetes

  

### 数据库 

+ BanyanDB Server
+ BanyanDB Java Client

### 开发测试工具

+ skywalking eyes

  一种全功能许可证工具，用于检查和修复许可证头，并解决依赖项的许可证问题。

+ skywalking infra e2e

  一种端到端测试框架，旨在帮助开发人员轻松设置、调试和验证端到端测试。

## Java Agent

一般而言，快速开始的方式能够满足大部分场景

其他情况可以参考：[Setup java agent | Apache SkyWalking](https://skywalking.apache.org/docs/skywalking-java/v8.16.0/en/setup/service-agent/java-agent/readme/)

### 容器环境

#### 使用skywalking jdk构建镜像

docker 镜像可以基于官方镜像构建，这样启动 Java程序就会自动启动 Java Agent

```dockerfile
FROM apache/skywalking-java-agent:8.5.0-jdk8
```

#### 使用代理

如果不方便使用官方jdk构建镜像，也可以继续用命令行参数的方式启动Java程序

```
-javaagent:/path/to/skywalking-package/agent/skywalking-agent.jar
```

### k8s 环境

使用初始容器把 skywalking 的 jar 包挂到容器中，然后使用启动参数启动

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: agent-as-sidecar
spec:
  restartPolicy: Never

  volumes:
    - name: skywalking-agent
      emptyDir: { }

  initContainers:
    - name: agent-container
      image: apache/skywalking-java-agent:8.7.0-alpine
      volumeMounts:
        - name: skywalking-agent
          mountPath: /agent
      command: [ "/bin/sh" ]
      args: [ "-c", "cp -R /skywalking/agent /agent/" ]

  containers:
    - name: app-container
      image: springio/gs-spring-boot-docker
      volumeMounts:
        - name: skywalking-agent
          mountPath: /skywalking
      env:
        - name: JAVA_TOOL_OPTIONS
          value: "-javaagent:/skywalking/agent/skywalking-agent.jar"
```

### 手动跟踪

使用 agent 的方式，有官方和社区支持，可以监控大部分场景，但有些场合仍需要侵入到程序才能跟踪监控：

+ 使用 GraalVM 本机镜像
+ 官方没适配框架
+ ...

#### 添加工具包

```xml
   <dependency>
      <groupId>org.apache.skywalking</groupId>
      <artifactId>apm-toolkit-trace</artifactId>
      <version>${skywalking.version}</version>
   </dependency>
```

#### trace 模型

为了理解 skywalking 跟踪模型你需要理解下面这些概念：[Trace Data Protocol | Apache SkyWalking](https://skywalking.apache.org/docs/main/v9.5.0/en/api/trace-data-protocol-v3/)

`EntrySpan`：表示服务提供者，也是服务器端的端点。作为一个APM系统，SkyWalking针对的是应用服务器。因此，几乎所有的服务和MQ消费者都是EntrySpans。

`LocalSpan`：表示与远程服务无关的跟踪片段（典型代表就是Java方法）。它既不是MQ生产者/消费者，也不是服务的提供者/消费者（例如HTTP服务）。

`ExitSpan`：典型代表是客户端的服务或MQ生产者。在SkyWalking的早期版本被称为LeafSpan。例如，通过JDBC访问数据库，以及读取Redis/Memcached均归类为ExitSpans。

`跨线程/进程父span`：称为“reference”。参考承载了trace ID、segment ID、span ID、service name, service instance name, endpoint name以及用于client的目标地址（注意：在跨线程操作中，这并不是必需的）中的此请求的信息。欲了解更多详情，请参阅 https://skywalking.apache.org/docs/main/v9.5.0/en/api/x-process-propagation-headers-v3

`Span＃skipAnalysis`：如果span不需要进行后端分析，可能为TRUE



#### trace API

创建一个 Span

```java
SpanRef spanRef = Tracer.createEnteySpan("${operationName}", null);
```

创建一个 LocalSpan

```java
SpanRef spanRef = Tracer.createLocalSpan("${operationName}");
```

创建一个 ExitSpan

```java
SpanRef spanRef = Tracer.createExitSpan("${operationName}", "${remotePeer}");
```

停止当前 span

```java
Tracer.stopSpan();
```



更多请参考官网：[Create Span | Apache SkyWalking](https://skywalking.apache.org/docs/skywalking-java/v8.16.0/en/setup/service-agent/java-agent/application-toolkit-tracer/)

## 参考

[apache/skywalking：APM，应用程序性能监控系统 (github.com)](https://github.com/apache/skywalking)