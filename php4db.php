<?php 
$db = mysql_connect("127.0.0.1:3306", "root", "");
mysql_select_db("weirenwu", $db);
mysql_query("set names utf8");
$sql = 'select * from weirenwu_weibo_userinfo';
$res = mysql_query($sql);
while ($row = mysql_fetch_assoc($res)) {
	print_r($row);
	echo "<br>";
}