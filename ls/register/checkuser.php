<?php
session_start();

	$pregStr = "/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/";
	if(preg_match($pregStr,trim($_POST['email'])))
	{
		//echo '格式正确';
	}else{
		//echo '格式不正确';
	}
	
	if(isset($_SESSION['an'])){
		
		echo "存在";
		
	}else{
		echo "不存在";
	}
?>