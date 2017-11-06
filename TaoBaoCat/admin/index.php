<?php
error_reporting(0);
require_once 'tools.php';
require_once 'mima.php';
$action = $_REQUEST["action"];
if($action=="login")
{
	$tempusername = trim($_REQUEST["username"]);
	$temppassword = md5(trim($_REQUEST["password"]));

	if($tempusername==$username && $temppassword == $password)
	{
		session_start();
		$_SESSION["username"] = $username;
		header("Location: admin.php");
	}
	else
	{
		exit("<script language=\"javascript\">alert(\"用户名或密码错误，请重新输入！\");history.go(-1);</script>");
	}
}
if($action=="exit")
{
	session_start();
	unset($_SESSION['username']);
	session_destroy();
}
?>
<html>
<head>
<title>网站后台登陆</title>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<link href="css/admin.css" type="text/css" rel="stylesheet">
</head>
<body onLoad="document.getElementById('username').focus();">
<table height="100%" cellspacing="0" cellpadding="0" width="100%" bgcolor="#002779" border="0" align="center">
	<tr>
		<td align="center">
			<table cellspacing="0" cellpadding="0" width="468" border="0" align="center">
				<tr><td><img height="23" src="images/login_1.jpg" width="468"></td></tr>
				<tr><td><img height="147" src="images/login_2.jpg" width="468"></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="468" bgcolor="#ffffff" border="0" align="center">
				<tr>
					<td width="16"><img height="122" src="images/login_3.jpg" width="16"></td>
					<td align="center">
						<table cellspacing="0" cellpadding="0" width="230" border="0" align="center">
						<form name="login" action="index.php?action=login" method="post">
							<tr height="5">
								<td width="5"></td>
								<td width="56"></td>
								<td></td>
							</tr>
							<tr height="36">
								<td></td>
								<td>用户名</td>
								<td><input style="border:#000000 1px solid;" maxlength="30" size="24" name="username" id="username" /></td>
							</tr>
							<tr height="36">
								<td></td>
								<td>密　码</td>
								<td><input style="border:#000000 1px solid;" type="password" maxlength="30" size="24" name="password" id="password" /></td>
							</tr>
							<tr height="5"><td colspan="3"></td></tr>
							<tr>
								<td></td>
								<td></td>
								<td><input type="image" height="18" width="70" src="images/bt_login.gif" /></td>
							</tr>
						</form>
						</table>
					</td>
					<td width="16"><img height="122" src="images/login_4.jpg" width="16"></td>
				</tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="468" border="0" align="center">
				<tr><td><img height="16" src="images/login_5.jpg" width="468"></td></tr>
			</table>
		</td>
	</tr>
</table>
</body>
</html>