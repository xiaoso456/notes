## 简介

Spring Expression Language (SpEL) 是 Spring Framework 中的一种表达式语言，可以用于在运行时计算表达式的值。 SpEL 支持基本的数学运算、调用方法、访问字段和本地变量、访问 Spring Bean 属性和调用 Bean 方法。

常用于：向 Bean 注入外部配置的属性、向 Bean 注入其他 Bean 的属性、条件装配 Bean等

## 快速开始

::: tip

文本示例基于 SpringBoot 注解方式，可自行了解 Spring XML 方式、编程方式

:::

1. 新建一个 SpringBoot 项目，引入 Lombok 依赖（可选，只是简化代码）
2. 创建 application.yml，内容如下：

```yaml
demo:
  user01:
    name: xiaoso
    age: 0
```

3. 新建类 User.java ，注册为 Spring bean

```java
@Data
@Component("user01")
public class User {

    @Value("${demo.user01.name}")
    private String name;

    @Value("#{ ${demo.user01.age} + 1}")
    private Integer age;

}

```

4. 新建 SpringBoot 测试类，添加如下代码

```java
@SpringBootTest
class DemoApplicationTests {

    @Autowired
    @Qualifier("user01")
    User user;

    @Test
    public void printUser01(){
        System.out.println(user);
    }
}
```

5. 打印结果如下

```
User(name=xiaoso, age=1)
```



## SpEL 结构

SpEL 运算表达式以 `#` 开头，内容在大括号中，格式为`#{表达式}`

外部文件属性引用以 `$` 开头，内容在大括号中，格式为 `${属性名}`

## spEL 基本运算

| 类型     | 操作类型                                     |
| -------- | -------------------------------------------- |
| 算数运算 | +, -, *, /, %, ^, div, mod                   |
| 关系运算 | <, >, ==, !=, <=, >=, lt, gt, eq, ne, le, ge |
| 逻辑运算 | and, or, not, &&, \|\|, !                    |
| 条件     | ?:                                           |
| 正则     | matches                                      |

### 算数运算

支持的操作类型包括 `+, -, *, /, %, ^, div, mod`

一些简单例子如下：

```java
@Value("#{19 + 1}") // 20
private double add; 

@Value("#{'String1 ' + 'string2'}") // "String1 string2"
private String addString; 
```

### 关系运算

关系运算支持 `<, >, ==, !=, <=, >=, lt, gt, eq, ne, le, ge`

```java
@Value("#{1 == 1}") // true
private boolean equal;

@Value("#{1 != 1}") // false
private boolean notEqual;
```

### 逻辑运算

逻辑运算支持 ` and, or, not, &&, ||, !`

```java
@Value("#{250 > 200 && 200 < 4000}") // true
private boolean and; 

@Value("#{!true}") // false
private boolean not;
```

### 条件

条件运算其实就是三元表达式，格式为 `条件 ? 值 A : 值 B`。当`条件`为逻辑 `true`时，取`值 A`，否则取`值 B` 。

```java
@Value("#{2 > 1 ? 'a' : 'b'}") // "a"
private String ternary;

@Value("#{someBean.someProperty != null ? someBean.someProperty : 'default'}")
private String ternary;
```

### 正则

支持 `match` 运算符，用于检查字符串和正则是否匹配

```java
@Value("#{'100' matches '\\d+' }") // true
private boolean validNumericStringResult;

@Value("#{'100fghdjf' matches '\\d+' }") // false
private boolean invalidNumericStringResult;
```

## SpEL 访问

spEL 可以访问集合、也可以访问的 Bean 的内容

### 集合

**引用整个集合**
::: tip

这部分是引用外部文件，不是 SpEL 内容，但和 SpEL 常做配合使用，故作介绍

:::
在 application.yaml 中加入如下内容：

```yaml
demo02:
  numList: 1,2,3
```

::: warning

在 yaml 文件中，list 可以写成如下形式，但 spring 不支持这种格式的 list 解析

```yaml
demo02:
  numList: 
    - 1
    - 2
    - 3
```

:::

```java
@Value("${demo02.numList}") // 1,2,3
private List<Integer> nums;
```

### Spring 上下文 Bean

#### 访问属性

注册一个 Bean

```java
@Component("myInfo")
@Data
public class Info {
    private List<Integer> list = new LinkedList<>();
    private Map<String,String> map = new HashMap<>();

    public Info() {
        list.add(1);
        list.add(2);

        map.put("name","xiaoso");
    }
}

```

::: warning

被引用 list、map 访问权限应为 public，或者有 getter 方法

:::

在别的 Bean 引用该 myInfo 这个 bean 的属性一些例子如下：

+ 引用整个 list

```java
@Value("#{myInfo.list}") // 1,2
private List<Integer> list;
```

+ 引用 list 下标为 1 的元素

```java
@Value("#{myInfo.list[1]}") // 2
private Integer numIndex1;
```

+ 引用 map 中，key 为 name 的 value

```java
@Value("#{myInfo.map['name']}") // xiaoso
private String name;
```



#### 调用方法

注册一个 Bean

```java
@Component("myInfo")
@Data
public class Info {
    private List<Integer> list = new LinkedList<>();

    public Info() {
        list.add(1);
        list.add(2);
    }

    public String getInfoTitle(){
        return "震惊！";
    }
}

```



调用属性 `list` 的`size()`方法

```java
@Value("#{myInfo.list.size()}") // 2
private Integer size;
```



调用 Bean `myInfo` 的 `getInfoTitle()` 方法

```java
@Value("#{myInfo.getInfoTitle()}") // 震惊！
private String title;
```



## 参考

[Spring Expression Language Guide | Baeldung](https://www.baeldung.com/spring-expression-language)