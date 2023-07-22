## 简介

Kafka是一个开源的分布式流处理平台，用于高吞吐量、可持久化、可扩展、可容错的实时数据传输和处理。

以下是Kafka的一些关键特点和概念：

1. 发布订阅系统：Kafka基于发布-订阅模型，通过主题（topic）来组织消息。发布者（Producer）将消息发布到特定的主题，而订阅者（Consumer）通过订阅主题来消费消息。
2. 分布式架构：Kafka采用分布式架构，通过将数据分区存储在多个节点上来实现高可用性和可扩展性。每个主题都可以划分为多个分区（partition），每个分区可以被分布式的存储在不同的Kafka节点上。
3. 数据持久化：Kafka使用持久性日志（commit log）的方式来存储消息。该日志被分成多个分区，每个消息都在分区上按顺序追加，以保证数据的顺序性和可靠性。
4. 高吞吐量：Kafka被设计为高吞吐量的系统，能够处理大量的实时数据。它使用顺序I/O、零拷贝等技术进行优化，从而实现了较高的写入和读取性能。
5. 扩展性和容错性：Kafka具有良好的可扩展性和容错性。

Kafka在实时数据处理、日志收集、流式处理、事件驱动架构等场景中广泛应用。它已成为许多大型公司和组织中处理大规模数据的核心组件之一。

## 消息模型

Broker：一个 Kafka 节点

Topic：某种类型消息的合集

Partition：Topic的物理分组，Partition 可能会分散在不同Broker上，单个Partition保证消息有序

Segment：Segment是一种物理存储结构，用于持久化保存消息。Segment是Kafka日志文件的一个片段或分区，它将一组连续的消息按顺序写入磁盘上的文件。当一个Segment文件满了之后，Kafka会创建一个新的Segment文件来接收后续的消息。每个Partition（分区）下的消息日志由多个Segment组成。

Offset：来标识一个Consumer在一个特定分区（Partition）中的消费位置。它是一个表示消息在分区中的唯一位置的数字。每个分区都有自己独立的偏移量序列。

Replica（N）：每个 Partition 都会有 N 个完全相同的冗余备份，分散在不同机器

Producer：通过 Broker 发布新的消息到某个 Topic 中

Consumer：通过 Broker 从某个 Topic 中获取消息

## 参考

[Kafka 入门教程 | 始于珞尘 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903603568640008?searchId=202307200830331F44E30D9EFAAFD4CD9F)