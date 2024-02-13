## 简介

ProtoBuf 是一种轻便高效的二进制序列化数据结构的方法，比 XML 和 JSON 等传统文本数据序列化方案更加轻量，且利于多语言互操作。

## 快速开始

下面演示了如何 Java 和 Python 如何通过 protobuf 文件交互数据

1. 下载 protobuf 二进制文件 [Github](https://github.com/protocolbuffers/protobuf/releases)
2. 加入到环境变量中
3. 编写 search.proto 文件

```protobuf
// 使用 proto3 语法
syntax = "proto3";
package search;
option java_multiple_files = true;
option java_package = "com.github.xiaoso456.search";
message SearchRequest {
  string query = 1; // 查询内容
  PageInfo page = 2;
}

message PageInfo{
  int32 page_number = 1; // 总页数
  int32 page_size = 2;  // 页大小
}
```

4. 使用 `protoc --java_out . .\search.proto` 编译到 Java 类
4. 使用 `protoc --python_out . .\search.proto` 编译到 python 模块
4. 新建一个 maven 工程，引入如下依赖，添加示例代码如下

```xml

<dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
    <version>3.22.0</version>
</dependency>

        <!-- 只是为了写出文件方便，非必要 -->
<dependency>
<groupId>cn.hutool</groupId>
<artifactId>hutool-all</artifactId>
<version>5.8.15</version>
</dependency>
```

```java
// 构造实体类
PageInfo pageInfo = PageInfo.newBuilder()
    .setPageSize(2)
    .setPageNumber(10)
    .build();
SearchRequest searchRequest = SearchRequest.newBuilder()
    .setQuery("hello")
    .setPage(pageInfo)
    .build();
// 序列化到文件 searchRequestFile
FileUtil.writeBytes(searchRequest.toByteArray(),"searchRequestFile");
// 反序列化并打印
byte[] searchRequestBytes = FileUtil.readBytes("searchRequestFile");
SearchRequest file = SearchRequest.parseFrom(searchRequestBytes);
System.out.println(file.toString());
```

```
query: "hello"
page {
  page_number: 10
  page_size: 2
}
```

7. 新建 python 文件，反序列化 searchRequestFile 文件，并输出

```python
import search_pb2
filepath = './searchRequestFile'
with open(filepath,'rb') as f:
    data = f.read()
    search_empty = search_pb2.SearchRequest()
    search_empty.ParseFromString(data)
    print(search_empty)

```

```
query: "hello"
page {
  page_number: 10
  page_size: 2
}
```

## 语法

### 定义包

```java
package xxx
```

### 定义消息类型

一个消息使用 `message` 标记，如下定义了一个名为 SearchRequest 的消息，包含三个字段

```protobuf
// 标记 SearchRequest 消息
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

### 消息字段

#### 字段类型

消息每个字段需要标记类型，类型和各个语言类型映射如下（`C#` 和 `PHP` 请参考官网）

| .proto Type | Notes                                           | C++ Type | Java/Kotlin Type[1] | Python Type[3]                  | Go Type | Ruby Type                      |
|-------------|-------------------------------------------------|----------|---------------------|---------------------------------|---------|--------------------------------|
| double      |                                                 | double   | double              | float                           | float64 | Float                          |
| float       |                                                 | float    | float               | float                           | float32 | Float                          |
| int32       | 使用可变长度编码。编码负数效率低下 - 如果您的字段可能具有负值，请改用 sint32     | int32    | int                 | int                             | int32   | Fixnum or Bignum (as required) |
| int64       | 使用可变长度编码。编码负数效率低下 - 如果您的字段可能具有负值，请改用 sint64     | int64    | long                | int/long[4]                     | int64   | Bignum                         |
| uint32      | 使用可变长度编码                                        | uint32   | int[2]              | int/long[4]                     | uint32  | Fixnum or Bignum (as required) |
| uint64      | 使用可变长度编码                                        | uint64   | long[2]             | int/long[4]                     | uint64  | Bignum                         |
| sint32      | 使用可变长度编码。带符号的整数值。与常规 int32 相比，它们对负数的编码效率更高。     | int32    | int                 | int                             | int32   | Fixnum or Bignum (as required) |
| sint64      | 使用可变长度编码。带符号的整数值。与常规 int64 相比，它们对负数的编码效率更高。     | int64    | long                | int/long[4]                     | int64   | Bignum                         |
| fixed32     | 总是四个字节。如果值经常大于 2^28，则效率比 uint32 更高。             | uint32   | int[2]              | int/long[4]                     | uint32  | Fixnum or Bignum (as required) |
| fixed64     | 总是八个字节。如果值经常大于 2^56，则效率比 uint64 更高。             | uint64   | long[2]             | int/long[4]                     | uint64  | Bignum                         |
| sfixed32    | 总为 4 字节                                         | int32    | int                 | int                             | int32   | Fixnum or Bignum (as required) |
| sfixed64    | 总为 8 字节                                         | int64    | long                | int/long[4]                     | int64   | Bignum                         |
| bool        |                                                 | bool     | boolean             | bool                            | bool    | TrueClass/FalseClass           |
| string      | 字符串必须始终包含 UTF-8 编码或 7 位 ASCII 文本，并且长度不能超过 2^32。 | string   | String              | str/unicode[5]                  | string  | String (UTF-8)                 |
| bytes       | 可以包含不超过 2^32 的任意字节序列                            | string   | ByteString          | str (Python 2) bytes (Python 3) | []byte  | String (ASCII-8BIT)            |

#### 字段编号

每一个字段需要有不同的编号，用于标记字段。

编号从 1 开始，最大为 2^29

编号 1~15 会被编码为 1 个字节，16~2047 会被编码为 2 个字节，常用字段应该优先使用 1~15 编号。

如下 `query` 字段的编号是 1

```protobuf
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

#### 字段规则

消息字段有四种类型：

+ singular：默认类型，表示有 0 个或 1 个元素，如果设置了值，会把值序列化，如果设置了默认值，不会序列化默认值。
+ optional：可选的，表示有 0 个或 1 个元素。如果设置了值，会把值序列化，如果设置了默认值，不会序列化默认值。（没懂和 singular
  有啥区别）
+ repeated：表示有 0 个或多个有序元素，类似 list
+ map：类似 map，详情参考 [Map](https://protobuf.dev/programming-guides/encoding/#maps)

#### 保留字段

如果通过删除字段更新消息，之后又使用这些被删除字段的编号，容易导致各种文本，因此可以使用 reserved 关键字保留这些编号，不能够使用

```protobuf
message Foo {
  reserved 2, 15, 9 to 11; // 保留字段编号为 2,15,9~11 的
  reserved "foo", "bar"; // 保留字段名称为 foo 和 bar 的
}
```

#### 默认值

如果显示指定的值为默认值，则不会被序列化。也就是说，对于标量字段，无法知道他们是被显式指定了默认值还是没有设置值

| 类型        | 默认值         |     |
|-----------|-------------|-----|
| String    | 空字符串        |     |
| byte      | 空 byte      |     |
| bool      | false       |     |
| int32 等数值 | 0           |     |
| enum      | 第一个枚举值，且为 0 |     |
| message   | 取决于语言       |     |

也可以自己定义字段的默认值，以下是简单的示例

```protobuf
message Person {
  string name = 1 [default = "John Doe"];
  int32 age = 2 [default = 18];
}
```

### 定义枚举

枚举类型第一个编号必须为 0

如下，定义了枚举字段 Corpus，并在 message 中使用

```protobuf
enum Corpus {
  CORPUS_UNSPECIFIED = 0;
  CORPUS_UNIVERSAL = 1;
  CORPUS_WEB = 2;
  CORPUS_IMAGES = 3;
  CORPUS_LOCAL = 4;
  CORPUS_NEWS = 5;
  CORPUS_PRODUCTS = 6;
  CORPUS_VIDEO = 7;
}

message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
  Corpus corpus = 4;
}
```

可以给枚举定义相同的值，起到别名的作用。使用别名需要添加 `option allow_alias = true`，否则 protobuf 会弹出警告

```java
enum EnumAllowingAlias {
  option allow_alias = true;
  EAA_UNSPECIFIED = 0;
  EAA_STARTED = 1;
  EAA_RUNNING = 1;
  EAA_FINISHED = 2;
}
```

::: warning

反序列化枚举类依赖语言实现，包含的信息可能放到 message 中或丢失

:::

### import message

可以使用 import 导入其他文件定义的 `message`

```protobuf
import "myproject/other_protos.proto";
```

使用 import public ，可以导入依赖的依赖，如下定义后，a 才可以使用 c 中定义的消息

```protobuf
// a.proto
import "b.proto"

// b.proto
import public "c.proto"

// c.proto
```

### 消息嵌套

可以在消息中定义消息

```protobuf
message SearchResponse {
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
  }
  repeated Result results = 1;
}
```

在消息中定义的消息，可以通过父消息引用

```protobuf
message SomeOtherMessage {
  SearchResponse.Result result = 1;
}
```

## 选项

选项在 proto 文件头部进行声明，常用于改变上下文处理文件的方式，下面列出 Java 一些常用选项

```protobuf
// 生成的 java 包名
option java_package = "com.example.foo";
// 生成的外部 Java 类名
option java_outer_classname = "Ponycopter";
// 如果为 true, 一个 message 一个文件
option java_multiple_files = true;
```

## 更新 message 原则

[更新 message 原则](https://protobuf.dev/programming-guides/proto3/)

## 参考

[Language Guide (proto 3) | Protocol Buffers Documentation ](https://protobuf.dev/programming-guides/proto3/)
