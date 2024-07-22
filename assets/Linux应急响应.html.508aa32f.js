import{_ as c}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as u,a as s,b as v,d as n,w as e,e as a,r as t}from"./app.736b169c.js";const h="/assets/netstat.f1b48eff.png",m="/assets/psaux.e79a4a13.png",b={},g=a(`<h2 id="账号安全" tabindex="-1"><a class="header-anchor" href="#账号安全" aria-hidden="true">#</a> 账号安全</h2><p>先查看基础用户信息文件(/etc/passwd，/etc/shadow，/etc/group)</p><p>1、查询特权用户特权用户(uid 为0)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> -F: <span class="token string">&#39;$3==0{print $1}&#39;</span> /etc/passwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2、查询可以远程登录的帐号信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">awk</span> <span class="token string">&#39;/\\$1|\\$6/{print $1}&#39;</span> /etc/shadow
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、除root帐号外，其他帐号是否存在sudo权限。如非管理需要，普通帐号应删除sudo权限</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">more</span> /etc/sudoers <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;^#\\|^$&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;ALL=(ALL)&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4、禁用或删除多余及可疑的帐号</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">usermod</span> <span class="token parameter variable">-L</span> user   <span class="token comment">#禁用帐号，帐号无法登录，/etc/shadow第二栏为!开头</span>
<span class="token function">userdel</span> <span class="token parameter variable">-r</span> user   <span class="token comment">#将删除user用户，并且将/home目录下的user目录一并删除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看历史命令" tabindex="-1"><a class="header-anchor" href="#查看历史命令" aria-hidden="true">#</a> 查看历史命令</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> ~/.bash_history <span class="token operator">&gt;&gt;</span> history.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="检查网络连接" tabindex="-1"><a class="header-anchor" href="#检查网络连接" aria-hidden="true">#</a> 检查网络连接</h2><p>netstat -antlp|more</p><p><img src="`+h+`" alt="netstat" loading="lazy"></p><h2 id="检查异常进程" tabindex="-1"><a class="header-anchor" href="#检查异常进程" aria-hidden="true">#</a> 检查异常进程</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> pid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+m+`" alt="psaux" loading="lazy"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看 PID 所对应的进程文件路径</span>
<span class="token function">file</span> /proc/<span class="token variable">$PID</span>/exe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查开机启动项" tabindex="-1"><a class="header-anchor" href="#检查开机启动项" aria-hidden="true">#</a> 检查开机启动项</h2><p>系统运行级别示意:</p><table><thead><tr><th><strong>运行级别</strong></th><th><strong>含义</strong></th></tr></thead><tbody><tr><td>0</td><td>关机</td></tr><tr><td>1</td><td>单用户模式，可以想象为windows的安全模式，主要用于系统修复</td></tr><tr><td>2</td><td>不完全的命令行模式，不含NFS服务</td></tr><tr><td>3</td><td>完全的命令行模式，就是标准字符界面</td></tr><tr><td>4</td><td>系统保留</td></tr><tr><td>5</td><td>图形模式</td></tr><tr><td>6</td><td>重启动</td></tr></tbody></table><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-al</span> /etc/init.d

systemctl <span class="token parameter variable">-l</span>

<span class="token comment">#系统默认允许级别</span>
<span class="token function">vi</span> /etc/inittab
<span class="token assign-left variable">id</span><span class="token operator">=</span><span class="token number">3</span>：initdefault <span class="token comment">#系统开机后直接进入哪个运行级别</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们需要开机启动自己的脚本时，只需要将可执行脚本丢在</p><p>/etc/init.d目录下，然后在/etc/rc.d/rc*.d中建立软链接即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-s</span> /etc/init.d/sshd /etc/rc.d/rc3.d/S100ssh  
<span class="token comment">#S开头代表加载时自启动</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查定时任务" tabindex="-1"><a class="header-anchor" href="#检查定时任务" aria-hidden="true">#</a> 检查定时任务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-al</span> /var/spool/cron/* 


<span class="token function">cat</span> /etc/crontab
/etc/cron.daily/*
/etc/cron.hourly/*
/etc/cron.monthly/*
/etc/cron.weekly/


<span class="token comment">#查看目录下所有文件</span>
<span class="token function">more</span> /etc/cron.d/*
/etc/anacrontab
/var/spool/anacron/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),k={href:"http://blog.lujun9972.win/blog/2018/04/19/%E4%BD%BF%E7%94%A8anacron%E5%AE%9A%E6%9C%9F%E6%89%A7%E8%A1%8C%E4%BB%BB%E5%8A%A1/index.html",target:"_blank",rel:"noopener noreferrer"},f=a(`<h2 id="检查服务" tabindex="-1"><a class="header-anchor" href="#检查服务" aria-hidden="true">#</a> 检查服务</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chkconfig</span>  <span class="token parameter variable">--list</span>  <span class="token comment">#查看服务自启动状态，可以看到所有的RPM包安装的服务</span>

<span class="token comment">#源码包安装的服务位置</span>
/user/local/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查异常文件" tabindex="-1"><a class="header-anchor" href="#检查异常文件" aria-hidden="true">#</a> 检查异常文件</h2><p>1、查看敏感目录，如/tmp目录下的文件，同时注意隐藏文件夹，以“..”为名的文件夹具有隐藏属性</p><p>2、针对可疑文件可以使用stat查看创建修改时间</p><p>3、发现WebShell、远控木马的创建时间</p><p><strong>如何找出同一时间范围内创建的文件？</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">find</span> ./ <span class="token parameter variable">-iname</span> <span class="token string">&quot;*&quot;</span> <span class="token parameter variable">-atime</span> <span class="token number">1</span> <span class="token parameter variable">-type</span> f 
<span class="token comment">#找出 ./ 下一天前访问过的文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检查系统日志" tabindex="-1"><a class="header-anchor" href="#检查系统日志" aria-hidden="true">#</a> 检查系统日志</h2><p>日志默认存放位置：/var/log/</p><p>查看日志配置情况：more /etc/rsyslog.conf</p><table><thead><tr><th><strong>日志文件</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td><strong>/var/log/btmp</strong></td><td>记录错误登录（登陆失败）日志；使用lastb命令查看</td></tr><tr><td><strong>/var/log/lastlog</strong></td><td>记录系统中所有用户最后一次成功登录时间，使用lastlog命令查看</td></tr><tr><td><strong>/var/log/wtmp</strong></td><td>永久记录所有用户的登录、注销信息，同时记录系统的启动、重启、关机事件；用last命令来查看</td></tr><tr><td><strong>/var/log/utmp</strong></td><td>只记录当前登录用户的信息；使用w,who,users等命令来查询</td></tr><tr><td><strong>/var/log/secure</strong></td><td>记录验证和授权方面的信息，如SSH登录，su切换用户，sudo授权，甚至添加用户和修改用户密码（Centos）</td></tr></tbody></table><table><thead><tr><th><strong>日志文件</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>/var/log/cron</td><td>记录系统定时任务相关的日志</td></tr><tr><td>/var/log/message</td><td>记录Linux操作系统常见的系统和服务错误信息(首要检查对象)</td></tr></tbody></table>`,13),_={class:"custom-container details"},x=s("summary",null,"安装软件的日志",-1),y=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,`/var/log/yum.log
`)]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"})])],-1),w=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,`/var/log/apt/
`)]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"})])],-1),E=a('<details class="custom-container details"><summary>关于syslog</summary><p>/var/log/syslog：只记录警告信息，常常是系统出问题的信息；</p><p>syslog是Linux系统默认的日志守护进程，默认的syslog配置文件是/etc/sysctl.conf文件</p><p>syslog不可以使用vi等工具直接查看，它是二进制文件，使用 lastlog 查看</p><p>默认Centos，Fedora不生成该日志文件，但可以配置让系统生成该日志文件</p><p><code>/etc/rsyslog.conf</code>文件中加上：<code>*.warning /var/log/syslog</code></p><p>该日志文件能记录当用户登录时记录下的错误口令、Sendmail的问题、su命令执行失败等信息</p><p><strong>正确清空syslog日志的方式</strong></p><p>cat /dev/null &gt; /etc/init.d/syslog</p></details>',1);function A(L,B){const d=t("ExternalLinkIcon"),i=t("Tabs");return p(),u("div",null,[g,s("p",null,[s("a",k,[v("anacrontab是啥 "),n(d)])]),f,s("details",_,[x,n(i,{id:"248",data:[{title:"Centos"},{title:"Ubuntu"}]},{tab0:e(({title:r,value:l,isActive:o})=>[y]),tab1:e(({title:r,value:l,isActive:o})=>[w]),_:1})]),E])}const $=c(b,[["render",A],["__file","Linux应急响应.html.vue"]]);export{$ as default};
