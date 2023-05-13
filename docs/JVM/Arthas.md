## 简介

Arthas 是一款线上监控诊断产品，能够实时查看 load、内存、gc、线程的状态信息

## 快速开始

### 安装

全量安装包下载：[arthas](https://arthas.aliyun.com/download/latest_version?mirror=aliyun)

### 启动

```sh
java -jar arthas-boot.jar
```

随后可以看到 Java进程列表，输入ID按下Enter进入arthas控制台

## 命令使用

### 记录

#### jfr

:::tip 什么是 JFR

Java Flight Recorder (JFR) 是一种用于收集有关正在运行的 Java 应用程序的诊断和分析数据的工具。它集成到 Java 虚拟机 (JVM) 中，几乎不会造成性能开销，因此即使在负载较重的生产环境中也可以使用。 JDK8 的 8u262 版本之后才支持 jfr。

:::

`jfr` 命令支持在程序动态运行过程中开启和关闭 JFR 记录。

```java
jfr <cmd命令> [actionArg]
```

| 参数名称                  | 参数说明                                                     |
| :------------------------ | :----------------------------------------------------------- |
| cmd                       | 要执行的操作 支持的命令【start，status，dump，stop】         |
| actionArg                 | 属性名模式                                                   |
| `-i  <record name>`         | 记录名称                                                     |
| `-r <record id>`            | 记录 id 值                                                   |
| `--dumponexit <文件名.jfr>` | 程序退出时，是否要 dump 出 .jfr 文件，默认为 false           |
| `-d <时间>`                 | 延迟多久后启动 JFR 记录，支持带单位配置，eg: 60s, 2m, 5h, 3d. 不带单位就是秒，默认无延迟 |
| `--duration <持续时间>`     | JFR 记录持续时间，支持单位配置，不带单位就是秒，默认一直记录 |
| `-s <配置文件地址>`         | 采集 Event 的详细配置文件，默认是 default.jfc 位于 `$JAVA_HOME/lib/jfr/default.jfc` |
| `-f <输出文件地址>`         | 将输出转储到指定路径                                         |
| `--maxage <时间值>`         | 缓冲区数据最大文件记录保存时间，支持单位配置，不带单位就是秒，默认是不限制 |
| `--maxsize <大小>`          | 缓冲区的最大文件大小，8支持单位配置， 不带单位是字节，m 或者 M 代表 MB，g 或者 G 代表 GB。 |
| `--state <状态值>`          | jfr 记录状态，可以是 new, delay, running, stopped, closed    |

### JVM相关

#### dashboard

详细参考：[dashboard | arthas (aliyun.com)](https://arthas.aliyun.com/doc/dashboard.html)

使用 dashboard 命令，可以显示当前进程的线程、内存等信息，按 ctrl+c 退出。

```sh
dashboard -i 1000
```

| 参数          | 参数说明                                 |
| :------------ | :--------------------------------------- |
| `-i <时间间隔>` | 刷新实时数据的时间间隔 (ms)，默认 5000ms |
| `-n <次数>`     | 刷新实时数据的次数                       |

#### thread

查看当前线程信息，查看线程的堆栈

```sh
thread <线程id>
```

| 参数名称      | 参数说明                                                |
| :------------ | :------------------------------------------------------ |
| *id*          | 线程 id                                                 |
| `-n <数量>`     | 指定最忙的前 N 个线程并打印堆栈                         |
| -b            | 找出当前阻塞其他线程的线程                              |
| `-i <采样间隔>` | 指定 cpu 使用率统计的采样间隔，单位为毫秒，默认值为 200 |
| --all         | 显示所有匹配的线程                                      |

#### jvm

查看当前 JVM 信息

```sh
jvm
```

#### memory

查看当前内存信息

```bash
memory
```

#### heapdump

dump java heap，类似 jmap 命令的 heap dump 功能

**dump 到指定文件**

```sh
heapdump /tmp/dump.hprof
```

**dump live 对象**

```bash
heapdump --live /tmp/dump.hprof
```

#### sysprop

查看和修改当前 JVM 的系统属性(`System Property`)

```sh
sysprop [-h] [property-name] [property-value]
```

**查看所有属性**

```sh
sysprop
```

**查看单个属性**

```sh
sysprop <属性名>
```

例： `sysprop java.version`

**修改单个属性**

```sh
sysprop <属性名> <属性值>
```

例：`sysprop user.country CN`

#### logger

用于查看 logger 信息，更新 logger level，支持常见 logger

使用参考：[logger | arthas (aliyun.com)](https://arthas.aliyun.com/doc/logger.html)

```sh
logger [-c <value>] [--classLoaderClass <value>] [-h] [--include-no-appender] [-l <value>] [-n <value>]
```

| 参数                          | 说明                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| `-c <值>`                       | 指定 classLoader 的 hashcode，默认是SystemClassLoader        |
| `--classLoaderClass <类全类名>` | 对于只有唯一实例的 ClassLoader 可以通过`--classLoaderClass`指定 class name |
| `-l <日志等级>`                 | 用于设置日志等级                                             |
| `-n <logger名>`                 | 指定要操作的 logger                                          |

#### vmoption

查看和修改 JVM 里诊断相关的 option



查看所有指定的 option

```bash
vmoption
```

查看指定的 option

```bash
vmoption <option名>
例: vmoption PrintGC
```

更新指定的 option

```bash
vmoption PrintGC true
```

#### vmtool

`vmtool` 利用`JVMTI`接口，实现查询内存对象，强制 GC 等功能。

强制 gc

```bash
vmtool --action forceGc
```

### monitor/watch/trace 相关

去官网看看吧

- [monitor](https://arthas.aliyun.com/doc/monitor.html) - 方法执行监控
- [stack](https://arthas.aliyun.com/doc/stack.html) - 输出当前方法被调用的调用路径
- [trace](https://arthas.aliyun.com/doc/trace.html) - 方法内部调用路径，并输出方法路径上的每个节点上耗时
- [tt](https://arthas.aliyun.com/doc/tt.html) - 方法执行数据的时空隧道，记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测
- [watch](https://arthas.aliyun.com/doc/watch.html) - 方法执行数据观测



### class/classloader

去官网看看吧

- [classloader](https://arthas.aliyun.com/doc/classloader.html) - 查看 classloader 的继承树，urls，类加载信息，使用 classloader 去 getResource
- [dump](https://arthas.aliyun.com/doc/dump.html) - dump 已加载类的 byte code 到特定目录
- [jad](https://arthas.aliyun.com/doc/jad.html) - 反编译指定已加载类的源码
- [mc](https://arthas.aliyun.com/doc/mc.html) - 内存编译器，内存编译`.java`文件为`.class`文件
- [redefine](https://arthas.aliyun.com/doc/redefine.html) - 加载外部的`.class`文件，redefine 到 JVM 里
- [retransform](https://arthas.aliyun.com/doc/retransform.html) - 加载外部的`.class`文件，retransform 到 JVM 里
- [sc](https://arthas.aliyun.com/doc/sc.html) - 查看 JVM 已加载的类信息
- [sm](https://arthas.aliyun.com/doc/sm.html) - 查看已加载类的方法信息

## 参考

[简介 | arthas (aliyun.com)](https://arthas.aliyun.com/doc/)

