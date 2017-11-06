<?php

require_once ('global_inc.php');
include_once (__INCLUDE_DIR . "constant.php");

require_once ('validlogin.php'); //验证登录
require_once ('settemplate.php');

$smarty->assign('selected', 'admin');
$smarty->assign('title', '首页');
$smarty->display($template . "/index.html");

?>