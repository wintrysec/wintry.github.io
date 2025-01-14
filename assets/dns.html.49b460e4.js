import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as t,e as a}from"./app.a5c8fdbc.js";const e="/assets/imggdom.19e854b9.png",l="/assets/DNScx.35efe995.png",p={},i=a('<h2 id="dns概述" tabindex="-1"><a class="header-anchor" href="#dns概述" aria-hidden="true">#</a> DNS概述</h2><p>DNS（Domain Name System-域名“系统”）是一种可以将域名和IP地址相互映射的以层次结构分布的数据库系统；整个 DNS 系统由分散在世界各地的很多台 DNS 服务器组成，每台 DNS 服务器上都保存了一些数据，这些数据可以让我们最终查到主机名对应的 IP。</p><div class="custom-container tip"><p class="custom-container-title">DNS 服务器有三种</p><p>根 DNS 服务器（通常使用&quot;.&quot;来表示，用于管理顶级DNS）</p><p>顶级域(Top-Level Domain, TLD) DNS 服务器（com、cn、edu等，提供权威DNS服务器的IP）</p><p>权威 DNS 服务器 （返回主机-IP的最终映射）</p></div><p>全世界目前有13个域名根节点，由少数几个国家进行管理，而中国仅有几台根节点镜像。</p><p><img src="'+e+'" alt="imggdom" loading="lazy"></p><h2 id="域名解析记录方式" tabindex="-1"><a class="header-anchor" href="#域名解析记录方式" aria-hidden="true">#</a> 域名解析记录方式</h2><table><thead><tr><th style="text-align:left;">记录类型</th><th style="text-align:left;">使用目的</th></tr></thead><tbody><tr><td style="text-align:left;">A</td><td style="text-align:left;">将域名指向一个 IP 地址（外网地址）。</td></tr><tr><td style="text-align:left;">CNAME</td><td style="text-align:left;">将域名指向另一个域名，再由另一个域名提供 IP 地址（外网地址）。</td></tr><tr><td style="text-align:left;">MX</td><td style="text-align:left;">设置邮箱，让邮箱能收到邮件。</td></tr><tr><td style="text-align:left;">NS</td><td style="text-align:left;">将子域名交给其他 DNS 服务商解析。</td></tr><tr><td style="text-align:left;">SPF</td><td style="text-align:left;">指向发送邮件的服务器。</td></tr><tr><td style="text-align:left;">AAAA</td><td style="text-align:left;">将域名指向一个 IPv6 地址。</td></tr><tr><td style="text-align:left;">SRV</td><td style="text-align:left;">用来标识某台服务器使用了某个服务，常见于微软系统的目录管理。</td></tr><tr><td style="text-align:left;">TXT</td><td style="text-align:left;">对域名进行标识和说明，绝大多数的 TXT 记录是用来做 SPF 记录（反垃圾邮件）。</td></tr><tr><td style="text-align:left;">CAA</td><td style="text-align:left;">授权指定 CA 机构为域名签发 SSL 证书，以防止 SSL 证书错误签发。</td></tr></tbody></table><p>SPF记录以IP地址认证电子邮件发件人身份，是非常高效的垃圾邮件解决方案</p><h2 id="域名解析过程" tabindex="-1"><a class="header-anchor" href="#域名解析过程" aria-hidden="true">#</a> 域名解析过程</h2><h3 id="本地dns服务器" tabindex="-1"><a class="header-anchor" href="#本地dns服务器" aria-hidden="true">#</a> 本地DNS服务器</h3><p>本地DNS服务器（Local DNS）不属于DNS的层次结构，但是它对DNS的层次结构是至关重要的。</p><p>每个 ISP 都有一台本地 DNS 服务器，比如一个大学的 ISP、一个机构的 ISP，都有一台或多台本地 DNS 服务器。当终端主机发出 DNS 请求时，该请求被发往本地 DNS 服务器，本地 DNS 服务器负责将该请求转发到 DNS 服务器层次结构中。</p><h3 id="解析过程图示" tabindex="-1"><a class="header-anchor" href="#解析过程图示" aria-hidden="true">#</a> 解析过程图示</h3><p>DNS查询是一个递归、迭代查询的过程</p><p><img src="'+l+`" alt="DNScx" loading="lazy"></p><p>1、终端主机向本地DNS发起域名请求</p><p>2、本地DNS获取到域名请求后，向根域名服务器发起解析请求，根DNS返回顶级域名服务器地址</p><p>3、随后本地DNS服务器向顶级DNS服务器发起解析请求，顶级DNS返回权威DNS服务器的地址</p><p>4、本地DNS服务器又向其中一台权威DNS服务器发送解析请求</p><p>6、权威DNS服务器返回查询域名-IP的映射，本地DNS将此映射缓存并返回给终端主机</p><h3 id="百度解析过程" tabindex="-1"><a class="header-anchor" href="#百度解析过程" aria-hidden="true">#</a> 百度解析过程</h3><p>先向13个根域名服务器发送请求，依次是顶级DNS和权威DNS直到CNAME到<code>www.a.shifen.com.</code>解析出了IP地址。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-5-centos ~<span class="token punctuation">]</span><span class="token comment"># dig +trace www.baidu.com</span>

<span class="token punctuation">;</span> <span class="token operator">&lt;&lt;</span><span class="token operator">&gt;&gt;</span> DiG <span class="token number">9.11</span>.4-P2-RedHat-9.11.4-26.P2.el7_9.9 <span class="token operator">&lt;&lt;</span><span class="token operator">&gt;&gt;</span> +trace www.baidu.com
<span class="token punctuation">;</span><span class="token punctuation">;</span> global options: +cmd
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	a.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	b.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	c.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	d.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	e.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	f.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	g.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	h.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	i.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	j.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	k.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	l.root-servers.net.
<span class="token builtin class-name">.</span>			<span class="token number">172404</span>	IN	NS	m.root-servers.net.
<span class="token punctuation">;</span><span class="token punctuation">;</span> Received <span class="token number">239</span> bytes from <span class="token number">114.114</span>.114.114<span class="token comment">#53(114.114.114.114) in 9 ms</span>

com.			<span class="token number">172800</span>	IN	NS	e.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	b.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	j.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	m.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	i.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	f.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	a.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	g.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	h.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	l.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	k.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	c.gtld-servers.net.
com.			<span class="token number">172800</span>	IN	NS	d.gtld-servers.net.
com.			<span class="token number">86400</span>	IN	DS	<span class="token number">30909</span> <span class="token number">8</span> <span class="token number">2</span> E2D3C916F6DEEAC73294E8268FB5885044A833FC5459588F4A9184CF C41A5766
com.			<span class="token number">86400</span>	IN	RRSIG	DS <span class="token number">8</span> <span class="token number">1</span> <span class="token number">86400</span> <span class="token number">20221203050000</span> <span class="token number">20221120040000</span> <span class="token number">18733</span> <span class="token builtin class-name">.</span> uQiKGKTUkEIeNVOYjx7vKrMtANmt2SnXpG02yRIQsAMO0UFc062pf6II quckovgjAGOxWGIk9EZg7QcTrhTzCiNRSJaY/wEX4oSwoYDSPUKPCkoG FucYziyiWG73iZlF8VOAXASAw2ZtH1qki11cgOwyJLb7b9UbYr6QVrix FAzfURkpLPqv0xMDWdxW1qAjq0nJ63NOhf1qFA9JsIXdqrcCb8aEj1NW wPnDu+QzlBXL5aZyJtP/BoIucszSmQThIjwH/kfwIre0KES7Clpzgrde Ztyy9wPBV7eRxCto54pbugu9tx76L3ZqZQ5zoOAT8AHuoalLVNdzx0bv <span class="token assign-left variable">c4qwMw</span><span class="token operator">==</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span> Received <span class="token number">1173</span> bytes from <span class="token number">192.58</span>.128.30<span class="token comment">#53(j.root-servers.net) in 191 ms</span>

baidu.com.		<span class="token number">172800</span>	IN	NS	ns2.baidu.com.
baidu.com.		<span class="token number">172800</span>	IN	NS	ns3.baidu.com.
baidu.com.		<span class="token number">172800</span>	IN	NS	ns4.baidu.com.
baidu.com.		<span class="token number">172800</span>	IN	NS	ns1.baidu.com.
baidu.com.		<span class="token number">172800</span>	IN	NS	ns7.baidu.com.
CK0POJMG874LJREF7EFN8430QVIT8BSM.com. <span class="token number">86400</span> IN NSEC3 <span class="token number">1</span> <span class="token number">1</span> <span class="token number">0</span> - CK0Q2D6NI4I7EQH8NA30NS61O48UL8G5 NS SOA RRSIG DNSKEY NSEC3PARAM
CK0POJMG874LJREF7EFN8430QVIT8BSM.com. <span class="token number">86400</span> IN RRSIG NSEC3 <span class="token number">8</span> <span class="token number">2</span> <span class="token number">86400</span> <span class="token number">20221127052428</span> <span class="token number">20221120041428</span> <span class="token number">53929</span> com. SnVmAcktp+1bTm0p0l8zbWAgAsmntjN5RgRngxHv37sANfXnkOyXkcor jUYCXrf2r5KNli9HUQoWb+VHXXrG6hoSy+S/YvQXy8BPN3ilr8NypcT7 W0h07JhVZYz4h4JXJvgvFCyFIBEo3/GOfDUT+7UfRKlrTJiio3vOVmY6 ga8Ia/D3UVkcHl5HbLqjI10ipBFOYQ1SWlour/8bv3vqgQ<span class="token operator">==</span>
HPVUVSGH5TFIA7CM6SS6SMPOS87OE0CE.com. <span class="token number">86400</span> IN NSEC3 <span class="token number">1</span> <span class="token number">1</span> <span class="token number">0</span> - HPVV8SARM2LDLRBTVC5EP1CUB1EF7LOP NS DS RRSIG
HPVUVSGH5TFIA7CM6SS6SMPOS87OE0CE.com. <span class="token number">86400</span> IN RRSIG NSEC3 <span class="token number">8</span> <span class="token number">2</span> <span class="token number">86400</span> <span class="token number">20221127063741</span> <span class="token number">20221120052741</span> <span class="token number">53929</span> com. aG+AyWRIXoqfwvlPjl5tu+/1lj3EzgRFpqjkSdNaXAh36uX9zAY0U2ma zfhbXYQ9O31sk8bvnr74xFIrYZhtdFzkH1YQ4AHG3hXzkDcEzicT7e6R PUy0V0UTu7ZAfsOi1K9Hb/vwKqlAUiTQb7VVcd5HxuzpRqULHHLTOZzt x3NW/cbDrTJN6kDo1Wnu4hHJV7sfmKNZC5E6ySlpkzTFwA<span class="token operator">==</span>
<span class="token punctuation">;</span><span class="token punctuation">;</span> Received <span class="token number">849</span> bytes from <span class="token number">192.26</span>.92.30<span class="token comment">#53(c.gtld-servers.net) in 239 ms</span>

www.baidu.com.		<span class="token number">1200</span>	IN	CNAME	www.a.shifen.com.
<span class="token punctuation">;</span><span class="token punctuation">;</span> Received <span class="token number">72</span> bytes from <span class="token number">220.181</span>.33.31<span class="token comment">#53(ns2.baidu.com) in 28 ms</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dns为什么采用udp协议" tabindex="-1"><a class="header-anchor" href="#dns为什么采用udp协议" aria-hidden="true">#</a> DNS为什么采用UDP协议</h2><p>TCP通信过程太复杂并且开销大。</p><p>一次TCP交换需要9个包： 三个连接包，四个断开包，一个请求t包，一个响应包。</p><p>UDP通信过程简单，只需要一个查询包和一个响应包。</p>`,27),r=[i];function c(o,d){return s(),t("div",null,r)}const b=n(p,[["render",c],["__file","dns.html.vue"]]);export{b as default};
