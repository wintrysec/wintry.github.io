import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as r,a as e,b as n,d as a,e as o,r as d}from"./app.342c7ddc.js";const i={},p=o(`<h2 id="定位域控" tabindex="-1"><a class="header-anchor" href="#定位域控" aria-hidden="true">#</a> 定位域控</h2><p>1）域用户查询时间</p><p>域服务器通常会同时作为时间服务器使用</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>net time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）通过DNS服务器定位</p><p>一般DNS服务器和域控是同一台服务器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>nslookup <span class="token operator">-</span><span class="token function">type</span>=SRV_ldap_tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3）查看域控制器主机名</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>net <span class="token function">group</span> <span class="token string">&quot;domain controllers&quot;</span> <span class="token operator">/</span>domain
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="域基本信息查询" tabindex="-1"><a class="header-anchor" href="#域基本信息查询" aria-hidden="true">#</a> 域基本信息查询</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>net view <span class="token operator">/</span>domain            	<span class="token comment">#查询所有域</span>
net accounts <span class="token operator">/</span>domain        	<span class="token comment">#获取域密码策略</span>
nltest <span class="token operator">/</span>domain_trusts       	<span class="token comment">#获取域信任信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="域内用户查询" tabindex="-1"><a class="header-anchor" href="#域内用户查询" aria-hidden="true">#</a> 域内用户查询</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>net <span class="token function">group</span> <span class="token operator">/</span>domain                   	<span class="token comment">#查询域内所有用户组（需要使用域账户查询）</span>
net user <span class="token operator">/</span>domain                    	<span class="token comment">#查询域内用户列表（需要使用域账户查询）</span>
net <span class="token function">group</span> <span class="token string">&quot;domain admins&quot;</span> <span class="token operator">/</span>domain   	<span class="token comment">#查询域管理员用户（需要使用域账户查询）</span>
wmic useraccount get Caption<span class="token punctuation">,</span>sid    	<span class="token comment">#获取域内所有用户sid</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c={class:"custom-container tip"},u=o(`<p class="custom-container-title">定位域管理员</p><p>获取域内一个支点后需要获取域管理员权限。</p><p>域管理员有其它域成员主机的本地系统管理员权限，具备完全控制权。</p><p>使用<code>psloggedonexe</code>,可以查看本地登录的用户和通过本地计算机或远程计算机的资源登录的用户。</p><p>如果指定的是用户名而不是计算机名，psloggedon.exe会搜索网上邻居中的计算机，并显示该用户当前是否已经登录。</p><p>其原理是通过检查注册表HKEY_USERS 项的key值来查询谁登录过(需要调用NetSessionEnum API)，但某些功能需要管理员权限才能使用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\\computer：指定要列出登录信息的计算机名称
username：指定用户名，在网络中搜索该用户登录的计算机
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,7),m={href:"https://docs.microsoft.com/zh-cn/sysinternals/downloads/psloggedon",target:"_blank",rel:"noopener noreferrer"},h=o(`<h2 id="域内主机发现" tabindex="-1"><a class="header-anchor" href="#域内主机发现" aria-hidden="true">#</a> 域内主机发现</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>net view <span class="token operator">/</span>DOMAIN:HACKER             		<span class="token comment">#查询域内所有主机</span>
net <span class="token function">group</span> <span class="token string">&quot;domain computers&quot;</span> <span class="token operator">/</span>domain    	<span class="token comment">#查询域成员计算机列表</span>
setspn <span class="token operator">-</span>q <span class="token operator">*</span><span class="token operator">/</span><span class="token operator">*</span>                           	<span class="token comment">#用SPN查看域内重要应用服务器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bloodhound" tabindex="-1"><a class="header-anchor" href="#bloodhound" aria-hidden="true">#</a> BloodHound</h2><p>BloodHound是一款域内信息收集分析工具，能以图形化的方式将获取到的信息展示出来。</p>`,4),v={href:"https://github.com/BloodHoundAD/BloodHound",target:"_blank",rel:"noopener noreferrer"},g={href:"https://bloodhound.readthedocs.io",target:"_blank",rel:"noopener noreferrer"};function b(k,_){const s=d("ExternalLinkIcon");return l(),r("div",null,[p,e("div",c,[u,e("p",null,[n("工具下载地址："),e("a",m,[n("https://docs.microsoft.com/zh-cn/sysinternals/downloads/psloggedon"),a(s)])])]),h,e("p",null,[n("Github："),e("a",v,[n("https://github.com/BloodHoundAD/BloodHound"),a(s)])]),e("p",null,[n("使用wiki："),e("a",g,[n("https://bloodhound.readthedocs.io"),a(s)])])])}const x=t(i,[["render",b],["__file","域信息收集.html.vue"]]);export{x as default};
