## 简介

GraalVM是一个基于Java虚拟机（JVM）的高性能跨语言运行时环境，可以在一个共同的运行时中支持许多编程语言，包括Java、Scala、Kotlin、Groovy、JavaScript等。

常用于：构建本机镜像、JVM语言调用Python、JavaScript等语言

本文示例可以在代码仓库找到：[xiaoso456/graalvm-demo (github.com)](https://github.com/xiaoso456/graalvm-demo)

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
- 冷启动快，以毫秒为单位启动
- 立即提供最佳性能，无需预热
- 可以打包到轻量级容器映像中，以实现快速高效的部署
- 减少攻击面

缺点：

+ 需要用到反射时，可能需要手动标记
+ 交叉编译糟糕，需要在哪个平台编译，在哪个平台运行
+ 编译成本机镜像慢，比编译成 jar 包慢十倍以上，编译需要占用大量内存

### 环境准备

安装 native-iamge 插件

```
gu install native-image
```

或者下载后离线安装:[Releases · graalvm/graalvm-ce-builds (github.com)](https://github.com/graalvm/graalvm-ce-builds/releases/)

```
gu install -L ./native-image-installable-svm-java17-linux-amd64-22.3.2.jar
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

注意 maven 版本不可过低，这里是用的是3.8.x

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

#### 反射支持和使用 native agent

默认情况下，graalVM会自动分析程序的反射使用，并生成反射配置

如果包含未能分析的反射，才需要手动配置,编写元数据文件，参考 [用于 GraalVM 原生映像构建的 Maven 插件](https://graalvm.github.io/native-build-tools/latest/maven-plugin.html#agent-support)

[使用跟踪代理收集元数据 (graalvm.org)](https://www.graalvm.org/latest/reference-manual/native-image/metadata/AutomaticMetadataCollection/#agent-advanced-usage)

### SpringBoot 应用构建 Native Images

需要 SpringBoot 3 

#### AOT 处理

本机镜像有一些限制：

+ 不支持类懒加载
+ 注解 @Profile 和一些用于配置文件的注解支持有限
+ 被创建 bean 的属性变更不支持，例如 `@ConditionalOnProperty` 和 `.enable` properties 配置文件

满足上面限制后，Spring 可以在构建时进行 AOT 处理，生成一些文件：

+ Java 源码

  通常是把 `@Component` 和 `@Bean` 注解转化为 BeanDefinition 和 工厂类获取实例的方法。以便于 GraalVM 识别

  生成的源码在 `target/spring-aot/main/sources` （Maven）或 `target/spring-aot/main/sources`（Gradle）找到

+ 字节码（动态代理用）

  主要是动态代理类

+ GraalVM JSON 提示文件：

  + 资源提示 （`resource-config.json`)
  + 反射提示 （`reflect-config.json`)
  + 序列化提示 （`serialization-config.json`)
  + Java 代理提示 （`proxy-config.json`)
  + JNI 提示 （`jni-config.json`)

  在 `target/spring-aot/main/sources ` 或 `target/spring-aot/main/sources` 可以找到

#### 构建 SpringBoot native images

以 maven 为例，pom需要包含以下内容

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.0</version>
</parent>

```

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.graalvm.buildtools</groupId>
            <artifactId>native-maven-plugin</artifactId>
        </plugin>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```



##### 构建 docker 镜像

需要环境安装了 docker，会生成一个 docker 镜像

```
mvn -Pnative spring-boot:build-image
```

##### 直接构建可执行文件

使用 maven 命令
```
mvn -Pnative native:compile
```

如果报一些奇怪的错误，尝试在配置里添加选项手动指定入口文件

#### SpringBoot 中标记反射资源

如果使用了反射和AOP，虽然能把 SpringBoot 应用编译成本机镜像，但是在调用时，就会抛出异常

如下，在 pom.xml 中引入 spring web 和 aop

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>        
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

新建 HelloController.java

```java
@RestController
@RequestMapping("/")
public class HelloController {

    @RequestMapping("/hello")
    public String hello(){
        return "hello";
    }
}
```

新建 HelloAop.java，对 HelloController 方法进行增强，在返回字符串内容末尾添加 `aop after`

```java
@Aspect
@Component
public class HelloAop {

    @Pointcut("execution(* com.github.xiaoso456.mavenspringbootnativeimage.controller.HelloController.*(..))")
    public void helloControllerAop(){}

    @Around("helloControllerAop()")
    public Object helloAround(ProceedingJoinPoint pjp) throws Throwable {
        Object result = pjp.proceed();
        if(result instanceof String resultString){
            resultString = resultString + "aop after";
            return resultString;
        }
        return result;
    }
}
```

这时如果不对该 `helloAround` 方法进行标记，访问 `/hello` 时就会报错

在SpringBoot中标记资源比较简单，新建一个 AopTip.java 实现 RuntimeHintsRegistrar 接口即可

```java
public class AopTip implements RuntimeHintsRegistrar {
    @Override
    public void registerHints(RuntimeHints hints, ClassLoader classLoader) {
        // 注册使用反射的方法
        Method method = ReflectionUtils.findMethod(com.github.xiaoso456.mavenspringbootnativeimage.aop.HelloAop.class, "helloAround", ProceedingJoinPoint.class);
        hints.reflection().registerMethod(method, ExecutableMode.INVOKE);

        // 注册反射的资源
        // hints.resources().registerPattern("my-resource.txt");

        // 注册序列化方法
        // hints.serialization().registerType(MySerializableClass.class);

        // 注册动态代理
        // hints.proxies().registerJdkProxy(MyInterface.class);
    }
}
```

然后在启动类或其他组件中使用注解标记这个类

```java
@ImportRuntimeHints(AopTip.class)
```

这时再编译，就能正常运行

### 你真的需要 native images 么?



## 参考

https://www.graalvm.org/

[GraalVM系列（一）：JVM的未来——GraalVM集成入门 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/148519037)

[原生构建工具 (graalvm.github.io)](https://graalvm.github.io/native-build-tools/latest/index.html)

[GraalVM 原生镜像支持 (spring.io)](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html#native-image.introducing-graalvm-native-images.understanding-aot-processing)