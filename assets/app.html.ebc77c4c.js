import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as r,a,b as e,d as p,e as i,r as o}from"./app.02b19a3e.js";const l="/assets/clip_image002.d6a903d8.gif",c="/assets/clip_image004.dd9d60d8.gif",d="/assets/clip_image006.bd693c76.gif",h="/assets/clip_image008.837439bf.gif",g="/assets/clip_image010.64d7f7b4.gif",m="/assets/clip_image012.9c32a944.gif",u="/assets/clip_image014.8cf88bdc.gif",_="/assets/clip_image016.e62e027c.gif",f="/assets/clip_image018.8d3830fa.gif",b="/assets/clip_image020.8cdb89c8.gif",k="/assets/clip_image022.fd0c45da.gif",A="/assets/clip_image024.9d9079d9.gif",x="/assets/clip_image026.c6f1ff9f.gif",P="/assets/clip_image028.93048bdf.gif",v={},E=a("h2",{id:"apk敏感信息收集",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#apk敏感信息收集","aria-hidden":"true"},"#"),e(" APK敏感信息收集")],-1),B=a("h3",{id:"使用工具快速扫描",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#使用工具快速扫描","aria-hidden":"true"},"#"),e(" 使用工具快速扫描")],-1),y={href:"https://github.com/dwisiswant0/apkleaks",target:"_blank",rel:"noopener noreferrer"},z=i(`<p>可以发现比如云主机的key，服务器真实IP、其他服务的密钥等信息。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>PowerShell   python apkleaks<span class="token punctuation">.</span>py <span class="token operator">-</span>f  <span class="token string">&quot;C:\\Users\\Administrator\\Desktop\\app\\test.apk&quot;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+l+'" alt="img" loading="lazy"></p><h3 id="反编译apk" tabindex="-1"><a class="header-anchor" href="#反编译apk" aria-hidden="true">#</a> 反编译APK</h3><p>一个apk包的本质是一个zip格式的压缩包，我们可以直接使用解压缩工具进行解压。</p>',5),w={href:"https://mt2.cn/%E6%9F%A5%E7%9C%8Bapk%EF%BC%8C%E6%A3%80%E6%9F%A5apk%E5%8C%85%E4%B8%AD%E6%98%AF%E5%90%A6%E5%AD%98%E5%9C%A8%E7%A1%AC%E7%BC%96%E7%A0%81%E7%9A%84%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E3%80%82",target:"_blank",rel:"noopener noreferrer"},S=i('<p>重点查看classes.dex文件反编译后是否有硬编码的敏感信息。</p><p><strong>APK文件结构如下</strong></p><p><img src="'+c+'" alt="img" loading="lazy"></p><h4 id="_1-检查sharedpreferences-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-检查sharedpreferences-配置文件" aria-hidden="true">#</a> 1）检查SharedPreferences 配置文件</h4><p>检查客户端程序存储在手机中的 SharedPreferences 配置文件是否存储、泄露敏感信息。</p><p>可以使用MT管理器查看（手机需要root）</p><p>• 用MT管理器查看下APK的应用包名</p><p>• 查看路径/data/data/&lt;应用包名&gt;/shared_prefs/&lt;应用包名&gt;_preferences.xml</p><p>• 可以查看保存的SharedPreferences键值对信息</p><p><img src="'+d+'" alt="img" loading="lazy"></p><h4 id="_2-检查sqlite数据库" tabindex="-1"><a class="header-anchor" href="#_2-检查sqlite数据库" aria-hidden="true">#</a> 2）检查SQLite数据库</h4><p>检查客户端程序存储在手机中的SQLite 数据库文件是否保存、泄漏敏感信息。</p><p>将路径/data/data/&lt;应用包名&gt;/databases/下的sqlite3类型的数据库文件</p><p>用文件管理器导出来用可视化工具查看</p><p><img src="'+h+'" alt="img" loading="lazy"></p><p><img src="'+g+`" alt="img" loading="lazy"></p><h4 id="_3-检查logcat日志" tabindex="-1"><a class="header-anchor" href="#_3-检查logcat日志" aria-hidden="true">#</a> 3）检查logcat日志</h4><p>APP客户端本地 log 运行日志是否打印、泄露用户敏感信息（使用adb即可查看）。</p><p>• 按照应用过滤日志</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>pm list packages <span class="token operator">-</span>3   <span class="token comment">#查看非系统的第三方应用包名   logcat | grep &lt;应用包名或者关键字&gt;  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+m+'" alt="img" loading="lazy"></p><p>然后运行要检查的APP即可实时查看日志。</p><h2 id="app抓包" tabindex="-1"><a class="header-anchor" href="#app抓包" aria-hidden="true">#</a> APP抓包</h2><h3 id="普通情况下" tabindex="-1"><a class="header-anchor" href="#普通情况下" aria-hidden="true">#</a> 普通情况下</h3><ol><li><p>模拟器正常打开APP</p></li><li><p>打开BurpSuite开启代理</p></li><li><p>Proxifier设置代理服务器为Burp 的代理地址127.0.0.1 8080代理类型https</p></li><li><p>设置Proxifier的代理规则为默认全走Burp的流量代理，不需要抓包的设置直连</p></li><li><p>在APP上进行网络请求操作，Burp即可抓到APP的请求包了</p></li></ol><h3 id="代理抓包app就网络连接异常情况下" tabindex="-1"><a class="header-anchor" href="#代理抓包app就网络连接异常情况下" aria-hidden="true">#</a> 代理抓包APP就网络连接异常情况下</h3><h4 id="_1-burp代理设置为局域网的ip" tabindex="-1"><a class="header-anchor" href="#_1-burp代理设置为局域网的ip" aria-hidden="true">#</a> 1）Burp代理设置为局域网的IP</h4><p><img src="'+u+'" alt="img" loading="lazy"></p><h4 id="_2-模拟器设置桥接模式-和代理工具burp所在宿主机处于同一局域网" tabindex="-1"><a class="header-anchor" href="#_2-模拟器设置桥接模式-和代理工具burp所在宿主机处于同一局域网" aria-hidden="true">#</a> 2）模拟器设置桥接模式，和代理工具Burp所在宿主机处于同一局域网</h4><p><img src="'+_+'" alt="img" loading="lazy"></p><p>设置模拟器的网络代理为Burp的地址</p><p><img src="'+f+'" alt="img" loading="lazy"></p><h4 id="_3-模拟器访问burp代理的ip-下载并安装ca证书" tabindex="-1"><a class="header-anchor" href="#_3-模拟器访问burp代理的ip-下载并安装ca证书" aria-hidden="true">#</a> 3）模拟器访问Burp代理的IP，下载并安装CA证书</h4><p><img src="'+b+'" alt="img" loading="lazy"></p><p>下载完先把后缀改为cer</p><p>夜神模拟器是在WLAN设置中点高级安装证书</p><p><img src="'+k+'" alt="img" loading="lazy"></p><p>或者有的模拟器是从设置中搜索安全，打开加密与凭据选项选择从SD卡安装证书</p><p><img src="'+A+'" alt="img" loading="lazy"></p><p><img src="'+x+'" alt="img" loading="lazy"></p><h4 id="_4-xposed-justtrustme-绕过sslpinning证书绑定" tabindex="-1"><a class="header-anchor" href="#_4-xposed-justtrustme-绕过sslpinning证书绑定" aria-hidden="true">#</a> 4）Xposed + JustTrustMe 绕过SSLPinning证书绑定</h4><p>有些APP有预埋证书验证，遇到Burp的证书不能通过验证还是不能抓包。</p><p>可以通过Xposed + JustTrustMe的方式绕过证书的验证，使用安卓7.0。</p><p>Xposed是一个运行于Android操作系统的钩子框架。其通过替换Android系统的关键文件，可以拦截几乎所有Java函数的调用，并允许通过Xposed模块中的自定义代码更改调用这些函数时的行为。常被用来修改Android系统和应用程序的功能。用夜神模拟器直接搜索安装就行。</p>',44),C={href:"https://github.com/Fuzion24/JustTrustMe/releases%E5%AE%89%E8%A3%85%E3%80%82",target:"_blank",rel:"noopener noreferrer"},T=i('<p>一切准备完毕后在Xposed框架中点击软重启，可以抓到包了</p><p><img src="'+P+`" alt="img" loading="lazy"></p><p>但是抓到的HTTPS包都是乱码，因为安卓高版本（7.0）之后，app可以只信任指定证书和系统内置的证书，后续用户安装的证书是不生效的。</p><p>所以需要将Burp的CA证书安装到系统内部。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code> <span class="token comment"># 转为pem格式</span>
openssl x509 <span class="token operator">-</span>inform DER <span class="token operator">-in</span> cacert<span class="token punctuation">.</span>der <span class="token operator">-</span>out cacert<span class="token punctuation">.</span>pem

<span class="token comment"># 重命名为&lt;hash值&gt;.0</span>
<span class="token function">mv</span> cacert<span class="token punctuation">.</span>pem \`openssl x509 <span class="token operator">-</span>inform PEM <span class="token operator">-</span>subject_hash_old <span class="token operator">-in</span> cacert<span class="token punctuation">.</span>pem <span class="token punctuation">|</span>head <span class="token operator">-</span>1\`<span class="token string">&#39;.0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将xxxhash.0证书文件复制到系统根信任证书目录即可</p>`,6);function F(M,L){const s=o("ExternalLinkIcon");return t(),r("div",null,[E,B,a("p",null,[e("推荐 apkleaks "),a("a",y,[e("https://github.com/dwisiswant0/apkleaks"),p(s)])]),z,a("p",null,[e("推荐使用MT管理器"),a("a",w,[e("https://mt2.cn/查看apk，检查apk包中是否存在硬编码的敏感信息。"),p(s)])]),S,a("p",null,[e("JustTrustMe一个禁用SSL证书检查的模块,在这下载"),a("a",C,[e("https://github.com/Fuzion24/JustTrustMe/releases安装。"),p(s)])]),T])}const D=n(v,[["render",F],["__file","app.html.vue"]]);export{D as default};
