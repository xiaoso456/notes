## 简介

k8s在物理机部署复杂且默认含有很多不常用功能，占用内存CPU资源多，部署起点高。

在学习环境或者测试环境中，我们可能希望有一个单机的k8s，并且希望部署尽量简单，并且部署后希望能够快速了解当前环境

## k8s环境部署

推荐个人在虚拟机里部署k3s（使用docker作为运行时），部署方便。不推荐用容器方式启动kind，因为相当于容器中又起了容器集群，调试k8s内应用麻烦，但是启动k8s集群方便可复现

### kind

kind是Kubernetes本地集群的轻量级工具,用于在本地开发和测试Kubernetes应用程序，kind不适用于生产环境

kind可以直接用docker启动，一个启动kind容器，就是一个独立的k8s集群节点

### k3s

k3s是为生产环境优化的轻量级Kubernetes发行版，k3s安装和配置更简单,资源占用更小。

k3s占用资源低，适合在个人电脑，VM上直接进行部署

#### 安装

安装docker

```sh
curl https://releases.rancher.com/install-docker/20.10.sh | sh
```

安装k3s，使用docker作为runtime

```sh
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -s - --docker
```

使用 kubectl 检查节点状态

```
kubectl get node
```



## 工具

### kubekey

kubekey是k8s一个部署工具，用于一键部署k8s，k3s集群。

一般生产环境可以用kubekey部署，自用环境 kind 和 k3s 已经足够方便。

### kubesphere

KubeSphere简单易用的可视化Web工作台来管理容器部署，对开发很友好方便。不想硬敲命令行的都简易部署一套

### k9s

k9s通过终端提供管理k8s集群可视化操作，一般kubectl命名都能用k9s在终端上通过交互方式执行。推荐在不能安装kubesphere的环境使用

## 参考

[K3s - 轻量级 Kubernetes | K3s](https://docs.k3s.io/zh/)