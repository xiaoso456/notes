import{_ as n,o as a,c as s,e}from"./app-9157d7b3.js";const t={},p=e(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>OpenFeign 是开放声明式、模板化的HTTP客户端。Spring Cloud openfeign支持SpringMVC注解，整合了Ribbon和Nacos</p><p>使用 openfeign可以让使用HTTP请求远程调用服务时像调用本地方法一样，无需关注序列化和反序列化等操作。</p><h2 id="术语" tabindex="-1"><a class="header-anchor" href="#术语" aria-hidden="true">#</a> 术语</h2><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><ol><li><p>新建一个SpringBoot Web项目，配置服务注册发现中心并启动，用于提供远程服务，在注册中心中的服务名为<code>hello-service</code>，可参考[Nacos](/SpringCloud/Nacos.md#服务注册发现 Demo)</p></li><li><p>新建一个SpringBoot Web项目，配置SpringCloud 注册发现中心</p></li><li><p>在启动类下加入 <code>@EnableFeignClients</code> 注解</p></li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@EnableFeignClients</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppFeign</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">AppFeign</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>新建 <code>HelloFeignService.java</code> 代码如下，其中<code>hello-service</code>是远程服务名，接口地址和类型需要对应</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;hello-service&quot;</span><span class="token punctuation">,</span>path <span class="token operator">=</span> <span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">HelloFeignService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/sayHello&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>现在通过依赖注入，即可像使用本地服务一样调用远程服务，并且自带 Ribbon 负载均衡</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/feign&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloFeignController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">HelloFeignService</span> helloFeignService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/sayHello&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> helloFeignService<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>日志级别有四种：</p><ul><li>NONE：不记录</li><li>BASIC：记录请求方法、URL、状态码、执行时间</li><li>HEADERS：BASIC基础上，记录请求和响应的Header</li><li>FULL：HEADERS基础上，记录body、元数据</li></ul><h3 id="日志配置" tabindex="-1"><a class="header-anchor" href="#日志配置" aria-hidden="true">#</a> 日志配置</h3><h4 id="配置指定接口日志级别" tabindex="-1"><a class="header-anchor" href="#配置指定接口日志级别" aria-hidden="true">#</a> 配置指定接口日志级别</h4><p>新建 <code>FeignConfig.java</code> 类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>Logger<span class="token punctuation">.</span>Level</span> <span class="token function">feignLoggerLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name"><span class="token namespace">feign<span class="token punctuation">.</span></span>Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span><span class="token constant">FULL</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: warn</p><p>不要使用<code>@Configuration</code> 让Spring管理该类，否则会变成全局配置</p><p>:::</p><p>在feign服务上指定使用该配置类 <code>FeignConfig.class</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;hello-service&quot;</span><span class="token punctuation">,</span>path <span class="token operator">=</span> <span class="token string">&quot;/hello&quot;</span><span class="token punctuation">,</span>configuration <span class="token operator">=</span> <span class="token class-name">FeignConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">HelloFeignService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/sayHello&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全局配置日志级别" tabindex="-1"><a class="header-anchor" href="#全局配置日志级别" aria-hidden="true">#</a> 全局配置日志级别</h4><p>在 <code>application.yml</code> 添加</p><p>配置 SpringBoot 的日志输出级别</p><p>其中 <code>org.example.feign</code> 是 <code>org.example.feign.HelloFeignService.java</code> 所在的包</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code> <span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">level</span><span class="token punctuation">:</span>
    <span class="token key atrule">org.example.feign</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>feign 日志局部配置，<code>hello-service</code> 是远程服务</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">hello-service</span><span class="token punctuation">:</span>
        <span class="token key atrule">loggerLevel</span><span class="token punctuation">:</span> BASIC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原生注解" tabindex="-1"><a class="header-anchor" href="#原生注解" aria-hidden="true">#</a> 原生注解</h3><p>openFeign 支持使用 feign 原生的注解，而不是SpringMVC的注解，需要进行配置</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">feign</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">config</span><span class="token punctuation">:</span>
      <span class="token key atrule">hello-service</span><span class="token punctuation">:</span>
        <span class="token key atrule">contract</span><span class="token punctuation">:</span> feign.Contract.Default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::warn</p><p>一般不会用，仅作介绍</p><p>:::</p><h3 id="自定义拦截器" tabindex="-1"><a class="header-anchor" href="#自定义拦截器" aria-hidden="true">#</a> 自定义拦截器</h3><p>新建 <code>FeignInterceptorDemo.java</code> 实现 <code>RequestInterceptor</code> 接口，功能是打印请求信息</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignInterceptorDemo</span> <span class="token keyword">implements</span> <span class="token class-name">RequestInterceptor</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">apply</span><span class="token punctuation">(</span><span class="token class-name">RequestTemplate</span> requestTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;hello,the feign request is:&quot;</span> <span class="token operator">+</span> requestTemplate<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建 <code>FeignConfig.java</code> 配置类，往容器中注入拦截器</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RequestInterceptor</span> <span class="token function">feignInterceptorDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FeignInterceptorDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在feign服务上指定使用该配置类 <code>FeignConfig.class</code></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;hello-service&quot;</span><span class="token punctuation">,</span>path <span class="token operator">=</span> <span class="token string">&quot;/hello&quot;</span><span class="token punctuation">,</span>configuration <span class="token operator">=</span> <span class="token class-name">FeignConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">HelloFeignService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/sayHello&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,44),i=[p];function o(l,c){return a(),s("div",null,i)}const d=n(t,[["render",o],["__file","OpenFeign.html.vue"]]);export{d as default};
