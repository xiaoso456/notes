## 简介

## 认证系统

认证用于身份识别，调用 k8s 接口查看 / 创建资源都需要权限

一般认证系统和以下控制器有关：

- adminssion controller (AC)
- token controller (TC)
- serviceaccount controller (SAC)

### human user

一般用户使用 kubectl 发起请求，实际就是使用在当前节点配置文件 `~/.kube/config` 中的管理员账号使用 HTTP 协议向 k8s 的
apiserver 发起请求

### ServiceAccount

serviceaccount 是 k8s 里一种资源，serviceaccount 可以到 apiserver 上认证

如果 Pod 也要调用 k8s 集群接口，一般来说需要使用 serviceaccount

:::info

k8s v1.22 以前的创建 serviceaccount 会自动关联建立一个 secret，新版本需要手动创建

:::

#### 创建服务账号

创建和查看服务账号

```sh
# 创建测试用的命名空间 sa-test
kubectl create ns sa-test
# 创建 服务账号 service-account-1
kubectl create serviceaccount service-account-1 -n sa-test
# 查看服务账号列表
kubectl get serviceaccount
# 查看服务账号详细信息
kubectl describe serviceaccount service-account-1 -n sa-test

# 返回结果
Name:                service-account-1
Namespace:           sa-test
Labels:              <none>
Annotations:         <none>
Image pull secrets:  <none>
Mountable secrets:   <none>
Tokens:              <none>
Events:              <none>

```

生成服务账号 token

有两种方式

1. 使用 TokenRequestApi 创建 token 创建临时 token，默认有效期是一小时

```sh
# 为服务账号 token service-account-1 创建一个 token
kubectl create token service-account-1 -n sa-test --duration 8760h
# 会直接返回 token
eyJhbGciOiJSUzI1NiIsImtpZCI6IkF5OHZZa2tneTE3aDVMTjVJQlBpZFpEUWlsTE9SM0xJd2pncEFBZWY0Q0UifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiLCJrM3MiXSwiZXhwIjoxNjkwMDIxNzI5LCJpYXQiOjE2OTAwMTgxMjksImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJzYS10ZXN0Iiwic2VydmljZWFjY291bnQiOnsibmFtZSI6InNlcnZpY2UtYWNjb3VudC0xIiwidWlkIjoiNzk5NzJiMmMtMzkwYy00OGZhLThmMGUtMDA5NWZmMzE0OTc1In19LCJuYmYiOjE2OTAwMTgxMjksInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpzYS10ZXN0OnNlcnZpY2UtYWNjb3VudC0xIn0.NwlCllDVt2qQFBTmc5oK8GKUpx7JtQOdk4MOa47iEeq3aJmdeA08K7qPYHSrUNmXPUCcCqwVjTYHbokByVa21uDTlDui925b3_1xmtYfPxcRZuyidPyfHvdCwAXH3uiZ6LhcZMPIIWGh3nhdL3xXVUDMLuhZOx7hgMx5lNu_EyX-rLV5rcaW6mnORr4FfEqbGco4YC2UNQ5RbaMsWr90LUc4FcMtJcmdeWD70Os_RjaHR84SXxh79oOUZRpxZVMHA75u3EK7tRSPE7w8dJDI1T4gXzHFeJIhRq083OTSnOVoXsucScCZYzb7riQAlqyWC_dA0NdLl_GzKBDTgGlrxw
```

2. 创建 secret token

   创建 secret 的 yaml 文件，type 写 `kubernetes.io/service-account-token`

```sh
apiVersion: v1
kind: Secret
metadata:
  name: secret-sa-sample
  annotations:
    kubernetes.io/service-account.name: "service-account-1"   # 这里填写 serviceAccountName
type: kubernetes.io/service-account-token
```

​ 执行命令

```sh
kubectl apply -f xxx.yaml -n sa-test
```

 	查看创建的 secret

```sh
kubectl describe secret secret-sa-sample -n sa-test
# 返回信息
Name:         secret-sa-sample
Namespace:    sa-test
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: service-account-1
              kubernetes.io/service-account.uid: 79972b2c-390c-48fa-8f0e-0095ff314975

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     570 bytes
namespace:  7 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IkF5OHZZa2tneTE3aDVMTjVJQlBpZFpEUWlsTE9SM0xJd2pncEFBZWY0Q0UifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJzYS10ZXN0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InNlY3JldC1zYS1zYW1wbGUiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoic2VydmljZS1hY2NvdW50LTEiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI3OTk3MmIyYy0zOTBjLTQ4ZmEtOGYwZS0wMDk1ZmYzMTQ5NzUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6c2EtdGVzdDpzZXJ2aWNlLWFjY291bnQtMSJ9.gq6WfXAOHSMb7_Q4MH9mrrkGgp_YDdDFRiyiVxje03JxZQKOIr9PiYwWckwHAcc8_9ZwWPTObmmjNaedLctkKCo_v15MZFAJQZoQ8NKiHYnlKBXr03y-jCAXI2iPntruSbNJMX0QdUKuSMStOpXgC8m3vSVpZmHMoAaKEcPR7t3Gdt4Q3xfSX0ply-b7TzKMi39dO-RNXus7r_p7YAfE7syUFSOc7tMMsiMeTENgi9s7aq3E9MNw_J29YJGdG9MCfP0q6gqxbXzqIM3kCCXiPsYju805-hhHWHEGELRp0SCF8mRW2UCm9Ylg_qZf7dKraQZ177OfO29htlUjmjDZ9A


# 查看服务账号
kubectl describe serviceaccount service-account-1 -n sa-test
# 可以看到服务账号 tokens 包含 secret-sa-sample
Name:                service-account-1
Namespace:           sa-test
Labels:              <none>
Annotations:         <none>
Image pull secrets:  <none>
Mountable secrets:   <none>
Tokens:              secret-sa-sample
Events:              <none>
```

## 授权系统

自版本 1.6 起，k8s 默认采用 RBAC（Role Base Access Control，基于角色的访问控制）进行权限管理

k8s apiserver 支持以下几种授权方式：

+ **AlwaysDeny**：表示拒绝所有请求，一般用于测试。

+ **AlwaysAllow**：允许接收所有请求。 如果集群不需要授权流程，则可以采用该策略，这也是 Kubernetes 的默认配置。

+ **ABAC**（Attribute-Based Access Control）：基于属性的访问控制。 表示使用用户配置的授权规则对用户请求进行匹配和控制。

+ **Webhook**：通过调用外部 REST 服务对用户进行授权。

+ **RBAC**：Role-Based Access Control，基于角色的访问控制。

+ **Node**：是一种专用模式，用于对 kubelet 发出的请求进行访问控制。

这里主要介绍 RBAC

### 权限模型

Subject：主体，包括 User，Group，ServiceAccount

Role：授权特定命名空间的访问权限

ClusterRole：授权所有命名空间的访问权限

RoleBinding：将 Role 绑定到 Subject（主体）

ClusterRoleBinding：将 ClusterRole 绑定到 Subject

![img](./assets/23d5ec88321243e1b7546d6736736fd3tplv-k3u1fbpfcp-zoom-in-crop-mark4536000.webp)

### 角色

Role Yaml 示例如下

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: default
  name: pod-role
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"] # 
  verbs: ["get", "watch", "list"] 
```

Cluster Role Yaml 示例如下

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: default
  name: pod-role
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]

```

相关参数

verbs：`"get", "list", "watch", "create", "update", "patch", "delete", "exec"`

resources：`"services", "endpoints", "pods","secrets","configmaps","crontabs","deployments","jobs","nodes","rolebindings","clusterroles","daemonsets","replicasets","statefulsets","horizontalpodautoscalers","replicationcontrollers","cronjobs"`

apiGroups：`"","apps", "autoscaling", "batch"`

### 角色绑定

RoleBinding Yaml 示例如下：

```yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: rb
  namespace: default
subjects:
- kind: ServiceAccount
  name: zhangsan
  namespace: default
roleRef:
  kind: Role
  name: pod-role
  apiGroup: rbac.authorization.k8s.io
```

ClusterRoleBinding Yaml 示例如下：

```yaml
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: crb
subjects:
- kind: ServiceAccount
  name: mark
  namespace: default
roleRef:
  kind: ClusterRole
  name: pod-clusterrole
  apiGroup: rbac.authorization.k8s.io

```

## 参考

[Kubernetes 手记（14）- 用户权限系统 - 掘金 (juejin.cn)](https://juejin.cn/post/6974770831947726856?searchId=202307221643389855C2B668BD7770B0EC)

[k8s serviceaccount 创建后没有生成对应的 secret - SoulChild 随笔记](https://www.soulchild.cn/post/2945/)

[Kubernetes（k8s）权限管理 RBAC 详解 - 掘金 (juejin.cn)](https://juejin.cn/post/7116104973644988446?searchId=2023072221535978FBCF19C740319A4B88)

[使用 RBAC 鉴权 | Kubernetes](https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/rbac/)