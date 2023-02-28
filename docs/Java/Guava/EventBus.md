## 简介

EventBus是一款基于观察者模式的事件总线库，用于组件之间通信，解耦程序。

wiki：[EventBus](https://github.com/google/guava/wiki/EventBusExplained)

不建议在生产环境使用EventBus，缺点如下：

+ 不支持背压
+ 不支持参数化类型
+ 不传播异常
+ 不提供多少监控能力
+ 性能感人

但是简单，能帮助快速理解发布订阅模型实现

## 快速开始

1. 新建LoginEvent.java，表示登陆事件

```java
@Data
@AllArgsConstructor
public class LoginEvent {
    private String username;
    private Boolean success;
}

```

2. 新建LogListener.java，表示监听器，监听时间并输出日志

```java
public class LogListener {

    @Subscribe
    public void handle(LoginEvent event){
        System.out.println("log:"+event);
    }
}

```

3. 新建Main.java，演示整个流程

```java
public class Main {
    public static void main(String[] args) {
        // 新建一个事件总线
        EventBus eventBus = new EventBus();

        // 注册一个监听器
        eventBus.register(new LogListener());

        // 发布一个事件，用户xiaoso登陆成功
        eventBus.post(new LoginEvent("xiaoso",true));

    }
}

```

4. 输出

```java
log:LoginEvent(username=xiaoso, success=true)
```





## 参考

[EventBusExplained · google/guava Wiki (github.com)](https://github.com/google/guava/wiki/EventBusExplained)