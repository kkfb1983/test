<?php
//排序
$a=array('3','8','1','4','11','7');
$s = array();
$i = 0;
foreach($a as $v){
	if(empty($s[$i])){
		$s[$i] = array_sum($a);
	}
	echo count($a);
	echo "<br>";
	foreach($a as $k=>$value){
		if($s[$i] > $value){
			$s[$i] = $value;
			$key = $k;
		}
	}
	unset($a[$key]);
	$i++;
}

echo "<pre>";
print_R($s);
