import{_ as s,r as t,o as p,c as e,a as n,b as l,d as c,e as o}from"./app-9157d7b3.js";const i={},u=o(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>Liquibase 是一个开源的数据库迁移工具，它提供了一种可靠和可重复的方式来管理和执行数据库的变更操作。与传统的手动管理数据库脚本不同，Liquibase 集成在应用程序中，并在应用程序启动时自动执行所需的数据库变更。</p><p>主要功能：</p><ol><li>提供版本的方式进行自动化建表改表</li></ol><p>主要特点和功能：</p><ol><li>数据库无关性：Liquibase 可以与多种关系型数据库一起使用，包括 MySQL、PostgreSQL、Oracle、SQL Server 等。它提供了可移植的脚本和变更操作，使得在不同的数据库之间进行迁移和管理变得更加容易。</li><li>可以使用多种格式的配置：Liquibase 支持多种格式的配置文件，包括 XML、YAML 和 JSON。你可以使用你喜欢的格式定义数据库变更的脚本和配置。</li><li>数据库变更操作：Liquibase 提供了丰富的数据库变更操作，包括创建表、添加列、修改数据类型、创建索引、创建视图等。这些变更操作可以以可读的方式定义在配置文件中，并且可以自动执行和回滚。</li><li>版本控制：Liquibase 支持版本控制，可以将每个数据库脚本与特定的版本关联起来。它会自动检测到新的脚本和变更，并按照正确的顺序执行它们，确保数据库变更的有序性和一致性。</li><li>自动化执行：Liquibase 集成在应用程序中，并在应用程序启动时自动执行数据库迁移。这意味着你不需要手动执行数据库脚本，而是通过配置文件定义所需的变更操作，Liquibase 会自动执行这些操作。</li></ol><h2 id="java-使用" tabindex="-1"><a class="header-anchor" href="#java-使用" aria-hidden="true">#</a> Java 使用</h2><p>一般来说，Java 项目可以引入插件来使用 Liqiubase，而不需要单独安装</p><p>引入依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pluginManagement</span><span class="token punctuation">&gt;</span></span>
       <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>
          <span class="token comment">&lt;!--start with basic information to get Liquibase plugin:
          include &lt;groupId&gt;, &lt;artifactID&gt;, and &lt;version&gt; elements--&gt;</span>
        	 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.liquibase<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
             <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>liquibase-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
          	 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.23.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
             <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>
            <span class="token comment">&lt;!--set values for Liquibase properties and settings
            for example, the location of a properties file to use--&gt;</span>
             	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>propertyFile</span><span class="token punctuation">&gt;</span></span>liquibase.properties<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>propertyFile</span><span class="token punctuation">&gt;</span></span>
          	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
            <span class="token comment">&lt;!--set up any dependencies for Liquibase to function in your environment for example, a database-specific plugin--&gt;</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.h2database<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>h2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
              <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.1.214<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pluginManagement</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>changeLogFile</span><span class="token punctuation">&gt;</span></span>changelog.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>changeLogFile</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url</span><span class="token punctuation">&gt;</span></span>MyJDBCConnection<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>dbuser<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>dbpassword<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,13),k={href:"https://www.liquibase.com/",target:"_blank",rel:"noopener noreferrer"};function g(d,r){const a=t("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[n("a",k,[l("Liquibase: Database CI/CD Automation | Database DevOps"),c(a)])])])}const m=s(i,[["render",g],["__file","LiqiuBase.html.vue"]]);export{m as default};
