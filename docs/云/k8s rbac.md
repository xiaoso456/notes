### 授权

自版本1.6起，k8s 默认采用 RBAC（Role Base Access Control，基于角色的访问控制）进行权限管理

k8s apiserver支持以下几种授权方式：

+ **AlwaysDeny**：表示拒绝所有请求，一般用于测试。

+ **AlwaysAllow**：允许接收所有请求。 如果集群不需要授权流程，则可以采用该策略，这也是Kubernetes的默认配置。

+ **ABAC**（Attribute-Based Access Control）：基于属性的访问控制。 表示使用用户配置的授权规则对用户请求进行匹配和控制。

+ **Webhook**：通过调用外部REST服务对用户进行授权。

+ **RBAC**：Role-Based Access Control，基于角色的访问控制。

+ **Node**：是一种专用模式，用于对kubelet发出的请求进行访问控制。

#### 权限模型

Subject：主体，包括 User，Group，ServiceAccount

Role：授权特定命名空间的访问权限

ClusterRole：授权所有命名空间的访问权限

RoleBinding：将 Role 绑定到 Subject（主体）

ClusterRoleBinding：将ClusterRole绑定到Subject

![img](./assets/23d5ec88321243e1b7546d6736736fd3tplv-k3u1fbpfcp-zoom-in-crop-mark4536000.webp)

#### 角色

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



Cluster Role Yaml示例如下

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

#### 角色绑定

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

[Kubernetes（k8s）权限管理RBAC详解 - 掘金 (juejin.cn)](https://juejin.cn/post/7116104973644988446?searchId=2023072221535978FBCF19C740319A4B88)

[使用 RBAC 鉴权 | Kubernetes](https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/rbac/)