import{_ as c}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as r,a as e,b as a,d as n,e as o,r as d}from"./app.736b169c.js";const l="/assets/9.4bc7d18c.png",p="/assets/14.53cd4933.png",i={},h=e("h2",{id:"ntlm-relay",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ntlm-relay","aria-hidden":"true"},"#"),a(" NTLM Relay")],-1),m=e("p",null,"NTLM Relay 利用NTLM协议漏洞，允许攻击者在网络中获取用户凭据并获得对其他计算机的访问权限",-1),u=e("h3",{id:"_1-截获ntlm-hash",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-截获ntlm-hash","aria-hidden":"true"},"#"),a(" 1）截获NTLM Hash")],-1),b={href:"https://github.com/SpiderLabs/Responder",target:"_blank",rel:"noopener noreferrer"},_=o(`<p>配置文件设置 <code>CaptureMultipleCredentials=On</code>，并把对应协议的 <code>server</code> 监听服务打开</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>responder <span class="token parameter variable">-wfF</span> <span class="token parameter variable">-I</span> eth0 <span class="token comment"># 开始毒化,监听所有请求信息</span>

<span class="token parameter variable">-I</span>  <span class="token comment"># 设置监听的网络接口，\`eth0\`</span>
<span class="token parameter variable">-f</span>  <span class="token comment"># 收集NBT_NS或LLMNR的信息</span>
<span class="token parameter variable">-w</span>  <span class="token comment"># 设置WPAD服务器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以抓到其他机器用于验证身份的NTLM Hash</p><p><img src="`+l+'" alt="img" loading="lazy"></p><p>使用以下工具可以监测网络中是否存在截获请求的响应器</p>',5),v={href:"https://github.com/codeexpress/respounder",target:"_blank",rel:"noopener noreferrer"},g=o(`<h3 id="_2-中继哈希" tabindex="-1"><a class="header-anchor" href="#_2-中继哈希" aria-hidden="true">#</a> 2）中继哈希</h3><p>将NTLM哈希中继到目标计算机上的另一个服务，比如SMB（文件共享）。</p><p>目标计算机收到NTLM哈希后，会尝试将其发送到域控制器进行验证，但并不知道这个哈希是从攻击者那里获取的。域控制器验证NTLM哈希，并将验证结果发送给目标计算机，使攻击者获得对目标计算机的访问权限，无需知道实际密码。</p><p>首先用fscan扫描下域内主机 <code>SMB</code> 签名已禁用了没有，禁用了则能继续。</p><p>如果开启了可以在注册表中进行修改子健为0，默认为1</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>reg <span class="token function">add</span> HKLM<span class="token punctuation">\\</span>SYSTEM<span class="token punctuation">\\</span>CurrentControlSet<span class="token punctuation">\\</span>Services<span class="token punctuation">\\</span>LanmanServer<span class="token punctuation">\\</span>Parameters /v RequireSecuritySignature /t REG_DWORD /d <span class="token number">0</span> /f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="relay-to-smb" tabindex="-1"><a class="header-anchor" href="#relay-to-smb" aria-hidden="true">#</a> Relay To SMB</h3><p>利用Impacket套件中的smbrelayx.py脚本进行中继攻击。</p><p>首先使用Responder.conf关闭HTTP和SMB服务器，因为如果开启了smb Signing就无法进行攻击。</p><p><img src="`+p+`" alt="14" loading="lazy"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python3 smbrelayx.py <span class="token parameter variable">-h</span> <span class="token operator">&lt;</span>DC_IP<span class="token operator">&gt;</span> <span class="token parameter variable">-c</span> <span class="token function">whoami</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在被控主机访问一个不存在的主机 <code>\\\\\\abcdefg</code></p><p>当被控主机访问一个不存在的主机时，就会触发LLMNR协议，攻击者捕获到其NTLM Hash，然后再把这段Hash重放到DC，一旦成功，即可执行任意命令。</p><h2 id="ntlm-reflect" tabindex="-1"><a class="header-anchor" href="#ntlm-reflect" aria-hidden="true">#</a> NTLM Reflect</h2><p>JuicyPotato原理 就是利用了NTLM反射，当拿到用户的 smb 请求之后，把请求 Relay 回用户本身，即 <code>Reflect</code>。从而控制机子本身。</p><p>主机 A 向主机 B(访问 <code>\\\\B</code>) 进行 SMB 认证的时候，将 <code>pszTargetName</code> 设置为 <code>cifs/B</code>, 然后在 <code>type 2</code> 拿到主机 B 发送 <code>Challenge</code> 之后，在 <code>lsass</code> 里面缓存 (<code>Challenge</code>,cifs/B)。</p><p>然后主机 B 在拿到主机 A 的 <code>type 3</code>之后，会去查看 <code>lsass</code> 里面有没有缓存 (<code>Challenge</code>,<code>cifs/b</code>)，如果存在缓存，那么认证失败。</p><p>这种情况底下，如果主机 B 和主机 A 是不同的主机的话，那 <code>lsass</code> 里面就不会缓存 (<code>Challenge</code>,<code>cifs/B</code>)。如果是同一台主机的话，那 <code>lsass</code> 里面肯定有缓存，这个时候就会认证失败。</p>`,18);function f(k,M){const s=d("ExternalLinkIcon");return t(),r("div",null,[h,m,u,e("p",null,[a("在内部网络中使用 "),e("a",b,[a("Responder"),n(s)]),a(" 截获目标计算机向其他计算机发送的NTLM身份验证请求，提取Hash。")]),_,e("p",null,[e("a",v,[a("https://github.com/codeexpress/respounder"),n(s)])]),g])}const T=c(i,[["render",f],["__file","NTLM中继攻击.html.vue"]]);export{T as default};
