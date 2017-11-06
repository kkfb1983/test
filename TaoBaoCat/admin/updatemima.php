<?php
error_reporting(0);
require_once 'tools.php';
validadmin();
require_once 'mima.php';
$action = $_REQUEST["action"];
if($action=="update")
{
	$tempusername = trim($_REQUEST["username"]);
	$temppassword = trim($_REQUEST["password"]);
	$temppassword2 = trim($_REQUEST["password2"]);
	
	if($tempusername=="" || $temppassword=="")
	{
		exit("<script language=\"javascript\">alert(\"用户名和密码都不能为空。\");history.go(-1);</script>");
	}
	
	if($temppassword!=$temppassword2)
	{
		exit("<script language=\"javascript\">alert(\"两次密码不一致。\");history.go(-1);</script>");
	}
	
	$filecontent = $filecontent . "\$username = \"" . $tempusername . "\";\r\n";
	$filecontent = $filecontent . "\$password = \"" . md5($temppassword) . "\";";
	
	file_put_contents("mima.php", "<?php\r\n".$filecontent."\r\n?>");
	exit("<script language=\"javascript\">alert(\"修改密码成功。\");location.href=\"updatemima.php\";</script>");
}
?>
<html>
<head>
<title>修改密码</title>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<link href="css/admin.css" type="text/css" rel="stylesheet">
</head>
<body onLoad="document.getElementById('username').focus();">
<table cellspacing="0" cellpadding="0" width="100%" border="0" align="center">
	<tr height="28">
		<td background="images/title_bg.jpg" class="weizhi">修改密码</td>
	</tr>
	<tr>
		<td bgcolor="#b1ceef" height="1"></td>
	</tr>
	<tr height="20">
		<td background="images/shadow_bg.jpg"></td>
	</tr>
</table>
<table class="tdpl" cellspacing="0" cellpadding="0" style="border-collapse:collapse" bordercolor="#d1e6f7" width="99%" border="1" align="center">
<form name="updatemima" action="updatemima.php?action=update" method="post">
	<tr>
		<td width="120" height="28" background="images/title_bg.jpg"></td>
		<td width="300" background="images/title_bg.jpg"></td>
		<td background="images/title_bg.jpg"></td>
	</tr>
	<tr>
		<td width="120" height="30">用户名：</td>
		<td width="300"><input size="45" name="username" id="username" value="<?php echo $username ?>" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="120" height="30">新密码：</td>
		<td width="300"><input type="password" size="45" name="password" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="120" height="30">确认新密码：</td>
		<td width="300"><input type="password" size="45" name="password2" /></td>
		<td></td>
	</tr>
	<tr>
		<td width="120" height="28" background="images/title_bg.jpg"></td>
		<td colspan="2" background="images/title_bg.jpg">
		<img src="images/bt_update.gif" style="cursor:hand;" onClick="javascript:document.updatemima.submit();">
		<img src="images/bt_reset.gif" style="cursor:hand;" onClick="javascript:document.updatemima.reset();">
		</td>
	</tr>
</form>
</table>
</body>
</html>