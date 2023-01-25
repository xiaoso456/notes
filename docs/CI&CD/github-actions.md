---
lang: zh-CN
title: GitHub-Actions
description: GitHub-Actions简明文档
author: 'xiaoso'
---
## 简介

本文档只介绍 GitHub Actions 一些基本操作，提供一些简单例子。

参考 [GitHub Actions文档 - GitHub Docs](https://docs.github.com/zh/actions)

示例代码仓库 [xiao-so/github-actions-demo](https://github.com/xiao-so/github-actions-demo)

## 快速开始

1. 创建 `.github/workflows` 目录
2. 在目录下创建一个 `github-actions-demo.yml` 文件
3. 修改文件内容
```yaml{2}
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v3
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."
```
4. 提交文件，推送到远程分支 quick-start

    可以在项目 Actions 里找到如下标题的信息，其中 `${{ github.actor }}` 被替换为 `xiaoso-so`

    > xiao-so is testing out GitHub Actions 🚀

    点击可以查看更详细的执行结果

## 基础知识

### GitHub Actions 是什么

GitHub Actions 是一种持续集成和持续交付 (CI/CD) 平台，可用于自动执行生成、测试和部署。

### GitHub Actions 的组件

![工作流概述](./assets/overview-actions-simple.png)

Event：什么时候触发 GitHub Actions 工作流，例如 Push 代码、手动触发。

Runner：执行 Job 的程序，运行器。

Job：执行操作的集合，包含一个或多个 Step。Job 之间可以是串行或者并行的。

Step：步骤，同一个Job的步骤按顺序执行，共享运行器的数据，常见有执行一段命令、运行`shell`脚本、执行一个 `action` 等。

action：用于 GitHub Actions 平台自定义的应用程序，常用于执行复杂重复的工作，例如从 GitHub 拉取代码，安装 Node.js 环境。

workflow：在 `./github/workflows` 的每一个文件为一个 workflow。

### 了解 GitHub  Actions 文件

> 分支：demo-action
>
> [demo-action](https://github.com/xiao-so/github-actions-demo/tree/demo-action)

GitHub  Actions 文件采用 YAML 语法，文件存放在代码仓库 `.github/workflows/` 文件夹下，可以有任意多个。

```{3}
├─.github
│  └─workflows
│          docs.yml
```

一份简单的文件示例如下，其中 demo-job 的 job 做了三件事：

1. checkout 当前仓库最新的代码
2. 列出仓库的文件
3. 执行 `echo 'finish'`命令，输出 finish 文本

```yaml
# 工作流的名称
name: demo-action

# 工作流运行的名称
run-name: ${{ github.actor }} run the demo-job 

# 工作流触发时机
on:
  # 每当 push 到 demo-job 分支时触发部署
  push:
    branches: [demo-job]
  # 手动触发部署
  workflow_dispatch:

# 定义 jobs
jobs:
  # 定义名为 demo-job 的 job
  demo-job:
    # 运行器使用的环境，此处为 ubuntu
    runs-on: ubuntu-latest
    # 定义执行的 steps 
    steps:
      # 这个 step 为 checkout 当前仓库的代码, name 为 step 名，可选
      # 使用(uses) https://github.com/actions/checkout 下打了 v3 tag的 action
      - name: Check out repository code
        uses: actions/checkout@v3
        # with 后面输入 action 需要的参数，这里表示最新的代码
        with:
          fetch-depth: 0
      - name: List files in the repository
        run: ls ${{ github.workspace }}
      # 输出 finish
      - run: echo "finish"
```

## 基础操作

### 设置触发时机

常见触发时机有以下几种：

+ push：推送代码到远程仓库

+ workflow_dispatch：手动触发

+ schedule：计划任务，在指定时间触发，支持 cron 表达式

  ::: warning 注意
  GitHub Actions 提供的执行器环境的时间，可能和你 PC 时间不一致
  :::

```yaml
# 工作流触发时机
on:
  # 每当 push 到 demo-job 分支时触发部署
  push:
    branches: [demo-job]
  # 手动触发部署
  workflow_dispatch:
  # 定时任务
  schedule:
  	# 每周一到四，5:30 UTC 时触发
    - cron: '30 5 * * 1,3'
    - cron: '30 5 * * 2,4'
```



### 使用 Actions

使用已经定义好的 Actions 可以省去大量写脚本的时间，只需要输入一些简单参数就可以完成 checkout 仓库代码、安装 Java 环境等操作。

例如，在 [了解 GitHub  Actions 文件](/CI&CD/github-actions.md#了解-github-actions-文件) 中， name 为 `Check out repository code` 的 step 使用了 `actions/checkout@v3` 这个 actions 来帮助 checkout 当前仓库的代码，省去了写大量脚本的功夫。

#### 从市场中获取 Actions

可以在 [GitHub Marketplace](https://github.com/marketplace?type=actions) 找到更多的 Actions 来找简化部署 YAML 文件。

此外，支持从同一仓库、其他仓库中引入 Actions，支持从 Docker Hub 上引用容器，如何自定义和使用自定义 Actions，请参考 [Finding and customizing actions - GitHub Docs](https://docs.github.com/en/actions/learn-github-actions/finding-and-customizing-actions)。

#### Actions 的基本使用

```yaml{6-10}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Set up JDK 1.8
        uses: actions/setup-java@v2
        with:
          java-version: '8'
          cache: 'maven'
          distribution: 'temurin'
```

如上，使用了托管在 GitHub 的 actions `actions/setup-java@v2` ，帮我们在环境上安装了 JDK1.8+Maven。

仓库地址为 `https://github.com/`+`actions/setup-java`，使用的版本为 `v2`，并用 `with` 传入 `java-version`、`cache`、`distribution` 三个参数。

### 变量

#### 命名约定

以下规则适用于配置变量名称：

- 名称只能包含字母数字字符（`[a-z]`、`[A-Z]`、`[0-9]`）或下划线 (`_`)。 不允许空格。
- 名称不能以 `GITHUB_` 前缀开头。
- 名称不能以数字开头。
- 名称不区分大小写。
- 名称在所创建的级别上必须是唯一的。

#### 定义环境变量

单个 workflow 文件的工作流使用 `env` 键对变量进行定义，作用域有如下几种：

+  单个 workflow：在 workflow 文件顶层定义
+ 单个 job：在 job 下定义
+ 单个 step：在 step 下定义

示例文件如下：

```yaml{4-5,9-10,14-15}
name: Greeting on variable day
on:
  workflow_dispatch
env:
  DAY_OF_WEEK: Monday
jobs:
  greeting_job:
    runs-on: ubuntu-latest
    env:
      Greeting: Hello
    steps:
      - name: "Say Hello Mona it's Monday"
        run: echo "$Greeting $First_Name. Today is $DAY_OF_WEEK!"
        env:
          First_Name: Mona
```

::: tip 提示
这里只介绍为单个 workflow 定义变量，在表达式中，通常以 `${{ env.NAME }}`方式引用。

如果需要在组织、仓库、环境级别定义变量，请参考  [为多个工作流定义配置变量](https://docs.github.com/zh/actions/learn-github-actions/variables#defining-configuration-variables-for-a-multiple-workflows)
:::

::: warning 警告
不要在 workflow 变量里直接定义敏感信息（如密码），默认情况下变量在输出中会以明文方式呈现。
如果需要定义敏感信息，请参考 [加密机密](https://docs.github.com/zh/actions/security-guides/encrypted-secrets)
:::

#### 使用环境变量

```yaml{13-14}
name: Greeting on variable day
on:
  workflow_dispatch
env:
  DAY_OF_WEEK: Monday
jobs:
  greeting_job:
    runs-on: ubuntu-latest
    env:
      Greeting: Hello
    steps:
      - name: "Say Hello Mona it's Monday"
        if: ${{ env.DAY_OF_WEEK == 'Monday' }}
        run: echo "$Greeting $First_Name. Today is $DAY_OF_WEEK!"
        env:
          First_Name: Mona
```
可以使用运行器环境变量或上下文访问 `env` 变量值

在脚本中使用语法如下：

+ Linux 环境：Linux 系统环境使用 bash shell，语法为 `$NAME`
+ Windows 环境：Windows系统环境使用 PowerShell，语法为 `$env:NAME`

也可以在上下文中使用表达式引用变量，语法为 `${{ env.NAME }}`

#### 变量优先级

同名变量优先级如下：

1. 环境级变量
2. 仓库级变量
3. 组织级别变量

简而言之，就是作用域越小，优先级越高。

#### 默认变量

Github 默认提供一些变量，可以直接使用

| 变量              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| `GITHUB_ACTOR`    | 发起工作流程的个人或应用程序的名称。 例如 `octocat`。        |
| `GITHUB_BASE_REF` | 工作流运行中拉取请求的基本引用或目标分支的名称。 仅当触发工作流运行的事件是 `pull_request` 或 `pull_request_target` 时才设置此属性。 例如 `main`。 |

更多参考：[变量](https://docs.github.com/zh/actions/learn-github-actions/variables#default-environment-variables)

### 表达式

表达式可以是文本、上下文引用、函数：

表达式：`${{ <expression> }}`

##### 文本

作为表达式的一部分，可使用 `boolean`、`null`、`number` 或 `string` 数据类型。

| 数据类型  | 文本值                                                       |
| :-------- | :----------------------------------------------------------- |
| `boolean` | `true` 或 `false`                                            |
| `null`    | `null`                                                       |
| `number`  | JSON 支持的任何数字格式。                                    |
| `string`  | 无需将字符串括在 `${{` 和 `}}` 中。 但是，如果这样做，则必须在字符串两边使用单引号 (`'`)。 若要使用文本单引号，请使用额外的单引号 (`''`) 转义文本单引号。 用双引号 (`"`) 括起来会引发错误。 |

示例

```yaml
env:
  myNull: ${{ null }}
  myBoolean: ${{ false }}
  myIntegerNumber: ${{ 711 }}
  myFloatNumber: ${{ -9.2 }}
  myHexNumber: ${{ 0xff }}
  myExponentialNumber: ${{ -2.99e-2 }}
  myString: Mona the Octocat
  myStringInBraces: ${{ 'It''s open source!' }}
```

##### 运算符

| 运算符 | 说明         |
| :----- | :----------- |
| `( )`  | 逻辑分组     |
| `[ ]`  | 索引         |
| `!`    | Not          |
| `<`    | 小于         |
| `>`    | 大于         |
| `==`   | 等于         |
| `!=`   | 不等于       |
| `&&`   | 且           |
| `||`   | 或           |

##### 函数

GitHub 提供一组内置的函数，可用于表达式，通常这些函数会返回或转换为字符串。

例如：`contains('Hello world', 'llo')` 返回 `true`

一些函数如下，更多函数参考 [表达式](https://docs.github.com/zh/actions/learn-github-actions/expressions)

| 函数                                      | 说明                                                         |
| ----------------------------------------- | ------------------------------------------------------------ |
| `hashFiles(path)`                         | 如果存在文件，返回文件哈希值。如果不存在，返回 `path`        |
| `startsWith( searchString, searchValue )` | 如果 `searchString` 以 `searchValue` 开头，将返回 `true`。 此函数不区分大小写。 抛出值到字符串。 |
| `success()`                               | 如果前面的步骤都没有失败或被取消，则返回 `true`。            |

### 上下文

常见的上下文（context）如下

| 上下文名 | 类型     | 描述                                                  |
| :------- | :------- | :---------------------------------------------------- |
| `github` | `object` | workflow 运行的相关信息。                             |
| `env`    | `object` | 包含 workflow、job 或 step 中设置的变量。             |
| `vars`   | `object` | 包括仓库、组织、环境级别的变量。                      |
| `job`    | `object` | 当前 job 设置的变量，常见有 job 容器 id，job 的状态。 |
| `step`   | `object` | 当前 step 相关信息。                                  |

可以通过表达式以 `${{ <context.NAME> }}` 的方式访问上下文变量

## 示例

### 打包一个 Java Maven 项目，并发布到  Github Releases

> 分支：quick-start-ci
>
> [xiao-so/github-actions-demo at quick-start-ci](https://github.com/xiao-so/github-actions-demo/tree/quick-start-ci)

打包一个 Maven 项目，并把 jar 包推送到仓库的 Releases， `github-maven.yml` 文件如下
::: details 详细文件内容

```yaml
name: GitHub Actions CI Demo
run-name: package maven project
on:
  push:
    branches:
      - quick-start-ci
jobs:
  Package-Maven-Project:
    env:
      # Release tag
      RELEASE_VERSION: "0.0.1"
    runs-on: ubuntu-latest
    steps:
      # checkout 仓库代码
      - name: Check out repository code
        uses: actions/checkout@v3
      # 安装 jdk1.8 和 maven
      - name: Set up JDK 1.8
        uses: actions/setup-java@v2
        with:
          java-version: '8'
          cache: 'maven'
          distribution: 'temurin'
      # 使用 maven package 打包
      - name: Build with Maven
        run: mvn clean package -e -U -B --file Hello-Maven/pom.xml
      # 移动打包好的 jar 文件到 staging 文件夹
      - run: mkdir staging && cp Hello-Maven/target/*.jar staging
      # 上传文件并发布到 Release
      - name: "Upload to release"
        uses: "marvinpinto/action-automatic-releases@latest"
        with:
          repo_token: "${{ secrets.GITHUB_TOKEN }}"
          automatic_release_tag: "${{ env.RELEASE_VERSION }}"
          prerelease: true
          title: "Release  ${{ env.RELEASE_VERSION }}"
          files: |
            staging/*.jar
```
:::

![image-20230125130526165](./assets/image-20230125130526165.png)
