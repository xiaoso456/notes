import{_ as t,r as e,o as c,c as o,a as n,b as a,d as p,e as l}from"./app-9157d7b3.js";const i="/notes/assets/aefc6eb7f5ba13216d5f21051327816e-7b6c04bb.png",u="/notes/assets/image-20220831112241682-4adc2d55.png",k="/notes/assets/image-20220902114113290-7b2662b5.png",d="/notes/assets/image-20220913084512009-e804d3fe.png",r="/notes/assets/image-20220915133205079-dbb87ece.png",v="/notes/assets/image-20220914143806384-97fbf500.png",m="/notes/assets/image-20220916165732617-6f366d0e.png",b="/notes/assets/image-20220829110005397-6bc2e681.png",y="/notes/assets/image-20220830092259622-cac724b4.png",w="/notes/assets/image-20220831111531550-74e11490.png",g="/notes/assets/image-20220902115022843-f93893c1.png",h="/notes/assets/image-20220914145844848-7aca4b2d.png",f="/notes/assets/image-20220915102646600-ef36acfc.png",S="/notes/assets/image-20220829104241042-9f93964a.png",x="/notes/assets/image-20220829105240838-93052619.png",q="/notes/assets/image-20220909162700343-9827c4bf.png",C={},P=l('<h1 id="简介和分类" tabindex="-1"><a class="header-anchor" href="#简介和分类" aria-hidden="true">#</a> 简介和分类</h1><p><strong>创建型模式：对象实例化的模式，创建型模式用于解耦对象的实例化过程。</strong></p><p><strong>结构型模式：把类或对象结合在一起形成一个更大的结构。</strong></p><p><strong>行为型模式：类和对象如何交互，及划分责任和算法。</strong></p><p><img src="'+i+`" alt="img"></p><p>单例模式：某个类只能有一个实例，提供一个全局的访问点。</p><p>简单工厂：一个工厂类根据传入的参量决定创建出那一种产品类的实例。</p><p>工厂方法：定义一个创建对象的接口，让子类决定实例化那个类。</p><p>抽象工厂：创建相关或依赖对象的家族，而无需明确指定具体类。</p><p>建造者模式：封装一个复杂对象的构建过程，并可以按步骤构造。</p><p>原型模式：通过复制现有的实例来创建新的实例。</p><p>适配器模式：将一个类的方法接口转换成客户希望的另外一个接口。</p><p>组合模式：将对象组合成树形结构以表示“”部分-整体“”的层次结构。</p><p>装饰模式：动态的给对象添加新的功能。</p><p>代理模式：为其他对象提供一个代理以便控制这个对象的访问。</p><p>亨元（蝇量）模式：通过共享技术来有效的支持大量细粒度的对象。</p><p>外观模式：对外提供一个统一的方法，来访问子系统中的一群接口。</p><p>桥接模式：将抽象部分和它的实现部分分离，使它们都可以独立的变化。</p><p>模板模式：定义一个算法结构，而将一些步骤延迟到子类实现。</p><p>解释器模式：给定一个语言，定义它的文法的一种表示，并定义一个解释器。</p><p>策略模式：定义一系列算法，把他们封装起来，并且使它们可以相互替换。</p><p>状态模式：允许一个对象在其对象内部状态改变时改变它的行为。</p><p>观察者模式：对象间的一对多的依赖关系。</p><p>备忘录模式：在不破坏封装的前提下，保持对象的内部状态。</p><p>中介者模式：用一个中介对象来封装一系列的对象交互。</p><p>命令模式：将命令请求封装为一个对象，使得可以用不同的请求来进行参数化。</p><p>访问者模式：在不改变数据结构的前提下，增加作用于一组对象元素的新功能。</p><p>责任链模式：将请求的发送者和接收者解耦，使的多个对象都有处理这个请求的机会。</p><p>迭代器模式：一种遍历访问聚合对象中各个元素的方法，不暴露该对象的内部结构。</p><h1 id="行为型模式" tabindex="-1"><a class="header-anchor" href="#行为型模式" aria-hidden="true">#</a> 行为型模式</h1><h2 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h2><p>常见于：生成 ID 策略</p><p>定义一系列算法，把他们封装起来，并且使它们可以相互替换。例如，把生成 ID 的算法定义统一为一个接口。实际使用时，可以自由替换为各种算法，比如雪花算法，UUID 算法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IdArithmetic</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h2><p>将请求的发送者和接收者解耦，使的多个对象都有处理这个请求的机会。直到处理成功</p><p>常见于：SpringSecurity 权限验证拦截</p><p>初级责任链的实现</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChainRespPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 模拟</span>
        <span class="token class-name">Handler</span> level1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Leader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Handler</span> level2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Boss</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        level1<span class="token punctuation">.</span><span class="token function">setNextHandler</span><span class="token punctuation">(</span>level2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        level1<span class="token punctuation">.</span><span class="token function">process</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Handler</span><span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">Handler</span> nextHandler<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setNextHandler</span><span class="token punctuation">(</span><span class="token class-name">Handler</span> nextHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>nextHandler <span class="token operator">=</span> nextHandler<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> level<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Leader</span> <span class="token keyword">extends</span> <span class="token class-name">Handler</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> level<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>level<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;leader 处理&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            nextHandler<span class="token punctuation">.</span><span class="token function">process</span><span class="token punctuation">(</span>level<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Boss</span> <span class="token keyword">extends</span> <span class="token class-name">Handler</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> level<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>level<span class="token operator">&gt;=</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;boss 处理&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="观察者模式" tabindex="-1"><a class="header-anchor" href="#观察者模式" aria-hidden="true">#</a> 观察者模式</h2><p>观察者模式：对象间的一对多的依赖关系。</p><p>当一个对象的状态发生变化时，其相关依赖的对象皆得到通知并自动更新。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ObserverPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">PersonDebit</span> zhangSan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PersonDebit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PersonCredit</span> liSi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PersonCredit</span><span class="token punctuation">(</span><span class="token string">&quot;lisi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PersonCredit</span> wangWu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PersonCredit</span><span class="token punctuation">(</span><span class="token string">&quot;wangWu&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        zhangSan<span class="token punctuation">.</span><span class="token function">borrow</span><span class="token punctuation">(</span>liSi<span class="token punctuation">)</span><span class="token punctuation">;</span>
        zhangSan<span class="token punctuation">.</span><span class="token function">borrow</span><span class="token punctuation">(</span>wangWu<span class="token punctuation">)</span><span class="token punctuation">;</span>

        zhangSan<span class="token punctuation">.</span><span class="token function">notifyCredits</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Debit</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">borrow</span><span class="token punctuation">(</span><span class="token class-name">Credit</span> credit<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">notifyCredits</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Credit</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">takeMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">PersonCredit</span> <span class="token keyword">implements</span> <span class="token class-name">Credit</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">PersonCredit</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">takeMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token operator">+</span><span class="token string">&quot;拿钱&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">PersonDebit</span> <span class="token keyword">implements</span> <span class="token class-name">Debit</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Credit</span><span class="token punctuation">&gt;</span></span> allCredis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> state <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 0 表示没钱，1 表示有钱</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">borrow</span><span class="token punctuation">(</span><span class="token class-name">Credit</span> credit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        allCredis<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>credit<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notifyCredits</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        allCredis<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>credit <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>credit<span class="token punctuation">.</span><span class="token function">takeMoney</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="状态模式" tabindex="-1"><a class="header-anchor" href="#状态模式" aria-hidden="true">#</a> 状态模式</h2><p>状态模式：允许一个对象在其对象内部状态改变时改变它的行为，对象看起来似乎修改了它的类，其别名为状态对象</p><p><img src="`+u+`" alt="image-20220831112241682"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">StatePattern</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StatePattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Context</span> zhangsan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        zhangsan<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Happy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        zhangsan<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        zhangsan<span class="token punctuation">.</span><span class="token function">changeState</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Angry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        zhangsan<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">State</span><span class="token punctuation">{</span>
    <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Happy</span> <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;happy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Angry</span> <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;angry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Context</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">State</span> state<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">changeState</span><span class="token punctuation">(</span><span class="token class-name">State</span> state<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板方法模式" tabindex="-1"><a class="header-anchor" href="#模板方法模式" aria-hidden="true">#</a> 模板方法模式</h2><p>模板模式：定义一个算法结构，而将一些步骤延迟到子类实现。使得子类可以不改变一个算法的结构即可重新定义该算法的某些特定步骤。</p><p><img src="`+k+`" alt="image-20220902114113290"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">TemplateMethodPattern</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TemplateMethodPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Cooking</span> cooking <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CookingFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cooking<span class="token punctuation">.</span><span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Cooking</span><span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;做饭开始&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;做饭结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">CookingFood</span> <span class="token keyword">extends</span> <span class="token class-name">Cooking</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;放鸡蛋和西红柿&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;少放盐多放味精&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式" aria-hidden="true">#</a> 命令模式</h2><p>命令模式：将命令请求封装为一个对象，它可以将请求转换为一个包含于请求相关的所有信息的独立对象。该转换让你根据不同的请求将方法参数化、延迟请求执行或将其放入队列中，且能实现可撤销操作。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">CommandPattern</span><span class="token punctuation">;</span>



<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommandPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SaveButton</span> saveButton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SaveButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">TextBox</span> box <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TextBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token class-name">PrintCommand</span> printCommand <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintCommand</span><span class="token punctuation">(</span>box<span class="token punctuation">)</span><span class="token punctuation">;</span>
        saveButton<span class="token punctuation">.</span><span class="token function">bindCommand</span><span class="token punctuation">(</span>printCommand<span class="token punctuation">)</span><span class="token punctuation">;</span>

        box<span class="token punctuation">.</span><span class="token function">setContext</span><span class="token punctuation">(</span><span class="token string">&quot;abcd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        saveButton<span class="token punctuation">.</span><span class="token function">doPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        box<span class="token punctuation">.</span><span class="token function">setContext</span><span class="token punctuation">(</span><span class="token string">&quot;adda&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        saveButton<span class="token punctuation">.</span><span class="token function">doPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 文本编辑器文本框</span>
<span class="token keyword">class</span> <span class="token class-name">TextBox</span><span class="token punctuation">{</span>


    <span class="token keyword">private</span> <span class="token class-name">String</span> context<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> context<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setContext</span><span class="token punctuation">(</span><span class="token class-name">String</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> context<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SaveButton</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Command</span> command<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">bindCommand</span><span class="token punctuation">(</span><span class="token class-name">Command</span> command<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>command <span class="token operator">=</span> command<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>command<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;设备初始化失败&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        command<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">PrintService</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token class-name">String</span> text<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Command</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">PrintCommand</span> <span class="token keyword">implements</span> <span class="token class-name">Command</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">TextBox</span> box<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">PrintService</span> serviceProvider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">PrintCommand</span><span class="token punctuation">(</span><span class="token class-name">TextBox</span> box<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>box <span class="token operator">=</span> box<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        serviceProvider<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>box<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="备忘录模式" tabindex="-1"><a class="header-anchor" href="#备忘录模式" aria-hidden="true">#</a> 备忘录模式</h2><p>备忘录模式：在不破坏封装的前提下，保持对象的内部状态。</p><p>备忘录模式：允许在不暴露对象实现细节的情况下保存和恢复对象之前的状态。</p><p><img src="`+d+`" alt="image-20220913084512009"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">MementoPattern</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Stack</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MementoPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">History</span> history <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">History</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        document<span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        history<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        document<span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token string">&quot;def&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        history<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        document<span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token string">&quot;ghi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        history<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        document<span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token string">&quot;lmb&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        document<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span>history<span class="token punctuation">.</span><span class="token function">getLastVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        document<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        document<span class="token punctuation">.</span><span class="token function">resume</span><span class="token punctuation">(</span>history<span class="token punctuation">.</span><span class="token function">getLastVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        document<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Document</span><span class="token punctuation">{</span>
    <span class="token comment">// 需要备份的数据</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">BackUp</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">BackUp</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">resume</span><span class="token punctuation">(</span><span class="token class-name">BackUp</span> backUp<span class="token punctuation">)</span><span class="token punctuation">{</span>
        content <span class="token operator">=</span> backUp<span class="token punctuation">.</span>content<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">change</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 备忘录接口
 * 定义元数据方法
 */</span>
<span class="token keyword">interface</span> <span class="token class-name">Memento</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">BackUp</span> <span class="token keyword">implements</span> <span class="token class-name">Memento</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> content<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">BackUp</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 备忘录栈
 */</span>
<span class="token keyword">class</span> <span class="token class-name">History</span><span class="token punctuation">{</span>
    <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BackUp</span><span class="token punctuation">&gt;</span></span> backUpStack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">BackUp</span> backUp<span class="token punctuation">)</span><span class="token punctuation">{</span>
        backUpStack<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>backUp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">BackUp</span> <span class="token function">getLastVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> backUpStack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中介者模式" tabindex="-1"><a class="header-anchor" href="#中介者模式" aria-hidden="true">#</a> 中介者模式</h2><p>中介者模式：用一个中介对象来封装一系列的对象交互。</p><p>能让你减少对象之间混乱无序的依赖关系。该模式会限制对象之间的直接交互，迫使它们通过一个中介者对象进行合作。</p><p><img src="`+r+`" alt="image-20220915133205079"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">MediatorPattern</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MediatorPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 定义中介者</span>
        <span class="token class-name">MarriageAgency</span> marriageAgency <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MarriageAgencyImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//第一位男嘉宾</span>
        <span class="token class-name">Person</span> manA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;Giao 桑&quot;</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token class-name">Sex</span><span class="token punctuation">.</span><span class="token constant">MALE</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span>marriageAgency<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Person</span> womanA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;女 1&quot;</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token class-name">Sex</span><span class="token punctuation">.</span><span class="token constant">FEMALE</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span>marriageAgency<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Person</span> womanB <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;女 2&quot;</span><span class="token punctuation">,</span><span class="token number">17</span><span class="token punctuation">,</span><span class="token class-name">Sex</span><span class="token punctuation">.</span><span class="token constant">FEMALE</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span>marriageAgency<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Person</span> womanC <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;女 3&quot;</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token class-name">Sex</span><span class="token punctuation">.</span><span class="token constant">FEMALE</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span>marriageAgency<span class="token punctuation">)</span><span class="token punctuation">;</span>

        marriageAgency<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>womanA<span class="token punctuation">)</span><span class="token punctuation">;</span>
        marriageAgency<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>womanB<span class="token punctuation">)</span><span class="token punctuation">;</span>
        marriageAgency<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>womanC<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 缘分一线牵</span>
        marriageAgency<span class="token punctuation">.</span><span class="token function">pair</span><span class="token punctuation">(</span>manA<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token class-name">Sex</span> sex<span class="token punctuation">;</span>
    <span class="token keyword">int</span> requestAge<span class="token punctuation">;</span>
    <span class="token class-name">MarriageAgency</span> agency<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token keyword">int</span> age<span class="token punctuation">,</span><span class="token class-name">Sex</span> sex<span class="token punctuation">,</span><span class="token keyword">int</span> requestAge<span class="token punctuation">,</span><span class="token class-name">MarriageAgency</span> agency<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>requestAge <span class="token operator">=</span> requestAge<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>agency <span class="token operator">=</span> agency<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">findPartner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        agency<span class="token punctuation">.</span><span class="token function">pair</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> <span class="token class-name">Sex</span><span class="token punctuation">{</span>
    <span class="token constant">MALE</span><span class="token punctuation">,</span><span class="token constant">FEMALE</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">MarriageAgency</span><span class="token punctuation">{</span>
    <span class="token comment">// 注册会员</span>
    <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 为 person 配对</span>
    <span class="token keyword">void</span> <span class="token function">pair</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MarriageAgencyImpl</span> <span class="token keyword">implements</span> <span class="token class-name">MarriageAgency</span><span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span> people <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        people<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pair</span><span class="token punctuation">(</span><span class="token class-name">Person</span> person<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Person</span> p<span class="token operator">:</span>people<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>age <span class="token operator">==</span> person<span class="token punctuation">.</span>requestAge <span class="token operator">&amp;&amp;</span> p<span class="token punctuation">.</span>sex <span class="token operator">!=</span> person<span class="token punctuation">.</span>sex<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>
                        <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;将&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;与&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot;送入洞房&quot;</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式" aria-hidden="true">#</a> 迭代器模式</h2><p>迭代器模式：一种遍历访问聚合对象中各个元素的方法，不暴露该对象的内部结构。</p><p>迭代器模式：是一种行为模式，让你能在不暴露底层表现形式（列表，栈，树）的情况下遍历集合中所有的元素。</p><p><img src="`+v+'" alt="image-20220914143806384"></p><h2 id="访问者模式" tabindex="-1"><a class="header-anchor" href="#访问者模式" aria-hidden="true">#</a> 访问者模式</h2><p>访问者模式：在不改变数据结构的前提下，增加作用于一组对象元素的新功能。</p><p>访问者模式：用于封装一些作用于某种数据结构中各元素的操作，它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。</p><p><img src="'+m+`" alt="image-20220916165732617"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">VisitorPattern</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VisitorPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">EggRobot</span> erDan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EggRobot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        erDan<span class="token punctuation">.</span><span class="token function">calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Visitor</span> updatePack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UpdateVisitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        erDan<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>updatePack<span class="token punctuation">)</span><span class="token punctuation">;</span>
        erDan<span class="token punctuation">.</span><span class="token function">calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">EggRobot</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">HardDisk</span> disk<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">CPU</span> cpu<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">EggRobot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        disk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HardDisk</span><span class="token punctuation">(</span><span class="token string">&quot;记住 1+1=1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cpu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CPU</span><span class="token punctuation">(</span><span class="token string">&quot;1+1=1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        cpu<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        disk<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">Visitor</span> visitor<span class="token punctuation">)</span><span class="token punctuation">{</span>
        cpu<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
        disk<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>visitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Visitor</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">visitCPU</span><span class="token punctuation">(</span><span class="token class-name">CPU</span> cpu<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">void</span> <span class="token function">visitDisk</span><span class="token punctuation">(</span><span class="token class-name">HardDisk</span> hardDisk<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">UpdateVisitor</span> <span class="token keyword">implements</span> <span class="token class-name">Visitor</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitCPU</span><span class="token punctuation">(</span><span class="token class-name">CPU</span> cpu<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cpu<span class="token punctuation">.</span>command <span class="token operator">+=</span> <span class="token string">&quot;:1+1=2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitDisk</span><span class="token punctuation">(</span><span class="token class-name">HardDisk</span> disk<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        disk<span class="token punctuation">.</span>command <span class="token operator">+=</span> <span class="token string">&quot;:记住:1+1=2&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Hardware</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> command<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Hardware</span><span class="token punctuation">(</span><span class="token class-name">String</span> command<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>command <span class="token operator">=</span> command<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">Visitor</span> visitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">CPU</span> <span class="token keyword">extends</span> <span class="token class-name">Hardware</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">CPU</span><span class="token punctuation">(</span><span class="token class-name">String</span> command<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">Visitor</span> visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        visitor<span class="token punctuation">.</span><span class="token function">visitCPU</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">HardDisk</span> <span class="token keyword">extends</span> <span class="token class-name">Hardware</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">HardDisk</span><span class="token punctuation">(</span><span class="token class-name">String</span> command<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">Visitor</span> visitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        visitor<span class="token punctuation">.</span><span class="token function">visitDisk</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="结构型模式" tabindex="-1"><a class="header-anchor" href="#结构型模式" aria-hidden="true">#</a> 结构型模式</h1><h2 id="装饰模式" tabindex="-1"><a class="header-anchor" href="#装饰模式" aria-hidden="true">#</a> 装饰模式</h2><p>装饰模式：动态的给对象添加新的功能。【实际感觉把原有方法进行封装，成为新方法也可以】</p><p>常用于：Java io 流大量使用装饰模式</p><p>和继承的区别：</p><ul><li>继承是静态的，一定要写一个新的子类，对类层级进行扩展。</li><li>装饰模式是动态的，拿到一个对象就能对它进行扩展，不修改原有类的逻辑。</li></ul><p><img src="`+b+`" alt="image-20220829110005397.png"></p><p>示例代码</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">DecoratorPattern</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DecoratorPattern</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Robot</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">FirstRobot</span> <span class="token keyword">implements</span> <span class="token class-name">Robot</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;对话&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;唱歌&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">RobotDecorator</span> <span class="token keyword">implements</span> <span class="token class-name">Robot</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Robot</span> robot<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">RobotDecorator</span><span class="token punctuation">(</span><span class="token class-name">Robot</span> robot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>robot <span class="token operator">=</span> robot<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        robot<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doMorething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        robot<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;跳舞，拖地&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h2><p>适配器模式：将一个类的方法接口转换成客户希望的另外一个接口。</p><p>和装饰器刚好相反，装饰器修改原接口，将接口扩展。适配器是让接口兼容</p><p>常见于：</p><p>使用方式：可以用继承或者关联（组合）的方式实现</p><p><img src="`+y+'" alt="image-20220830092259622"></p><h2 id="外观模式" tabindex="-1"><a class="header-anchor" href="#外观模式" aria-hidden="true">#</a> 外观模式</h2><p>外观模式：对外提供一个统一的方法，来访问子系统中的一群接口。</p><p><img src="'+w+`" alt="image-20220831111531550"></p><h2 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h2><p>代理模式：为其他对象提供一个代理以便控制这个对象的访问。</p><p>常用于：对象增强、运行时 aop 织入 (jdk 动态代理、cglib 等)</p><p>静态代理：一个类通常就需要维护一个代理类</p><p>动态代理：能根据需要动态生成</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">ProxyPattern</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">RealSubjectProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Subject</span><span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">RealSubject</span> <span class="token keyword">implements</span> <span class="token class-name">Subject</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;doWork&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">RealSubjectProxy</span> <span class="token keyword">implements</span> <span class="token class-name">Subject</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">RealSubject</span> subject<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">RealSubjectProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>subject <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">RealSubject</span><span class="token punctuation">)</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">loadClass</span><span class="token punctuation">(</span><span class="token class-name">RealSubject</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">RealSubjectProxy</span><span class="token punctuation">(</span><span class="token class-name">RealSubject</span> subject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subject <span class="token operator">=</span> subject<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;建立连接&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;日志记录&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        subject<span class="token punctuation">.</span><span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="享元模式" tabindex="-1"><a class="header-anchor" href="#享元模式" aria-hidden="true">#</a> 享元模式</h2><p>亨元（蝇量）模式：通过共享技术来有效的支持大量细粒度的对象。</p><p>主要用于减少创建对象的数量，以减少内存占用和提高性能。</p><p><img src="`+g+`" alt="image-20220902115022843"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">FlyweightPattern</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashSet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Set</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlyweightPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BikeFlyWeight</span> bike1 <span class="token operator">=</span> <span class="token class-name">BikeFlyWeightFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bike1<span class="token punctuation">.</span><span class="token function">ride</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bike1<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">BikeFlyWeight</span> bike2 <span class="token operator">=</span> <span class="token class-name">BikeFlyWeightFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bike2<span class="token punctuation">.</span><span class="token function">ride</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">BikeFlyWeight</span> bike3 <span class="token operator">=</span> <span class="token class-name">BikeFlyWeightFactory</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bike3<span class="token punctuation">.</span><span class="token function">ride</span><span class="token punctuation">(</span><span class="token string">&quot;王五&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bike3<span class="token punctuation">.</span><span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bike1<span class="token operator">==</span>bike2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bike2<span class="token operator">==</span>bike3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BikeFlyWeight</span><span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">Integer</span> state <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">ride</span><span class="token punctuation">(</span><span class="token class-name">String</span> userName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MoBikeFlyWeight</span> <span class="token keyword">extends</span> <span class="token class-name">BikeFlyWeight</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> bikeId<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">MoBikeFlyWeight</span><span class="token punctuation">(</span><span class="token class-name">String</span> bikeId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>bikeId <span class="token operator">=</span> bikeId<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">ride</span><span class="token punctuation">(</span><span class="token class-name">String</span> userName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>userName<span class="token operator">+</span><span class="token string">&quot;骑&quot;</span><span class="token operator">+</span>bikeId<span class="token operator">+</span><span class="token string">&quot;号 自行车出行!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">void</span> <span class="token function">back</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">BikeFlyWeightFactory</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">BikeFlyWeightFactory</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BikeFlyWeightFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">BikeFlyWeight</span><span class="token punctuation">&gt;</span></span> pool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">BikeFlyWeightFactory</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name">BikeFlyWeightFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">2</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            pool<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MoBikeFlyWeight</span><span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token string">&quot;号&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">BikeFlyWeight</span> <span class="token function">getBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">BikeFlyWeight</span> bike<span class="token operator">:</span>pool<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>bike<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span> bike<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组合模式" tabindex="-1"><a class="header-anchor" href="#组合模式" aria-hidden="true">#</a> 组合模式</h2><p>组合模式：将对象组合成树形结构以表示“”部分-整体“”的层次结构。</p><p><img src="`+h+`" alt="image-20220914145844848"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">CompositePattern</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CompositePattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Composite</span> china <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Composite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        china<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 北京</span>
        china<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 上海</span>

        <span class="token class-name">Composite</span> shanXi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Composite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        shanXi<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 大同市</span>
        shanXi<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 太原市</span>

        china<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>shanXi<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>china<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 统计接口
 */</span>
<span class="token keyword">interface</span> <span class="token class-name">Counter</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">City</span> <span class="token keyword">implements</span> <span class="token class-name">Counter</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">City</span><span class="token punctuation">(</span><span class="token keyword">int</span> sum<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sum <span class="token operator">=</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Composite</span> <span class="token keyword">implements</span> <span class="token class-name">Counter</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Counter</span><span class="token punctuation">&gt;</span></span> counterList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Counter</span> counter<span class="token punctuation">)</span><span class="token punctuation">{</span>
        counterList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">Counter</span> counter<span class="token punctuation">)</span><span class="token punctuation">{</span>
        counterList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Counter</span><span class="token punctuation">&gt;</span></span> <span class="token function">getChild</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> counterList<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Counter</span> counter<span class="token operator">:</span>counterList<span class="token punctuation">)</span><span class="token punctuation">{</span>
            sum <span class="token operator">+=</span> counter<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="桥接模式" tabindex="-1"><a class="header-anchor" href="#桥接模式" aria-hidden="true">#</a> 桥接模式</h2><p>桥接模式：将抽象部分和它的实现部分分离，使它们都可以独立的变化。桥接模式将继承关系转换为关联关系。</p><p><img src="`+f+`" alt="image-20220915102646600"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">BridgePattern</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BridgePattern</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Abstraction</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Implementor</span> implementor<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Abstraction</span><span class="token punctuation">(</span><span class="token class-name">Implementor</span> implementor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>implementor <span class="token operator">=</span> implementor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doWork</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>implementor<span class="token punctuation">.</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 实现接口
 */</span>
<span class="token keyword">interface</span> <span class="token class-name">Implementor</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ConcreteImplementor</span> <span class="token keyword">implements</span> <span class="token class-name">Implementor</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello world&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="创建型模式" tabindex="-1"><a class="header-anchor" href="#创建型模式" aria-hidden="true">#</a> 创建型模式</h1><h2 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h2><p>某个类只能有一个实例，提供一个全局的访问点。</p><p>常见于：Spring、配置类等</p><h3 id="枚举实现" tabindex="-1"><a class="header-anchor" href="#枚举实现" aria-hidden="true">#</a> 枚举实现</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">EnumSingleton</span> <span class="token punctuation">{</span>

    <span class="token function">INSTANCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">EnumSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;EnumSingleton{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;id=&quot;</span> <span class="token operator">+</span> id <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">EnumSingleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Runnable</span> thread1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">EnumSingleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">40</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>thread1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="双重锁检查" tabindex="-1"><a class="header-anchor" href="#双重锁检查" aria-hidden="true">#</a> 双重锁检查</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">Singleton</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/** 使用双重锁检查实现单例
 * <span class="token keyword">@author</span> xiaoso
 * <span class="token keyword">@date</span> 2021/8/5 9:37
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DoubleCheck</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">static</span> <span class="token class-name">DoubleCheck</span> singleton<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">DoubleCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">DoubleCheck</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>singleton<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">DoubleCheck</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>singleton<span class="token operator">==</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    singleton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DoubleCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> singleton<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Runnable</span> thread1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">DoubleCheck</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">40</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>thread1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="懒汉" tabindex="-1"><a class="header-anchor" href="#懒汉" aria-hidden="true">#</a> 懒汉</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ESingleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span>  <span class="token class-name">ESingleton</span> eSingleton <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ESingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">ESingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ESingleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> eSingleton<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Runnable</span> thread1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">ESingleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">40</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>thread1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="静态内部类" tabindex="-1"><a class="header-anchor" href="#静态内部类" aria-hidden="true">#</a> 静态内部类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">Singleton</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/** 使用静态内部类实现单例模式
 * <span class="token keyword">@author</span> xiaoso
 * <span class="token keyword">@date</span> 2021/8/5 9:57
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StaticInsideClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">StaticInsideClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">StaticInsideClass</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StaticInsideClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">StaticInsideClass</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Runnable</span> thread1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">StaticInsideClass</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">40</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>thread1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式" aria-hidden="true">#</a> 简单工厂模式</h2><p>简单工厂：一个工厂类根据传入的参量决定创建出那一种产品类的实例。被创建的实例应该有共同的父类。</p><p>常用于：广泛在 JDK 中使用，比如日期类等等</p><h2 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h2><p>工厂方法：定义一个创建对象的接口，让子类决定实例化那个类。将实例化延迟到子类进行。当我们需要新的产品（工厂生产的实例时），不需要修改工厂类，而是需要新建一个子类（子工厂）。</p><p>常用于：广泛在 JDK 中使用，比如 Collection 集合 iterator() 方法，交给子类返回迭代器</p><p>注意：工厂模式要求这里属于一个大类</p><p><img src="`+S+'" alt="image-20220829104241042"></p><h2 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式</h2><p>抽象工厂：创建相关或依赖对象的家族，而无需明确指定具体类。</p><p>抽象工厂打破了工厂与产品（大类）一一对应的关系，一个具体的工厂类可以生产多个大类的产品</p><p><img src="'+x+`" alt="image-20220829105240838"></p><h2 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h2><p>建造者模式：封装一个复杂对象的构建过程，并可以按步骤构造。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">BuilderPattern</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span></span><span class="token class-name">Data</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BuilderPattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">House</span> house <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">House<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setDoor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Door</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setWall</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Wall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setWindow</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Window</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Window</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Door</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Wall</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">House</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Window</span> window<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Door</span> door<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Wall</span> wall<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">House</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>window <span class="token operator">=</span> builder<span class="token punctuation">.</span>window<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>door <span class="token operator">=</span> builder<span class="token punctuation">.</span>door<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>wall <span class="token operator">=</span> builder<span class="token punctuation">.</span>wall<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span><span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">Window</span> window<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Door</span> door<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Wall</span> wall<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">setWindow</span><span class="token punctuation">(</span><span class="token class-name">Window</span> window<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>window <span class="token operator">=</span> window<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">setDoor</span><span class="token punctuation">(</span><span class="token class-name">Door</span> door<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>door <span class="token operator">=</span> door<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">setWall</span><span class="token punctuation">(</span><span class="token class-name">Wall</span> wall<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>wall <span class="token operator">=</span> wall<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token class-name">House</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">House</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="原型模式" tabindex="-1"><a class="header-anchor" href="#原型模式" aria-hidden="true">#</a> 原型模式</h2><p>原型模式：通过复制现有的实例来创建新的实例。让实现类自己实现 clone 接口</p><p><img src="`+q+`" alt="image-20220909162700343"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token class-name">PrototypePattern</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrototypePattern</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Plane</span> plane <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Plane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>plane<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Plane</span> clone <span class="token operator">=</span> plane<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>clone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Prototype</span><span class="token punctuation">{</span>
    <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Plane</span> <span class="token keyword">implements</span> <span class="token class-name">Prototype</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Plane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;Name:&quot;</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&quot;Type:&quot;</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Plane</span><span class="token punctuation">(</span><span class="token class-name">Plane</span> plane<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> plane<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> plane<span class="token punctuation">.</span>type<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> type<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Plane</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Plane</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Plane{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;name=&#39;&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, type=&#39;&quot;</span> <span class="token operator">+</span> type <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h1>`,142),j={href:"https://blog.csdn.net/lgxzzz/article/details/124970034",target:"_blank",rel:"noopener noreferrer"},_=n("p",null,"[重学 Java 设计模式：实战责任链模式「模拟 618 电商大促期间，项目上线流程多级负责人审批场景」 | bugstack 虫洞栈 ](https://bugstack.cn/md/develop/design-pattern/2020-06-18-重学 Java 设计模式《实战责任链模式》.html)",-1),B={href:"https://www.bilibili.com/video/BV1vT4y1E7g6/?spm_id_from=333.788",target:"_blank",rel:"noopener noreferrer"};function I(D,W){const s=e("ExternalLinkIcon");return c(),o("div",null,[P,n("p",null,[n("a",j,[a("23 种设计模式总结_和代码去流浪的博客-CSDN 博客_设计模式 "),p(s)])]),_,n("p",null,[n("a",B,[a("五分钟学设计模式.10.策略模式_哔哩哔哩_bilibili"),p(s)])])])}const H=t(C,[["render",I],["__file","设计模式.html.vue"]]);export{H as default};
