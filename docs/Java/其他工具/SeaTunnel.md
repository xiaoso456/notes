## 简介

SeaTunnel是一个非常易于使用、超高性能的分布式数据集成平台，支持实时海量数据同步。

###　为什么需要SeaTunnel

SeaTunnel专注于数据集成和数据同步，主要针对数据集成领域的常见问题进行设计：

- 数据源多样：常用数据源有数百种，版本不兼容。随着新技术的出现，越来越多的数据源正在出现。用户很难找到一个可以完全快速地支持这些数据源的工具。
- 复杂的同步场景：数据同步需要支持离线全量同步、离线增量同步、CDC、实时同步、全库同步等多种同步场景。
- 资源需求高：现有的数据集成和数据同步工具，往往需要大量的计算资源或JDBC连接资源才能完成海量小表的实时同步。
- 缺乏质量和监控：数据集成和同步过程经常会遇到数据丢失或重复的情况。同步过程缺乏监控，在任务过程中无法直观地了解数据的真实情况。
- 复杂的技术栈：企业使用的技术组件不同，用户需要针对不同的组件开发相应的同步程序才能完成数据集成。
- 管理和维护难度：受限于不同的底层技术组件（Flink/Spark），离线同步和实时同步往往分别开发和管理，增加了管理和维护的难度。

### 特点

SeaTunnel的特点：

- 丰富且可扩展的连接器：SeaTunnel 提供了一个不依赖于特定执行引擎的连接器 API。基于该 API 开发的连接器（Source、Transform、Sink）可以运行在目前支持的 SeaTunnel Engine、Flink 和 Spark 等多种不同的引擎上。
- 连接器插件：插件设计允许用户轻松开发自己的连接器并将其集成到 SeaTunnel 项目中。目前，SeaTunnel 支持 100 多个连接器，而且数量还在激增。以下是[当前支持的连接器](https://seatunnel.apache.org/docs/2.3.3/Connector-v2-release-state)列表
- 批量流集成：基于 SeaTunnel Connector API 开发的 Connector，完美兼容离线同步、实时同步、全量同步、增量同步等场景。它们大大降低了管理数据集成任务的难度。
- 支持分布式快照算法，保证数据一致性。
- 多引擎支持：SeaTunnel 默认使用 SeaTunnel 引擎进行数据同步。SeaTunnel 还支持使用 Flink 或 Spark 作为 Connector 的执行引擎，以适应企业现有的技术组件。SeaTunnel 支持多个版本的 Spark 和 Flink。
- JDBC复用，数据库日志多表解析：SeaTunnel支持多表或全库同步，解决了过度JDBC连接的问题;支持多表或全库日志读解析，解决了CDC多表同步场景下处理日志重复读取解析问题的需求。
- 高吞吐量、低时延：SeaTunnel支持并行读写，提供稳定可靠的高吞吐量、低时延的数据同步能力。
- 完善的实时监控：SeaTunnel支持数据同步过程中各步骤的详细监控信息，让用户轻松了解同步任务读写的数据数量、数据大小、QPS等信息。
- 支持两种作业开发方法：编码和画布设计。SeaTunnel Web 项目 https://github.com/apache/seatunnel-web 提供对作业、调度、运行和监控功能的可视化管理。



## 架构

![SeaTunnel工作流程图](./assets/architecture_diagram-c02a9d297450d0f9522324b2f196fa06.png)

SeaTunnel 的运行过程如上图所示。

用户配置作业信息，选择执行引擎提交作业。

源连接器负责并行读取数据并将数据发送到下游转换或直接发送到接收器，接收器将数据写入目标。值得注意的是，Source、Transform 和 Sink 可以很容易地由您自己开发和扩展。

SeaTunnel 是一个 EL（T） 数据集成平台。因此，在 SeaTunnel 中，Transform 只能用于对数据进行一些简单的转换，例如将一列的数据转换为大写或小写、更改列名或将一列拆分为多列。

SeaTunnel 默认使用的引擎是 [SeaTunnel Engine](https://seatunnel.apache.org/docs/2.3.3/seatunnel-engine/about)。如果您选择使用 Flink 或 Spark 引擎，SeaTunnel 会将 Connector 打包成 Flink 或 Spark 程序，并提交到 Flink 或 Spark 运行。

## 部署

### 本地部署

1. 安装 Java 8 以上版本，配置环境变量 `JAVA_HOME`

2. 下载 SeaTunnel 二进制文件 [Apache SeaTunnel](https://seatunnel.apache.org/download/)

3. 下载连接器（connector）插件，放到安装目录文件夹`\connectors\seatunnel`下

   可以在 [Central Repository: org/apache/seatunnel](https://repo.maven.apache.org/maven2/org/apache/seatunnel/) 下载

## 快速开始

### 使用SeaTunnel引擎

本例使用SeaTunnel 引擎和`MySQL CDC`连接器插件开启一个数据同步任务

环境准备：

1. 下载 source `MySQL CDC` 插件，方法参考 [MySQL CDC | Apache SeaTunnel](https://seatunnel.apache.org/docs/2.3.3/connector-v2/source/MySQL-CDC)
2. 下载 sink MySQL 插件，方法参考[MySQL | Apache SeaTunnel](https://seatunnel.apache.org/docs/2.3.3/connector-v2/sink/Mysql/)
3. 安装mysql，开启binlog，可以使用`SHOW VARIABLES LIKE 'log_bin';`查看是否开启

配置：

1. 创建数据库 seatunnel_demo

2. 建立一个用户表 user 以及一个一模一样的用户表 sync_user

```sql
CREATE TABLE seatunnel_demo.`user` (
    id BIGINT UNSIGNED auto_increment NOT NULL,
    name varchar(100) NULL,
    age INT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE seatunnel_demo.`sync_user` (
    id BIGINT UNSIGNED auto_increment NOT NULL,
    name varchar(100) NULL,
    age INT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
```

3. 新建一个配置文件

```json
env {
  execution.parallelism = 1
  job.mode = "STREAMING"
}
source {
  MySQL-CDC {
    result_table_name = "user_table_raw"
    parallelism = 1
    username = "root"
    password = "12345"
    database-names = ["seatunnel_demo"]
    table-names = ["seatunnel_demo.user"]
    base-url = "jdbc:mysql://localhost:31605/seatunnel_demo"
  }
}
transform {
 Sql {
    source_table_name = "user_table_raw"
    result_table_name = "user_table_transform"
    query = "select id, name , age+1 as age from user_table_raw "
  }
}

sink {
    jdbc {
    	  source_table_name = "user_table_transform"
        url = "jdbc:mysql://localhost:31605/seatunnel_demo"
        driver = "com.mysql.cj.jdbc.Driver"
        max_retries = 0
        user = "root"
        password = "12345"
        generate_sink_sql = true
        database = "seatunnel_demo"
        table = "sync_user"
        primary_keys = ["id"]
    }
}
```

4. 启动

```
./bin/seatunnel.sh --config ./demo -e local
```

这时修改 user 表，会自动更新 sync_user 表

## 配置

### 配置文件格式

配置文件格式为`hocon`，可以参考[HOCON.md](https://github.com/lightbend/config/blob/main/HOCON.md)；同时也支持json格式

#### hocon文件结构

```json
env {
  job.mode = "BATCH"
}

source {
  FakeSource {
    result_table_name = "fake"
    row.num = 100
    schema = {
      fields {
        name = "string"
        age = "int"
        card = "int"
      }
    }
  }
}

transform {
  Filter {
    source_table_name = "fake"
    result_table_name = "fake1"
    fields = [name, card]
  }
}

sink {
  Clickhouse {
    host = "clickhouse:8123"
    database = "default"
    table = "seatunnel_console"
    fields = ["name", "card"]
    username = "default"
    password = ""
    source_table_name = "fake1"
  }
}
```

#### json文件格式

```json

{
  "env": {
    "job.mode": "batch"
  },
  "source": [
    {
      "plugin_name": "FakeSource",
      "result_table_name": "fake",
      "row.num": 100,
      "schema": {
        "fields": {
          "name": "string",
          "age": "int",
          "card": "int"
        }
      }
    }
  ],
  "transform": [
    {
      "plugin_name": "Filter",
      "source_table_name": "fake",
      "result_table_name": "fake1",
      "fields": ["name", "card"]
    }
  ],
  "sink": [
    {
      "plugin_name": "Clickhouse",
      "host": "clickhouse:8123",
      "database": "default",
      "table": "seatunnel_console",
      "fields": ["name", "card"],
      "username": "default",
      "password": "",
      "source_table_name": "fake1"
    }
  ]
}

```

### 配置文件说明

#### env

作业相关的环境配置，例如使用哪个引擎，流处理还是批处理

支持配置的属性如下：

+ job.name

  任务名

+ jars

  用于加载第三方jar包，格式类似如下 `jars="file://local/jar1.jar;file://local/jar2.jar"` 

+ job.mode

  任务执行模式， 例如`job.mode = "BATCH"` 或者 `job.mode = "STREAMING"`

+ checkpoint.interval

  checkpoints 的周期

+ parallelism

  配置 source 和 sink 的并行度

+ shade.identifier

  指定加密方法，如果您没有加密或解密配置文件的要求，则可以忽略此选项。可以参考[Config File Encryption And Decryption | Apache SeaTunnel](https://seatunnel.apache.org/docs/2.3.3/connector-v2/Config-Encryption-Decryption)

  

#### source

source 用于定义 SeaTunnel 需要在哪里获取数据，可以同时定义多个 source，目前支持的 source 可以参考文档[Index of /docs/2.3.3/connector-v2/source (apache.org)](https://seatunnel.apache.org/docs/2.3.3/connector-v2/source/)

每个 source 都有自己的特定参数和通用参数

#### transform

有了 source 后，如果需要对 source 的数据加工处理，就需要 transform 

与 source 一样，transform 具有属于每个模块的特定参数，参考文档 [Index of /docs/2.3.3/transform-v2 (apache.org)](https://seatunnel.apache.org/docs/2.3.3/transform-v2/)

#### sink

sink 用于定义 SeaTunnel 把数据写到哪里，目前支持的 sink 可以参考文档 [Index of /docs/2.3.3/connector-v2/sink (apache.org)](https://seatunnel.apache.org/docs/2.3.3/connector-v2/sink/)

#### Other

当定义了多个 source 和多个 sink 时,每个 sink 会读取哪些数据,每个 transform 会读取哪些数据?我们使用 result_table_name 和 source_table_name 这两个关键配置。每个 source 模块都将使用 result_table_name 来配置，表示数据源生成的数据名称，其他的 transform 和 sink 模块可以使用 source_table_name 引用对应的数据源名称，表示我要读取这些数据进行处理。然后 transform，作为中间处理模块，同时可以使用 result_table_name 和 source_table_name 这两个配置。在上述 Config 示例中,并不是每个模块都配置了这两个参数，因为在 SeaTunnel 中有一个默认约定：如果没有配置这两个参数,那么上一个节点最后一个模块生成的数据将被使用。这在只有一个 source 时会更方便。

## 参考

[Apache SeaTunnel | Apache SeaTunnel](https://seatunnel.apache.org/)

[【大数据】什么是数据集成？（SeaTunnel 集成工具介绍） - 掘金 (juejin.cn)](https://juejin.cn/post/7219304050667307063?searchId=20231104114745C4BBFD32216FC44C397D)
