import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as l,a as e,b as s,d as n,e as t,r as c}from"./app.342c7ddc.js";const d="/assets/ENScanGo.26bd787c.png",p={},m=e("h2",{id:"信息收集思维导图",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#信息收集思维导图","aria-hidden":"true"},"#"),s(" 信息收集思维导图")],-1),b=e("div",{class:"custom-container tip"},[e("p",{class:"custom-container-title"},"提示"),e("p",null,"思维导图中的链接不要直接点击，请右键在新标签页打开")],-1),v=["src"],u=e("h2",{id:"企业组织架构工具",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#企业组织架构工具","aria-hidden":"true"},"#"),s(" 企业组织架构工具")],-1),h={href:"https://www.wgpsec.org/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/wgpsec/ENScan_GO",target:"_blank",rel:"noopener noreferrer"},g=t('<p><img src="'+d+`" alt="ENScanGo" loading="lazy"></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./ENScan <span class="token parameter variable">-invest</span> <span class="token number">100</span> <span class="token parameter variable">-deep</span> <span class="token number">2</span> <span class="token parameter variable">--branch</span> <span class="token parameter variable">-n</span> 北京如易行科技有限公司
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="子域名收集工具" tabindex="-1"><a class="header-anchor" href="#子域名收集工具" aria-hidden="true">#</a> 子域名收集工具</h2>`,3),k={href:"https://projectdiscovery.io/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/projectdiscovery/subfinder",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/projectdiscovery/dnsx",target:"_blank",rel:"noopener noreferrer"},N={href:"https://github.com/projectdiscovery/httpx",target:"_blank",rel:"noopener noreferrer"},E=t(`<p>将这几个工具放在同一目录，并赋予执行权限，使用方法如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#从root.txt读取根域名，获取对应的所有子域名</span>
./subfinder <span class="token parameter variable">-dL</span> root.txt <span class="token parameter variable">-s</span> virustotal,crtsh,dnsdumpster,github <span class="token parameter variable">-v</span> <span class="token parameter variable">-o</span> subdoms.txt

<span class="token comment">#打印所有子域名对应的A记录和CNAME记录</span>
<span class="token comment">#这一步的结果复制到VS Code排序下就知道哪些是有CDN哪些是真实IP了（有CNAME记录的即CDN）</span>
./dnsx <span class="token parameter variable">-l</span> subdoms.txt <span class="token parameter variable">-a</span> <span class="token parameter variable">-cname</span> <span class="token parameter variable">-resp</span> <span class="token parameter variable">-o</span> dom_A.txt


<span class="token comment">#获取子域名的Web访问结果(状态码，标题，server容器)</span>
./httpx -status-code <span class="token parameter variable">-title</span> -tech-detect <span class="token parameter variable">-list</span> subdoms.txt <span class="token parameter variable">-o</span> webs.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自己再写一个shell脚本即可自动化收集子域名资产了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#创建文件</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> GetSubdomains.sh <span class="token operator">&lt;&lt;</span><span class="token string">EOF
#!/bin/bash
./subfinder -dL root.txt -s virustotal,crtsh,dnsdumpster,github -v -o subdoms.txt
./dnsx -l subdoms.txt -a -cname -resp -o dom_A.txt
./httpx -status-code -title -tech-detect -list subdoms.txt -o webs.txt
EOF</span>

<span class="token comment">#运行</span>
<span class="token function">sh</span> GetSubdomains.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置查询接口的key认证信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> /root/.config/subfinder/provider-config.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
github:
 - ghp_zC00supPXhRV7MNsAfOUW24U4bDZf13LWh8T
virustotal:
 - 35bc0090d4404fa2ee4d8559e0848c93b4016fe4bc8e8fba1d94fd979941d237
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function w(r,S){const a=c("ExternalLinkIcon");return o(),l("div",null,[m,b,e("iframe",{src:r.$withBase("/infosj.html"),width:"750",height:"750",frameborder:"0",scrolling:"No",leftmargin:"0",topmargin:"0"},null,8,v),u,e("p",null,[s("企业组织架构信息收集的工具推荐 "),e("a",h,[s("狼组安全团队"),n(a)]),s("-keac师傅写的"),e("a",_,[s("ENScan"),n(a)])]),g,e("p",null,[s("子域名工具推荐 "),e("a",k,[s("projectdiscovery"),n(a)]),s(" 开源软件公司的 "),e("a",f,[s("subfinder"),n(a)]),s("+"),e("a",x,[s("dnsX"),n(a)]),s("+"),e("a",N,[s("httpX"),n(a)]),s(" 结合使用")]),E])}const j=i(p,[["render",w],["__file","互联网侧信息收集.html.vue"]]);export{j as default};
