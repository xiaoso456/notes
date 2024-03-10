## 简介

单元测试的特点

+ 可重复执行
+ 不依赖外部环境
+ 不对数据产生影响
+ 配合断言使用
+ 一般需要配合 Mock 类框架

要进行的测试单元（方法）存在于外部依赖，例如:

+ db
+ http
+ redis
+ 文件

为了对该功能单元进行专注测试，需要对外部依赖进行模拟，即 mock，一般业务上对 service 层进行测试

### Mock 类框架

Java 常用的 Mock 框架：

+ mockitio

  限制：最新版本仍不能对 private 方法进行 mock

+ easymokc

+ powermock

  对 mockitio、easymock 的增强

## Mockito

mockito 通过修改字节码（使用 bytebuddy）方式

### 概念

模拟对象一般有两种：

+ mock 对象

  替换被模拟的对象，返回被模拟对象的默认值（我们给 mock 对象设置的）

  未插桩时，返回的是默认值

+ spy 对象

  spy 对象是一种特殊的 mock 对象。记录真实对象的调用信息

  未插桩时，调用的是真实方法

### 依赖

SpringBoot 场合，使用 Junit5 引入以下依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>


        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.junit.vintage</groupId>
            <artifactId>junit-vintage-engine</artifactId>
            <scope>test</scope>
        </dependency>
```

### 使用

#### 创建 mock 对象

方式一：使用 `@ExtendWith(MockitoExtension.class)` + `@Mock` 或 `@Spy` 注解

```java
@ExtendWith(MockitoExtension.class)
public class InitMockMethod {

    @Mock
    private UserService mockUserService;

    @Spy
    private UserService spyUserService;

    @Test
    public void testMock(){
        // 使用断言
        Assertions.assertTrue(Mockito.mockingDetails(mockUserService).isMock());
        Assertions.assertFalse(Mockito.mockingDetails(mockUserService).isSpy());

    }

    @Test
    public void testSpy(){
        Assertions.assertTrue(Mockito.mockingDetails(spyUserService).isMock());
        Assertions.assertTrue(Mockito.mockingDetails(spyUserService).isSpy());
    }

}
```

方式二：单元测试 init 时手动创建

```java
public class InitMockMethod2 {
    private UserService mockUserService;

    private UserService spyUserService;

    @BeforeEach
    public void init(){
        mockUserService = Mockito.mock(UserService.class);
        spyUserService = Mockito.spy(UserService.class);
    }

    @Test
    public void test(){
        // 使用断言
        Assertions.assertTrue(Mockito.mockingDetails(mockUserService).isMock());
        Assertions.assertFalse(Mockito.mockingDetails(mockUserService).isSpy());
        Assertions.assertTrue(Mockito.mockingDetails(spyUserService).isMock());
        Assertions.assertTrue(Mockito.mockingDetails(spyUserService).isSpy());
    }
}

```

方式三：使用 `MockitoAnnotations.openMocks()`+ `@Mock` 或 `@Spy` 注解

```java
public class InitMockMethod3 {
    @Mock
    private UserService mockUserService;

    @Spy
    private UserService spyUserService;

    @BeforeEach
    public void init(){
        // 根据测试类的注解生成
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void test(){
        // 使用断言
        Assertions.assertTrue(Mockito.mockingDetails(mockUserService).isMock());
        Assertions.assertFalse(Mockito.mockingDetails(mockUserService).isSpy());
        Assertions.assertTrue(Mockito.mockingDetails(spyUserService).isMock());
        Assertions.assertTrue(Mockito.mockingDetails(spyUserService).isSpy());

    }
}

```

#### 设置 Mock 对象测试桩

##### 设置固定值测试桩

```java
public class MethodMock {

    @Mock
    private UserService userService;

    @Test
    public void testMock(){

        // 插桩。让 mock 对象输入指定参数时，返回指定结果
        Mockito.doReturn(false).when(userService).addUser("xiaoso", 100);

        // 调用，这时候 mock 对象会返回上面设置的值
        boolean addOK = userService.addUser("xiaoso", 100);
        Assertions.assertFalse(addOK);

    }

    @Test
    public void testMock2(){

        // 插桩。让 mock 对象输入任意参数，返回指定结果

        Mockito.doReturn(false).when(userService).addUser(ArgumentMatchers.anyString(), ArgumentMatchers.anyInt());

        boolean addOK = userService.addUser("xiaoso", 100);
        Assertions.assertFalse(addOK);

        boolean addOK2 = userService.addUser(null, 1);
        Assertions.assertFalse(addOK2);

    }

    @Test
    public void testMock3(){
        // 验证 mock 对象指定参数的使用次数
        userService.addUser("xiaoso123",1);
        userService.addUser("xiaoso123",1);
        Mockito.verify(userService,Mockito.times(2)).addUser("xiaoso123", 1);

    }

    @Test
    public void testMock4(){
        // 无返回值（void）插桩

        Mockito.doNothing().when(userService).returnNothing();

        userService.returnNothing();
        // 用 verify 检查次数检查
        Mockito.verify(userService,Mockito.times(1)).returnNothing();

    }
}

```

##### 设置类型匹配器测试桩

多个参数入参时，最好都使用或者都不使用参数匹配器

```java
public class MethodMock {

    @Mock
    private UserService userService;


    @Test
    public void testMock2(){

        // 插桩。让 mock 对象输入任意参数，返回指定结果

        Mockito.doReturn(false).when(userService).addUser(ArgumentMatchers.anyString(), ArgumentMatchers.anyInt());

        boolean addOK = userService.addUser("xiaoso", 100);
        Assertions.assertFalse(addOK);

        boolean addOK2 = userService.addUser(null, 1);
        Assertions.assertFalse(addOK2);

    }

}

```

##### 返回值 Void 方法插桩

```java
@ExtendWith(MockitoExtension.class)
public class MethodMock {

    @Mock
    private UserService userService;

    @Test
    public void testMock4(){
        // 无返回值（void）插桩

        Mockito.doNothing().when(userService).returnNothing();

        userService.returnNothing();
        // 用 verify 检查次数检查
        Mockito.verify(userService,Mockito.times(1)).returnNothing();
    }
    
}

```

##### 设置抛出异常

```java
@ExtendWith(MockitoExtension.class)
public class ThrowError {

    @Mock
    private UserService mockUserService;


    @Test
    public void testThrow(){
        Mockito.doThrow(RuntimeException.class).when(mockUserService).addUser("xiaoso",123);
        try {
            mockUserService.addUser("xiaoso",123);
            Assertions.fail();
        }catch (Exception e){
            Assertions.assertTrue(e instanceof RuntimeException);
        }
    }
    
    @Test
    public void testThrow2(){
        Mockito.doThrow(RuntimeException.class).when(mockUserService).addUser("xiaoso",123);
        try {
            mockUserService.addUser("xiaoso",123);
            Assertions.fail();
        }catch (Exception e){
            Assertions.assertTrue(e instanceof RuntimeException);
        }
    }

}

```

##### 多次插桩

```java
@ExtendWith(MockitoExtension.class)
public class MultiStub {

    @Mock
    private List<String> mockList;


    @Test
    public void testMulti(){
        Mockito.doReturn("1").doReturn("2").doReturn("3")
                .when(mockList).get(1);

        Assertions.assertEquals("1",mockList.get(1));
        Assertions.assertEquals("2",mockList.get(1));
        Assertions.assertEquals("3",mockList.get(1));
        Assertions.assertEquals("3",mockList.get(1));

    }

}

```

##### 自定义插桩逻辑

使用 Answer 可以自定义插桩逻辑而非固定值

```java
@ExtendWith(MockitoExtension.class)
public class AnswerMethod {
    @Mock
    private List<String> mockList;

    @Test
    public void testAnswer() {
        Mockito.doAnswer(new Answer<String>() {
            @Override
            public String answer(InvocationOnMock invocationOnMock) throws Throwable {
                Integer arg0 = invocationOnMock.getArgument(0, Integer.class);
                return String.valueOf(arg0 * 10);
            }
        }).when(mockList).get(Mockito.anyInt());

        String result = mockList.get(3);
        Assertions.assertEquals("30", result);
    }

}

```

##### 使用真实方法

```java
@ExtendWith(MockitoExtension.class)
public class RawMethod {
    @Mock
    private UserServiceImpl userServiceImpl;

    @Test
    public void testRawMethod() {
        Mockito.doCallRealMethod().when(userServiceImpl).print(Mockito.anyString());
        String print = userServiceImpl.print("hello");
        Assertions.assertEquals("hello", print);
    }
}

```

#### 验证 mock 对象

##### 验证 mock 对象方法使用次数

```java
package demo.param;

import io.github.xiaoso456.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
public class MethodMock {

    @Mock
    private UserService userService;

    @Test
    public void testMock3(){
        // 验证 mock 对象指定参数的使用次数
        userService.addUser("xiaoso123",1);
        userService.addUser("xiaoso123",1);
        Mockito.verify(userService,Mockito.times(2)).addUser("xiaoso123", 1);

    }

}

```

##### 验证 mock 对象方法执行顺序

```java

@ExtendWith(MockitoExtension.class)
public class OrderVerify {

    @Mock
    private List<String> mockUserList;

    @Mock
    private List<String> mockUserList1;

    @Mock
    private List<String> mockUserList2;

    @Test
    public void testMock(){
        // 验证单个对象方法执行顺序
        mockUserList.add("user1");
        mockUserList.add("user2");

        InOrder inOrder = Mockito.inOrder(mockUserList);
        inOrder.verify(mockUserList).add("user1");
        inOrder.verify(mockUserList).add("user2");

    }

    @Test
    public void testMock2(){
        // 验证多个对象方法的执行顺序
        mockUserList1.add("user1");
        mockUserList2.add("user2");
        InOrder inOrder = Mockito.inOrder(mockUserList1,mockUserList2);
        inOrder.verify(mockUserList1).add("user1");
        inOrder.verify(mockUserList2).add("user2");
        

    }
```

#### 构造 Mock 对象两种结构

##### doXXX().when(mockObj).func() 结构

该结构适用于 mock 对象和 spy 对象

```java
@ExtendWith(MockitoExtension.class)
public class MethodMock2 {

    @Mock
    private List<String> mockList;

    @Test
    public void test1(){

        // 构造 mock 数据　方式一
        Mockito.doReturn("zero").when(mockList).get(0);
        Assertions.assertEquals("zero",mockList.get(0));

    }

}

```

##### when(mockObj.func()).thenXXX() 结构

该方法仅适用于 mock 对象，spy 对象使用该结构会调用原方法，因此不要使用

```java
@ExtendWith(MockitoExtension.class)
public class MethodMock2 {

    @Mock
    private List<String> mockList;
    
    @Test
    public void test2(){

        // 构造 mock 数据　方式二
        Mockito.when(mockList.get(1)).thenReturn("one");
        Assertions.assertEquals("one",mockList.get(1));

    }
}

```

#### 注入 Mock 对象

使用 @InjectMocks 会按类型或名字给指定对象注入 Mock 对象替代原对象

原理：构造器、setter、字段注入

```java
@ExtendWith(MockitoExtension.class)
public class InjectMock {

    // 注意：@InjectMocks 会将 @Mock 注解的对象注入到 @InjectMocks 对象里
    // 被注入的需要是实现类而不是接口
    // 使用 @Spy 可以让没有插桩的方法调用的是真实方法
    @InjectMocks
    @Spy
    private UserServiceImpl mockUserService;


    @Mock
    private UserMapper userMapper;


    @Test
    public void testAddUser2() {
        Mockito.doReturn(true).when(userMapper).addUser("xiaoso", 12);
        Mockito.doReturn(false).when(userMapper).addUser("xiaoso", 1234);

        boolean addOk = mockUserService.addUser2("xiaoso", 12);
        Assertions.assertEquals(true, addOk);

        boolean addOk2 = mockUserService.addUser2("xiaoso", 1234);
        Assertions.assertEquals(false, addOk2);


    }
}

```

#### 使用 SquareTest 生成

下载 idea 插件 squaretest，进入实现类点生成，然后跑下测试，如果报错了修改下就行

```java

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserMapper mockUserMapper;

    @InjectMocks
    private UserServiceImpl userServiceImplUnderTest;

    @Test
    void testAddUser() {
        assertThat(userServiceImplUnderTest.addUser("name", 0)).isFalse();
    }

    @Test
    void testReturnNothing() {
        userServiceImplUnderTest.returnNothing();
    }

    @Test
    void testPrint() {
        assertThat(userServiceImplUnderTest.print("message")).isEqualTo("message");
    }

    @Test
    void testAddUser2() {
        // Setup
        when(mockUserMapper.addUser("name", 0)).thenReturn(false);

        // Run the test
        final boolean result = userServiceImplUnderTest.addUser2("name", 0);

        // Verify the results
        assertThat(result).isFalse();
    }

    @Test
    void testAddUser2_UserMapperReturnsTrue() {
        // Setup
        when(mockUserMapper.addUser("name", 0)).thenReturn(true);

        // Run the test
        final boolean result = userServiceImplUnderTest.addUser2("name", 0);

        // Verify the results
        assertThat(result).isTrue();
    }
}

```

## 参考

【mockito 加 junit 搞定单元测试】https://www.bilibili.com/video/BV1P14y1k7Hi?vd_source=7afe3e053b68831c04c84b07482cb74d

[一文浅谈 Mockito 使用 | 京东云技术团队 - 掘金 (juejin.cn)](https://juejin.cn/post/7282245466707902525?searchId=20240309211019EDD1C5DB67F19BD70F4C)
