<?php
$value = 1; // 变量赋值
function fun() { // 建立方法
	global $value; // 引入变量$value
	$n = $value + 1; // 计算$n值
	return $value += $n; // 计算$value的值，并返回结果
}

fun ();
echo $value; // 打印$value
exit ();