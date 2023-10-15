## 简介

Helm 是 Kubernetes 的包管理器，提供便捷的方式一键安装服务。

Helm 有官方中文文档，且十分详细，本文只记录一些个人常用部分

## 概念

Chart：Chart 代表着 Helm 包。它包含在 Kubernetes 集群内部运行应用程序，工具或服务所需的所有**资源定义**。

Repository：*Repository（仓库）* 是用来存放和共享 charts 的地方。

Release：*Release* 是运行在 Kubernetes 集群中的 chart 的实例。一个 chart 通常可以在同一个集群中安装多次。每一次安装都会创建一个新的 *release*

## Helm 命令

## repo

#### 添加 helm 仓库

```sh
helm repo add <repo_name> <repo_addr>
```

#### 搜索 Charts

```sh
# 从默认仓库搜索 https://artifacthub.io/ 
helm serach hub
# 从你添加的所有仓库搜索
helm search repo [keyword]
# 搜索指定仓库
helm serach repo [keyword] --registry <repo_addr>
```

#### 移除仓库

```sh
helm repo remove <repo_name>
```



### 状态

#### 查看chart可选配置

对于一个不了解的 charts，我们一般需要了解有哪些是内容可配的，可以使用 helm show values 命令

```sh
helm show values <chart_name>
```

#### 查看 release 列表

查看 release 列表

```sh
helm list
```

参数参考

| 参数            | 值参考 | 说明                                             |
| --------------- | ------ | ------------------------------------------------ |
| `--uninstalled` |        | 查看uninstall 时，使用了 `--keep-history` 参数的 |



#### install release

安装一个 helm 包，生成一个实例

```sh
helm install <release_name> <chart_name>
```

参数参考

| 参数         | 值参考 | 说明                 |
| ------------ | ------ | -------------------- |
| `--no-hooks` |        | 不运行当前命令的钩子 |
| `--timeout`  | 5m0s   | 等待k8s命令完成时间  |
| `-n`         | n1     | 命名空间             |

例如

```sh
# 从已有仓库安装
helm install happy-panda bitnami/wordpress
# 从本地安装
helm install happy-panda ./local_helm
```



安装 release 传递参数方式一般有两种：

+ 使用 `--values` 或 `-f` 

  这个方式使用 YAML 配置覆盖默认 values 文件，可以多次使用该命令指定多个文件，优先使用最右边文件

```sh
helm install myRelase bitnami/wordpress -f <my_value.yml>
```

+ 使用 `--set`

  这个是通过命令式覆盖指定 key 的配置

```sh
helm install myRelase bitnami/wordpress \
  --set k1=v2 \
  --set k2=v2
```

如果同时使用两个方式，注意`--set`优先级更高



#### 跟踪 release 状态

使用 helm status 命令

```sh
helm status <release_name>
```

#### upgrade release

用于升级 chart 到新版本，或者修改 release 配置。Helm 会尝试执行最小侵入式升级，只是更新变更的内容，使用 upgrade 后，会更新实例版本号（revision）

```sh
helm upgrade -f panda.yaml happy-panda bitnami/wordpress
```

#### 获取 release 配置值

```sh
helm get values <release_name>
```

#### rollback release



回滚指定 release 到 指定版本 revision

```sh
helm rollback [release_name] [revision]
```

参数参考

| 参数         | 值参考 | 说明                 |
| ------------ | ------ | -------------------- |
| `--no-hooks` |        | 不运行当前命令的钩子 |
| `--timeout`  | 5m0s   | 等待k8s命令完成时间  |
| `-n`         | n1     | 命名空间             |

#### uninstall release

卸载实例

```sh
helm uninstall <release_name>
```

| 参数             | 值参考 | 说明         |
| ---------------- | ------ | ------------ |
| `--keep-history` |        | 保留历史记录 |
|                  |        |              |
|                  |        |              |

#### 



## 参考

[Helm | Docs](https://helm.sh/zh/docs/)

