## 简介

Flink 是一个支持流处理和批处理的分布式计算框架

## 概念

### DataStream 

FLink中的数据集合，是可以包含重复项，不可变的数据集合，数据可以是有界也可以是无界

DataStream 是不可变的，一旦被创建，不能添加或删除

## 程序构成

Flink 程序看起来像一个转换 `DataStream` 的常规程序。每个程序由相同的基本部分组成：

1. 获取一个`执行环境（execution environment）`；
2. 加载/创建初始数据；
3. 指定数据相关的转换；
4. 指定计算结果的存储位置；
5. 触发程序执行。

```java
// 1 获取执行环境
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 2 加载数据
DataStream<String> text = env.readTextFile("file:///path/to/file");

// 3 转换数据，生成新的DataStream
DataStream<Integer> parsed = text.map(new MapFunction<String, Integer>() {
    @Override
    public Integer map(String value) {
        return Integer.parseInt(value);
    }
});
// 4 写到外部系统,也叫 sink
// 常用的有 print()和 writeAsText(String path)

// 5 执行
env.execute("test job");
```



## 参考

[概览 | Apache Flink](https://nightlies.apache.org/flink/flink-docs-release-1.16/zh/docs/dev/datastream/overview/)