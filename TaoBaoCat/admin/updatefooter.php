<?php
error_reporting(0);
require_once 'tools.php';
validadmin();
$action = $_REQUEST["action"];
if($action=="update")
{
	$footer = $_REQUEST["footer"];
	file_put_contents("../footer.php", $footer);
	exit("<script language=\"javascript\">alert(\"底部页面修改成功。\");location.href=\"updatefooter.php\";</script>");
}
?>
<html>
<head>
<title>编辑底部页面</title>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<link href="css/admin.css" type="text/css" rel="stylesheet">
</head>
<body onLoad="document.getElementById('footer').focus();">
<table cellspacing="0" cellpadding="0" width="100%" border="0" align="center">
	<tr height="28">
		<td background="images/title_bg.jpg" class="weizhi">编辑底部页面</td>
	</tr>
	<tr>
		<td bgcolor="#b1ceef" height="1"></td>
	</tr>
	<tr height="20">
		<td background="images/shadow_bg.jpg"></td>
	</tr>
</table>
<table class="tdpl" cellspacing="0" cellpadding="0" style="border-collapse:collapse" bordercolor="#d1e6f7" width="99%" border="1" align="center">
<form name="updatefooter" action="updatefooter.php?action=update" method="post">
	<tr>
		<td width="120" height="28" background="images/title_bg.jpg">页面名称</td>
		<td width="600" background="images/title_bg.jpg">页面内容</td>
		<td background="images/title_bg.jpg"></td>
	</tr>
	<tr>
		<td width="120" height="460">footer.php</td>
		<td width="600">
		<textarea name="footer" id="footer" cols="150" rows="30"><?php echo file_get_contents("../footer.php") ?></textarea>
		</td>
		<td></td>
	</tr>
	<tr>
		<td width="120" height="28" background="images/title_bg.jpg"></td>
		<td colspan="2" background="images/title_bg.jpg">
		<img src="images/bt_update.gif" style="cursor:hand;" onClick="javascript:document.updatefooter.submit();">
		<img src="images/bt_reset.gif" style="cursor:hand;" onClick="javascript:document.updatefooter.reset();">
		</td>
	</tr>
</form>
</table>
</body>
</html>