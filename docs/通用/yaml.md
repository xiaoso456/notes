## 简介

YAML 是一种人类容易读写的数据序列化格式，常用于配置文件、数据传输协议场景。

## 基本

基本规则如下：

- 使用缩进表示层级关系。
- 缩进时不允许使用 Tab 键，只允许使用空格。
- 缩进的空格数不重要，但同级元素必须左侧对齐。
- 大小写敏感。

支持三种数据结构：

- 对象：键值对的集合
- 数组：一组按次序排列的值
- 字面量：单个的、不可拆分的值

## 数据结构

### 字面量

字面量是指单个的，不可拆分的值，例如：数字、字符串、布尔值、以及日期等。

声明字面量如下方法如下，默认不需要双引号引用

```yaml
key: value
```

#### 常见类型

数值：无引号的整数或浮点数

布尔值：无引号的 `true` 和 `false`

空对象：无引号 `null`

#### 字符串

字符串分单行和多行表示

单行字符串用引号表示，引号内容有如下规则：

+ `"` （双引号）需要用 `\` 转义
+ 单引号 `'` 不需要转义

### 对象

对象有两种写法

+ 用层级结构表示对象

```yaml
website: 
  name: bianchengbang
  url: www.biancheng.net
```

+ 单行表示

```yaml
website: {name: bianchengbang,url: www.biancheng.net}
```

### 数组

数组有两种写法

+ 用 `-` 表示数组内元素

```yaml
pets:
  - dog
  - cat
  - pig
```

+ 单行表示

```yaml
pets: [dog,cat,pig]
```

## 控制

### 控制字符串末尾换行符

多行字符串以 `|` 开头表示，`|` 可以添加各种后缀控制输出的字符串

- `|` 字符串末尾有换行符，如果有多个空行就会合并成一个

```yaml
message: |
  hello
  world


message2:
```

对应的 json 如下

```json
{
	"message": "hello\nworld\n",
	"message2": null
}
```

- `|-` 忽略字符串末尾的换行

```yaml
message: |
  hello
  world


message2:
```

```json
{
	"message": "hello\nworld",
	"message2": null
}
```

- `|+` 保留所有的空白

```yaml
message: |
  hello
  world


message2:
```

```json
{
	"message": "hello\nworld\n\n\n",
	"message2": null
}
```

### 折叠多行字符串

使用 `>` 号可以拼接多行字符串，并用空格连接，`>` 可以组合 `+` 和 `-` 对末尾空行进行控制

```yaml
message: >
  i
  am
  cat
```

```json
{
	"message": "i am cat\n"
}
```

## 锚点

锚点和变量类似，用 `&` 声明变量，用 `*` 引用变量

```yaml
name: &var1 "xiaoso"
messageList: 
  - i am
  - *var1 
  - .
```

```json
{
	"name": "xiaoso",
	"messageList": [
		"i am",
		"xiaoso",
		"."
	]
}
```

## 参考

[YAML 教程（快速入门版） (biancheng.net)](http://c.biancheng.net/spring_boot/yaml.html)

[yaml 格式化 - Yoshiera の部屋 (gitee.io)](https://yoshiera.gitee.io/posts/miscellaneous/yaml/)

[在线 YAML 解析转换工具 在线小工具网站 (p2hp.com)](http://tool.p2hp.com/tool-format-yaml/)