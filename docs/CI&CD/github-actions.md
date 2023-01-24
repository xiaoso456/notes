---
lang: zh-CN
title: GitHub-Actions
description: GitHub-Actions简明文档
author: 'xiaoso'
---
## 简介

本文档只介绍 GitHub Actions 一些基本操作，提供一些例子。

参考 [GitHub Actions文档 - GitHub Docs](https://docs.github.com/zh/actions)

仓库 [xiao-so/github-actions-demo](https://github.com/xiao-so/github-actions-demo)

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

action：用于 GitHub Actions 平台自定义的应用程序，常用于执行复杂重复的工作，例如从 GitHub 拉取代码，安装 Node.js 环境

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

