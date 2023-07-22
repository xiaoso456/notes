## 简介

Liquibase 是一个开源的数据库迁移工具，它提供了一种可靠和可重复的方式来管理和执行数据库的变更操作。与传统的手动管理数据库脚本不同，Liquibase 集成在应用程序中，并在应用程序启动时自动执行所需的数据库变更。

主要功能：

1. 提供版本的方式进行自动化建表改表

主要特点和功能：

1. 数据库无关性：Liquibase 可以与多种关系型数据库一起使用，包括 MySQL、PostgreSQL、Oracle、SQL Server 等。它提供了可移植的脚本和变更操作，使得在不同的数据库之间进行迁移和管理变得更加容易。
2. 可以使用多种格式的配置：Liquibase 支持多种格式的配置文件，包括 XML、YAML 和 JSON。你可以使用你喜欢的格式定义数据库变更的脚本和配置。
3. 数据库变更操作：Liquibase 提供了丰富的数据库变更操作，包括创建表、添加列、修改数据类型、创建索引、创建视图等。这些变更操作可以以可读的方式定义在配置文件中，并且可以自动执行和回滚。
4. 版本控制：Liquibase 支持版本控制，可以将每个数据库脚本与特定的版本关联起来。它会自动检测到新的脚本和变更，并按照正确的顺序执行它们，确保数据库变更的有序性和一致性。
5. 自动化执行：Liquibase 集成在应用程序中，并在应用程序启动时自动执行数据库迁移。这意味着你不需要手动执行数据库脚本，而是通过配置文件定义所需的变更操作，Liquibase 会自动执行这些操作。

## Java 使用

一般来说，Java 项目可以引入插件来使用 Liqiubase，而不需要单独安装

引入依赖

```xml
<plugin>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-maven-plugin</artifactId>
    <version>4.2.0</version>
    <configuration>
        <propertyFile>liquibase.properties</propertyFile>
    </configuration>
</plugin>
```

配置

```xml
<changeLogFile>changelog.xml</changeLogFile>
<url>MyJDBCConnection</url>
<username>dbuser</username>
<password>dbpassword</password>
```



## 参考

[Liquibase: Database CI/CD Automation | Database DevOps](https://www.liquibase.com/)