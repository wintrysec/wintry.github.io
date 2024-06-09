import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as n,a as e,b as s,d as i,e as o,r as p}from"./app.ed2888ea.js";const d="/assets/kerberos6.f4e5d56d.jpg",l={},h=o('<h2 id="kerberos" tabindex="-1"><a class="header-anchor" href="#kerberos" aria-hidden="true">#</a> Kerberos</h2><p>Kerberos是一种网络身份验证协议，通过密钥加密技术为客户端/服务器应用程序提供强身份验证。</p><p>在Kerberos协议中主要是有三个角色的存在：</p><ol><li>访问服务的客户端（Client）</li><li>提供服务的服务端（Server）</li><li>密钥分发中心 KDC（Key Distribution Center）</li></ol><p>其中KDC服务默认安装在域控中，而Client和Server为域内的用户和服务，如HTTP、SQL服务。</p><p>在Kerberos中Client是否有权限访问Server端的服务由KDC发放的票据来决定。</p><h3 id="相关术语" tabindex="-1"><a class="header-anchor" href="#相关术语" aria-hidden="true">#</a> 相关术语</h3><details class="custom-container details"><summary>AS 认证服务器（Authentication Server）</summary><p>用来认证客户端的身份并发放客户用于访问TGS的TGT</p></details><details class="custom-container details"><summary>TGS 票据授予服务器（Ticket Granting Ticket）</summary><p>用来发放整个认证过程所需的服务授予票据（Ticket）</p><p>该服务提供的票据为（白银票据）</p></details><details class="custom-container details"><summary>TGT（Ticket Granting Ticket）身份认证服务授予的票据</summary><p>用于身份认证，存储在内存，默认有效期为10小时</p><p>该服务提供的票据为（黄金票据）</p></details><p>在域环境中，每个用户账号的票据都是由Krbtgt生成的，这个账号的密码，储存在域控服务上 。</p><h3 id="认证流程" tabindex="-1"><a class="header-anchor" href="#认证流程" aria-hidden="true">#</a> 认证流程</h3><p>客户端访问网络服务时，需要携带一个专门用于访问该服务并且能够证明自己身份的票据，</p><p>当服务端收到了该票据才能认证客户端身份正确，向客户端提供服务。</p><p>所以整个认证流程可简化为两大步：</p><ol><li>客户端向KDC请求获取想要访问的目标服务的服务授予票据（Ticket）</li><li>客户端拿着从KDC获取的服务授予票据（Ticket）访问相应的网络服务</li></ol><p><img src="'+d+`" alt="img" loading="lazy"></p><h2 id="ntlm" tabindex="-1"><a class="header-anchor" href="#ntlm" aria-hidden="true">#</a> NTLM</h2><p>与NTLM相关的有两个漏洞哈希传递（Pass The Hash）以及NTLM中继（NTLM_Relay）。</p><h3 id="lm-hash和ntlm-hash" tabindex="-1"><a class="header-anchor" href="#lm-hash和ntlm-hash" aria-hidden="true">#</a> LM Hash和NTLM Hash</h3><p>Windows操作系统中的密码由两部分加密组成，即 LM Hash 和 NTLM Hash。</p><p>LM Hash（LAN Manager Hash），本质为DES加密，密码不足14位用0补全。</p><p>自Server 2003之后，Windows的认证方式均为NTLM Hash。</p><p>自Server 2008开始默认禁用LM Hash， 当密码超过14位时候会采用NTLM加密</p><p>如果抓取的LM Hash为<code>AAD3B435B51404EEAAD3B435B51404EE</code>说明密码为空或LM Hash被禁用。</p><table><thead><tr><th></th><th><strong>2003</strong></th><th><strong>win7</strong></th><th><strong>2008</strong></th><th><strong>2012</strong></th></tr></thead><tbody><tr><td>LM</td><td>√</td><td></td><td></td><td></td></tr><tr><td>NTLM</td><td>√</td><td>√</td><td>√</td><td>√</td></tr></tbody></table><p><strong>Hash一般存储在两个地方</strong></p><ul><li><strong>SAM文件</strong>：存储在本机，对应本地用户</li><li><strong>NTDS.DIT文件</strong>：存储在域控上，对应域用户</li></ul><h3 id="ntlm身份验证" tabindex="-1"><a class="header-anchor" href="#ntlm身份验证" aria-hidden="true">#</a> NTLM身份验证</h3><p>NTLM验证是一种Challenge/Response 验证机制。由三种消息组成（type1 协商、type2 质询、type3 身份验证） <strong>协商 type1</strong></p><p>这个过程是客户端向服务器发送type1消息，包含客户端支持和服务器请求的功能列表。</p><p><strong>质询 type2</strong></p><p>这个过程是服务器用type 2消息(质询)进行响应，这包含服务器支持和同意的功能列表。</p><p>但是，最重要的是，它包含服务器产生的Challenge。后面加密验证依赖于challenge。</p><p><strong>身份验证 type3</strong></p><p>这个过程客户端接收到challenge之后，使用用户hash与challenge进行加密运算得到response，将response,username,challenge发给服务器。</p><p>消息中的response是最关键的部分，因为它向服务器证明客户端用户已经知道帐户密码。</p><p><strong>Pass Through Authentication认证流程</strong></p><p>服务器拿到type 3之后，使用challenge和用户hash进行加密得到response2与type 3发来的response进行比较。如果用户hash是存储在域控里面的话，那么没有用户hash，也就没办法计算response2。也就没法验证。这个时候用户服务器就会通过netlogon协议联系域控，建立一个安全通道,然后将type 1,type 2，type3 全部发给域控。</p><p>域控使用challenge和用户hash进行加密得到response2，与type 3的response进行比较。</p><h3 id="ssp-sspi" tabindex="-1"><a class="header-anchor" href="#ssp-sspi" aria-hidden="true">#</a> SSP &amp; SSPI</h3><h4 id="sspi-security-support-provider-interface" tabindex="-1"><a class="header-anchor" href="#sspi-security-support-provider-interface" aria-hidden="true">#</a> SSPI(Security Support Provider Interface)</h4><p>这是 Windows 定义的一套接口，此接口定义了与安全有关的功能函数， 用来获得验证、信息完整性、信息隐私等安全功能，就是定义了一套接口函数用来身份验证，签名等，但是没有具体的实现。</p><h4 id="ssp-security-support-provider" tabindex="-1"><a class="header-anchor" href="#ssp-security-support-provider" aria-hidden="true">#</a> SSP(Security Support Provider)</h4><p>SSPI 的实现者，对SSPI相关功能函数的具体实现。微软自己实现了如下的 SSP，用于提供安全功能：</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>1.NTLM SSP
2.Kerberos
3.Cred SSP
4.Digest SSP
5.Negotiate SSP
6.Schannel SSP
7.Negotiate Extensions SSP
8.PKU2U SSP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在系统层面，SSP就是一个dll，来实现身份验证等安全功能，实现的身份验证机制是不一样的。比如 NTLM SSP 实现的就是一种 Challenge/Response 验证机制。而 Kerberos 实现的就是基于 ticket 的身份验证机制。我们可以编写自己的 SSP，然后注册到操作系统中，让操作系统支持更多的自定义的身份验证方法。</p><h2 id="ldap" tabindex="-1"><a class="header-anchor" href="#ldap" aria-hidden="true">#</a> LDAP</h2><p>LDAP 是微软的 Active Directory（AD）目录服务中使用的核心协议（但并非是其专用）；而 Active Directory 是一个大型目录服务数据库，包含网络中每一用户帐户的信息。</p><p>更具体地说，LDAP 是目录访问协议（DAP）的轻量级版本，提供一个中央位置来访问和管理在传输控制协议/互联网协议（TCP/IP）上运行的目录服务。</p><p>AD 提供身份验证以及用户和组管理，它是最终对用户或计算机执行身份验证的主体。这个数据库中包含的属性数量要比 LDAP 调用的数量多。不过，LDAP 擅长于使用少量信息来查找目录，因此不需要从 AD 提取它的全部属性，而且从哪一个目录服务调取也无关紧要。</p><p>LDAP 的主要目标是与 AD 通信，从中提取对象（如域、用户和组等），并以可用格式存储到位于 LDAP 服务器上的专用目录中。</p><h3 id="ldap-身份验证流程" tabindex="-1"><a class="header-anchor" href="#ldap-身份验证流程" aria-hidden="true">#</a> LDAP 身份验证流程</h3><ul><li>目录系统代理（DSA）：作为服务器，在其网络中运行 LDAP</li><li>目录用户代理（DUA）：作为客户端（例如，用户的个人电脑），访问 DSA</li><li>DN：即专有名称（Distinguished Name），包含了供 LDAP 检索的目录信息树（DIT）的路径（例如，cn=Susan、ou=users、o=Company）</li><li>相对专有名称（RDN）：专有名称路径中的各个组成部分（例如，cn=Susan）</li><li>应用编程接口（API）：通过 API，您无需了解实施原理，也能将您的产品或服务与其他其他产品或服务互通。</li></ul><p>当用户尝试访问支持 LDAP 的客户端程序，例如其个人电脑上的商务电子邮件应用，整个 LDAP 流程就开始了。使用 LDAPv3 时，有两种用户身份验证方法：简单身份验证（例如，使用登录凭据的 SSO）和 SASL 身份验证（将 LDAP 服务器绑定到 Kerberos 等程序）。用户尝试登录时，系统会发送一个请求来鉴定分配给用户的 DN。DN 是通过启动 DSA 的客户端 API 或服务器发送的。</p><p>客户端会自动绑定到 DSA，LDAP 使用 DN 来搜索与 LDAP 数据库中记录相匹配的对象或对象集合。DN 中的 RDN 在这个阶段非常重要，因为它们会一步一步引导 LDAP 搜索 DIT，以找到所需个体。如果路径在后端缺少连接的 RDN，结果可能会呈现为无效。在本例中，LDAP 搜索的对象是个人用户帐户（cn=Susan），它只有在目录中的帐户有匹配的 uid 和 userPassword 时才会验证用户。用户组在 LDAP 目录中也被看做是对象。</p><p>一旦用户收到回复（无论有效或无效），客户端会从 LDAP 服务器解绑。然后，通过验证的用户可以访问 API 及其服务，包括所需的文件、用户信息和其他应用数据，具体取决于系统管理员授予的权限。</p><h3 id="ldap-组件" tabindex="-1"><a class="header-anchor" href="#ldap-组件" aria-hidden="true">#</a> LDAP 组件</h3><p>LDAP 采用轻量型结构并且使用了 DIT，因而能快速运行 LDAP 搜索并提供搜索结果。想要顺利浏览 LDAP 服务器并理解 LDAP 搜索的工作原理，了解 DIT 至关重要。</p><p>DIT 能够让用户快速浏览不同层级的 LDAP 目录，以缩小搜索结果范围并提供对查询的回复。DIT 以根目录开头，后跟国家或地区，然后划分为两个子类：域名（dc）和组织名称（o）。</p><p><strong>域名（dc）</strong></p><p>dc（例如，dc=com、dc=example）使用域名系统（DNS）映射来查找互联网域名并将其转译为 IP 地址。</p><p>大多数用户不知道他们搜索的个体的域名和/或 IP 地址。这时，LDAP 使用分配给用户的专有名称（DN）作为路径，以快速浏览 DIT 并找到搜索结果。接下来就要使用 o 子类了。</p><p><strong>组织名称（o）</strong></p><p>o 子类（例如，o-Company）是 DN 中列出的最常用子类之一，通常也是 LDAP 运行搜索时的起始位置。例如，一个简单路径通常以 o 子类开头，分叉到组织单元/部门（ou），后跟用户帐户或组。</p><p><strong>组织单元（ou）</strong></p><p>如前文所述，ou 是 o 的一个子类，通常表现为 ou=users 或 ou=group，分别包含用户帐户或组的列表。其在目录中可能如下所示：</p><ul><li>o-Company <ul><li>ou=groups <ul><li>cn=developers</li></ul></li><li>ou=users <ul><li>cn=Susan</li></ul></li></ul></li></ul><p><strong>通用名称（cn）</strong></p><p>通用名称或 cn 用于标识组或个人用户帐户的名称（如 cn=developers、cn=Susan）。用户可以从属于某个组；因此，如果 Susan 是开发人员，则也可能会存在于 cn=developers 下。</p><p><strong>属性和值</strong></p><p>LDAP DIT 中的各个子类（即 o、ou、cn）包含属性或值，或含有 LDAP 目录相关信息的模式，它们有助于缩小搜索范围。属性有点像地址簿中的条目，有着名称、电话号码和地址等标签，每个属性分配有相应的值。例如，Susan 可能是 name 属性的值。</p><p>在 cn=Susan 帐户中，user id（uid）和 userPassword 是属性，而用户的登录凭据则是值。不过，在诸如 cn=developers 之类的组中，Susan 可能有 uniqueMember 属性（例如，uniqueMember=cn-Susan,ou-Users,o-Company）。这会将路径映射到 Susan 的个人用户帐户所处的位置，以及 LDAP 所搜索的信息。用户帐户是 DIT 中的末端，也是 LDAP 最终提取搜索结果的地方。</p><p>还有许多其他属性类型和语法可以帮助缩小搜索范围，包括 organizationalPerson（structural）或 personal（structural）等 ObjectClass。不过，为了保持轻量和易用，LDAP 中的属性数量是有限的。</p>`,74),c={id:"windows协议-https-daiker-gitbook-io-windows-protocol",tabindex:"-1"},u=e("a",{class:"header-anchor",href:"#windows协议-https-daiker-gitbook-io-windows-protocol","aria-hidden":"true"},"#",-1),D={href:"https://daiker.gitbook.io/windows-protocol/",target:"_blank",rel:"noopener noreferrer"};function S(P,g){const r=p("ExternalLinkIcon");return t(),n("div",null,[h,e("h4",c,[u,s(" Windows协议 ："),e("a",D,[s("https://daiker.gitbook.io/windows-protocol/"),i(r)])])])}const L=a(l,[["render",S],["__file","域内网协议.html.vue"]]);export{L as default};
