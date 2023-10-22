import{_ as e,r as o,o as c,c as i,a as n,b as s,d as p,e as a}from"./app-9157d7b3.js";const u={},l=a(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>GIN是用Go语言编写的轻量级Web框架，快速高效。具备强大的路由和中间件支持，可处理各种HTTP请求和动态路由。</p><p>支持多种渲染格式和模板引擎，方便生成动态内容。提供错误处理和日志记录功能，可捕获错误并记录详细信息。</p><p>有丰富的中间件和插件生态系统，可轻松集成各种功能。GIN简单易用，适合构建高性能的后端服务。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>go get <span class="token parameter variable">-u</span> github.com/gin-gonic/gin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><h3 id="helloworld" tabindex="-1"><a class="header-anchor" href="#helloworld" aria-hidden="true">#</a> HelloWorld</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个路由</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 定义路由处理</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>context <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		context<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// 启动并忽略异常</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问 <code>127.0.0.1:12000/hello</code> 即可看到结果</p><h2 id="响应" tabindex="-1"><a class="header-anchor" href="#响应" aria-hidden="true">#</a> 响应</h2><h3 id="响应视图和类型-json-xml" tabindex="-1"><a class="header-anchor" href="#响应视图和类型-json-xml" aria-hidden="true">#</a> 响应视图和类型（JSON/XML）</h3><p>响应可以直接返回结构体/Map/原始值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">_json</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		UserName <span class="token builtin">string</span> <span class="token string">\`json:&quot;user_name&quot;\`</span> <span class="token comment">// 定义返回给前端的字段名为 user_name</span>
		Age      <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
		Password <span class="token builtin">string</span> <span class="token string">\`json:&quot;-&quot;\`</span> <span class="token comment">// - 表示不响应给前端</span>
	<span class="token punctuation">}</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>UserName<span class="token punctuation">:</span> <span class="token string">&quot;xiaoso&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> Password<span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">}</span>
	c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">_jsonMap</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	responseMap <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">)</span>
	responseMap<span class="token punctuation">[</span><span class="token string">&quot;user_name&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;xiaoso&quot;</span>
	responseMap<span class="token punctuation">[</span><span class="token string">&quot;age&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">123</span>

	c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> responseMap<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">_jsonDirect</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>

	c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
		<span class="token string">&quot;user_name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">_xml</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		UserName <span class="token builtin">string</span> <span class="token string">\`json:&quot;user_name&quot;\`</span> <span class="token comment">// 定义返回给前端的字段名为 user_name</span>
		Age      <span class="token builtin">int</span>    <span class="token string">\`json:&quot;age&quot;\`</span>
		Password <span class="token builtin">string</span> <span class="token string">\`json:&quot;-&quot;\`</span> <span class="token comment">// - 表示不响应给前端</span>
	<span class="token punctuation">}</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span>UserName<span class="token punctuation">:</span> <span class="token string">&quot;xiaoso&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> Password<span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span><span class="token punctuation">}</span>
	c<span class="token punctuation">.</span><span class="token function">XML</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> user<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 获取路由</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// response json</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/demo/jsonObject&quot;</span><span class="token punctuation">,</span> _json<span class="token punctuation">)</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/demo/jsonMap&quot;</span><span class="token punctuation">,</span> _jsonMap<span class="token punctuation">)</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/demo/jsonDirect&quot;</span><span class="token punctuation">,</span> _jsonDirect<span class="token punctuation">)</span>

	<span class="token comment">// response xml</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/demo/xml&quot;</span><span class="token punctuation">,</span> _xml<span class="token punctuation">)</span>

	<span class="token comment">// 启动并忽略异常</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="响应-html" tabindex="-1"><a class="header-anchor" href="#响应-html" aria-hidden="true">#</a> 响应 html</h3><p>新建 templates 文件夹，并在文件夹下新建 index.html</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Title<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
username :{{.username }}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建 3.html.go</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">_html</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 使用 index.html 模板，并填入变量</span>
	c<span class="token punctuation">.</span><span class="token function">HTML</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">&quot;index.html&quot;</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;xiaoso&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 获取路由</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 加载指定目录所有模板文件</span>
	router<span class="token punctuation">.</span><span class="token function">LoadHTMLGlob</span><span class="token punctuation">(</span><span class="token string">&quot;templates/*&quot;</span><span class="token punctuation">)</span>
	<span class="token comment">// response html</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/demo/html&quot;</span><span class="token punctuation">,</span> _html<span class="token punctuation">)</span>

	<span class="token comment">// 启动并忽略异常</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="响应静态文件" tabindex="-1"><a class="header-anchor" href="#响应静态文件" aria-hidden="true">#</a> 响应静态文件</h3><ol><li>新建 static 文件夹，放入一张图片 1.png</li><li>新建 4.static.go</li></ol><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
	<span class="token string">&quot;net/http&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 获取路由</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 访问 /1 会返回 static文件夹1.png文件</span>
	router<span class="token punctuation">.</span><span class="token function">StaticFile</span><span class="token punctuation">(</span><span class="token string">&quot;/1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;static/1.png&quot;</span><span class="token punctuation">)</span>

	<span class="token comment">// 访问 /static/*，会访问static/static/* 文件</span>
	router<span class="token punctuation">.</span><span class="token function">StaticFS</span><span class="token punctuation">(</span><span class="token string">&quot;/static&quot;</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span><span class="token function">Dir</span><span class="token punctuation">(</span><span class="token string">&quot;./static&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// 启动并忽略异常</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问 <code>http://127.0.0.1:12000/1</code> 或 <code>http://127.0.0.1:12000/static/1.png</code> 可以访问到图片</p><h3 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向" aria-hidden="true">#</a> 重定向</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">_redirect</span><span class="token punctuation">(</span>context <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 301 跳转</span>
	context<span class="token punctuation">.</span><span class="token function">Redirect</span><span class="token punctuation">(</span><span class="token number">301</span><span class="token punctuation">,</span> <span class="token string">&quot;https://www.baidu.com&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 获取路由</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/baidu&quot;</span><span class="token punctuation">,</span> _redirect<span class="token punctuation">)</span>

	<span class="token comment">// 启动并忽略异常</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 301 是永久重定向，302 是临时重定向</p><h2 id="请求" tabindex="-1"><a class="header-anchor" href="#请求" aria-hidden="true">#</a> 请求</h2><p>还支持原始参数，Json等等</p><h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/query&quot;</span><span class="token punctuation">,</span> _query<span class="token punctuation">)</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">_query</span><span class="token punctuation">(</span>context <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	query<span class="token punctuation">,</span> exist <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">GetQuery</span><span class="token punctuation">(</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> exist <span class="token punctuation">{</span>
		context<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> query<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		context<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">&quot;null&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30),r={href:"http://localhost:12000/query?user=1",target:"_blank",rel:"noopener noreferrer"},d=a(`<h3 id="路径参数" tabindex="-1"><a class="header-anchor" href="#路径参数" aria-hidden="true">#</a> 路径参数</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 路径参数(动态参数)</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/user/:user_id&quot;</span><span class="token punctuation">,</span> _param<span class="token punctuation">)</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">_param</span><span class="token punctuation">(</span>context <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	userId <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">&quot;user_id&quot;</span><span class="token punctuation">)</span>

	context<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> userId<span class="token punctuation">)</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),k={href:"http://localhost:12000/user/123",target:"_blank",rel:"noopener noreferrer"},v=a(`<h3 id="表单参数" tabindex="-1"><a class="header-anchor" href="#表单参数" aria-hidden="true">#</a> 表单参数</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	router<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">&quot;/postform&quot;</span><span class="token punctuation">,</span> _postform<span class="token punctuation">)</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">&quot;:12000&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">_postform</span><span class="token punctuation">(</span>context <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	value <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
	context<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2><p>https://www.bilibili.com/video/BV1s24y1k7pv</p>`,4);function m(b,g){const t=o("ExternalLinkIcon");return c(),i("div",null,[l,n("p",null,[s("访问 "),n("a",r,[s("localhost:12000/query?user=1"),p(t)])]),d,n("p",null,[s("访问："),n("a",k,[s("localhost:12000/user/123"),p(t)])]),v])}const q=e(u,[["render",m],["__file","gin.html.vue"]]);export{q as default};
