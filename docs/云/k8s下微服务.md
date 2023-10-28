## 简介
微服务体系一个代表就是 SpringCloud，提供了一系列组件，或者定义一些方式以解决一系列服务间问题：

+ 注册中心(Service Registry):用于管理和发现服务,例如Eureka、Consul。

+ 配置中心(Configuration Management):用于统一管理和动态更新各服务的配置,例如Nacos、Apollo。

+ 服务网关(API Gateway):提供统一的访问入口和流量管理,例如SpringCloud Gateway、Nginx、Zuul、Istio。

+ 服务监控(Monitoring):例如监控各个服务的指标、日志记录、性能监控和调用链监控等,例如Prometheus、Grafana。

+ 服务跟踪(Distributed Tracing):采集并记录分布式系统中请求的整个调用路径和操作时间,例如Zipkin、Jaeger。

+ 服务配置管理(Configuration Management):统一管理环境配置与各个微服务的动态配置,例如Apollo、Nacos。

+ 负载均衡(Load Balancing):调度请求到后端不同实例上,例如Nginx、LVS。

+ 服务发现(Service Discovery):用于服务注册与发现,例如Nacos、Consul、Eureka。

+ 服务版本管理(Version Control):管理服务的代码和各个版本的发布,例如Git。

+ 服务与服务间调用(Service to Service Communication):可以是同步RESTful调用、也可以是基于消息的异步调用,例如HTTP、RPC、Kafka。

在k8s环境下，许多组件都下沉到了基础设施，将现有微服务解决方案（例如SpringCloud）迁移到k8s时，可以考虑使用现有组件，而不只把原有解决方案的各个组件容器化。

## 服务注册与服务发现

SpringCloud体系下，微服务服务注册发现通过单独部署服务注册中心实现，服务注册与发现一般都是依靠单独部署注册中心实现，例如nacos、eureka等。

微服务应用启动时，将自身注册到注册中心。调用其他服务时，一般通过`服务名`在注册中心获取其他服务的ip，这种架构下，负载均衡在客户端实现，由客户端选择调用哪个微服务。

K8S通过Service提供最基本应用级服务注册与服务发现功能，已经足够满足大多数场景下微服务调用需求。

### K8S服务注册

k8s通过Service资源提供自动服务注册功能。

:::info

Pod是K8S最小运行单位，每个微服务一般都运行在一个Pod内，每个Pod会有全局唯一ip。

:::

Service通过标签筛选器筛选出Pod，变相提供了自动服务注册的功能

### K8S服务发现

k8s通过Service资源提供最基本服务发现功能，下面是Service常用类型：

+ ClusterIP

  默认类型，只在集群内部可访问。为集群内其他pod提供服务发现和负载均衡。

  通过服务ip或者服务名访问服务时，会根据负载均衡策略将请求转发到Pod上，这种负载均衡经过转发，属于服务端负载均衡

+ NodePort

  在 ClusterIP 基础上为 Service 在每个 Node 上的静态端口配了外部端口,能够从集群外访问服务。

+ LoadBalancer

  在 NodePort 基础上,使用云平台负载均衡器来发布和维护外部的虚拟 IP。

+ ExternalName

  将集群内服务映射到外部服务,比如用来引用外部数据库服务。查询返回CNAME记录。

+ Headless Service

  没有默认的集群 IP 地址,用于服务发现而非负载均衡。

  服务发现是使用DNS实现的，可以通过获取DNS记录发现所有Pod的IP，再由客户端对服务进行请求，这种属于客户端负载均衡

  :::info

  当然，这里的Pod IP是K8S集群通过iptable或LVM提供的，也可能经过一定程度转发，会有一定性能损失

  :::



如Dubbo文章上总结如下

K8s 体系下，服务发现通常有以下几种方式:

- 注册机制：将 IP 写入注册中心，用心跳保持连接；当心跳停止，从注册中心删除；
- 利用 Service+DNS ：新建一个 Service ，可以通过标签选择到一组 Pod 列表，这个 Service 对应一个不变的集群 IP ；Client 端通过 DNS 方式或者直接访问集群 IP 。这个集群 IP ，约等于实现了负载均衡 ( iptable 方式)；
- 利用 headless service(DNS) ：headless service 和上面的 service 的区别是，它不提供集群 IP ，通过主机名的形式获取一组 IP 列表，Client 端自己决定访问哪个 Pod ；
- api server ：Client 端直接请求 api server ，获取到 pod 的列表， Client 自己决定访问 pod 的逻辑。同时获取的时候增加 watch ，api server 会将 pod 的变化信息同步 Client 。

通过拿到 Server 端的 IP 或者 host ，Client 端就可以发起 http 或者其他协议的请求。



评价一下以上几种方式：

+ 注册机制

  在k8s上部署Nacos等独立注册中心，由客户端进行服务注册发现，最不云原生的方式

+ 利用 Service+DNS

  最简单的方式，客户端调用服务时候只需要写固定服务名即可完成服务调用，由K8S进行服务端负载均衡

+ 利用 headless service(DNS)

  次简单的方式，客户端只需要向K8S的DNS服务器获取指定服务的解析记录，即可得到被调用的Pod IP，由客户端进行选择Pod调用，基于DNS实现服务发现，属于客户端负载均衡

+ api server

  实时性最好，可以使用K8S通知机制最快获取服务变化



## 参考

[Dubbo 在 K8s 下的思考 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903983136374798)