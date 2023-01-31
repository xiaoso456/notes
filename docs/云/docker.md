## 简介

解决问题：Docker 主要解决应用环境依赖问题，把环境和应用一起打包发布

和VM对比：和虚拟机 VM 相比，Docker 没有内置主操作系统，而是使用守护进程与主操作系统通信，将 Docker 容器和主操作系统隔离

docker 镜像（核心4M+运行环境Lib+程序App）小，启动快

docker 基于 go 语言

文档地址：[Docker Documentation | Docker Documentation](https://docs.docker.com/)

## 术语

镜像：轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的全部内容，包括代码、运行时、库、环境变量和配置文件

容器：镜像实例

数据卷（volume）：将容器的目录映射到主机上，提供容器文件同步、持久化到主机

## 快速开始

### 安装

以 CentOS 为例

1. 卸载残留文件

   ```bash
    sudo yum remove docker \
                     docker-client \
                     docker-client-latest \
                     docker-common \
                     docker-latest \
                     docker-latest-logrotate \
                     docker-logrotate \
                     docker-engine
   ```

2. 安装 `yum-utils` 工具

   ```bash
    sudo yum install -y yum-utils
      
    sudo yum-config-manager \
       --add-repo \
       https://download.docker.com/linux/centos/docker-ce.repo
    # 如果第二步不行，可以使用国内仓库
    sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
   ```

   ​	

3. 安装 docker 社区版(ce)、客户端

   ```bash
    sudo yum install docker-ce docker-ce-cli containerd.io
   ```

### 启动 Docker

启动 docker 服务

```bash
sudo systemctl start docker
```

验证是否已经安装启动

```bash
sudo docker run hello-world
```

## 设置镜像仓库

修改 `/etc/docker/daemon.json` 文件，添加镜像仓库地址 `xxxxxxx` 如下

```json
{
    "registry-mirrors": [
         "xxxxxxx"
    ]
}
```

重启 docker 服务

```bash
service docker restart
```



## Docker 命令

![image-20230130104335167](./assets/image-20230130104335167.png)

### 镜像

轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的全部内容，包括代码、运行时、库、环境变量和配置文件

#### 查看已有镜像

```bash
docker images
```

#### 搜索镜像

```bash
docker search mysql
--filter=start=3000 # 过滤 star>= 3000
```

#### 下载镜像

```bash
docker pull <镜像名>[:版本号]

例:
docker pull mysql:5.7
```

#### 删除镜像

```bash
# 通过id删除镜像
docker rmi -f 镜像id 镜像id2 镜像id3

# 删除全部容器
docker rmi -f $(docker images -aq)
```

### 容器

容器是镜像的实例化

#### 操作容器

##### 运行容器

```bash
docker run <镜像名>[:版本号]
例子:
# 一种测试推荐用法，用完就删，一般用来测试
docker run -it --rm tomcat:9.0
```

| 选项          | 默认 | 描述                                                         |
| ------------- | ---- | ------------------------------------------------------------ |
| --name        |      | 给容器起名                                                   |
| -d            |      | 以后台方式运行，注意因为docker是以守护进程方式运行，发现没有对外提供服务，会自动停止 |
| -it /bin/bash |      | 使用交互方式运行，使用 bash                                  |
| -p            |      | 端口映射，可选两种格式，使用多个参数p可以指定多个端口<br/>1.主机端口:容器端口 <br/>2.容器端口 |
| -P            |      | 随机指定端口映射                                             |
| -v            |      | 挂载卷，支持以下格式<br/>1. `主机目录:容器内目录`<br/>2. 具名挂载：`卷名称:容器内目录`<br/>3. 匿名挂载：`容器内目录` |

##### 退出容器

这里说的退出指进入到容器交互方式时的退出

| 操作               | 效果           |
| ------------------ | -------------- |
| 输入 `exit`        | 容器停止并退出 |
| 按下`Ctrl + P + Q` | 容器不停止退出 |



##### 启动和停止容器

```shell
docker start <容器id>
docker restart <容器id>
docker stop <容器id>
docker kill <容器id>
```

##### 进入当前正在运行的容器

1. 这个方式是进入容器，并使用了新的 bash

```bash
docker exec -it <容器id> /bin/bash
通过/bin/bash命令行
```

2. 这个方式是进入旧的，没有新开 bash

```bash
docker attach <容器id>
```

##### 文件拷贝

从容器内拷贝文件到主机上

```bash
docker cp <容器id:容器内路径> <目的地主机路径>
```

从主机拷贝文件到容器中

```bash
docker cp <文件路径> <容器长ID:docker容器中的路径>
```

#### 查看容器信息

##### 查看容器列表

```bash
docker ps

-a 列出当前运行和历史运行过的容器
-n=数量 显示最近创建的容器
-q 只显示容器的编号
```

##### 查看容器日志

```bash
docker logs <容器id>

-f : 跟踪日志输出
--since :显示某个开始时间的所有日志
-t : 显示时间戳
--tail :仅列出最新N条容器日志
```



##### 查看容器中的进程信息

```bash
docker top <容器id>
```

##### 查看容器内部信息

创建信息，参数等等，环境变量等

```bash
docker inspect <容器id>
```

### 导入与导出

#### 导出镜像到本地镜像文件

```
docker save -o <本地路径地址>.tar <镜像名>
```

#### 导入本地镜像

```bash
docker load -i <本地镜像文件名>
```



#### 导出容器到本地容器包（镜像）

```
docker export -o <本地路径地址>.tar <容器名>
```

#### 导入本地容器生成的镜像

```bash
docker import -o <本地路径地址>.tar <镜像名>:[版本号]
```

#### Docker Save 与 Docker Export

- `docker save` 保存的是镜像，`docker export` 保存的是容器
- `docker load` 用来载入镜像包，`docker import` 用来载入容器包，但两者都会恢复为镜像
- `docker load` 不能对载入的镜像重命名，而 `docker import` 可以为镜像指定新名称

### 卷

卷是特殊的文件或者目录，它将宿主机文件或者目录直接映射进容器中，可供一个或多个容器使用。

卷常用作容器数据持久化。

#### 创建卷

```bash
docker volume create <卷名>
```

| 选项        | 默认  | 描述                 |
| ----------- | ----- | -------------------- |
| --driver,-d | local | 指定卷驱动程序名称   |
| --label     |       | 为卷设置元数据       |
| --name      |       | 指定卷名             |
| --opt,-o    |       | 设置驱动程序特定选项 |

#### 查看卷信息

```bash
docker volume inspect <卷名>
```

#### 列出所有数据卷

```bash
docker volume ls
```

#### 删除卷

删除所有未使用数据卷

```bash
docker volume prune
```

| 选项       | 默认 | 描述                          |
| ---------- | ---- | ----------------------------- |
| --filter   |      | 提供过滤器值（例如 ‘label=’） |
| --force,-f |      | 不提示确认                    |

##### 

删除一个或多个卷

```bash
docker volume rm <卷名>
```

| 选项       | 默认 | 描述                 |
| ---------- | ---- | -------------------- |
| --force,-f |      | 强制删除一个或多个卷 |