## 简介

Kafka 是一个开源的分布式流处理平台，用于高吞吐量、可持久化、可扩展、可容错的实时数据传输和处理。

以下是 Kafka 的一些关键特点和概念：

1. 发布订阅系统：Kafka 基于发布 - 订阅模型，通过主题（topic）来组织消息。发布者（Producer）将消息发布到特定的主题，而订阅者（Consumer）通过订阅主题来消费消息。
2. 分布式架构：Kafka 采用分布式架构，通过将数据分区存储在多个节点上来实现高可用性和可扩展性。每个主题都可以划分为多个分区（partition），每个分区可以被分布式的存储在不同的
   Kafka 节点上。
3. 数据持久化：Kafka 使用持久性日志（commit log）的方式来存储消息。该日志被分成多个分区，每个消息都在分区上按顺序追加，以保证数据的顺序性和可靠性。
4. 高吞吐量：Kafka 被设计为高吞吐量的系统，能够处理大量的实时数据。它使用顺序 I/O、零拷贝等技术进行优化，从而实现了较高的写入和读取性能。
5. 扩展性和容错性：Kafka 具有良好的可扩展性和容错性。

Kafka 在实时数据处理、日志收集、流式处理、事件驱动架构等场景中广泛应用。它已成为许多大型公司和组织中处理大规模数据的核心组件之一。

消息队列常用于：

+ 削峰
+ 解耦
+ 异步通信

## 重要变更点

+ Kafka 自 3.0 版本后，不再强依赖 Zookeeper

  在多 broker 场景下（甚至几十都有可能出现 zookeeper 瓶颈），zookeeper 需要保存大量数据，容易延迟过高，导致 broker 和
  controller 大面积掉线。zookeeper 是强一致性存储系统，写入性能不佳。新版本实现了一套分布式一致性协议 KRaft 并支持
  Controller 独立部署

+ Kafka 自 3.0 版本后，controller 可以单独部署，支持多 controller

  原因：集群中，对外提供服务的 controller 只有一个，负载大，容易崩溃进而重新选举对外服务节点。如果集群元数据很多，故障转移代价大

## 消息模型

Broker：一个 Kafka 节点，负责数据存储、传输、处理

Controller ：负责监控集群中的 Broker 信息，处理客户端对元数据请求，Broker 加入离开时，协调重新平衡 Partition 分配

Topic：某种类型消息的集合，一个 topic 由多个 partition 组成

Partition：Topic 的物理分组（分区），Partition 可能会分散在不同 Broker 上，单个 Partition 保证消息有序。Kafka
通过多分区实现数据的冗余和伸缩性，每个 Partition 会有多个副本

Leader：每个 Partition 都有一个 Leader 副本，负责处理该分区的所有读取和写入请求，并把操作日志分发到 Follower

Follower：Leader 副本的复制，用于提供冗余和高可用性

Segment：Segment 是一种物理存储结构，用于持久化保存消息。Segment 是 Kafka 日志文件的一个片段或分区，它将一组连续的消息按顺序写入磁盘上的文件。当一个
Segment 文件满了之后，Kafka 会创建一个新的 Segment 文件来接收后续的消息。每个 Partition（分区）下的消息日志由多个 Segment
组成。

Offset：来标识一个 Consumer 在一个特定分区（Partition）中的消费位置。它是一个表示消息在分区中的唯一位置的数字。每个分区都有自己独立的偏移量序列。

Replica（N）：每个 Partition 都会有 N 个完全相同的冗余备份，分散在不同机器，只有 leader replica 提供给客户端，副本数应该小与
Broker 数

Producer：通过 Broker 发布新的消息到某个 Topic 中

Consumer：通过 Broker 从某个 Topic 中获取消息

消息可以由 `<topic,partition,offset>` 三元组唯一确定

#### 消费模式

Kafka 支持点对点模式、发布 / 订阅模式

+ 点对点模式

  生产者消费者一对一

+ 发布 / 订阅模式

  消费者相互独立，都可以消费到消息

## 部署

Kafka 自 3.0 后支持两种模式进行 controller 选举和集群管理：

+ ZooKeeper

  使用外部的 ZooKeeper 服务存储 Kafka 集群的配置和运行状态信息

  Controller 通过 ZooKeeper 被动选举, 单点故障

  选用 Zookeeper 方式部署，节点数量需要是奇数，以确保选举过程中能够达成多数派的共识

+ kraft

  Controller 组内通过 Raft 一致性算法实现主从复制 (多数派投票)

  Controller 支持主备模式实现 active-active 高可用部署

  系统架构简单, 不依赖外部组件

### 部署要点

Kraft 模式部署时，部署可以区分 Controller Only 组、Broker Only 组。在小集群或者开发测试时，Kafka 节点可以兼作 Controller 和
Broker

### K8S 部署

helm 是 k8s 包管理器，可以简化部署和管理应用程序，社区生态较为活跃，对于常用的中间件都有一些组织社区维护 helm
charts，对接开源版本时，可以直接使用这些 helm charts，免去编写大量初始化脚本、应用配置的工作。

使用 helm charts
部署 [kafka 26.6.3 · bitnami/bitnami (artifacthub.io)](https://artifacthub.io/packages/helm/bitnami/kafka)

#### kraft 模式部署

下面的方式会创建三个兼顾 controller、broker 的 kafka 节点集群，指定 client(9092 端口)、external（9095 端口）使用 `PLAINTEXT`
协议通信，并通过 NodePort 方式提供对外访问，ip 是 `192.168.229.128`

```sh
helm install my-kafka bitnami/kafka --version 26.6.3 \
--set kraft.enabled=true \
--set controller.persistence.size=128Mi \
--set heapOpts="-Xmx1024m -Xms1024m" \
--set listeners.client.protocol=PLAINTEXT \
--set listeners.external.protocol=PLAINTEXT \
--set externalAccess.enabled=true \
--set externalAccess.controller.service.type=NodePort \
--set externalAccess.controller.service.externalIPs[0]='192.168.229.128' \
--set externalAccess.controller.service.externalIPs[1]='192.168.229.128' \
--set externalAccess.controller.service.externalIPs[2]='192.168.229.128' \
--set externalAccess.controller.service.nodePorts[0]='31000' \
--set externalAccess.controller.service.nodePorts[1]='31001' \
--set externalAccess.controller.service.nodePorts[2]='31002' 
```

默认使用的端口和协议如下，可以修改 .values 方便的修改使用的协议

|              | 端口   | 协议             | 描述               |
|--------------|------|----------------|------------------|
| client       | 9092 | SASL_PLAINTEXT | 用于 client 连接     |
| controller   | 9093 | SASL_PLAINTEXT | 用于 controller 连接 |
| inter broker | 9094 | SASL_PLAINTEXT | 用于 broker 之间内部通信 |
| external     | 9095 | SASL_PLAINTEXT | 用于 k8s 集群外连接     |

部署完毕后 k8s 集群内应用可以使用 `my-kafka.default.svc.cluster.local:9092` 从 service 访问

或者通过通过下面地址直接访问指定 broker pod

+ `my-kafka-controller-0.my-kafka-controller-headless.default.svc.cluster.local:9092`
+ `my-kafka-controller-1.my-kafka-controller-headless.default.svc.cluster.local:9092`
+ `my-kafka-controller-2.my-kafka-controller-headless.default.svc.cluster.local:9092`

::: tip

开发环境想要获得远程 k8s 环境，通过 dns 域名访问服务，可以考虑使用 kt-connect、telepresence 等工具

:::

集群外可以通过 `192.168.229.128:31000` 访问 pod `my-kafka-controller-0`，访问其他两个 pod 同理

如果想只暴露一个 nodeport，负载均衡到三个 pod，目前 bitnami 的 helm charts 应该没有提供一个比较清晰的配置方法，可能需要修改
helm charts，修改 advertised.listeners 让所有 pod 指向同一个 nodePort，例如 `EXTERNAL://192.168.229.128:31000`

## 参考

[Kafka 入门教程 | 始于珞尘 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903603568640008?searchId=202307200830331F44E30D9EFAAFD4CD9F)

[Kafka 架构、核心机制和场景解读 - 掘金 (juejin.cn)](https://juejin.cn/post/7176575859686375481?searchId=20230722190330626B50ED92BD1F7FA69D#heading-57)

[Confluent Control Center | Confluent Documentation](https://docs.confluent.io/platform/current/control-center/index.html)

[Apache Kafka](https://kafka.apache.org/documentation/)