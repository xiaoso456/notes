## 简介

Spring Retry是一个Spring框架提供的重试机制,用于处理容错和幂等操作

主要功能和特征：

- 定义重试策略：可以配置重试次数、重试等待时间、异常匹配规则等。
- 提供多种失败处理策略：抛出异常、忽略错误等。
- 支持方法和声明式事务重试。
- 支持同步和异步重试。



## 依赖

一般 JDK8 使用 1.x.x ，JDK17后可以使用2.x，此外还需要引入 aspects 依赖

```xml
        <dependency>
            <groupId>org.springframework.retry</groupId>
            <artifactId>spring-retry</artifactId>
            <version>1.3.2</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>5.2.8.RELEASE</version>
        </dependency>
```

## 快速开始

使用 `@EnableRetry`开启 retry 功能

```java
@SpringBootApplication
@EnableRetry
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}
```

接口实现类使用 `@Retryable` 注解，调用接口时会进行最多100次错误重试

```java
@Service
public class HelloServiceImpl implements HelloService {

    private static Random random = new Random();

    @Override
    @Retryable(value = RuntimeException.class,maxAttempts = 100)
    public void printHello() {
        int randomInt = random.nextInt(100);
        if (randomInt < 90) {
            System.out.println("发生网络错误");
            throw new RuntimeException("网络错误");
        }
        System.out.println("hello");
    }
}

```

## 声明式重试

声明式重试就是使用 `@Retryable` 注解，支持以下配置：

+ maxAttempts：最大重试次数
+ backoff：退避策略，例如每次重试延迟多久

```java
@Service
class Service {
    @Retryable(maxAttempts=12, backoff=@Backoff(delay=100, maxDelay=500))
    public service() {
        // ... do something
    }
}
```

+ recover ：恢复策略，达到最大重试次数后执行的执行的方法

  如下代码，重试1次仍然失败后，会执行 myRecover 方法，返回"系统恢复中"

```java

@Service
public class HelloServiceImpl implements HelloService {

    private static Random random = new Random();

    @Override
    @Retryable(value = RuntimeException.class, maxAttempts = 1)
    public String print(String message) {
        int randomInt = random.nextInt(100);
        if (randomInt < 90) {
            System.out.println("发生网络错误");
            throw new RuntimeException("网络错误");
        }
        return "ok";
    }

    @Recover
    private String myRecover(RuntimeException e, String message) {
        System.out.println("尝试恢复错误" + e + "message:" + message);
        return "系统恢复中";
    }
}

```

1.2 版本后支持条件表达式

```java

@Retryable(exceptionExpression="message.contains('this can be retried')")
public void service1() {
  ...
}

@Retryable(exceptionExpression="message.contains('this can be retried')")
public void service2() {
  ...
}

@Retryable(exceptionExpression="@exceptionChecker.shouldRetry(#root)",
    maxAttemptsExpression = "#{@integerFiveBean}",
  backoff = @Backoff(delayExpression = "#{1}", maxDelayExpression = "#{5}", multiplierExpression = "#{1.1}"))
public void service3() {
  ...
}
```



监听器 listener

监听器是其中一个重要扩展点，监听器侧重于在重试的生命周期扩展，需要实现 RetryListener 接口

```java
public interface RetryListener {

	/**
	 * Called before the first attempt in a retry. For instance, implementers can set up
	 * state that is needed by the policies in the {@link RetryOperations}. The whole
	 * retry can be vetoed by returning false from this method, in which case a
	 * {@link TerminatedRetryException} will be thrown.
	 * @param <T> the type of object returned by the callback
	 * @param <E> the type of exception it declares may be thrown
	 * @param context the current {@link RetryContext}.
	 * @param callback the current {@link RetryCallback}.
	 * @return true if the retry should proceed.
	 */
	<T, E extends Throwable> boolean open(RetryContext context, RetryCallback<T, E> callback);

	/**
	 * Called after the final attempt (successful or not). Allow the interceptor to clean
	 * up any resource it is holding before control returns to the retry caller.
	 * @param context the current {@link RetryContext}.
	 * @param callback the current {@link RetryCallback}.
	 * @param throwable the last exception that was thrown by the callback.
	 * @param <E> the exception type
	 * @param <T> the return value
	 */
	<T, E extends Throwable> void close(RetryContext context, RetryCallback<T, E> callback, Throwable throwable);

	/**
	 * Called after every unsuccessful attempt at a retry.
	 * @param context the current {@link RetryContext}.
	 * @param callback the current {@link RetryCallback}.
	 * @param throwable the last exception that was thrown by the callback.
	 * @param <T> the return value
	 * @param <E> the exception to throw
	 */
	<T, E extends Throwable> void onError(RetryContext context, RetryCallback<T, E> callback, Throwable throwable);

}

```



拦截器 Interceptor 侧重于在对行为进行增强和修改，需要实现 MethodInterceptor 接口

```java
@FunctionalInterface
public interface MethodInterceptor extends Interceptor {
    @Nullable
    Object invoke(@Nonnull MethodInvocation invocation) throws Throwable;
}

```



## 参考

[GitHub - spring-projects/spring-retry](https://github.com/spring-projects/spring-retry)

[Spring Retry中文文档 - CodeAntenna](https://codeantenna.com/a/rePGPJaTEL)