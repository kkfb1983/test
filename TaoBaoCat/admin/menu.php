<?php
error_reporting(0);
require_once 'tools.php';
validadmin();
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<link href="css/admin.css" type="text/css" rel="stylesheet">
</head>
<body>
<table height="100%" cellspacing="0" cellpadding="0" width="170" background="images/menu_bg.jpg" border="0" align="center">
	<tr>
		<td valign="top" align="center">
			<table cellspacing="0 "cellpadding="0" width="100%" border="0" align="center">
				<tr><td height="10"></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="22">
					<td style="padding-left:30px" background="images/menu_bt.jpg">网站配置</td>
				</tr>
				<tr height="4"><td></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="site.php" target="main">网站参数</a></td>
				</tr>
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="delete.php" target="_blank" onClick="return confirm('确定清空所有缓存文件？如果缓存较多，请打开该页面1分钟后，关闭该页面即可。')">清空缓存</a></td>
				</tr>
				<tr height="4"><td colspan="2"></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="22">
					<td style="padding-left:30px" background="images/menu_bt.jpg">编辑页面</td>
				</tr>
				<tr height="4"><td></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="updateheader.php" target="main">编辑顶部页面</a></td>
				</tr>
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="updatefooter.php" target="main">编辑底部页面</a></td>
				</tr>
				<tr height="4"><td colspan="2"></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="22">
					<td style="padding-left:30px" background="images/menu_bt.jpg">系统管理</td>
				</tr>
				<tr height="4"><td></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="updatemima.php" target="main">修改密码</a></td>
				</tr>
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="index.php?action=exit" target="_top">退出</a></td>
				</tr>
				<tr height="4"><td colspan="2"></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="22">
					<td style="padding-left:30px" background="images/menu_bt.jpg">版权信息</td>
				</tr>
				<tr height="4"><td></td></tr>
			</table>
			<table cellspacing="0" cellpadding="0" width="150" border="0" align="center">
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="copyright.php" target="main">版权说明</a></td>
				</tr>
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="http://item.taobao.com/item.htm?id=4301852281" target="_blank">购买源码</a></td>
				</tr>
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="http://verylady.taobao.com/" target="_blank">更多淘宝客源码</a></td>
				</tr>
				<tr height="20">
					<td align=middle width="30"><img height="9" width="9" src="images/menu_icon.gif"></td>
					<td><a href="http://www.taobaocat.com/" target="_blank">官方网站</a></td>
				</tr>
				<tr height="4"><td colspan="2"></td></tr>
			</table>
		</td>
    	<td width="1" bgcolor="#d1e6f7"></td>
	</tr>
</table>
</body>
</html>