## 简介

MongoDB是一个基于文档的无模式NoSQL数据库管理系统，可以储存半结构化的数据类型。它采用BSON（二进制形式的JSON）进行数据存储，支持复制和分片，可以实现高可用性、横向扩展等特性，适合处理大量数据和高并发读写操作。

## 概念

### 和 SQL数据库的差异

|          | SQL 数据库           | **MongoDB**                               |
| -------- | -------------------- | ----------------------------------------- |
| 组成     | 数据库、表、行、列   | 数据库、集合、文档                        |
| 主键     | 必须有主键           | 主键自动创建                              |
| 结构     | 结构化数据           | 非结构化/半结构化数据                     |
| 数据模式 | 按预定义模板存储数据 | 基于 NoSQL 存储的灵活性，没有预定义的模板 |
| 查询     | 使用 SQL 进行查询    | 使用 MongoDB 查询语言（MQL）              |
| 内联操作 | 不支持               | 支持                                      |
| 事务     | 支持事务             | 不完全支持事务                            |



以下是SQL和MongoDB数据库之间表格、行、列差异的对比：

| 特征   | SQL数据库                                              | MongoDB                  |
| ------ | ------------------------------------------------------ | ------------------------ |
| 数据库 | 由多个数据表组成                                       | 由多个集合组成           |
| 表格   | 由多个行与列组成                                       | 由多个文档组成           |
| 行     | 一条记录                                               | 一个文档                 |
| 列     | 由不同的数据类型组成，例如整型、浮点型、字符串、日期等 | 由一组键-值对的形式组成  |
| 关系   | 存在于表格行中                                         | 没有关系的概念           |
| 主键   | 唯一标识符，用于区分行                                 | 唯一标识符，用于区分文档 |

总体来讲，基于SQL的数据库更适合与事务处理有关的应用程序并且**支持复杂查询**。然而，在处理大量数据时，NoSQL数据库（如MongoDB）可以提供更好的性能。此外，MongoDB还提供了更灵活的数据建模方式。



MongoDB不支持连表查询，但可以通过内嵌文档的方式实现类似效果

### 数据类型

| 数据类型    | 描述                     | 示例                                                     |
| ----------- | ------------------------ | -------------------------------------------------------- |
| double      | 双精度浮点数             | { "score" : 9.5 }                                        |
| string      | 字符串                   | { "name" : "John" }                                      |
| object      | 对象（即嵌入文档）       | { "address" : {"street" : "123 Main St."} }              |
| array       | 数组                     | { "scores" : [ 85, 90, 82 ] }                            |
| binary data | 二进制数据               | { "image" : BinData( 0, "jVjTDF==") }                    |
| undefined   | 已弃用（不使用）         | { "value" : undefined }                                  |
| ObjectId    | 文档的唯一ID             | { "_id" : ObjectId("507f191e810c19729de860ea") }         |
| boolean     | 布尔值                   | { "isAvailable": true }                                  |
| date        | 日期时间                 | { "createdAt": new Date() }                              |
| null        | 空值                     | { "description":null }                                   |
| regex       | 正则表达式               | { "pattern": /regex/}                                    |
| JavaScript  | 可执行的 JavaScript 代码 | { "code": function() { console.log("Hello, world!"); } } |
| symbol      | 符号类型 （不推荐使用）  | { "value": Symbol("foo") }                               |
| int         | 32 位有符号整数          | { "score": 42 }                                          |
| timestamp   | 时间戳                   | { "lastModified": Timestamp(1567603032, 1) }             |
| long        | 64 位有符号整数          | { "value": NumberLong(9223372036854775807) }             |
| decimal128  | 128 位无符号十进制数     | { "price": NumberDecimal("19.99") }                      |

## 快速开始

### 下载

去官网下载社区版：[Download MongoDB Community Server | MongoDB](https://www.mongodb.com/try/download/community)

### 启动

**以命令行方式启动**

1. 新建和`bin`文件夹同级文件夹`data`
2. 在 `data` 文件夹下新建 `db`文件夹
3. 在 `bin`文件夹下输入

```
mongod --dbpath=..\data\db --port=27017
```



**以配置文件启动**

1. 新建 `config` 文件夹
2. 新建 `mongod.conf`

```yaml
systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true # 启动数据库 journal 功能，确保数据持久化和一致性
net:
  port: 27017
  bindIp: 127.0.0.1
```

3. 在 `bin` 文件夹下以配置文件方式启动

```
mongod --config ../config/mongod.conf
```

### 连接

连接数据库可以使用图形化界面或者使用命令行Shell

**使用命令行**

1. 在 mongoDB6 以后，命令行工具需要单独下载：[MongoDB Shell Download | MongoDB](https://www.mongodb.com/try/download/shell)

2. 下载后在 `mongosh/bin` 目录执行

```
mongosh --host=127.0.0.1 --port=27017
```

 

**图形化工具**

可以试试官方的 [Compass](https://www.mongodb.com/try/download/compass)

## 基本操作

### 数据库

MongoDB数据库名称采用UTF-8编码，长度最长为64个字符，不能包含空格、点号（.）和$符，并且区分大小写。以下是一些保留的数据库名：

- admin：管理权限数据库
- local：本地存储数据库
- config：MongoDB集群中的数据配置信息库

这些数据库是系统级别的保留数据库，不能直接删除和操作它们中的数据集合。

#### 操作

查看所有数据库

```
show dbs
```



选择数据库（不存在自动创建到内存）

```
use <db>
```



查看正在使用的数据库

```
db
```



删除当前数据库

```
db.dropDatabase()
```

### 集合

集合类似于关系型数据库中的表。集合存储了多个文档（document），每个文档可以有不同的结构和字段。

#### 操作

创建一个集合

```
db.createCollection("mine")
```



查询所有集合

```
show collections
```



删除集合

```
db.<集合名>.drop()
```

### 文档

MongoDB中文档是一个键值对的集合，用来表示数据。其中的值可以是各种类型的数据，包括嵌套的文档和数组，具有非常高的灵活性。

文档数据结构和 JSON 基本一样。

#### 插入

单个文档插入，使用 insert 或 save，如果集合不存在会自动隐式创建

```
db.<集合名>.insert( { "messageId": 1,"content": "你好",created: new Date() } );
```



多个文档插入，用 insertMany

```
db.<集合名>.insertMany([
	{ "messageId": 2,"content": "你好2",created: new Date() },
	{ "messageId": 3,"content": "你好3",created: new Date() } 
]);

```



#### 查询

##### 简单查询

查询集合所有文档

```
db.<集合名>.find()
```



只查一条

```
db.<集合名>.findOne()
```



条件查询

```
db.<集合名>.find({字段:值})
db.message.find({"messageId": 1})
```



投影查询

投影字段在第二个参数，值如果 true 或非0，那么表示该字段显示。如果为 false或0表示不显示

```
db.<集合名>.find({},{"messageId":true})
```



数量查询

```
db.<集合名>.count(query)
```



分页查询

跳过3条，查询2条

```
db.<集合名>.find().skip(3).limit(2)
```



查询结果排序

1表示升序，-1表示降序

```
db.<集合名>.find().sort({messageId:1})
```

##### 复杂查询

正则查询

正则表达式是js的正则语法

```
db.<集合名>.find({字段:/正则表达式/})
```



比较查询

```
db.<集合名>.find({字段:{$比较符号: 字段值} })
```

比较符号详见 语法->比较符号 一章，常见的有 `$eq`



包含查询

```
db.<集合名>.find({字段:{$in: [值1,值2]} })
```



条件连接查询

如下是 `$and` 连接，还支持 `$or`等其他操作

```
db.<集合名>.find({
	$and:[
	{条件1},
	{条件2},
	]
}
)
```



#### 更新

更新语法如下

```
db.<集合名>.update(query,update,options)
```



覆盖的修改

也就是替换原文档，如下命令，只会剩下 `content` 字段，其余字段被删除

```
db.<集合名>.update({_id:"1"},{}"content":"hello1"})
```



局部修改，默认只会修改一条数据

```
db.<集合名>.update({"messageId":"1"},{$set:{"content":"hello1"}})
```

如果需要修改多条符合的数据

```
db.<集合名>.update({"messageId":"1"},{$set:{"content":"hello1"}},{multi:true})
```



局部修改，增加指定字段数值

```
db.<集合名>.update({"messageId":"1"},{$inc:{"messageId":NumberInt(1)}})
```

#### 删除

删除语法如下

```
db.<集合名>.remove(query)
```



删除全部

```
db.<集合名>.remove({})
```



## 语法

### 比较符号

常用的有如下几种

| 符号           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| $eq            | 匹配等于某个值的文档                                         |
| $ne            | 匹配不等于某个值的文档                                       |
| $gt            | 匹配大于某个值的文档                                         |
| $gte           | 匹配大于等于某个值的文档                                     |
| $lt            | 匹配小于某个值的文档                                         |
| $lte           | 匹配小于等于某个值的文档                                     |
| $in            | 匹配数组中包含某个值的文档                                   |
| $nin           | 匹配数组中不包含某个值的文档                                 |
| $exists        | 匹配存在某个字段的文档                                       |
| $type          | 匹配字段类型符合某个类型的文档                               |
| $regex         | 匹配正则表达式符合某个模式的文档                             |
| $text          | 用于文本搜索                                                 |
| $where         | 用于自定义过滤条件                                           |
| $elemMatch     | 用于匹配数组中至少一个元素符合指定条件的文档                 |
| $size          | 匹配数组大小等于某个值的文档                                 |
| $all           | 匹配数组中包含所有指定值的文档                               |
| $mod           | 匹配字段值模除某个值的余数等于指定值的文档                   |
| $near          | 用于地理空间查询，匹配指定坐标附近的文档                     |
| $geoIntersects | 用于地理空间查询，匹配与指定区域相交的文档                   |
| $geoWithin     | 用于地理空间查询，匹配被指定区域包含的文档                   |
| $box           | 用于地理空间查询，匹配在指定矩形框内的文档                   |
| $center        | 用于地理空间查询，匹配在指定圆形范围内的文档                 |
| $centerSphere  | 用于地理空间查询，匹配在指定球体范围内的文档                 |
| $nearSphere    | 用于地理空间查询，匹配在指定球体范围内的文档，计算时会考虑地球曲率 |

### 异常捕获

mongodb是部分支持事务，一次插入多条即使出现部分错误，也不会回滚，异常捕获可以了解其中哪里出错

```
try{
	// mongodb操作
}catch(e){
	print(e);
}
```

## 索引

MongoDB索引是B+树（网上有一些分析说是B树其实是错误的）

### 索引分类

| 索引类型     | 描述                                                         | 适用场景                               |
| ------------ | ------------------------------------------------------------ | -------------------------------------- |
| 单键索引     | 基于集合中的单个字段建立，用于支持对该字段的等值查询、范围查询和排序 | 查询单个字段的值或对该字段进行排序     |
| 复合索引     | 由多个字段组成，用于支持多个字段的查询和排序                 | 处理需要多个字段组合的查询和排序       |
| 唯一索引     | 要求索引的值必须唯一，用于保证数据完整性                     | 保证某个字段的值唯一性                 |
| TTL索引      | 用于自动过期数据，可以设置一个时间戳来表示数据的过期时间     | 处理需要自动删除过期数据的场景         |
| 地理空间索引 | 用于支持地理空间查询，例如在地图上查找特定区域内的位置信息   | 处理需要根据地理位置信息进行查询的场景 |
| 文本索引     | 用于支持全文搜索，例如在文本字段中查找特定的关键字           | 处理需要对文本内容进行全文搜索的场景   |

### 索引管理

查询集合所有索引

```
db.<集合名>.getIndexes()
```



创建索引

```
db.<集合名>.createIndex(keys,options)
```

| 参数      | 类型     | 说明 |
| --------- | -------- | ---- |
| `keys`    | document | 文档 |
| `options` | document | 选项 |

```
db.myCollection.createIndex({ field1: 1, field2: -1 }, { unique: true })
表示字段1升序，字段2降序索引，索引值唯一
```

| 选项                    | 数据类型 | 描述                                                        |
| ----------------------- | -------- | ----------------------------------------------------------- |
| background              | Boolean  | 表示创建索引的过程在后台运行，不会阻塞其他操作。            |
| unique                  | Boolean  | 表示索引的值必须唯一。                                      |
| sparse                  | Boolean  | 表示索引不包含空值（null）或缺失的字段。                    |
| expireAfterSeconds      | Number   | 用于设置TTL索引的过期时间（单位为秒）。                     |
| name                    | String   | 用于指定索引的名称。如果不指定，MongoDB会自动生成一个名称。 |
| collation               | Object   | 用于指定索引的排序规则。                                    |
| partialFilterExpression | Object   | 用于创建部分索引，即仅在满足指定条件的文档上创建索引。      |
| storageEngine           | Object   | 用于指定索引的存储引擎。                                    |
| weights                 | Object   | 用于创建文本索引时指定字段的权重。                          |





移除索引

```
db.<集合名>.dropIndex(index)
```

| 参数    | 类型               | 说明                       |
| ------- | ------------------ | -------------------------- |
| `index` | String 或 document | 指定要删除的索引名或文档， |

```
db.message.dropIndex({"messageId":1})
```

## 聚合 aggregate

| 操作符         | 说明                       |
| -------------- | -------------------------- |
| `$match`       | 过滤符合条件的文档         |
| `$limit`       | 限制聚合结果的数量         |
| `$skip`        | 跳过指定数量的文档         |
| `$sort`        | 对聚合结果进行排序         |
| `$group`       | 对文档进行分组汇总         |
| `$count`       | 统计文档数量               |
| `$project`     | 筛选集合中的字段           |
| `$unwind`      | 展开数组，拆分为多个文档   |
| `$lookup`      | 从另一个集合中查找关联文档 |
| `$graphLookup` | 对文档进行递归查找         |
| `$bucket`      | 对数据进行桶分类           |
| `$bucketAuto`  | 自动分桶                   |
| `$geoNear`     | 查找接近指定位置的文档     |
| `$addFields`   | 添加新字段                 |
| `$replaceRoot` | 用文档中的字段替换根字段   |
| `$sample`      | 随机取一部分文档           |

## 参考

https://www.bilibili.com/video/BV1bJ411x7mq

[mongoDB中聚合(aggregate)的具体使用](https://blog.csdn.net/ycclydy/article/details/120861374)