## 简介

ElasticSearch是一个流行的开源分布式搜索和分析引擎。它可以对PB级的数据进行高性能的实时搜索、过滤和分析。Elasticsearch具有分布式的结构,可以扩展性能。

## 概念

索引：具有相同结构文档的集合，相当于一个表

文档：一条数据，相当于表中一行



### 数据类型

es常用的数据类型如下

| 类型                                      | 描述                 |
| ----------------------------------------- | -------------------- |
| text                                      | 可分词文本，用于搜索 |
| keyword                                   | 精确文本             |
| long、integer、short、byte、double、float | 数值类型             |
| boolean                                   | 布尔                 |
| date                                      | 日期                 |
| object                                    | 对象                 |

es中数组不是类型，es的类型指的是元素的类型，一个字段的值可以是单个元素，也可以是数组，但类型相同

### mapping

es的mapping是对索引文档的约束，约束字段如下：

+ type

  字段数据类型

+ index

  会否创建索引，默认为true

+ analyzer

  所使用的分词器，只对text类型使用

+ properties

  该字段的子字段，类型为对象时使用

### 相关性算分

使用 match 匹配时，返回的文档会返回一个`_score`字段，表示该文档和搜索的相关性

score早期是根据 TF-IDF（词频-逆文档频率）算法和其他相关度算法计算得出的

+ 词频（Term Frequency，TF）：衡量一个词在特定文档中的出现频率。TF 值越高表示该词在文档中越重要。

  ![image-20240114132133629](./assets/image-20240114132133629.png)

+ 逆文档频率（Inverse Document Frequency，IDF）：衡量一个词的普遍重要性。IDF 值越高表示该词在整个索引中越不常见、越具有区分性。

  ![image-20240114132148967](./assets/image-20240114132148967.png)

ES 5.x 后是使用 BM25 算法得到

## 基本使用

下面例子会以 Kibana 控制台搜索为例

### 管理

#### 查看所有索引

查看集群中所有索引的健康、存储信息，v参数可以显示表头

```json
GET /_cat/indices?v
```



### 索引

#### 创建索引

创建一个名为 `my_index` 的索引

```json
PUT /my_index
{
  "mappings": {
    "properties": {
      "name":{
        "type": "keyword",
        "index": true
      },
      "email":{
        "type": "keyword",
        "index": false
      },
      "description":{
        "type": "text",
        "index": true,
        "analyzer": "ik_smart"
      },
      "other":{
        "properties": {
          "age":{
            "type":"short"
          },
          "nickname":{
            "type":"keyword"
          }
        }
      }
    }
  }
}
```

#### 查看索引

查看一个名为 `my_index` 的索引

```json
GET /my_index
```

#### 删除索引

删除一个名为 `my_index` 的索引

```json
DELETE /my_index
```

#### 修改索引

es中已创建索引字段无法修改，但是可以添加新的字段

如下给 my_index 这个索引添加 newName 字段

```json
PUT /my_index/_mapping
{
  "properties":{
    "newName":{
      "type": "keyword"
    }
  }
}
```

### 文档

#### 新增文档

往 my_index 增加或修改一个文档，文档id为1

注：如果不使用文档id，会创建一个随机id作为文档id

```json
POST /my_index/_doc/1
{
  "name": "xiaoso",
  "email": "test@qq.com",
  "description": "hello world",
  "other":{
    "nickname":"cat"
  }
}
```

注意看返回结果

```json
{
  "_index" : "my_index",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 6,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 5,
  "_primary_term" : 1
}
```

`result` 可以是`updated`或者`created`

 `_version` 表示修改的版本

#### 查询文档

```
GET /my_index/_doc/1
```

#### 删除文档

```
DELETE /my_index/_doc/1
```

#### 修改文档

全量修改或者新增文档，这种操作是先删除旧文档，再添加新文档

```json
PUT /my_index/_doc/1
{
  "name": "xiaoso",
  "email": "test@qq.com",
  "description": "hello world",
  "other":{
    "nickname":"cat"
  }
}
```

增量修改，针对特定字段修改

```json
POST /my_index/_update/1
{
  "doc":{
    "email": "test1@qq.com"
  }
}
```

`result` 可以是 `noop`和`updated`

### Query DSL

#### match_all

查询所有数据，一般测试时用

```json
GET /my_index/_search
{
  "query": {
    "match_all": { 
    }
  }
}
```

#### match

全文检索的一种，会对输入内容作分词，然后去倒排索引库匹配

如下对 description 字段作搜索，description 中带有 `hello` 或 `es` 的文档都会被搜索到

```json
GET /my_index/_search
{
  "query": {
    "match": {
      "description": "hello es"
    }
  }
}
```

#### multi_match

多字段全文检索

```json
GET /my_index/_search
{
  "query": {
    "multi_match": {
      "query": "xiaoso",
      "fields": ["description","name"]
    }
  }
}
```

#### term

term属于精确查询，用于keyword、数值、date、boolean等类型字段

```json
GET /my_index/_search
{
  "query": {
    "term": {
      "name": {
        "value": "xiaoso"
      }
    }
  }
}
```



#### range

range属于精确查询，一般用于date、数值类型的范围查询

下面查询 other 子字段 age 在`[10,20]`之间的文档

```json
GET /my_index/_search
{
  "query": {
    "range": {
      "other.age": {
        "gte": 10,
        "lte": 20
      }
    }
  }
}
```

#### function score query

function score query可以修改符合条件的文档的相关性算分

如下，对 `description` 进行搜索，然后对 `_id` 为 1的文档额外加分。

`weight`代表一个算分函数，除了固定值的weight还可以使`field_value_factor`、`random_score`、`script score`等

`boost_mode`表示加权模式，例如`multiply`表示最终score 为 query score和function score相乘

```json
GET /my_index/_search
{
  "query": {
    "function_score": {
      "query": {
        "match": {
          "description": "hello xiaoso"
        }
      },
      "functions": [
        {
          "filter": {
            "term": {
              "_id": "1"
            }
            
          },
          "weight": 10
        }
      ],
      "boost_mode": "multiply"
    }
  }
}
```

#### 复合查询boolean query

布尔查询是一个或多个查询子句的组合。子查询的组合方式有：

+ must：必须匹配每个子查询，类似“与”
+ should：选择性匹配子查询，只是增加文档相关性
+ must_not：必须不匹配，不参与算分，类似“非"
+ filter：必须匹配，不参与算分

注意：must和should不应该同层级使用

```json
GET /my_index/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "name": {
              "value": "xiaoso"
            }
          }
        }
      ],
      "must_not": [
        {
          "term": {
            "_id": {
              "value": 1
            }
          }
        }
      ]
    }
  }
}
```

### 结果处理

#### 排序 sort

手动指定字段排序后就不需要再进行相关性算法

如下 `order.age` 按照降序排序

```json
GET /my_index/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "other.age": {
        "order": "desc"
      }
    }
  ]
}
```

#### 分页

```json
GET /my_index/_search
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 1
}
```

size还受限于索引配置 `index.max_result_window`，默认为 10000，限制了从该索引返回的最大文档数

es的深度分页很消耗性能，尤其是数据存储在多分片时，例如 from 设置为 1000，size设置为100，实际上还是获取了0~1100的数据，然后再截取1000~1100的数据。默认下分页不能超过10000

#### 深度分页

深度分页有两种方式：

+ search after

  推荐，维护一个实时游标，分页时需要进行排序，深度分页时会从上一次排序值开始查询下一页数据。

  缺点是只能向后逐页翻页，不能随机翻页

+ scroll

  不推荐，原理是将排序数据形成快照存到内存中。

  缺点是没法查到准实时数据、内存消耗大

##### search after

首先进行一次查询

```json
GET /my_index/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "other.age": {
        "order": "desc"
      }
    }
  ],
  "size": 2
}
```

返回结果文档会带上`sort` 字段

```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 34,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : "my_index",
        "_type" : "_doc",
        "_id" : "4",
        "_score" : null,
        "_source" : {
          "name" : "xiaoso",
          "email" : "test2@qq.com",
          "description" : "hello xiaoso abc",
          "other" : {
            "nickname" : "cat",
            "age" : 14
          }
        },
        "sort" : [
          14
        ]
      },
      {
        "_index" : "my_index",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : null,
        "_source" : {
          "name" : "xiaoso",
          "email" : "test2@qq.com",
          "description" : "hello xiaoso abc",
          "other" : {
            "nickname" : "cat",
            "age" : 13
          }
        },
        "sort" : [
          13
        ]
      }
    ]
  }
}

```

后续查询从指定sort开始往后查询

```json
GET /my_index/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "other.age": {
        "order": "desc"
      }
    }
  ],
  
  "size": 2,
  "search_after":[13]
  
  
}
```

##### scroll

初始请求带上scroll参数，指示搜索快照保存的时间

```json
GET /my_index/_search?scroll=10m
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "other.age": {
        "order": "desc"
      }
    }
  ],
  
  "size": 2
}
```

返回信息中能够获取到一个`_scroll_id`

```json
{
  "_scroll_id" : "FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFi1FOHVabmNhUWU2T0pGQkdaTktNN1EAAAAAAAAvfxZyQTRPVWtWa1JfbUdJR0J4R3NGVkdR",
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 34,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [
      {
        "_index" : "my_index",
        "_type" : "_doc",
        "_id" : "4",
        "_score" : null,
        "_source" : {
          "name" : "xiaoso",
          "email" : "test2@qq.com",
          "description" : "hello xiaoso abc",
          "other" : {
            "nickname" : "cat",
            "age" : 14
          }
        },
        "sort" : [
          14
        ]
      },
      {
        "_index" : "my_index",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : null,
        "_source" : {
          "name" : "xiaoso",
          "email" : "test2@qq.com",
          "description" : "hello xiaoso abc",
          "other" : {
            "nickname" : "cat",
            "age" : 13
          }
        },
        "sort" : [
          13
        ]
      }
    ]
  }
}

```

后续查询带上scroll_id，不断更新scroll_id直到把数据查询完毕

```json
GET /_search/scroll
{
  "scroll": "10m",
  "scroll_id":"FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFi1FOHVabmNhUWU2T0pGQkdaTktNN1EAAAAAAAAvfxZyQTRPVWtWa1JfbUdJR0J4R3NGVkdR"
}

```



## 参考

https://www.bilibili.com/video/BV1Gh411j7d6