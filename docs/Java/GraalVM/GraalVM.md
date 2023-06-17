## 简介

GraalVM是一个基于Java虚拟机（JVM）的高性能跨语言运行时环境，可以在一个共同的运行时中支持许多编程语言，包括Java、Scala、Kotlin、Groovy、JavaScript等。

常用于：构建本机镜像

## 环境配置

下载：推荐 Java17 [下载 GraalVM](https://www.graalvm.org/downloads/#)



配置环境变量 `GRAALVM_HOME` 类似如下，最好也同时配置 JAVA_HOME

```
GRAALVM_HOME=D:\program\graalvm17\graalvm-ce-java17-22.3.1
JAVA_HOME=D:\program\graalvm17\graalvm-ce-java17-22.3.1
```

## 常用工具

gu 是 graalVM 一个常用命令工具，可以安装多语言、本机镜像插件

```
gu install ruby
gu install r
gu install python
gu install wasm
gu install native-image
gu install llvm-toolchain
```



## Native Images

本机镜像是 GraalVM 一个最常用用途，可以把 Java程序打包成直接二进制可执行程序，有以下优点

- 使用Java虚拟机所需资源的一小部分，因此运行成本更低
- 以毫秒为单位启动
- 立即提供最佳性能，无需预热
- 可以打包到轻量级容器映像中，以实现快速高效的部署
- 减少攻击面

### 环境准备

安装 native-iamge 插件

```
gu install native-image
```



需要安装c语言相关本地工具链

Linux：

使用 yum 安装 `gcc ` 、`glibc-devel`、`zlib-devel` 

```shell
yum install gcc glibc-devel zlib-devel
```



windows：

安装 Visual Studio、Visual Studio C++（2017 15.9版本以上），并安装 Windows SDK

安装完毕后，能找类似的 `x64 Native Tools Command Prompt for VS 2022` 的程序，由于 windows 原生 cmd 奇怪的文件名限制，使用 native-images 相关命令时，最好使用这个命令行工具



### 构建 native images

#### 从 .class 文件构建

新建 `HelloNativeImages.java`

```java
 public class HelloWorld {
     public static void main(String[] args) {
         System.out.println("Hello, Native World!");
     }
 }
```

编译到 class 文件

```shell
javac HelloNativeImages.java
```

编译到 native images

```
native-image HelloNativeImages
```

运行

```
./hellonativeimages
```

#### 从 jar 文件构建

```
native-image [options] -jar jarfile [imagename]
```

#### 使用 maven 构建工具

添加以下内容到 pom.xml，`${native.maven.plugin.version}` 这里使用 0.9.22 版本

```xml
   <profiles>
        <profile>
            <id>native</id>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.graalvm.buildtools</groupId>
                        <artifactId>native-maven-plugin</artifactId>
                        <version>${native.maven.plugin.version}</version>
                        <extensions>true</extensions>
                        <executions>
                            <execution>
                                <id>build-native</id>
                                <goals>
                                    <goal>compile-no-fork</goal>
                                </goals>
                                <phase>package</phase>
                            </execution>
                            <execution>
                                <id>test-native</id>
                                <goals>
                                    <goal>test</goal>
                                </goals>
                                <phase>test</phase>
                            </execution>
                        </executions>
                        <configuration>
                            <!-- imageName用于设置生成的二进制文件名称 -->
                            <imageName>${project.artifactId}</imageName>
                            <!-- mainClass用于指定main方法类路径 -->
                            <mainClass>com.github.xiaoso456.Main</mainClass>
                            <!--<buildArgs>-->
                            <!--    &#45;&#45;no-fallback-->
                            <!--</buildArgs>-->
                        </configuration>
                    </plugin>
                </plugins>
            </build>
        </profile>
    </profiles>
```

注： configuration 里要指定入口类，不然几乎都会报 return zero 之类的错误

使用 maven 编译打包

```
mvn -Pnative -DskipTests package
```

## 反射支持和使用 native agent



### 你真的需要 native images 么?



## 参考

https://www.graalvm.org/

[GraalVM系列（一）：JVM的未来——GraalVM集成入门 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/148519037)

[原生构建工具 (graalvm.github.io)](https://graalvm.github.io/native-build-tools/latest/index.html)