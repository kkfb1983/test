<?php
/**
 * 快速排序法
 * @param unknown $str
 * @return unknown
 */
function quicksort($str) {
	if (count ( $str ) <= 1){
		return $str; // 如果个数不大于一，直接返回
	}
	$key = $str [0]; // 取一个值，稍后用来比较；
	$left_arr = array ();
	$right_arr = array ();
	for($i = 1; $i < count ( $str ); $i ++) { // 比$key大的放在右边，小的放在左边；
		if ($str [$i] <= $key)
			$left_arr [] = $str [$i];
		else
			$right_arr [] = $str [$i];
	}
	$left_arr = quicksort ( $left_arr ); // 进行递归；
	$right_arr = quicksort ( $right_arr );
	return array_merge ( $left_arr, array($key), $right_arr ); // 将左中右的值合并成一个数组；
} // 以下是测试
$str=array(5,3,8,2,5,9,7,2,1,4,0); 
print_r ( quicksort ( $str ) );





