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
### 同步任务
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
        System.out.println(Thread.currentThread()+",log:"+event);
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

```
Thread[main,5,main],log:LoginEvent(username=xiaoso, success=true)
```

### 异步任务

只需要修改同步中的3中的代码
```java
    public static void main(String[] args) {
        // 新建一个线程池，核心线程数/最大线程数为2
        ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(2, 2, 60, TimeUnit.SECONDS, new LinkedBlockingDeque<Runnable>(32));
        // 新建一个异步事件总线
        AsyncEventBus eventBus = new AsyncEventBus(poolExecutor);

        // 注册监听器
        eventBus.register(new LogListener());
        eventBus.register(new LogListener());
        eventBus.register(new LogListener());

        // 发布一个事件，用户xiaoso登陆成功
        eventBus.post(new LoginEvent("xiaoso",true));
        poolExecutor.shutdown();

    }
```

观察输出
```
Thread[pool-1-thread-1,5,main],log:LoginEvent(username=xiaoso, success=true)
Thread[pool-1-thread-1,5,main],log:LoginEvent(username=xiaoso, success=true)
Thread[pool-1-thread-2,5,main],log:LoginEvent(username=xiaoso, success=true)
```
## 参考

[EventBusExplained · google/guava Wiki (github.com)](https://github.com/google/guava/wiki/EventBusExplained)