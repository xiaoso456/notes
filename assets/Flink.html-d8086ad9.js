import{_ as s,r as e,o as t,c as p,a,b as i,d as o,e as c}from"./app-9157d7b3.js";const l="/notes/assets/image-20230611164015593-e8ff3393.png",r={},d=c(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>Flink 是一个支持流处理和批处理的分布式计算框架</p><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><h3 id="datastream" tabindex="-1"><a class="header-anchor" href="#datastream" aria-hidden="true">#</a> DataStream</h3><p>FLink 中的数据集合，是可以包含重复项，不可变的数据集合，数据可以是有界也可以是无界</p><p>DataStream 是不可变的，一旦被创建，不能添加或删除</p><h3 id="并行度-parallelism" tabindex="-1"><a class="header-anchor" href="#并行度-parallelism" aria-hidden="true">#</a> 并行度 parallelism</h3><p>数据量大时，把一个算子操作复制到多个节点，把一个算子任务拆分成多个并行子任务分发到不同节点</p><p>Flink 一个流的并行度，可以认为是算子中最大的并行度</p><h3 id="算子链" tabindex="-1"><a class="header-anchor" href="#算子链" aria-hidden="true">#</a> 算子链</h3><p>oneToOne（web ui 图显示为 forwarding） 一对一关系，不需要调整数据顺序，不需要重分区</p><p>redistributing 重分区 (web ui 图显示为 hash)</p><p>合并算子链：并行度相同，并且为 oneToOne 关系的算子可以合并成一个大任务</p><h3 id="任务槽-task-slots" tabindex="-1"><a class="header-anchor" href="#任务槽-task-slots" aria-hidden="true">#</a> 任务槽 Task Slots</h3><p>Flink 中每一个 TaskManager 都是一个 JVM 进程，资源有限，一个计算资源就是一个任务槽，用来独立执行一个子任务</p><p>目前 Slots 只会隔离内存，不会隔离 CPU 资源，可以将 Slots 数量设置为 CPU 核心数</p><h2 id="程序构成" tabindex="-1"><a class="header-anchor" href="#程序构成" aria-hidden="true">#</a> 程序构成</h2><p>Flink 程序看起来像一个转换 <code>DataStream</code> 的常规程序。每个程序由相同的基本部分组成：</p><ol><li>获取一个<code>执行环境（execution environment）</code>；</li><li>加载/创建初始数据；</li><li>指定数据相关的转换；</li><li>指定计算结果的存储位置；</li><li>触发程序执行。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 1 获取执行环境</span>
<span class="token class-name">StreamExecutionEnvironment</span> env <span class="token operator">=</span> <span class="token class-name">StreamExecutionEnvironment</span><span class="token punctuation">.</span><span class="token function">getExecutionEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2 加载数据</span>
<span class="token class-name">DataStream</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> text <span class="token operator">=</span> env<span class="token punctuation">.</span><span class="token function">readTextFile</span><span class="token punctuation">(</span><span class="token string">&quot;file:///path/to/file&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3 转换数据，生成新的 DataStream</span>
<span class="token class-name">DataStream</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> parsed <span class="token operator">=</span> text<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MapFunction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 4 写到外部系统,也叫 sink</span>
<span class="token comment">// 常用的有 print() 和 writeAsText(String path)</span>

<span class="token comment">// 5 执行</span>
env<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">&quot;test job&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署模式和运行模式" tabindex="-1"><a class="header-anchor" href="#部署模式和运行模式" aria-hidden="true">#</a> 部署模式和运行模式</h2><h3 id="部署模式" tabindex="-1"><a class="header-anchor" href="#部署模式" aria-hidden="true">#</a> 部署模式</h3><ul><li><p>会话模式 session</p><p>启动一个集群，保持一个会话，通过会话提交作业</p><p>适用于规模小、执行时间短的大量作业</p></li><li><p>单作业模式 per-job</p><p>一个作业一个集群，提交作业后启动一个单独集群</p><p>这种方式依赖 yarn 或 k8s</p></li><li><p>应用模式 application</p><p>不要客户端，直接把应用提交给 jobmanager 解析，创建一个集群</p></li></ul><h3 id="运行模式" tabindex="-1"><a class="header-anchor" href="#运行模式" aria-hidden="true">#</a> 运行模式</h3><h3 id="standalone-运行模式" tabindex="-1"><a class="header-anchor" href="#standalone-运行模式" aria-hidden="true">#</a> standalone 运行模式</h3><h4 id="单作业部署模式" tabindex="-1"><a class="header-anchor" href="#单作业部署模式" aria-hidden="true">#</a> 单作业部署模式</h4><h4 id="应用部署模式" tabindex="-1"><a class="header-anchor" href="#应用部署模式" aria-hidden="true">#</a> 应用部署模式</h4><p>启动</p><ol><li><p>把 jar 包 放到 lib 目录下</p></li><li><p>使用命令启动<code>standalone-job.sh start --job-classname com.xxx.xxx 类名</code></p></li><li><p>使用命令启动 <code>taskmanager.sh start</code></p></li></ol><p>停止</p><ol><li><p><code>taskmanager.sh stop</code></p></li><li><p><code>standalone-job.sh stop</code></p></li></ol><h3 id="yarn-运行模式" tabindex="-1"><a class="header-anchor" href="#yarn-运行模式" aria-hidden="true">#</a> Yarn 运行模式</h3><p>hadoop 的资源管理</p><p>待补充</p><h3 id="k8s-运行模式" tabindex="-1"><a class="header-anchor" href="#k8s-运行模式" aria-hidden="true">#</a> K8s 运行模式</h3><p>待补充</p><h2 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h2><p>standalone 会话模式为例</p><p><img src="`+l+'" alt="image-20230611164015593"></p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',40),u={href:"https://nightlies.apache.org/flink/flink-docs-release-1.16/zh/docs/dev/datastream/overview/",target:"_blank",rel:"noopener noreferrer"};function h(k,m){const n=e("ExternalLinkIcon");return t(),p("div",null,[d,a("p",null,[a("a",u,[i("概览 | Apache Flink"),o(n)])])])}const b=s(r,[["render",h],["__file","Flink.html.vue"]]);export{b as default};
