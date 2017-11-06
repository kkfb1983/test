<?php

include_once ('global_inc.php');
$BlocAdmin->logout();
header('location:login.php');
//show_msg('退出成功','login.php');


?>