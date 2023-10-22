import{_ as t,r as i,o as l,c,a as n,b as a,d as e,e as o}from"./app-9157d7b3.js";const p="/notes/assets/23d5ec88321243e1b7546d6736736fd3tplv-k3u1fbpfcp-zoom-in-crop-mark4536000-6e241b6a.webp",r={},u=o(`<h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><h2 id="认证系统" tabindex="-1"><a class="header-anchor" href="#认证系统" aria-hidden="true">#</a> 认证系统</h2><p>认证用于身份识别，调用 k8s 接口查看/创建资源都需要权限</p><p>一般认证系统和以下控制器有关：</p><ul><li>adminssion controller (AC)</li><li>token controller (TC)</li><li>serviceaccount controller (SAC)</li></ul><h3 id="human-user" tabindex="-1"><a class="header-anchor" href="#human-user" aria-hidden="true">#</a> human user</h3><p>一般用户使用 kubectl 发起请求，实际就是使用在当前节点配置文件 <code>~/.kube/config</code> 中的管理员账号使用 HTTP 协议向 k8s 的 apiserver 发起请求</p><h3 id="serviceaccount" tabindex="-1"><a class="header-anchor" href="#serviceaccount" aria-hidden="true">#</a> ServiceAccount</h3><p>serviceaccount是k8s里一种资源，serviceaccount 可以到apiserver 上认证</p><p>如果Pod也要调用k8s集群接口，一般来说需要使用 serviceaccount</p><p>:::info</p><p>k8s v1.22以前的创建 serviceaccount会自动关联建立一个secret，新版本需要手动创建</p><p>:::</p><h4 id="创建服务账号" tabindex="-1"><a class="header-anchor" href="#创建服务账号" aria-hidden="true">#</a> 创建服务账号</h4><p>创建和查看服务账号</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建测试用的命名空间 sa-test</span>
kubectl create ns sa-test
<span class="token comment"># 创建 服务账号 service-account-1</span>
kubectl create serviceaccount service-account-1 <span class="token parameter variable">-n</span> sa-test
<span class="token comment"># 查看服务账号列表</span>
kubectl get serviceaccount
<span class="token comment"># 查看服务账号详细信息</span>
kubectl describe serviceaccount service-account-1 <span class="token parameter variable">-n</span> sa-test

<span class="token comment"># 返回结果</span>
Name:                service-account-1
Namespace:           sa-test
Labels:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Image pull secrets:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Mountable secrets:   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Tokens:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Events:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成服务账号 token</p><p>有两种方式</p><ol><li>使用 TokenRequestApi创建token创建临时token，默认有效期是一小时</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 为服务账号 token service-account-1 创建一个token</span>
kubectl create token service-account-1 <span class="token parameter variable">-n</span> sa-test <span class="token parameter variable">--duration</span> 8760h
<span class="token comment"># 会直接返回 token</span>
eyJhbGciOiJSUzI1NiIsImtpZCI6IkF5OHZZa2tneTE3aDVMTjVJQlBpZFpEUWlsTE9SM0xJd2pncEFBZWY0Q0UifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiLCJrM3MiXSwiZXhwIjoxNjkwMDIxNzI5LCJpYXQiOjE2OTAwMTgxMjksImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJzYS10ZXN0Iiwic2VydmljZWFjY291bnQiOnsibmFtZSI6InNlcnZpY2UtYWNjb3VudC0xIiwidWlkIjoiNzk5NzJiMmMtMzkwYy00OGZhLThmMGUtMDA5NWZmMzE0OTc1In19LCJuYmYiOjE2OTAwMTgxMjksInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDpzYS10ZXN0OnNlcnZpY2UtYWNjb3VudC0xIn0.NwlCllDVt2qQFBTmc5oK8GKUpx7JtQOdk4MOa47iEeq3aJmdeA08K7qPYHSrUNmXPUCcCqwVjTYHbokByVa21uDTlDui925b3_1xmtYfPxcRZuyidPyfHvdCwAXH3uiZ6LhcZMPIIWGh3nhdL3xXVUDMLuhZOx7hgMx5lNu_EyX-rLV5rcaW6mnORr4FfEqbGco4YC2UNQ5RbaMsWr90LUc4FcMtJcmdeWD70Os_RjaHR84SXxh79oOUZRpxZVMHA75u3EK7tRSPE7w8dJDI1T4gXzHFeJIhRq083OTSnOVoXsucScCZYzb7riQAlqyWC_dA0NdLl_GzKBDTgGlrxw
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>创建 secret token</p><p>创建 secret 的 yaml 文件，type写 <code>kubernetes.io/service-account-token</code></p></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiVersion: v1
kind: Secret
metadata:
  name: secret-sa-sample
  annotations:
    kubernetes.io/service-account.name: <span class="token string">&quot;service-account-1&quot;</span>   <span class="token comment"># 这里填写serviceAccountName</span>
type: kubernetes.io/service-account-token
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 执行命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> xxx.yaml <span class="token parameter variable">-n</span> sa-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>查看创建的 secret
</code></pre><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl describe secret secret-sa-sample <span class="token parameter variable">-n</span> sa-test
<span class="token comment"># 返回信息</span>
Name:         secret-sa-sample
Namespace:    sa-test
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  kubernetes.io/service-account.name: service-account-1
              kubernetes.io/service-account.uid: 79972b2c-390c-48fa-8f0e-0095ff314975

Type:  kubernetes.io/service-account-token

Data
<span class="token operator">==</span><span class="token operator">==</span>
ca.crt:     <span class="token number">570</span> bytes
namespace:  <span class="token number">7</span> bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IkF5OHZZa2tneTE3aDVMTjVJQlBpZFpEUWlsTE9SM0xJd2pncEFBZWY0Q0UifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJzYS10ZXN0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InNlY3JldC1zYS1zYW1wbGUiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoic2VydmljZS1hY2NvdW50LTEiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI3OTk3MmIyYy0zOTBjLTQ4ZmEtOGYwZS0wMDk1ZmYzMTQ5NzUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6c2EtdGVzdDpzZXJ2aWNlLWFjY291bnQtMSJ9.gq6WfXAOHSMb7_Q4MH9mrrkGgp_YDdDFRiyiVxje03JxZQKOIr9PiYwWckwHAcc8_9ZwWPTObmmjNaedLctkKCo_v15MZFAJQZoQ8NKiHYnlKBXr03y-jCAXI2iPntruSbNJMX0QdUKuSMStOpXgC8m3vSVpZmHMoAaKEcPR7t3Gdt4Q3xfSX0ply-b7TzKMi39dO-RNXus7r_p7YAfE7syUFSOc7tMMsiMeTENgi9s7aq3E9MNw_J29YJGdG9MCfP0q6gqxbXzqIM3kCCXiPsYju805-hhHWHEGELRp0SCF8mRW2UCm9Ylg_qZf7dKraQZ177OfO29htlUjmjDZ9A


<span class="token comment"># 查看服务账号</span>
kubectl describe serviceaccount service-account-1 <span class="token parameter variable">-n</span> sa-test
<span class="token comment"># 可以看到服务账号 tokens 包含 secret-sa-sample</span>
Name:                service-account-1
Namespace:           sa-test
Labels:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:         <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Image pull secrets:  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Mountable secrets:   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Tokens:              secret-sa-sample
Events:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="授权系统" tabindex="-1"><a class="header-anchor" href="#授权系统" aria-hidden="true">#</a> 授权系统</h2><p>自版本1.6起，k8s 默认采用 RBAC（Role Base Access Control，基于角色的访问控制）进行权限管理</p><p>k8s apiserver支持以下几种授权方式：</p><ul><li><p><strong>AlwaysDeny</strong>：表示拒绝所有请求，一般用于测试。</p></li><li><p><strong>AlwaysAllow</strong>：允许接收所有请求。 如果集群不需要授权流程，则可以采用该策略，这也是Kubernetes的默认配置。</p></li><li><p><strong>ABAC</strong>（Attribute-Based Access Control）：基于属性的访问控制。 表示使用用户配置的授权规则对用户请求进行匹配和控制。</p></li><li><p><strong>Webhook</strong>：通过调用外部REST服务对用户进行授权。</p></li><li><p><strong>RBAC</strong>：Role-Based Access Control，基于角色的访问控制。</p></li><li><p><strong>Node</strong>：是一种专用模式，用于对kubelet发出的请求进行访问控制。</p></li></ul><p>这里主要介绍 RBAC</p><h3 id="权限模型" tabindex="-1"><a class="header-anchor" href="#权限模型" aria-hidden="true">#</a> 权限模型</h3><p>Subject：主体，包括 User，Group，ServiceAccount</p><p>Role：授权特定命名空间的访问权限</p><p>ClusterRole：授权所有命名空间的访问权限</p><p>RoleBinding：将 Role 绑定到 Subject（主体）</p><p>ClusterRoleBinding：将ClusterRole绑定到Subject</p><p><img src="`+p+`" alt="img"></p><h3 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h3><p>Role Yaml 示例如下</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>role
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span> <span class="token comment"># &quot;&quot; indicates the core API group</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">]</span> <span class="token comment"># </span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Cluster Role Yaml示例如下</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>role
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span> <span class="token comment"># &quot;&quot; indicates the core API group</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相关参数</p><p>verbs：<code>&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;, &quot;create&quot;, &quot;update&quot;, &quot;patch&quot;, &quot;delete&quot;, &quot;exec&quot;</code></p><p>resources：<code>&quot;services&quot;, &quot;endpoints&quot;, &quot;pods&quot;,&quot;secrets&quot;,&quot;configmaps&quot;,&quot;crontabs&quot;,&quot;deployments&quot;,&quot;jobs&quot;,&quot;nodes&quot;,&quot;rolebindings&quot;,&quot;clusterroles&quot;,&quot;daemonsets&quot;,&quot;replicasets&quot;,&quot;statefulsets&quot;,&quot;horizontalpodautoscalers&quot;,&quot;replicationcontrollers&quot;,&quot;cronjobs&quot;</code></p><p>apiGroups：<code>&quot;&quot;,&quot;apps&quot;, &quot;autoscaling&quot;, &quot;batch&quot;</code></p><h3 id="角色绑定" tabindex="-1"><a class="header-anchor" href="#角色绑定" aria-hidden="true">#</a> 角色绑定</h3><p>RoleBinding Yaml 示例如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> rb
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> zhangsan
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>role
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ClusterRoleBinding Yaml 示例如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> crb
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mark
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>clusterrole
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,53),d={href:"https://juejin.cn/post/6974770831947726856?searchId=202307221643389855C2B668BD7770B0EC",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.soulchild.cn/post/2945/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://juejin.cn/post/7116104973644988446?searchId=2023072221535978FBCF19C740319A4B88",target:"_blank",rel:"noopener noreferrer"},m={href:"https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/rbac/",target:"_blank",rel:"noopener noreferrer"};function b(h,g){const s=i("ExternalLinkIcon");return l(),c("div",null,[u,n("p",null,[n("a",d,[a("Kubernetes手记（14）- 用户权限系统 - 掘金 (juejin.cn)"),e(s)])]),n("p",null,[n("a",v,[a("k8s serviceaccount创建后没有生成对应的secret - SoulChild随笔记"),e(s)])]),n("p",null,[n("a",k,[a("Kubernetes（k8s）权限管理RBAC详解 - 掘金 (juejin.cn)"),e(s)])]),n("p",null,[n("a",m,[a("使用 RBAC 鉴权 | Kubernetes"),e(s)])])])}const q=t(r,[["render",b],["__file","k8s权限.html.vue"]]);export{q as default};
