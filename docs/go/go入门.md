## 简介

Go 是一种由 Google 开发的编程语言，具有静态类型、高效、可移植性强等特点，适用于开发网络应用、分布式系统、云计算等领域。它支持并发编程、自动垃圾回收等特性，代码简洁易懂，易于维护和扩展。

## 快速上手

### 下载安装

官网下载：https://golang.google.cn/dl/

### 配置环境

配置环境，使用模块和代理

代理配置方法：[七牛云 - Goproxy.cn](https://goproxy.cn/)

Windows PowerShell 下配置：

```powershell
$env:GO111MODULE = "on"
$env:GOPROXY = "https://goproxy.cn"
```

### 安装 Git

[Git - Downloads (git-scm.com)](https://git-scm.com/downloads)

### 第一个程序 hello

新建 go.mod

```go
module goland_learn
go 1.20
```

新建 hello.go

```go
package main

import "fmt"

func main() {
	fmt.Println("hello")
}

```

编译构建

```go
go build .\hello.go
或者
go build
```

运行可执行文件



## 常用说明

go 项目管理工具：

+ GOPATH：保存了应用自身的代码和第三方依赖的代码，需要设置 GOPATH 到本地的某个目录，已废弃

+ GO Module：推荐的项目方式

包：文件夹，一个包会有多个模块或者子包

模块：.go 源文件

## 常用命令

构建

```go
go build xxx.go
```

编译并运行

```
go run xxx.go
```

运行测试

```
go test
```



清除对象

```
go clean
```

帮助

```
go help
```

打印运行环境

```
go env
```

下载并安装包和依赖

```
go get 包
```

编译并安装包和依赖

```
go install
```

使用 module 方式初始化项目,会生成 go.mod 文件

```
go mod init 项目名
```

## 规范

### 命名规范

变量、常量、全局函数、结构、接口、方法

1. 需要对外暴露的（public），以大写字母开头
2. 不需要对外暴露的，以小写字母开头



#### 包命名

1. package 和目录名保持一致，应该只含小写

```go
package dao
package service
```

#### 文件命名

1. 小写单词，并以下划线分割

```go
customer_dao.go
```

#### 结构体命名

驼峰命名，首字母根据访问控制大写或小写

```go
type CustomerOrder struct{
    Name string
    Address string
}
```

#### 接口命名

驼峰命名，首字母根据访问控制大写或小写

单个函数的结构名以 `er` 作为后缀

```go
type Reader interface{
    Read(p []byte)(n int,err error)
}
```

#### 变量命名

驼峰命名，首字母根据访问控制大写或小写，如果是 bool 类型，以`Has/has`、`is/Is`、`can/Can`、`Allow/allow`开头

### 单元测试

单元测试命名规范为 `example_test.go`，函数名以 `Test` 开头

### 错误处理

以上内容概括了以下错误处理的原则：

1. 不要丢弃任何有返回错误的调用，必须全部处理。不要使用 `_` 来忽略错误。
2. 接收到错误时，要么返回错误，要么使用日志记录下来，并尽早返回。尽量不要使用 `panic`，除非你知道你在做什么。
3. 错误描述如果是英文，必须为小写，不需要标点结尾。
4. 采用独立的错误流进行处理，而不要将错误信息与正常输出混在一起

## 语法

### 标识符规则

1. 标识符由数字、字母和下划线`_`组成
2. 只能以字母和下划线`_`开头
3. 标识符区分大小写

### 变量

变量定义语法，go 的变量声明后必须使用

```go
var 变量名 type
```

```go
var name string
var age int
```



批量声明

```go
var(
    name string
    age int
)
```



类型推断根据初始化值省略类型

```go
var name = "aaa"
```



短变量声明

只能用在函数内部

```go
name := "myName"
```



匿名变量
如果接受到多个变量，有一些变量使用不到，可以用 `_`表示变量名

```go
func getNameAndAge() (string, int) {
	return "xiaoso", 0
}
func main() {
	name, _ := getNameAndAge()
	fmt.Printf("name:%v\n", name)
}

```

### 常量

定义常量

```go
const 常量名 [类型 ] = value
```

```go
const PI float64 = 3.14
const (
    width  = 100
    height = 200
)
const i, j = 1, 2
```



可被编译器修改的常量 `itoa`

默认是 0，每调用一次加 1，遇到 const 关键字被重置为 0，可以使用 `_`跳过某些值，如果遇到其他变量声明，也是跳过某些值

```go
const(
	a1 = iota //0 
    a2 = iota //1
    _
    a3 = iota //3
)
```

### 数据类型

变量类型

| 类型       | 描述                                             |
| ---------- | ------------------------------------------------ |
| bool       | 布尔类型，true 或 false                          |
| string     | 字符串类型，表示一串字符                         |
| int        | 有符号整型，表示整数，在 32 位和 64 位系统取对应长度 |
| uint       | 无符号整型，表示非负整数                         |
| uintptr    | 无符号整型，用于存储指针地址                     |
| byte       | 无符号整型，表示字符类型的单个字节，等同于 uint8 |
| rune       | 整型，表示 Unicode 码点，等同于 int32            |
| float32    | 单精度浮点数                                     |
| float64    | 双精度浮点数                                     |
| complex64  | 包含两个 32 位浮点数的复数类型                   |
| complex128 | 包含两个 64 位浮点数的复数类型                   |
| array      | 固定长度数组，包含相同类型的元素                 |
| slice      | 动态长度数组，可以动态添加元素                   |
| map        | 键值对集合，用于存储无序数据                     |
| struct     | 结构体，可以存储不同类型的字段                   |
| interface  | 接口类型，表示方法的集合                         |
| func       | 函数类型，可以作为函数参数和返回值类型           |
| channel    | 通道类型，用于协程间通信                         |

注意：uintptr 类型一般不应该直接使用，除非需要和指针相关的操作。在使用指针时，应该优先考虑使用指针类型，而不是 uintptr 类型。



int 取决于操作系统长度，如果要操作系统无关，可以使用类似如下

+ int8、int16、int32、int64
+ uint8、uint16、uint32、uint64



定义数组

```go
a := [3]int {1,2,3}
```



### 切片

切片就是动态数组

```
a := []int {1,2,3}
```

```go
a := make([]int,3)
```



### Map

```go
m1 := map[string]string{}
// 或 make(map[string]string)
m1["key1"] = "value1"
```

遍历

```go
for k, v := range m1 {
    fmt.Printf("key:%v value:%v", k, v)
}
```

### 函数

函数可以有多个返回值

函数分为普通函数、匿名函数、方法（结构体中定义的函数）

函数返回值可以命名

```go
func sum(a int,b int)(ret int){
    ret = a+b
    return ret
}
```



变长参数
```go
func sum(args ...int){

}
```



函数可以作为一个类型

如下定义了一个叫 fun 的函数类型，接受 2 个入参，1 和返回值

```go
type fun func(int ,int) int
func get1(a int,b int){
    return 1
}

func get2(a int,b int){
    return 2
}
// 定义一个函数指向 get1 函数
var f fun = get1


```



函数可以作为一个参数

```go
func sayHello(name string){
    fmt.Printf("Hello %s",name)
}
func f1(name string, f func(string)){
    f(name)
}

func main(){
    f1("tom",sayHello)
}
```



函数可以作为返回值

```go
func cal(s string) func(int,int) int{
    // 省略
}
```



匿名函数

```go
func main(){
    max := func(a int,b int) int{
        if a > b{
            return a
        } else{
            return b
        }
    }
    
}
```

### 闭包

闭包：定义在一个函数内部的函数

个人理解：可以直接当成一个类用，x 就是类实例变量，调用 add 方法时，就生成一个实例

```go
package main

import "fmt"

func add() func(int) int {
	var x int
	return func(y int) int {
		x += y
		return x
	}
}

func main() {
	var f = add()
	fmt.Println(f(10)) // 10
	fmt.Println(f(20)) // 30
	fmt.Println(f(30)) // 60
	f1 := add()
	fmt.Println(f1(40)) // 40
	fmt.Println(f1(50)) // 90

}
```

### 方法

Go 中的方法，是一种特殊的函数，定义于 struct 之上，和 struct 绑定，被称为 struct 的接收者（receiver）

例子如下

```go
type Person struct {
	name string
}

func (per Person) eat() {
	fmt.Println(per.name + "吃饭")
}

// 需要是指针类型，否则传递的是值的副本
func (per *Person) changeName() {
	per.name = "newName"
}

func main() {
	person := Person{name: "xiaoso"}
	person.eat()
    person.changeName()
    person.eat()
}
```

接收者类型不一定需要是 struct，可以是 slice、map、channel 等类型

如果接收者是一个指针类型，则自动解除引用

### 接口

接口用于定义具有通用性的方法

```go
type my_interface interface{
    method1 [return_type]
    method2 [return_type]
    method3 [return_type]
}
```

```go
package main

type USB interface {
	read()
	write()
}

type Mobile struct {
}

// 实现接口
func (c Mobile) read() {

}
func (c Mobile) write() {

}

func writeIt(device USB) {
	device.write()
}
func main() {
	var myMobile USB = Mobile{}
	writeIt(myMobile)
}

```



组合接口
```go
type Filyer interface{
    fly()
}

type Swimmer interface{
    swim()
}

type Fish interface{
    Filyer
    Swimmer
}
```

### 继承

```go
type Animal struct {
}

func (animal Animal) say() {
	fmt.Println("hi")
}

type Cat struct {
    // 注意没名称
	Animal
}

func main() {
	myCat := Cat{Animal{}}
	myCat.say()
}

```

## 并发

### go 和 channel

go 可以开启一个协程，如果主进程结束，协程也会退出

```go
go myFunc()
```



channel 用于在 goroutine 之间共享数据

```go
unBuffered := make(chan int) // int 无缓冲通道，发送接收会阻塞
bufferd := make(chan int,10) // 大小为 1int 有缓冲通道
```

将值发送到通道

```go
chan1 := make(chan string,5)
chan1 <- "Australia" // 通过通道发送字符串
```

从通道接受值

```
data := <- chan1

data,ok := <- chan1 // 是否读取到值

```



close 可以关闭通道，关闭后，读通道，会读取到读默认值

```go
close(chan1)
```

通道要及时关闭，否则容易出现死锁

### WaitGroup

WaitGroup 用于阻塞等待

```go
var wg sync.WaitGroup

func hello(i int) {
	defer wg.Done() // -1
	fmt.Println("hello goroutine ", i)
}

func main() {
	for i := 0; i < 10; i++ {
		wg.Add(1) // wg 组 +1
		go hello(i)
	}
	wg.Wait() // 等带所有协程执行完毕,也就是 wg=0 时
}

```

### runtime 包

```go
runtime.Goshed() // 让出 CPU 时间片，重新等待安排任务
```



```go
runtime.Goexit() // 退出当前协程
```



```go
runtime.NumCPU() // 查看 cpi 核心数
runtime.GOMAXPROCS(2) // 设置协程核心数
```

### mutex 锁

```go
var lock sync.Mutex

lock.Lock() // 加锁
lock.Unlock() // 解锁
```

### select switch

select 是 Go 中一个控制结构，用于处理异步 IO 操作，select 会监听 case 语句的 channel 读写操作，当 case 中的 channel 读写操作为非阻塞状态时，会触发对应动作

1. default 总是可运行的
2. case 语句必须是一个 channel 操作
3. 如果有多个可运行 case，会公平地选出一个执行
4. 如果没有可运行 case，有 default，会执行 default
5. 如果没有可运行 case，没有 default，会阻塞 select，直到某个 case 通信可运行

```go
go func(){
    chanInt <- 100
    
}
```

### Timer

Timer 可以实现一些定时操作

```go
timer1 := time.NewTimer(time.Second * 1)
t1 := time.Now()
fmt.Printf("t1:%v\n", t1)

// <-timer1.C 会等待到创建计时器后 time.Second * 1 时间
t2 := <-timer1.C
fmt.Printf("t2:%v\n", t2)

// 再等待 1s
<-time.After(time.Second * 1)
```



取消

```go
timer1 := timer.NewTimer(time.Second)

go func(){
    <-timer1.C
    fmt.Println("Timer 1 expired")
}()

stop := timer1.Stop() // 停止定时器,对应方法不再执行
```



还有 reset 之类的方法

### Ticker

Timer 只执行一次，Ticker 是周期性执行

```go
ticker := time.NewTicker(time.Second)

counter := 1
for _ = range ticker.C {
    fmt.PrintLn("ticker")
    counter ++
    if couter >= 5{
        ticker.Stop()
        break
    }
}
```

### atomic

原子增加

```go
var i int32 = 100
func add(){
    atomic.AddInt32(&i,i)
}
```

原子读写，go 在读变量的时候，读一般可能会被中断

```go
atomic.LoadInt32(&i)
atomic.StoreInt32(&i,200)
```

cas

```go
ok := atomic.CompareAndSwapInt32(&i,100,200)
```



## 包管理

包管理现在常使用 go module



初始化模块

```go
go mod init <项目模块名>
go mod init xiaoso/testmod
```

依赖关系处理，根据 go.mod 文件

```go
go mod tidy
```

将依赖包复制到项目下的 vendor 目录

```go
go mod vendor
```

显示依赖关系

```go
go list -m all
```

显示详细依赖关系

```go
go list -m -json all
```

下载依赖

```go
go mod download [path@version]
```



## 参考

https://www.bilibili.com/video/BV1zR4y1t7Wj