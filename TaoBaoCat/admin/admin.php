<?php
error_reporting(0);
require_once 'tools.php';
validadmin();
?>
<html>
<head>
<title>网站管理中心</title>
<meta http-equiv="Content-Type" content="text/html; charset=gbk">
<link href="css/admin.css" type="text/css" rel="stylesheet">
</head>
<frameset border="0" framespacing="0" rows="60, *" frameborder="0">
	<frame name="header" src="header.php" frameborder="0" noresize scrolling="no">
	<frameset cols="170, *">
		<frame name=menu src="menu.php" frameborder="0" noresize>
		<frame name=main src="site.php" frameborder="0" noresize scrolling="yes">
	</frameset>
</frameset>
<noframes>
</noframes>
</html>