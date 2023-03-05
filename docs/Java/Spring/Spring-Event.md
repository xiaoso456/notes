## 简介

Spring Event 功能主要为开发者提供了一套用于处理事件的统一框架，可以在应用程序中接受和发布事件，从而实现应用的组件之间的解耦

## 说明

Spring Framework 4.2 前：事件类应继承 ApplicationEvent

Spring Framework 4.2 后：任意对象都可作为事件发布，但会缺少一些特性

事件发布应通过 ApplicationEventPublisher对象发布

事件监听应实现  ApplicationListener 接口

## 快速开始

1. 新建一个 SpringBoot 项目
2. 新建一个事件类

```java
public class CustomSpringEvent extends ApplicationEvent {
    private String message;

    public CustomSpringEvent(Object source, String message) {
        super(source);
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
}
```

3. 创建一个事件监听器，监听这个事件

```java
@Component
public class CustomSpringEventListener implements ApplicationListener<CustomSpringEvent> {
    @Override
    public void onApplicationEvent(CustomSpringEvent event) {
        System.out.println(Thread.currentThread()+"-收到自定义事件：" + event.getMessage());
    }
}
```

4. 发布事件进行测试

```java
@SpringBootTest
class SpringEventDemoApplicationTests {

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;


    @Test
    void testPublishEvent(){
        CustomSpringEvent event = new CustomSpringEvent(this, "hello");
        applicationEventPublisher.publishEvent(event);
    }
}

```

5. 观察结果

```java
Thread[main,5,main]-收到自定义事件：hello
```

## 使用

### 基于注解注册事件监听器

可以使用基于注解的方式注册事件监听器，该注解作用于 public 方法上

```java
@Component
public class CustomSpringEventListener  {

    @EventListener
    public void handle(CustomSpringEvent event){
        System.out.println(Thread.currentThread() + "-收到自定义事件：" + event.getMessage());
    }
}
```

也可以监听多个事件

```java
@EventListener(classes = { ContextStartedEvent.class, ContextStoppedEvent.class })
public void handleMultipleEvents() {
    System.out.println("Multi-event listener invoked");
}
```



### 异步事件

#### 类的异步事件

参考快速开始中同步事件的事件、事件监听器、发布事件，只需要新增一个配置类，定义事件发布器

```java
@Configuration
public class AsynchronousSpringEventsConfig {
    
    @Bean(name = "applicationEventMulticaster")
    public ApplicationEventMulticaster simpleApplicationEventMulticaster() {
        SimpleApplicationEventMulticaster eventMulticaster =
          new SimpleApplicationEventMulticaster();
        
        eventMulticaster.setTaskExecutor(new SimpleAsyncTaskExecutor());
        return eventMulticaster;
    }
}
```

这个SimpleApplicationEventMulticaster事件发布器采用线程池的方式调用监听器，因此执行过程是异步的。

执行结果如下：

```
Thread[SimpleAsyncTaskExecutor-17,5,main]-收到自定义事件：hello
```

#### 基于方法的异步事件

首先开启异步支持 `@EnableAsync`，在方法上加入 `@Async`

```java
@Component
@EnableAsync
public class CustomSpringEventListener  {

    @EventListener
    @Async
    public void handle(CustomSpringEvent event){
        System.out.println(Thread.currentThread()+"-收到自定义事件：" + event.getMessage());
    }

}
```

观察输出

```java
Thread[task-1,5,main]-收到自定义事件：hello
```

### 监听 Spring 中的事件

Spring本身也会有很多事件，如ContextRefreshedEvent、ContextStartedEvent、RequestHandledEvent等，不作更多介绍

### 泛型事件

1. 创建一个泛型事件

```java
public class GenericSpringEvent<T> {
    private T what;
    protected boolean success;

    public GenericSpringEvent(T what, boolean success) {
        this.what = what;
        this.success = success;
    }

}
```

2. 创建监听器

```java
@Component
public class GenericSpringEventListener 
  implements ApplicationListener<GenericSpringEvent<String>> {
    @Override
    public void onApplicationEvent(@NonNull GenericSpringEvent<String> event) {
        System.out.println("Received spring generic event - " + event.getWhat());
    }
}
```

也可以使用 @EventListener 注解定义监听器，并使用 SpEL 表达式有条件地过滤事件

```java
@Component
public class AnnotationDrivenEventListener {
    @EventListener(condition = "#event.success")
    public void handleSuccessful(GenericSpringEvent<String> event) {
        System.out.println("Handling generic event (conditional).");
    }
}
```

### 绑定到事务事件

`@TransactionalEventListener` 是 `@EventListener` 的扩展，允许将事件监听器绑定到事务各个阶段

如下，将事件绑定到事务提交前

```java
@TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
public void handleCustom(CustomSpringEvent event) {
    System.out.println("Handling event inside a transaction BEFORE COMMIT.");
}
```

支持以下几种事务阶段：

- *AFTER_COMMIT*（默认值）用于在事务成功完成时触发事件
- *AFTER_ROLLBACK* – 如果事务已回滚
- *AFTER_COMPLETION* – 事务是否已完成（*AFTER_COMMIT*和*AFTER_ROLLBACK*的别名)
- *BEFORE_COMMIT*用于在事务提交之前触发事件

## 参考

[Spring Events | Baeldung](https://www.baeldung.com/spring-events)