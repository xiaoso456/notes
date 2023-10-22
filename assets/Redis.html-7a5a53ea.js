import{_ as d,r,o as t,c as p,d as a,a as e,b as s,e as n}from"./app-9157d7b3.js";const o={},h=n(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>Redis是一个非关系型内存数据库，读写非常快，广泛应用于缓存方向。也常做分布式锁</p><h2 id="概念和模型" tabindex="-1"><a class="header-anchor" href="#概念和模型" aria-hidden="true">#</a> 概念和模型</h2><h3 id="有序集合zset" tabindex="-1"><a class="header-anchor" href="#有序集合zset" aria-hidden="true">#</a> 有序集合ZSet</h3><p>底层实现是跳跃表</p><p>是有序集合的底层实现之一。</p><p>跳跃表是基于多指针有序链表实现的，可以看成多个有序链表。</p><p>在查找时，从上层指针开始查找，找到对应的区间之后再到下一层去查找。</p><p>与红黑树等平衡树相比，跳跃表具有以下优点：</p><ul><li>插入速度非常快速，因为不需要进行旋转等操作来维护平衡性；</li><li>更容易实现；</li><li>支持无锁操作。</li></ul><p>层数应该是logN</p><p>跳跃表采用空间换时间的方法，用非严格二分方式构建多级索引</p><p>比起红黑树更加直观，更容易实现并发操作</p><h2 id="数据类型和适用场景" tabindex="-1"><a class="header-anchor" href="#数据类型和适用场景" aria-hidden="true">#</a> 数据类型和适用场景</h2><p>String：可以是数字，常做粉丝数</p><p>Hash：存储对象信息</p><p>List：实现为一个双向链表，可以做关注列表、消息列表。</p><p>Set：共同关注、共同粉丝。</p><p>Sorted Set：排行榜</p><h2 id="常用介绍" tabindex="-1"><a class="header-anchor" href="#常用介绍" aria-hidden="true">#</a> 常用介绍</h2><h3 id="持久化策略" tabindex="-1"><a class="header-anchor" href="#持久化策略" aria-hidden="true">#</a> 持久化策略</h3><p>持久化策略有RDB（Redis DataBase）和AOF（Append Only File）：</p><h4 id="rdb" tabindex="-1"><a class="header-anchor" href="#rdb" aria-hidden="true">#</a> RDB</h4><p>在指定时间间隔内将内存中的数据库快照存储在本地磁盘文件中。</p><p>适用于有数据大小限制、方便备份的场景。</p><p>实现较简单,但无法实时持久化,数据可能丢失。</p><h4 id="aof" tabindex="-1"><a class="header-anchor" href="#aof" aria-hidden="true">#</a> AOF</h4><p>每个写操作都记录到AOF文件中。</p><p>重启时重新执行日志中的写操作恢复数据。</p><p>可以实现实时持久化,但性能会稍差,文件体积较大。</p><p>AOF重写：将旧AOF文件重写为一个新的AOF文件，大小更新，AOF重写是通过读取数据库键值对来实现。</p><h4 id="混合持久化" tabindex="-1"><a class="header-anchor" href="#混合持久化" aria-hidden="true">#</a> 混合持久化</h4><p>redis4.0后支持混合持久化。可以快速加载同时避免丢失过多数据。</p><h4 id="持久化使用" tabindex="-1"><a class="header-anchor" href="#持久化使用" aria-hidden="true">#</a> 持久化使用</h4><p>master关闭持久化，因为影响性能</p><p>slave开启RDB即可，必要时AOF和RDB都开启。因为单AOF恢复过慢</p><p>以上适用于绝大部分对一致性要求不高的场景</p><h3 id="数据淘汰策略" tabindex="-1"><a class="header-anchor" href="#数据淘汰策略" aria-hidden="true">#</a> 数据淘汰策略</h3><p>redis 提供 6种数据淘汰策略：</p><ol><li>volatile-lru：从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使⽤的数 据淘汰</li><li>volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘 汰</li><li>volatile-random：从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰</li><li>allkeys-lru：当内存不⾜以容纳新写⼊数据时，在键空间中，移除最近最少使⽤的key（这个是 最常⽤的）</li><li>allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰</li><li>no-eviction：禁⽌驱逐数据，也就是说当内存不⾜以容纳新写⼊数据时，新写⼊操作会报错。 这个应该没⼈使⽤吧！</li></ol><p>4.0版本后增加以下两种：</p><ol start="7"><li>volatile-lfu：从已设置过期时间的数据集(server.db[i].expires)中挑选最不经常使⽤【频率】的数据 淘汰</li><li>allkeys-lfu：当内存不⾜以容纳新写⼊数据时，在键空间中，移除最不经常使⽤的key</li></ol><h3 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h3><p>Redis 事务只保证命令执行的顺序性，不保证执行成功与否，简单理解就是执行多个打包在一起的命令</p><h3 id="缓存雪崩和缓存击穿" tabindex="-1"><a class="header-anchor" href="#缓存雪崩和缓存击穿" aria-hidden="true">#</a> 缓存雪崩和缓存击穿</h3><p>雪崩：缓存同一时间大面积失效，大量请求落到数据库上，数据库崩溃</p><p>解决：</p><ol><li>保持redis集群高可用，选择合适内存淘汰策略。</li><li>限流降级本地缓存，避免mysql崩溃</li><li>利用redis持久化机制尽快恢复缓存</li></ol><p>击穿：查询 redis 没有，查数据库，数据库很有可能也查不到</p><p>解决：</p><ol><li><p>布隆过滤器</p><p>把所有可能存在的请求的值都存放在布隆过滤器中，当⽤户请求过来，我会先判断⽤户发来的请求的值是否存在于布隆过滤器中。不存在的话，直接返回请求参数错误信息给客户端</p></li><li><p>缓存空对象/无效key</p></li></ol><h3 id="redis和数据库的同步策略" tabindex="-1"><a class="header-anchor" href="#redis和数据库的同步策略" aria-hidden="true">#</a> Redis和数据库的同步策略</h3><ul><li>方案1：通过MySQL自动同步刷新Redis，MySQL触发器+UDF函数（自定义函数）实现（UDF函数可以把数据写入Redis中，从而达到同步的效果）</li><li>方案2：解析MySQL的binlog实现，将数据库中的数据同步到Redis</li></ul><h3 id="集群" tabindex="-1"><a class="header-anchor" href="#集群" aria-hidden="true">#</a> 集群</h3><p>Redis 集群部署有以下几种方式：</p><ul><li>主从</li><li>哨兵（2.6+）</li><li>集群（3.0+）</li></ul><p>Redis 的复制方式为异步复制</p><h4 id="主从复制" tabindex="-1"><a class="header-anchor" href="#主从复制" aria-hidden="true">#</a> 主从复制</h4><p>主从部署一般是一主多从，每个节点都有完整数据，用户可以通过执行SLAVEOF命令或者SLAVEOF选项，让从服务器去复制主服务器，从数据库只提供读，不提供写。从库配置里找到这行修改即可</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code># replicaof &lt;masterip&gt; &lt;masterport&gt;
replicaof redis-master-service 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="哨兵sentinel" tabindex="-1"><a class="header-anchor" href="#哨兵sentinel" aria-hidden="true">#</a> 哨兵Sentinel</h4><p>哨兵是主从复制模式的扩展，用于监控Redis数据库的运行状态，主要功能如下：</p><ol><li>监控。监控所有节点数据库是否正常运行</li><li>自动故障转移。主数据库故障时，通过自动投票将从数据库选举出主数据库</li></ol><p>sentinel是独立的监控程序，不提供数据服务，通常哨兵个数为单数，防止选举主库时选票相同</p><p>启动哨兵</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>redis-sentinel sentinel.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>哨兵模式主要解决单点故障问题</p><h4 id="集群-redis-cluster" tabindex="-1"><a class="header-anchor" href="#集群-redis-cluster" aria-hidden="true">#</a> 集群 Redis-Cluster</h4><p>要求：至少6个节点保证高可用（3主3从）</p><p>集群方式采用无中心架构，每个节点都和其他所有节点连接，集群模式是多主多备，备用节点只是提供冷备功能，读写都会落到主节点上</p>`,70),c=n(`<p>集群模块提供功能：</p><ol><li>数据分片。使用HashSlot（默认16384个，分配个多个node）将数据分片分散存储在各个节点上（但依赖客户端，实现更加复杂）</li></ol><p>缺点：</p><ol><li>单个节点故障后，需要一定时间重新选主和同步数据,会导致部分请求错误</li><li>集群划分数据时使用哈希槽,不支持任意键范围的查询命令</li><li>读操作需要通过代理发布到整个集群,性能较单机Redis稍差</li><li>集群之间的数据一致性无法保障,不适用于需要强一致性的场景</li><li>分布式锁和计数功能需要依靠集群内复杂通信协作，性能较单机方式下降</li></ol><p>TIP：为什么Slot数量是16k？心跳包固定为2kByte，也就是16k位，表示slot的占用情况，一般而言，Redis集群不会超过这个数量</p><p>redis.conf 配置</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>appendonly yes
cluster-enabled yes
cluster-config-file/var/lib/redis/nodes.conf
cluster-node-timeout 5000
dir/var/lib/redis
port 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后创建集群</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>redis-cli <span class="token parameter variable">--cluster</span> create <span class="token number">127.0</span>.0.1:7000 <span class="token number">127.0</span>.0.1:7001 <span class="token punctuation">\\</span>
<span class="token number">127.0</span>.0.1:7002 <span class="token number">127.0</span>.0.1:7003 <span class="token number">127.0</span>.0.1:7004 <span class="token number">127.0</span>.0.1:7005 <span class="token punctuation">\\</span>
--cluster-replicas <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Tips:k8s环境下创建集群可以是一个sh脚本的job，查所有的pod获取pod ip，然后创建集群</p><h2 id="数据设计" tabindex="-1"><a class="header-anchor" href="#数据设计" aria-hidden="true">#</a> 数据设计</h2><h3 id="缓存key设计" tabindex="-1"><a class="header-anchor" href="#缓存key设计" aria-hidden="true">#</a> 缓存key设计</h3><p>redis 是 kv 数据库，没有xx库，xx表之类诸多的概念，如果所有业务系统可以共享一个空间，需要避免 key 重复</p><p>一种方法 key 命名方法是 ： <code>业务名:表名:keyName</code></p><p>这么做的一个好处是可以使用通配符删除某个业务，某个表所有key</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,16),u={href:"https://juejin.cn/post/7202272345833914428?searchId=202310052032385BDE2CAE88106AF380A4",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.bilibili.com/video/BV1F44y1C7N8/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://redis.io/docs/management/scaling/#create-a-redis-cluster",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.bilibili.com/video/BV1F8411o7n6/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://juejin.cn/post/7271597656118394899",target:"_blank",rel:"noopener noreferrer"};function x(k,_){const l=r("Mermaid"),i=r("ExternalLinkIcon");return t(),p("div",null,[h,a(l,{id:"mermaid-316",code:"eJxtkEsOgjAURees4m2ASL/RxDBybIw6IwwkNEpCwBRMdMLUjbgIE7ej+5DSCqU46efc9vS9HuXhfIL9yqsuiV6vy1SgqBuhyssagoZRHsQegBRpVqFoqyZAy0SG7+erD7AJsAo+j3vsiSIde7Htba2oQcEC415BjIK4bmoC+nMDTO3EtisxaRAnc9JbmLEwV89NwEele7pf8P3QdKgJGQjVhA2Em2sbWV5vRqus3X62E0WdFSKPp/LugKb4L7WetSh1aPsxbknWae7SLx4/q9o="}),c,e("p",null,[e("a",u,[s("k8s部署redis集群(一) - 掘金 (juejin.cn)"),a(i)])]),e("p",null,[e("a",b,[s("【IT老齐028】大厂必备技能，白话Redis Cluster集群模式_哔哩哔哩_bilibili"),a(i)])]),e("p",null,[e("a",v,[s("使用 Redis 集群进行扩展"),a(i)])]),e("p",null,[e("a",m,[s("K8S部署Redis集群-v7.0.12（5）_哔哩哔哩_bilibili"),a(i)])]),e("p",null,[e("a",f,[s("记一种不错的缓存设计思路 - 掘金 (juejin.cn)"),a(i)])])])}const y=d(o,[["render",x],["__file","Redis.html.vue"]]);export{y as default};
