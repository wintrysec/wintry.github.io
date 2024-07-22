import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as o,e as i}from"./app.736b169c.js";const n={},a=i(`<h2 id="会话劫持" tabindex="-1"><a class="header-anchor" href="#会话劫持" aria-hidden="true">#</a> 会话劫持</h2><p>会话劫持（Session hijacking），是一种通过获取用户 Session ID 后，使用该 Session ID 登录目标账号的攻击方法。</p><p>受害者登录站点，服务器返回一个会话标识(Session ID)</p><p>黑客捕获这个<strong>Session ID</strong>（ 网络嗅探，XSS ），使用这个Session ID访问站点获得受害者合法会话</p><details class="custom-container details"><summary>修复方案</summary><p>会话劫持的第一步是取得一个合法的会话标识来伪装成合法用户，因此需要保证会话标识不被泄漏。</p><p>1、XSS漏洞引起的会话劫持：使用<strong>http-only</strong>来防止JS获取cookie中的Session ID信息</p><p>2、网络嗅探引起的会话劫持：使用<strong>HTTPS+secure</strong>来保证Session ID不被嗅探获取到</p></details><details class="custom-container details"><summary>Session机制</summary><p>Session机制是一种<strong>服务端</strong>的机制，服务器使用一种类似于散列表的结构来保存信息用于保持状态。</p><p>保存这个Session ID最为方便的方式是采用Cookie。Cookie的名字都是类似于SESSIONID；</p><p>Weblogic对于web应用程序生成的cookie，JSESSIONID；</p><p>PHP中Session的默认名称是PHPSESSID。</p></details><details class="custom-container details"><summary>HttpOnly 设置方法</summary><p>服务端发送cookie的时候，可以设置<strong>HTTP-Only</strong> ，禁止 JS 获取Cookie内容</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Set-Cookie</span><span class="token punctuation">:</span> <span class="token header-value">SESSIONID=abc123;HttpOnly;Secure</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置Secure为True时， 此cookie只有在HTTPS协议中才会进行传输，HTTP协议传输时，是不传输此协议的</p></details><h2 id="会话固定" tabindex="-1"><a class="header-anchor" href="#会话固定" aria-hidden="true">#</a> 会话固定</h2><p>会话固定（Session fixation）是一种诱骗受害者使用攻击者指定的会话标识（Session ID）的攻击手段。这是攻击者获取合法会话标识的最简单的方法。</p><p>会话固定也可以看成是会话劫持的一种类型，原因是会话固定的攻击的主要目的同样是获得目标用户的合法会话。</p><details class="custom-container details"><summary>漏洞成因</summary><ul><li>访问网站时，网站会设置cookie中的Session ID</li><li><strong>当用户登录后，cookie中的SessionID保持不变</strong>（<strong>形成原因</strong>）</li><li>只要获取登陆前的Session ID内容，就可以知道登陆后的Session ID</li><li>黑客用该Session ID构造链接，发送给受害者点击后，黑客成功劫持受害者的会话</li></ul></details><details class="custom-container details"><summary>修复方案</summary><p>1、在用户登录成功后重新创建一个Session ID，使登录前的匿名会话强制失效</p><p>2、SessionID与浏览器绑定：SessionID与所访问浏览器有变化，立即重置</p><p>3、SessionID与所访问的IP绑定：SessionID与所访问IP有变化，立即重置</p></details><h4 id="漏洞验证" tabindex="-1"><a class="header-anchor" href="#漏洞验证" aria-hidden="true">#</a> 漏洞验证</h4><p>1）访问网站（未登录）：获取cookie信息，获取Session ID</p><p>2）登录网站：查看Cookie信息，获取Session ID</p><p>3）查看登录前，登录后SessionID是否相同（相同即存在此漏洞）</p>`,16),t=[a];function r(c,p){return e(),o("div",null,t)}const S=s(n,[["render",r],["__file","逻辑漏洞.html.vue"]]);export{S as default};
