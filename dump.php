<?php
error_reporting(0);
// date_default_timezone_set('PRC');
$arguments['v'] = current($_GET);
echo "<h1>";
if(is_array(json_decode($arguments['v'],true))){
	echo "<pre>";
	$json = json_decode($arguments['v']);
	print_r($json);
}elseif(is_numeric($arguments['v'])){
	echo date('Y-m-d H:i:s',$arguments['v']);
}else{
	echo strtotime($arguments['v']);
}
echo "</h1>";
echo PHP_EOL;
?>