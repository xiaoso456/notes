## 简介

GIN是用Go语言编写的轻量级Web框架，快速高效。具备强大的路由和中间件支持，可处理各种HTTP请求和动态路由。

支持多种渲染格式和模板引擎，方便生成动态内容。提供错误处理和日志记录功能，可捕获错误并记录详细信息。

有丰富的中间件和插件生态系统，可轻松集成各种功能。GIN简单易用，适合构建高性能的后端服务。

## 安装

```sh
go get -u github.com/gin-gonic/gin
```



## 快速开始

### HelloWorld

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	// 创建一个路由
	router := gin.Default()

	// 定义路由处理
	router.GET("/hello", func(context *gin.Context) {
		context.String(200, "hello world")
	})
	// 启动并忽略异常
	_ = router.Run(":12000")
}

```

访问 `127.0.0.1:12000/hello` 即可看到结果

## 响应

### 响应视图和类型（JSON/XML）

响应可以直接返回结构体/Map/原始值

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func _json(c *gin.Context) {
	type User struct {
		UserName string `json:"user_name"` // 定义返回给前端的字段名为 user_name
		Age      int    `json:"age"`
		Password string `json:"-"` // - 表示不响应给前端
	}
	user := User{UserName: "xiaoso", Age: 0, Password: "123456"}
	c.JSON(http.StatusOK, user)
}

func _jsonMap(c *gin.Context) {
	responseMap := make(map[string]any)
	responseMap["user_name"] = "xiaoso"
	responseMap["age"] = 123

	c.JSON(http.StatusOK, responseMap)
}

func _jsonDirect(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"user_name": "hello",
	})
}

func _xml(c *gin.Context) {
	type User struct {
		UserName string `json:"user_name"` // 定义返回给前端的字段名为 user_name
		Age      int    `json:"age"`
		Password string `json:"-"` // - 表示不响应给前端
	}
	user := User{UserName: "xiaoso", Age: 0, Password: "123456"}
	c.XML(http.StatusOK, user)
}

func main() {
	// 获取路由
	router := gin.Default()

	// response json
	router.GET("/demo/jsonObject", _json)
	router.GET("/demo/jsonMap", _jsonMap)
	router.GET("/demo/jsonDirect", _jsonDirect)

	// response xml
	router.GET("/demo/xml", _xml)

	// 启动并忽略异常
	_ = router.Run(":12000")
}

```

### 响应 html

新建 templates 文件夹，并在文件夹下新建 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
username :{{.username }}
</body>
</html>
```

新建 3.html.go

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func _html(c *gin.Context) {
	// 使用 index.html 模板，并填入变量
	c.HTML(http.StatusOK, "index.html", gin.H{"username": "xiaoso"})
}

func main() {
	// 获取路由
	router := gin.Default()

	// 加载指定目录所有模板文件
	router.LoadHTMLGlob("templates/*")
	// response html
	router.GET("/demo/html", _html)

	// 启动并忽略异常
	_ = router.Run(":12000")
}

```

### 响应静态文件

1. 新建 static 文件夹，放入一张图片 1.png
2.  新建 4.static.go

```go
package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	// 获取路由
	router := gin.Default()

	// 访问 /1 会返回 static文件夹1.png文件
	router.StaticFile("/1", "static/1.png")

	// 访问 /static/*，会访问static/static/* 文件
	router.StaticFS("/static", http.Dir("./static"))

	// 启动并忽略异常
	_ = router.Run(":12000")
}

```

访问 `http://127.0.0.1:12000/1`  或 `http://127.0.0.1:12000/static/1.png` 可以访问到图片

### 重定向

```go
package main

import (
	"github.com/gin-gonic/gin"
)

func _redirect(context *gin.Context) {
	// 301 跳转
	context.Redirect(301, "https://www.baidu.com")
}

func main() {
	// 获取路由
	router := gin.Default()

	router.GET("/baidu", _redirect)

	// 启动并忽略异常
	_ = router.Run(":12000")
}

```

注意 301 是永久重定向，302 是临时重定向

## 请求

还支持原始参数，Json等等

### 查询

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	router := gin.Default()
	router.GET("/query", _query)
	_ = router.Run(":12000")
}

func _query(context *gin.Context) {
	query, exist := context.GetQuery("user")
	if exist {
		context.String(200, query)
	} else {
		context.String(400, "null")
	}

}
```

访问 [localhost:12000/query?user=1](http://localhost:12000/query?user=1)

### 路径参数

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	router := gin.Default()
	// 路径参数(动态参数)
	router.GET("/user/:user_id", _param)
	_ = router.Run(":12000")
}

func _param(context *gin.Context) {
	userId := context.Param("user_id")

	context.String(200, userId)
}


```

访问：[localhost:12000/user/123](http://localhost:12000/user/123)

### 表单参数

```go

func main() {
	router := gin.Default()

	router.POST("/postform", _postform)
	_ = router.Run(":12000")
}

func _postform(context *gin.Context) {
	value := context.PostForm("name")
	context.String(200, value)
}
```



## 参考

https://www.bilibili.com/video/BV1s24y1k7pv