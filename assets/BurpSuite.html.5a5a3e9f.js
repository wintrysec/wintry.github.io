import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as i,a as t,b as e,d as a,e as n,r as d}from"./app.342c7ddc.js";const p="/assets/image-20221122002218748.44ae7943.png",c="/assets/image-20221122003054827.2bffa794.png",h={},l=t("h2",{id:"选项摘要",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#选项摘要","aria-hidden":"true"},"#"),e(" 选项摘要")],-1),u={href:"https://portswigger.net/burp/documentation/desktop/getting-started",target:"_blank",rel:"noopener noreferrer"},g=n('<p>官方文档是讲的最全的，这里就没必要全抄下来了，只是根据个人常用功能做个备忘录。</p><div class="custom-container info"><p class="custom-container-title">选项摘要</p><p>Proxy 拦截HTTP/S的代理服务器，抓取数据包用</p><p>Intruder 攻击器，枚举和Fuzz 比如密码爆破</p><p>Repeater 重放数据包用</p><p>Collaborator 相当于一个DNSlog工具，测试外带通道（Log4j2这类的漏洞）</p><p>Sequencer 会话令牌和重要数据项的随机性分析工具</p><p>Decoder 编码解码工具</p><p>Comparer 可视化的&quot;差异&quot;比较工具</p><p>Logger 日志工具，记录所有请求响应数据包的日志</p><p>Extensions 拓展工具，可以安装第三方拓展插件</p></div><h2 id="拦截https包" tabindex="-1"><a class="header-anchor" href="#拦截https包" aria-hidden="true">#</a> 拦截HTTPS包</h2>',3),_={class:"custom-container tip"},f=t("p",{class:"custom-container-title"},"拦截HTTPS包",-1),b={href:"http://burp",target:"_blank",rel:"noopener noreferrer"},m=t("p",null,"2、双击安装这个证书，还要在浏览器中导入证书",-1),x=t("p",null,"注意：安装到受信任的根证书颁发机构",-1),y=n('<h2 id="intruder-攻击载荷类型" tabindex="-1"><a class="header-anchor" href="#intruder-攻击载荷类型" aria-hidden="true">#</a> Intruder 攻击载荷类型</h2><h4 id="positions-有效负载位置—攻击类型" tabindex="-1"><a class="header-anchor" href="#positions-有效负载位置—攻击类型" aria-hidden="true">#</a> Positions 有效负载位置—攻击类型</h4><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">作用</th></tr></thead><tbody><tr><td style="text-align:left;">Sniper</td><td style="text-align:left;">单独参数Fuzz</td></tr><tr><td style="text-align:left;">Battering ram</td><td style="text-align:left;">多个位置相同参数Fuzz</td></tr><tr><td style="text-align:left;">Pitchfork</td><td style="text-align:left;">多参数同时顺序Fuzz（顺序爆破用户名和对应ID）-密码和用户对应</td></tr><tr><td style="text-align:left;">Cluster bomb</td><td style="text-align:left;">多参数遍历Fuzz（例如用户名+密码爆破）</td></tr></tbody></table><p>Payload Processing 可以设置编码和加密（base64和MD5等）</p><h2 id="代理链" tabindex="-1"><a class="header-anchor" href="#代理链" aria-hidden="true">#</a> 代理链</h2><p>User options下的Connections页面中，有『Upstream Proxy Servers』和『SOCKS Proxy』</p><p>即经过Burp的包后边还会走一层代理。</p><h2 id="好用的拓展插件" tabindex="-1"><a class="header-anchor" href="#好用的拓展插件" aria-hidden="true">#</a> 好用的拓展插件</h2>',8),k={href:"https://github.com/c0ny1/chunked-coding-converter",target:"_blank",rel:"noopener noreferrer"},P={href:"https://github.com/TheKingOfDuck/burpFakeIP",target:"_blank",rel:"noopener noreferrer"},S=n('<h2 id="拦截返回包" tabindex="-1"><a class="header-anchor" href="#拦截返回包" aria-hidden="true">#</a> 拦截返回包</h2><p>有的时候我们需要拦截修改返回包的内容</p><p><img src="'+p+'" alt="image-20221122002218748" loading="lazy"></p><h2 id="排除域名" tabindex="-1"><a class="header-anchor" href="#排除域名" aria-hidden="true">#</a> 排除域名</h2><p>有时我们想抓目标的包，但是总有一些google.com和firefox.com.cn之类的请求包一直被拦截。</p><p>这样很影响我们正常抓包，其实我们可以设置一下不抓这些指定域名的包。</p><p><img src="'+c+'" alt="image-20221122003054827" loading="lazy"></p>',7);function z(v,C){const r=d("ExternalLinkIcon");return s(),i("div",null,[l,t("p",null,[e("推荐阅读官方文档："),t("a",u,[e("https://portswigger.net/burp/documentation/desktop/getting-started"),a(r)])]),g,t("div",_,[f,t("p",null,[e("1、 浏览器设置好BurpSuite代理服务器后，访问"),t("a",b,[e("http://burp"),a(r)]),e(" ，下载CA证书")]),m,x]),y,t("p",null,[e("c0ny1师傅写的 burp分块传输，绕过waf的插件 "),t("a",k,[e("https://github.com/c0ny1/chunked-coding-converter"),a(r)])]),t("p",null,[e("CoolCat师傅写的 burpFakeIP，客户端IP伪造 "),t("a",P,[e("https://github.com/TheKingOfDuck/burpFakeIP"),a(r)])]),S])}const B=o(h,[["render",z],["__file","BurpSuite.html.vue"]]);export{B as default};
