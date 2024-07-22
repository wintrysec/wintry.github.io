import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as c,c as u,a as n,d as l,w as s,b as e,e as o,r as i}from"./app.736b169c.js";const d={},p=n("h2",{id:"目录",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#目录","aria-hidden":"true"},"#"),e(" 目录")],-1),B=n("div",{class:"custom-container tip"},[n("p",{class:"custom-container-title"},"提示"),n("ul",null,[n("li",null,[n("p",null,"虽然主要是写Linux系统相关的操作，但是部分章节中也包含了Windows系统下对应的知识。")]),n("li",null,[n("p",null,"比如用户管理、进程管理、网络管理这些Windows也有对应的命令。")])])],-1),E=n("h2",{id:"linux面板",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#linux面板","aria-hidden":"true"},"#"),e(" Linux面板")],-1),h={href:"https://cockpit-project.org/",target:"_blank",rel:"noopener noreferrer"},m=o(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装</span>
yum <span class="token function">install</span> cockpit cockpit-docker-195.12-1.el7.centos.x86_64 <span class="token parameter variable">-y</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> cockpit.socket
firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-service<span class="token operator">=</span>cockpit
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),_={href:"https://IP:9090",target:"_blank",rel:"noopener noreferrer"},v=o(`<h2 id="卸载腾讯云的监控" tabindex="-1"><a class="header-anchor" href="#卸载腾讯云的监控" aria-hidden="true">#</a> 卸载腾讯云的监控</h2><p>买的腾讯云主机安装了一些监控程序，运行着浪费资源，可以把它卸载掉</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/usr/local/qcloud/stargate/admin/uninstall.sh
/usr/local/qcloud/YunJing/uninst.sh
/usr/local/qcloud/monitor/barad/admin/uninstall.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function x(b,f){const a=i("RouterLink"),t=i("ExternalLinkIcon");return c(),u("div",null,[p,B,n("ul",null,[n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/Linux%E6%9B%B4%E6%8D%A2%E6%9B%B4%E6%96%B0%E6%BA%90.html"},{default:s(()=>[e("Linux更换更新源")]),_:1})])]),n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/Linux%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html"},{default:s(()=>[e("Linux常用命令")]),_:1})])]),n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86.html"},{default:s(()=>[e("用户管理")]),_:1})])]),n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86.html"},{default:s(()=>[e("进程管理")]),_:1})])]),n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86.html"},{default:s(()=>[e("网络管理")]),_:1})])]),n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/%E8%AE%A1%E5%88%92%E4%BB%BB%E5%8A%A1.html"},{default:s(()=>[e("计划任务")]),_:1})])]),n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/%E5%BC%80%E6%9C%BA%E5%90%AF%E5%8A%A8%E9%A1%B9.html"},{default:s(()=>[e("开机启动项")]),_:1})])]),n("li",null,[n("p",null,[l(a,{to:"/Linux%E7%B3%BB%E7%BB%9F/Linux%E5%AE%88%E6%8A%A4%E8%BF%9B%E7%A8%8B.html"},{default:s(()=>[e("Linux守护进程")]),_:1})])])]),E,n("p",null,[e("免费的Linux面板 "),n("a",h,[e("https://cockpit-project.org/"),l(t)])]),m,n("p",null,[e("然后访问 "),n("a",_,[e("https://IP:9090"),l(t)]),e(" 即可访问面板了")]),v])}const L=r(d,[["render",x],["__file","index.html.vue"]]);export{L as default};
