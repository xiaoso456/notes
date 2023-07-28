## 简介
nacos1.4.6 源码

## 源码启动
下载 nacos 1.4.6 源码
```shell
git clone -b 1.4.6 https://github.com/alibaba/nacos.git
```
源码启动入口为 `nacos-console` 模块，入口类为 `com.alibaba.nacos.Nacos.java`

源码启动前，需要先编译 `consistency` 模块，把 `.proto` 编译为 Java 类，再启动。

调试环境添加启动参数 `-Dnacos.standalone=true`，使用内嵌数据库

## 架构

![nacos_arch.jpg](./assets/1561217892717-1418fb9b-7faa-4324-87b9-f1740329f564.jpeg)

address：

api：

auth：认证权限模块

client：

cmdb：

common：

config：

consistency：

console：

console-ui：控制台前端

core：

distribution：

doc：

exmaple：

istio：

naming：

sys：

test：





## 用户权限模块

nacos的auth模块被设计为轻量级auth，只适用于微服务内部使用

:::info

- Nacos是一个内部微服务组件，需要在可信的内部网络中运行，不可暴露在公网环境，防止带来安全风险。
- Nacos提供简单的鉴权实现，为防止业务错用的弱鉴权体系，不是防止恶意攻击的强鉴权体系。
- 如果运行在不可信的网络环境或者有强鉴权诉求，请参考官方简单实现做替换增强。

:::

Nacos用户权限主要有两个管理模块：

+ 用户管理：解决用户管理，登录，SSO 等问题

+ 权限管理：解决身份识别，访问控制，角色管理等问题

### 结构

Auth模块：主要定义权限相关的类（ActionTypes），权限模型（Permission、Resource、User），以及相关注解，比较简单

Console模块：主要提供业务层Rest接口，无非内嵌数据库或者外部数据库的增删改查

## 存储模块

nacos存储模块主要提供kv存储服务，接口较为简单，实现也只提供了File和Memory两种简单实现，RocksDB没有实现

### 接口设计

首先看到 core模块 `com.alibaba.nacos.core.storage.kv.KvStorage` 接口，提供了围绕key的增删改查接口以及三个实现

```java
public interface KvStorage {
    
    enum KvType {
        File,
        Memory,
        RocksDB,
    }
    
    
    byte[] get(byte[] key) throws KvStorageException;
    
    Map<byte[], byte[]> batchGet(List<byte[]> keys) throws KvStorageException;
    
    void put(byte[] key, byte[] value) throws KvStorageException;
    
    void batchPut(List<byte[]> keys, List<byte[]> values) throws KvStorageException;
    
    void delete(byte[] key) throws KvStorageException;

    void batchDelete(List<byte[]> keys) throws KvStorageException;
    
    void doSnapshot(final String backupPath) throws KvStorageException;
    
    void snapshotLoad(String path) throws KvStorageException;
    
    List<byte[]> allKeys() throws KvStorageException;
    
    void shutdown();
    
}

```

### File 实现

File实现比较简单，以其中的构造方法和get方法作说明

```java
     private final String baseDir;
    
    /**
     * Ensure that a consistent view exists when implementing file copies.
     */
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    
    private final ReentrantReadWriteLock.ReadLock readLock = lock.readLock();
    
    private final ReentrantReadWriteLock.WriteLock writeLock = lock.writeLock();


	public FileKvStorage(String baseDir) throws IOException {
        this.baseDir = baseDir;
        DiskUtils.forceMkdir(baseDir);
    }
    
    @Override
    public byte[] get(byte[] key) throws KvStorageException {
        readLock.lock();
        try {
            final String fileName = new String(key);
            File file = Paths.get(baseDir, fileName).toFile();
            if (file.exists()) {
                return DiskUtils.readFileBytes(file);
            }
            return null;
        } finally {
            readLock.unlock();
        }
    }
```

创建Java进程级读写锁，粒度为目录级，也就是说读操作互不影响，写操作会暂停其他读写。但比较令人费解的是，put 系列方法也是使用读锁，只有doSnapshot做整个目录快照时，才使用写锁。

```java
    @Override
    public void put(byte[] key, byte[] value) throws KvStorageException {
        readLock.lock();
        try {
            final String fileName = new String(key);
            File file = Paths.get(baseDir, fileName).toFile();
            try {
                DiskUtils.touch(file);
                DiskUtils.writeFile(file, value, false);
            } catch (IOException e) {
                throw new KvStorageException(ErrorCode.KVStorageWriteError, e);
            }
        } finally {
            readLock.unlock();
        }
    }
```

### Memory 实现

Memory实现更为简单，围绕线程安全的 ConcurrentSkipListMap （并发读写的有序map）进行增删改查

```java
    private final Map<Key, byte[]> storage = new ConcurrentSkipListMap<>();
```

### 设计模式

StorageFactory.java 使用了工厂模式

```java
    public static KvStorage createKvStorage(KvStorage.KvType type, final String label, final String baseDir)
            throws Exception {
        switch (type) {
            case File:
                return new FileKvStorage(baseDir);
            case Memory:
                return new MemoryKvStorage();
            case RocksDB:
            default:
                throw new IllegalArgumentException("this kv type : [" + type.name() + "] not support");
        }
    }
```

## 服务注册发现

服务注册发现功能是 Nacos 核心，主要位于 Naming 模块和apis模块

### 模型

```mermaid
graph LR
namespace-->group
group-->service
service-->cluster
cluster-->instance
```



一个能提供服务的实例所属模型如上图

nacos 的 group没有实体，其实group是service的一部分，以service前缀来区分group，例如servicename为`DEFAULT_GROUP@@nacos.test.3`，group为`DEFAULT_GROUP`，service为`nacos.test.3`

### 代码模型

com.alibaba.nacos.api.naming.pojo.Instance

```java
@JsonInclude(Include.NON_NULL)
public class Instance implements Serializable {
    private static final long serialVersionUID = -742906310567291979L;
    //实例的唯一id
    private String instanceId;
    //实例IP
    private String ip;
    //实例端口
    private int port;
    //实例权重
    private double weight = 1.0D; 
    //实例健康状态
    private boolean healthy = true;
    //实例是否可接收请求
    private boolean enabled = true;
    //实例是否为临时实例
    private boolean ephemeral = true;
    //实例所属集群信息
    private String clusterName;
    //实例所属服务信息
    private String serviceName;
    //用户扩展属性
    private Map<String, String> metadata = new HashMap<String, String>();
}
```



com.alibaba.nacos.api.naming.pojo.Cluster

```java
@SuppressWarnings("checkstyle:abbreviationaswordinname")

public class Cluster implements Serializable {

    //所属服务名称
    private String serviceName;

    //集群名称
    private String name;

    //集群健康检查配置
    private AbstractHealthChecker healthChecker = new Tcp(); 

    //集群实例默认注册端口
    private int defaultPort = 80;

    //集群实例默认健康检查端口
    private int defaultCheckPort = 80;

    //是否使用实例端口做健康检查
    private boolean useIPPort4Check = true;

    //元数据
    private Map<String, String> metadata = new HashMap<String, String>();

}
```



com.alibaba.nacos.api.naming.pojo.Service

```java
public class Service implements Serializable {
    
    private static final long serialVersionUID = -3470985546826874460L;
    // 服务名
    private String name;
    // 保护阈值
    private float protectThreshold = 0.0F;
    // 应用名
    private String appName;
   	// group 名
    private String groupName;
    // 元数据
    private Map<String, String> metadata = new HashMap<String, String>();
}
```



存储 namespace，group，service 映射

```java
    /**
     * Map(namespace, Map(group::serviceName, Service)).
     */
    private final Map<String, Map<String, Service>> serviceMap = new ConcurrentHashMap<>();

```

注意这个map虽然是多线程安全的map，但并不能保证相关操作的原子性，创建服务时，如果不存在namespace需要加锁。

:::info

putServiceLock 可以不需要用 volatile 修饰，因为不需要读取变量的值

:::

```java
	private final Object putServiceLock = new Object();
	/**
     * Put service into manager.
     *
     * @param service service
     */
    public void putService(Service service) {
        // 如果不存在该 namespace，创建
        if (!serviceMap.containsKey(service.getNamespaceId())) {
            synchronized (putServiceLock) {
                if (!serviceMap.containsKey(service.getNamespaceId())) {
                    serviceMap.put(service.getNamespaceId(), new ConcurrentSkipListMap<>());
                }
            }
        }
        serviceMap.get(service.getNamespaceId()).putIfAbsent(service.getName(), service);
    }
```





### Rest接口

[Open API 指南 (nacos.io)](https://nacos.io/zh-cn/docs/open-api.html)

## 分布式

### 一致性协议 

Nacos提供CP和AP两类实现，CP使用现有库的Raft协议实现，AP使用自研弱一致性Distro协议

### todo：distro



## 参考

[Nacos 1.4.1源码启动流程_nacos 1.4.1 源码启动_苏州-DaniR的博客-CSDN博客](https://blog.csdn.net/chongbaozhong/article/details/116658595)

[Nacos 快速开始](https://nacos.io/zh-cn/docs/quick-start.html)

https://developer.aliyun.com/ebook/36

[Nacos集群（二）阿里自研弱一致性Distro协议核心实现_@candistro_我神级欧文的博客-CSDN博客](https://blog.csdn.net/weixin_37689658/article/details/122626747)