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
	exit("<script language=\"javascript\">alert(\"��վ�����޸ĳɹ���\");location.href=\"site.php\";</script>");
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
		<td background="images/title_bg.jpg" class="weizhi">��վ����</td>
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
		<td width="140" height="28" background="images/title_bg.jpg">��������</td>
		<td width="300" background="images/title_bg.jpg">��������</td>
		<td background="images/title_bg.jpg">��д��ʾ</td>
	</tr>
	<tr>
		<td width="140" height="30">��վ���ƣ�</td>
		<td width="300"><input size="45" name="sitetitle" id="sitetitle" value="<?php echo $sitetitle ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="30">��վ������</td>
		<td width="300"><input size="45" name="siteurl" value="<?php echo $siteurl ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="120" height="30">��վ�ؼ��֣�</td>
		<td width="300"><textarea name="sitekey" cols="45" rows="4"><?php echo $sitekey ?></textarea></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="80">��վ������</td>
		<td width="300"><textarea name="sitedesc" cols="45" rows="4"><?php echo $sitedesc ?></textarea></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="30">��վ�����ţ�</td>
		<td width="300"><input size="45" name="sitebeian" value="<?php echo $sitebeian ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="80">��վͳ�ƴ��룺</td>
		<td width="300"><textarea name="sitetongji" cols="45" rows="4"><?php echo $sitetongji ?></textarea></td>
		<td>������վ����ͳ�ƴ������<a href="http://www.cnzz.com" target="_blank">����</a></td>
	</tr>
	<tr>
		<td width="140" height="30">��Ʒnum_iid�������ܣ�</td>
		<td width="300">
			<input type="radio" name="iiddecode" value="1"<?php echo $iiddecode=="1"?" checked":"" ?>>���� 
			<input type="radio" name="iiddecode" value="0"<?php echo $iiddecode=="0"?" checked":"" ?>>�ر�
		</td>
		<td>��Ʒ��ϸҳ·��iid�������ܣ���Ч���Ӱٶ���¼��!</td>
	</tr>
	<tr>
		<td width="140" height="30">�Ա���PID��</td>
		<td width="300"><input size="45" name="userpid" value="<?php echo $userpid ?>" /></td>
		<td>�鿴�Ա���PID�����Ա��˺ŵ�½<a href="http://login.taobao.com/member/taobaoke/login.htm" target="_blank">����</a></td>
	</tr>
	<tr>
		<td width="140" height="30">�Ա��ǳƣ�</td>
		<td width="300"><input size="45" name="usernick" value="<?php echo iconv("UTF-8","GBK",$usernick) ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="140" height="30">AppKey</td>
		<td width="300"><textarea name="appkey" cols="45" rows="4"><?php echo $appkey ?></textarea></td>
		<td>����AppKey��AppSecret�����Ա��˺ŵ�½<a href="http://my.open.taobao.com/app/create_app.htm" target="_blank">����</a><br>֧�ֶ��AppKey�ֻ������AppKey֮������Ӣ�Ķ��Ÿ�����<br>��ʽΪ��AppKey1,AppKey2</td>
	</tr>
	<tr>
		<td width="140" height="30">AppSecret��</td>
		<td width="300"><textarea name="appsecret" cols="45" rows="4"><?php echo $appsecret ?></textarea></td>
		<td>֧�ֶ��AppSecret�ֻ�,���AppSecret֮������Ӣ�Ķ��Ÿ�����<br>��ʽΪ��AppSecret1,AppSecret2 ���ֱ���Appkey1��Appkey2��Ӧ��</td>
	</tr>
	<tr>
		<td width="140" height="30">�������ʱ�䣺</td>
		<td width="300"><input size="45" name="cachetime" value="<?php echo $cachetime ?>" /></td>
		<td>��λСʱ[0��ʾ�رջ�����¹���]</td>
	</tr>
	<tr>
		<td width="140" height="30">�����Զ�ɾ��ʱ�䣺</td>
		<td width="300"><input size="45" name="clearcache" value="<?php echo $clearcache ?>" /></td>
		<td>��ʽΪ������ Сʱ ���� �·ݣ��м��ÿո�������������֮����Ӣ�Ķ��Ÿ�����*��ʾ���⡣<br>[0��ʾ�ر��Զ�������湦��]</td>
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