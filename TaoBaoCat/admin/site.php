<?php
error_reporting(0);
require_once 'tools.php';
validadmin();
require_once '../inc/config.php';
$action = $_REQUEST["action"];
if($action=="update")
{
	$tempsitetitle = formattext($_REQUEST["sitetitle"]);
	$tempsiteurl = formattext($_REQUEST["siteurl"]);
	$tempsitekey = formattext($_REQUEST["sitekey"]);
	$tempsitedesc = formattext($_REQUEST["sitedesc"]);
	$tempsitebeian = formattext($_REQUEST["sitebeian"]);
	$tempsitetongji = formattext($_REQUEST["sitetongji"]);
	$tempiiddecode = formattext($_REQUEST["iiddecode"]);
	$tempuserpid = formattext($_REQUEST["userpid"]);
	$tempusernick = formattext($_REQUEST["usernick"]);
	$tempappkey = formattext($_REQUEST["appkey"]);
	$tempappsecret = formattext($_REQUEST["appsecret"]);
	$tempcachetime = formattext($_REQUEST["cachetime"]);
	$tempclearcache = formattext($_REQUEST["clearcache"]);
	
	$filecontent = $filecontent . "\$sitetitle = \"" . $tempsitetitle . "\";\r\n";
	$filecontent = $filecontent . "\$siteurl = \"" . $tempsiteurl . "\";\r\n";
	$filecontent = $filecontent . "\$sitekey = \"" . $tempsitekey . "\";\r\n";
	$filecontent = $filecontent . "\$sitedesc = \"" . $tempsitedesc . "\";\r\n";
	$filecontent = $filecontent . "\$sitebeian = \"" . $tempsitebeian . "\";\r\n";
	$filecontent = $filecontent . "\$sitetongji = \"" . $tempsitetongji . "\";\r\n";
	$filecontent = $filecontent . "\$iiddecode = \"" . $tempiiddecode . "\";\r\n";
	$filecontent = $filecontent . "\$userpid = \"" . $tempuserpid . "\";\r\n";
	$filecontent = $filecontent . "\$appkey = \"" . $tempappkey . "\";\r\n";
	$filecontent = $filecontent . "\$appsecret = \"" . $tempappsecret . "\";\r\n";
	$filecontent = $filecontent . "\$cachetime = \"" . $tempcachetime . "\";\r\n";
	$filecontent = $filecontent . "\$clearcache = \"" . $tempclearcache . "\";\r\n";
	$filecontent = $filecontent . "\$usernick = " . "iconv(\"GBK\",\"UTF-8\",\"" . $tempusernick . "\");";
	
	file_put_contents("../inc/config.php", "<?php\r\n".$filecontent."\r\n?>");
	exit("<script language=\"javascript\">alert(\"网站参数修改成功。\");location.href=\"site.php\";</script>");
}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<link href="css/admin.css" type="text/css" rel="stylesheet">
</head>
<body onLoad="document.getElementById('sitetitle').focus();">
<table cellspacing="0" cellpadding="0" width="100%" border="0" align="center">
	<tr height="28">
		<td background="images/title_bg.jpg" class="weizhi">网站参数</td>
	</tr>
	<tr>
		<td bgcolor="#b1ceef" height="1"></td>
	</tr>
	<tr height="20">
		<td background="images/shadow_bg.jpg"></td>
	</tr>
</table>
<table class="tdpl" cellspacing="0" cellpadding="0" style="border-collapse:collapse" bordercolor="#d1e6f7" width="99%" border="1" align="center">
<form name="site" action="site.php?action=update" method="post">
	<tr>
		<td width="140" height="28" background="images/title_bg.jpg">配置名称</td>
		<td width="300" background="images/title_bg.jpg">配置内容</td>
		<td background="images/title_bg.jpg">填写提示</td>
	</tr>
	<tr>
		<td width="140" height="30">网站名称：</td>
		<td width="300"><input size="45" name="sitetitle" id="sitetitle" value="<?php echo $sitetitle ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="30">网站域名：</td>
		<td width="300"><input size="45" name="siteurl" value="<?php echo $siteurl ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="120" height="30">网站关键字：</td>
		<td width="300"><textarea name="sitekey" cols="45" rows="4"><?php echo $sitekey ?></textarea></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="80">网站描述：</td>
		<td width="300"><textarea name="sitedesc" cols="45" rows="4"><?php echo $sitedesc ?></textarea></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="30">网站备案号：</td>
		<td width="300"><input size="45" name="sitebeian" value="<?php echo $sitebeian ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="80">网站统计代码：</td>
		<td width="300"><textarea name="sitetongji" cols="45" rows="4"><?php echo $sitetongji ?></textarea></td>
		<td>申请网站流量统计代码请点<a href="http://www.cnzz.com" target="_blank">这里</a></td>
	</tr>
	<tr>
		<td width="140" height="30">商品num_iid参数加密：</td>
		<td width="300">
			<input type="radio" name="iiddecode" value="1"<?php echo $iiddecode=="1"?" checked":"" ?>>开启 
			<input type="radio" name="iiddecode" value="0"<?php echo $iiddecode=="0"?" checked":"" ?>>关闭
		</td>
		<td>商品详细页路径iid参数加密，有效增加百度收录量!</td>
	</tr>
	<tr>
		<td width="140" height="30">淘宝客PID：</td>
		<td width="300"><input size="45" name="userpid" value="<?php echo $userpid ?>" /></td>
		<td>查看淘宝客PID请用淘宝账号登陆<a href="http://login.taobao.com/member/taobaoke/login.htm" target="_blank">这里</a></td>
	</tr>
	<tr>
		<td width="140" height="30">淘宝昵称：</td>
		<td width="300"><input size="45" name="usernick" value="<?php echo iconv("UTF-8","GBK",$usernick) ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="30">AppKey</td>
		<td width="300"><textarea name="appkey" cols="45" rows="4"><?php echo $appkey ?></textarea></td>
		<td>申请AppKey和AppSecret请用淘宝账号登陆<a href="http://my.open.taobao.com/app/create_app.htm" target="_blank">这里</a><br>支持多个AppKey轮换，多个AppKey之间请用英文逗号隔开。<br>格式为：AppKey1,AppKey2</td>
	</tr>
	<tr>
		<td width="140" height="30">AppSecret：</td>
		<td width="300"><textarea name="appsecret" cols="45" rows="4"><?php echo $appsecret ?></textarea></td>
		<td>支持多个AppSecret轮换,多个AppSecret之间请用英文逗号隔开。<br>格式为：AppSecret1,AppSecret2 并分别与Appkey1和Appkey2对应。</td>
	</tr>
	<tr>
		<td width="140" height="30">缓存更新时间：</td>
		<td width="300"><input size="45" name="cachetime" value="<?php echo $cachetime ?>" /></td>
		<td>单位小时[0表示关闭缓存更新功能]</td>
	</tr>
	<tr>
		<td width="140" height="30">缓存自动删除时间：</td>
		<td width="300"><input size="45" name="clearcache" value="<?php echo $clearcache ?>" /></td>
		<td>格式为：分钟 小时 日期 月份，中间用空格隔开，多个参数之间用英文逗号隔开，*表示任意。<br>[0表示关闭自动清除缓存功能]</td>
	</tr>
	<tr>
		<td width="140" height="28" background="images/title_bg.jpg"></td>
		<td colspan="2" background="images/title_bg.jpg">
		<img src="images/bt_update.gif" style="cursor:hand;" onClick="javascript:document.site.submit();">
		<img src="images/bt_reset.gif" style="cursor:hand;" onClick="javascript:document.site.reset();">
		</td>
	</tr>
</form>
</table>
</body>
</html>